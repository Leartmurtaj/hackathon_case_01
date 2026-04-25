import util from '../util.js';
import service from '../service.js';

export default {
    title: 'Reserved Benefits', async render() {
        const layout = await util.loadTemplate('layout.html');
        const page = layout.querySelector('#page');
        page.replaceChildren(await util.loadTemplate('reserved.html'));
        util.activateNav(layout);

        const guestSel = layout.querySelector('#guest');
        const listEl = layout.querySelector('#reservedBenefits');
        const benefitCount = layout.querySelector('#benefitCount');

        const money = value => `CHF ${Number(value).toFixed(2)}`;
        const badge = status => `<span class="badge ${status}">${status}</span>`;
        const percent = offer => Math.round((1 - offer.discountedPrice / offer.price) * 100) || 100;

        function benefitCard(item) {
            return `<article class="card">
                <div class="d-flex justify-content-between gap-2 align-items-start">
                    ${badge(item.benefit.status)}
                    <span class="meta">${item.offer.category}</span>
                </div>
                <h2 class="mt-3">${item.offer.title}</h2>
                <p class="meta">${item.offer.partner}</p>
                <p>${item.offer.description}</p>
                <p><strong>${percent(item.offer)}% benefit</strong> | ${money(item.offer.discountedPrice)} <span class="meta text-decoration-line-through">${money(item.offer.price)}</span></p>
                <div class="qr-container">
                <div class="qr-image-box">
                    <img src="${item.benefit.qrCode}" width="220" height="220" alt="QR Code">
                </div>

                <div class="qr-token-box">
                    <strong>${item.benefit.qrToken}</strong>

                    <button class="icon-btn copy-btn" title="Copy code" data-code="${item.benefit.qrToken}">
                        <svg viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                    </button>
                </div>
                </div>
                <p class="meta mb-0">Show this QR token to the partner for one-time redemption.</p>
            </article>`;
        }

        async function loadReservedBenefits() {
            const items = await service.wallet(guestSel.value);
            benefitCount.textContent = items.length;
            listEl.innerHTML = items.length
                ? items.map(benefitCard).join('')
                : '<article class="card"><h2>No reserved benefits yet</h2><p class="meta mb-3">Reserve an eligible marketplace offer first.</p><a class="btn btn-primary" href="#/wallet">Go to marketplace</a></article>';
            listEl.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    await navigator.clipboard.writeText(btn.dataset.code);
                    const originalSvg = btn.innerHTML;
                    btn.innerHTML = '<span>Saved!</span>';
                    setTimeout(() => btn.innerHTML = originalSvg, 1500);
                });
            });
        }

        const guests = await service.guests();
        guests.forEach(guest => {
            guestSel.insertAdjacentHTML('beforeend', `<option value="${guest.id}">${guest.name} | ${guest.origin} | ${guest.nights} nights</option>`);
        });

        guestSel.addEventListener('change', loadReservedBenefits);
        await loadReservedBenefits();
        return layout;
    }
};
