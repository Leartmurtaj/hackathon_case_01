package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.*;

import java.io.IOException;

public abstract class JsonServlet extends HttpServlet {
    protected final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    protected void json(HttpServletResponse resp, Object body) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        mapper.writeValue(resp.getWriter(), body);
    }

    protected void error(HttpServletResponse resp, int status, String message) throws IOException {
        resp.setStatus(status);
        json(resp, java.util.Map.of("message", message));
    }
}
