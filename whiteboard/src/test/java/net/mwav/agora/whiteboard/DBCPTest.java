package net.mwav.agora.whiteboard;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import com.zaxxer.hikari.HikariDataSource;

import net.mwav.agora.whiteboard.config.DBCPConfigurer;

@SpringBootTest
class DBCPTest {

	private static final Logger logger = LoggerFactory.getLogger(DBCPTest.class);

	@Inject
	private DBCPConfigurer dbcpConfigurer;

	@Inject
	private DataSource datasource;

	@Test
	void test() {
		logger.info(dbcpConfigurer.toString());
		assertEquals(datasource.getClass(), HikariDataSource.class);
	}

}