import Http from "./http.service";

export class LdapService extends Http {
    baseUrl = 'http://64.23.242.28:8002/spring-embedded-ldap'

    super() { }
}