# Jungfrau Wallet – Digital Guest Benefit System

## Overview

This project is a prototype of a **digital guest wallet** for the Jungfrau Region.  
It allows guests to **book, store, and redeem local benefits** using a simple QR-based system.

The goal is to reduce friction in booking and redemption while providing a scalable digital layer for tourism partners.

---

## Key Features

### Guest Wallet
- Browse bookable marketplace offers
- Reserve benefits with one click
- Automatically generate a **QR code + token**
- View all reserved benefits in one place

### Reserved Benefits (Start Page)
- Overview of all booked benefits
- Each benefit includes:
  - QR code for redemption
  - Copyable token (backup validation)
- Clean, mobile-friendly card UI

### Partner View
- Validate QR tokens manually
- Simulates real-world redemption flow
- One-time usage logic (ready to extend)

---

## Tech Stack

### Backend
- Java (Servlet-based)
- Maven (WAR packaging)
- In-memory database (for demo)
- ZXing (QR Code generation)

### Frontend
- Vanilla JavaScript (SPA-style routing)
- HTML templates
- CSS (custom styling)

---

## QR Code Logic

Each reservation generates:

- `qrToken` → human-readable code (e.g. `JGW-D79435FC`)
- `qrCode` → Base64 PNG image for display

---

## Known Limitations

- No real payment integration (simulated)
- No persistent database (in-memory only)
- QR validation is manual
- No authentication system

---

## Future Improvements

- Payment integration (Stripe / Twint)
- QR scanning via camera
- Expiration & validation logic
- Partner dashboard
- Real database (PostgreSQL)

---

## Authors

Hackathon Team Code404: Murtaj Leart, Länzlinger Yanis, Semelet Arnaud
