package sv.edu.itca.spring.embedded.ldap.service.itca_user;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sv.edu.itca.spring.embedded.ldap.dao.ItcaUserDao;
import sv.edu.itca.spring.embedded.ldap.model.ItcaUser;

@Service
@Transactional
public class ItcaUserServiceImpl implements ItcaUserService {

    private final ItcaUserDao itcaUserDao;

    public ItcaUserServiceImpl(ItcaUserDao itcaUserDao) {
        this.itcaUserDao = itcaUserDao;
    }

    @Override
    @Async
    public void saveUser(ItcaUser user) {
        if (itcaUserDao.findItcaUserByCarne(user.getCarne()).isEmpty()) { //registra el usuario en bd postgres
            itcaUserDao.save(user);
        }
    }

    @Override
    public int updateUserIp(int userId, String ip) {
       return itcaUserDao.updateIpByUserId(userId, ip);
    }

}
