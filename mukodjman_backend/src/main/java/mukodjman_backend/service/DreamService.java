package mukodjman_backend.service;

import mukodjman_backend.repository.DreamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DreamService {

    @Autowired
    private DreamRepository repository;

}
