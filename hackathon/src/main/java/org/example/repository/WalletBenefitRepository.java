package org.example.repository;

import org.example.entity.WalletBenefit;

import java.util.*;
import java.util.stream.*;

public class WalletBenefitRepository {
    public List<WalletBenefit> findAll() {
        return new ArrayList<>(InMemoryDatabase.BENEFITS.values());
    }

    public List<WalletBenefit> findByGuestId(long guestId) {
        return InMemoryDatabase.BENEFITS.values().stream().filter(b -> b.getGuestId() == guestId).collect(Collectors.toList());
    }

    public Optional<WalletBenefit> findByQrCode(String qr) {
        return InMemoryDatabase.BENEFITS.values().stream().filter(b -> b.getQrCode().equalsIgnoreCase(qr)).findFirst();
    }

    public WalletBenefit save(WalletBenefit benefit) {
        InMemoryDatabase.BENEFITS.put(benefit.getId(), benefit);
        return benefit;
    }

    public long nextId() {
        return InMemoryDatabase.BENEFIT_ID.incrementAndGet();
    }
}
