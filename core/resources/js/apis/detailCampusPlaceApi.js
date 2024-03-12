import axios from "axios";
// import { interceptorRequest, interceptorReponse } from "./interceptor";

const detailCampusPlaceApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/detailCampusPlace",
});

// detailCampusPlaceApi.interceptors.request.use(interceptorRequest);
// detailCampusPlaceApi.interceptors.response.reject(interceptorReponse);

export default detailCampusPlaceApi;
