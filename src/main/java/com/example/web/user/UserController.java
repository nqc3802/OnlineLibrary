package com.example.web.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {
	@Autowired
	private UserService us;
	
	@GetMapping("/user/{userID}")
	public User getUser(@PathVariable String userID) {
		return us.getUser(userID);
	}
}
