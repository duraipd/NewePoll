package com.ePoll.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ePoll.service.DynamicTableService;

import java.util.List;
import java.util.Map;

@RestController
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
    
    @GetMapping("/table")
    
    public List<Map<String, Object>> getAllTable(){
    	System.out.println(dynamicTableService.getAllTable());
    	return dynamicTableService.getAllTable();
    }
    
//    @GetMapping("/tabledesc")
//    public List<Map<String, Object>> tabledesc(@PathVariable String tableName) {
//    	System.out.println(dynamicTableService.getTableData(tableName));
//        return dynamicTableService.getTableData(tableName);
//    }
    
}
