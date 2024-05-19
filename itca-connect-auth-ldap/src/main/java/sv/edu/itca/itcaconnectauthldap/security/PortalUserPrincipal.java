package sv.edu.itca.itcaconnectauthldap.security;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sv.edu.itca.itcaconnectauthldap.model.PortalUser;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;

@RequiredArgsConstructor
public class PortalUserPrincipal implements UserDetails {

    private final PortalUser portalUser;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.portalUser.getGrantedAuthorities().stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String getPassword() {
        return StringUtils.EMPTY;
    }

    @Override
    public String getUsername() {
        return this.portalUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
