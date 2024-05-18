package sv.edu.itca.itcaconnectauthldap.security;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.ldap.core.support.BaseLdapPathContextSource;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.SpringSecurityLdapTemplate;
import org.springframework.security.ldap.authentication.PasswordComparisonAuthenticator;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import sv.edu.itca.itcaconnectauthldap.configuration.jwt.JwtUtils;
import sv.edu.itca.itcaconnectauthldap.configuration.util.Constants;
import sv.edu.itca.itcaconnectauthldap.dto.AuthResponse;
import sv.edu.itca.itcaconnectauthldap.dto.ItcaUserIp;
import sv.edu.itca.itcaconnectauthldap.model.PortalUser;
import sv.edu.itca.itcaconnectauthldap.security.PortalUserPrincipal;
import sv.edu.itca.itcaconnectauthldap.service.feign.ItcaUserClient;

import javax.naming.directory.SearchControls;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PortalUserService implements UserDetailsService {

    private static final String LDAP_ATTRIBUTE_USERPASSWORD = "userpassword";

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.timeout:18000}")
    private long jwtTimeout;

    @Value("${ldap.url}")
    private String ldapUrl;
    @Value("${ldap.port}")
    private String ldapPort;
    @Value("${ldap.directory.root}")
    private String ldapRoot;
    @Value("${ldap.managerDN}")
    private String ldapManagerDn;
    @Value("${ldap.managerPassword}")
    private String ldapManagerPassword;
    @Value("${ldap.user.base}")
    private String ldapUserSearchBase;
    @Value("${ldap.user.filter}")
    private String ldapUserSearchFilter;
    @Value("${ldap.group.base}")
    private String groupBase;

    private final ItcaUserClient itcaUserClient;

    private BaseLdapPathContextSource contextSource;

    public PortalUserService(ItcaUserClient itcaUserClient) {
        this.itcaUserClient = itcaUserClient;
    }

    @PostConstruct
    private void prepareLdapContext() {
        String ldapFullUrl = new StringBuilder(this.ldapUrl)
                .append(":")
                .append(this.ldapPort)
                .append("/")
                .append(this.ldapRoot)
                .toString();

        DefaultSpringSecurityContextSource localContextSource = new DefaultSpringSecurityContextSource(ldapFullUrl);
        localContextSource.setUserDn(this.ldapManagerDn);
        localContextSource.setPassword(this.ldapManagerPassword);
        localContextSource.afterPropertiesSet();
        this.contextSource = localContextSource;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            log.info("Searching LDAP for user {}", username);
            SearchControls searchControls = new SearchControls();
            searchControls.setReturningAttributes(new String[]{Constants.LDAP_ATTRIBUTE_BUSINESS_CATEGORY, Constants.LDAP_ATTRIBUTE_UID});
            SpringSecurityLdapTemplate template = new SpringSecurityLdapTemplate(this.contextSource);
            template.setSearchControls(searchControls);

            DirContextOperations searchResult = template.searchForSingleEntry(this.ldapUserSearchBase, this.ldapUserSearchFilter, new String[]{username});
            List<String> grantedAuthorities = new ArrayList<>(this.getGrantedAuthorities(searchResult));
            log.info("User {} retrieved. User's roles are: {}", username, grantedAuthorities);

            return new PortalUserPrincipal(PortalUser.builder()
                    .username(username)
                    .grantedAuthorities(grantedAuthorities)
                    .build());
        } catch (IncorrectResultSizeDataAccessException ex) {
            log.error("Unexpected result size returned from LDAP for search for user {}", username);

            if (ex.getActualSize() == 0) {
                throw new UsernameNotFoundException("User " + username + " not found in LDAP.");
            } else {
                throw ex;
            }
        }
    }

    public AuthResponse authenticateUser(String username, String password, String ipAddr) {
        List<String> grantedAuthorities = this.doLdapSearch(username, password);
        log.info("Authentication of {} successfull! Users groups are: {}", username, grantedAuthorities);
        PortalUserPrincipal portalUserPrincipal = new PortalUserPrincipal(PortalUser.builder()
                .username(username)
                .grantedAuthorities(grantedAuthorities)
                .build());
        Authentication authentication = new UsernamePasswordAuthenticationToken(portalUserPrincipal, null, portalUserPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        List<String> userRoles = portalUserPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        //TODO: agregar actualización de la ip al microservicio de creación
        var ipAddressUpdate  = itcaUserClient.persistIpUser(ItcaUserIp.builder()
                .userId(Integer.parseInt(username))
                .ipAddr(ipAddr)
                .build());

        log.info("FeignService - response: IP address update ", ipAddressUpdate);

        return AuthResponse.builder()
                .username(username)
                .message(Constants.MESSAGE_SUCCESS)
                .status(Constants.STATUS_CODE_SUCCESS)
                .userRoles(userRoles)
                .token(JwtUtils.createJWTToken(username, this.jwtSecret, this.jwtTimeout, userRoles))
                .build();
    }

    private List<String> doLdapSearch(String username, String password) {
        try {
            PortalUserPrincipal portalUserPrincipal = new PortalUserPrincipal(PortalUser.builder().username(username).build());
            Authentication authentication = new UsernamePasswordAuthenticationToken(portalUserPrincipal, password);
            PasswordComparisonAuthenticator passwordComparisonAuthenticator = new PasswordComparisonAuthenticator(this.contextSource);
            passwordComparisonAuthenticator.setPasswordEncoder(newPasswordEncoder());
            passwordComparisonAuthenticator.setUserDnPatterns(new String[]{this.ldapUserSearchFilter + "," + ldapUserSearchBase});
            passwordComparisonAuthenticator.setUserAttributes(new String[]{Constants.LDAP_ATTRIBUTE_BUSINESS_CATEGORY, LDAP_ATTRIBUTE_USERPASSWORD});

            DirContextOperations authenticationResult = passwordComparisonAuthenticator.authenticate(authentication);

            return this.getGrantedAuthorities(authenticationResult);

        } catch (BadCredentialsException e) {
            log.error("LDAP authentication failed for {}. Wrong password!", username);
            throw e;
        } catch (UsernameNotFoundException e) {
            log.error("LDAP authentication failed for {}. No such user!", username);
            throw e;
        }
    }

    private List<String> getGrantedAuthorities(DirContextOperations ldapResult) {
        if (ArrayUtils.isEmpty(ldapResult.getStringAttributes(Constants.LDAP_ATTRIBUTE_BUSINESS_CATEGORY))) {
            log.info("No roles found for user: {}. Returning empty granted authorities list.", ldapResult.getStringAttribute(Constants.LDAP_ATTRIBUTE_UID));

            return new ArrayList<>();
        }

        return Arrays.stream(ldapResult.getStringAttributes(Constants.LDAP_ATTRIBUTE_BUSINESS_CATEGORY)).toList();

    }

    private PasswordEncoder newPasswordEncoder() {
        final BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                // Prefix so that apache directory understands that bcrypt has been used.
                // Without this, it assumes SSHA and fails during authentication.
                return "{CRYPT}" + crypt.encode(rawPassword);
            }
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return crypt.matches(rawPassword, encodedPassword.substring(7));
            }
        };
    }

}
