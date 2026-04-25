package org.example.controller;

import org.example.dto.*;
import org.example.service.WalletService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/api/wallet/*")
public class WalletController extends JsonServlet {
    private final WalletService service = new WalletService();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            long guestId = Long.parseLong(req.getParameter("guestId"));
            json(resp, service.wallet(guestId));
        } catch (Exception e) {
            error(resp, 400, e.getMessage());
        }
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            BookingRequestDto dto = mapper.readValue(req.getInputStream(), BookingRequestDto.class);
            resp.setStatus(201);
            json(resp, service.book(dto.getGuestId(), dto.getOfferId()));
        } catch (Exception e) {
            error(resp, 400, e.getMessage());
        }
    }
}
