package com.ePoll.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ePoll.model.CatsUsers;
import com.ePoll.model.CatsUsersDetails;
import com.ePoll.model.UserEntity;
import com.ePoll.service.CatsUsersServiceImpl;
import com.ePoll.service.DynamicTableService;

import jakarta.annotation.PostConstruct;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/api")


@CrossOrigin("http://localhost:3000")



public class CatsUsersController {
	
	@Autowired
	private CatsUsersServiceImpl catsUSerService;
	
	@Autowired
	private final DynamicTableService dynamicTableService;


	
//	@GetMapping("/login")
//	public String loginPage() {
//		return "LoginPage.html";
//	}

	@PostMapping("/login")
	public String loginValidation(@RequestBody UserEntity user) {
		System.out.println(user);
		
		CatsUsers user1 = new CatsUsers();
		user1.setUser_Name(user.getUser_Name());
		user1.setPassword(user.getPassword());
	
		
		return catsUSerService.userIDValidation(user1 );
	}
	
	@Autowired
    public CatsUsersController(DynamicTableService dynamicTableService) {
        this.dynamicTableService = dynamicTableService;
    }
 
    @GetMapping("/{tableName}")
    public List<Map<String, Object>> getTableData(@PathVariable String tableName) {
    	System.out.println(dynamicTableService.getTableData(tableName));
        return dynamicTableService.getTableData(tableName);
    }
    
//    @GetMapping("/table")
//    
//    public List<Map<String, Object>> getAllTable(){
//    	System.out.println(dynamicTableService.getAllTable());
//    	return dynamicTableService.getAllTable();
//    }
   
	

	
	
	
	
	
	
	

}
