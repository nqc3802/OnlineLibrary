package com.example.web.library;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
	@Autowired
	private BookRepository repo;

	public List<Book> getBooks() {
		return repo.findAll();
	}

	public Book getBook(int bookcode) {
		return repo.findById(bookcode);
	}

	public Book addBook(Book book) {
		Book b = repo.findOneByTitleAndAuthor(book.getTitle(), book.getAuthor());
		if (b != null) {
			Book messageBook = new Book();
	        messageBook.setTitle("Sách đã tồn tại trong cơ sở dữ liệu");
	        return messageBook;
		}
		else {
			book.setBookcode(0);
			return repo.save(book);
		}
	}

	public Book editBook(Book book, int bookcode) {
		Book b = repo.findOneByTitleAndAuthor(book.getTitle(), book.getAuthor());
		Book c = repo.findById(bookcode);
		if (b != null && c.getBookcode() != bookcode) {
			Book messageBook = new Book();
			messageBook.setTitle("Sách đã tồn tại trong cơ sở dữ liệu");
			return messageBook;
		}
		else {
			return repo.save(book);
		}
	}

	public Book deleteBook(int bookcode) {
		return repo.deleteById(bookcode);
	}
}