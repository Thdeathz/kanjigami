import HomePageContent from '@/components/home/home-page-content'
import { auth } from '@/server/auth'

export default async function Home() {
  const session = await auth()

  return <HomePageContent session={session} />
}
