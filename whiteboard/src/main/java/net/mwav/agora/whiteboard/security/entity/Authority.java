package net.mwav.agora.whiteboard.security.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class Authority implements GrantedAuthority {

	private static final long serialVersionUID = 5792321961413369652L;

	@Id
	private String role;

	private String roleName;

	private String roleDesc;

	@Override
	@Deprecated
	public String getAuthority() {
		return this.role;
	}

	public String getRole() {
		return role;
	}

	public String getRoleName() {
		return roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	@Override
	public String toString() {
		return "Authority [role=" + role + ", roleName=" + roleName + ", roleDesc=" + roleDesc + "]";
	}

}
