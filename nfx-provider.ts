// NFX Provider Integration
import { NFXProvider } from '../../nfx-dapp-provider/src/nfx-provider.js';

if (typeof window !== 'undefined') {
    window.nfx = new NFXProvider();
}