import { Request } from "./Request";

/**
 * @typedef {import("@types/web/models").Candidate } Candidate
 * @typedef {import("@types/web/models").Job } Job
 */

const Candidate = {
    get: () => Request('get', '/candidates'),
    /**
     * @param {RequiredKeys<Candidate>} data 
     */
    create: (data) => Request('post', '/candidates', data),
    /**
     * @param {string} uuid
     * @param {RequiredKeys<Candidate>} data 
     */
    update: (uuid, data) => Request('put', `/candidates/${uuid}`, data),
    /**
     * @param {{uuid: string}} args
     */
    jobs: ({uuid}) => ({
        /**
         * @param {RequiredKeys<Job>} data 
         */
        create: (data) => Request('post', `/jobs/`, data),
        /**
         * @param {Partial<Job>} data 
         */
        update: (data) => Request('put', `/jobs/${uuid}`, data),
        /**
         * @param {Partial<Job>} data 
         */
        delete: () => Request('delete', `/jobs/${uuid}`),
    })
}

export default Candidate;