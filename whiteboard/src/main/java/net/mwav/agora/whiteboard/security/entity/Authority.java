package net.mwav.agora.whiteboard.security.entity;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {

	private static final long serialVersionUID = 5792321961413369652L;

	private String role;

	@Override
	public String getAuthority() {
		return this.role;
	}

	public void setAuthority(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Authority [role=" + role + "]";
	}

}
