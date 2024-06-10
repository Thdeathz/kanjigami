import UserProfile from '@/components/home/player/user-profile'

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

export default function PlayerProfilePage({ params }: Props) {
  const { name } = params

  return <UserProfile username={name} />
}
