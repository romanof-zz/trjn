package com.trjn.auth;

import java.io.IOException;

import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.google.inject.Inject;
import com.sun.jersey.core.util.Priority;

import lombok.AllArgsConstructor;

@Authenticated
@Provider
@AllArgsConstructor(onConstructor=@_({@Inject}))
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {
    private static final String ACCESS_TOKEN_HEADER = "access_token";

    private final SessionAdapter sessionAdapter;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // Get the HTTP Authorization header from the request
        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Check if the HTTP Authorization header is present and formatted correctly
        if (authorizationHeader == null || !authorizationHeader.startsWith(ACCESS_TOKEN_HEADER)) {
            throw new NotAuthorizedException("Authorization header must be provided");
        }

        if (!isValidToken(authorizationHeader.substring(ACCESS_TOKEN_HEADER.length()).trim())) {
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

    private boolean isValidToken(String accessToken) {
        return sessionAdapter.getSessionByAccessToken(accessToken).isPresent();
    }
}