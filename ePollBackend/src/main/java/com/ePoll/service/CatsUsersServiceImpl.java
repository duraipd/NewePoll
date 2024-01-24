package com.ePoll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ePoll.repository.CatsUsersRepository;

@Service
public class CatsUsersServiceImpl implements CatsUsersService {
	
	@Autowired
	private CatsUsersRepository catsUsersRepo;

	@Override
	public void userIDValidation(String user_name, String password) {
		
		
	}
	

}
