'use client'
import { useState } from "react";
import { vaultAbi } from "@/abi/VaultABI";
import {
  useEstimateGas,
  useSendTransaction,
  useConnect,
  useAccount,
  useDisconnect,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi";
import { parseUnits, encodeFunctionData } from "viem";

interface TokenBalance {
  chain: string;
  chain_id: number;
  address: string;
  amount: string;
  symbol: string;
  name?: string;
  decimals: number;
  price_usd: number;
  value_usd: number;
  pool_size?: number;
}

// Helper to truncate long addresses (except for "native")
function truncateAddress(address: string) {
  return address.slice(0, 5) + "....." + address.slice(-4);
}

// Helper to format the token amount (dividing by 10^decimals)
function formatTokenAmount(amount: string, decimals: number): string {
  const computed = parseFloat(amount) / Math.pow(10, decimals);
  return computed.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

// ----- WithdrawAction Component -----
// This component encodes a call to withdrawTo so that funds are withdrawn from the vault (vaultAddress)
// and sent to the connected wallet (recipientAddress) for the specified token and amount.
function WithdrawAction({
  vaultAddress,
  token,
  withdrawAmount,
  recipientAddress,
}: {
  vaultAddress: string;
  token: TokenBalance;
  withdrawAmount: string;
  recipientAddress: string;
}) {
  // Convert the human‑readable amount into base units.
  let parsedAmount: bigint | undefined;
  try {
    if (withdrawAmount) {
      parsedAmount = parseUnits(withdrawAmount, token.decimals);
    }
  } catch (e) {
    console.error("Invalid amount", e);
  }

  // Encode the call data for the withdrawTo function.
  // withdrawTo expects (amount, erc20Token, recipientAddress)
  let callData: `0x${string}` | undefined;
  if (parsedAmount && recipientAddress) {
    callData = encodeFunctionData({
      abi: vaultAbi,
      functionName: "withdrawTo",
      args: [parsedAmount, token.address, recipientAddress],
    });
  }

  // Ensure vaultAddress is a valid hex string.
  const hexVaultAddress = vaultAddress.startsWith("0x")
    ? vaultAddress
    : "0x" + vaultAddress;

  // Estimate gas for this transaction.
  const { data: estimatedGas, isLoading: isEstimating } = useEstimateGas({
    to: hexVaultAddress as `0x${string}`,
    data: callData,
  });

  // Override gas if the estimation is too low (e.g., 21000)
  // You might adjust 150000 to a value appropriate for your contract.
  const finalGas =
    estimatedGas && estimatedGas > BigInt(21000)
      ? estimatedGas
      : BigInt(150000);

  // Prepare to send the transaction.
  const { sendTransaction, error, data } = useSendTransaction();

  return (
    <div className="flex flex-col gap-1">
      <button
        disabled={!sendTransaction || isEstimating || !finalGas || !callData}
        onClick={() => {
          if (sendTransaction && callData && finalGas) {
            sendTransaction({
              to: hexVaultAddress,
              data: callData,
              gas: finalGas,
            });
          }
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        Withdraw
      </button>
      {error && (
        <div className="text-red-500 text-xs">Error: {error.message}</div>
      )}
      {data && (
        <div className="text-green-500 text-xs">Withdrawal successful!</div>
      )}
    </div>
  );
}

function VaultWithdraw() {
  const [vaultAddress, setVaultAddress] = useState("");
  const [balances, setBalances] = useState<TokenBalance[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withdrawAmounts, setWithdrawAmounts] = useState<{ [key: string]: string }>({});

  // Use Wagmi hooks for wallet connection.
  const { connect, connectors, isLoading: connectLoading, error: connectError } = useConnect();
  const { address: connectedWallet } = useAccount();
  const { disconnect } = useDisconnect();

  const fetchBalances = async () => {
    if (!vaultAddress) return;
    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      headers: { "X-Dune-Api-Key": "CpFDF1tbOEFPKGTpSnoJdnqBRql3vKDm" },
    };

    try {
      const response = await fetch(
        `https://api.dune.com/api/echo/v1/balances/evm/${vaultAddress}?chain_ids=all`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBalances(data.balances);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch balances. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-20 grid gap-6 pb-16">
      {/* Vault Address Input and Wallet Connect/Disconnect */}
      <div className="mt-10 flex flex-col gap-4 border-b pb-6 text-3xl font-semibold tracking-tight">
        <div>Vault Address (source contract):</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={vaultAddress}
            onChange={(e) => setVaultAddress(e.target.value)}
            placeholder="Enter vault address"
            className="border p-2 rounded w-full max-w-md"
          />
          <button
            onClick={fetchBalances}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Enter
          </button>
        </div>
        {/* Wallet Connect/Disconnect */}
        <div className="mt-4">
          {connectedWallet ? (
            <div className="flex items-center gap-4">
              <div className="text-sm text-green-600">
                Connected (recipient): {connectedWallet}
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (connectors[0]) connect({ connector: connectors[0] });
              }}
              disabled={connectLoading}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              {connectLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
          {connectError && (
            <div className="text-red-500 text-xs">Error: {connectError.message}</div>
          )}
        </div>
      </div>

      {/* Loading and error states */}
      {loading && <div>Loading balances...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display the balances in a table if available */}
      {balances && balances.length > 0 && (
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Chain</th>
                    <th className="px-4 py-2 text-left">Chain ID</th>
                    <th className="px-4 py-2 text-left">Token Address</th>
                    <th className="px-4 py-2 text-left">Symbol</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Price (USD)</th>
                    <th className="px-4 py-2 text-left">Value (USD)</th>
                    <th className="px-4 py-2 text-left">Withdraw</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {balances.map((token, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{token.chain}</td>
                      <td className="px-4 py-2">{token.chain_id}</td>
                      <td className="px-4 py-2">
                        {token.address === "native"
                          ? "native"
                          : truncateAddress(token.address)}
                      </td>
                      <td className="px-4 py-2">{token.symbol}</td>
                      <td className="px-4 py-2">{token.name || "-"}</td>
                      <td className="px-4 py-2">
                        {formatTokenAmount(token.amount, token.decimals)}
                      </td>
                      <td className="px-4 py-2">
                        ${token.price_usd !== undefined ? token.price_usd.toFixed(2) : "-"}
                      </td>
                      <td className="px-4 py-2">
                        ${token.value_usd !== undefined ? token.value_usd.toFixed(2) : "-"}
                      </td>
                      <td className="px-4 py-2">
                        {token.address !== "native" ? (
                          <div className="flex flex-col items-center gap-1">
                            <input
                              type="text"
                              placeholder="Amount"
                              value={withdrawAmounts[token.address] || ""}
                              onChange={(e) =>
                                setWithdrawAmounts((prev) => ({
                                  ...prev,
                                  [token.address]: e.target.value,
                                }))
                              }
                              className="border p-1 rounded w-24 text-sm"
                            />
                            <WithdrawAction
                              vaultAddress={vaultAddress}
                              token={token}
                              withdrawAmount={withdrawAmounts[token.address] || ""}
                              recipientAddress={connectedWallet || ""}
                            />
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {balances && balances.length === 0 && !loading && (
        <div>No token balances found for this vault.</div>
      )}
    </div>
  );
}

export default VaultWithdraw;