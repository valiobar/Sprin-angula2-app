package com.spring.Domain.repository;

import com.spring.Domain.Entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {

    User getOne(Long id);
    User getOneByEmail(String email);
    User getOneByEmailAndPassword(String email, String password);
    User findOneByUsername(String username);

}
