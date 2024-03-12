import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const placeTypeApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/placeType",
});

// placeTypeApi.interceptors.request.use(interceptorRequest);
// placeTypeApi.interceptors.response.reject(interceptorReponse);

export default placeTypeApi;
