export const environment = {
    production: false,
    // coreApi: 'http://192.168.1.253:9090/api/',
    // chat: 'http://192.168.1.253:3001/chat',
    // coreApi: "http://192.168.1.253:9090/api",
    // coreApi: 'http://localhost:8000/api/',
    // chat: 'http://localhost:8000/chat',
    chatApi: "http://172.16.196.244:3001/api",
    coreApi: "http://172.16.196.244:9090/api",
    authApi: "http://172.16.196.244:8001/itca-connect-auth-ldap",
    loginApi: "http://172.16.196.244:8001/itca-connect-auth-ldap/authenticate",
    notificationApi: "http://172.16.196.244:3000",
    ldapApi: "http://172.16.196.244:8002/spring-embedded-ldap"
};
