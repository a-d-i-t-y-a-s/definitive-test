// export const abi = [
//   {
//     "inputs": [],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [],
//     "name": "ECDSAInvalidSignature",
//     "type": "error"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "length",
//         "type": "uint256"
//       }
//     ],
//     "name": "ECDSAInvalidSignatureLength",
//     "type": "error"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes32",
//         "name": "s",
//         "type": "bytes32"
//       }
//     ],
//     "name": "ECDSAInvalidSignatureS",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "InvalidShortString",
//     "type": "error"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "str",
//         "type": "string"
//       }
//     ],
//     "name": "StringTooLong",
//     "type": "error"
//   },
//   {
//     "anonymous": false,
//     "inputs": [],
//     "name": "EIP712DomainChanged",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "publicKey",
//         "type": "bytes32"
//       },
//       {
//         "internalType": "bytes",
//         "name": "signature",
//         "type": "bytes"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "internalType": "bytes",
//         "name": "",
//         "type": "bytes"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "encryptedAmount",
//         "type": "bytes"
//       }
//     ],
//     "name": "approve",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes32",
//         "name": "publicKey",
//         "type": "bytes32"
//       },
//       {
//         "internalType": "bytes",
//         "name": "signature",
//         "type": "bytes"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "internalType": "bytes",
//         "name": "",
//         "type": "bytes"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "balanceOfMe",
//     "outputs": [
//       {
//         "internalType": "euint32",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "contractBalanceReader",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "internalType": "uint8",
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "eip712Domain",
//     "outputs": [
//       {
//         "internalType": "bytes1",
//         "name": "fields",
//         "type": "bytes1"
//       },
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "version",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "chainId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "address",
//         "name": "verifyingContract",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "salt",
//         "type": "bytes32"
//       },
//       {
//         "internalType": "uint256[]",
//         "name": "extensions",
//         "type": "uint256[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes32",
//         "name": "publicKey",
//         "type": "bytes32"
//       },
//       {
//         "internalType": "bytes",
//         "name": "signature",
//         "type": "bytes"
//       }
//     ],
//     "name": "getTotalSupply",
//     "outputs": [
//       {
//         "internalType": "bytes",
//         "name": "",
//         "type": "bytes"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes",
//         "name": "encryptedAmount",
//         "type": "bytes"
//       }
//     ],
//     "name": "mint",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "encryptedAmount",
//         "type": "bytes"
//       }
//     ],
//     "name": "mintAndApprove",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "returnEncryptedAllowanceOfUser",
//     "outputs": [
//       {
//         "internalType": "euint32",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_userAddress",
//         "type": "address"
//       }
//     ],
//     "name": "returnEncryptedBalanceOfUser",
//     "outputs": [
//       {
//         "internalType": "euint32",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_readerAddress",
//         "type": "address"
//       }
//     ],
//     "name": "setBalanceReader",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "encryptedAmount",
//         "type": "bytes"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "euint32",
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "euint32",
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes",
//         "name": "encryptedAmount",
//         "type": "bytes"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ] as const
