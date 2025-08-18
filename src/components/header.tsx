import { ModeSwitcher } from './mode-switcher'

import { getOrganizations } from '@/server/organizations'
import { SignOutButton } from './sign-out-button'
import { OrganizationSwitcher } from './organization-switcher'

export async function Header() {
  const organizations = await getOrganizations()

  return (
    <header className='absolute top-0 right-0 flex w-full items-center justify-between p-4'>
      <OrganizationSwitcher organizations={organizations} />
      <div className='flex items-center gap-2'>
        <SignOutButton />
        <ModeSwitcher />
      </div>
    </header>
  )
}
