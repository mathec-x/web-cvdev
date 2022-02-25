import { UserLogin } from 'UserLogin';
import { UserStore } from 'UserStore';

declare module 'react-redux' {
    export interface DefaultRootState {
        user: UserLogin
    }
}