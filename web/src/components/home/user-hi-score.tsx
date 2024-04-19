type Props = {
  score?: number
}

export default function UserHiScore({ score }: Props) {
  return (
    <div className="font-medium leading-5">
      <p className="text-default-text-lightest">Your hi-score</p>
      <p className={`font-secondary ${score ? 'text-default-brand' : 'text-default-text-light'}`}>
        {score || 'Not played'}
      </p>
    </div>
  )
}
