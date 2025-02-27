import { Feed } from 'feed'
import * as cheerio from 'cheerio'
import { serverQueryContent } from '#content/server'
import { SameAs, SiteDescription, SiteLanguage, SiteName, SiteTagLine, SiteUrl } from '~/logic'

export async function generateBlogFeed(event) {
  // Fetch all documents
  const feed = new Feed({
    title: `${SiteTagLine} | ${SiteName}`,
    description: SiteDescription,
    id: SiteUrl,
    link: SiteUrl,
    language: SiteLanguage,
    image: `${SiteUrl}/cover.png`,
    favicon: `${SiteUrl}/favicon.ico`,
    copyright: `Copyright (c) 2022-present, ${SiteName}`,
    feedLinks: {
      json: `${SiteUrl}/feed.json`,
      atom: `${SiteUrl}/feed.atom`,
      rss: `${SiteUrl}/feed.xml`,
    },
  })

  const posts = await serverQueryContent(event, 'blog').find()

  for (const post of posts) {
    if (post._path === '/blog' || post._path === '/blog/_dir')
      continue
    // this will return the SSR content of the post
    const content = await $fetch<string>(post._path)
    let $ = cheerio.load(content)
    const prose = $('.prose').html()
    $ = cheerio.load(prose)
    // remove all attributes from all elements
    $('*').each(function () {
      this.attribs = {}
    })
    const item = {
      title: post.title,
      id: `${SiteUrl}${post._path}`,
      link: `${SiteUrl}${post._path}`,
      description: post.description,
      content: $('body').html(),
      image: post.image,
      author: [
        {
          name: SiteName,
          link: SameAs[0],
        },
      ],
      date: new Date(post.publishedAt),
    }
    feed.addItem(item)
  }

  return feed
}
