package mukodjman_backend.repository;

import mukodjman_backend.model.Dream;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DreamRepository extends JpaRepository<Dream, Integer> {
}
