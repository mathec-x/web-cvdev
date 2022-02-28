import { Request } from "./Request";

/**
 * @typedef {import("@types/web/models").Candidate } Candidate
 */

export default {
    get: () => Request('get', '/candidates'),
    /**
     * @param {RequiredKeys<Candidate>} data 
     */
    create: (data) => Request('post', '/candidates', data ),
}