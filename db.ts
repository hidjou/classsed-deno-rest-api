import { Database } from 'https://deno.land/x/denodb/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

config({ export: true })

import Post from './models/Post.ts'

const db = new Database(
  {
    dialect: 'postgres',
  },
  {
    host: Deno.env.get('DB_HOST')!,
    username: Deno.env.get('DB_USERNAME')!,
    password: Deno.env.get('DB_PASSWORD')!,
    database: Deno.env.get('DB_DATABASE')!,
  }
)

db.link([Post])

export default db
