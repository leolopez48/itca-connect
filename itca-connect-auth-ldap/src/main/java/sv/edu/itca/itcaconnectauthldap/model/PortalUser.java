package sv.edu.itca.itcaconnectauthldap.model;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortalUser implements Serializable {

    @Serial
    private static final long serialVersionUID = 2405172041950251807L;

    private String username;
    private List<String> grantedAuthorities;

}
