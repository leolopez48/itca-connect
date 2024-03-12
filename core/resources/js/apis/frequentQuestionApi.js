import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const frequentQuestionApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/frequentQuestion",
});

// frequentQuestionApi.interceptors.request.use(interceptorRequest);
// frequentQuestionApi.interceptors.response.reject(interceptorReponse);

export default frequentQuestionApi;
