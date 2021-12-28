export const networks = [
  {
    "name": "Polygon Mainnet",
    "chain": "Polygon",
    "network": "mainnet",
    "rpc": [
      "https://speedy-nodes-nyc.moralis.io/c0ff78e0f9946303a9f02905/polygon/mainnet"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "MATIC",
    "chainId": 137,
    "networkId": 137,
    "slip44": 966,
    "explorers": [
      {
        "name": "polygonscan",
        "url": "https://polygonscan.com/",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Ethereum Mainnet",
    "chain": "ETH",
    "network": "mainnet",
    "rpc": [
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://ethereum.org",
    "shortName": "eth",
    "chainId": 1,
    "networkId": 1,
    "slip44": 60,
    "ens": {
      "registry": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    "explorers": [
      {
        "name": "etherscan",
        "url": "https://etherscan.io",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Binance Smart Chain Mainnet",
    "chain": "BSC",
    "network": "mainnet",
    "rpc": [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    "faucets": [
      "https://free-online-app.com/faucet-for-eth-evm-chains/"
    ],
    "nativeCurrency": {
      "name": "Binance Chain Native Token",
      "symbol": "BNB",
      "decimals": 18
    },
    "infoURL": "https://www.binance.org",
    "shortName": "bnb",
    "chainId": 56,
    "networkId": 56,
    "slip44": 714,
    "explorers": [
      {
        "name": "bscscan",
        "url": "https://bscscan.com",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "BIVE",
    "chain": "Polygon",
    "network": "mainnet",
    "rpc": [
      "https://speedy-nodes-nyc.moralis.io/c0ff78e0f9946303a9f02905/polygon/mainnet"
    ],
    "type": "ERC20",
    "method": "wallet_watchAsset",
    "faucets": [],
    "nativeCurrency": {
      "address": "0x130e6203f05805cd8c44093a53c7b50775eb4ca3",
      "symbol": "BIVE",
      "decimals": 4,
      "image": "https://bizverse-avatar.s3.ap-southeast-1.amazonaws.com/BIVE-logo.png"
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "MATIC",
    "chainId": 137,
    "networkId": 137,
    "slip44": 966,
    "icon": "https://bizverse-avatar.s3.ap-southeast-1.amazonaws.com/BIVE-logo.png"
  },
  {
    "name": "VRA",
    "chain": "Polygon",
    "network": "mainnet",
    "rpc": [
      "https://speedy-nodes-nyc.moralis.io/c0ff78e0f9946303a9f02905/polygon/mainnet"
    ],
    "type": "ERC20",
    "method": "wallet_watchAsset",
    "faucets": [],
    "nativeCurrency": {
      "address": "0x130e6203f05805cd8c44093a53c7b50775eb4ca3",
      "symbol": "VRA",
      "decimals": 4,
      "image": "https://bizverse-avatar.s3.ap-southeast-1.amazonaws.com/VRA-Coin.png"
    },
    "infoURL": "https://polygon.technology/",
    "shortName": "MATIC",
    "chainId": 137,
    "networkId": 137,
    "slip44": 966,
    "icon": "https://bizverse-avatar.s3.ap-southeast-1.amazonaws.com/VRA-Coin.png"
  }
]