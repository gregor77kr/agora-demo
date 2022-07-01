package net.mwav.agora.whiteboard.security.repository;

import org.springframework.data.repository.CrudRepository;

import net.mwav.agora.whiteboard.security.entity.UserAuthority;
import net.mwav.agora.whiteboard.security.entity.UserAuthorityPk;

public interface UserAuthorityRepository extends CrudRepository<UserAuthority, UserAuthorityPk> {

}
