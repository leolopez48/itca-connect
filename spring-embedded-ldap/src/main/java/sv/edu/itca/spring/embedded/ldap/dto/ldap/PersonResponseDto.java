package sv.edu.itca.spring.embedded.ldap.dto.ldap;

import lombok.Data;

@Data
public class PersonResponseDto {

    private String userId;
    private String fullName;
    private String mail;
}
