package bilgem.intern.eventmanagementsystem.user.repository;

import bilgem.intern.eventmanagementsystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    User getByUsername(String username);
}
