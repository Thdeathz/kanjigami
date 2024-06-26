import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import PageHeader from '@/components/home/page-header'
import BenefitItem from '@/components/home/plus/benefit-item'
import PricingPanel from '@/components/home/plus/pricing-panel'
import PlusBadge from '@/components/plus-badge'
import { Panel } from '@/components/ui/card'
import { getCurrentUserInfo } from '@/server/actions/user'

const SuccessToast = dynamic(() => import('@/components/home/plus/success-toast'), {
  ssr: false
})

export const generateMetadata = () => {
  return {
    title: 'Plus'
  }
}

type Props = {
  searchParams?: {
    success?: string
    canceled?: string
    session_id?: string
  }
}

export default async function PlusPage({ searchParams }: Props) {
  const success = searchParams?.success
  const canceled = searchParams?.canceled
  const user = await getCurrentUserInfo()

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        icon={<PlusBadge size="large" />}
        title={user?.isPlus ? 'You are Plus' : 'Upgrade to Plus'}
        description="Kanjigami is free and will always be free to play. Upgrading to PLUS gives you the following additional sweet benefits that make playing on Kanjigami a little more fun and enjoyable for you."
      />

      {user && (
        <>
          <Suspense key={success} fallback={null}>
            <SuccessToast success={success} canceled={canceled} isPlus={user.isPlus} userId={user.id} />
          </Suspense>

          <div className="mx-auto w-full max-w-[25rem]">
            <Panel wrapperClass="border-2 border-default-brand shadow-glory" className="p-6">
              <PricingPanel user={user} />
            </Panel>
            <p className="mt-3 text-sm font-medium text-default-text-lightest">
              Cancel anytime. 100% refund if cancelled within 7 days. <br /> Additional taxes may apply.
            </p>
          </div>
        </>
      )}

      <div>
        <h3 className="text-2xl font-semibold text-default-heading">Plus membership benefits ✨</h3>

        <div className="mt-4 gap-8 space-y-4 sm:grid sm:grid-cols-auto-fill-benefit sm:space-y-0">
          <BenefitItem index={1} />

          <BenefitItem index={2} />

          <BenefitItem index={3} />

          <BenefitItem index={4} />

          <BenefitItem index={5} />
        </div>
      </div>
    </div>
  )
}
