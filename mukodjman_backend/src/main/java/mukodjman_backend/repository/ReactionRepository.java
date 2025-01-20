package mukodjman_backend.repository;

import mukodjman_backend.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
}
