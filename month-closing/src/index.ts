import closePeriod from './tableUpdator/period'


const setupProcess = async() => {
    try {
        const organizationId = '8b83e53d-2d13-4f04-b824-034ae6014876'
        const userId = '3bd71963-890e-4941-9248-12a5b3afc844'
        const periodId = 'b46db380-bbd9-447c-96b3-3de6ec8caf3c'

        await closePeriod(organizationId, periodId, userId)
    }
    catch (error) {
        console.log(error);
    }
}

setupProcess()