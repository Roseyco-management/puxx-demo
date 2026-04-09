// lib/seo/JsonLd.tsx
// Component for adding JSON-LD structured data to pages

interface JsonLdProps {
  data: object | object[]
}

/**
 * JsonLd component for adding structured data to pages
 *
 * Usage:
 * ```tsx
 * import { JsonLd } from '@/lib/seo/JsonLd'
 * import { organizationSchema } from '@/lib/seo/schema'
 *
 * export default function HomePage() {
 *   return (
 *     <>
 *       <JsonLd data={organizationSchema} />
 *       {/* page content *\/}
 *     </>
 *   )
 * }
 * ```
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : data),
      }}
    />
  )
}
