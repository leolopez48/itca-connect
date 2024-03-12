import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const roleApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/role",
});

// roleApi.interceptors.request.use(interceptorRequest);
// roleApi.interceptors.response.reject(interceptorReponse);

export default roleApi;
