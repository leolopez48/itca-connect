package sv.edu.itca.itcaconnectauthldap.service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import sv.edu.itca.itcaconnectauthldap.dto.ItcaUserIp;

@FeignClient(name = "itcaUser-service", url = "${FEIGN_CLIENT_CRUD_LDAP:localhost}:8082", path = "/persist-ip-user")
public interface ItcaUserClient {

    @PutMapping
    ResponseEntity<String> persistIpUser(@RequestBody ItcaUserIp request);

}
