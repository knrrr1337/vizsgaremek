package mukodjman_backend.service;

import mukodjman_backend.model.Comment;
import mukodjman_backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public void saveComment(long userId, long dreamId, String content) {
        Comment comment = new Comment();
        comment.setUserId(userId);
        comment.setDreamId(dreamId);
        comment.setContent(content);
        comment.setCreated_at(LocalDateTime.now());
        repository.save(comment);
    }

}
