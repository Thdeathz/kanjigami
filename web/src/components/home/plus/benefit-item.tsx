import Image from 'next/image'

type Props = {
  index: number
  image: string
  title: string
  description: string
}

export default function BenefitItem({ index, image, title, description }: Props) {
  return (
    <div className="space-y-8 rounded-2xl border-2 border-border-1 p-6 sm:p-8">
      <Image
        src={image}
        alt="thumbnail"
        priority
        width={1920}
        height={1080}
        className="aspect-video w-full rounded-lg object-cover shadow-glory"
      />

      <div className="flex items-start justify-center gap-4">
        <div className="flex-center aspect-square h-[5rem] w-[5rem] rounded-full bg-border-1">
          <h5 className="text-5xl font-bold text-default-brand">{index}</h5>
        </div>

        <div className="font-medium">
          <h6 className="text-lg font-semibold text-default-brand">{title}</h6>
          <p className="text-default-text-lightest">{description}</p>
        </div>
      </div>
    </div>
  )
}
