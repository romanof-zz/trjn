package com.trjn.user;

import java.util.Optional;
import org.hibernate.SessionFactory;

import com.google.inject.Inject;
import com.trjn.mysql.MysqlDBAdapter;

import lombok.NonNull;

public class UserAdapter extends MysqlDBAdapter<User> {
    @Inject
    public UserAdapter(@NonNull final SessionFactory factory) {
        super(factory);
    }

    public Optional<User> getUserByInstagramId(@NonNull final Integer instagramId) {
        return optionalSingleResultQuery(getFactory().openSession()
            .createQuery("from User where instagram_id=:instagram_id")
            .setParameter("instagram_id", instagramId));
    }
}
