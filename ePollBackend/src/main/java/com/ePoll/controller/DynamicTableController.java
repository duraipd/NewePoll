package com.ePoll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ePoll.model.PlaceholderEntity;
import com.ePoll.model.UserEntity;
import com.ePoll.service.DynamicTableService;

import java.util.List;
import java.util.Map;

@RestController


@CrossOrigin("http://localhost:3005")


@RequestMapping("/api/dynamic")
public class DynamicTableController {

	private final DynamicTableService dynamicTableService;

	@Autowired
	public DynamicTableController(DynamicTableService dynamicTableService) {
		this.dynamicTableService = dynamicTableService;
	}

	@GetMapping("/{tableName}")
	public List<Map<String, Object>> getTableData(@PathVariable String tableName) {
		System.out.println(dynamicTableService.getTableData(tableName));
		return dynamicTableService.getTableData(tableName);
	}

	@GetMapping("/table1/{table}")

	public List<Map<String, Object>> getAllFields(@PathVariable String table) {
		System.out.println(table+"...........");
		System.out.println(dynamicTableService.getTableFields(table));
		return dynamicTableService.getTableFields(table);
	}

	@GetMapping("/table")

	public List<Map<String, Object>> getAllTable() {
		System.out.println(dynamicTableService.getAllTable());
		return dynamicTableService.getAllTable();
	}

//    @GetMapping("/tabledesc")
//    public List<Map<String, Object>> tabledesc(@PathVariable String tableName) {
//    	System.out.println(dynamicTableService.getTableData(tableName));
//        return dynamicTableService.getTableData(tableName);
//    }

	@PutMapping("/Addtable")
	public List<Map<String, Object>> getTableData(@RequestBody UserEntity values) {

		System.out.println(values.getTableName());
		return dynamicTableService.getTableData(values);
	}

	@PostMapping("/addColumns")
     public void addColumns(@RequestBody List<UserEntity> columnDetailsList) {    
        for (UserEntity columnDetails : columnDetailsList) {
        	
        	dynamicTableService.addColumn(
                    columnDetails.getTableName(),
                    columnDetails.getColumnName(),
                    columnDetails.getDataType()
         
                   );
        }
    }
}
