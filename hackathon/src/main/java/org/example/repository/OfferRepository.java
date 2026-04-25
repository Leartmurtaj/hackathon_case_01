package org.example.repository;

import org.example.entity.Offer;
import java.util.*;

public class OfferRepository {
    public List<Offer> findAll() {
        return new ArrayList<>(InMemoryDatabase.OFFERS.values());
    }

    public Optional<Offer> findById(long id) {
        return Optional.ofNullable(InMemoryDatabase.OFFERS.get(id));
    }

    public Offer save(Offer offer) {
        InMemoryDatabase.OFFERS.put(offer.getId(), offer);
        return offer;
    }
}
