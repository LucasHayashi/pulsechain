import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {mainnet, sepolia} from '@reown/appkit/networks'
import type {AppKitNetwork} from '@reown/appkit/networks'
import {webSocket, http, fallback} from 'wagmi'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_WC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const metadata = {
    name: 'AppKit',
    description: 'AppKit PulseChain',
    url: 'https://hayashi.dev.br/projetos/pulsechain',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [sepolia, mainnet] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    transports: {
        [sepolia.id]: webSocket('wss://ethereum-sepolia-rpc.publicnode.com'),
        [mainnet.id]: webSocket('wss://ethereum-rpc.publicnode.com')
    }
})

export const config = wagmiAdapter.wagmiConfig