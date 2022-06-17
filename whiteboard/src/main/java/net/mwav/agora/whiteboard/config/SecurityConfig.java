package net.mwav.agora.whiteboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/security/**")
				.permitAll()
				.antMatchers("/admin/**")
				.hasAuthority("ADMIN")
				.anyRequest()
				.authenticated();

		http.formLogin()
				.loginPage("/security/login")
				.loginProcessingUrl("/security/auth")
				.defaultSuccessUrl("/")
				/*.successHandler(null)
				.failureHandler(null)*/
				.usernameParameter("userId")
				.passwordParameter("password");
		http.logout()
				.logoutUrl("/security/logout")
				.logoutSuccessUrl("/security/login")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID");

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring()
				.antMatchers("/resources/**")
				.antMatchers("/favicon.ico");
	}
}
