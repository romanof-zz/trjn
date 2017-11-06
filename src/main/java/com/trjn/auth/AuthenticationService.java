package com.trjn.auth;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.google.inject.Inject;
import com.trjn.instagram.InstagramAccessTokenSuccessResponse;
import com.trjn.user.User;
import com.trjn.user.UserAdapter;

import jersey.repackaged.com.google.common.collect.ImmutableMap;
import lombok.AllArgsConstructor;
import lombok.NonNull;

@Path("authentication")
@Produces(APPLICATION_JSON)
@AllArgsConstructor(onConstructor=@_({@Inject}))
public class AuthenticationService {
    @NonNull final private OpenIdProvider openIdProvider;
    @NonNull final private SessionAdapter sessionAdapter;
    @NonNull final private UserAdapter userAdapter;

    @GET
    @Path("request-uri")
    public Response requestUrl(@Context HttpServletRequest request) {
        String csrfToken = UUID.randomUUID().toString();
        HttpSession session = request.getSession();
        session.setAttribute("csrfToken", csrfToken);

        return Response.ok(
            ImmutableMap.of("url", openIdProvider.getRequestUrl(csrfToken)))
            .build();
    }

    @GET
    public Response create(
        @NonNull @Context final  HttpServletRequest request,
        @NonNull @DefaultValue("") @QueryParam("code") final String code,
        @NonNull @DefaultValue("") @QueryParam("state") final String state) {
        try {
            if (state.equals(request.getSession().getAttribute("csrfToken"))) {
                InstagramAccessTokenSuccessResponse response = openIdProvider.getAccessToken(code);
                Optional<User> maybeUser = userAdapter.getUserByInstagramId(response.getUser().getId());

                // check if user doesn't exist
                if (!maybeUser.isPresent()) {
                    maybeUser = Optional.of(userAdapter.save(User.builder()
                        .instagramId(response.getUser().getId())
                        .profilePicture(response.getUser().getProfile_picture())
                        .fullName(response.getUser().getFull_name())
                        .nickname(response.getUser().getUsername())
                        .website(response.getUser().getWebsite())
                        .build()));
                }

                return Response.ok(sessionAdapter.generateSession(
                    response.getAccess_token(),
                    maybeUser.get().getUserId()))
                    .build();
            }
            throw new RuntimeException("invalid csrfToken");
        } catch (RuntimeException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("{}").build();
        }
    }
}