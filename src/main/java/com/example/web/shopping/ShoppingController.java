package com.example.web.shopping;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.web.library.Book;
import com.example.web.library.BookService;
import com.example.web.user.User;
import com.example.web.user.UserService;

@CrossOrigin
@RestController
public class ShoppingController {
	@Autowired
	private ShoppingService ss;
	@Autowired
	private BookService bookService;
	@Autowired
	private UserService userService;

	@GetMapping("/shopping/{userID}")
	public List<Shopping> getShopping(@PathVariable String userID) throws IOException {
		return ss.getShopping(userID);
	}

	@GetMapping("/shopping/{userID}/{bookcode}")
	public Shopping getOneShopping(@PathVariable String userID, @PathVariable int bookcode) {
		return ss.getOneShopping(userID, bookcode);
	}

	@PostMapping("/shopping/add/{userID}/{bookcode}")
	public Shopping addShopping(@PathVariable String userID, @PathVariable int bookcode,
			@RequestBody Shopping shopping) {
		Book book = bookService.getBook(bookcode);
		User user = userService.getUser(userID);

		shopping.setBookcode(book.getBookcode());
		shopping.setUserID(user.getUserID());
		return ss.addShopping(shopping, userID, bookcode);
	}

	@DeleteMapping("/shopping/delete/{userID}/{bookcode}")
	public Shopping deleteShopping(@PathVariable String userID, @PathVariable int bookcode) {
		return ss.deleteShopping(userID, bookcode);
	}
}
