CREATE TABLE dreams (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        user_id INT NOT NULL,
                        title VARCHAR(100) NOT NULL,
                        content TEXT NOT NULL,
                        tags VARCHAR(255),
                        privacy ENUM('private', 'public') DEFAULT 'private',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);