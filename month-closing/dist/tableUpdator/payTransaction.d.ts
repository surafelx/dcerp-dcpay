export declare const createPeriodTransaction: (newPeriodTransaction: any) => Promise<any>;
export declare const create: (newMenu: any) => Promise<any>;
export declare const getEmployeeByEmployeeCodeByOrganization: (organizationId: string, employeeCode: string) => Promise<any>;
export declare const getTransactionByTransactionCodeByOrganization: (organizationId: string, transactionCode: string) => Promise<any>;
declare const processCSV: (organizationId: any, csvFile: any, userInfo: any) => Promise<any>;
export default processCSV;
