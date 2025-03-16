package mukodjman_backend.repository;

import mukodjman_backend.model.DreamImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DreamImageRepository extends JpaRepository<DreamImage, Long> {

    List<DreamImage> findAllByDreamId(@Param("dreamId") Long dreamId);

}
