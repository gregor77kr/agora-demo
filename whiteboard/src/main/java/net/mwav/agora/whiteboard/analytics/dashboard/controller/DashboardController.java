package net.mwav.agora.whiteboard.analytics.dashboard.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/analytics")
public class DashboardController {

	private final Logger logger = LoggerFactory.getLogger(DashboardController.class);

	@GetMapping(value = "/dashboard/view")
	public ModelAndView dashboard(HttpServletRequest request) {
		logger.info("/analytics/dashboard-view");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/analytics/dashboard-view");
		return mav;
	}

}
