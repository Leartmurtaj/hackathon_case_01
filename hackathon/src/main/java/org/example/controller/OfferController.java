package org.example.controller;

import org.example.service.WalletService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/api/offers")
public class OfferController extends JsonServlet {
    private final WalletService service = new WalletService();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        json(resp, service.listOffers());
    }
}
