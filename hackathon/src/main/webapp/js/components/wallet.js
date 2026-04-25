import util from '../util.js';
import service from '../service.js';

export default {
    title: 'Guest Wallet', async render() {
        const layout = await util.loadTemplate('layout.html');
        const page = layout.querySelector('#page');
        page.replaceChildren(await util.loadTemplate('wallet.html'));
        util.activateNav(layout);
        const guestSel = layout.querySelector('#guest'), offersEl = layout.querySelector('#offers'),
            walletEl = layout.querySelector('#wallet'), alerts = layout.querySelector('#alerts');
        const guestName = layout.querySelector('#guestName'), guestCard = layout.querySelector('#guestCard'),
            benefitCount = layout.querySelector('#benefitCount');
        let guests = [];
        const money = v => `CHF ${Number(v).toFixed(2)}`;
        const badge = s => `<span class="badge ${s}">${s}</span>`;
        const alert = (type, msg) => {
            alerts.innerHTML = `<div class="alert alert-${type} mb-3">${msg}</div>`;
            setTimeout(() => alerts.innerHTML = '', 2600);
        };

        async function loadWallet() {
            const guest = guests.find(g => String(g.id) === String(guestSel.value));
            guestName.textContent = guest ? guest.name : 'Guest';
            guestCard.textContent = guest ? `JG-${String(guest.id).padStart(4, '0')}` : 'JG-DEMO';
            const items = await service.wallet(guestSel.value);
            benefitCount.textContent = items.length;
            walletEl.innerHTML = items.length ? items.map(i => `<article class="card"><div class="d-flex justify-content-between gap-2 align-items-start">${badge(i.benefit.status)}<span class="meta">${i.offer.category}</span></div><h2 class="mt-3">${i.offer.title}</h2><p class="meta">${i.offer.partner}</p><p>${i.offer.description}</p><p><strong>${Math.round((1 - i.offer.discountedPrice / i.offer.price) * 100) || 100}% benefit</strong> · ${money(i.offer.discountedPrice)} <span class="meta text-decoration-line-through">${money(i.offer.price)}</span></p><div class="qr">${i.benefit.qrCode}</div><p class="meta mb-0">Show this QR token to the partner for one-time redemption.</p></article>`).join('') : '<article class="card"><h2>No wallet passes yet</h2><p class="meta mb-0">Book an eligible marketplace offer to create a reserved QR pass.</p></article>';
        }

        guests = await service.guests();
        guests.forEach(g => guestSel.insertAdjacentHTML('beforeend', `<option value="${g.id}">${g.name} · ${g.origin} · ${g.nights} nights</option>`));
        const offers = await service.offers();
        offersEl.innerHTML = offers.map(o => `<article class="card"><span class="badge AVAILABLE">${o.category}</span><h3 class="mt-3">${o.title}</h3><p class="meta">${o.partner}</p><p>${o.description}</p><p><strong>${money(o.discountedPrice)}</strong> <span class="meta text-decoration-line-through">${money(o.price)}</span></p><p class="meta">Stock: ${o.stock} · ${o.oneTime ? 'One-time' : 'Multi-use'}</p><button class="btn btn-primary book" data-id="${o.id}">Reserve benefit & generate QR token</button></article>`).join('');
        layout.querySelectorAll('.book').forEach(b => b.addEventListener('click', async () => {
            try {
                await service.book(Number(guestSel.value), Number(b.dataset.id));
                alert('success', 'Benefit reserved and QR token generated.');
                await loadWallet();
            } catch (e) {
                alert('danger', e.message);
            }
        }));
        guestSel.addEventListener('change', loadWallet);
        await loadWallet();
        return layout;
    }
};
