package net.mwav.agora.whiteboard.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "agora")
@ConfigurationPropertiesScan
public class AgoraProperty {

	private String appIdentifier;

	private String accessKey;

	private String secretAccessKey;

	public String getAppIdentifier() {
		return appIdentifier;
	}

	public void setAppIdentifier(String appIdentifier) {
		this.appIdentifier = appIdentifier;
	}

	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public String getSecretAccessKey() {
		return secretAccessKey;
	}

	public void setSecretAccessKey(String secretAccessKey) {
		this.secretAccessKey = secretAccessKey;
	}

	@Override
	public String toString() {
		return "AgoraProperty [appIdentifier=" + appIdentifier + ", accessKey=" + accessKey + ", secretAccessKey="
				+ secretAccessKey + "]";
	}

}
