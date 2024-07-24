package com.example.leaveCalendar.mappers;
import com.example.leaveCalendar.dtos.LeaveDTO;
import com.example.leaveCalendar.models.Leave;

public interface ILeaveMapper {
    LeaveDTO toDTO(Leave leave);
    Leave toEntity(LeaveDTO leaveDTO);
}
