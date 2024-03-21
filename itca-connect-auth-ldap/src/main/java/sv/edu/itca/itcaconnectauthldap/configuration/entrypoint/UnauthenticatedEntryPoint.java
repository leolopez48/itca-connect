package sv.edu.itca.itcaconnectauthldap.configuration.entrypoint;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import sv.edu.itca.itcaconnectauthldap.configuration.util.Constants;

import java.io.IOException;
import java.util.Optional;

@Configuration
@Slf4j
public class UnauthenticatedEntryPoint implements AuthenticationEntryPoint {
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.info("Access Denied. Unauthenticated access attempt to resource {} from {} Authorization header: {}", request.getRequestURI(),

                Optional.ofNullable(request.getHeader(Constants.HEADER_AUTHORIZATION))
                        .orElse(request.getRemoteAddr()),
                request.getHeader(Constants.HEADER_AUTHORIZATION));

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "It seems whether you're trying to access a resource without authenticating. Please authenticate first then try again!");
    }
}
