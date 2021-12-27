import BigNumber from 'bignumber.js'

export const Polygon_ChainId_Hex = "0x89";
export const Polygon_ChainId = 127;

export function formatCurrency(amount, decimals=2) {
  if(!isNaN(amount)) {
    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount)
  } else {
    return 0
  }
}

export function formatAddress(address, length='short') {
  if (address && length==='short') {
    address = address.substring(0,6)+'...'+address.substring(address.length-4,address.length)
    return address
  } else if (address && length==='long') {
    address = address.substring(0,12)+'...'+address.substring(address.length-8,address.length)
    return address
  } else {
    return null
  }
}

export function bnDec(decimals) {
  return new BigNumber(10)
          .pow(parseInt(decimals))
}

export function getProvider() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined" ) {
    if (window.ethereum.isMetaMask) return 'Metamask'
    if (window.ethereum.isImToken) return 'imToken'
  }
  return 'Wallet'
}

const isMetaMaskInstalled = async () => {
  console.log(window.ethereum.isMetaMask);
}

const chainId = async () => {
  // Check currentChanId. ChainId of Polygon mainnet is 0x89
  console.log(window.ethereum.chainId) //0x89
  
}

export const switchNetwork = async () => {
  // Change network
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: Polygon_ChainId_Hex }]
  });
}

const addNetwork = async () => {
  // Add network if not exist network with chainId 0x89
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        blockExplorerUrls: ['https://polygonscan.com'],
        rpcUrls: ['https://speedy-nodes-nyc.moralis.io/c0ff78e0f9946303a9f02905/polygon/mainnet'],
      },
    ],
  });
}

const addToken = async () => {
  await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
        symbol: 'ATOM',
        decimals: 18,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png', 
      },
    },
  });
}