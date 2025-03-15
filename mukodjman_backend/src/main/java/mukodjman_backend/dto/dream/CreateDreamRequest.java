package mukodjman_backend.dto.dream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import mukodjman_backend.enums.Privacy;

@Getter
@Setter
@AllArgsConstructor
public class CreateDreamRequest {

    private String title;
    private String content;
    private long userId;
    private String tags;
    private Privacy privacy;

}
