import { Request } from "./Request";

/**
 * @typedef {import("@types/web/models").Skill} Skill
 * @typedef {import("@types/web/models").Question} Question
 */

export default {
    /**
     * @param {NonNullable<Skill>} data 
     */
    create: (data) => Request('post', `/skills`, data),
    /** 
     * @param {string} skilluuid 
     */
    question: (skilluuid) => ({
        /**
         * @param {Required<Question>} data 
         */
        create: (data) => Request('post', `/question/${skilluuid}`, data)
    }),
    /** 
     * @param {string} skilluuid 
     */
    lib: (skilluuid) => ({
        /**
         * @param {NonNullable<Skill>} data 
         */
        create: (data) => Request('post', `/skills/${skilluuid}`, data),
        /** 
         * @param {string} libuuid 
         */
        question: (libuuid) => ({
            /**
             * @param {Required<Question>} data 
             */
            create: (data) => Request('post', `/question/${libuuid}`, data)
        }),
    })
}