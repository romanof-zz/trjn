package com.trjn.instagram;

import java.io.IOException;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trjn.auth.OpenIdProvider;

import lombok.AllArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
public class InstagramOpenIdProvider implements OpenIdProvider {
    private static final String BASE_URL = "https://api.instagram.com/oauth/";
    private static final String AUTH_URI = "authorize/";
    private static final String ACCESS_TOKEN_URI = "access_token/";
    private static final String DEFAULT_GRANT_TYPE = "authorization_code";

    @NonNull private final InstagramOpenIdConfig config;
    @NonNull private final Client httpClient;

    @Override
    public String getRequestUrl(@NonNull final String csrfToken) {
        return BASE_URL + AUTH_URI +
            String.format("?client_id=%s&redirect_uri=%s&response_type=%s&scope=%s&state=%s",
                config.clientId(),
                config.redirectUri(),
                config.responseType(),
                config.scope(),
                csrfToken);
    }

    @Override
    public InstagramAccessTokenSuccessResponse getAccessToken(@NonNull final String code) {
        Form request = new Form();
        request.param("client_id", config.clientId());
        request.param("client_secret", config.secret());
        request.param("grant_type", DEFAULT_GRANT_TYPE);
        request.param("redirect_uri", config.redirectUri());
        request.param("code", code);

        try {
            Response response = httpClient.target(BASE_URL + ACCESS_TOKEN_URI)
                .request(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
                .post(Entity.entity( request, MediaType.APPLICATION_FORM_URLENCODED_TYPE));

            if (response.getStatus() == 200) {
                return new ObjectMapper().readValue(
                    response.readEntity(String.class),
                    InstagramAccessTokenSuccessResponse.class);
            }

            throw new RuntimeException();
        } catch (RuntimeException|IOException e) {
            throw new InstagramException("failed to get access token.");
        }
    }
}
