package CareerVision.service;

import CareerVision.model.Event;
import CareerVision.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Async
    public void sendEventCreationConfirmation(Event event) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                message, 
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, 
                StandardCharsets.UTF_8.name()
            );

            Context context = new Context();
            context.setVariable("event", event);
            context.setVariable("formattedDate", 
                event.getEventDate().format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a"))
            );

            String htmlBody = templateEngine.process("emails/event-creation", context);

            helper.setTo(event.getOrganizerEmail());
            helper.setFrom("noreply@careervision.com");
            helper.setSubject("Event Created Successfully: " + event.getTitle());
            helper.setText(htmlBody, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            // Log error or handle appropriately
            System.err.println("Failed to send event creation email: " + e.getMessage());
        }
    }

    @Async
    public void sendEventRegistrationConfirmation(Event event, User user) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                message, 
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, 
                StandardCharsets.UTF_8.name()
            );

            Context context = new Context();
            context.setVariable("event", event);
            context.setVariable("user", user);
            context.setVariable("formattedDate", 
                event.getEventDate().format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a"))
            );

            String htmlBody = templateEngine.process("emails/event-registration", context);

            helper.setTo(user.getEmail());
            helper.setFrom("noreply@careervision.com");
            helper.setSubject("Event Registration Confirmation: " + event.getTitle());
            helper.setText(htmlBody, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            // Log error or handle appropriately
            System.err.println("Failed to send event registration email: " + e.getMessage());
        }
    }

    @Async
    public void sendEventCancellationConfirmation(Event event, User user) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                message, 
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, 
                StandardCharsets.UTF_8.name()
            );

            Context context = new Context();
            context.setVariable("event", event);
            context.setVariable("user", user);
            context.setVariable("formattedDate", 
                event.getEventDate().format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a"))
            );

            String htmlBody = templateEngine.process("emails/event-cancellation", context);

            helper.setTo(user.getEmail());
            helper.setFrom("noreply@careervision.com");
            helper.setSubject("Event Registration Cancelled: " + event.getTitle());
            helper.setText(htmlBody, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            // Log error or handle appropriately
            System.err.println("Failed to send event cancellation email: " + e.getMessage());
        }
    }
}
