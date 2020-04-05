interface IItem {
  id: number
  server: string
  type: string
  state: string
  item_id: number
  name: string
  rarity: string
  slot: string
  category: string
  character: string
  detail: string
  price: string
  displayname: string
  usercode: string
}

interface ITear {
  id: number
  server: string
  type: string
  state: string
  tear_id: number
  name: string
  rarity: string
  slot: string
  shape: string
  color: string
  value: string
  character: string
  price: string
  displayname: string
  usercode: string
}

interface IUserItems {
  [key: string]: Array<IItem>
}

interface IUserElTears {
  [key: string]: Array<ITear>
}

interface ILog {
  code: string
  level: string
  template: string
}

interface IItems {
  [key: number]: IItem
}

interface ITears {
  [key: number]: ITear
}

export {IItem, ITear, IUserItems, IUserElTears, ILog, IItems, ITears}
