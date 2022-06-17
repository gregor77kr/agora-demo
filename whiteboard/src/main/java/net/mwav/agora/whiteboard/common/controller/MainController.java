package net.mwav.agora.whiteboard.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

	@GetMapping(value = "/")
	public String index(HttpServletRequest request) {
		logger.info("/");
		return "index";
	}

}
