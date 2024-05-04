import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const careerApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/career",
});

// careerApi.interceptors.request.use(interceptorRequest);
// careerApi.interceptors.response.reject(interceptorReponse);

export default careerApi;
