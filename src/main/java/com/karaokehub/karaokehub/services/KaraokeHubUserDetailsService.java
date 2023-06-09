package com.karaokehub.karaokehub.services;

import com.karaokehub.karaokehub.models.KaraokeHubUserDetails;
import com.karaokehub.karaokehub.models.User;
import com.karaokehub.karaokehub.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class KaraokeHubUserDetailsService implements UserDetailsService {

	public final UserRepository userDao;

	public KaraokeHubUserDetailsService(UserRepository userDao) {
		this.userDao = userDao;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		} else {
			return new KaraokeHubUserDetails(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
		}
	}
}
