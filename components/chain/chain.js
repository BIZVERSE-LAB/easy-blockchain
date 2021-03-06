import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, Tooltip } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router'
import Web3 from 'web3';

import classes from './chain.module.css'

import stores from '../../stores/index.js'
import { getProvider, getNetworkParam } from '../../utils'

import {
  ERROR,
  CONNECT_WALLET,
  TRY_CONNECT_WALLET,
  ACCOUNT_CONFIGURED
} from '../../stores/constants'

export default function Chain({ chain, isToken, chains }) {
  const router = useRouter()
  const [ account, setAccount ] = useState(null)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account')
      setAccount(accountStore)
    }

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure)

    const accountStore = stores.accountStore.getStore('account')
    setAccount(accountStore)

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure)
    }
  }, [])

  const toHex = (num) => {
    return '0x'+num.toString(16)
  }

  const addToNetwork = async() => {
    if(!(account && account.address)) {
      stores.dispatcher.dispatch({ type: TRY_CONNECT_WALLET })
      return
    }

    if (isToken) {
      const accounts = await window.web3.eth.getAccounts()
      if (window.ethereum.chainId !== chain.chainId) {
        const chainList = getNetworkParam(chain.chainId, chains)
        const params = {
          chainId: toHex(chainList.chainId), // A 0x-prefixed hexadecimal string
          chainName: chainList.name,
          nativeCurrency: {
            name: chainList.nativeCurrency.name,
            symbol: chainList.nativeCurrency.symbol, // 2-6 characters long
            decimals: chainList.nativeCurrency.decimals,
          },
          rpcUrls: chainList.rpc,
          blockExplorerUrls: [ ((chainList.explorers && chainList.explorers.length > 0 && chainList.explorers[0].url) ? chainList.explorers[0].url : chainList.infoURL) ]
        }
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [params, accounts[0]],
          })
        }
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: "ERC20",
          options: chain.options
        }
      })
    } else {
      const params = {
        chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
        chainName: chain.name,
        nativeCurrency: {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol, // 2-6 characters long
          decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: chain.rpc,
        blockExplorerUrls: [ ((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL) ]
      }

      window.web3.eth.getAccounts((error, accounts) => {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params, accounts[0]],
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          stores.emitter.emit(ERROR, error.message ? error.message : error)
          console.log(error)
        });
      })
    }
  }

  const renderProviderText = () => {
    if(account && account.address) {
      const providerTextList = {
        Metamask: 'Add to Metamask',
        imToken: 'Add to imToken',
        Wallet: 'Add to Wallet'
      }
      return isToken ? 'Add to wallet' : providerTextList[getProvider()]
    } else {
      return 'Connect wallet'
    }

  }

  if(!chain) {
    return <div></div>
  }

  return (
    <Paper elevation={ 1 } className={ classes.chainContainer } key={ chain.chainId }>
      {!isToken && <div className={classes.tooltip}>
          <p className={classes.text}>Chain</p>
        </div>
      }
      <div className={ classes.chainNameContainer }>
        <img
          src={isToken ? chain.options.image : chain.icon || `chains/unknown-logo.png`}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/chains/unknown-logo.png";
          }}
          width={ 28 }
          height={ 28 }
          className={ classes.avatar }
        />
        <Tooltip title={ isToken ? chain.tokenName : chain.name }>
          <Typography variant='h3' className={ classes.name } noWrap>
            <a href={ chain.infoURL } target="_blank" rel="noreferrer">
              { isToken ? chain.tokenName : chain.name }
            </a>
          </Typography>
        </Tooltip>
      </div>
      {isToken ? (
        <div className={ classes.chainInfoContainer }>
          <div className={ classes.dataPoint }>
            <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader} >Layer</Typography>
            <Typography variant='h5'>{ chain.chainName }</Typography>
          </div>
          <div className={ classes.dataPoint }>
            <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader}>Symbol</Typography>
            <Typography variant='h5'>{ chain.options ? chain.options.symbol : 'none' }</Typography>
          </div>
        </div>
      ) :
        <div className={ classes.chainInfoContainer }>
          <div className={ classes.dataPoint }>
            <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader} >ChainID</Typography>
            <Typography variant='h5'>{ chain.chainId }</Typography>
          </div>
          <div className={ classes.dataPoint }>
            <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader}>Currency</Typography>
            <Typography variant='h5'>{ chain.nativeCurrency ? chain.nativeCurrency.symbol : 'none' }</Typography>
          </div>
        </div>
      }
      <div className={ classes.addButton }>
        <Button
          variant='outlined' 
          onClick={ addToNetwork }
          className={ classes.btn }
        >
          { renderProviderText() }
        </Button>
      </div>
    </Paper>
  )
}
