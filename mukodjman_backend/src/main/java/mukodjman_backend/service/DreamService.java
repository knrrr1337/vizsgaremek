package mukodjman_backend.service;

import mukodjman_backend.enums.Privacy;
import mukodjman_backend.model.*;
import mukodjman_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DreamService {

    @Autowired
    private FollowersRepository followersRepository;

    @Autowired
    private DreamRepository dreamRepository;

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private DreamImageRepository dreamImageRepository;

    public List<Dream> getUserDreams(long id) {
        return dreamRepository.findAllByUserId(id);
    }

    public void createDream(long userId, String title, String content, Privacy privacy) {
        Dream dream = new Dream();
        User user = usersRepository.findById(userId).get();
        dream.setUser(user);
        dream.setTitle(title);
        dream.setContent(content);
        dream.setPrivacy(privacy);
        List<Reaction> reactions = new ArrayList<>();
        List<Comment> comments = new ArrayList<>();
        List<DreamImage> images = new ArrayList<>();
        dream.setReactions(reactions);
        dream.setComments(comments);
        dream.setCreated_at(LocalDateTime.now());
        dreamRepository.save(dream);
    }

    public void likePost(long postId, long userId) {
        Reaction reaction = new Reaction();
        reaction.setUserId(userId);
        reaction.setDreamId(postId);
        reaction.setCreated_at(LocalDateTime.now());
        reactionRepository.save(reaction);
    }

    public void deleteDream(long id) {
        dreamRepository.delete(id);
    }

    public List<Dream> getAllFollowedUsersDreams(Long userId) {
        List<Followers> followers = followersRepository.findAllByFollowerId(userId);
        List<Long> followedUserIds = followers.stream().map(follower -> follower.getFollowed().getId()).collect(Collectors.toList());
        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
        }
        return asd.stream()
                .filter(dream -> followedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }

    public void removeLikePost(Long postId, Long userId) {
        reactionRepository.removeLike(userId, postId);
    }

    public List<Dream> getLikedDreams(Long userId) {
        List<Long> reactions = reactionRepository.findDreamIdsByUserId(userId);
        return dreamRepository.findAllByIdIn(reactions);
//        for (Long reaction : reactions) {
//            System.out.println(reaction + " )))");
//        }

    }

    public List<Dream> getAllDreamsForUser(Long userId) {
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());
        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
        }
        return asd.stream()
                .filter(dream -> !blockedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }

    public List<Dream> getAllDreams(long id) {
        List<Followers> followers = followersRepository.findAllByFollowerId(id);
        List<Long> followedUserIds = followers.stream()
                .map(f -> f.getFollowed().getId())
                .collect(Collectors.toList());

        // Retrieve all dreams and filter them according to privacy rules.
        List<Dream> dreams = dreamRepository.findAll().stream()
                .filter(dream ->
                        dream.getUser().getId() == id ||
                                dream.getPrivacy() == Privacy.PUBLIC ||
                                (dream.getPrivacy() == Privacy.FOLLOWERS_ONLY && followedUserIds.contains(dream.getUser().getId()))
                )
                .collect(Collectors.toList());

        // Populate comments, reactions, and images for each dream.
        for (Dream dream : dreams) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            List<DreamImage> images = dreamImageRepository.findAllByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
            dream.setImages(images);
        }
        return dreams;
    }

//    public List<Dream> getAllDreams(long id) {
////        List<Dream> dreams = dreamRepository.findAll();
////        List<Followers> followers = followersRepository.findAllByFollowerId(id);
////        for (Dream dream : dreams) {
////            if (dream.getUser().getId() != id && dream.getPrivacy() == Privacy.PRIVATE) {
////                dreams.remove(dream);
////            }
////        }
////        return dreams;
//
//        List<Followers> followers = followersRepository.findAllByFollowerId(id);
//        List<Long> followedUserIds = followers.stream()
//                .map(f -> f.getFollowed().getId())
//                .collect(Collectors.toList());
//
//        // Retrieve all dreams and filter them according to privacy rules:
//        // - Include if dream privacy is PUBLIC
//        // - If privacy is FOLLOWERS_ONLY, include only if the current user follows the dream's poster.
//        return dreamRepository.findAll().stream()
//                .filter(dream ->
//                        dream.getUser().getId() == id ||
//                        dream.getPrivacy() == Privacy.PUBLIC ||
//                                (dream.getPrivacy() == Privacy.FOLLOWERS_ONLY && followedUserIds.contains(dream.getUser().getId()))
//                )
//                .collect(Collectors.toList());
//
//    }

    public List<Dream> getAllBlockedUsersDreams(Long userId) {
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());
        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
        }

        return asd.stream()
                .filter(dream -> blockedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }
}