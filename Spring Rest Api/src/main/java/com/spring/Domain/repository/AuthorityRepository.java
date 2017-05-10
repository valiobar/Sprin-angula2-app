package com.spring.Domain.repository;

import com.spring.Domain.Entities.Role;
import com.spring.Domain.Entities.AuthorityName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by UserX on 4/23/2017.
 */
public interface AuthorityRepository extends JpaRepository<Role,Long> {
        List<Role> findByName(String name);
         Role findOneByName(AuthorityName name);
}
