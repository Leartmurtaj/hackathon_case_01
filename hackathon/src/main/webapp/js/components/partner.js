import util from '../util.js';
import service from '../service.js';

export default {
    title: 'Partner', async render() {
        const layout = await util.loadTemplate('layout.html');
        const page = layout.querySelector('#page');

        // 1. Load the partner template
        const partnerTemplate = await util.loadTemplate('partner.html');

        // 2. Inject it into the page first
        page.replaceChildren(partnerTemplate);
        util.activateNav(layout);

        // 3. NOW find the elements inside 'page'
        const metrics = page.querySelector('#metrics');
        const result = page.querySelector('#result');
        const qr = page.querySelector('#qr');
        const pasteBtn = page.querySelector('#paste-qr');

        const badge = s => `<span class="badge ${s}">${s}</span>`;

        async function load() {
            const d = await service.dashboard();
            metrics.innerHTML = `<p><strong>${d.bookings}</strong> bookings</p><p><strong>${d.openRedemptions}</strong> open redemptions</p><p><strong>${d.redeemed}</strong> redeemed</p><p><strong>CHF ${d.partnerSavings.toFixed(2)}</strong> modeled value</p>`;
        }

        function renderItem(i, action) {
            result.innerHTML = `<article class="card mt-3">${badge(i.benefit.status)}<h2 class="mt-3">${i.offer.title}</h2><p>Partner: <strong>${i.offer.partner}</strong></p><p>Token: <strong>${i.benefit.qrCode}</strong></p><p class="meta mb-0">${action}</p></article>`;
        }

        // 4. Attach listeners to the found elements
        page.querySelector('#validate').addEventListener('click', async () => {
            try {
                const i = await service.validate(qr.value.trim());
                renderItem(i, i.benefit.status === 'REDEEMED' ? 'This benefit has already been redeemed.' : 'Token is valid and ready for redemption.');
            } catch (e) {
                result.innerHTML = `<div class="alert alert-danger">${e.message}</div>`;
            }
        });

        page.querySelector('#redeem').addEventListener('click', async () => {
            try {
                const i = await service.redeem(qr.value.trim());
                renderItem(i, 'Redemption confirmed once.');
                await load();
            } catch (e) {
                result.innerHTML = `<div class="alert alert-danger">${e.message}</div>`;
            }
        });

        // Paste functionality
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                qr.value = text;
                qr.focus();
            } catch (err) {
                console.error('Failed to read clipboard', err);
            }
        });

        await load();
        return layout;
    }
};
