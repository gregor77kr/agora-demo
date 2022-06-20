package net.mwav.agora.whiteboard.security.repository;

import org.springframework.data.repository.CrudRepository;

import net.mwav.agora.whiteboard.security.entity.User;

public interface UserRepository extends CrudRepository<User, String> {

}
