package net.mwav.agora.whiteboard.room.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import net.mwav.agora.whiteboard.room.entity.Room;

@Service
public class RoomService {

	@Inject
	private AgoraApiService agoraApiService;

	public Map<String, Object> getRoomInfo(String uuid) throws Exception {
		Map<String, Object> info = new HashMap<String, Object>();

		info.put("uuid", uuid);
		info.put("appIdentifier", agoraApiService.getAppIdentifier());
		info.put("roomToken", agoraApiService.getRoomToken(uuid));

		return info;
	}

	public List<Room> getRooms() throws Exception {
		List<Room> rooms = agoraApiService.getRooms();
		return rooms;
	}
}
