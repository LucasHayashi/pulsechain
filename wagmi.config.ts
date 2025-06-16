import {loadEnv} from 'vite'
import {defineConfig} from '@wagmi/cli'
import {etherscan, react} from '@wagmi/cli/plugins'
import {mainnet, sepolia} from 'wagmi/chains'

const mode = process.env.MODE || process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
    out: 'src/generated.ts',
    contracts: [],
    plugins: [
        etherscan({
            apiKey: env.VITE_ETHERSCAN_API_KEY,
            chainId: sepolia.id,
            contracts: [
                {
                    name: 'EnsRegistry',
                    address: {
                        [mainnet.id]: '0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b',
                        [sepolia.id]: '0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b',
                    },
                },
            ],
        }),
        react(),
    ],
})
