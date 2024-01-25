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
import java.util.Date;
@Entity
@Data
@Table(name="CATS_USERSLOG_DETAILS")
public class CatsUsersDetails{
		@Id
		@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen2")
		@SequenceGenerator(name="gen2",sequenceName="seq2", allocationSize=1)
		@Column(name="ID")
		private long id;
		@Column(name="USER_NAME" ,nullable=false)
		private String user_Name;
		@Column(name="LATITUDE")
		private double latitude;
		@Column(name="LONGITUDE")
		private double longitude;
		@Column(name="LOGGEDIN_TIME")
		private String loggedin_time;
		@Column(name="LOGGEDOUT_TIME")
		private String loggedout_time;
	}