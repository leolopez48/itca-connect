import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const carreerApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/carreer",
});

// carreerApi.interceptors.request.use(interceptorRequest);
// carreerApi.interceptors.response.reject(interceptorReponse);

export default carreerApi;
