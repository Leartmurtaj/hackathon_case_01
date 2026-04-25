import util from '../util.js';
import service from '../service.js';

export default {
    title: 'Partner', async render() {
        const layout = await util.loadTemplate('layout.html');
        const page = layout.querySelector('#page');
        page.replaceChildren(await util.loadTemplate('partner.html'));
        util.activateNav(layout);
        const metrics = layout.querySelector('#metrics'), result = layout.querySelector('#result'),
            qr = layout.querySelector('#qr');
        const badge = s => `<span class="badge ${s}">${s}</span>`;

        async function load() {
            const d = await service.dashboard();
            metrics.innerHTML = `<p><strong>${d.bookings}</strong> bookings</p><p><strong>${d.openRedemptions}</strong> open redemptions</p><p><strong>${d.redeemed}</strong> redeemed</p><p><strong>CHF ${d.partnerSavings.toFixed(2)}</strong> modeled value</p>`;
        }

        function renderItem(i, action) {
            result.innerHTML = `<article class="card mt-3">${badge(i.benefit.status)}<h2 class="mt-3">${i.offer.title}</h2><p>Partner: <strong>${i.offer.partner}</strong></p><p>Token: <strong>${i.benefit.qrCode}</strong></p><p class="meta mb-0">${action}</p></article>`;
        }

        layout.querySelector('#validate').addEventListener('click', async () => {
            try {
                const i = await service.validate(qr.value.trim());
                renderItem(i, i.benefit.status === 'REDEEMED' ? 'This benefit has already been redeemed.' : 'Token is valid and ready for redemption.');
            } catch (e) {
                result.innerHTML = `<div class="alert alert-danger">${e.message}</div>`;
            }
        });
        layout.querySelector('#redeem').addEventListener('click', async () => {
            try {
                const i = await service.redeem(qr.value.trim());
                renderItem(i, 'Redemption confirmed once.');
                await load();
            } catch (e) {
                result.innerHTML = `<div class="alert alert-danger">${e.message}</div>`;
            }
        });
        await load();
        return layout;
    }
};
