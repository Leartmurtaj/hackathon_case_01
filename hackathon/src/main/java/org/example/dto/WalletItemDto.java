package org.example.dto;

import org.example.entity.Offer;
import org.example.entity.WalletBenefit;

public class WalletItemDto {
    private WalletBenefit benefit;
    private Offer offer;

    public WalletItemDto() {
    }

    public WalletItemDto(WalletBenefit benefit, Offer offer) {
        this.benefit = benefit;
        this.offer = offer;
    }

    public WalletBenefit getBenefit() {
        return benefit;
    }

    public void setBenefit(WalletBenefit benefit) {
        this.benefit = benefit;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }
}
