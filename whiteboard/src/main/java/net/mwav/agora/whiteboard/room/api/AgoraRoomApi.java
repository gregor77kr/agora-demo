package net.mwav.agora.whiteboard.room.api;

import org.springframework.stereotype.Component;

@Component
public class AgoraRoomApi {

	public String getAccessPoint() {
		return "https://api.netless.link/v5/rooms";
	}
}
