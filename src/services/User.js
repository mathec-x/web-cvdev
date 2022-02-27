import { Request } from "./Request";

export default {
    /**
     * @param {{login: string, password: string}} data 
     */
    login: (data) => Request('post', `/login`, data)
}