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
        let sortAsc = false;
        let currentCriteria = 'popularity';

        const money = value => `CHF ${Number(value).toFixed(2)}`;
        const badge = status => `<span class="badge ${status}">${status}</span>`;

        const alert = (type, message, duration = 2600) => {
            alerts.innerHTML = `<div class="alert alert-${type} mb-3">${message}</div>`;
            setTimeout(() => { alerts.innerHTML = ''; }, duration);
        };

        // Standardized rendering for Marketplace Offers
        function renderOffers(items) {
            const bookedOfferIds = new Set(items.map(item => item.offer.id));

            // 1. Prepare stable data (Using ID-based math so popularity stays consistent)
            const offerStats = offers.map(offer => ({
                ...offer,
                popularity: (offer.id * 17) % 100 // Stable "Fake" popularity
            }));

            // 2. Sorting Logic
            const sortedOffers = [...offerStats].sort((a, b) => {
                let valA, valB;
                switch (currentCriteria) {
                    case 'price': valA = a.discountedPrice; valB = b.discountedPrice; break;
                    case 'spots': valA = a.stock; valB = b.stock; break;
                    case 'type': valA = a.category; valB = b.category; break;
                    case 'popularity':
                    default: valA = a.popularity; valB = b.popularity; break;
                }

                if (typeof valA === 'string') {
                    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
                }
                return sortAsc ? valA - valB : valB - valA;
            });

            // 3. Render the Cards
            offersEl.innerHTML = sortedOffers.map(offer => {
                const alreadyBooked = bookedOfferIds.has(offer.id);
                const buttonClass = alreadyBooked ? 'btn-outline-secondary' : 'btn-primary';
                const buttonText = alreadyBooked ? 'Booked' : 'Book Now';
                const disabled = alreadyBooked ? 'disabled' : '';

                return `
                    <article class="card">
                        <span class="meta">${offer.category}</span>
                        <h3 class="mt-2">${offer.title}</h3>
                        <p class="meta">${offer.partner}</p>
                        <p>${offer.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                <span class="fw-bold">${money(offer.discountedPrice)}</span>
                                <span class="meta text-decoration-line-through">${money(offer.price)}</span>
                            </div>
                            <button class="btn btn-sm ${buttonClass} book-btn" 
                                    data-id="${offer.id}" ${disabled}>${buttonText}</button>
                        </div>
                        <div class="mt-3 pt-2 border-top d-flex justify-content-between meta small">
                            <span>🔥 Popularity: ${offer.popularity}</span>
                            <span>📦 Spots: ${offer.stock}</span>
                        </div>
                    </article>`;
            }).join('');

            // 4. Re-attach "Book Now" event listeners
            offersEl.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    try {
                        await service.book(guestSel.value, btn.dataset.id);
                        alert('success', 'Offer booked successfully!', 10000);
                        await loadWallet(); // Refresh both lists
                    } catch (e) {
                        alert('danger', e.message);
                    }
                });
            });
        }

        //this code is responsible for sorting the Objects
        async function loadWallet() {
            const guest = guests.find(g => g.id == guestSel.value);
            if (!guest) return;

            // Update Guest UI Header
            guestName.textContent = guest.name;
            guestCard.textContent = `JG-${guest.origin.substring(0, 2).toUpperCase()}-${guest.id}`;

            const items = await service.wallet(guestSel.value);
            benefitCount.textContent = items.length;

            // Render Top Wallet Section (Already booked items)
            walletEl.innerHTML = items.length
                ? items.map(item => `
                    <article class="card">
                        <div class="d-flex justify-content-between gap-2 align-items-start">
                            ${badge(item.benefit.status)}
                            <span class="meta">${item.offer.category}</span>
                        </div>
                        <h2 class="mt-3">${item.offer.title}</h2>
                        <p class="meta">${item.offer.partner}</p>
                        
                        <div class="qr-image-box my-3">
                            <img src="${item.benefit.qrCode}" alt="QR Code" style="width: 140px; height: 140px; display: block;">
                        </div>

                        <div class="qr-token-box mb-3">
                            <div class="fw-bold text-brand font-monospace">${item.benefit.qrToken}</div>
                            <button class="btn btn-sm btn-light copy-btn" data-code="${item.benefit.qrToken}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
            
                        <p class="meta mb-0 small">Show this QR or token to the partner for redemption.</p>
                    </article>`).join('')
                : '<article class="card"><h2>No wallet passes yet</h2><p class="meta mb-0">Book an offer below to see it here.</p></article>';


            // Handle Marketplace (Sorting logic triggered here)
            renderOffers(items);

            // Clipboard logic for top wallet cards
            layout.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    await navigator.clipboard.writeText(btn.dataset.code);
                    const original = btn.innerHTML;
                    btn.innerHTML = '<small>Saved!</small>';
                    setTimeout(() => btn.innerHTML = original, 1200);
                });
            });
        }

        // Initial Setup
        guests = await service.guests();
        offers = await service.offers();

        guests.forEach(guest => {
            guestSel.insertAdjacentHTML('beforeend', `<option value="${guest.id}">${guest.name} | ${guest.origin}</option>`);
        });

        // Sorting Listeners
        layout.querySelector('#sortCriteria').addEventListener('change', (e) => {
            currentCriteria = e.target.value;
            loadWallet();
        });

        layout.querySelector('#sortOrder').addEventListener('click', () => {
            sortAsc = !sortAsc;
            layout.querySelector('#sortDirIcon').textContent = sortAsc ? '↑' : '↓';
            loadWallet();
        });

        guestSel.addEventListener('change', loadWallet);
        await loadWallet();
        return layout;
    }
};