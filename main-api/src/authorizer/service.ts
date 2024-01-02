import authorizerDao from './dao'
// import roleRightService from '../settings/rights-management/menu/service'

// const authorizeRights = (rights: string[]) => {
//     return async (req: Request, res: any, next: any) => {
//         const routeName = req.baseUrl.slice(8);
//         const userId = req.headers['x-user-id'];
//         let hasRights = true;

//         for (const right of rights) {
//             if (right === 'read') {
//                 hasRights = hasRights && await authorizeRead(userId, routeName);
//             } else if (right === 'edit') {
//                 hasRights = hasRights && await authorizeEdit(userId, routeName);
//             }
//         }

//         if (hasRights) {
//             next();
//         } else {
//             res.redirect('/error');
//         }
//     }
// }



// const authorizeRead = async (userId: string, routeName: string) => await roleRightService.checkIfUserCanReadRoute(userId, routeName)

// const authorizeEdit = async (userId: string, routeName: string) => await roleRightService.checkIfUserCanEditRoute(userId, routeName)


const getNavigationMenu = async (roleId: string) => await authorizerDao.getNavigationMenu(roleId)

const checkIfUserStillAuthorized = async (userId: string, expiryTimeInMinutes: any): Promise<boolean> => {
    try {
      const { token_date: tokenDate } = await authorizerDao.getUserToken(userId);
  
      if (tokenDate) {
        const nowDate = new Date();
        const tokenExpirationDate = new Date(tokenDate);
        tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + expiryTimeInMinutes);
  
        return nowDate <= tokenExpirationDate;
      } else {
        // Handle the case where tokenDate is not available, possibly the user doesn't have a valid token
        return false;
      }
    } catch (error) {
      console.error("Error checking user authorization:", error);
      // Handle the error appropriately, you might want to throw an exception or return false
      return false;
    }
  };


const authorizeUser = async (userId: string) => {
    const tokenDate = new Date()
    const clearedToken =   await authorizerDao.deleteUserToken(userId)
    await authorizerDao.createUserToken(userId, tokenDate)
}

export default {
    authorizeUser,
    checkIfUserStillAuthorized,
    getNavigationMenu,
    // authorizeRights
}