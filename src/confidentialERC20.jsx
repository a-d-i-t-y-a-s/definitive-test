// import React from "react";
// import { useState, useEffect } from "react";
// import { getInstance, provider, getTokenSignature } from "@/utils/fhevm";
// import { toHexString } from "@/utils/utils";
// import { Contract } from "ethers";
// import erc20ABI from "@/ABI.json";

// let instance;
// const CONTRACT_ADDRESS = "0xa0924e65A4C979cd30538b74860D26Daa83C327A";

// function ConfidentialERC20() {
//   const [amountMint, setAmountMint] = useState(0);
//   const [loading, setLoading] = useState("");
//   const [dialog, setDialog] = useState("");
//   const [encryptedData, setEncryptedData] = useState("");
//   const [userBalance, setUserBalance] = useState("hidden");

//   useEffect(() => {
//     async function fetchInstance() {
//       instance = await getInstance();
//     }
//     fetchInstance();
//   }, []);

//   const handleAmountMintChange = (e) => {
//     setAmountMint(Number(e.target.value));
//     console.log(instance);
//     if (instance) {
//       const encrypted = instance.encrypt32(Number(e.target.value));
//       setEncryptedData(toHexString(encrypted));
//     }
//   };

//   const mint = async (event) => {
//     event.preventDefault();
//     try {
//       const signer = await provider.getSigner();
//       const contract = new Contract(CONTRACT_ADDRESS, erc20ABI, signer);
//       setLoading('Encrypting "30" and generating ZK proof...');
//       setLoading("Sending transaction...");
//       const transaction = await contract.mint("0x" + encryptedData);
//       //   const transaction = await contract["mint(bytes)"]("0x" + encryptedData);
//       setLoading("Waiting for transaction validation...");
//       await provider.waitForTransaction(transaction.hash);
//       setLoading("");
//       setDialog("Tokens have been minted!");
//     } catch (e) {
//       console.log(e);
//       setLoading("");
//       setDialog("Transaction error!");
//     }
//   };

//   const reencrypt = async () => {
//     try {
//       const signer = await provider.getSigner();
//       const contract = new Contract(CONTRACT_ADDRESS, erc20ABI, signer);
//       setLoading("Decrypting total supply...");
//       const { publicKey, signature } = await getTokenSignature(
//         CONTRACT_ADDRESS,
//         signer.address,
//         signer
//       );
//       const ciphertext = await contract.balanceOf(publicKey, signature);
//       console.log(ciphertext);
//       const userBalance = instance.decrypt(CONTRACT_ADDRESS, ciphertext);
//       console.log(ciphertext, userBalance);
//       setUserBalance(String(userBalance));
//       setLoading("");
//     } catch (e) {
//       console.log(e);
//       setLoading("");
//       setDialog("Error during reencrypt!");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <div className="flex flex-col text-center justify-center items-center mb-10 mt-10">
//         <img src={"/band.svg"} alt="Band" />
//         <h1 className="my-10 text-2xl font-bold text-gray-500">
//           Confidential ERC20
//         </h1>
//         <img src={"/band.svg"} alt="Band" />
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <div className="flex flex-col md:w-1/2 p-4">
//           <div className="bg-black py-10 px-10 text-left mb-6">
//             <div className="text-white">
//               Name:{" "}
//               <span className="text-custom-green">Confidential ERC-20</span>
//             </div>
//             <div className="text-white">
//               Symbol: <span className="text-custom-green">CUSD</span>
//             </div>
//             <div className="text-white">
//               Address:{" "}
//               <span className="text-custom-green">
//                 {CONTRACT_ADDRESS.substring(0, 5) +
//                   "..." +
//                   CONTRACT_ADDRESS.substring(
//                     CONTRACT_ADDRESS.length - 5,
//                     CONTRACT_ADDRESS.length
//                   )}
//               </span>
//             </div>
//             <div className="text-white">
//               Your Balance:{" "}
//               <span className="text-custom-green">{userBalance}</span>
//             </div>
//             <button
//               className="bg-gray-200 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded mb-8"
//               onClick={reencrypt}
//             >
//               Decrypt own balance
//             </button>
//           </div>
//           <form onSubmit={mint}>
//             <input
//               type="number"
//               placeholder="Enter amount to mint"
//               value={amountMint}
//               onChange={handleAmountMintChange}
//               className="border rounded-md px-4 py-2 mb-1 bg-white"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
//             >
//               Mint
//             </button>
//           </form>
//           {encryptedData && (
//             <div>
//               <p className="text-gray-500">Generated Ciphertext:</p>
//               <div className="text-gray-500 overflow-y-auto h-10 flex flex-col">
//                 <p>{"0x" + encryptedData.substring(0, 26) + "..."}</p>
//               </div>
//             </div>
//           )}
//           <div className="text-gray-500">
//             {dialog && <div>{dialog}</div>}
//             {loading && <div>{loading}</div>}
//           </div>
//         </div>
//         <div className="flex flex-col md:w-1/2 p-4 overflow-y-auto h-96 bg-amber-300">
//           <div className="text-lg">Code Snippets:</div>
//           <br></br>
//           <div className="text-sm">
//             The user balances are stored on-chain and encrypted in the euint32
//             format. An encrypted amount of tokens for the mint is generated on
//             the client side and sent to the contract. The total supply is also
//             encrypted.
//           </div>
//           <img src={"/CodeSvg1.svg"} alt="CodeSvg1" />
//           <div className="text-sm">
//             Users are able to view their own decrypted balances.
//           </div>
//           <img src={"/CodeSvg2.svg"} alt="CodeSvg2" />
//           <div>
//             Smart Contract Implementation:{" "}
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href="https://docs.inco.org/getting-started/example-dapps/erc-20"
//             >
//               Here
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConfidentialERC20;
