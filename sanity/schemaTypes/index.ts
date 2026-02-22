import author from './author'
import blockContent from './blockContent'
import category from './category'
import interview from './interview'
import {
  linkObject,
  sectionCardGrid,
  sectionCta,
  sectionFaq,
  sectionHero,
  sectionImage,
  sectionRichText,
  sectionSpacer,
  sectionSteps,
  sectionTestimonials,
  seoObject,
} from './objects'
import page from './page'
import post from './post'
import siteSettings from './siteSettings'

export const schemaTypes = [
  author,
  category,
  post,
  interview,
  blockContent,
  linkObject,
  seoObject,
  sectionHero,
  sectionRichText,
  sectionImage,
  sectionCta,
  sectionSteps,
  sectionFaq,
  sectionTestimonials,
  sectionCardGrid,
  sectionSpacer,
  siteSettings,
  page,
]
