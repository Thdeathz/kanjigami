'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { IUserInfo } from '@/@types/auth'
import Loading from '@/components/loading'
import PlusBadge from '@/components/plus-badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCreateCheckoutSessionMutation } from '@/data/plus'
import { createSubscriptionManagementLink } from '@/server/actions/plus'

type PricingItemProps = {
  title: string
  price: string
  extra?: string
}

function PricingItem({ title, price, extra }: PricingItemProps) {
  return (
    <div className="flex h-[7rem] flex-col items-center justify-center">
      <h3 className="font-medium">
        <span className="text-4xl">${price}</span>
        <span className="text-xl text-default-text-lightest"> / {title}</span>
      </h3>
      {extra && (
        <p className="rounded-full bg-default-bg px-2 py-0.5 text-sm font-medium text-default-text-lightest">{extra}</p>
      )}
    </div>
  )
}

type CreateCheckoutSessionProps = {
  disabled: boolean
  userId: string
  productId: string
}

function CreateCheckoutSession({ disabled, productId, userId }: CreateCheckoutSessionProps) {
  const { mutateAsync, isPending } = useCreateCheckoutSessionMutation()

  const handleCreateCheckoutSession = async () => {
    try {
      const result = (await mutateAsync({ product: productId, userId })) as { url: string }

      window.location.href = result.url
    } catch (error) {
      console.error(error)
      toast.error('Failed to create checkout session')
    }
  }

  return (
    <div className="flex-center">
      <Button variant="primary" disabled={isPending || disabled} onClick={handleCreateCheckoutSession}>
        {isPending ? <Loading /> : 'Upgrade to PLUS'}
      </Button>

      {/* <Button>Gift PLUS</Button> */}
    </div>
  )
}

type Props = {
  user: IUserInfo
}

export default function PricingPanel({ user }: Props) {
  const [isPending, startTransition] = useTransition()

  const onCreateBillingManagementLink = () => {
    startTransition(async () => {
      try {
        const result = await createSubscriptionManagementLink()

        if (!result) return

        window.location.href = result.url
      } catch (error) {
        toast.error('Failed to create billing management link. Please try again later.')
      }
    })
  }

  if (user.isPlus) {
    return (
      <div className="space-y-6">
        <div className="flex-center gap-2">
          <span className="text-lg font-semibold text-default-heading">You are</span> <PlusBadge />
        </div>

        <p className="text-center font-medium text-default-text-light">
          You&apos;re a PLUS member and we couldn&apos;t be more thrilled. Thank you for supporting us ❤️
        </p>

        <div className="flex-center">
          <Button variant="primary" isLoading={isPending} onClick={onCreateBillingManagementLink}>
            Manage billing
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="yearly">
      <TabsList className="w-full" variant="primary">
        <TabsTrigger value="yearly" className="w-full rounded-full">
          Yearly (40% off)
        </TabsTrigger>
        <TabsTrigger value="monthly" className="w-full rounded-full">
          Monthly
        </TabsTrigger>
      </TabsList>
      <TabsContent value="yearly">
        <PricingItem title="month" price="3" extra="$36 / year" />
        <CreateCheckoutSession disabled={user.isPlus} userId={user.id} productId="prod_QB5N327UFq7cQi" />
      </TabsContent>
      <TabsContent value="monthly">
        <PricingItem title="month" price="5" />
        <CreateCheckoutSession disabled={user.isPlus} userId={user.id} productId="prod_QB5NuPPRduczHR" />
      </TabsContent>
    </Tabs>
  )
}
