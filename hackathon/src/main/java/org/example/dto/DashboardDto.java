package org.example.dto;

public class DashboardDto {
    public int bookings;
    public int redeemed;
    public int openRedemptions;
    public double partnerSavings;

    public DashboardDto() {
    }

    public DashboardDto(int bookings, int redeemed, int openRedemptions, double partnerSavings) {
        this.bookings = bookings;
        this.redeemed = redeemed;
        this.openRedemptions = openRedemptions;
        this.partnerSavings = partnerSavings;
    }

    public int getBookings() {
        return bookings;
    }

    public int getRedeemed() {
        return redeemed;
    }

    public int getOpenRedemptions() {
        return openRedemptions;
    }

    public double getPartnerSavings() {
        return partnerSavings;
    }
}

