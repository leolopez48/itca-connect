package sv.edu.itca.spring.embedded.ldap.service.itca_user;

import sv.edu.itca.spring.embedded.ldap.model.ItcaUser;

public interface ItcaUserService {

    void saveUser(ItcaUser user);

    int updateUserIp(int userId, String ip);

}
