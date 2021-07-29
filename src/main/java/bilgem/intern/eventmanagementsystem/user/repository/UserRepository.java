package bilgem.intern.eventmanagementsystem.user.repository;

import bilgem.intern.eventmanagementsystem.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    Boolean existsByUsername(String username);

    Users getByUsername(String username);
}
