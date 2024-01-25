package com.ePoll.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ePoll.model.CatsUsersDetails;
@Repository
public interface CatsUsersDetailsRepository extends JpaRepository<CatsUsersDetails, Long>{
}