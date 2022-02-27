import { Request } from "./Request";

export default {
    get: () => Request('get', '/candidates'),
    create: (data) => Request('post', '/candidates', data),
}