package com.trjn.user;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class UserTest {
    @Test
    public void verifyUserBuilder() {
        User.UserBuilder userBuilder = User.builder()
            .userId(1)
            .fullName("test")
            .nickname("test")
            .instagramId(1)
            .website("test.com")
            .profilePicture("piclink");

        assertEquals(userBuilder.build().getUserId(), new Integer(1));
        assertEquals(userBuilder.build().getInstagramId(), new Integer(1));
        assertEquals(userBuilder.build().getFullName(), "test");
    }
}
