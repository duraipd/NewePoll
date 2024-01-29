package com.ePoll.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DynamicTableService {

    private final JdbcTemplate jdbcTemplate;
    
    

    @Autowired
    public DynamicTableService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getTableData(String tableName) {
        String sql = "SELECT * FROM " + tableName;
        return jdbcTemplate.queryForList(sql);
    }
    
    public List<Map<String, Object>> getAllTable(){
    	String sql ="SELECT  table_name\r\n"
    			+ "FROM information_schema.tables\r\n"
    			+ "WHERE table_schema = 'public';";
    	
    	return jdbcTemplate.queryForList(sql);
    	
    }
    
    public List<Map<String, Object>> getTableData(String tableName, String colname, String dataType) {
    	
    	String sql = "ALTER TABLE " + tableName+" ADD COLUMN "+colname+" "+dataType;
    	
          return jdbcTemplate.queryForList(sql);
    }
    
//    public List<Map<String, Object>> tabledesc(String tableName){
//    	String sql="select column_name,is_nullable,data_type "
//    			+ "from information_schema.columns where table_name "+tableName;
//    	return jdbcTemplate.queryForList(sql);
//    }
    
    
    
}
