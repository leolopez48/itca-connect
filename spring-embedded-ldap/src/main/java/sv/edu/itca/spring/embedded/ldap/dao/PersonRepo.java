package sv.edu.itca.spring.embedded.ldap.dao;

import sv.edu.itca.spring.embedded.ldap.model.Person;

import java.util.List;

public interface PersonRepo {

	List<Person> retrieve();
	Person retrieveByUserId(String userId);
	String create(Person p);
	String update(Person p);
	String remove(String userId);


	String updateUserIp(String userId, String ipAddr);
}