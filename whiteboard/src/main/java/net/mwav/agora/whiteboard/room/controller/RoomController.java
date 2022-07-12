package net.mwav.agora.whiteboard.room.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import net.mwav.agora.whiteboard.analytics.dashboard.controller.DashboardController;
import net.mwav.agora.whiteboard.room.entity.Room;
import net.mwav.agora.whiteboard.room.service.AgoraRoomRestService;

@Controller
@RequestMapping(value = "/room")
public class RoomController {

	private final Logger logger = LoggerFactory.getLogger(DashboardController.class);

	@Inject
	private AgoraRoomRestService agoraRoomRestService;

	@GetMapping(value = "/manage/view")
	public ModelAndView list(HttpServletRequest request) {
		logger.info("/room/list/view");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/room/manage-view");
		return mav;
	}

	@GetMapping(value = "/list")
	@ResponseBody
	public ResponseEntity<Object> getRooms() throws Exception {
		logger.info("/room/list");

		List<Room> rooms = agoraRoomRestService.getRooms();
		ResponseEntity<Object> response = new ResponseEntity<Object>(rooms, HttpStatus.OK);

		return response;
	}

	@PostMapping(value = "/join")
	@ResponseBody
	public ResponseEntity<Object> joinRoom(@RequestBody String link) throws Exception {
		logger.info("/room/join");
		logger.info(link);

		if (ObjectUtils.isEmpty(link)) {
			throw new IllegalStateException("Link is required.");
		}

		Room room = agoraRoomRestService.getRoom();
		ResponseEntity<Object> response = new ResponseEntity<Object>(room, HttpStatus.OK);

		return response;
	}

}
