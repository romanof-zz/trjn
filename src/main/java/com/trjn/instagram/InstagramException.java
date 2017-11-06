package com.trjn.instagram;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InstagramException extends RuntimeException {
    public InstagramException(final String message) {
        super(message);
    }

    public InstagramException(final Throwable throwable) {
        super(throwable);
    }
}
