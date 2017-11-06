package com.trjn.auth;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import java.io.Serializable;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sessions", catalog = "trjn")
public class Session implements Serializable {
    @Setter private String sessionId;
    @Setter private Integer userId;
    @Setter private String accessToken;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "session_id", unique = true, nullable = false)
    public String getSessionId() {
        return this.sessionId;
    }

    @Column(name = "user_id", unique = true, nullable = false, length = 20)
    public Integer getUserId() {
        return this.userId;
    }

    @Column(name = "access_token", unique = true, nullable = false, length = 20)
    public String getAccessToken() {
        return this.accessToken;
    }
}


