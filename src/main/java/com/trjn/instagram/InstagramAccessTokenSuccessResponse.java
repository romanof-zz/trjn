package com.trjn.instagram;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class InstagramAccessTokenSuccessResponse {
    @Getter
    public class User {
        @NonNull private Integer id;
        @NonNull private String username;
        @NonNull private String full_name;
        @NonNull private String profile_picture;
        @NonNull private String bio;
        @NonNull private String website;
    }
    @NonNull private String access_token;
    @NonNull private User user;
}
