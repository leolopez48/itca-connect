import axios from "axios";

export const coreService = axios.create({
    baseURL: process.env.CORE_URL+'/api',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default coreService;