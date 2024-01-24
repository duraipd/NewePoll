package com.ePoll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePoll.service.CatsUsersServiceImpl;

@RestController
public class CatsUsersController {
	
	@Autowired
	private CatsUsersServiceImpl catsUSerService;
	
//	@RequestMapping("/login")
	@GetMapping("/login")
	public String loginPage() {
		return "LoginPage.html";
		

	}
	
	
	

}
