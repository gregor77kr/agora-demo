package net.mwav.agora.whiteboard.config;

import java.util.Optional;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import net.mwav.agora.whiteboard.security.entity.Authority;
import net.mwav.agora.whiteboard.security.repository.AuthorityRepository;

@SpringBootTest
public class JPATest {

	private static final Logger logger = LoggerFactory.getLogger(JPATest.class);

	@Inject
	private AuthorityRepository authorityRepository;

	@Test
	void test() {
		Authority admin = new Authority();
		admin.setRole("ADMIN");
		admin.setRoleName("관리자");
		admin.setRoleDesc("관리자 권한");

		authorityRepository.save(admin);

		Optional<Authority> result = authorityRepository.findById("ADMIN");
		result.ifPresent(a -> logger.info(a.toString()));

		authorityRepository.deleteAll();
	}
}
