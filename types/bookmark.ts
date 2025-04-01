export interface MetaData {
  title: string
  description: string
  url: string
  image: string
  logo: string
  author: string
  publisher: string
  base64Image: string
  base64Logo: string
}

export interface BookmarkProps {
  url: string
  size?: 'small' | 'medium' | 'large'
  corner?: string
  cover?: 'left' | 'right'
  shadow?: 'always' | 'hover' | 'never'
  horizontal?: boolean
  qrcode?: boolean
}
