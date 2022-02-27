export interface User {
    uuid: string
    token: string
    email: string
}

export interface Question {
    title: string
    answers: QuestionAnswer[]
}

export interface QuestionAnswer {
    title: string
    isValid: boolean
    questionId: number
}

export interface SkillUser {
    userId: number
    skillId: number
}

export interface Skill {
    name: string
    title: string
    user: User[]
    questions: Question[]
}

export interface Address {
    cep: number,
    number: number,
    city: string,
    complement: string,
    neighborhood: string,
    street: string,
    uf: string,
    uuid: string
}

export interface Contact {
    uuid: string,
    name: string,
    phone: string

}

export interface Candidate {
    email: string,
    image: string,
    name: string,
    nick: string,
    uuid: string,
    address: Address,
    contacts: Contact[],
    skills: Skill[]
}