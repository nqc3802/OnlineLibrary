package com.example.web.cart;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.web.library.Book;
import com.example.web.library.BookService;
import com.example.web.user.User;
import com.example.web.user.UserService;

@CrossOrigin
@RestController
public class CartController {
	@Autowired
	private CartService cs;
	@Autowired
	private BookService bookService;
	@Autowired
	private UserService userService;
	
	@GetMapping("/cart/{userID}")
	public List<Cart> getCart(@PathVariable String userID) throws IOException {
		return cs.getCart(userID);
	}
	
	@GetMapping("/cart/{userID}/{bookcode}")
	public Cart getOneCart(@PathVariable String userID, @PathVariable int bookcode) {
		return cs.getOneCart(userID, bookcode);
	}
	
	@PostMapping("/cart/add/{userID}/{bookcode}")
	public Cart addCart(@PathVariable String userID, @PathVariable int bookcode, @RequestBody Cart cart) {
		Book book = bookService.getBook(bookcode);
		User user = userService.getUser(userID);
		
		cart.setBookcode(book.getBookcode());
		cart.setUserID(user.getUserID());
		return cs.addCart(cart, userID, bookcode);
	}
	
	@PutMapping("/cart/edit/{userID}/{bookcode}")
	public Cart editCart(@PathVariable String userID, @PathVariable int bookcode, @RequestBody Cart cart) {
		Cart currentCart = cs.getOneCart(userID, bookcode);
		cart.setBookcode(currentCart.getBookcode());
		cart.setUserID(currentCart.getUserID());
		cart.setId_cart(currentCart.getId_cart());

		return cs.editCart(cart);
	}
	
	@DeleteMapping("/cart/delete/{userID}/{bookcode}")
	public Cart deleteCart(@PathVariable String userID, @PathVariable int bookcode) {
		return cs.deleteCart(userID, bookcode);
	}
}
