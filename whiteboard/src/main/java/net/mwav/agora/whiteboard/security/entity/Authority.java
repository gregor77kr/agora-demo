package net.mwav.agora.whiteboard.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "Authority")
public class Authority implements GrantedAuthority {

	private static final long serialVersionUID = 5792321961413369652L;

	@Id
	private String role;

	@Column
	private String roleName;

	@Column
	private String roleDesc;

	@Override
	@Deprecated
	public String getAuthority() {
		return this.role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public void setAuthority(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Authority [role=" + role + ", roleName=" + roleName + ", roleDesc=" + roleDesc + "]";
	}

}
