import type { ParsedContent as DefaultParsedContent } from '@nuxt/content/dist/runtime/types'
import type { StorageMeta } from 'unstorage'

export interface ParsedContent extends DefaultParsedContent {
  storageMeta: StorageMeta
  prose?: boolean
  schema: [string: any]
}

export interface Post extends ParsedContent {
  readingMins: number
  description: string
  publishedAt: Date
  modifiedAt: Date
}
export interface Page extends Post {}

export interface JsonParsedContent<T> extends ParsedContent {
  body: T
}

export interface Project {
  name: string
  description: string
  link: string
  icon?: string
}

export interface ProjectCategory extends ParsedContent {
  name: string
  projects: Project[]
}
