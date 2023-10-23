import { Request, Response, NextFunction, Router } from 'express'
import employeeService from './service'
import userService from '../../settings/user-management/users/service'
import periodService from '../period/service'


const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '',} = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const employees = await employeeService.getAllFromOrganization(organizationId)
            const renamedEmployees = employees.map(({ id, branch_id, department_id, employee_code, employee_title, employee_title_name, first_name, middle_name, last_name, sex, employee_status, employee_type, contract_start_date, contract_end_date, monthly_working_hours, pension_number, pension_status, tin_number, working_days, employee_position, basic_salary, employment_date, employee_account_number, employee_bank, employee_bank_name, employee_type_name}) => ({
                id,
                employeeBranch: branch_id,
                employeeDepartment: department_id,
                employeeCode: employee_code,
                employeeTitle: employee_title,
                employeeTitleName: employee_title_name,
                employeeBank: employee_bank,
                employeeBankName: employee_bank_name,
                employeeBankAccount: employee_account_number,
                employeeTypeName: employee_type_name,
                sex,
                employeeStatus: employee_status,
                employeeType: employee_type,
                employeePosition: employee_position,
                contractStartDate: contract_start_date,
                contractEndDate: contract_end_date,
                monthlyWorkingHours: monthly_working_hours,
                pensionNumber: pension_number,
                pensionStatus: pension_status,
                tinNumber: tin_number,
                workingDays: working_days,
                firstName: first_name,
                middleName: middle_name,
                lastName: last_name,
                basicSalary: basic_salary,
                employmentDate: employment_date
            }));
            const filteredData = renamedEmployees.filter(
                employee =>
                (
                    employee.firstName.toLowerCase().includes(queryLowered) ||
                    employee.lastName.toLowerCase().includes(queryLowered) ||
                    employee.basicSalary.toLowerCase().includes(queryLowered) ||
                    employee.employmentDate.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedEmployees,
                employee: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const currentPeriod = await periodService.getCurrentPeriod(organizationId)
            const userInfo = {periodId: currentPeriod[0].id, userId, organizationId}
            const createdEmployee = await employeeService.create(req, String(organizationId), userInfo)
            res.send(createdEmployee)
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
            await employeeService.deleteEmployee(String(id))
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
            const updatedEmployee = await employeeService.updateEmployee(req.body.data)
            res.send(updatedEmployee)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


