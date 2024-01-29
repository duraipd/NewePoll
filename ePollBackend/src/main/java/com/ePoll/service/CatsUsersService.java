package com.ePoll.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePoll.model.CatsUsers;
import com.ePoll.model.CatsUsersDetails;
@Service
public interface CatsUsersService {
	
	public String userIDValidation(CatsUsers g , CatsUsersDetails c);

	
	
	

}
