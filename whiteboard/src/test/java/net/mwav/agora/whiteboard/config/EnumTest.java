package net.mwav.agora.whiteboard.config;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import net.mwav.agora.whiteboard.security.constant.Authority;

class EnumTest {

	@Test
	void test() {
		Authority admin = Authority.ROLE_ADMIN;
		assertEquals("ADMIN", admin.getValue());
	}

}
