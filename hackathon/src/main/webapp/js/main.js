import router from './router.js';
import wallet from './components/wallet.js';
import partner from './components/partner.js';
import reserved from './components/reserved.js';

router.register('/wallet', wallet);
router.register('/reserved', reserved);
router.register('/partner', partner);
router.navigate(location.hash ? location.hash.slice(1) : '/wallet');
