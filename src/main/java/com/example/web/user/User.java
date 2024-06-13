package com.example.web.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "id_user")
public class User {
	@Id
	@Column(name = "user_ID")
	private String userID;
	private String username;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String userID, String username) {
		super();
		this.userID = userID;
		this.username = username;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
