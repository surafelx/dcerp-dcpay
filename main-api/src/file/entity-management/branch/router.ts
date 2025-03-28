import { Request, Response, NextFunction, Router } from 'express'
import branchService from './service'
import userService from '../../../settings/user-management/users/service'
import branchValidator from './validator'
import { validationResult } from 'express-validator'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const { q = '', } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const branches = await branchService.getAllFromOrganization(userAuthInfo)
            const renamedBranches = branches.map(({ id, branch_code, branch_name }) => ({
                id,
                branchCode: branch_code,
                branchName: branch_name,
            }));
            const filteredData = renamedBranches.filter(
                branch =>
                (
                    branch.branchCode.toLowerCase().includes(queryLowered) ||
                    branch.branchName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedBranches,
                branch: filteredData,
                query: req.query,
                total: filteredData.length,
                isLoading: false
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

router.post('/',
    branchValidator.newBranch,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const createdBranch = await branchService.create(req, userAuthInfo)
            res.send(createdBranch)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    // usersValidations.newUser,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            await branchService.deleteBranch(String(id))
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
            const updatedBranch = await branchService.updateBranch(req.body.data)
            res.send(updatedBranch)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


