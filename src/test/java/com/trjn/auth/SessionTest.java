package com.trjn.auth;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class SessionTest {
    @Test
    public void verifySessionBuiler() {
        Session.SessionBuilder sessionBuilder = Session.builder()
            .sessionId("testId")
            .accessToken("testToken")
            .userId(1);

        assertEquals(sessionBuilder.build().getAccessToken(), "testToken");
        assertEquals(sessionBuilder.build().getUserId(), new Integer(1));
        assertEquals(sessionBuilder.build().getSessionId(), "testId");
        assertEquals(sessionBuilder.toString(), "Session.SessionBuilder(sessionId=testId, userId=1, accessToken=testToken)");
    }
}
