export type Link = {label?: string; href?: string}

export type SiteSettings = {
  siteName?: string
  logoText?: string
  brandCopy?: string
  primaryCta?: Link
  navigation?: Link[]
  socialLinks?: Link[]
  legalLinks?: Link[]
  footerCopy?: string
  defaultSeo?: {title?: string; description?: string; ogImage?: {asset?: {url?: string}}}
}

export type PageData = {
  _id: string
  title?: string
  slug?: string
  routeType?: string
  seo?: {title?: string; description?: string}
  sections?: Array<Record<string, any>>
}
