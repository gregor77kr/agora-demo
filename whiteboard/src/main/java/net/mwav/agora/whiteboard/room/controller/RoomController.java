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
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping(value = "/manage")
	public ModelAndView list(HttpServletRequest request) {
		logger.info("/room/manage");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/room/manage");
		return mav;
	}

	@GetMapping(value = "/meeting/{uuid}")
	public ModelAndView meeting(@PathVariable String uuid) throws Exception {
		logger.info("/room/meeting");
		logger.info(uuid);

		if (ObjectUtils.isEmpty(uuid)) {
			throw new IllegalStateException("Link is required.");
		}

		ModelAndView mav = new ModelAndView("room/meeting");
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

}
