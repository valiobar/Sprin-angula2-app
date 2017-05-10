package com.spring.Domain.repository;

import com.spring.Domain.Entities.Port;
import com.spring.Domain.Entities.Reggata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface PortRepository extends JpaRepository<Port,Long> {
    List<Port> findByName(String name);

    Port findOneByName(String name);


}
