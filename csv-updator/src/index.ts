import processBranchCSV from './ebsTableUpdator/branch';
import processDepartmentCSV from './ebsTableUpdator/department'
import processEmployeeCSV from './ebsTableUpdator/employee'
import processLoanTransactionCSV from './ebsTableUpdator/loanTransaction'
import processPayTransactionCSV from './ebsTableUpdator/payTransaction'
import processTransactionDefinitions from './ebsTableUpdator/transactionDefinition'
import processTransactionCalculations from './ebsTableUpdator/transactionCalculations'
 



const setupProcess = async () => {
    try {
        const organizationId = '9e685870-c358-41db-89b0-c4bb4da26f69'
        const userId = 'e071e2fa-02b3-4b4f-ae62-64ae946b03f0'
        const periodId = '59033e86-76b0-4b64-abff-3a03b62de930'
        const branchId = '4233d1c7-2c58-4672-a701-53b67562586a'

        const userInfo = {organizationId, userId, periodId}

        const branches = await processBranchCSV(organizationId, './data/ebs/branch.csv')
        console.log(branches.length, "Branches Added")
        
        const departments = await processDepartmentCSV(organizationId,'./data/ebs/department.csv')
        console.log(departments.length, "Departments Added")
       
        await processTransactionDefinitions(organizationId, branchId)
        console.log( "Transaction Definitions Added")
        
        await processTransactionCalculations(organizationId)
        console.log("Transaction Calculations Added")

        const employees = await processEmployeeCSV(organizationId, './data/ebs/employees.csv', userInfo)
        console.log(employees.length, "Employees Added")

        const loanTransactions = await processLoanTransactionCSV(organizationId, './data/ebs/loan.csv', userInfo)
        console.log(loanTransactions.length, "Loan Transactions Added")
       
        const payTransactions = await processPayTransactionCSV(organizationId, './data/ebs/processed.csv', userInfo)
        console.log(payTransactions.length, "Pay Transactions Added")

    } catch (error) {
        console.log(error)

    } 
}

setupProcess()