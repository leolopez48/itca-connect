import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const userApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/user",
});

// userApi.interceptors.request.use(interceptorRequest);
// userApi.interceptors.response.reject(interceptorReponse);

export default userApi;
