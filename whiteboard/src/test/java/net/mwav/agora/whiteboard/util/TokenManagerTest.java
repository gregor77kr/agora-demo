package net.mwav.agora.whiteboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.inject.Inject;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import net.mwav.agora.token.TokenManager;

@SpringBootTest
class TokenManagerTest {

	private static final Logger logger = LoggerFactory.getLogger(TokenManagerTest.class);

	@Inject
	private TokenManager tokenManager;

	@Test
	void test() throws Exception {
		String role = "READER";
		String uuid = "uuid";
		String accessKey = "acessKey";
		String secretAccessKey = "secretAccessKey";
		String prefix = "NETLESSROOM_";
		long lifespan = (1000 * 60 * 10);

		Map<String, String> content = new HashMap<String, String>();
		content.put("role", role);
		content.put("uuid", uuid);

		String expected = createToken(prefix, accessKey, secretAccessKey, lifespan, content);
		String actuals = tokenManager.getRoomToken(role, lifespan, uuid);

		logger.info("expected : " + expected);
		logger.info("actuals : " + actuals);

		assertEquals(expected.length(), actuals.length());
	}

	private String createToken(String prefix, String accessKey, String secretAccessKey, long lifespan, Map<String, String> content) throws Exception {
		LinkedHashMap<String, String> map = new LinkedHashMap<>();
		map.putAll(content);
		map.put("ak", accessKey);
		map.put("nonce", UUID.randomUUID().toString());

		if (lifespan > 0) {
			map.put("expireAt", System.currentTimeMillis() + lifespan + "");
		}

		String information = toJson(sortMap(map));
		map.put("sig", createHmac(secretAccessKey, information));

		String query = sortAndStringifyMap(map);

		return prefix + stringToBase64(query);
	}

	private LinkedHashMap<String, String> sortMap(Map<String, String> object) {
		List<String> keys = new ArrayList<>(object.keySet());
		keys.sort(null);

		LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<>();
		for (int i = 0; i < keys.size(); i++) {
			linkedHashMap.put(keys.get(i), object.get(keys.get(i)));
		}
		return linkedHashMap;
	}

	private String toJson(LinkedHashMap<String, String> map) {
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

	private String createHmac(String key, String data) throws Exception {
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
		sha256_HMAC.init(secret_key);

		return byteArrayToHexString(sha256_HMAC.doFinal(data.getBytes("UTF-8")));
	}

	private String sortAndStringifyMap(Map<String, String> object) {
		List<String> keys = new ArrayList<>(object.keySet());
		keys.sort(null);

		List<String> kvStrings = new ArrayList<>();
		for (int i = 0; i < keys.size(); i++) {
			if (object.get(keys.get(i)) == null) {
				continue;
			} else {
				kvStrings.add(encodeURIComponent(keys.get(i)) + "=" + encodeURIComponent(object.get(keys.get(i))));
			}
		}
		return String.join("&", kvStrings);
	}

	private String stringToBase64(String str) throws UnsupportedEncodingException {
		return Base64.getEncoder()
				.encodeToString(str.getBytes("utf-8"))
				.replace("+", "-")
				.replace("/", "_")
				.replaceAll("=+$", "");
	}

	private String byteArrayToHexString(byte[] b) {
		StringBuilder hs = new StringBuilder();
		String stmp;
		for (int n = 0; b != null && n < b.length; n++) {
			stmp = Integer.toHexString(b[n] & 0XFF);
			if (stmp.length() == 1)
				hs.append('0');
			hs.append(stmp);
		}
		return hs.toString().toLowerCase();
	}

	private String encodeURIComponent(String s) {
		String result = null;

		try {
			result = URLEncoder.encode(s, "UTF-8")
					.replaceAll("\\+", "%20")
					.replaceAll("%21", "!")
					.replaceAll("%27", "'")
					.replaceAll("%28", "(")
					.replaceAll("%29", ")")
					.replaceAll("%7E", "~");
		}
		// This exception should never occur.
		catch (UnsupportedEncodingException e) {
			result = s;
		}

		return result;
	}
}
