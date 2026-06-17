import { useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { applications } from '../pages/Applications'

const SITE_URL = 'https://plrobotics.in'
const DEFAULT_DESCRIPTION = 'P. L. Robotics is a Pune based industrial robotics company building next-generation cobots and automation solutions for Indian manufacturing.'

const routeMetadata = {
  '/': {
    title: 'P. L. Robotics | Industrial Robotics and Automation',
    description: DEFAULT_DESCRIPTION,
  },
  '/technology': {
    title: 'Robotics Technology | P. L. Robotics',
    description: 'Explore P. L. Robotics telemetric, vision, and software systems for intelligent industrial automation.',
  },
  '/applications': {
    title: 'Robotics Applications | P. L. Robotics',
    description: 'Explore industrial robotics applications including CNC tending, assembly, inspection, welding, packaging, and palletizing.',
  },
  '/about': {
    title: 'About P. L. Robotics',
    description: 'Learn about P. L. Robotics and our mission to make advanced industrial automation accessible to manufacturers.',
  },
  '/blogs': {
    title: 'Robotics Insights | P. L. Robotics',
    description: 'Read insights from P. L. Robotics about industrial automation, collaborative robots, and modern manufacturing.',
  },
  '/news': {
    title: 'Robotics News | P. L. Robotics',
    description: 'Read the latest robotics and industrial automation news from P. L. Robotics.',
  },
  '/careers': {
    title: 'Careers | P. L. Robotics',
    description: 'Explore career opportunities at P. L. Robotics and help build the future of industrial automation.',
  },
  '/contact': {
    title: 'Contact P. L. Robotics',
    description: 'Contact P. L. Robotics to discuss industrial robotics, automation solutions, support, and partnerships.',
  },
  '/book-demo': {
    title: 'Book a Robotics Demo | P. L. Robotics',
    description: 'Book a demo with P. L. Robotics to see how industrial automation can improve your manufacturing process.',
  },
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

function getMetadata(pathname) {
  if (routeMetadata[pathname]) {
    return { ...routeMetadata[pathname], canonicalPath: pathname, indexable: true }
  }

  const applicationMatch = matchPath('/applications/:slug', pathname)
  if (applicationMatch) {
    const application = applications.find(item => item.slug === applicationMatch.params.slug)
    if (application) {
      return {
        title: `${application.title} | P. L. Robotics`,
        description: application.short,
        canonicalPath: pathname,
        indexable: true,
      }
    }
  }

  return {
    title: 'P. L. Robotics',
    description: DEFAULT_DESCRIPTION,
    canonicalPath: pathname,
    indexable: false,
  }
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = getMetadata(pathname)
    const canonicalUrl = `${SITE_URL}${metadata.canonicalPath === '/' ? '/' : metadata.canonicalPath}`

    document.title = metadata.title
    setMeta('meta[name="description"]', { name: 'description', content: metadata.description })
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: metadata.indexable ? 'index, follow' : 'noindex, nofollow',
    })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [pathname])

  return null
}
