export interface User {
    uuid: string
    token: string
    email: string
    super: boolean
}

export interface Question {
    uuid?: string
    description: string
    answers: Answer[]
    Skill?: Skill
    skillId?: number
}

export interface Answer {
    uuid?: string
    description: string
    isValid?: Boolean
    Question?: Question
    questionId?: number
}

export interface Skill {
    uuid?: string
    tag?: string
    title: string
    questions?: Question[]
}

export interface Address {
    uuid?: string
    cep: number
    number: number
    city: string
    complement: string
    neighborhood: string
    street: string
    uf: string
    geo: {
        latitude: number
        longitude: number
    }
}

export interface Contact {
    uuid?: string
    name: string
    phone: string

}

export interface Candidate {
    uuid?: string
    email: string
    image: string
    name: string
    nick: string
    about: string
    addressLine: string
    birthday?: Date
    links?: { [url:string]: string }
    address?: Address
    contacts?: Contact[]
    jobs?: Job[]
    libs?: Skill[]
    educations: Education[]
}

export interface Job {
    uuid?: string
    occupation: string
    begin: string
    finish: string
    site: string
    image: string
    description: string
    company: string
    skills?: Skill[]
}

export interface Education {
    uuid?: string
    institution: string
    course: string
    begin: string
    finish: string
    site: string
    image: string
}
