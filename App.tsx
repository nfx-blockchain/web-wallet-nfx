import React, { useState } from 'react';
import { Wallet } from './components/Wallet';
// Provider injeta window.nfx
import './App.css';

function App() {
    const [connected, setConnected] = useState(false);

    return (
        <div className="app">
            {!connected ? (
                <HomePage onConnect={() => setConnected(true)} />
            ) : (
                <WalletPage onDisconnect={() => setConnected(false)} />
            )}
        </div>
    );
}

const HomePage: React.FC<{ onConnect: () => void }> = ({ onConnect }) => (
    <div className="home-page">
        <header>
            <nav>
                <div className="logo">NFX</div>
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#docs">Docs</a></li>
                </ul>
            </nav>
        </header>
        
        <main className="hero">
            <div className="hero-content">
                <h1>NFX WebWallet</h1>
                <p className="tagline">Secure. Fast. Decentralized.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔐</div>
                        <h3>End-to-End Encryption</h3>
                        <p>Your keys never leave your device</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Subsecond transaction confirmations</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <h3>Cross-Platform</h3>
                        <p>Web, Desktop, Mobile - all in one</p>
                    </div>
                </div>
                <button className="connect-btn" onClick={onConnect}>Connect Wallet</button>
            </div>
        </main>
        
        <footer>
            <p>&copy; 2026 NFXBlockchain</p>
        </footer>
    </div>
);

const WalletPage: React.FC<{ onDisconnect: () => void }> = ({ onDisconnect }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('0.00000000');
    const [tokens, setTokens] = useState([{ symbol: 'NFX', balance: '100.00' }]);
    const [nfts, setNFTs] = useState([{ name: 'NFT #1', id: '1' }]);
    const [islands, setIslands] = useState([{ id: '1', score: 1250, lots: 8 }]);

    const connectWallet = async () => {
        setAddress('NFX' + Math.random().toString(36).slice(2, 34).toUpperCase());
        setBalance((Math.random() * 1000).toFixed(8));
    };

    return (
        <div className="wallet-page">
            <header>
                <h1>NFX WebWallet</h1>
                <button onClick={onDisconnect} className="disconnect-btn">Disconnect</button>
            </header>
            <main>
                <div className="wallet-content">
                    <div className="balance-card">
                        <h2>Balance</h2>
                        <div className="balance-amount">{balance} NFX</div>
                    </div>
                    <div className="address-card">
                        <h2>Address</h2>
                        <div className="address-text">
                            {address ? `${address.slice(0, 16)}...${address.slice(-12)}` : 'Not connected'}
                        </div>
                    </div>
                    <div className="tokens-card">
                        <h3>Tokens</h3>
                        <div>{tokens.map(t => <div key={t.symbol}>{t.symbol}: {t.balance}</div>)}</div>
                    </div>
                    <div className="nfts-card">
                        <h3>NFTs</h3>
                        <div>{nfts.map(n => <div key={n.id}>{n.name} (#{n.id})</div>)}</div>
                    </div>
                    <div className="islands-card">
                        <h3>Islands</h3>
                        <div>{islands.map(i => <div key={i.id}>Island {i.id} - Score: {i.score} - Lots: {i.lots}</div>)}</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;