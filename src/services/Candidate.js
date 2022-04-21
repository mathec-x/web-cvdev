// import { Request } from "./Request";
import Request from "fx-request/lib/functions/HttpRequest";

/**
 * @typedef {import("@types/web/models").Candidate } Candidate
 * @typedef {import("@types/web/models").Job } Job
 * @typedef {import("@types/web/models").Education } Education
 * @typedef {import("@types/web/models").Skill } Skill
 * @typedef {import("@types/web/models").Language } Language
 */

const Candidate = {
    get: () => Request('get', '/api/candidates'),
    /**
     * @param {RequiredKeys<Candidate>} data 
     */
    create: (data) => Request('post', '/api/candidates', data),
    /**
    * @param {RequiredKeys<Candidate>} data 
    */
    delete: (data) => Request('delete', '/api/candidates/' + data.uuid),
    /**
     * @param {string} uuid
     * @param {RequiredKeys<Candidate>} data 
     */
    update: (uuid, data) => Request('put', `/api/candidates/${uuid}`, data),
    /** 
     * @param {Partial<Skill>} lib
     */
    libs: (lib) => ({
        connect: (/**@type {string}*/ tag) => Request('post', `/api/skills/${encodeURIComponent(tag)}`, lib),
        disconnect: () => Request('delete', `/api/skills/${encodeURIComponent(lib.tag)}`),
    }),
    /**
     * @param {Partial<Job>} job
     */
    jobs: (job = {}) => ({
        /**
         * @param {RequiredKeys<Job>} data 
         */
        create: (data) => Request('post', `/api/jobs/`, data),
        /**
         * @param {Partial<Job>} data 
         */
        update: (data) => Request('put', `/api/jobs/${job.uuid}`, data),
        delete: () => Request('delete', `/api/jobs/${job.uuid}`),
        /** 
         * @param {Partial<Skill>} skill
         */
        skills: (skill) => ({
            delete: () => Request('delete', `/api/skills/${encodeURIComponent(skill.tag)}`, { company: job.uuid }),
            connect: (connect) => Request(connect ? 'post' : 'delete', `/api/skills`, { ...skill, company: job.uuid }),
        })
    }),
    /**
     * @param {Partial<Education>} education
     */
    educations: (education = {}) => ({
        /**
         * @param {RequiredKeys<Education>} data 
         */
        create: (data) => Request('post', `/api/educations/`, data),
        /**
         * @param {Partial<Education>} data 
         */
        update: (data) => Request('put', `/api/educations/${education.uuid}`, data),
        delete: () => Request('delete', `/api/educations/${education.uuid}`),
    }),
    /**
     * @param {Partial<Language>} language
     */
    languages: (language = {}) => ({
        /**
         * @param {RequiredKeys<Language>} data 
         */
        create: (data) => Request('post', `/api/languages/`, data),
        /**
         * @param {Partial<Language>} data 
         */
        update: (data) => Request('put', `/api/languages/${language.uuid}`, data),
        delete: () => Request('delete', `/api/languages/${language.uuid}`),
    })
}

export default Candidate;