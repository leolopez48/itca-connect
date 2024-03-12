import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const eventApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/event",
});

// eventApi.interceptors.request.use(interceptorRequest);
// eventApi.interceptors.response.reject(interceptorReponse);

export default eventApi;
