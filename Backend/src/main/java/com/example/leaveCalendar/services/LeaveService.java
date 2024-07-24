package com.example.leaveCalendar.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.leaveCalendar.dtos.LeaveDTO;
import com.example.leaveCalendar.mappers.ILeaveMapper;
import com.example.leaveCalendar.models.Leave;
import com.example.leaveCalendar.models.User;
import com.example.leaveCalendar.repository.LeaveRepository;
import com.example.leaveCalendar.repository.UserRepository;

@Service
public class LeaveService implements ILeaveService {

	@Autowired
	private LeaveRepository leaveRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ILeaveMapper leaveMapper;

	@Override
	public List<LeaveDTO> getAllLeaves() {
		return leaveRepository.findAll().stream().map(leaveMapper::toDTO).collect(Collectors.toList());
	}

    @Override
    public LeaveDTO saveLeave(LeaveDTO leaveDTO) {
        Leave leave = leaveMapper.toEntity(leaveDTO);

        User user = userRepository.findById(leaveDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        leave.setUser(user);

        return leaveMapper.toDTO(leaveRepository.save(leave));
    }

	@Override
	public LeaveDTO getLeaveById(Long id) {
		return leaveRepository.findById(id).map(leaveMapper::toDTO).orElse(null);
	}

	@Override
	public void deleteLeave(Long id) {
		leaveRepository.deleteById(id);
	}
	
	@Override
	public List<LeaveDTO> getLeavesByUserId(Long userId) {
	    return leaveRepository.findByUserId(userId).stream()
	            .map(leaveMapper::toDTO)
	            .collect(Collectors.toList());
	}

}