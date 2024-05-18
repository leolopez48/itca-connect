package sv.edu.itca.spring.embedded.ldap.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.naming.Name;
import java.util.Set;

@Getter
@Setter
@ToString
public class Group {

    private String name;
    private Set<Name> members;
}
