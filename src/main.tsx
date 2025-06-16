import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {WagmiProvider} from 'wagmi'

import App from './App'

import {wagmiAdapter} from './config'

import './index.css'

import {ThemeProviderCustom} from "./context/ThemeContext.tsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <ThemeProviderCustom>
                    <App/>
                </ThemeProviderCustom>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>,
)
