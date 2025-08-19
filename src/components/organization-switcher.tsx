'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Organization } from '@/db/schema'
import { organization, useActiveOrganization } from '@/lib/auth-client'

import { toast } from 'sonner'

interface OrganizationSwitcherProps {
  organizations: Organization[]
}

export function OrganizationSwitcher({
  organizations
}: OrganizationSwitcherProps) {
  const { data: activeOrganization } = useActiveOrganization()

  const handleChangeOrganization = async (organizationId: string) => {
    try {
      const { error } = await organization.setActive({
        organizationId
      })

      if (error) {
        console.error(error)
        toast.error('Failed to switch client')
        return
      }

      toast.success('Client switched successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to switch client')
    }
  }

  return (
    <Select
      onValueChange={handleChangeOrganization}
      value={activeOrganization?.id}
    >
      <SelectTrigger className='w-[280px]'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        {organizations.map(organization => (
          <SelectItem key={organization.id} value={organization.id}>
            {organization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
