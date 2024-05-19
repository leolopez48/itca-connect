package sv.edu.itca.spring.embedded.ldap.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sv.edu.itca.spring.embedded.ldap.model.ItcaUser;

import java.util.Optional;

public interface ItcaUserDao extends JpaRepository<ItcaUser, Integer> {

    ItcaUser save(ItcaUser user);

    Optional<ItcaUser> findItcaUserByCarne(String carne);

    @Modifying
    @Query("UPDATE ItcaUser u set u.ip = :ip where u.carne = :carne")
    int updateIpByUserId(@Param("carne") int carne, @Param("ip") String ip);

}
