package net.mwav.agora.whiteboard.config;

import javax.inject.Inject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import net.mwav.agora.whiteboard.security.service.AuthenticationFailureHandlerImpl;
import net.mwav.agora.whiteboard.security.service.AuthenticationProviderImpl;
import net.mwav.agora.whiteboard.security.service.AuthenticationSuccessHandlerImpl;

@Configuration
public class SecurityConfig {

	@Inject
	private AuthenticationProviderImpl authenticationProviderImpl;

	@Inject
	private AuthenticationSuccessHandlerImpl authenticationSuccessHandlerImpl;

	@Inject
	private AuthenticationFailureHandlerImpl authenticationFailureHandlerImpl;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf()
			.disable();

		http.authorizeRequests()
			.antMatchers("/resources/**")
			.permitAll()
			.antMatchers("/js/**")
			.permitAll()
			.antMatchers("/css/**")
			.permitAll()
			.antMatchers("/assets/**")
			.permitAll()
			.antMatchers("/favicon.ico")
			.permitAll()
			.antMatchers("/security/**")
			.permitAll()
			.antMatchers("/admin/**")
			.hasAuthority("ADMIN")
			.anyRequest()
			.authenticated();

		http.formLogin()
			.loginPage("/security/signin/form")
			.loginProcessingUrl("/security/signin")
			.successHandler(authenticationSuccessHandlerImpl)
			.failureHandler(authenticationFailureHandlerImpl)
			.usernameParameter("userId")
			.passwordParameter("password")
			.permitAll();

		http.logout()
			.logoutUrl("/security/signout")
			.logoutSuccessUrl("/security/signin/form")
			.invalidateHttpSession(true)
			.deleteCookies("JSESSIONID");

		http.authenticationProvider(authenticationProviderImpl);

		return http.build();
	}

}
