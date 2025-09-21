package dev.agarcia.taskard.data.models.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void save(User user);

    Optional<User> getByEmail(String email);

    List<User> getAll();

    User getById(Long id);
}
