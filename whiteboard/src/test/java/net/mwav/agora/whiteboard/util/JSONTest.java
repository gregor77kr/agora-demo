package net.mwav.agora.whiteboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;

import net.mwav.agora.common.JsonUtil;

class JSONTest {

	private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

	@Test
	void mapToJsonTest() throws JsonProcessingException {
		Map<String, String> map = new HashMap<String, String>();
		map.put("uuid", "uuid");
		map.put("ak", "ak");

		String expected = "{\"ak\":\"ak\",\"uuid\":\"uuid\"}";
		String actuals = JsonUtil.convertToJson(map);
		logger.info("actuals : " + actuals);

		assertEquals(expected, actuals);
	}

	@Test
	void listToJsonTest() throws JsonProcessingException {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list.add(new HashMap<String, Object>());
		list.add(new HashMap<String, Object>());

		String expected = "[{},{}]";
		String actuals = JsonUtil.convertToJson(list);
		logger.info("actuals : " + actuals);

		assertEquals(expected, actuals);
	}

	@Test
	void nullTest() throws JsonProcessingException {
		String actuals = JsonUtil.convertToJson(null);
		logger.info("actuals : " + actuals);

		assertEquals("null", actuals);
	}

	@Test
	void jsonTest() throws JsonProcessingException {
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		map.put("ak", "ak");
		map.put("nonce", UUID.randomUUID().toString());
		map.put("role", "READER");
		map.put("uuid", "uuid");

		String expected = toJson(map);
		String actuals = JsonUtil.convertToJson(map);

		logger.info("expected : " + expected);
		logger.info("actuals : " + actuals);

		assertEquals(expected, actuals);
	}

	private static String toJson(LinkedHashMap<String, String> map) {
		Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();

		List<String> result = new ArrayList<>();
		while (iterator.hasNext()) {
			Map.Entry<String, String> entry = iterator.next();
			String value;
			if (entry.getValue() == null) {
				value = "null";
			} else {
				value = entry.getValue();
			}
			result.add("\"" + entry.getKey() + "\"" + ":" + "\"" + value + "\"");
		}
		return "{" + String.join(",", result) + "}";
	}

}
