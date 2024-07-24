package com.example.leaveCalendar.services;

import com.example.leaveCalendar.models.User;

public interface IUserService {
    User findByUsername(String username);
    User saveUser(User user);

}