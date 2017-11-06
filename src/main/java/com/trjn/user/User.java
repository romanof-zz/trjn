package com.trjn.user;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder()
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", catalog = "trjn")
public class User implements Serializable {
    @Setter private Integer userId;
    @Setter private Integer instagramId;
    @Setter private String nickname;
    @Setter private String fullName;
    @Setter private String profilePicture;
    @Setter private String website;

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    public Integer getUserId() {
        return this.userId;
    }

    @Column(name = "instagram_id", unique = true, nullable = false, length = 20)
    public Integer getInstagramId() {
        return this.instagramId;
    }

    @Column(name = "nickname")
    public String getNickname() {
        return this.nickname;
    }

    @Column(name = "full_name")
    public String getFullName() {
        return this.fullName;
    }

    @Column(name = "profile_picture", unique = true, nullable = false, length = 20)
    public String getProfilePicture() {
        return this.profilePicture;
    }

    @Column(name = "website")
    public String getWebsite() {
        return this.website;
    }
}
