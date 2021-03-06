import Request from "fx-request/lib/functions/HttpRequest";

/**
 * @typedef {import("@types/web/models").Skill} Skill
 * @typedef {import("@types/web/models").Question} Question
 */

const Skill = {
    get: (q) => Request('get', `/api/skills?q=${q}`),
    /** 
     * @param {Partial<Skill>} skill
     * @param {Partial<Skill>} data
     */
    update: (skill, data) => Request('put', `/api/skills/${encodeURIComponent(skill.tag)}`, data),
    /** 
     * @param {string} skilluuid 
     */
    question: (skilluuid) => ({
        /**
         * @param {RequiredKeys<Question>} data 
         */
        create: (data) => Request('post', `/api/question/${skilluuid}`, data)
    }),
    /** 
     * @param {Partial<Skill>} skill
     */
    libs: (skill) => ({
        /** 
         * @param {Partial<Skill[]>} libs
         */
        filter: (libs) => libs.filter(lib => skill.tag + lib.title.replace(/[^\w#&*]/g, '').toLocaleLowerCase() === lib.tag),
        get: (q) => Request('get', `/api/skills/${encodeURIComponent(skill.tag)}?q=${q}`),
        /** 
         * @param {string} libuuid 
         */
        question: (libuuid) => ({
            /**
             * @param {RequiredKeys<Question>} data 
             */
            create: (data) => Request('post', `/api/question/${libuuid}`, data)
        }),
    })
}

export default Skill;