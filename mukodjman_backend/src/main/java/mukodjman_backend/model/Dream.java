package mukodjman_backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mukodjman_backend.enums.Privacy;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dreams")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Dream {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 255)
    private String tags;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Privacy privacy;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "dream")
    private List<Comment> comments;

    @OneToMany(mappedBy = "dream")
    private List<Reaction> reactions;
}