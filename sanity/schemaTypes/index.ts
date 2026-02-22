import author from './author'
import blockContent from './blockContent'
import category from './category'
import episode from './episode'
import interview from './interview'
import podcast from './podcast'
import {
  linkObject,
  sectionCardGrid,
  sectionCta,
  sectionEpisodes,
  sectionFaq,
  sectionHero,
  sectionImage,
  sectionPodcasts,
  sectionRichText,
  sectionSpacer,
  sectionSteps,
  sectionSubscribe,
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
  podcast,
  episode,
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
  sectionPodcasts,
  sectionEpisodes,
  sectionSubscribe,
  sectionSpacer,
  siteSettings,
  page,
]
