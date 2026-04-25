package org.example.repository;

import org.example.entity.*;
import org.example.enums.BenefitStatus;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public final class InMemoryDatabase {
    public static final Map<Long, Offer> OFFERS = new LinkedHashMap<>();
    public static final Map<Long, Guest> GUESTS = new LinkedHashMap<>();
    public static final Map<Long, WalletBenefit> BENEFITS = new LinkedHashMap<>();
    public static final AtomicLong BENEFIT_ID = new AtomicLong(100);

    static {
        GUESTS.put(1L,new Guest(1,"Demo Guest","Switzerland",3,2));
        OFFERS.put(1L,new Offer(1,"First Cliff Walk","Activity","Grindelwald First","One-time discounted mountain activity with guest-card entitlement.",64,49,20));
        OFFERS.put(2L,new Offer(2,"Jungfrau Railway Upgrade","Railway","Jungfraubahnen","Wallet-based benefit validation before checkout.",95,79,12));
        OFFERS.put(3L,new Offer(3,"Local Museum Pass","Culture","Interlaken Museum","Multi-use benefit for overnight guests.",18,0,100));
        OFFERS.put(4L,new Offer(4,"Sustainable Mobility Token","Reward","Destination Office","Earn or spend a token for low-impact travel behaviour.",10,0,50));
        BENEFITS.put(1L,new WalletBenefit(1,1,3,BenefitStatus.AVAILABLE,"JGW-DEMO-01", LocalDateTime.now().minusDays(1)));
    }

    private InMemoryDatabase(){}
}
