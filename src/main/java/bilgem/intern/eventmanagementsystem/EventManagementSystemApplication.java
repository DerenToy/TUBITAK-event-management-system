package bilgem.intern.eventmanagementsystem;

import bilgem.intern.eventmanagementsystem.authentication.configuration.DatabasePopulator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class EventManagementSystemApplication {


	private final DatabasePopulator databasePopulator;

	public EventManagementSystemApplication(DatabasePopulator databasePopulator) {
		this.databasePopulator = databasePopulator;
	}

	public static void main(String[] args) {
		SpringApplication.run(EventManagementSystemApplication.class, args);
	}

	@PostConstruct //en son yapılan iş
	public void populateDatabase() {
		databasePopulator.populateDatabase();
	}

}
