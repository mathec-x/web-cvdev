import { Request } from "./Request";

/**
 * @typedef {import("@types/web/models").Skill} Skill
 * @typedef {import("@types/web/models").Question} Question
 */

export default {
    /**
     * @param {{tag: string}} data 
     */
    delete: (data) => Request('delete', `/skills/${encodeURIComponent(data.tag)}`),
    /**
     * @param {RequiredKeys<Skill>} data 
     */
    create: (data) => Request('post', `/skills`, data),
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
     * @param {{tag: string}} skill 
     */
    libs: (skill) => ({
        /**
         * @param {{tag: string}} lib 
         */
        delete: (lib) => Request('delete', `/skills/${encodeURIComponent(skill.tag)}?lib=${encodeURIComponent(lib.tag)}`),
        /**
         * @param {RequiredKeys<Skill>} data 
         */
        create: (data) => Request('post', `/skills/${encodeURIComponent(skill.tag)}`, data),
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