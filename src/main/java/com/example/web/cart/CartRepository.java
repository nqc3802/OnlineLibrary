package com.example.web.cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
	List<Cart> findByUserID(String userID);
	Cart findByUserIDAndBookcode(String userID, int bookcode);
	Cart deleteByUserIDAndBookcode(String userID, int bookcode);
}
