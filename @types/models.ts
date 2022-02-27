export interface User {
    uuid: string
    token: string
    email: string
}

export interface Candidate {
    uuid: string
    nick: string
    email: string
    image: string
    name: string
    theme: {
        primary: string
        secondary: string
    }
    skills: Skill[]
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