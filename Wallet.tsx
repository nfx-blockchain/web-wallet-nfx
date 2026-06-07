import React, { useState, useEffect } from 'react';
import './Wallet.css';

interface WalletProps {
    onConnect: (address: string) => void;
}

export const Wallet: React.FC<WalletProps> = ({ onConnect }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('0.00000000');
    const [connecting, setConnecting] = useState(false);

    const connectWallet = async () => {
        setConnecting(true);
        // Mock connection - would connect via RPC
        setTimeout(() => {
            setAddress('NFX' + Math.random().toString(36).slice(2, 34).toUpperCase());
            setBalance((Math.random() * 1000).toFixed(8));
            onConnect(address);
            setConnecting(false);
        }, 1000);
    };

    return (
        <div className="wallet-card">
            <h2>NFX Wallet</h2>
            
            {!address ? (
                <button onClick={connectWallet} disabled={connecting}>
                    {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <>
                    <div className="balance">
                        <span className="label">Balance:</span>
                        <span className="value">{balance} NFX</span>
                    </div>
                    <div className="address">
                        <span className="label">Address:</span>
                        <span className="value">{address.slice(0, 12)}...{address.slice(-8)}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wallet;