package com.trjn.instagram;

import lombok.NonNull;

public interface InstagramOpenIdConfig {
    @NonNull String redirectUri();
    @NonNull String responseType();
    @NonNull String clientId();
    @NonNull String secret();
    @NonNull String scope();
}
