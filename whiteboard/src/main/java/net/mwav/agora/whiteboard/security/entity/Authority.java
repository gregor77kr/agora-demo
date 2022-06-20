package net.mwav.agora.whiteboard.security.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Authority {

	@Id
	private String role;

	private String roleName;

	private String roleDesc;

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
