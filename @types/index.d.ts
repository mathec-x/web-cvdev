import { User } from "./models";

declare module 'react-redux' {
    export interface DefaultRootState {
        user: User
    }
}