package com.trjn.guice;

import java.nio.file.Paths;
import java.util.Arrays;

import javax.ws.rs.client.ClientBuilder;

import org.cfg4j.provider.ConfigurationProvider;
import org.cfg4j.provider.ConfigurationProviderBuilder;
import org.cfg4j.source.ConfigurationSource;
import org.cfg4j.source.classpath.ClasspathConfigurationSource;
import org.cfg4j.source.compose.MergeConfigurationSource;
import org.cfg4j.source.context.filesprovider.ConfigFilesProvider;
import org.cfg4j.source.system.EnvironmentVariablesConfigurationSource;

import com.google.inject.AbstractModule;
import com.trjn.instagram.InstagramOpenIdConfig;
import com.trjn.instagram.InstagramOpenIdProvider;
import com.trjn.auth.OpenIdProvider;

public class ConfigModule extends AbstractModule {
    @Override
    protected void configure() {
        InstagramOpenIdConfig openIdConfig = configurationProvider().
            bind("instagram", InstagramOpenIdConfig.class);

        OpenIdProvider openIdProvider = new InstagramOpenIdProvider(openIdConfig, ClientBuilder.newClient());

        bind(OpenIdProvider.class).toInstance(openIdProvider);
    }

    private ConfigurationProvider configurationProvider() {
        // Specify which files to load. Configuration from both files will be merged.
        ConfigFilesProvider configFilesProvider = () ->
            Arrays.asList(Paths.get("openid.yml"));

        // Use classpath repository as configuration store
        ConfigurationSource classpathConfigurationSource = new ClasspathConfigurationSource(configFilesProvider);
        ConfigurationSource environmentConfigurationSource = new EnvironmentVariablesConfigurationSource();

        ConfigurationSource source = new MergeConfigurationSource(
            classpathConfigurationSource,
            environmentConfigurationSource);

        // Create provider
        return new ConfigurationProviderBuilder()
            .withConfigurationSource(source)
            .build();
    }
}
