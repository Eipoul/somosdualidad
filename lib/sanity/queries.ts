export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteName,
  logoText,
  brandCopy,
  primaryCta,
  navigation,
  socialLinks,
  legalLinks,
  footerCopy,
  defaultSeo
}`

const SECTIONS_PROJECTION = `sections[]{
  ...,
  image{..., asset->},
  cards[]{..., link},
  items[]{...}
}`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  routeType,
  seo,
  ${SECTIONS_PROJECTION}
}`

export const HOME_PAGE_QUERY = `*[_type == "page" && routeType == "home"][0]{
  _id,
  title,
  "slug": slug.current,
  routeType,
  seo,
  ${SECTIONS_PROJECTION}
}`
