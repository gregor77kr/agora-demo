package net.mwav.agora.whiteboard.room.service;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import net.mwav.agora.token.TokenManager;
import net.mwav.agora.token.constant.TokenRole;
import net.mwav.agora.whiteboard.room.api.AgoraRoomApi;
import net.mwav.agora.whiteboard.room.entity.Room;
import reactor.core.publisher.Flux;
import reactor.netty.http.client.HttpClient;

@Service
public class AgoraRoomRestService {

	private static final Logger logger = LoggerFactory.getLogger(AgoraRoomRestService.class);

	private final String HEADER_TOKEN = "token";

	private final String HEADER_REGION = "region";

	@Inject
	private TokenManager tokenManager;

	@Inject
	private AgoraRoomApi agoraRoomApi;

	public List<Room> getRooms() throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("role", TokenRole.ADMIN.getValue());

		String sdkToken = tokenManager.sdkToken(1000 * 60 * 1, map);
		String region = "sg";
		logger.debug(sdkToken);

		HttpClient httpClient = HttpClient.create()
			.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
			.responseTimeout(Duration.ofMillis(5000))
			.doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
				.addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));

		WebClient client = WebClient.builder()
			.baseUrl(agoraRoomApi.getAccessPoint())
			.defaultHeaders(header -> {
				header.add(HEADER_TOKEN, sdkToken);
				header.add(HEADER_REGION, region);
				header.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			})
			.clientConnector(new ReactorClientHttpConnector(httpClient))
			.build();

		Flux<Room> response = client.get()
			.retrieve()
			.bodyToFlux(Room.class);

		return response.collectList().block();
	}
}
