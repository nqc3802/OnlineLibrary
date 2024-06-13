package com.example.web.shopping;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shopping")
public class Shopping {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idshopping;
	private int quantity;
	private int bookcode;
	@Column(name = "user_ID")
	private String userID;

	public Shopping() {
		super();
		// TODO Auto-generated constructor stub
		this.quantity = 1;
	}

	public Shopping(int idshopping, int quantity, int bookcode, String userID) {
		super();
		this.idshopping = idshopping;
		this.quantity = quantity;
		this.bookcode = bookcode;
		this.userID = userID;
	}

	public int getIdshopping() {
		return idshopping;
	}

	public void setIdshopping(int idshopping) {
		this.idshopping = idshopping;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getBookcode() {
		return bookcode;
	}

	public void setBookcode(int bookcode) {
		this.bookcode = bookcode;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

}
