import AnimateCountDown from '@/components/home/battles/count-down/animate-count-down'

type PropsType = {
  value: number
  label: string
  size?: 'large' | 'normal'
  type: 'animate' | 'normal'
  isHiddenSeparator?: boolean
}

function TimeItem({ value, label, size = 'normal', type, isHiddenSeparator = false }: PropsType) {
  if (type === 'animate')
    return (
      <div className="flex items-start justify-center gap-1 text-default-text-lightest">
        <div className="flex-center flex-col gap-1">
          <AnimateCountDown number={value} size={size} />

          <p className="text-xs font-medium uppercase">{label}</p>
        </div>

        {!isHiddenSeparator && <p className="text-2xl font-semibold">:</p>}
      </div>
    )

  return (
    <div className="font-semibold">
      <span>
        {value.toString().padStart(2, '0')}
        {label}
      </span>

      {!isHiddenSeparator && <span className="font-secondary"> :</span>}
    </div>
  )
}

export default TimeItem
