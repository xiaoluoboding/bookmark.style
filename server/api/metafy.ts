import { useQuery } from 'h3'
import axios from 'axios'

export default async (req: any) => {
  const { url } = useQuery(req) as any
  const res = await axios.get(url)
  return res.data
}