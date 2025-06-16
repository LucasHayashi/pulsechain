import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EnsRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const ensRegistryAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'author',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'content',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PulseCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pulseId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'author',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PulseDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pulseId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newLikeCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PulseLiked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pulseId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'unliker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newLikeCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PulseUnliked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PAGE_LIMIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PULSE_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pulseId', internalType: 'uint256', type: 'uint256' }],
    name: 'deletePulse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActivePulseCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pulseId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPulseById',
    outputs: [
      {
        name: '',
        internalType: 'struct PulseChain.Pulse',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'author', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'likes', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum PulseChain.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_offset', internalType: 'uint256', type: 'uint256' },
      { name: '_limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getPulses',
    outputs: [
      {
        name: '',
        internalType: 'struct PulseChain.Pulse[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'author', internalType: 'address', type: 'address' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'likes', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum PulseChain.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalPulsesCreated',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pulseId', internalType: 'uint256', type: 'uint256' }],
    name: 'likePulse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_content', internalType: 'string', type: 'string' }],
    name: 'postPulse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_pulseId', internalType: 'uint256', type: 'uint256' }],
    name: 'unlikePulse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_pulseId', internalType: 'uint256', type: 'uint256' },
      { name: '_user', internalType: 'address', type: 'address' },
    ],
    name: 'userHasLiked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const ensRegistryAddress = {
  1: '0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b',
  11155111: '0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const ensRegistryConfig = {
  address: ensRegistryAddress,
  abi: ensRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistry = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistryAbi,
  address: ensRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"MAX_PAGE_LIMIT"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryMaxPageLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'MAX_PAGE_LIMIT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"MAX_PULSE_LENGTH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryMaxPulseLength =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'MAX_PULSE_LENGTH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"getActivePulseCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryGetActivePulseCount =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'getActivePulseCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"getPulseById"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryGetPulseById =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'getPulseById',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"getPulses"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryGetPulses = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistryAbi,
  address: ensRegistryAddress,
  functionName: 'getPulses',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"getTotalPulsesCreated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryGetTotalPulsesCreated =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'getTotalPulsesCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"userHasLiked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useReadEnsRegistryUserHasLiked =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'userHasLiked',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWriteEnsRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: ensRegistryAbi,
  address: ensRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"deletePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWriteEnsRegistryDeletePulse =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'deletePulse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"likePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWriteEnsRegistryLikePulse =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'likePulse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"postPulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWriteEnsRegistryPostPulse =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'postPulse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"unlikePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWriteEnsRegistryUnlikePulse =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'unlikePulse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useSimulateEnsRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: ensRegistryAbi,
  address: ensRegistryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"deletePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useSimulateEnsRegistryDeletePulse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'deletePulse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"likePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useSimulateEnsRegistryLikePulse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'likePulse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"postPulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useSimulateEnsRegistryPostPulse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'postPulse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistryAbi}__ and `functionName` set to `"unlikePulse"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useSimulateEnsRegistryUnlikePulse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    functionName: 'unlikePulse',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWatchEnsRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistryAbi}__ and `eventName` set to `"PulseCreated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWatchEnsRegistryPulseCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    eventName: 'PulseCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistryAbi}__ and `eventName` set to `"PulseDeleted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWatchEnsRegistryPulseDeletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    eventName: 'PulseDeleted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistryAbi}__ and `eventName` set to `"PulseLiked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWatchEnsRegistryPulseLikedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    eventName: 'PulseLiked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistryAbi}__ and `eventName` set to `"PulseUnliked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf1e9cff187d12d8a33862e0108dd216cdb37aa0b)
 */
export const useWatchEnsRegistryPulseUnlikedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    eventName: 'PulseUnliked',
  })
