import { Request, Response, NextFunction, Router } from 'express'
import periodService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '' } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const periods = await periodService.getAllFromOrganization(organizationId)
            const renamedPeriods = periods.map(({
                id,
                period_count,
                period_name,
                period_year,
                month_name,
                start_date,
                end_date,
                period_paid,
                period_current,
                period_back,
                period_proof,
                period_final,
                period_report,
                period_process
            }) => ({
                id,
                periodCount: period_count,
                periodYear: period_year,
                periodName: period_name,
                monthName: month_name,
                endDate: end_date,
                startDate: start_date,
                periodPaid: period_paid,
                periodBack: period_back,
                periodCurrent: period_current,
                periodProof: period_proof,
                periodFinal: period_final,
                periodReport: period_report,
                periodProcess: period_process
            }));
            const filteredData = renamedPeriods.filter(
                period =>
                (
                    period.periodCount.toLowerCase().includes(queryLowered) ||
                    period.periodYear.toLowerCase().includes(queryLowered) ||
                    period.periodName.toLowerCase().includes(queryLowered) ||
                    period.monthName.toLowerCase().includes(queryLowered) ||
                    period.startDate.toLowerCase().includes(queryLowered) ||
                    period.endDate.toLowerCase().includes(queryLowered) ||
                    period.periodPaid.toLowerCase().includes(queryLowered) ||
                    period.periodBack.toLowerCase().includes(queryLowered) ||
                    period.periodCurrent.toLowerCase().includes(queryLowered) ||
                    period.periodProof.toLowerCase().includes(queryLowered) ||
                    period.periodFinal.toLowerCase().includes(queryLowered) || 
                    period.periodReport.toLowerCase().includes(queryLowered) ||
                    period.periodProcess.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedPeriods,
                periods: filteredData,
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
            const createdPeriod = await periodService.create({ ...req.body.data })
            res.send(createdPeriod)
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
            await periodService.deletePeriod(String(id))
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
            const updatedPeriod = await periodService.updatePeriod(req.body.data)
            res.send(updatedPeriod)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


