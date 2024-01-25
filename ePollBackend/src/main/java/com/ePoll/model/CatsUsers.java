package com.ePoll.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data

@Table(name="CATS_USERS")
public class CatsUsers {
	
	@Id
	@Column(name="USER_ID",columnDefinition = "serial")
	private int User_ID;
	
	@Column(name="USER_NAME",nullable = false)
	@Size(min = 5, message = "Username should have at least 5 characters")
	
	private String user_Name;
	@Column(name="PASSWORD",nullable = false)
	@Size(min = 5, message = "Password should have at least 5 characters")
	private String password;

}
