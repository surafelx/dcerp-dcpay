export default {
  dataEndPoint: "https://dcerp-dcpay.onrender.com/api/v1",
  meEndpoint: "https://dcerp-dcpay.onrender.com/api/v1/auth/me",
  loginEndpoint: "https://dcerp-dcpay.onrender.com/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
