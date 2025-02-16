import { parseUnits, encodeFunctionData } from "viem";
import { useEstimateGas, useSendTransaction, useAccount } from "wagmi";
import { vaultAbi } from "@/abi/VaultABI";

// Minimal ERC20 ABI for transfer
const erc20Abi = [
  {
    name: "transfer",
    type: "function",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

function BatchWithdrawAction({ vaultAddress, tokens, withdrawAmounts, recipientAddress }) {
  const { address: connectedAddress } = useAccount();
  console.log("Transaction is being sent from account:", connectedAddress);
  
  // Build the calls array for each token that has a withdrawal amount.
  const calls = tokens.reduce((acc, token) => {
    const key = token.address === "native" ? "native" : token.address;
    const amountStr = withdrawAmounts[key];
    if (!amountStr || amountStr === "0") return acc;

    let parsedAmount;
    try {
      parsedAmount = token.address === "native"
        ? parseUnits(amountStr, 18)
        : parseUnits(amountStr, token.decimals);
      console.log(`Parsed amount for ${token.symbol} (${token.address}):`, parsedAmount.toString());
    } catch (e) {
      console.error("Invalid amount for token", token, e);
      return acc;
    }
    
    if (token.address === "native") {
      // For native tokens, we send the value directly to the recipient with no data.
      acc.push({
        target: recipientAddress,
        value: parsedAmount,
        data: "0x",
      });
      console.log("Added native token call:", acc[acc.length - 1]);
    } else {
      // For ERC20 tokens, encode the underlying transfer function call.
      const transferCallData = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipientAddress, parsedAmount],
      });
      acc.push({
        target: token.address,
        value: "0",
        data: transferCallData,
      });
      console.log("Added ERC20 token call:", acc[acc.length - 1]);
    }
    return acc;
  }, []);

  if (calls.length === 0) {
    return <div>No tokens selected for withdrawal.</div>;
  }

  // Encode the batch call using executeBatch on the vault.
  const batchCallData = encodeFunctionData({
    abi: vaultAbi,
    functionName: "executeBatch",
    args: [calls],
  });
  console.log("Batch Calls:", calls);
  console.log("Encoded Batch Call Data:", batchCallData);

  const hexVaultAddress = vaultAddress.startsWith("0x") ? vaultAddress : "0x" + vaultAddress;

  // Estimate gas for the executeBatch call.
  const { data: estimatedGas, isLoading: isEstimating } = useEstimateGas({
    to: hexVaultAddress,
    data: batchCallData,
  });
  
  console.log("Estimated gas:", estimatedGas);
  const finalGas =
    estimatedGas && estimatedGas > BigInt(21000)
      ? (estimatedGas * BigInt(120)) / BigInt(100)
      : BigInt(500000);
  
  console.log("Final gas:", finalGas);

  const { sendTransaction, error, data } = useSendTransaction();
  console.log("sendTransaction function:", sendTransaction);

  return (
    <div className="mt-4">
      <button
        disabled={!sendTransaction || isEstimating || !finalGas || !batchCallData}
        onClick={() => {
          if (sendTransaction && batchCallData && finalGas) {
            sendTransaction({
              to: hexVaultAddress,
              data: batchCallData,
              gas: finalGas,
            });
          }
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Confirm Batch Withdrawal
      </button>
      {error && <div className="text-red-500 text-xs">Error: {error.message}</div>}
      {data && <div className="text-green-500 text-xs">Batch withdrawal successful!</div>}
    </div>
  );
}

export default BatchWithdrawAction;
