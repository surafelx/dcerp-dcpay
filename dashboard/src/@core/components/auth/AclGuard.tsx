// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Component Import
import Error401 from 'src/pages/401'

interface AclGuardProps {
  children: ReactNode
  guestGuard: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined)

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  let matchFound = false;

  if (auth.navigation) {
    for (const menuItem of auth.navigation) {
      console.log(router.asPath)
      if (`${menuItem.menu_path}/` === router.asPath || router.asPath.startsWith('/apps/reports/payroll-sheet/print/') || router.asPath.startsWith('/apps/reports/payroll-advice/print/')) {
        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    return <Error401 />
  }

  // User is logged in, build ability for the user based on his role
  if (auth.user && auth.user.role && !ability) {
    setAbility(buildAbilityFor())
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
