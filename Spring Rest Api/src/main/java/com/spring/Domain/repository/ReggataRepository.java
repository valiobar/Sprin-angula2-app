package com.spring.Domain.repository;

import com.spring.Domain.Entities.Reggata;
import com.spring.Domain.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ReggataRepository extends JpaRepository<Reggata,Long> {
   List<Reggata> findTop5ByOrderByCreatedDesc();


}
