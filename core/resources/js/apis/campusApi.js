import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const campusApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/campus",
});

// campusApi.interceptors.request.use(interceptorRequest);
// campusApi.interceptors.response.reject(interceptorReponse);

export default campusApi;
