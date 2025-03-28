import { Request, Response, NextFunction, Router } from 'express'
import jwt from 'jsonwebtoken'
import authorizerDao from './dao'
import authorizerService from './service'
import userService from '../settings/user-management/users/service'
import periodService from '../file/period/service'
import organizationService from '../settings/general-setup/company/service'
import authorizerValidator from './validator'


const createError = require('http-errors')

const router = Router()


router.post('/company-setup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = req.body
        await organizationService.setupApp(data)
        // Add Organization


    } catch (err) {
        console.log(err)
        res.status(400).send(err)
        next(err)
    }
})

router.post('/login',
    authorizerValidator.login,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { isMatch, user } = await authorizerDao.comparePassword(
                req.body?.email,
                req.body?.password
            )
            if (!isMatch) {
                throw createError.Unauthorized('Invalid Username and/or Password')
            }
            const accessToken = jwt.sign({ id: user.id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRATION || 34000 })
            await authorizerService.authorizeUser(user.id)
            const currentPeriod = await periodService.getCurrentPeriod(user.organization_id)

            const nextPeriod = await periodService.getNextPeriod(user.organization_id)
            const { organization_name: organizationName } = await organizationService.getInfo(user.organization_id)
            res.send({
                accessToken,
                userData: {
                    ...user,
                    password: undefined,
                    currentPeriod: currentPeriod[0],
                    nextPeriod: nextPeriod[0],
                    organizationName
                }
            })
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })


router.get('/me', async (req: Request, res, next) => {
    try {
        const requestUser = req.user as any
        const user = await userService.getInfo(requestUser.id)
        // Check if user logged in has surpassed expiration
        const isUserAuthorized = await authorizerService.checkIfUserStillAuthorized(user.id, process.env.NEXT_PUBLIC_JWT_EXPIRATION);
        const accessToken = isUserAuthorized ? jwt.sign({ id: user.id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRATION }) : null
        const currentPeriod = await periodService.getCurrentPeriod(user.organization_id)
        const { organization_name: organizationName } = await organizationService.getInfo(user.organization_id)
        const { role_id: roleId } = await userService.getUserAuthorizationInfo(String(user.id))
        const navigation = await authorizerDao.getNavigationPath(roleId)
        const userData = {
            ...user,
            role: user.role_name.toLowerCase(),
            currentPeriod,
            organizationName
        }
        res.send({ accessToken, userData, navigation })
    } catch (err) {
        res.status(400).send(err)
        next(err)
    }
})


// const defaultNavMenu = [
//     {
//         title: 'File',
//         icon: 'AccountOutline',
//         children: [
//             {
//                 title: 'Period',
//                 path: '/apps/file/period'
//             },
//             {
//                 title: 'Entity Management',
//                 path: '/apps/file/entity-management'
//             },
//             {
//                 title: 'Employee Master',
//                 path: '/apps/file/employee-master'
//             },
//             {
//                 title: 'Parameter Definition',
//                 path: '/apps/file/parameter-definition'
//             },
//             {
//                 title: 'Transaction Definition',
//                 path: '/apps/file/transaction-definition'
//             },
//         ]
//     },
//     {
//         title: 'Tasks',
//         icon: 'AccountOutline',
//         children: [
//             {
//                 title: 'Loan Transaction',
//                 path: '/apps/tasks/loan-transaction'
//             },
//             {
//                 title: 'Pay Transaction',
//                 path: '/apps/tasks/pay-transaction'
//             },
//             {
//                 title: 'Membership',
//                 path: '/apps/tasks/membership'
//             },
//             {
//                 title: 'Discontinuation',
//                 path: '/apps/tasks/discontinuation'
//             },
//         ]
//     },
//     {
//         title: 'Process',
//         icon: 'AccountOutline',
//         children: [
//             {
//                 title: 'Payroll Process',
//                 path: '/apps/process/payroll-process'
//             },
//         ]
//     },
//     {
//         title: 'Reports',
//         icon: 'AccountOutline',
//         children: [
//             {
//                 title: 'Payroll Display',
//                 path: '/apps/reports/payroll-display'
//             },
//             {
//                 title: 'Payroll Advice',
//                 path: '/apps/reports/payroll-advice'
//             },
//             {
//                 title: 'Payroll Sheet',
//                 path: '/apps/reports/payroll-sheet'
//             },
//             // {
//             //     title: 'Beneficiary Pay Sheet',
//             //     path: '/apps/reports/beneficiary-pay-sheet'
//             // },
//             // {
//             //     title: 'Final Payment',
//             //     path: '/apps/reports/final-payment'
//             // },
//             // {
//             //     title: 'Income Tax Report',
//             //     path: '/apps/reports/income-tax-report'
//             // },
//             // {
//             //     title: 'Payroll JV',
//             //     path: '/apps/reports/payroll-jv'
//             // },
//             // {
//             //     title: 'Report Wizard',
//             //     path: '/apps/reports/payroll-wizard'
//             // },
//             // {
//             //     title: 'Pay Transaction Proof List',
//             //     path: '/apps/reports/pay-transaction-proof-list'
//             // },
//             // {
//             //     title: 'Loan Transaction Proof List',
//             //     path: '/apps/reports/loan-transaction-proof-list'
//             // }
//         ]
//     },
//     // {
//     //     title: 'Payroll History',
//     //     icon: 'AccountOutline',
//     //     children: [
//     //         {
//     //             title: 'Back Month Payroll Display',
//     //             path: '/apps/payroll-history/back-month-payroll-display'
//     //         },
//     //         {
//     //             title: 'Backpay Update',
//     //             path: '/apps/payroll-history/backpay-update'
//     //         },
//     //         {
//     //             title: 'Backpay Process',
//     //             path: '/apps/payroll-history/backpay-process'
//     //         },
//     //         {
//     //             title: 'Backpay Slip',
//     //             path: '/apps/payroll-history/backpay-slip'
//     //         },
//     //         {
//     //             title: 'Back Month Payroll Report',
//     //             path: '/apps/payroll-history/back-month-payroll-report'
//     //         },
//     //     ]
//     // },

//     {
//         title: 'Utilities',
//         icon: 'AccountOutline',
//         children: [
//             // {
//             //     title: 'Closing',
//             //     path: '/apps/utilities/closing'
//             // },
//             {
//                 title: 'TP Calculation',
//                 path: '/apps/utilities/transaction-parameter-calculation'
//             },
//             {
//                 title: 'Tax Rate',
//                 path: '/apps/utilities/tax-rate'
//             },
//             // {
//             //     title: 'Backup',
//             //     path: '/apps/utilities/backup'
//             // },
//             // {
//             //     title: 'Restore',
//             //     path: '/apps/utilities/restore'
//             // },
//             // {
//             //     title: 'Bringing Data Adjustment',
//             //     path: '/apps/utilities/bringing-data-adjustment'
//             // },
//         ]
//     },
//     {
//         title: 'Settings',
//         icon: 'AccountOutline',
//         children: [
//             {
//                 title: 'General Setup',
//                 path: '/apps/settings/general-setup'
//             },
//             {
//                 title: 'User Management',
//                 path: '/apps/settings/user-management'
//             },
//             {
//                 title: 'Rights Management',
//                 path: '/apps/settings/rights-management'
//             },
//         ]
//     },
// ]


router.get('/navigation', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['x-user-id'];
        const { role_id: roleId } = await userService.getUserAuthorizationInfo(String(userId))
        const navMenu = await authorizerDao.getNavigationMenu(roleId)
        res.send(navMenu)
        // res.send(defaultNavMenu)
    } catch (err) {
        res.status(400).send(err)
        next(err)
    }
})






export default router