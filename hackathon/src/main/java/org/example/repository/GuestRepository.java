package org.example.repository;

import org.example.entity.Guest;
import java.util.*;

public class GuestRepository {
    public List<Guest> findAll() {
        return new ArrayList<>(InMemoryDatabase.GUESTS.values());
    }

    public Optional<Guest> findById(long id) {
        return Optional.ofNullable(InMemoryDatabase.GUESTS.get(id));
    }

    public Guest save(Guest guest) {
        InMemoryDatabase.GUESTS.put(guest.getId(), guest);
        return guest;}
}
