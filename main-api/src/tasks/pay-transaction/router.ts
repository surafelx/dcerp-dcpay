import { Request, Response, NextFunction, Router } from 'express'
import payTransactionService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../../file/period/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', employee = null } = req.query ?? ''
            const employeeId = employee
            const queryLowered = q.toString().toLowerCase()
            const payTransactions = await payTransactionService.getAllFromOrganization(organizationId, employeeId)
            const renamedPayTransactions = payTransactions.map(({
                id,
                employee_id,
                transaction_id,
                transaction_definition_id,
                transaction_amount,
                employee_code,
                employee_first_name,
                employee_last_name,
                transaction_code,
                transaction_name,
                transaction_type_name
            }) => ({
                id,
                employeeId: employee_id,
                transactionId: transaction_id,
                transactionDefinitionId: transaction_definition_id,
                transactionAmount: transaction_amount,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                transactionCode: transaction_code,
                transactionName: transaction_name,
                transactionTypeName: transaction_type_name
            }));
            const filteredData = renamedPayTransactions.filter(
                payTransaction =>
                (
                    payTransaction.employeeCode.toLowerCase().includes(queryLowered) ||
                    payTransaction.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    payTransaction.employeeLastName.toLowerCase().includes(queryLowered) ||
                    payTransaction.transactionCode.toLowerCase().includes(queryLowered) ||
                    payTransaction.transactionName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedPayTransactions,
                payTransaction: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = {userId: userId, organizationId, periodId: currentPeriod[0].id}
            const createdPayTransaction = await payTransactionService.create({ ...req.body.data }, userInfo)
            res.send(createdPayTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = {userId: userId, organizationId, periodId: currentPeriod[0].id}
            const { id } = req.params
            await payTransactionService.deletePayTransaction(String(id), userInfo)
            res.send(200)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = {userId: userId, organizationId, periodId: currentPeriod[0].id}
            const updatedPayTransaction = await payTransactionService.updatePayTransaction(req.body.data, userInfo)
            res.send(updatedPayTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


