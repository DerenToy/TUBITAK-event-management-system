package bilgem.intern.eventmanagementsystem.user.entity;

import bilgem.intern.eventmanagementsystem.authentication.entity.Authority;
import bilgem.intern.eventmanagementsystem.common.entity.BaseEntity;
import bilgem.intern.eventmanagementsystem.applyEvent.entity.EventRegistration;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Users extends BaseEntity implements UserDetails {

    private String email;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user")
    Set<EventRegistration> registrations;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private Set<Authority> authorities;


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
