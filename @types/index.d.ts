import { Candidate, User } from "./models";

declare global {
    type RequiredKeys<T> = Omit<T, { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]>;
    type OptionalKeys<T> = Omit<T, { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]>;
}

declare module 'react-redux' {
    export interface DefaultRootState {
        user: User
        candidate: Candidate 
        candidates: Candidate[] 
    }
}