export type Link = {label?: string; href?: string}

export type PortableTextSpan = {_type?: 'span'; _key?: string; text?: string}
export type PortableTextBlock = {_type?: 'block'; _key?: string; children?: PortableTextSpan[]}

type BaseSection = {_type: string; _key?: string}

export type SectionHero = BaseSection & {
  _type: 'sectionHero'
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCta?: Link
  secondaryCta?: Link
}

export type SectionWhoWeAre = BaseSection & {_type: 'sectionWhoWeAre'; title?: string; body?: PortableTextBlock[]}
export type SectionEpisodes = BaseSection & {_type: 'sectionEpisodes'; title?: string; subtitle?: string; maxItems?: number; showFeatured?: boolean}
export type SectionNewsletterSignup = BaseSection & {
  _type: 'sectionNewsletterSignup'
  title?: string
  subtitle?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  buttonLabel?: string
  consentLabel?: string
  successMessage?: string
}
export type SectionFaq = BaseSection & {_type: 'sectionFaq'; title?: string; items?: {_key?: string; q?: string; a?: string}[]}
export type SectionCta = BaseSection & {_type: 'sectionCta'; title?: string; subtitle?: string; button?: Link}

export type PageSection = SectionHero | SectionWhoWeAre | SectionEpisodes | SectionNewsletterSignup | SectionFaq | SectionCta

export type SiteSettings = {
  siteName?: string
  logoText?: string
  brandCopy?: string
  primaryCta?: Link
  navigation?: Link[]
  socialLinks?: Link[]
  legalLinks?: Link[]
  footerCopy?: string
  newsletterHeadline?: string
  newsletterCopy?: string
  defaultSeo?: {title?: string; description?: string; ogImage?: {asset?: {url?: string}}}
}

export type Episode = {
  _id: string
  title: string
  slug: string
  description?: string
  publishDate?: string
  streamingLinks?: {platform?: string; url?: string}[]
}

export type PageData = {_id: string; title?: string; slug?: string; seo?: {title?: string; description?: string}; sections?: PageSection[]}
