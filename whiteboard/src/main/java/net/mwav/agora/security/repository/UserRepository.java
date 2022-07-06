package net.mwav.agora.security.repository;

import org.springframework.data.repository.CrudRepository;

import net.mwav.agora.security.entity.User;

public interface UserRepository extends CrudRepository<User, String> {

}
