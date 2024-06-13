package com.example.web.library;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	Book findById(int bookcode);
	Book findOneByTitleAndAuthor(String title, String author);
	Book deleteById(int bookcode);
}
