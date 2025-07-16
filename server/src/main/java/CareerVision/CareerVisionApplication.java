package CareerVision;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class }, scanBasePackages = "CareerVision")
public class CareerVisionApplication {
	public static void main(String[] args) {
		SpringApplication.run(CareerVisionApplication.class, args);
	}
}
