package sv.edu.itca.spring.embedded.ldap.dao;

import sv.edu.itca.spring.embedded.ldap.model.Person;

public interface GroupRepo {

	public void addMemberToGroup(String groupName, Person p);
}