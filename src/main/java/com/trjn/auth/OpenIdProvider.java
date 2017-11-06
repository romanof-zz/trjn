package com.trjn.auth;

import com.trjn.instagram.InstagramAccessTokenSuccessResponse;

public interface OpenIdProvider {
    /**
     * Generate url for openId provider.
     * @return String code
     */
    String getRequestUrl(String csrfToken);

    /**
     * Get access token for a access code.
     */
    InstagramAccessTokenSuccessResponse getAccessToken(String code);
}
