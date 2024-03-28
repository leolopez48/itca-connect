package sv.edu.itca.spring.embedded.ldap.dto.db;

import lombok.Data;

@Data
public class ItcaUserIp {

    private int userId;
    private String ipAddr;
}
