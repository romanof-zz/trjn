package com.trjn.instagram;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class InstagramExceptionTest {
    @Test
    public void initVerify() {
        InstagramException emptyException = new InstagramException();
        assertNull(emptyException.getMessage());
        assertNull(emptyException.getCause());

        InstagramException exception = new InstagramException("test");
        assertEquals(exception.getMessage(), "test");
        assertNull(exception.getCause());

        InstagramException exception1 = new InstagramException(new RuntimeException("test"));
        assertEquals(exception1.getMessage(), "java.lang.RuntimeException: test");
        assertNotNull(exception1.getCause());
    }
}
