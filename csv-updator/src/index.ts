import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = 'be56c879-b1f6-44cb-a4d7-2784a535e1cc'
        const userId = '3b24fe26-7e51-4622-8210-f505c801bb3b'
        const periodId = 'f9f8ed80-8c6b-4a45-9d23-12c8bf8e1bae'
        
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

        //  const advances = await processPayTransactionCSV(organizationId, './data/advance.csv', userInfo)
        // console.log(advances.length, "Absence and Advance Transactions Added")
    } catch (error) {
        console.log(error)

    } 
}

setupProcess()