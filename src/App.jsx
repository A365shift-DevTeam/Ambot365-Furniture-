import { Suspense, lazy } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { ProductPackScroll } from './components/ProductPackScroll'
import { StorySection } from './sections/StorySection'

const CraftSection = lazy(() => import('./sections/CraftSection').then((module) => ({ default: module.CraftSection })))
const CollectionSection = lazy(() => import('./sections/CollectionSection').then((module) => ({ default: module.CollectionSection })))
const Footer = lazy(() => import('./sections/Footer').then((module) => ({ default: module.Footer })))

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-clip bg-surface antialiased">
        <Navbar />
        <main>
          <ProductPackScroll mobileContent={<StorySection compact />} />
          <StorySection />
          <Suspense fallback={null}>
            <CraftSection />
            <CollectionSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </SmoothScroll>
  )
}
