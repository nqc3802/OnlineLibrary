package com.example.web.cart;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_cart;
	private int quantity;
	private int bookcode;
	@Column(name = "user_ID")
	private String userID;

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
		this.quantity = 1;
	}

	public Cart(int id_cart, int quantity, int bookcode, String userID) {
		super();
		this.id_cart = id_cart;
		this.quantity = quantity;
		this.bookcode = bookcode;
		this.userID = userID;
	}

	public int getId_cart() {
		return id_cart;
	}

	public void setId_cart(int id_cart) {
		this.id_cart = id_cart;
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
