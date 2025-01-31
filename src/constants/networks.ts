import { ChainId } from '@dynamic-amm/sdk'
import Mainnet from '../assets/networks/mainnet-network.svg'
import Polygon from '../assets/networks/polygon-network.png'
import BSC from '../assets/networks/bsc-network.png'
import AVAX from '../assets/networks/avax-network.png'
import FTM from '../assets/networks/fantom-network.png'
import CRONOS from '../assets/networks/cronos-network.png'
import AURORA from '../assets/networks/aurora-network.svg'
import ARBITRUM from '../assets/networks/arbitrum-network.svg'
import VELAS from '../assets/networks/velas-network.png'
import OASIS from '../assets/networks/oasis-network.svg'
import BTT from '../assets/networks/bttc.png'

export const SUPPORTED_NETWORKS = [
  ChainId.MAINNET,
  ChainId.MATIC,
  ChainId.BSCMAINNET,
  ChainId.AVAXMAINNET,
  ChainId.FANTOM,
  ChainId.CRONOS,
  ChainId.ARBITRUM,
  // ChainId.BTTC,
  ChainId.VELAS,
  ChainId.AURORA,
  ChainId.OASIS,

  ...(process.env.REACT_APP_MAINNET_ENV === 'staging'
    ? [ChainId.ROPSTEN, ChainId.MUMBAI, ChainId.BSCTESTNET, ChainId.AVAXTESTNET, ChainId.FANTOM, ChainId.CRONOSTESTNET]
    : []),
] as const
export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number]

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.ROPSTEN]: Mainnet,
  [ChainId.RINKEBY]: Mainnet,
  [ChainId.GÖRLI]: Mainnet,
  [ChainId.KOVAN]: Mainnet,
  [ChainId.MATIC]: Polygon,
  [ChainId.MUMBAI]: Polygon,
  [ChainId.BSCTESTNET]: BSC,
  [ChainId.BSCMAINNET]: BSC,
  [ChainId.AVAXTESTNET]: AVAX,
  [ChainId.AVAXMAINNET]: AVAX,
  [ChainId.FANTOM]: FTM,
  [ChainId.CRONOSTESTNET]: CRONOS,
  [ChainId.CRONOS]: CRONOS,
  [ChainId.AURORA]: AURORA,
  [ChainId.BTTC]: BTT,
  [ChainId.ARBITRUM]: ARBITRUM,
  [ChainId.ARBITRUM_TESTNET]: ARBITRUM,
  [ChainId.VELAS]: VELAS,
  [ChainId.OASIS]: OASIS,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.MATIC]: 'Polygon',
  [ChainId.MUMBAI]: 'Mumbai',
  [ChainId.BSCTESTNET]: 'BSC Testnet',
  [ChainId.BSCMAINNET]: 'BSC',
  [ChainId.AVAXTESTNET]: 'Avalanche Testnet',
  [ChainId.AVAXMAINNET]: 'Avalanche',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.CRONOSTESTNET]: 'Cronos Testnet',
  [ChainId.CRONOS]: 'Cronos',
  [ChainId.AURORA]: 'Aurora',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.ARBITRUM_TESTNET]: 'Arbitrum Testnet',
  [ChainId.BTTC]: 'BitTorrent',
  [ChainId.VELAS]: 'Velas',
  [ChainId.OASIS]: 'Oasis',
}

export const TRUESIGHT_NETWORK_TO_CHAINID: { [p: string]: ChainId } = {
  eth: ChainId.MAINNET,
  bsc: ChainId.BSCMAINNET,
  avax: ChainId.AVAXMAINNET,
  polygon: ChainId.MATIC,
  fantom: ChainId.FANTOM,
  cronos: ChainId.CRONOS,
}
