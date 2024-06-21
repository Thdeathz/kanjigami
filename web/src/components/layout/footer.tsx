import Link from 'next/link'
import { BsFacebook, BsGithub } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

type FooterLinkProps = {
  link: string
  title: string
  ariaLabel?: string
}

function FooterLink({ link, title, ariaLabel = 'Footer link' }: FooterLinkProps) {
  return (
    <Link href={link} className="underline-offset-2 transition-all hover:underline" aria-label={ariaLabel}>
      {title}
    </Link>
  )
}

export default function Footer() {
  return (
    <div className="flex min-h-[2.5rem] w-full flex-col items-center justify-between gap-2 border-t border-border-1 bg-footer px-5 py-2 font-medium sm:flex-row sm:gap-0 sm:py-0">
      <p className="text-center text-base text-default-text-lightest">© 2023Thdeathz - Kanji game website</p>
      <div className="flex items-center justify-center gap-6 text-default-link">
        <FooterLink link="/" title="FAQs" ariaLabel="FAQ page link" />
        <FooterLink link="/" title="Contact" ariaLabel="Contact us page link" />
        <FooterLink link="/" title="Privacy & Terms" ariaLabel="Privacy and terms page link" />

        <Link href="https://github.com/Thdeathz" target="_blank" aria-label="Github link">
          <BsGithub />
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=61561101158518" target="_blank" aria-label="Facebook link">
          <BsFacebook />
        </Link>
        <Link href="mailto:buidunga112@gmail.com" target="_blank" aria-label="Email link">
          <MdEmail />
        </Link>
      </div>
    </div>
  )
}
