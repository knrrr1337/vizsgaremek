package mukodjman_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FollowedUser {

    private Long id;
    private String username;
    private String email;
    private String profilePicture;
    private String bio;

}
