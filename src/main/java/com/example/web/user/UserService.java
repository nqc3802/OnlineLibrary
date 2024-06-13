package com.example.web.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;
	
	public User getUser(String userID) {
	    Optional<User> optionalUser = ur.findById(userID);
	    return optionalUser.orElse(null);
	}

}
