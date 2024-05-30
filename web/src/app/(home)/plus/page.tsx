import { Suspense } from 'react'

import PageHeader from '@/components/home/page-header'
import BenefitItem from '@/components/home/plus/benefit-item'
import PricingPanel from '@/components/home/plus/pricing-panel'
import SuccessToast from '@/components/home/plus/success-toast'
import PlusBadge from '@/components/plus-badge'
import { getCurrentUserInfo } from '@/server/actions/user'

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
    <div className="space-y-12">
      <PageHeader
        icon={<PlusBadge size="large" />}
        title="Upgrade to Plus"
        description="Kanjigami is free and will always be free to play. Upgrading to PLUS gives you the following additional sweet benefits that make playing on Kanjigami a little more fun and enjoyable for you."
      />

      {user && (
        <>
          <Suspense key={success} fallback={null}>
            <SuccessToast success={success} canceled={canceled} />
          </Suspense>

          <div className="mx-auto w-[25rem]">
            <PricingPanel user={user} />
            <p className="mt-3 text-sm font-medium text-default-text-lightest">
              Cancel anytime. 100% refund if cancelled within 7 days. <br /> Additional taxes may apply.
            </p>
          </div>
        </>
      )}

      <div>
        <h3 className="text-2xl font-semibold text-default-heading">Plus membership benefits ✨</h3>

        <div className="mt-4 grid grid-cols-2 gap-8">
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
