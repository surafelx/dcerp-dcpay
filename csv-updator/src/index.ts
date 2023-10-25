import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = 'abde7b56-f3f5-466e-a613-1f92c8e4bcb8'
        const userId = 'ba1f288a-324d-4cc6-be33-4dcac8d49ecc'
        const periodId = '01280d74-b1b7-4b16-88d9-ab0b17b77ba8'
        
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