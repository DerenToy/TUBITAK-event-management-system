package bilgem.intern.eventmanagementsystem.authentication.entity;

import bilgem.intern.eventmanagementsystem.common.entity.BaseEntity;
import bilgem.intern.eventmanagementsystem.user.entity.Users;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// Kullanıcıların rollerini (yetkilerini) tutmak için kullandığımız entity'dir.
public class Authority extends BaseEntity implements GrantedAuthority {

    private String authority;

    @ManyToMany(mappedBy = "authorities")
    private Set<Users> users;


}