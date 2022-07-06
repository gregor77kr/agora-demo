package net.mwav.agora.whiteboard.room.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import net.mwav.agora.whiteboard.analytics.dashboard.controller.DashboardController;

@Controller
@RequestMapping(value = "/room")
public class RoomController {

	private final Logger logger = LoggerFactory.getLogger(DashboardController.class);

	@GetMapping(value = "/list/view")
	public ModelAndView list(HttpServletRequest request) {
		logger.info("/room/list/view");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/room/list-view");
		return mav;
	}

}
