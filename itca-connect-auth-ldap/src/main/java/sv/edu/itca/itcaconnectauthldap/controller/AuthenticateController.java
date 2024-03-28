package sv.edu.itca.itcaconnectauthldap.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sv.edu.itca.itcaconnectauthldap.configuration.util.HttpUtils;
import sv.edu.itca.itcaconnectauthldap.security.PortalUserService;
import sv.edu.itca.itcaconnectauthldap.dto.AuthRequest;
import sv.edu.itca.itcaconnectauthldap.dto.AuthResponse;

@RestController
@RequestMapping("/authenticate")
@Slf4j
public class AuthenticateController {

    private final PortalUserService portalUserService;

    private final HttpUtils httpUtils;

    public AuthenticateController(PortalUserService portalUserService, HttpUtils httpUtils) {
        this.portalUserService = portalUserService;
        this.httpUtils = httpUtils;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthRequest authRequest, HttpServletRequest request) {
        log.info("Authentication request for user {} received!", authRequest.getUsername());

        return ResponseEntity.ok(portalUserService.authenticateUser(authRequest.getUsername(), authRequest.getPassword(), httpUtils.getIpAddressFromHeader(request)));
    }

}
