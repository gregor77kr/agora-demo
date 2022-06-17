package net.mwav.agora.whiteboard.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@ConfigurationProperties(prefix = "jdbc")
public class DBCPConfigurer {

	private String url;

	private String username;

	private String password;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "JDBCProperty [url=" + url + ", username=" + username + ", password=" + password + "]";
	}

	@Bean
	public DataSource hikariDataSource() {
		HikariDataSource datasource = DataSourceBuilder.create()
				.type(HikariDataSource.class)
				.url(url)
				.username(username)
				.password(password)
				.build();

		datasource.setConnectionTestQuery("SELECT 1");
		datasource.setPoolName("Hikari");

		return datasource;
	}

}
