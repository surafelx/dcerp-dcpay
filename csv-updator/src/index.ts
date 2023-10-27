import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = 'e5ed5c8d-a8c3-4c53-a0e7-76fc5783c812'
        const userId = '41598c55-4035-40e6-8ae2-d594fe4ef8ca'
        const periodId = '2e11a84e-f2d7-45a8-8087-9323d5feb28d'
        
        const userInfo = {organizationId, userId, periodId}

        const branches = await processBranchCSV(organizationId, './data/branch.csv')
        console.log(branches.length, "Branches Added")
        const departments = await processDepartmentCSV(organizationId,'./data/department.csv')
        console.log(departments.length, "Departments Added")
        const employees = await processEmployeeCSV(organizationId, './data/employee.csv', userInfo)
        console.log(employees.length, "Employees Added")
        const loanTransactions = await processLoanTransactionCSV(organizationId, './data/loantransactions2.csv', userInfo)
        console.log(loanTransactions.length, "Loan Transactions Added")
        const payTransactions = await processPayTransactionCSV(organizationId, './data/processedtransactions.csv', userInfo)
        console.log(payTransactions.length, "Pay Transactions Added")

        //  const advances = await processPayTransactionCSV(organizationId, './data/advance.csv', userInfo)
        // console.log(advances.length, "Absence and Advance Transactions Added")
    } catch (error) {
        console.log(error)

    } 
}

setupProcess()