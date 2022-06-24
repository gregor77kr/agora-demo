package net.mwav.agora.whiteboard.security.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import net.mwav.agora.whiteboard.security.entity.User;

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

	@PostMapping(value = "/security/signup")
	public ModelAndView signup(@Valid @ModelAttribute User user, BindingResult bindingResult, RedirectAttributes attributes) {
		logger.debug("/security/signup");
		ModelAndView mav = new ModelAndView();

		if (bindingResult.hasErrors()) {

		}

		mav.setViewName("redirect:/security/signup/form");
		return mav;
	}
}
