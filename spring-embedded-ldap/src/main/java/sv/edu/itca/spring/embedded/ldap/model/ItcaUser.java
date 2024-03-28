package sv.edu.itca.spring.embedded.ldap.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "users", schema = "students")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItcaUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(unique = true)
    private String carne;
    private String password;

    @Column(unique = true)
    private String email;

    @Column(name = "role_id")
    private Integer roleId;

    private String ip;

    @Column(name = "career_id")
    private Integer careerId;
}
