package sv.edu.itca.itcaconnectauthldap.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class AbstractResponse {

    private int status;
    private String message;
}
