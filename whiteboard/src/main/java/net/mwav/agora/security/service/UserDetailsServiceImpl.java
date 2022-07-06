package net.mwav.agora.security.service;

import java.util.Optional;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import net.mwav.agora.security.constant.Authority;
import net.mwav.agora.security.entity.User;
import net.mwav.agora.security.entity.UserAuthority;
import net.mwav.agora.security.repository.UserAuthorityRepository;
import net.mwav.agora.security.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Inject
	private UserRepository userRepository;

	@Inject
	private UserAuthorityRepository userAuthorityRepository;

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		Optional<User> result = userRepository.findById(userId);
		logger.debug(userId);
		if (!result.isPresent()) {
			throw new UsernameNotFoundException("Invalid id or password");
		}

		User user = result.get();
		return user;
	}

	public void addUser(User user) {
		String userId = user.getUserId();
		logger.debug(userId);

		Optional<User> result = userRepository.findById(userId);
		if (result.isPresent()) {
			throw new DataIntegrityViolationException("Your input id " + userId + " already exists");
		}

		UserAuthority reader = new UserAuthority();
		reader.setUserId(userId);
		reader.setRole(Authority.ROLE_ADMIN.getValue());

		userAuthorityRepository.save(reader);
		userRepository.save(user);
	}
}
