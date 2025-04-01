export type CornerSize = 'none' | 'lg' | '2xl' | '3xl'
export type GradientAngle =
  | 'tl'
  | 't'
  | 'tr'
  | 'l'
  | 'none'
  | 'r'
  | 'bl'
  | 'b'
  | 'br'

export type GlobalSetting = {
  bookmarkLink: string
  selectedGradientBgName: string
  gradientAngle: GradientAngle
  gradientGrainy: boolean
  padding: number
  wrapperRoundedCorner: CornerSize
  bookmarkRoundedCorner: CornerSize
  isHorizontal: boolean
  showQRCode: boolean
}

export type GlobalState = {
  setting: GlobalSetting
}

export type NotificationStyle = 'INFO' | 'SUCCESS' | 'WARN' | 'CRITICAL'
export type NotificationPlacement =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'TOP'
  | 'BOTTOM_LEFT'
  | 'BOTTOM'
  | 'BOTTOM_RIGHT'
  | 'CENTER'
export type NotificationItem = {
  style: NotificationStyle
  title: string
  description?: string
}

export type NotificationState = {
  notificationList: NotificationItem[]
}

export type MetaData = {
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
