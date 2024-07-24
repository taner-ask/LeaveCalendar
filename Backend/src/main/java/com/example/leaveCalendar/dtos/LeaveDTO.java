package com.example.leaveCalendar.dtos;

import java.util.Date;

public class LeaveDTO {
	private Long id;
	private Date startDate;
	private Date endDate;
	private int totalLeaveDays;
	private long userId;

	public LeaveDTO() {
	}

	public LeaveDTO(long id, Date startDate, Date endDate, int totalLeaveDays, long userId) {
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.totalLeaveDays = totalLeaveDays;
		this.userId = userId;
	}

	// Getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getTotalLeaveDays() {
		return totalLeaveDays;
	}

	public void setTotalLeaveDays(int totalLeaveDays) {
		this.totalLeaveDays = totalLeaveDays;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
}
