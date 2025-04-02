import axios from 'axios'

const API_PREFIX = 'https://metafy.indiehacker.workers.dev/?url='

export default async (req: any) => {
  const { url } = getQuery(req) as any

  try {
    const { data } = await axios.get(`${API_PREFIX}${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.METAFY_API_KEY}`
      }
    })

    // console.log(data)

    const image = await axios.get(data.data.image, {
      responseType: 'arraybuffer'
    })
    const imageRaw = Buffer.from(image.data).toString('base64')
    const base64Image = `data:${image.headers['content-type']};base64,${imageRaw}`

    const logo = await axios.get(data.data.logo, {
      responseType: 'arraybuffer'
    })
    const logoRaw = Buffer.from(logo.data).toString('base64')
    const base64Logo = `data:${logo.headers['content-type']};base64,${logoRaw}`

    // console.log(base64Image)

    data.data.base64Image = base64Image
    data.data.base64Logo = base64Logo

    // console.log(data)
    return data.data
  } catch (error) {
    console.error(error)
  }
}
