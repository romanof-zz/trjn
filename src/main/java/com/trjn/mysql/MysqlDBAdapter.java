package com.trjn.mysql;

import java.io.Serializable;
import java.util.Optional;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;

@AllArgsConstructor
public abstract class MysqlDBAdapter<T extends Serializable> {
    @NonNull @Getter private SessionFactory factory;

    public T save(T instance) {
        Session session = factory.openSession();
        session.beginTransaction();
        session.save(instance);
        session.getTransaction().commit();

        return instance;
    }

    public T delete(T instance) {
        Session session = factory.openSession();
        session.beginTransaction();
        session.delete(instance);
        session.getTransaction().commit();

        return instance;
    }

    protected Optional<T> optionalSingleResultQuery(Query<T> query) {
        try {
            return Optional.ofNullable(query.getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
