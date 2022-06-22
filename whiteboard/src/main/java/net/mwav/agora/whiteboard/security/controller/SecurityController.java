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

	@GetMapping(value = "/security/signin/form")
	public ModelAndView signinForm(@RequestParam(required = false) String message) {
		logger.debug("/security/signin/form?message=" + message);
		ModelAndView mav = new ModelAndView();

		mav.addObject("message", message);
		mav.setViewName("security/signin/form");
		return mav;
	}

	@GetMapping(value = "/security/signup/form")
	public ModelAndView signupForm() {
		logger.debug("/security/signup/form");
		ModelAndView mav = new ModelAndView();

		mav.setViewName("security/signup/form");
		return mav;
	}
}
