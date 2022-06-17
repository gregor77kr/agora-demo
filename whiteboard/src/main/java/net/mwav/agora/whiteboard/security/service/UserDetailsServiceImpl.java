package net.mwav.agora.whiteboard.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import net.mwav.agora.whiteboard.security.entity.User;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		logger.info(userId);

		User user = new User();
		return user;
	}
}
