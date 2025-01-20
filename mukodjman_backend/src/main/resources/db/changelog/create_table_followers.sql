CREATE TABLE followers (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           follower_id INT NOT NULL,
                           followed_id INT NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
                           FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
                           UNIQUE (follower_id, followed_id) -- Prevent duplicate follow entries
);