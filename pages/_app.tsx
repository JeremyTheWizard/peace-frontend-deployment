import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { providers } from "ethers";
import { setChainId } from 'store/reducers/web3';
import { store } from 'store';
import { useEffect } from 'react';
import Layout from 'components/layout';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal'
      }
    }
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  }
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!window.ethereum) return;

    const provider: providers.Web3Provider = new providers.Web3Provider(window.ethereum);

    provider.on('network', ({ chainId }) => {
      store.dispatch(setChainId({ chainId }));
    });

    window.ethereum.on('accountsChanged', handleChainChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleChainChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  }, []);

  function handleChainChanged() {
    window.location.reload();
  }

  return(
    <Provider store={store}>
      <ChakraProvider theme={ theme }>
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </ChakraProvider>
    </Provider>
  ); 
}

export default appWithTranslation(App);
