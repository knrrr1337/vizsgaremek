package mukodjman_backend.repository;

import mukodjman_backend.model.Followers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowersRepository extends JpaRepository<Followers, Integer> {
}
