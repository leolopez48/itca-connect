package sv.edu.itca.itcaconnectauthldap.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortalUser {

    private String username;
    private List<String> grantedAuthorities;

}
