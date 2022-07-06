package net.mwav.agora.security.constant;

public enum Authority {

	ROLE_ADMIN("ADMIN"), ROLE_WRITER("WRITER"), ROLE_READER("READER");

	private String authority;

	Authority(String authority) {
		this.authority = authority;
	}

	public String getValue() {
		return authority;
	}

}
