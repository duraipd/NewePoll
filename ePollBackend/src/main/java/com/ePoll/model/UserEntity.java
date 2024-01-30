package com.ePoll.model;

import lombok.Data;

@Data
public class UserEntity {
		public int user_id;
		public String user_Name;
		private String password;
		public String  Latitude;
		public String  longitude;
//		public String userLocation;
		public String currentDateTime;
		public	String tableName;
		public String columnName;
		public String dataType;
}
