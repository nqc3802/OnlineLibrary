package com.example.web.shopping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingService {
	@Autowired
	private ShoppingRepository sr;

	List<Shopping> getShopping(String userID) {
		return sr.findByUserID(userID);
	}

	public Shopping getOneShopping(String userID, int bookcode) {
		return sr.findByUserIDAndBookcode(userID, bookcode);
	}

	public Shopping addShopping(Shopping shopping, String userID, int bookcode) {
		Shopping s = sr.findByUserIDAndBookcode(userID, bookcode);
		if (s != null) {
			s.setQuantity(s.getQuantity() + shopping.getQuantity());
			return sr.save(s);
		} else {
			shopping.setIdshopping(0);
			return sr.save(shopping);
		}
	}

	public Shopping deleteShopping(String userID, int bookcode) {
		Shopping shopping = sr.findByUserIDAndBookcode(userID, bookcode);
		if (shopping != null) {
			sr.delete(shopping);
		}
		return shopping;
	}
}
