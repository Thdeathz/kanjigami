import Link from 'next/link'
import { BsFacebook, BsGithub } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

type FooterLinkProps = {
  link: string
  title: string
}

function FooterLink({ link, title }: FooterLinkProps) {
  return (
    <Link href={link} className="underline-offset-2 transition-all hover:underline">
      {title}
    </Link>
  )
}

export default function Footer() {
  return (
    <div className="flex min-h-[2.5rem] w-full items-center justify-between border-t border-border-1 bg-footer px-5 font-medium ">
      <p className="text-base text-default-text-light">© 2023Thdeathz</p>
      <div className="flex items-center justify-center gap-6 text-default-link">
        <FooterLink link="/" title="FAQs" />
        <FooterLink link="/" title="Contact" />
        <FooterLink link="/" title="Privacy & Terms" />

        <Link href="https://github.com/Thdeathz" target="_blank">
          <BsGithub />
        </Link>
        <Link href="https://www.facebook.com/everythingwillbenice/" target="_blank">
          <BsFacebook />
        </Link>
        <Link href="mailto:buidunga112@gmail.com" target="_blank">
          <MdEmail />
        </Link>
      </div>
    </div>
  )
}
