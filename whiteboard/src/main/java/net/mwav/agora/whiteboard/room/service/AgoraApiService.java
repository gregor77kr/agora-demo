package net.mwav.agora.whiteboard.room.service;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import net.mwav.agora.common.HttpUtil;
import net.mwav.agora.token.TokenManager;
import net.mwav.agora.token.constant.TokenRole;
import net.mwav.agora.whiteboard.room.api.AgoraRoomApi;
import net.mwav.agora.whiteboard.room.entity.Room;

@Service
public class AgoraApiService {

	private static final Logger logger = LoggerFactory.getLogger(AgoraApiService.class);

	private final String HEADER_TOKEN = "token";

	private final String HEADER_REGION = "region";

	@Inject
	private TokenManager tokenManager;

	@Inject
	private AgoraRoomApi agoraRoomApi;

	@Inject
	private HttpUtil httpUtil;

	public String getSdkToken() throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("role", TokenRole.ADMIN.getValue());

		String sdkToken = tokenManager.sdkToken(1000 * 30, map);

		return sdkToken;
	}

	public String getRoomToken(String uuid) throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("role", TokenRole.ADMIN.getValue());
		map.put("uuid", uuid);

		String roomToken = tokenManager.roomToken(1000 * 60, map);
		return roomToken;
	}

	public String getAppIdentifier() {
		String appIdentifier = tokenManager.getAppIdentifier();
		return appIdentifier;
	}

	public Room getRoom(String uuid) throws Exception {
		String roomToken = getRoomToken(uuid);
		String region = "sg";

		WebClient client = httpUtil.getWebClient();

		Room room = client.get()
			.uri(new URI(agoraRoomApi.getAccessPoint() + "/" + uuid))
			.headers(header -> {
				header.add(HEADER_TOKEN, roomToken);
				header.add(HEADER_REGION, region);
			})
			.retrieve()
			.bodyToMono(Room.class)
			.block();

		return room;
	}

	public List<Room> getRooms() throws Exception {
		String sdkToken = getSdkToken();
		String region = "sg";
		logger.debug(sdkToken);

		WebClient client = httpUtil.getWebClient();

		List<Room> rooms = client.get()
			.uri(new URI(agoraRoomApi.getAccessPoint()))
			.headers(header -> {
				header.add(HEADER_TOKEN, sdkToken);
				header.add(HEADER_REGION, region);
			})
			.retrieve()
			.bodyToFlux(Room.class)
			.collectList()
			.block();

		return rooms;
	}

}
