import { Request, Response, NextFunction, Router } from 'express'
import membershipService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../../file/period/service'
// import employeeService from '../../file/employee-master/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId, } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            const { q = '', employee = null } = req.query ?? ''
            const employeeId = employee
            const queryLowered = q.toString().toLowerCase()
            // const memberships = await membershipService.getAllFromOrganization(organizationId)
            const memberships = await membershipService.getAllFromOrganizationByEmployeeByPeriod(organizationId, employeeId, userInfo)
            const renamedMemberships = memberships.map(({
                id,
                employee_id,
                transaction_id,
                employee_code,
                employee_first_name,
                employee_last_name,
                transaction_code,
                transaction_name
            }) => ({
                id,
                employeeId: employee_id,
                transactionId: transaction_id,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                transactionCode: transaction_code,
                transactionName: transaction_name
            }));
            const filteredData = renamedMemberships.filter(
                membership =>
                (
                    membership.employeeCode.toLowerCase().includes(queryLowered) ||
                    membership.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    membership.employeeLastName.toLowerCase().includes(queryLowered) ||
                    membership.transactionCode.toLowerCase().includes(queryLowered) ||
                    membership.transactionName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMemberships,
                membership: filteredData,
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
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
             const createdMembership = await membershipService.create({ ...req.body.data }, userInfo)
            res.send(createdMembership)
        } catch (err) {
            console.log(err)
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
            await membershipService.deleteMembership(String(id), userInfo)
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
            // const { id } = req.params
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = { userId: userId, organizationId, periodId: currentPeriod[0].id }
            const updatedMembership = await membershipService.updateMembership(req.body.data, userInfo)
            res.send(updatedMembership)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


