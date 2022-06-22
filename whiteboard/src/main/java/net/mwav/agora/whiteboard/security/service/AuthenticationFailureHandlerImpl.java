package net.mwav.agora.whiteboard.security.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFailureHandlerImpl implements AuthenticationFailureHandler {

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationFailureHandlerImpl.class);

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		logger.info("exception : " + exception);

		String message = null;

		if (exception instanceof AuthenticationCredentialsNotFoundException) {
			message = "Id or password is requried";
		} else if (exception instanceof UsernameNotFoundException) {
			message = "Invalid id or password";
		} else {
			message = "Sign in failed. Please Retry or contact to Customer service team.";
		}

		response.sendRedirect(request.getContextPath() + "/security/signin/form?message=" + message);
	}
}
