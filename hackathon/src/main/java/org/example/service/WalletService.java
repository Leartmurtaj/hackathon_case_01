package org.example.service;

import org.example.dto.*;
import org.example.entity.*;
import org.example.enums.BenefitStatus;
import org.example.repository.*;

import java.time.LocalDateTime;
import java.util.*;

public class WalletService {
    private final OfferRepository offers = new OfferRepository();
    private final GuestRepository guests = new GuestRepository();
    private final WalletBenefitRepository benefits = new WalletBenefitRepository();

    public List<Offer> listOffers() {
        return offers.findAll();
    }

    public List<Guest> listGuests() {
        return guests.findAll();
    }

    public List<WalletItemDto> wallet(long guestId) {
        List<WalletItemDto> result = new ArrayList<>();
        for (WalletBenefit b : benefits.findByGuestId(guestId))
            offers.findById(b.getOfferId()).ifPresent(o -> result.add(new WalletItemDto(b, o)));
        return result;
    }

    public WalletItemDto validate(String qrCode) {
        WalletBenefit b = benefits.findByQrCode(qrCode).orElseThrow(() -> new IllegalArgumentException("Invalid QR token"));
        return new WalletItemDto(b, offers.findById(b.getOfferId()).orElseThrow());
    }

    public WalletItemDto book(long guestId, long offerId) {
        Guest guest = guests.findById(guestId).orElseThrow();
        Offer offer = offers.findById(offerId).orElseThrow();
        if (guest.getNights() < 1) throw new IllegalStateException("Guest is not eligible");
        if (offer.getStock() < 1) throw new IllegalStateException("Offer is sold out");
        offer.setStock(offer.getStock() - 1);
        offers.save(offer);
        long id = benefits.nextId();
        String token = "JGW-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        WalletBenefit b = new WalletBenefit(id, guestId, offerId, BenefitStatus.RESERVED, token, LocalDateTime.now());
        benefits.save(b);
        return new WalletItemDto(b, offer);
    }

    public WalletItemDto redeem(String qrCode) {
        WalletBenefit b = benefits.findByQrCode(qrCode).orElseThrow(() -> new IllegalArgumentException("Invalid QR token"));
        if (b.getStatus() == BenefitStatus.REDEEMED) throw new IllegalStateException("Benefit already redeemed");
        b.setStatus(BenefitStatus.REDEEMED);
        b.setRedeemedAt(LocalDateTime.now());
        benefits.save(b);
        return new WalletItemDto(b, offers.findById(b.getOfferId()).orElseThrow());
    }

    public DashboardDto dashboard() {
        int bookings = benefits.findAll().size();
        int redeemed = (int) benefits.findAll().stream().filter(b -> b.getStatus() == BenefitStatus.REDEEMED).count();
        double savings = benefits.findAll().stream().mapToDouble(b -> offers.findById(b.getOfferId()).map(o -> Math.max(0, o.getPrice() - o.getDiscountedPrice())).orElse(0.0)).sum();
        return new DashboardDto(bookings, redeemed, bookings - redeemed, savings);
    }
}
