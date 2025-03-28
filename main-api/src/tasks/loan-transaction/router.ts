import { Request, Response, NextFunction, Router } from 'express'
import loanTransactionService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../../file/period/service'
// import loanTransactionValidation from './validator'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const { id } = req.params
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            const { q = '', employee = null } = req.query ?? ''
            const employeeId = employee
            const queryLowered = q.toString().toLowerCase()
            const loanTransactions = await loanTransactionService.getAllFromOrganization(organizationId, employeeId, userInfo)
            const renamedLoanTransactions = loanTransactions.map(({
                id,
                employee_id,
                transaction_id,
                total_loan,
                transaction_amount,
                employee_code,
                employee_first_name,
                employee_last_name,
                transaction_code,
                transaction_name,
                remaining_balance
            }) => ({
                id,
                employeeId: employee_id,
                transactionId: transaction_id,
                totalLoan: total_loan,
                transactionAmount: transaction_amount,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                transactionCode: transaction_code,
                transactionName: transaction_name,
                remainingBalance: remaining_balance
            }));
            const filteredData = renamedLoanTransactions.filter(
                loanTransaction =>
                (
                    loanTransaction.employeeCode.toLowerCase().includes(queryLowered) ||
                    loanTransaction.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    loanTransaction.employeeLastName.toLowerCase().includes(queryLowered) ||
                    loanTransaction.transactionCode.toLowerCase().includes(queryLowered) ||
                    loanTransaction.transactionName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedLoanTransactions,
                loanTransaction: filteredData,
                query: req.query,
                total: filteredData.length,
                isLoading: false,
                error: null
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
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            const createdLoanTransaction = await loanTransactionService.create({ ...req.body.data }, userInfo)
            res.send(createdLoanTransaction)
        } catch (err) {
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            await loanTransactionService.deleteLoanTransaction(String(id), userInfo)
            res.send(200)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.put('/',
    // loanTransactionValidation.editTransaction,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            const updatedLoanTransaction = await loanTransactionService.updateLoanTransaction(req.body.data, userInfo)
            res.send(updatedLoanTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


