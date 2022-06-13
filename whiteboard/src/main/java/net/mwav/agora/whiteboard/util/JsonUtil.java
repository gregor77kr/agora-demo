package net.mwav.agora.whiteboard.util;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JsonUtil {

	public String convertToJson(Object object) throws JsonProcessingException {
		return new ObjectMapper().writeValueAsString(object);
	}
}
