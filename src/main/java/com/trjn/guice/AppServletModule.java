package com.trjn.guice;

import com.google.inject.servlet.ServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;
import com.trjn.auth.AuthenticationFilter;
import com.trjn.auth.AuthenticationService;

public class AppServletModule extends ServletModule {
    @Override
    protected void configureServlets() {
        // controller binding.
        bind(AuthenticationService.class);
        bind(AuthenticationFilter.class);

        // route mapping.
        serve("/api/*").with(GuiceContainer.class);
    }
}
