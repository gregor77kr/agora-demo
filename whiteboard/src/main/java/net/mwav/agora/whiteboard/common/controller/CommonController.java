package net.mwav.agora.whiteboard.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CommonController {

	private final Logger logger = LoggerFactory.getLogger(CommonController.class);

	@GetMapping(value = "/")
	public ModelAndView index(HttpServletRequest request) {
		logger.info("/");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/common/index");
		return mav;
	}

}
