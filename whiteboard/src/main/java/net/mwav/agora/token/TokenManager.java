package net.mwav.agora.token;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ObjectUtils;

import net.mwav.agora.common.JsonUtil;
import net.mwav.agora.token.constant.TokenPrefix;

/**
 * This class provides the methods for Netless Token generater. Used to generate
 * a tokens instead of RESTful API.
 * 
 * {@link https://github.com/netless-io/netless-token}
 * 
 */
@Configuration
@ConfigurationProperties(prefix = "agora")
public class TokenManager {

	private static final Logger logger = LoggerFactory.getLogger(TokenManager.class);

	private String appIdentifier;

	private String accessKey;

	private String secretAccessKey;

	public String getAppIdentifier() {
		return appIdentifier;
	}

	public void setAppIdentifier(String appIdentifier) {
		this.appIdentifier = appIdentifier;
	}

	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public String getSecretAccessKey() {
		return secretAccessKey;
	}

	public void setSecretAccessKey(String secretAccessKey) {
		this.secretAccessKey = secretAccessKey;
	}

	@Override
	public String toString() {
		return "AgoraProperty [appIdentifier=" + appIdentifier + ", accessKey=" + accessKey + ", secretAccessKey="
				+ secretAccessKey + "]";
	}

	public String getSdkToken(String role, long lifespan) throws Exception {
		return createToken(TokenPrefix.SDK.getValue(), role, lifespan, null);
	}

	public String getRoomToken(String role, long lifespan, String uuid) throws Exception {
		return createToken(TokenPrefix.ROOM.getValue(), role, lifespan, uuid);
	}

	public String getTaskToken(String role, long lifespan, String uuid) throws Exception {
		return createToken(TokenPrefix.TASK.getValue(), role, lifespan, uuid);
	}

	private String createToken(String prefix, String role, long lifespan, String uuid) throws Exception {
		if (ObjectUtils.isEmpty(role)) {
			throw new IllegalAccessException("role is required");
		}

		if ((TokenPrefix.ROOM.getValue().equals(role) || TokenPrefix.TASK.getValue().equals(role)) && ObjectUtils.isEmpty(uuid)) {
			throw new IllegalAccessException("uuid is required");
		}

		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		map.put("role", role);

		if (ObjectUtils.isEmpty(uuid)) {
			map.put("uuid", uuid);
		}

		map.put("ak", accessKey);
		map.put("nonce", UUID.randomUUID().toString());

		if (lifespan > 0) {
			map.put("expireAt", String.valueOf(System.currentTimeMillis() + lifespan));
		}

		String information = JsonUtil.convertToJson(sortMap(map));
		map.put("sig", createHmac(secretAccessKey, information));

		String query = sortAndStringifyMap(map);
		return prefix + stringToBase64(query);
	}

	/**
	 * sort a map by the alphabetical order of keys
	 */
	private Map<String, String> sortMap(Map<String, String> map) {
		if (map == null) {
			map = new HashMap<String, String>();
		}

		Map<String, String> sortedMap = map.entrySet()
				.stream()
				.map(e -> {
					e.setValue(String.valueOf(e.getValue()));
					return e;
				})
				.sorted(Map.Entry.comparingByKey())
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (o, n) -> o, LinkedHashMap::new));

		logger.info(sortedMap.toString());

		return sortedMap;
	}

	private String createHmac(String key, String information) throws Exception {
		Mac mac = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
		mac.init(secret_key);

		return byteArrayToHexString(mac.doFinal(information.getBytes("UTF-8")));
	}

	private String sortAndStringifyMap(Map<String, String> object) throws UnsupportedEncodingException {
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

	private static String byteArrayToHexString(byte[] b) {
		StringBuilder hs = new StringBuilder();
		String stmp;
		for (int n = 0; b != null && n < b.length; n++) {
			stmp = Integer.toHexString(b[n] & 0XFF);
			if (stmp.length() == 1)
				hs.append('0');
			hs.append(stmp);
		}
		return hs.toString()
				.toLowerCase();
	}

	private static String encodeURIComponent(String s) throws UnsupportedEncodingException {
		String result = null;
		result = URLEncoder.encode(s, "UTF-8")
				.replaceAll("\\+", "%20")
				.replaceAll("%21", "!")
				.replaceAll("%27", "'")
				.replaceAll("%28", "(")
				.replaceAll("%29", ")")
				.replaceAll("%7E", "~");

		return result;
	}
}
