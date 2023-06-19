import { Request, Response, NextFunction, Router } from 'express'
import payrollSheetService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()


router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', branch = null, department = null } = req.query ?? ''
            const branchId = branch
            const departmentId = department
            const queryLowered = q.toString().toLowerCase()
            const payrollSheets = await payrollSheetService.getAllFromOrganization(organizationId, branchId, departmentId)
            
            const filteredData = payrollSheets.filter(
                (payrollSheet: any) =>
                (
                    payrollSheet.employeeCode.toLowerCase().includes(queryLowered) ||
                    payrollSheet.employeeName.toLowerCase().includes(queryLowered) ||
                    payrollSheet.netPay.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: payrollSheets,
                payrollAdvice: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })


export default router


