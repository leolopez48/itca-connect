import Http from "./http.service";

export class AuthService extends Http {
    baseUrl = 'http://64.23.242.28:8001/itca-connect-auth-ldap'

    super() { }
}