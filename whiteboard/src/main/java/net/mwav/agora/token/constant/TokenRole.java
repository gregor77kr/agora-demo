package net.mwav.agora.token.constant;

public enum TokenRole {
	ADMIN("0"), WRITER("1"), READER("2");

	private String value;

	TokenRole(String name) {
		this.value = name;
	}

	public String getValue() {
		return value;
	}
}