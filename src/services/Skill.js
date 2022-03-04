import { Request } from "./Request";

/**
 * @typedef {import("@types/web/models").Skill} Skill
 * @typedef {import("@types/web/models").Question} Question
 */

const Skill = {
    get: (q) => Request('get', `/skills?q=${q}`),
    /** 
     * @param {string} skilluuid 
     */
    question: (skilluuid) => ({
        /**
         * @param {RequiredKeys<Question>} data 
         */
        create: (data) => Request('post', `/question/${skilluuid}`, data)
    }),
    /** 
     * @param {Partial<Skill>} skill
     */
    libs: (skill) => ({
        /** 
         * @param {Partial<Skill[]>} libs
         */
        filter: (libs) => libs.filter(lib => skill.tag + lib.title.replace(/[^\w#&*]/g, '').toLocaleLowerCase() === lib.tag),
        get: (q) => Request('get', `/skills/${encodeURIComponent(skill.tag)}?q=${q}`),
        /** 
         * @param {string} libuuid 
         */
        question: (libuuid) => ({
            /**
             * @param {RequiredKeys<Question>} data 
             */
            create: (data) => Request('post', `/question/${libuuid}`, data)
        }),
    })
}

export default Skill;