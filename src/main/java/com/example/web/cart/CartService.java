package com.example.web.cart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.web.user.User;

@Service
public class CartService {
	@Autowired
	private CartRepository cr;

	public List<Cart> getCart(String userID) {
		return cr.findByUserID(userID);
	}

	public Cart getOneCart(String userID, int bookcode) {
		return cr.findByUserIDAndBookcode(userID, bookcode);
	}

	public Cart addCart(Cart cart, String userID, int bookcode) {
		Cart c = cr.findByUserIDAndBookcode(userID, bookcode);
		if (c != null) {
			c.setQuantity(c.getQuantity() + cart.getQuantity());
			return cr.save(c);
		} else {
			cart.setId_cart(0);
			return cr.save(cart);
		}
	}

	public Cart editCart(Cart cart) {
		return cr.save(cart);
	}

	public Cart deleteCart(String userID, int bookcode) {
		Cart cart = cr.findByUserIDAndBookcode(userID, bookcode);
		if (cart != null) {
			cr.delete(cart);
		}
		return cart;
	}
}
