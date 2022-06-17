package net.mwav.agora.whiteboard.security.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SecurityController {

	private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);

	@GetMapping(value = "/security/login")
	public ModelAndView login(HttpServletRequest request) {
		logger.info("/security/login");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("security/login");
		return mav;
	}
}
