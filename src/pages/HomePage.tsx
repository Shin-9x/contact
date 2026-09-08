import { Hero } from '../sections/Hero'
import { OfficeBanner } from '../sections/OfficeBanner'
import { Company } from '../sections/Company'
import { Solutions } from '../sections/Solutions'
import { Method } from '../sections/Method'
import { Partner } from '../sections/Partner'
import { Paths } from '../sections/Paths'
import { Contact } from '../sections/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <OfficeBanner />
      <Company />
      <Solutions />
      <Method />
      <Partner />
      <Paths />
      <Contact />
    </>
  )
}
