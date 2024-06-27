import UserProfile from '@/components/home/player/user-profile'
import { getUserProfile } from '@/server/actions/user'

type Props = {
  params: {
    name: string
  }
}

export const generateMetadata = ({ params }: Props) => {
  return {
    title: `${decodeURIComponent(params.name)}`
  }
}

export default async function PlayerProfilePage({ params }: Props) {
  const { name } = params
  const userProfile = await getUserProfile(name)

  return <UserProfile userProfile={userProfile} />
}
