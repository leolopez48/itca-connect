package sv.edu.itca.spring.embedded.ldap.service;

import javax.naming.Name;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.SearchControls;

import org.springframework.http.HttpStatus;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sv.edu.itca.spring.embedded.ldap.dao.PersonRepo;
import sv.edu.itca.spring.embedded.ldap.model.ItcaUser;
import sv.edu.itca.spring.embedded.ldap.model.Person;
import sv.edu.itca.spring.embedded.ldap.service.itca_user.ItcaUserServiceImpl;

import java.util.List;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Service
public class PersonRepoImpl implements PersonRepo {

	public static final String BASE_DN = "dc=itca,dc=edu,dc=sv";

	private final LdapTemplate ldapTemplate;

	//private final GroupServiceImpl groupService;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private final ItcaUserServiceImpl itcaUserService;

    public PersonRepoImpl(LdapTemplate ldapTemplate, BCryptPasswordEncoder bCryptPasswordEncoder, ItcaUserServiceImpl itcaUserService) {
        this.ldapTemplate = ldapTemplate;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.itcaUserService = itcaUserService;
    }

    @Override
	public String create(Person p) {
		Name dn = buildDn(p.getUserId());
		ldapTemplate.bind(dn, null, buildAttributes(p));
		//groupService.addMemberToGroup(p.getBusinessCategory(), p);

		itcaUserService.saveUser(ItcaUser.builder()
						.id(0)
						.name(p.getFullName())
						.email(p.getMail())
						.carne(p.getUserId())
						.password(bCryptPasswordEncoder.encode(p.getUserPassword()))
						.roleId(1) //student role
						.careerId(1) //career by default now is 1
				.build());

		return p.getUserId() + " created successfully";
	}

	@Override
	public String update(Person p) {
		Name dn = buildDn(p.getUserId());
		ldapTemplate.rebind(dn, null, buildAttributes(p));
		return p.getUserId() + " updated successfully";
	}

	@Override
	public String remove(String userId) {
		Name dn = buildDn(userId);
		// ldapTemplate.unbind(dn, true); //Remove recursively all entries
		ldapTemplate.unbind(dn);
		return userId + " removed successfully";
	}

	@Override
	public String updateUserIp(String userId, String ipAddr) {
		itcaUserService.updateUserIp(Integer.parseInt(userId), ipAddr);

		return HttpStatus.OK.toString();
	}

	private Attributes buildAttributes(Person p) {
		BasicAttribute ocattr = new BasicAttribute("objectclass");
		ocattr.add("inetOrgPerson");
		ocattr.add("organizationalPerson");
		ocattr.add("person");
		ocattr.add("top");
		Attributes attrs = new BasicAttributes();
		attrs.put(ocattr);
		//attrs.put("uid", p.getUserId());
		attrs.put("sn", p.getFullName());
		attrs.put("mail", p.getMail());
		attrs.put("userPassword", "{CRYPT}" + bCryptPasswordEncoder.encode(p.getUserPassword()));
		attrs.put("businessCategory", p.getBusinessCategory());
		return attrs;
	}

	public Name buildDn(String userId) {
		return LdapNameBuilder.newInstance("ou=Students," + BASE_DN)
				//.add("ou", "system") .add("ou", "users")
				.add("cn", userId)
				.build();
	}

	public Name buildBaseDn() {
		return LdapNameBuilder.newInstance(BASE_DN)
				//.add("ou", "people")
				.build();
	}

	public Name buildBaseDnFindOne(String userId) {
		return LdapNameBuilder.newInstance(BASE_DN)
				.add("ou", "STUDENTS")
				//.add("ou", "system")
				//.add("ou", "users")
				.add("cn", userId)
				.build();
	}

	@Override
	public List<Person> retrieve() {
		SearchControls searchControls = new SearchControls();
		searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);

		return ldapTemplate.search(query().base(buildBaseDn()).where("objectClass").is("person")
						.and("uid").not().whitespaceWildcardsLike("admin"),
                new PersonAttributeMapper());
	}

	@Override
	public Person retrieveByUserId(String userId) {
		SearchControls searchControls = new SearchControls();
		searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		return ldapTemplate.lookup(buildBaseDnFindOne(userId), new PersonAttributeMapper());
	}

	private static class PersonAttributeMapper implements AttributesMapper<Person> {

		@Override
		public Person mapFromAttributes(Attributes attributes) throws NamingException {
			Person person = new Person();
			person.setUserId(null != attributes.get("cn") ? attributes.get("cn").get().toString() : null);
			person.setFullName(null != attributes.get("sn") ? attributes.get("sn").get().toString() : null);
			person.setMail(null != attributes.get("mail") ? attributes.get("mail").get().toString() : null);
			person.setUserPassword(null != attributes.get("userPassword") ? attributes.get("userPassword").get().toString() : null);
			return person;
		}
	}

}