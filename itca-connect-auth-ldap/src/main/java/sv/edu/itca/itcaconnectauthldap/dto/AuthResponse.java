package sv.edu.itca.itcaconnectauthldap.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@SuperBuilder
public class AuthResponse extends AbstractResponse {

    private String token;
    private String username;
    private List<String> userRoles;
}
