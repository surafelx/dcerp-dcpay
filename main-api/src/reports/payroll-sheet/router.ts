import { Request, Response, NextFunction, Router } from 'express'
import payrollSheetService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../../file/period/service'

const router = Router()


router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { periodId: currentPeriod[0].id, userId, }
            const { q = '', bank = null, branch = null, department = null, report = null } = req.query ?? ''
            const branchId = branch
            const departmentId = department
            const bankId = bank
            const queryLowered = q.toString().toLowerCase()
            const processedTransactions = await payrollSheetService.getAllFromOrganization(organizationId, branchId, departmentId, bankId, userInfo, report)
            const renamedProcessedTransactions = processedTransactions.map(({
                id,
                employee_code,
                employee_department,
                employee_account_number,
                bank_name,
                first_name,
                middle_name,
                last_name,
                monthly_working_hours,
                employee_status_name,
                transactions
            }: any) => ({
                id,
                employeeDepartment: employee_department,
                employeeCode: employee_code,
                employeeName: `${first_name} ${middle_name} ${last_name}`,
                employeeAccountNumber: employee_account_number,
                monthlyWorkingHours: monthly_working_hours,
                employeeStatusName: employee_status_name,
                bankName: bank_name,
                transactions
            }));
            const filteredData = renamedProcessedTransactions.filter(
                (payrollSheet: any) =>
                (
                    payrollSheet.employeeCode.toLowerCase().includes(queryLowered) ||
                    payrollSheet.employeeName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: processedTransactions,
                payrollSheet: filteredData,
                query: req.query,
                total: filteredData.length
            })

        } catch (e) {
            next(e)
        }
    })


export default router


