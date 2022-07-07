package net.mwav.agora.whiteboard.room.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import net.mwav.agora.whiteboard.analytics.dashboard.controller.DashboardController;
import net.mwav.agora.whiteboard.room.entity.Room;
import net.mwav.agora.whiteboard.room.service.AgoraRoomRestService;
import reactor.core.publisher.Flux;

@Controller
@RequestMapping(value = "/room")
public class RoomController {

	private final Logger logger = LoggerFactory.getLogger(DashboardController.class);

	@Inject
	private AgoraRoomRestService agoraRoomRestService;

	@GetMapping(value = "/list/view")
	public ModelAndView list(HttpServletRequest request) {
		logger.info("/room/list/view");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/room/list-view");
		return mav;
	}

	@GetMapping(value = "/list/rooms")
	@ResponseBody
	public String getRooms() throws Exception {

		Flux<Room> result = agoraRoomRestService.getRooms();
		List<Room> list = result.collectList()
				.block();

		logger.info(list.toString());
		return "getRooms";
	}

}
