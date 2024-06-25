import { FaHome } from 'react-icons/fa'

import ThumbnailSetting from '@/components/admin/home/thumbnail-setting'
import SectionTitle from '@/components/admin/section-title'
import PageHeader from '@/components/home/page-header'
import { SectionDivider } from '@/components/ui/separator'
import { getThumbnails } from '@/server/actions/setting'

export default async function HomePageSetting() {
  const thumbnails = await getThumbnails()

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<FaHome />} title="Home page" description="Setting content for home page" />

      <div>
        <SectionDivider title="Thumbnail" />
        <SectionTitle title="Note: Best in webp format and has 1920x1080 resolution" />

        <ThumbnailSetting thumbnails={thumbnails} />
      </div>

      <div>
        <SectionDivider title="Ranking名" />
      </div>
    </div>
  )
}
