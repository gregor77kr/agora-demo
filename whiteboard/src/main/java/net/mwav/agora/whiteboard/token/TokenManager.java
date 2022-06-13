package net.mwav.agora.whiteboard.token;

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
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * This class provides the methods for Netless Token generater.
 * Used to generate a tokens instead of RESTful API.
 *  
 * {@link https://github.com/netless-io/netless-token}
 *  
 */
public class TokenManager {

	/**
	 * token prefix
	 * SDK : agora console token
	 * ROOM : room access token
	 * TASK : file conversion task token
	 */
	public enum TokenPrefix {
		SDK("NETLESSSDK_"), ROOM("NETLESSROOM_"), TASK("NETLESSTASK_");

		private String value;

		TokenPrefix(String name) {
			this.value = name;
		}

		public String getValue() {
			return value;
		}
	}

	public enum TokenRole {
		ADMIN("0"), WRITER("1"), READER("2");

		private String value;

		TokenRole(String name) {
			this.value = name;
		}

		public String getValue() {
			return value;
		}
	}

	public static String getSdkToken(String accessKey, String secretAccessKey, long lifespan, Map<String, String> content) throws Exception {
		return createToken(TokenPrefix.SDK.getValue(), accessKey, secretAccessKey, lifespan, content);
	}

	public static String getRoomToken(String accessKey, String secretAccessKey, long lifespan, Map<String, String> content) throws Exception {
		return createToken(TokenPrefix.ROOM.getValue(), accessKey, secretAccessKey, lifespan, content);
	}

	public static String getTaskToken(String accessKey, String secretAccessKey, long lifespan, Map<String, String> content) throws Exception {
		return createToken(TokenPrefix.TASK.getValue(), accessKey, secretAccessKey, lifespan, content);
	}

	private static String createToken(String prefix, String accessKey, String secretAccessKey, long lifespan, Map<String, String> content) throws Exception {
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

	/**
	 * sort a map by the alphabetical order of keys
	 * {@link String#compareTo(String)}
	 */
	private static Map<String, String> sortMap(Map<String, String> map) {
		if (map == null) {
			map = new HashMap<String, String>();
		}

		Map<String, String> sortedMap = map.entrySet()
				.stream()
				.sorted(Map.Entry.comparingByKey())
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (o, n) -> o, LinkedHashMap::new));

		return sortedMap;
	}

	/**
	 * convert map to json string
	 */
	private static String toJson(Map<String, String> map) {
		Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();

		List<String> result = new ArrayList<>();
		while (iterator.hasNext()) {
			Map.Entry<String, String> entry = iterator.next();
			String value = String.valueOf(entry.getValue());
			result.add("\"" + entry.getKey() + "\"" + ":" + "\"" + value + "\"");
		}
		return "{" + String.join(",", result) + "}";
	}

	private static String createHmac(String key, String information) throws Exception {
		Mac mac = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
		mac.init(secret_key);

		return byteArrayToHexString(mac.doFinal(information.getBytes("UTF-8")));
	}

	private static String sortAndStringifyMap(Map<String, String> object) throws UnsupportedEncodingException {
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

	private static String stringToBase64(String str) throws UnsupportedEncodingException {
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
		return hs.toString().toLowerCase();
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
