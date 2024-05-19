package sv.edu.itca.spring.embedded.ldap.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.ldap.odm.annotations.Entry;

@Getter
@Setter
@ToString
public class Person {

	private String userId;
	private String fullName;
	private String mail;
	private String userPassword;
	private String businessCategory = "Student";
}