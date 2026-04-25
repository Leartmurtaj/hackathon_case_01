package org.example.entity;

public class Offer {
    private long id;
    private String title;
    private String category;
    private String partner;
    private String description;
    private double price;
    private double discountedPrice;
    private int stock;

    public Offer() {
    }

    public Offer(long id, String title, String category, String partner, String description, double price, double discountedPrice, int stock) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.partner = partner;
        this.description = description;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.stock = stock;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
