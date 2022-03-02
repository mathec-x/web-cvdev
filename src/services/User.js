import { Request } from "./Request";

const User = {
    /**
     * @param {{login: string, password: string}} data 
     */
    login: (data) => Request('post', `/login`, data)
}

export default User;