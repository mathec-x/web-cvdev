import { Candidate, User } from "./models";

declare module 'react-redux' {
    export interface DefaultRootState {
        user: User
        candidate: Candidate 
        candidates: Candidate[] 
    }
}