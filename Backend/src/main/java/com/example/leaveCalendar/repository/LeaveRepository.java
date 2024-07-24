package com.example.leaveCalendar.repository;

import org.springframework.stereotype.Repository;

import com.example.leaveCalendar.models.Leave;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByUserId(long userId);
}