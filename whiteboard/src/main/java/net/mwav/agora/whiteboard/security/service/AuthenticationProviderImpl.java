package net.mwav.agora.whiteboard.security.service;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
public class AuthenticationProviderImpl implements AuthenticationProvider {

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationProviderImpl.class);

	@Inject
	private UserDetailsService userDetailsServiceImpl;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String userId = authentication.getName();
		String password = (String) authentication.getCredentials();

		logger.info("userId : " + userId);
		logger.info("password : " + password);

		if (ObjectUtils.isEmpty(userId) || ObjectUtils.isEmpty(password)) {
			throw new AuthenticationCredentialsNotFoundException("Id or password is requried");
		}

		UserDetails user = userDetailsServiceImpl.loadUserByUsername(userId);

		if (ObjectUtils.isEmpty(user)) {
			throw new UsernameNotFoundException("Invalid id or password");
		}

		return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
