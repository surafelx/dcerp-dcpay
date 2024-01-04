// ** React Imports
import { useEffect, useState } from 'react'


// ** Utils Import
import apiRequest from 'src/utils/apiRequest'

// ** Type Import
import { VerticalNavItemsType } from 'src/@core/layouts/types'


// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])
  const auth = useAuth()

  useEffect(() => {
    apiRequest.get('/auth/navigation').then(response => {
      try {
        const menuArray = response.data;

        const finalMenuArray = (items: VerticalNavItemsType) => {
          return items.map((item: any) => {
            if (item.icon) {
              
              // @ts-ignore
              // item.icon = Icons[item.icon]
              if (item.children) {
                finalMenuArray(item.children);
              }

              return item;
            }

            return item;
          });
        };

        setMenuItems(finalMenuArray(menuArray));
      } catch (error) {
        
        // Handle the error appropriately, e.g., log it or show a user-friendly message
        console.error('Error while processing menu items:', error);
      }
    }).catch(error => {
      // Handle the API request error here, e.g., log it or show a user-friendly message
      console.error('Error during API request:', error);
      auth.logout()
    });

  }, [])

  return menuItems
}

export default ServerSideNavItems
