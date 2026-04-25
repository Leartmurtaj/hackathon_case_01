package org.example.entity;

public class Guest {
    private long id;
    private String name;
    private String origin;
    private int nights;
    private int sustainabilityTokens;

    public Guest() {
    }

    public Guest(long id, String name, String origin, int nights, int sustainabilityTokens) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.nights = nights;
        this.sustainabilityTokens = sustainabilityTokens;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public int getNights() {
        return nights;
    }

    public void setNights(int nights) {
        this.nights = nights;
    }

    public int getSustainabilityTokens() {
        return sustainabilityTokens;
    }

    public void setSustainabilityTokens(int sustainabilityTokens) {
        this.sustainabilityTokens = sustainabilityTokens;
    }
}
