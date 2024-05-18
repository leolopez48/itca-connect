package sv.edu.itca.itcaconnectauthldap.configuration.util;

public class Constants {

    private Constants() {
    }

    public static final String LDAP_ROLE_ADMIN = "ADMIN";
    public static final String LDAP_ROLE_STUDENTS = "STUDENTS";

    public static final int STATUS_CODE_SUCCESS = 0;

    public static final String MESSAGE_SUCCESS = "Success";
    public static final String MESSAGE_AUTHENTICATION_FAILED = "Authentication failed.";

    public static final String JWT_CLAIM_USER_ROLES = "grantedAuthorities";

    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String HEADER_AUTHORIZATION_PREFIX = "Bearer ";

    public static final String LDAP_ATTRIBUTE_BUSINESS_CATEGORY = "businessCategory";
    public static final String LDAP_ATTRIBUTE_UID = "uid";

}
