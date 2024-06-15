import { HeroSection } from '@/components/hero/HeroSection'
import { getHomePageData } from '@/data/loaders'

export default async function Home() {
  const strapiData = await getHomePageData()

  const { blocks } = strapiData

  return (
    <>
      <HeroSection data={blocks[0]} />
      <div className="container mx-auto"></div>
    </>
  )
}
