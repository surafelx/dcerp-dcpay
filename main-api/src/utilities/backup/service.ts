
import taxRateDao from './dao'

const create = async (newTaxRate: any,): Promise<string> => await taxRateDao.create({ ...newTaxRate })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await taxRateDao.getAllFromOrganization(organizationId)

const deleteTaxRate = async (userId: string): Promise<any> => await taxRateDao.deleteTaxRate(userId)

const updateTaxRate = async (menuLevelData: any): Promise<any> => await taxRateDao.updateTaxRate(menuLevelData)

const setupApp = async (organizationId: string,): Promise<any> => await taxRateDao.setupApp(organizationId)

const calculateTaxRate = async (organizationId: string, netPay: any) => {
    const taxRates = await getAllFromOrganization(organizationId)
    const calculateTax = (income: any) => {
        let taxAmount = 0;
        for (const rateInfo of taxRates) {
            if (income >= rateInfo.lowest_range) {
                const rangeMax = Math.min(income, rateInfo.highest_range);
                const taxableAmount = rangeMax - rateInfo.lowest_range;
                taxAmount += taxableAmount * rateInfo.tax_rate;
            } else {
                break;
            }
        }
        return taxAmount;
    }
    return calculateTax(netPay)
}

export default {
    calculateTaxRate,
    create,
    deleteTaxRate,
    getAllFromOrganization,
    updateTaxRate,
    setupApp
}