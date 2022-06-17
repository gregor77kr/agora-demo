package net.mwav.agora.whiteboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@Configuration
public class PlaceholderConfig {

	@Bean
	public static PropertySourcesPlaceholderConfigurer placeholder() {
		PropertySourcesPlaceholderConfigurer placeholder = new PropertySourcesPlaceholderConfigurer();
		Resource[] resources = new ClassPathResource[] { new ClassPathResource("private.properties") };
		placeholder.setLocations(resources);
		placeholder.setIgnoreUnresolvablePlaceholders(false);

		return placeholder;
	}
}
