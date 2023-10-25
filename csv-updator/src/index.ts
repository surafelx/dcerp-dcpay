import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = 'd1e72d7a-9ed9-4bb0-a60f-b31cc5664476'
        const userId = 'a73c13b0-891e-43be-b360-5df26b3b153a'
        const periodId = 'b97aa289-5069-48ee-94ce-10162f0dd516'
        
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