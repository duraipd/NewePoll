package com.ePoll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ePoll.model.CatsUsers;

@Repository
public interface CatsUsersRepository extends JpaRepository<CatsUsers, Integer> {
	
	

}
