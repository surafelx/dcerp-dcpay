import { Request, Response, NextFunction, Router } from 'express'
import monthClosingService from './service'
import userService from '../../../settings/user-management/users/service'
import periodService from '../../../file/period/service'

const router = Router()

// router.get('/',
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = req.headers['x-user-id'];
//             const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
//             const { q = '', } = req.query ?? ''
//             const queryLowered = q.toString().toLowerCase()
//             const branches = await branchService.getAllFromOrganization(userAuthInfo)
//             const renamedBranches = branches.map(({ id, branch_code, branch_name }) => ({
//                 id,
//                 branchCode: branch_code,
//                 branchName: branch_name,
//             }));
//             const filteredData = renamedBranches.filter(
//                 branch =>
//                 (
//                     branch.branchCode.toLowerCase().includes(queryLowered) ||
//                     branch.branchName.toLowerCase().includes(queryLowered)
//                 )
//             )
//             res.send({
//                 allData: renamedBranches,
//                 branch: filteredData,
//                 query: req.query,
//                 total: filteredData.length
//             })
//         } catch (e) {
//             console.log(e)
//             next(e)
//         }
//     })

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const { id: periodId } = currentPeriod[0]
            const closedMonth = await monthClosingService.closeMonth(organizationId, userId, periodId)
            res.send({
                allData: [closedMonth],
                closing: [closedMonth],
                query: req.query,
                total: 0,
                isLoading: false
            })
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


