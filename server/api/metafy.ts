import axios from 'axios'
import type { MetaData } from '@/types'

// const API_PREFIX = 'https://metafy.vercel.app/api?url='
const API_PREFIX = 'https://get-metafy.netlify.app/.netlify/functions/api?url='

export default async (req: any) => {
  const { url } = getQuery(req) as any
  const res = await axios.get(`${API_PREFIX}${url}`)

  const { data } = res as { data: MetaData }

  // const image = await axios.get(data.image, { responseType: 'arraybuffer' })
  // const raw = Buffer.from(image.data).toString('base64')
  // const base64Image = `data:${image.headers['content-type']};base64,${raw}`

  // data.base64Image = base64Image

  return data
}
