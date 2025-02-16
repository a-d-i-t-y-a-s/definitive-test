'use client'
import React, { useState, useEffect } from "react";

// Define the TokenBalance interface (adjust if you already export it elsewhere)
export interface TokenBalance {
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

// You can also move your helper function to a shared utils file if desired.
export function formatTokenAmount(amount: string, decimals: number): string {
  const computed = parseFloat(amount) / Math.pow(10, decimals);
  return computed.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

interface BatchWithdrawModalProps {
  tokens: TokenBalance[];
  initialWithdrawAmounts: { [key: string]: string };
  onConfirm: (
    selectedTokens: { [key: string]: boolean },
    amounts: { [key: string]: string }
  ) => void;
  onCancel: () => void;
}

const BatchWithdrawModal: React.FC<BatchWithdrawModalProps> = ({
  tokens,
  initialWithdrawAmounts,
  onConfirm,
  onCancel,
}) => {
  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: string]: string }>(
    initialWithdrawAmounts
  );
  const [selectedTokens, setSelectedTokens] = useState<{ [key: string]: boolean }>({});

  // When the modal opens, default all tokens to selected.
  useEffect(() => {
    const defaultSelection: { [key: string]: boolean } = {};
    tokens.forEach((token) => {
      const key = token.address === "native" ? "native" : token.address;
      defaultSelection[key] = true;
    });
    setSelectedTokens(defaultSelection);
  }, [tokens]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{ padding: "1rem" }}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Select Tokens to Withdraw</h2>
        <div className="max-h-64 overflow-y-auto">
          {tokens.map((token) => {
            const key = token.address === "native" ? "native" : token.address;
            return (
              <div key={key} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedTokens[key] || false}
                  onChange={(e) =>
                    setSelectedTokens((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <div className="flex-1">
                  <div>
                    <strong>{token.symbol}</strong> ({token.name || "-"})
                  </div>
                  <div className="text-sm">
                    Available: {formatTokenAmount(token.amount, token.decimals)}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Amount"
                  value={selectedAmounts[key] || ""}
                  onChange={(e) =>
                    setSelectedAmounts((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="border rounded p-1 w-24 ml-2"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedTokens, selectedAmounts)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirm Withdrawals
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchWithdrawModal;
