export declare const getByNameAndOrganization: (organizationId: string, transactionName: string) => Promise<any>;
export declare const createPT: (newMenu: any) => Promise<any>;
export declare const createPayTransaction: (employee: any) => Promise<void>;
export declare const create: (newMenu: any) => Promise<any>;
export declare const getBranchByName: (branchName: any) => Promise<any>;
export declare const getDepartmentByName: (branchName: any) => Promise<any>;
export declare const getSubParameterIdByNameByOrganization: (organizationId: string, parentParameterName: string, parameterName: string) => Promise<any>;
declare const processCSV: (organizationId: any, csvFile: any) => Promise<any>;
export default processCSV;
