package net.mwav.agora.whiteboard.token.constant;

/**
 * token prefix
 * SDK : agora console token
 * ROOM : room access token
 * TASK : file conversion task token
 */
public enum TokenPrefix {
	SDK("NETLESSSDK_"), ROOM("NETLESSROOM_"), TASK("NETLESSTASK_");

	private String value;

	TokenPrefix(String name) {
		this.value = name;
	}

	public String getValue() {
		return value;
	}
}