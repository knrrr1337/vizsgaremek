package mukodjman_backend.repository;

import jakarta.transaction.Transactional;
import mukodjman_backend.model.Dream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DreamRepository extends JpaRepository<Dream, Long> {

    List<Dream> findAllByUserId(long userId);
    List<Dream> findAllByIdIn(List<Long> ids);

    @Modifying
    @Transactional
    @Query("DELETE FROM Dream d WHERE d.id = :id")
    void delete(@Param("id") long id);

    @Modifying
    @Transactional
    @Query("UPDATE Dream d SET d.title = :title, d.content = :content WHERE d.id = :dreamId")
    void editDream(@Param("dreamId") long id, @Param("title") String title, @Param("content") String content);

}
