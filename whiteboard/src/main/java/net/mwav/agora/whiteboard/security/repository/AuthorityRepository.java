package net.mwav.agora.whiteboard.security.repository;

import org.springframework.data.repository.CrudRepository;

import net.mwav.agora.whiteboard.security.entity.Authority;

public interface AuthorityRepository extends CrudRepository<Authority, String> {

}
