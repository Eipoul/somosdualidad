export type Link = {label?: string; href?: string}

export type PortableTextSpan = {
  _type?: 'span'
  _key?: string
  text?: string
}

export type PortableTextBlock = {
  _type?: 'block'
  _key?: string
  children?: PortableTextSpan[]
}

type BaseSection = {
  _type: string
  _key?: string
}

export type SectionHero = BaseSection & {
  _type: 'sectionHero'
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCta?: Link
  secondaryCta?: Link
}

export type SectionRichText = BaseSection & {
  _type: 'sectionRichText'
  title?: string
  align?: 'left' | 'center'
  body?: PortableTextBlock[]
}

export type SectionImage = BaseSection & {
  _type: 'sectionImage'
  image?: {asset?: {url?: string}}
  alt?: string
  caption?: string
}

export type SectionCta = BaseSection & {
  _type: 'sectionCta'
  title?: string
  subtitle?: string
  button?: Link
}

type StepItem = {_key?: string; title?: string; description?: string}
export type SectionSteps = BaseSection & {
  _type: 'sectionSteps'
  title?: string
  items?: StepItem[]
}

type FaqItem = {_key?: string; q?: string; a?: string}
export type SectionFaq = BaseSection & {
  _type: 'sectionFaq'
  title?: string
  items?: FaqItem[]
}

type TestimonialItem = {_key?: string; quote?: string; name?: string; role?: string}
export type SectionTestimonials = BaseSection & {
  _type: 'sectionTestimonials'
  title?: string
  items?: TestimonialItem[]
}

type CardGridCard = {_key?: string; title?: string; description?: string; link?: Link}
export type SectionCardGrid = BaseSection & {
  _type: 'sectionCardGrid'
  title?: string
  subtitle?: string
  cards?: CardGridCard[]
}

export type SectionSpacer = BaseSection & {
  _type: 'sectionSpacer'
  height?: number
  showDivider?: boolean
}

export type PageSection =
  | SectionHero
  | SectionRichText
  | SectionImage
  | SectionCta
  | SectionSteps
  | SectionFaq
  | SectionTestimonials
  | SectionCardGrid
  | SectionSpacer

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
  sections?: PageSection[]
}
