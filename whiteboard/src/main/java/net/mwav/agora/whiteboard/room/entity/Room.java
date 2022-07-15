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

	public boolean getIsRecord() {
		return isRecord;
	}

	public void setIsRecord(boolean isRecord) {
		this.isRecord = isRecord;
	}

	public boolean getIsBan() {
		return isBan;
	}

	public void setIsBan(boolean isBan) {
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((uuid == null) ? 0 : uuid.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Room other = (Room) obj;
		if (uuid == null) {
			if (other.uuid != null)
				return false;
		} else if (!uuid.equals(other.uuid))
			return false;
		return true;
	}

}
