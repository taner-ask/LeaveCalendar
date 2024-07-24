package com.example.leaveCalendar.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
	private static final long serialVersionUID = 1L;
	private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId(); // Kullanıcı ID'sini döndür
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // Kullanıcı şifresi
    }

    @Override
    public String getUsername() {
        return user.getUsername(); // Kullanıcı adı
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Hesap süresi dolmuş mu?
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Hesap kilitli mi?
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Kimlik bilgileri süresi dolmuş mu?
    }

    @Override
    public boolean isEnabled() {
        return true; // Hesap aktif mi?
    }
}
