import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { ProductPackScroll } from './components/ProductPackScroll'
import { StorySection } from './sections/StorySection'
import { FreshnessSection } from './sections/FreshnessSection'
import { CraftSection } from './sections/CraftSection'
import { CollectionSection } from './sections/CollectionSection'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-clip bg-surface antialiased">
        <Navbar />
        <main>
          <ProductPackScroll mobileContent={<StorySection compact />} />
          <StorySection />
          <FreshnessSection />
          <CraftSection />
          <CollectionSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
