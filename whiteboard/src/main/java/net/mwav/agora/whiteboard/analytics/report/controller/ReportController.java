package net.mwav.agora.whiteboard.analytics.report.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/analytics")
public class ReportController {

	private final Logger logger = LoggerFactory.getLogger(ReportController.class);

	@GetMapping(value = "/report")
	public ModelAndView view(HttpServletRequest request) {
		logger.info("/analytics/report");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("analytics/report");
		return mav;
	}

}
