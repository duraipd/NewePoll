package com.ePoll.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ePoll.model.PlaceholderEntity;



@Repository
public interface PlaceholderEntityRepository extends JpaRepository<PlaceholderEntity, Long> {
    
}
