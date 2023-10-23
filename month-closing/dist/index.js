"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const period_1 = __importDefault(require("./tableUpdator/period"));
const setupProcess = async () => {
    try {
        const organizationId = '8b83e53d-2d13-4f04-b824-034ae6014876';
        const userId = '3bd71963-890e-4941-9248-12a5b3afc844';
        const periodId = 'b46db380-bbd9-447c-96b3-3de6ec8caf3c';
        await (0, period_1.default)(organizationId, periodId, userId);
    }
    catch (error) {
        console.log(error);
    }
};
setupProcess();
//# sourceMappingURL=index.js.map