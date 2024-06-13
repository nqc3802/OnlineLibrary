package com.example.web.feedback;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class FeedbackController {
	@Autowired
	private FeedbackService fbs;
	@Autowired
	private BookService bookService;
	@Autowired
	private UserService userService;

	
	@GetMapping("/feedback/book/{bookcode}")
	public List<Feedback> getFeedback(@PathVariable int bookcode) throws IOException {
		return fbs.getFeedback(bookcode);
	}
	
	@PostMapping("/feedback/add/{bookcode}/{userID}")
	public Feedback addFeedback(@PathVariable int bookcode, @PathVariable String userID, @RequestBody Feedback feedback) {
		Book book = bookService.getBook(bookcode);
		User user = userService.getUser(userID);
		
		feedback.setBookcode(book.getBookcode());
		feedback.setUserID(user.getUserID());
		
		return fbs.addFeedback(feedback);
	}
}
