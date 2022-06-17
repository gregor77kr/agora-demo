package net.mwav.agora.whiteboard.security.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SecurityController {

	private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);

	@GetMapping(value = "/security/form")
	public ModelAndView form(@RequestParam(required = false) String message) {
		ModelAndView mav = new ModelAndView();
		logger.info(message);

		mav.addObject("message", message);
		mav.setViewName("security/form");
		return mav;
	}
}
