package com.trjn.auth;

import org.junit.Test;

public class AuthenticationServiceTest {

    @Test(expected = NullPointerException.class)
    public void verifyThrowOnNullConfig() {
        new AuthenticationService(null, null, null);
    }
}
