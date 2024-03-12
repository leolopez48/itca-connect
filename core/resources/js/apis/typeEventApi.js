import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const typeEventApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/typeEvent",
});

// typeEventApi.interceptors.request.use(interceptorRequest);
// typeEventApi.interceptors.response.reject(interceptorReponse);

export default typeEventApi;
