import monthClosingDao from './dao'

const closeMonth = async(organizationId: any, periodId: any, userId: any) => await monthClosingDao.closeMonth(organizationId, periodId, userId)

export default {
    closeMonth
}