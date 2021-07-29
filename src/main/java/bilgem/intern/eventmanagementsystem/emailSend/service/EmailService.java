package bilgem.intern.eventmanagementsystem.emailSend.service;

import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;
import bilgem.intern.eventmanagementsystem.applyEvent.controller.request.EventRegistrationRequest;
import bilgem.intern.eventmanagementsystem.common.enums.MessageType;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.user.entity.Users;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;

    }

    // Kullanıcı herhangi bir etkinliğe katıldıktan sonra kullanıcıya bir e-posta gönderilmesini sağlar.
    public MessageType sendEmail(final EventRegistrationRequest request, final Users user, final Event event) {

        try {
            MimeMessage message = javaMailSender.createMimeMessage();

            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

            // Email ayarlarının yapılması ( gönderici, alıcı, metin ayarlanması)
            messageHelper.setFrom("derentoy@gmail.com");
            messageHelper.setTo(user.getEmail());
            messageHelper.setSubject("Qr Code and User Information");
            messageHelper.setText("Hello " + user.getUsername() + "," + "\n"
              +"Your information and qr code required to participate in the event called " + event.eventName() + " on "
                 +  event.startDate() + " are attached. We would like to remind you that you will not be able to attend the event after " +
                   event.finishDate() + ". Have fun! Participant Information: "  +
                     "\n" + "Identification Number: " + request.getIdentificationNumber()
                    + " First Name: " + request.getFirstName() +" Last Name: " + request.getLastName());

            // Kullanıcı ve etkinlik bilgileri ile Qr kod oluşturulması
            String qrValue = "Username: " + user.getUsername() + " Event Id: " +event.getId() +" Identification Number: "
                    + request.getIdentificationNumber() + " First Name: " + request.getFirstName() + " Last Name: " + request.getLastName();
            byte[] qrImg = QrCodeService.getQRCodeImage(qrValue,320,320);
            ByteArrayDataSource byteDataSource = new ByteArrayDataSource(qrImg, "image/png");

            // Qr kodun eke eklenmesi
            messageHelper.addAttachment("myqr.png", byteDataSource );
            // Mailin gönderilmesi
            javaMailSender.send(messageHelper.getMimeMessage());
            return MessageType.SUCCESS;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return MessageType.ERROR;
        }


    }



}
