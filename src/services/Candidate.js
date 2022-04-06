// import { Request } from "./Request";
import Request from "fx-request/lib/functions/HttpRequest";

/**
 * @typedef {import("@types/web/models").Candidate } Candidate
 * @typedef {import("@types/web/models").Job } Job
 * @typedef {import("@types/web/models").Skill } Skill
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
     * @param {Partial<Skill>} lib
     */
    libs: (lib) => ({
        connect: (/**@type {string}*/ tag) => Request('post', `/skills/${encodeURIComponent(tag)}`, lib),
        disconnect: (/**@type {string}*/ tag) => Request('delete', `/skills/${encodeURIComponent(tag)}`, lib),
    }),
    /**
     * @param {Partial<Job>} job
     */
    jobs: (job = {}) => ({
        /**
         * @param {RequiredKeys<Job>} data 
         */
        create: (data) => Request('post', `/jobs/`, data),
        /**
         * @param {Partial<Job>} data 
         */
        update: (data) => Request('put', `/jobs/${job.uuid}`, data),
        delete: () => Request('delete', `/jobs/${job.uuid}`),
        /** 
         * @param {Partial<Skill>} skill
         */
        skills: (skill) => ({
            delete: () => Request('delete', `/skills/${encodeURIComponent(skill.tag)}`, { company: job.uuid }),
            connect: (connect) => Request(connect ? 'post' : 'delete', `/skills`, { ...skill, company: job.uuid }),
        })
    })
}

export default Candidate;