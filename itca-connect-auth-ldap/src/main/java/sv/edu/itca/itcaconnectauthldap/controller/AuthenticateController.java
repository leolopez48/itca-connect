package sv.edu.itca.itcaconnectauthldap.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sv.edu.itca.itcaconnectauthldap.configuration.jwt.PortalUserService;
import sv.edu.itca.itcaconnectauthldap.dto.AuthRequest;
import sv.edu.itca.itcaconnectauthldap.dto.AuthResponse;

@RestController
@RequestMapping("/authenticate")
@RequiredArgsConstructor
@Slf4j
public class AuthenticateController {

    private final PortalUserService portalUserService;

    @PostMapping
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @NonNull AuthRequest authRequest) {
        log.info("Authentication request for user {} received!", authRequest.getUsername());
        return ResponseEntity.ok(portalUserService.authenticateUser(authRequest.getUsername(), authRequest.getPassword()));
    }

}
