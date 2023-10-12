import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = '7e9930a4-a730-4f61-bac5-73e8cf6f280d'
        const userId = 'f31daea5-e386-4730-b8af-d11128ea3289'
        const periodId = 'b2a09233-e8e2-4521-b942-6e9cac61198b'

        const userInfo = {organizationId, userId, periodId}

        const branches = await processBranchCSV(organizationId, './data/branch.csv')
        console.log(branches.length, "Branches Added")
        const departments = await processDepartmentCSV(organizationId,'./data/department.csv')
        console.log(departments.length, "Departments Added")
        const employees = await processEmployeeCSV(organizationId, './data/employee.csv')
        console.log(employees.length, "Employees Added")
        const loanTransactions = await processLoanTransactionCSV(organizationId, './data/loantransactions2.csv', userInfo)
        console.log(loanTransactions.length, "Loan Transactions Added")
        const payTransactions = await processPayTransactionCSV(organizationId, './data/processedtransactions.csv', userInfo)
        console.log(payTransactions.length, "Pay Transactions Added")
    } catch (error) {
        console.log(error)

    } 
}

setupProcess()