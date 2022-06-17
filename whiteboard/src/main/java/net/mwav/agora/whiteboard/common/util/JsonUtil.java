package net.mwav.agora.whiteboard.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

	public static String convertToJson(Object object) throws JsonProcessingException {
		return new ObjectMapper().writeValueAsString(object);
	}
}
