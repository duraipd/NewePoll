package com.ePoll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ePoll.model.CatsUsers;
import com.ePoll.service.CatsUsersServiceImpl;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")

public class CatsUsersController {
	
	@Autowired
	private CatsUsersServiceImpl catsUSerService;

	
//	@GetMapping("/login")
//	public String loginPage() {
//		return "LoginPage.html";
//	}

	@GetMapping("/login")
	@ResponseBody
	public String loginValidation(CatsUsers g) {
		System.out.println(g.getUser_Name());
		catsUSerService.userIDValidation(g);
		return "Welcome";
	}
	
	
	
	
	
	
	

}
