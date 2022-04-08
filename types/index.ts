export type NotifyStyle = 'INFO' | 'SUCCESS' | 'WARN' | 'CRITICAL'
export type NotifyPlacement =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'TOP'
  | 'BOTTOM_LEFT'
  | 'BOTTOM'
  | 'BOTTOM_RIGHT'
  | 'CENTER'
export type NotifyItem = {
  style: NotifyStyle
  title: string
  description?: string
}
