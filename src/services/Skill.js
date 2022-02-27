import { Request } from "./Request";

export default {
    create: (data) => Request('post', `/skills`, data)
}