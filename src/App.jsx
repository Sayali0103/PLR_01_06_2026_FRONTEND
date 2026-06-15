import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Careers from './pages/Careers'
import About from './pages/About'
import Blogs from './pages/Blogs'
import News from './pages/News'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Technology from './pages/Technology'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import BookDemo from './pages/BookDemo'
import Seo from './components/Seo'

function ScrollToHash() {
  const { hash, pathname, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const id = hash.slice(1)
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname, key])

  return null
}

function SiteNavbar() {
  const { pathname } = useLocation()
  return pathname === '/admin' ? null : <Navbar />
}

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1a1208]">Page not found</h1>
        <p className="mt-4 text-[#6d5f51]">The page you requested does not exist.</p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Seo />
      <ScrollToHash />
      <SiteNavbar />
      <Routes>
        <Route path="/"                          element={<Home />} />
        <Route path="/products"                  element={<Navigate to="/#product-showcase" replace />} />
        <Route path="/technology"                element={<Technology />} />
        <Route path="/applications"              element={<Applications />} />
        <Route path="/applications/:slug"        element={<ApplicationDetail />} />
        <Route path="/company"                   element={<div className="pt-20 min-h-screen flex items-center justify-center">Company — Coming Soon</div>} />
        <Route path="/about"                     element={<About />} />
        <Route path="/blogs"                     element={<Blogs />} />
        <Route path="/news"                      element={<News />} />
        <Route path="/careers"                   element={<Careers />} />
        <Route path="/contact"                   element={<Contact />} />
        <Route path="/book-demo"                 element={<BookDemo />} />
        <Route path="/admin"                     element={<Admin />} />
        <Route path="*"                          element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
