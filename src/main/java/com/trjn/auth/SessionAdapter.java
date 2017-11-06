package com.trjn.auth;

import java.util.Optional;

import org.hibernate.SessionFactory;

import com.google.inject.Inject;
import com.trjn.mysql.MysqlDBAdapter;

import lombok.NonNull;

public class SessionAdapter extends MysqlDBAdapter<Session> {
    @Inject
    public SessionAdapter(@NonNull final SessionFactory factory) {
        super(factory);
    }

    public Session generateSession(
        @NonNull final String accessToken,
        @NonNull final Integer userId) {
        return getSessionByAccessTokenAndUserId(accessToken, userId)
            .orElseGet(() -> createSession(accessToken, userId));
    }

    public Optional<Session> getSessionByAccessToken(@NonNull final String accessToken) {
        return optionalSingleResultQuery(getFactory().openSession()
            .createQuery("from Session where access_token=:token")
            .setParameter("token", accessToken));
    }

    private Optional<Session> getSessionByAccessTokenAndUserId(
        @NonNull final String accessToken,
        @NonNull final Integer userId) {
        return optionalSingleResultQuery(getFactory().openSession()
            .createQuery("from Session where access_token=:token and user_id=:user")
            .setParameter("token", accessToken)
            .setParameter("user", userId));
    }

    private Session createSession(
        @NonNull final String accessToken,
        @NonNull final Integer userId) {
        Session session = Session.builder()
            .accessToken(accessToken)
            .userId(userId)
            .build();

        this.delete(session);
        return this.save(session);
    }
}
