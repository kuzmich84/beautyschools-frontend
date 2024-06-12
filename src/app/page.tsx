import qs from 'qs'
import { HeroSection } from '@/components/hero/HeroSection'
import { flattenAttributes } from '@/lib/utils'

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
        link: {
          populate: true,
        },
      },
    },
  },
})

async function getStrapiData(path: string) {
  const baseUrl = 'http://localhost:1337'

  const url = new URL(path, baseUrl)
  url.search = homePageQuery

  try {
    const response = await fetch(url.href)
    const data = await response.json()
    const flattenData = flattenAttributes(data)
    return flattenData
  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page')
  const { blocks } = strapiData

  return (
    <main>
      <HeroSection data={blocks[0]} />
      <div className="container mx-auto"></div>
    </main>
  )
}
