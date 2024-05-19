package sv.edu.itca.spring.embedded.ldap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SpringEmbeddedLdapApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringEmbeddedLdapApplication.class, args);
    }

}
