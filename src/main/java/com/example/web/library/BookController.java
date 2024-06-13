package com.example.web.library;

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

@CrossOrigin
@RestController
public class BookController {
	@Autowired
	private BookService service;

	@GetMapping("/books")
	public List<Book> getBooks() throws IOException {
		return service.getBooks();
	}

	@GetMapping("/book/{bookcode}")
	public Book getBook(@PathVariable int bookcode) {
		return service.getBook(bookcode);
	}

	@PostMapping("/book/add")
	public Book addBook(@RequestBody Book book) {
		book.setQuantity_sold(0);
		return service.addBook(book);
	}

	@PutMapping("/book/edit/{bookcode}")
	public Book editBook(@PathVariable int bookcode, @RequestBody Book book) {
		Book currentBook = service.getBook(bookcode);
		book.setQuantity_sold(currentBook.getQuantity_sold());
		book.setBookcode(bookcode);
		return service.editBook(book, bookcode);
	}

	@DeleteMapping("/book/delete/{bookcode}")
	public Book deleteBook(@PathVariable int bookcode) {
		return service.deleteBook(bookcode);
	}
}
