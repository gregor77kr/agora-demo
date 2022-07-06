package net.mwav.agora.security.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserAuthorityPk implements Serializable {

	private static final long serialVersionUID = 6209572047830267456L;

	private String userId;

	private String role;

	public UserAuthorityPk() {

	}

	public UserAuthorityPk(String userId, String role) {
		this.userId = userId;
		this.role = role;
	}

	@Override
	public int hashCode() {
		return Objects.hash(role, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserAuthorityPk other = (UserAuthorityPk) obj;
		return Objects.equals(role, other.role) && Objects.equals(userId, other.userId);
	}

}
