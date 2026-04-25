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
        OFFERS.put(5L,new Offer(5,"Tandem Paragliding on Harder Kulm","Activity","Paragliding School Interlaken","One-time discounted mountain activity with guest-card entitlement.",99,59,25));
        OFFERS.put(6L,new Offer(6,"Etherlaken Innovation Park","Activity","START GLOBAL","One-time discounted discovery activity with guest-card entitlement.",18,10,260));
        //AI generated Offers
        OFFERS.put(7L, new Offer(7, "Schynige Platte Cogwheel Rail", "Railway", "Jungfraubahnen", "Historic open-carriage train ride to the Alpine Garden with views of Eiger, Mönch, and Jungfrau.", 64.00, 42.00, 45));
        OFFERS.put(8L, new Offer(8, "Harder Kulm Sunset Dinner", "Dining", "Harder Panorama", "Funicular ride and a 3-course Swiss dinner at the 'Top of Interlaken' viewpoint.", 58.00, 45.00, 15));
        OFFERS.put(9L, new Offer(9, "St. Beatus Caves Entry", "Sightseeing", "Beatus Caves", "Explore the deep stalactite caves and the museum above Lake Thun.", 19.00, 14.00, 100));
        OFFERS.put(10L, new Offer(10, "Lauterbrunnen E-Bike Rental", "Activity", "Valley Wheels", "Full-day rental to explore the Valley of 72 Waterfalls at your own pace.", 85.00, 60.00, 12));
        OFFERS.put(11L, new Offer(11, "Lake Brienz Kayak Tour", "Activity", "Hightide Kayak School", "Guided morning tour on the turquoise waters of Lake Brienz.", 75.00, 55.00, 8));
        OFFERS.put(12L, new Offer(12, "Mürren Village History Walk", "Culture", "Mürren Tourism", "A guided tour through the car-free village, explaining its evolution from farming to tourism.", 15.00, 0.00, 40));
        OFFERS.put(13L, new Offer(13, "Alpine Cheese Tasting", "Food", "Wengen Dairy", "Visit a mountain farm in Wengen to see traditional cheesemaking and taste local varieties.", 25.00, 18.00, 20));
    }

    private InMemoryDatabase(){}
}
