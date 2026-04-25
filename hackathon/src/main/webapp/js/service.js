async function request(url, options = {}) {
    const res = await fetch(url, {headers: {'Content-Type': 'application/json'}, ...options});
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

export default {
    guests: () => request('api/guests'),
    offers: () => request('api/offers'),
    wallet: guestId => request(`api/wallet?guestId=${guestId}`),
    book: (guestId, offerId) => request('api/wallet', {method: 'POST', body: JSON.stringify({guestId, offerId})}),
    dashboard: () => request('api/partner'),
    validate: qrCode => request(`api/partner/validate?qrCode=${encodeURIComponent(qrCode)}`),
    redeem: qrCode => request('api/partner', {method: 'POST', body: JSON.stringify({qrCode})})
};
