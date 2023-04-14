
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'


export const authorizeUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.decode(token, { complete: true })
        req.user = decoded.payload
        return next()
    } catch (e) {
        next()
    }
}

