import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const schoolApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/school",
});

// schoolApi.interceptors.request.use(interceptorRequest);
// schoolApi.interceptors.response.reject(interceptorReponse);

export default schoolApi;
