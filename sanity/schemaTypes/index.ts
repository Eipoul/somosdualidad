import blockContent from './blockContent'
import episode from './episode'
import homePage from './homePage'
import newsletterSubscriber from './newsletterSubscriber'
import {
  linkObject,
  sectionCta,
  sectionEpisodes,
  sectionFaq,
  sectionHero,
  sectionNewsletterSignup,
  sectionWhoWeAre,
  seoObject,
} from './objects'
import page from './page'
import season from './season'
import siteSettings from './siteSettings'

export const schemaTypes = [
  blockContent,
  linkObject,
  seoObject,
  sectionHero,
  sectionWhoWeAre,
  sectionEpisodes,
  sectionNewsletterSignup,
  sectionFaq,
  sectionCta,
  siteSettings,
  homePage,
  page,
  season,
  episode,
  newsletterSubscriber,
]
