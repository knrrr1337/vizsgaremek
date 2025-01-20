package mukodjman_backend.repository;

import mukodjman_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<User, Integer> {
}
