package net.mwav.agora.common;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import reactor.netty.http.client.HttpClient;

@Component
public class HttpUtil {

	private final int CONNECT_TIMEOUT_MILLIS = 1000;

	private final int READ_TIMEOUT = 1000;

	private final int WRITE_TIMEOUT = 1000;

	public WebClient getWebClient() {
		HttpClient httpClient = HttpClient.create()
			.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, CONNECT_TIMEOUT_MILLIS)
			.doOnConnected(conn -> conn
				.addHandlerLast(new ReadTimeoutHandler(READ_TIMEOUT))
				.addHandlerLast(new WriteTimeoutHandler(WRITE_TIMEOUT)));

		return WebClient.builder()
			.clientConnector(new ReactorClientHttpConnector(httpClient))
			.defaultHeaders(header -> {
				header.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
				header.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			})
			.build();
	}
}
