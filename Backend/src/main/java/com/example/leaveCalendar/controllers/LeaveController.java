package com.example.leaveCalendar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.leaveCalendar.dtos.LeaveDTO;
import com.example.leaveCalendar.services.ILeaveService;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

	@Autowired
    private ILeaveService leaveService;

    @GetMapping("/getAllLeaves")
    public List<LeaveDTO> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    @PostMapping
    public LeaveDTO createLeave(@RequestBody LeaveDTO leaveDTO) {
        return leaveService.saveLeave(leaveDTO);
    }

    @GetMapping("/{id}")
    public LeaveDTO getLeaveById(@PathVariable Long id) {
        return leaveService.getLeaveById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
    }
    
    @GetMapping("/user/{userId}")
    public List<LeaveDTO> getLeavesByUserId(@PathVariable Long userId) {
        return leaveService.getLeavesByUserId(userId);
    }

}