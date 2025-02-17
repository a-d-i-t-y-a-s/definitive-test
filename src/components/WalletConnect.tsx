// WalletConnect.jsx
import React from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

const WalletConnect = () => {
  const { connect, connectors, isLoading, error, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  // Look for the injected connector (this supports MetaMask, Rabby, etc.)
  const injectedConnector = connectors.find(connector => connector.id === 'injected');

  return (
    <div className="mt-4">
      {isConnected ? (
        <div className="flex items-center gap-4">
          <div className="text-sm text-green-600">
            Connected: {address}
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
          onClick={() => injectedConnector && connect({ connector: injectedConnector })}
          disabled={!injectedConnector || isLoading}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          {isLoading && pendingConnector?.id === injectedConnector?.id
            ? 'Connecting...'
            : 'Connect with MetaMask / Rabby'}
        </button>
      )}
      {error && (
        <div className="text-red-500 text-xs mt-2">Error: {error.message}</div>
      )}
    </div>
  );
};

export default WalletConnect;
