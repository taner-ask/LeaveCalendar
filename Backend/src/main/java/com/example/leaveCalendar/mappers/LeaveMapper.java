package com.example.leaveCalendar.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.example.leaveCalendar.dtos.LeaveDTO;
import com.example.leaveCalendar.models.Leave;

@Configuration
public class LeaveMapper implements ILeaveMapper {

	private ModelMapper modelMapper;

    @Autowired
    public LeaveMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public LeaveDTO toDTO(Leave leave) {
        return modelMapper.map(leave, LeaveDTO.class);
    }

    @Override
    public Leave toEntity(LeaveDTO dto) {
        return modelMapper.map(dto, Leave.class);
    }
}
