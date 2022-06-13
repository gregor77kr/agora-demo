package net.mwav.agora.whiteboard;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;

import net.mwav.agora.whiteboard.util.JsonUtil;

@SpringBootTest
class JSONTest {

	@Inject
	private JsonUtil jsonUtil;

	@Test
	void test() throws JsonProcessingException {
		Map<String, String> map = new HashMap<String, String>();
		map.put("uuid", "uuid");
		map.put("ak", "ak");
		map.put("nonce", UUID.randomUUID().toString());

		String mapToJson = jsonUtil.convertToJson(map);
	}

}
