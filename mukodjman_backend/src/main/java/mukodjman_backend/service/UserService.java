package mukodjman_backend.service;

import mukodjman_backend.converter.UserConverter;
import mukodjman_backend.dto.user.UserRead;
import mukodjman_backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UsersRepository repository;

    public UserRead getUser(int id) {
        if (repository.existsById(id)) {
            return UserConverter.convertModelToRead(repository.getReferenceById(id));
        }
        return null;
    }

}
