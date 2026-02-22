export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteName,
  logoText,
  brandCopy,
  primaryCta,
  navigation,
  socialLinks,
  legalLinks,
  footerCopy,
  newsletterHeadline,
  newsletterCopy,
  defaultSeo{..., ogImage{asset->{url}}}
}`

const SECTIONS_PROJECTION = `sections[]{
  ...,
  body[]{..., children[]},
  items[]{...}
}`

export const HOME_PAGE_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  _id,
  title,
  seo,
  ${SECTIONS_PROJECTION}
}`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo,
  ${SECTIONS_PROJECTION}
}`
