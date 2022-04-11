import Request from "fx-request";

const User = {
    /**
     * @param {{login: string, password: string}} data 
     */
    login: (data) => Request('/api/login').post(data)
}

export default User;