package net.mwav.agora.whiteboard.room.entity;

import java.io.Serializable;

public class Room implements Serializable {

	private static final long serialVersionUID = -2979691637349482502L;

	private String uuid;

	private String teamUUID;

	private String appUUID;

	private boolean isRecord;

	private boolean isBan;

	private String createdAt;

	private int limit;

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getTeamUUID() {
		return teamUUID;
	}

	public void setTeamUUID(String teamUUID) {
		this.teamUUID = teamUUID;
	}

	public String getAppUUID() {
		return appUUID;
	}

	public void setAppUUID(String appUUID) {
		this.appUUID = appUUID;
	}

	public boolean isRecord() {
		return isRecord;
	}

	public void setRecord(boolean isRecord) {
		this.isRecord = isRecord;
	}

	public boolean isBan() {
		return isBan;
	}

	public void setBan(boolean isBan) {
		this.isBan = isBan;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	@Override
	public String toString() {
		return "Room [uuid=" + uuid + ", teamUUID=" + teamUUID + ", appUUID=" + appUUID + ", isRecord=" + isRecord
				+ ", isBan=" + isBan + ", createdAt=" + createdAt + ", limit=" + limit + "]";
	}

}
