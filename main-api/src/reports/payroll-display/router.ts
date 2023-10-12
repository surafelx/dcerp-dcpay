import { Request, Response, NextFunction, Router } from 'express'
import payrollDisplayService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../../file/period/service'

const router = Router()


router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = {periodId: currentPeriod[0].id, userId, }
            const { q = '', employee = null, } = req.query ?? ''
            const employeeId = employee
            const queryLowered = q.toString().toLowerCase()
            const payrollSheets = await payrollDisplayService.getAllFromOrganization(organizationId, employeeId, userInfo)
            const renamedPayTransactions = payrollSheets.map(({
               id,
                transaction_name,
                transaction_amount,
              transaction_type_name,
              update_type_name,
            }: any) => ({
                id,
                transactionName: transaction_name,
                transactionAmount: transaction_amount,
                transactionTypeName: transaction_type_name,
                updateTypeName: update_type_name
            }));
            const filteredData = renamedPayTransactions.filter(
                (payrollSheet: any) =>
                (
                    payrollSheet.transactionName.toLowerCase().includes(queryLowered) ||
                    payrollSheet.transactionAmount.toLowerCase().includes(queryLowered) ||
                    payrollSheet.transactionTypeName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedPayTransactions,
                payrollDisplay: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })


export default router


