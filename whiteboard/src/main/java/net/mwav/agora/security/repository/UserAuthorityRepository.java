package net.mwav.agora.security.repository;

import org.springframework.data.repository.CrudRepository;

import net.mwav.agora.security.entity.UserAuthority;
import net.mwav.agora.security.entity.UserAuthorityPk;

public interface UserAuthorityRepository extends CrudRepository<UserAuthority, UserAuthorityPk> {

}
