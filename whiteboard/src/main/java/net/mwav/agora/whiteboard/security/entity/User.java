package net.mwav.agora.whiteboard.security.entity;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class User implements UserDetails {

	private static final long serialVersionUID = 2350458119234468430L;

	private String userId;

	private String password;

	private String userName;

	private String email;

	private String region;

	private boolean isEnabled;

	private Collection<? extends GrantedAuthority> authorities;

	/**
	 * do not use this method.
	 * Instead, use {@link #getUserId()}
	 */
	@Override
	@Deprecated
	public String getUsername() {
		return this.userId;
	}

	public String getUserId() {
		return this.userId;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	public String getUserName() {
		return this.userName;
	}

	public String getEmail() {
		return this.email;
	}

	public String getRegion() {
		return this.region;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.isEnabled;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", password=" + password
				+ ", userName=" + userName + ", email=" + email
				+ ", region=" + region + ", isEnabled=" + isEnabled + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(userId, other.userId);
	}

}
