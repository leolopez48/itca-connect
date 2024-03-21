package sv.edu.itca.itcaconnectauthldap.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sv.edu.itca.itcaconnectauthldap.configuration.entrypoint.AccessDeniedEntryPoint;
import sv.edu.itca.itcaconnectauthldap.configuration.entrypoint.UnauthenticatedEntryPoint;
import sv.edu.itca.itcaconnectauthldap.configuration.jwt.JwtRequestFilter;
import sv.edu.itca.itcaconnectauthldap.configuration.util.Constants;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {

    private final JwtRequestFilter jwtRequestFilter;
    private final UnauthenticatedEntryPoint unauthenticatedEntryPoint;
    private final AccessDeniedEntryPoint accessDeniedEntryPoint;

    @Value("${autz.permitted.paths.all}")
    private String[] permittedPaths;
    @Value("${autz.permitted.paths.students}")
    private String[] studentsRolePermittedPaths;
    @Value("${autz.permitted.paths.admin:}")
    private String[] adminRolePermittedPaths;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthenticatedEntryPoint))
                .exceptionHandling(ex -> ex.accessDeniedHandler(accessDeniedEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                                auth.requestMatchers(permittedPaths).permitAll()
                                .requestMatchers(studentsRolePermittedPaths).hasAuthority(Constants.LDAP_ROLE_STUDENTS)
                                .requestMatchers(adminRolePermittedPaths).hasAuthority(Constants.LDAP_ROLE_ADMIN)
                                .anyRequest().authenticated()
                ).addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));

        return http.build();
    }
}
