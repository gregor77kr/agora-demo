package net.mwav.agora.whiteboard.security.service;

import java.util.Optional;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import net.mwav.agora.whiteboard.security.entity.User;
import net.mwav.agora.whiteboard.security.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Inject
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		logger.info(userId);

		Optional<User> result = userRepository.findById(userId);
		if (!result.isPresent()) {
			throw new UsernameNotFoundException("Invalid id or password");
		}

		User user = result.get();
		return user;
	}

	public void addUser(User user) {

	}
}
