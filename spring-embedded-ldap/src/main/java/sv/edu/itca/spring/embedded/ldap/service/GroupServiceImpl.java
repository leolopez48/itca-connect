package sv.edu.itca.spring.embedded.ldap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;
import sv.edu.itca.spring.embedded.ldap.dao.GroupRepo;
import sv.edu.itca.spring.embedded.ldap.model.Person;

import javax.naming.Name;

@Service
public class GroupServiceImpl implements GroupRepo {

    @Autowired
    private LdapTemplate ldapTemplate;

    @Override
    public void addMemberToGroup(String groupName, Person p) {
        Name groupDn = buildGroupDn(groupName);
        Name personDn = buildPersonDn(p);

        DirContextOperations ctx = ldapTemplate.lookupContext(groupDn);
        ctx.addAttributeValue("uniqueMember", personDn);

        ldapTemplate.modifyAttributes(ctx);
    }

    private Name buildGroupDn(String groupName) {
        return LdapNameBuilder.newInstance()
                .add("ou", "system")
                .add("ou", "groups")
                .add("cn", groupName)
                .build();
    }

    private Name buildPersonDn(Person person) {
        return LdapNameBuilder.newInstance()
                .add("ou", "system")
                .add("ou", "users")
                .add("cn", person.getUserId())
                .build();
    }

}
