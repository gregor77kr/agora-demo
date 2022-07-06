package net.mwav.agora.security.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table
@IdClass(UserAuthorityPk.class)
public class UserAuthority implements GrantedAuthority {

	private static final long serialVersionUID = -5083235529818164186L;

	@Id
	private String userId;

	@Id
	private String role;

	@Override
	@Deprecated
	public String getAuthority() {
		return role;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserAuthority [userId=" + userId + ", role=" + role + "]";
	}

}
