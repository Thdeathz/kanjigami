'use client'

import { toast } from 'sonner'

import { IUserInfo } from '@/@types/auth'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCreateCheckoutSessionMutation } from '@/data/plus'

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
    <div className="grid grid-cols-2 gap-4">
      <Button variant="primary" disabled={isPending || disabled} onClick={handleCreateCheckoutSession}>
        {isPending ? <Loading /> : 'Upgrade to PLUS'}
      </Button>

      <Button>Gift PLUS</Button>
    </div>
  )
}

type Props = {
  user: IUserInfo
}

export default function PricingPanel({ user }: Props) {
  return (
    <Panel wrapperClass="border-2 border-default-brand shadow-glory" className="p-6">
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
    </Panel>
  )
}
