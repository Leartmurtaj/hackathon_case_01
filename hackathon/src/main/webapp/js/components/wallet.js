import util from '../util.js';
import service from '../service.js';

export default {
    title: 'Marketplace', async render() {
        const layout = await util.loadTemplate('layout.html');
        const page = layout.querySelector('#page');
        page.replaceChildren(await util.loadTemplate('wallet.html'));
        util.activateNav(layout);

        const guestSel = layout.querySelector('#guest');
        const offersEl = layout.querySelector('#offers');
        const alerts = layout.querySelector('#alerts');
        const guestName = layout.querySelector('#guestName');
        const guestCard = layout.querySelector('#guestCard');
        const benefitCount = layout.querySelector('#benefitCount');
        const walletEl = layout.querySelector('#wallet');

        let guests = [];
        let offers = [];

        const money = value => `CHF ${Number(value).toFixed(2)}`;
        const alert = (type, message, duration = 2600) => {
            alerts.innerHTML = `<div class="alert alert-${type} mb-3">${message}</div>`;
            setTimeout(() => {
                alerts.innerHTML = '';
            }, duration);
        };

        function renderOffers(items) {
            const bookedOfferIds = new Set(items.map(item => item.offer.id));
            offersEl.innerHTML = offers.map(offer => {
                const alreadyBooked = bookedOfferIds.has(offer.id);
                const buttonClass = alreadyBooked ? 'btn-outline-secondary' : 'btn-primary';
                const buttonLabel = alreadyBooked ? 'Already reserved' : 'Reserve benefit & generate QR token';
                return `<article class="card"><span class="badge AVAILABLE">${offer.category}</span><h3 class="mt-3">${offer.title}</h3><p class="meta">${offer.partner}</p><p>${offer.description}</p><p><strong>${money(offer.discountedPrice)}</strong> <span class="meta text-decoration-line-through">${money(offer.price)}</span></p><p class="meta">Stock: ${offer.stock}</p><button class="btn ${buttonClass} book" data-id="${offer.id}" ${alreadyBooked ? 'disabled' : ''}>${buttonLabel}</button></article>`;
            }).join('');

            layout.querySelectorAll('.book').forEach(button => button.addEventListener('click', async () => {
                try {
                    await service.book(Number(guestSel.value), Number(button.dataset.id));
                    alert('success', 'Benefit reserved. You can now view it on the Reserved Benefits page.', 10000);
                    offers = await service.offers();
                    await loadWallet();
                } catch (e) {
                    alert('danger', e.message);
                }
            }));
        }

        async function loadWallet() {
            const guest = guests.find(item => String(item.id) === String(guestSel.value));
            guestName.textContent = guest ? guest.name : 'Guest';
            guestCard.textContent = guest ? `JG-${String(guest.id).padStart(4, '0')}` : 'JG-DEMO';

            const items = await service.wallet(guestSel.value);
            benefitCount.textContent = items.length;
            const badge = status => `<span class="badge ${status}">${status}</span>`;
            walletEl.innerHTML = items.length
                ? items.map(item => `
                    <article class="card">
                        <div class="d-flex justify-content-between gap-2 align-items-start">
                            ${badge(item.benefit.status)}
                            <span class="meta">${item.offer.category}</span>
                        </div>

                        <h2 class="mt-3">${item.offer.title}</h2>
                        <p class="meta">${item.offer.partner}</p>
                        <p>${item.offer.description}</p>

                        <p>
                            <strong>
                                ${Math.round((1 - item.offer.discountedPrice / item.offer.price) * 100) || 100}% benefit
                            </strong>
                            |
                            ${money(item.offer.discountedPrice)}
                            <span class="meta text-decoration-line-through">
                                ${money(item.offer.price)}
                            </span>
                        </p>

                        <!--
                        the initial redeem code
                        <div class="qr">${item.benefit.qrCode}</div>
                        
                        the modified one with copy button ↓
                        -->

                        <div class="qr-container">
                            <div class="qr">${item.benefit.qrCode}</div>
                            <button class="icon-btn copy-btn" title="Copy code" data-code="${item.benefit.qrCode}">
                                <svg viewBox="0 0 24 24">
                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                </svg>
                            </button>
                        </div>

                        <p class="meta mb-0">
                            Show this QR token to the partner for one-time redemption.
                        </p>

                    </article>`
                        )
                        .join('')
                    : '<article class="card">' +
                        '<h2>No wallet passes yet</h2>' +
                        '<p class="meta mb-0">' +
                            'Book an eligible marketplace offer to create a reserved QR pass.' +
                        '</p></article>';

            renderOffers(items);

            //copy button click event logic
            layout.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    await navigator.clipboard.writeText(btn.dataset.code);
                    const originalSvg = btn.innerHTML;
                    btn.innerHTML = '<span>Saved!</span>'; // Visual feedback
                    setTimeout(() => btn.innerHTML = originalSvg, 1500);
                });
            });
        }

        guests = await service.guests();
        guests.forEach(guest => {
            guestSel.insertAdjacentHTML('beforeend', `<option value="${guest.id}">${guest.name} | ${guest.origin} | ${guest.nights} nights</option>`);
        });
        offers = await service.offers();

        guestSel.addEventListener('change', loadWallet);
        await loadWallet();
        return layout;
    }
};
