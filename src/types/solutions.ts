export interface IProject {
  id: number
  title: string
  description: string
  image: string
  status: boolean
}

export interface IBox extends IProject {
  rules: string
}
