package com.example.web.shopping;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingRepository extends JpaRepository<Shopping, String> {
	List<Shopping> findByUserID(String userID);
	Shopping findByUserIDAndBookcode(String userID, int bookcode);
}
