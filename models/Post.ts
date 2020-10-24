import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts'

class Post extends Model {
  static table = 'posts'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    uuid: { type: DataTypes.UUID },
    username: { type: DataTypes.STRING },
    body: { type: DataTypes.STRING },
  }
}

export default Post
