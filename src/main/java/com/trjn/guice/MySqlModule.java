package com.trjn.guice;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.google.inject.AbstractModule;
import com.trjn.auth.SessionAdapter;
import com.trjn.user.UserAdapter;

public class MySqlModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(SessionFactory.class).toInstance(new Configuration().configure().buildSessionFactory());
        bind(SessionAdapter.class);
        bind(UserAdapter.class);
    }
}
