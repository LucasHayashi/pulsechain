import {useChainId, useChains} from "wagmi";
import {ensRegistryAddress} from "../generated.ts";

export function useContractLink ()  {
    const chainId = useChainId();
    const chains = useChains();
    const currentChain = chains.find(chain => chain.id === chainId);
    const contractAddress = ensRegistryAddress[chainId as keyof typeof ensRegistryAddress];

    const getContractUrl = () => {
        if (!currentChain?.blockExplorers?.default?.url || !contractAddress) {
            return null;
        }

        return `${currentChain.blockExplorers.default.url}/address/${contractAddress}`;
    };

    return {
        contractLink: getContractUrl(),
        contractAddress
    }
}