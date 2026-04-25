package org.example.controller;

import org.example.dto.RedeemRequestDto;
import org.example.service.WalletService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/api/partner/*")
public class PartnerController extends JsonServlet {
    private final WalletService service = new WalletService();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            if (req.getPathInfo() != null && req.getPathInfo().contains("validate"))
                json(resp, service.validate(req.getParameter("qrCode")));
            else json(resp, service.dashboard());
        } catch (Exception e) {
            error(resp, 400, e.getMessage());
        }
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            RedeemRequestDto dto = mapper.readValue(req.getInputStream(), RedeemRequestDto.class);
            json(resp, service.redeem(dto.getQrCode()));
        } catch (Exception e) {
            error(resp, 400, e.getMessage());
        }
    }
}
