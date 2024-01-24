package com.ePoll.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePoll.model.CatsUsers;
import com.ePoll.service.CatsUsersServiceImpl;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;



@Controller
public class CatsUsersController {
	
	@Autowired
	private CatsUsersServiceImpl catsUSerService;
	

	@GetMapping("/login")
	public String loginPage() {
		return "LoginPage.html";
		

	}

	@GetMapping("/validation")
	@ResponseBody
	public String validi(CatsUsers g) {
		
		catsUSerService.userIDValidation(g);
		return "Welcome";
	}
	
	
	
	
	
	
	

}
