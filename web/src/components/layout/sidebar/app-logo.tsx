import Image from 'next/image'

export default function AppLogo() {
  return (
    <button
      type="button"
      className="app-icon group flex items-center justify-center gap-1.5 rounded border-app-icon border-black bg-white px-1.5 py-1 text-black opacity-0 shadow-app-icon transition-all hover:border-white hover:bg-black hover:text-white hover:shadow-app-icon-hover active:scale-90 dark:invert xs:opacity-100"
    >
      <Image
        src="/images/app-icon.svg"
        alt="app-icon"
        width="28"
        height="28"
        className="aspect-square group-hover:invert"
      />

      <p className="select-none text-base xs:text-lg">KANJIGAMI</p>
    </button>
  )
}
