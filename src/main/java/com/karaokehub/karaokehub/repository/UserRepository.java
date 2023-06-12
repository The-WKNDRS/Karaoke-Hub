package com.karaokehub.karaokehub.repository;

import com.karaokehub.karaokehub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {

	User findByUsername(String username);
}
