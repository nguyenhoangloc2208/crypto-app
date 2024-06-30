export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
  sparkline_in_7d: {
    price: number[]
  }
}

export interface User {
  uid: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  providerData: {
    providerId: string
    uid: string
    displayName: string | null
    email: string
    phoneNumber: string | null
    photoURL: string | null
  }[]
  stsTokenManager: {
    refreshToken: string
    accessToken: string
    expirationTime: number
  }
  createdAt: string
  lastLoginAt: string
  apiKey: string
  appName: string
}
