import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            correctAdminId: string,
            companyUserId: string,
            appUserId: string
        }
    }
}