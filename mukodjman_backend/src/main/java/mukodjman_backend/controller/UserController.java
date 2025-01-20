package mukodjman_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import mukodjman_backend.dto.user.UserRead;
import mukodjman_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user/")
@Tag(name="felhasznalok", description="felhasznalok kontrollere")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/get/{id}")
    public UserRead getUser(@PathVariable int id) {
        return service.getUser(id);
    }

}
