import type { MDXComponents } from 'mdx/types'
import { Figure } from '@/components/mdx/Figure'
import { Gallery } from '@/components/mdx/Gallery'
import { Video } from '@/components/mdx/Video'
import { Callout } from '@/components/mdx/Callout'
import { Columns } from '@/components/mdx/Columns'
import { Placeholder } from '@/components/mdx/Placeholder'

// Typography for plain markdown elements lives in globals.css (.project-prose).
// Only elements that need different markup are overridden here.
const components: MDXComponents = {
  a: ({ href = '', children, ...props }) => {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
      </a>
    )
  },
  // Wide tables scroll inside their own box instead of the page on phones.
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Figure,
  Gallery,
  Video,
  Callout,
  Columns,
  Placeholder,
}

export function useMDXComponents(): MDXComponents {
  return components
}
