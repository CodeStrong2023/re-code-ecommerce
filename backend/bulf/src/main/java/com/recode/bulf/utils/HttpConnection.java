package com.recode.bulf.utils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class HttpConnection {
    private HttpConnection() {
    }

    private static final HttpClient client = HttpClient
            .newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    public static Optional<HttpResponse<String>> get(String uri, Map<String, List<String>> headers) {
        HttpRequest request = buildRequest(uri, headers, "GET", null);
        return sendRequest(request);
    }

    public static Optional<HttpResponse<String>> post(String uri, Map<String, List<String>> headers, String body) {
        HttpRequest request = buildRequest(uri, headers, "POST", body);
        return sendRequest(request);
    }

    public static Optional<HttpResponse<String>> put(String uri, Map<String, List<String>> headers, String body) {
        HttpRequest request = buildRequest(uri, headers, "PUT", body);
        return sendRequest(request);
    }

    private static HttpRequest buildRequest(String uri, Map<String, List<String>> headers, String method, String body) {
        HttpRequest.Builder requestBuilder = HttpRequest
                .newBuilder()
                .uri(URI.create(uri))
                .timeout(Duration.ofSeconds(10));
        headers.forEach((key, values) -> values.forEach(value -> requestBuilder.header(key, value)));
        switch (method.toUpperCase()) {
            case "POST" -> requestBuilder.POST(HttpRequest.BodyPublishers.ofString(body != null ? body : ""));
            case "PUT" -> requestBuilder.PUT(HttpRequest.BodyPublishers.ofString(body != null ? body : ""));
            case "DELETE" -> requestBuilder.DELETE();
            default -> requestBuilder.GET();
        }
        return requestBuilder.build();
    }

    private static Optional<HttpResponse<String>> sendRequest(HttpRequest request) {
        try {
            return Optional.of(client.send(request, HttpResponse.BodyHandlers.ofString()));
        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }
    }
}
