package bilgem.intern.eventmanagementsystem.applyEvent.entity;


import bilgem.intern.eventmanagementsystem.common.entity.BaseEntity;
import bilgem.intern.eventmanagementsystem.event.entity.Event;
import bilgem.intern.eventmanagementsystem.user.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
// Bu entity Event ve Users arasındaki köprüdür. Kullanıcının sisteme kayıt olduğu sıradaki bilgilerini
// tutmayı ve event ile user arasında bağlantı kurmamızı sağlar.
public class EventRegistration extends BaseEntity {

        @ManyToOne
        @JoinColumn(name = "user_id")
        Users user;

        @Getter
        @ManyToOne
        @JoinColumn(name = "event_id")
        Event event;

        LocalDate registeredAt;

        String identificationNumber;

        String firstName;

        String lastName;


}
