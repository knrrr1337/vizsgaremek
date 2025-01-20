package mukodjman_backend.service;

import mukodjman_backend.repository.FollowersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowersService {

    @Autowired
    private FollowersRepository repository;

}

