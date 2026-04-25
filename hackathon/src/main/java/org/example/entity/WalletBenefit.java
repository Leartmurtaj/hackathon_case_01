package org.example.entity;

import org.example.enums.BenefitStatus;

import java.time.LocalDateTime;

public class WalletBenefit {
    private long id;
    private long guestId;
    private long offerId;
    private BenefitStatus status;
    private String qrToken;
    private String qrCode;
    private LocalDateTime bookedAt;
    private LocalDateTime redeemedAt;

    public WalletBenefit() {
    }

    public WalletBenefit(long id, long guestId, long offerId, BenefitStatus status, String qrToken, String qrCode, LocalDateTime bookedAt) {
        this.id = id;
        this.guestId = guestId;
        this.offerId = offerId;
        this.status = status;
        this.qrToken = qrToken;
        this.qrCode = qrCode;
        this.bookedAt = bookedAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getGuestId() {
        return guestId;
    }

    public void setGuestId(long guestId) {
        this.guestId = guestId;
    }

    public long getOfferId() {
        return offerId;
    }

    public void setOfferId(long offerId) {
        this.offerId = offerId;
    }

    public BenefitStatus getStatus() {
        return status;
    }

    public void setStatus(BenefitStatus status) {
        this.status = status;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public String getQrToken() {
        return qrToken;
    }

    public void setQrToken(String qrToken) {
        this.qrToken = qrToken;
    }

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }

    public LocalDateTime getRedeemedAt() {
        return redeemedAt;
    }

    public void setRedeemedAt(LocalDateTime redeemedAt) {
        this.redeemedAt = redeemedAt;
    }
}
