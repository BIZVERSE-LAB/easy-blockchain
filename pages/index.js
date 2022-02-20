import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { withTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import path from 'path'
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chain from '../components/chain'
import MultiChain from '../components/multichain'
import Header from '../components/header'

import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import useSWR from 'swr'

import stores from '../stores'
import classes from './index.module.css'
import { tokens } from '../constants/tokens'
import { networks } from '../constants/networks'

const searchTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2F80ED',
    },
  },
  shape: {
    borderRadius: '10px'
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '12px'
    }
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        "box-shadow": '0px 7px 7px #0000000A;',
        "-webkit-box-shadow": '0px 7px 7px #0000000A;',
        "-moz-box-shadow": '0px 7px 7px #0000000A;',
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '14px'
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12.5px 14px'
      },
      notchedOutline: {
        borderColor: "#FFF",
      }
    },
  },
});

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Home({ changeTheme, theme }) {
  const { data, error } = useSWR('https://chainid.network/chains.json', fetcher)

  const [ layout, setLayout ] = useState('grid')
  const [ search, setSearch ] = useState('')
  const [isMetaMaskInstalled, setMetaMaskInstalled] = useState(false)
  const [ hideMultichain, setHideMultichain ] = useState('1')
  const [account,setAccount] = useState({})

  const googleElementInit = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-2CQEYT1EWD');
  };

  useEffect(() => {
    window.addEventListener("load", googleElementInit);
    return () => window.removeEventListener("load", googleElementInit);
  }, []);

  const router = useRouter()
  if (router.query.search) {
    setSearch(router.query.search)
    delete router.query.search
  }

  const onSearchChanged = (event) => {
    setSearch(event.target.value)
  }

  const handleLayoutChanged = (event, newVal) => {
    if(newVal !== null) {
      setLayout(newVal)
      localStorage.setItem('yearn.finance-invest-layout', newVal ? newVal : '')
    }
  }

  const addNetwork = () => {
    window.open('https://github.com/ethereum-lists/chains', '_blank')
  }

  const closeMultichain = (perma) => {
    setHideMultichain('1')
    localStorage.setItem('chainlist.org-hideMultichain', perma ? '1' : '0')
  }

  useEffect(() => {
    const multi = localStorage.getItem('chainlist.org-hideMultichain')
    if(multi) {
      setHideMultichain(multi)
    } else {
      setHideMultichain('0')
    }
  }, [])

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account')
      setAccount(accountStore)
    }
    stores.emitter.on('STORE_UPDATED', accountConfigure)
    return () => {
      stores.emitter.removeListener('STORE_UPDATED', accountConfigure)
    }
  }, [])

  const handleClose = () => {
    setAccount({})
  } 

  return (
    <div className={styles.container}>
      <Head>
        <title>Chain&TokenList</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={ theme.palette.type === 'dark' ? classes.containerDark : classes.container }>
          <div className={ classes.copyContainer }>
            <div className={ classes.copyCentered }>
              <Typography variant='h1' className={ classes.chainListSpacing }><img className={classes.logo} src="/logo.png" /></Typography>
              <Typography variant='h2' className={ classes.helpingParagraph }>Helping users connect to EVM powered networks</Typography>
              <Typography className={classes.subTitle}>Easy Blockchain is a list of EVM networks. Users can use the information to connect their wallets and Web3 middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.</Typography>
            </div>
            <div className={classes.flex}>
              <div className={classes.iconWrapper}>
                <a href="https://t.me/easyblockchainorg" className={classes.icon} target="blank">
                  <img  src="/chains/telegram.png" className={ classes.image} />
                </a>
              </div>
              <div className={classes.iconWrapper}>
                <a href="https://twitter.com/blockchain_easy" className={classes.icon} target="blank">
                  <img  src="/chains/twitter.png" className={ classes.image} />
                </a>
              </div><div className={classes.iconWrapper}>
                <a href="https://www.facebook.com/easyblockchain.org" className={classes.icon} target="blank">
                  <img  src="/chains/facebook.png" className={ classes.image} />
                </a>
              </div>
            </div>
            <div className={ classes.flexBox }> 
            {networks.map(item => (
              <Chain key={item.chainId} chain={item} />
            ))}
            </div>
            <div className={ classes.flexBox }>
              <Chain chain={ tokens[0] } isToken chains={data} />
              <Chain chain={ tokens[1] } isToken chains={data} />
            </div>
          </div>
          <div className={ theme.palette.type === 'dark' ? classes.listContainerDark : classes.listContainer }>
            <div className={ theme.palette.type === 'dark' ? classes.headerContainerDark : classes.headerContainer }>
              <div className={ classes.filterRow }>
                <ThemeProvider theme={searchTheme}>
                  <Paper className={ classes.searchPaper }>
                    <TextField
                      fullWidth
                      className={ classes.searchContainer }
                      variant="outlined"
                      placeholder="ETH, BIVE, ..."
                      value={ search }
                      color="#fff"
                      onChange={ onSearchChanged }
                      InputProps={{
                        endAdornment: <InputAdornment position="end" className={ classes.searchInputAdnornmentEnd }>
                          <SearchIcon fontSize="small"  />
                        </InputAdornment>,
                        startAdornment: <InputAdornment position="start">
                          <Typography className={ classes.searchInputAdnornment }>
                            Search
                          </Typography>
                        </InputAdornment>
                      }}
                    />
                  </Paper>
                </ThemeProvider>
              </div>
              <Header changeTheme={ changeTheme } />
            </div>
            <div>
              <Typography variant='h2' className={ classes.sectionsHeader }>
                  Networks
                </Typography>
              <div className={ classes.cardsContainer }>
                
                {
                  data && data.filter((chain) => {
                    if(search === '') {
                      return true
                    } else {
                      //filter
                      return (chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                      chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                      chain.name.toLowerCase().includes(search.toLowerCase()) ||
                      (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase()))
                    }
                  }).map((chain, idx) => {
                    return <Chain chain={ chain } key={ idx } />
                  })
                }
              </div>
            </div>
            {/* Tokens */}
            <div>
            <Typography variant='h2' className={ classes.sectionsHeader }>
                Tokens
              </Typography>
              <div className={ classes.cardsContainer }>
                {
                  tokens.filter((chain) => {
                    if(search === '') {
                      return true
                    } else {
                      //filter
                      return (chain.chainName.toLowerCase().includes(search.toLowerCase()) ||
                      chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                      chain.tokenName.toLowerCase().includes(search.toLowerCase()) ||
                      (chain.options ? chain.options.symbol : '').toLowerCase().includes(search.toLowerCase()))
                    }
                  }).map((chain, idx) => {
                    return <Chain chain={ chain } key={ idx } isToken chains={data} />
                  })
                }
              </div>
            </div>
          </div>
          <Dialog
            open={!!account.isMetaMaskInstalled}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Metamask not detected. Please <a className={classes.link} href="https://metamask.io/download.html" target="_blank" rel="noreferrer"> install extension </a>  and try again
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <p>We are using Chainlist's opensource</p>
        </div>
      </main>
    </div>
  )
}

export default withTheme(Home)
