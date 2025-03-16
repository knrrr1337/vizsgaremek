package mukodjman_backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import mukodjman_backend.dto.Login.LoginRequest;
import mukodjman_backend.dto.customDream;
import mukodjman_backend.dto.dream.CommentRequest;
import mukodjman_backend.dto.dream.CreateDreamRequest;
import mukodjman_backend.dto.dream.LikeRequest;
import mukodjman_backend.dto.user.PostUser;
import mukodjman_backend.enums.Privacy;
import mukodjman_backend.model.Block;
import mukodjman_backend.model.Dream;
import mukodjman_backend.model.Reaction;
import mukodjman_backend.model.User;
import mukodjman_backend.service.CommentService;
import mukodjman_backend.service.DreamService;
import mukodjman_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("dream/")
@Tag(name="dreams", description="komoly dreams")
public class DreamController {

    @Autowired
    private DreamService dreamService;

    @Autowired
    CommentService commentService;

    @GetMapping("list-dreams-all/{id}")
    public List<customDream> listDreams(@PathVariable long id) {
        List<Dream> dreams = dreamService.getAllDreams(id);
        List<customDream> anyad = new ArrayList<>();
        for (Dream dream : dreams) {
            anyad.add(convertToDTO(dream));

        }
        anyad.sort((d1, d2) -> d2.getCreatedAt().compareTo(d1.getCreatedAt()));
        return anyad;
    }

    @DeleteMapping("delete-dream/{id}")
    public void deleteDream(@PathVariable long id) {
        dreamService.deleteDream(id);
    }

//    @PostMapping("create-dream")
//    public void createDream(@RequestBody CreateDreamRequest cdr) {
////        System.out.println(cdr.getUserId());
//        dreamService.createDream(cdr.getUserId(), cdr.getTitle(), cdr.getContent(), cdr.getPrivacy());
//    }

    @PostMapping(value = "create-dream", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createDream(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userId") Long userId,
            @RequestParam("privacy") Privacy privacy,
//            @RequestParam("tags") String tags,
            @RequestParam(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        String uploadDir = "uploads/";
        List<String> imageUrls = new ArrayList<>();

        if (images != null) {
            for (MultipartFile image : images) {
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path path = Paths.get(uploadDir + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes());
                imageUrls.add(fileName);
            }
        }

        dreamService.createDream(userId, title, content, privacy, imageUrls);
    }

    @GetMapping("get-user-dreams/{id}")
    public List<customDream> listUserDreams(@PathVariable long id) {
        List<Dream> dreams = dreamService.getUserDreams(id);
        List<customDream> anyad = new ArrayList<>();
        for (Dream dream : dreams) {
            anyad.add(convertToDTO(dream));
        }
        anyad.sort((d1, d2) -> d2.getCreatedAt().compareTo(d1.getCreatedAt()));
        return anyad;
    }

    @PostMapping("remove-like-post/{id}")
    public void removeLikePost(@PathVariable Long id, @RequestBody LikeRequest likeRequest) {
        dreamService.removeLikePost(id, likeRequest.getUserId());
    }

    @GetMapping("get-followed/{userId}")
    public List<customDream> getAllFollowedDreams(@PathVariable Long userId) {
        List<Dream> dreams = dreamService.getAllFollowedUsersDreams(userId);
        List<customDream> anyad = new ArrayList<>();
        for (Dream dream : dreams) {
            anyad.add(convertToDTO(dream));
        }
        anyad.sort((d1, d2) -> d2.getCreatedAt().compareTo(d1.getCreatedAt()));
        return anyad;
    }

    @GetMapping("get-blocked/{userId}")
    public List<customDream> getBlockedDreams(@PathVariable Long userId) {
        List<Dream> dreams = dreamService.getAllBlockedUsersDreams(userId);
        List<customDream> anyad = new ArrayList<>();
        for (Dream dream : dreams) {
            anyad.add(convertToDTO(dream));
        }
        anyad.sort((d1, d2) -> d2.getCreatedAt().compareTo(d1.getCreatedAt()));
        return anyad;
    }

    @GetMapping("user-liked-posts/{id}")
    public List<Dream> getLikedDreams(@PathVariable long id) {
        List<Dream> sad = dreamService.getLikedDreams(id);
        return sad;
//        dreamService.getLikedDreams(id);
    }

    @PostMapping("like-post/{id}")
    public void likeDream(@RequestBody LikeRequest likeRequest) {
        System.out.println(likeRequest.getPostId() + " " + likeRequest.getUserId());
        dreamService.likePost(likeRequest.getPostId(), likeRequest.getUserId());
    }

    @PostMapping("comment-on-dream/{id}")
    public void commentOnDream(@PathVariable long id, @RequestBody CommentRequest commentRequest) {
        commentService.saveComment(commentRequest.getUserId(), id, commentRequest.getComment());
    }



    private customDream convertToDTO(Dream dream) {
        customDream dto = new customDream();
        dto.setId(dream.getId());
        dto.setUser(convertUserToPostUser(dream.getUser()));
        dto.setTitle(dream.getTitle());
        dto.setContent(dream.getContent());
        dto.setTags(dream.getTags());
        dto.setPrivacy(dream.getPrivacy());
        dto.setCreatedAt(dream.getCreated_at());
        dto.setComments(dream.getComments());
        dto.setReactions(dream.getReactions());
        dto.setCreatedAt(dream.getCreated_at());
        dto.setImages(dream.getImages());
        return dto;
    }


    private PostUser convertUserToPostUser(User user) {
        PostUser postUser = new PostUser();
        postUser.setId(user.getId());
        postUser.setUsername(user.getUsername());
        postUser.setProfilePicture(user.getProfilePicture());
        postUser.setBio(user.getBio());
        postUser.setCreated_at(user.getCreated_at());
        return postUser;
    }
}


