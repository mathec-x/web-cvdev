import { Request } from "./Request";

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
     * @param {Partial<Job>} job
     */
    jobs: (job) => ({
        /**
         * @param {RequiredKeys<Job>} data 
         */
        create: (data) => Request('post', `/jobs/`, data),
        /**
         * @param {Partial<Job>} data 
         */
        update: (data) => Request('put', `/jobs/${job.uuid}`, data),
        /**
         * @param {Partial<Job>} data 
         */
        delete: () => Request('delete', `/jobs/${job.uuid}`),
        /** 
         * @param {Partial<Skill>} skill
         */
        skills: (skill) => ({
            get: (q) => Request('get', `/skills?q=${q}`),
            delete: () => Request('delete', `/skills/${encodeURIComponent(skill.tag)}`, { company: job.uuid }),
            /**
             * @param {RequiredKeys<Skill>} data 
             */
            create: (data) => Request('post', `/skills`, { title: data.title, company: job.uuid }),
            /** 
             * @param {Partial<Skill>} skill
             */
            libs: (lib) => ({
                get: (q) => Request('get', `/skills/${encodeURIComponent(skill.tag)}?q=${q}`),
                /**
                 * @param {Partial<Skill>} lib 
                 */
                delete: () => Request('delete', `/skills/${encodeURIComponent(skill.tag)}?lib=${encodeURIComponent(lib.tag)}`),
                /**
                 * @param {Partial<Skill>} data 
                 */
                create: (data) => Request('post', `/skills/${encodeURIComponent(skill.tag)}`, { lib: data.tag, company: job.uuid }),
            })
        })
    })
}

export default Candidate;