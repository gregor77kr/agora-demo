package net.mwav.agora.security.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import net.mwav.agora.security.entity.User;
import net.mwav.agora.security.service.UserDetailsServiceImpl;

@Controller
public class SecurityController {

	private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);

	@Inject
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@GetMapping(value = "/security/signin")
	public ModelAndView signinForm(@RequestParam(required = false) String message) {
		logger.debug("/security/signin?message=" + message);
		ModelAndView mav = new ModelAndView();

		mav.addObject("message", message);
		mav.setViewName("security/signin");
		return mav;
	}

	@GetMapping(value = "/security/signup")
	public ModelAndView signupForm(@RequestParam(required = false) String message) {
		logger.debug("/security/signup");
		ModelAndView mav = new ModelAndView();

		mav.addObject("message", message);
		mav.setViewName("security/signup");
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
			mav.setViewName("redirect:/security/signup");
			return mav;
		}

		try {
			userDetailsServiceImpl.addUser(user);
		} catch (DataIntegrityViolationException de) {
			re.addAttribute("message", de.getMessage());
			mav.setViewName("redirect:/security/signup");
			return mav;
		}

		re.addAttribute("message", "You have been signed up. Please sign in.");
		mav.setViewName("redirect:/security/signin");
		return mav;
	}
}
