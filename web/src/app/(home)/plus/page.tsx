import PageHeader from '@/components/home/page-header'
import PlusBadge from '@/components/plus-badge'

export default function PlusPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        icon={<PlusBadge size="large" />}
        title="Upgrade to Plus"
        description="Kanjigami is free and will always be free to play. Upgrading to PLUS gives you the following additional sweet benefits that make playing on Kanjigami a little more fun and enjoyable for you."
      />

      <h1>Plus Page</h1>
    </div>
  )
}
