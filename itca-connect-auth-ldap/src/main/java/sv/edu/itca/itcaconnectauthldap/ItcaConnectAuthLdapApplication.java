package sv.edu.itca.itcaconnectauthldap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ItcaConnectAuthLdapApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItcaConnectAuthLdapApplication.class, args);
    }

}
