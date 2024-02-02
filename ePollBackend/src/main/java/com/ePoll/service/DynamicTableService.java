package com.ePoll.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.ePoll.model.UserEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

@Service
public class DynamicTableService {

    private final JdbcTemplate jdbcTemplate;
    
    

    @Autowired
    public DynamicTableService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

  public  List<Map<String, Object>> getTableData(String tableName) {
       
    	
    	
    	String sql = "SELECT * FROM " + tableName;
         List<Map<String, Object>> queryForList = jdbcTemplate.queryForList(sql);
         int size = queryForList.size();
        System.out.println(size);
        
        if (size>0) {
			return queryForList;
		} else {
 
    	   String sql1 = "SELECT column_name as COLUMN FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ?";
    	   List<Map<String, Object>> quer = jdbcTemplate.queryForList(sql1, tableName);
    	
   	
    	   System.out.println(quer.size());
    	   
    	   
    	   
    	   List<Map<String,Object>> q=new ArrayList<Map<String,Object>>();
    	   
    	   Map<String, Object>  m=new HashMap<>();
    	   Object value ="";
    	   String string ="";
    	   
    	   for (int i = 0; i < quer.size(); i++) {
			
    		   Set<Entry<String,Object>> entrySet = quer.get(i).entrySet();
    		   
    		   for (Entry<String, Object> entry : entrySet) {
    			   value = entry.getValue();
    			   string = value.toString();
        		   m.put(entry.getValue().toString(), "");
        		   System.out.println(string);
    			
    			   }		   
    		  }
    	   q.add(m);
    	   return q;
	}
    }
    
    public List<Map<String, Object>> getTableFields(String table){
    	String sql = "SELECT column_name, data_type, is_nullable " +
                "FROM INFORMATION_SCHEMA.COLUMNS " +
                "WHERE table_name = ?";
   
   return jdbcTemplate.queryForList(sql, table);
    	
    }
    
   
    public List<Map<String, Object>> getAllTable(){
        	String sql ="SELECT  table_name\r\n"
        			+ "FROM information_schema.tables\r\n"
        			+ "WHERE table_schema = 'public';";
        	
        	return jdbcTemplate.queryForList(sql);
        	
        }
    
    public List<Map<String, Object>> getTableData(UserEntity values) {
    	
    	String tableName = values.getTableName();
    	String colname= values.getColumnName();
    	String dataType= values.getDataType();
    	
    	String sql = "ALTER TABLE " + tableName+" ADD COLUMN "+colname+" "+dataType;
    	
          return jdbcTemplate.queryForList(sql);
    }
    
  public void addColumn(String tableName, String columnName, String dataType){
    	
    	
    		
        String sql = "ALTER TABLE " + tableName + " ADD COLUMN " + columnName + " " + dataType;
 
        jdbcTemplate.update(sql);
       	 
    	}
  
  
  
  

    
  }
