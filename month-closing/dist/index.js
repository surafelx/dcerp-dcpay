"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const periodClosing_1 = __importDefault(require("./tableUpdator/periodClosing"));
const setupProcess = async () => {
    try {
        const organizationId = '27abdc7f-e2b0-4417-8316-97203482f4f0';
        const userId = '02e2b06a-f904-4456-a491-68c6e1e676c1';
        const periodId = '3d45c460-4b8f-4f9d-8347-ea945093e60f';
        await (0, periodClosing_1.default)(organizationId, periodId, userId);
    }
    catch (error) {
        console.log(error);
    }
};
setupProcess();
//# sourceMappingURL=index.js.map