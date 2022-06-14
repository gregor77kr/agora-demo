package net.mwav.agora.whiteboard;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import net.mwav.agora.whiteboard.config.AgoraProperty;

@SpringBootTest
class PropertyTest {

	private static final Logger logger = LoggerFactory.getLogger(PropertyTest.class);

	@Inject
	private AgoraProperty agoraProperty;

	@Test
	void test() {
		logger.info(agoraProperty.toString());
	}

}
