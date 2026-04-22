import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'

import { Users } from './collections/Users'
import { Media } from './collections/Media'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: { titleSuffix: '— Broto CMS' }, // 1 linha no admin (cosmética — nome no painel)
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer],
  collections: [Users, Media, Pages, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '', // Mudado de URL para URI
    },
  }),
  sharp,
  plugins: [],
})
