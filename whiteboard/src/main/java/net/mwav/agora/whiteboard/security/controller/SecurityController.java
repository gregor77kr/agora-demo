package net.mwav.agora.whiteboard.security.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
		mav.setViewName("security/sign-in-form");
		return mav;
	}

	@GetMapping(value = "/security/signup/form")
	public ModelAndView signupForm(@RequestParam(required = false) String message) {
		logger.debug("/security/signup/form");
		ModelAndView mav = new ModelAndView();

		mav.addObject("message", message);
		mav.setViewName("security/sign-up-form");
		return mav;
	}

	@PostMapping(value = "/security/signup")
	public ModelAndView signup(@Valid @ModelAttribute User user, BindingResult bindingResult, RedirectAttributes re) {
		logger.debug("/security/signup");
		ModelAndView mav = new ModelAndView();

		if (bindingResult.hasErrors()) {
			List<FieldError> errors = bindingResult.getFieldErrors();

			String message = errors.stream()
				.limit(1)
				.map(e -> e.getField() + " - " + e.getDefaultMessage())
				.collect(Collectors.joining(""));

			re.addAttribute("message", message);
			mav.setViewName("redirect:/security/signup/form");
		}

		mav.setViewName("redirect:/security/signup/form");
		return mav;
	}
}
