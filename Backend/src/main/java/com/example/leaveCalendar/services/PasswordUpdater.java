//package com.example.leaveCalendar.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.example.leaveCalendar.repository.UserRepository;
//
//@Component
//public class PasswordUpdater implements CommandLineRunner {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        userRepository.findAll().forEach(user -> {
//            user.setPassword(encoder.encode(user.getPassword()));
//            userRepository.save(user);
//        });
//    }
//}
//
//                 **Sadece veri tabanındaki kullanıcı bilgilerini şifrelemek isteyince aç**