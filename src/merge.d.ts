import { Cookie } from "express-session";

declare module 'express-session' {
    interface SessionData {
        cookie: Cookie
    }
}