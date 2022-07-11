package net.mwav.agora.whiteboard.room.service;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import net.mwav.agora.common.HttpUtil;
import net.mwav.agora.token.TokenManager;
import net.mwav.agora.token.constant.TokenRole;
import net.mwav.agora.whiteboard.room.api.AgoraRoomApi;

@Service
public class AgoraRoomRestService {

	private static final Logger logger = LoggerFactory.getLogger(AgoraRoomRestService.class);

	private final String HEADER_TOKEN = "token";

	private final String HEADER_REGION = "region";

	@Inject
	private TokenManager tokenManager;

	@Inject
	private AgoraRoomApi agoraRoomApi;

	@Inject
	private HttpUtil httpUtil;

	public ResponseEntity<String> getRooms() throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("role", TokenRole.ADMIN.getValue());

		String sdkToken = tokenManager.sdkToken(1000 * 30, map);
		String region = "sg";
		logger.debug(sdkToken);

		WebClient client = httpUtil.getWebClient();

		ResponseEntity<String> response = client.get()
			.uri(new URI(agoraRoomApi.getAccessPoint()))
			.headers(header -> {
				header.add(HEADER_TOKEN, sdkToken);
				header.add(HEADER_REGION, region);
			})
			.retrieve()
			.toEntity(String.class)
			.block();

		return response;
	}
}
