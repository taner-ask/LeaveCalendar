package com.example.leaveCalendar.services;

import com.example.leaveCalendar.dtos.LeaveDTO;

import java.util.List;

public interface ILeaveService {
    List<LeaveDTO> getAllLeaves();
    LeaveDTO saveLeave(LeaveDTO leaveDTO);
    LeaveDTO getLeaveById(Long id);
    void deleteLeave(Long id);
    List<LeaveDTO> getLeavesByUserId(Long userId);
}