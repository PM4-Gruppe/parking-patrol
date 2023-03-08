import '../styles/tailwind.css'
import Layout from '../components'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
