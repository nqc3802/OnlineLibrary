package com.example.web.library;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "library")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookcode;
	private String title;
	private String author;
	private String category;
	private Date release_date;
	private int total_pages;
	private int quantity_sold;
	private String mota;
	@Column(name = "img")
	private String img;
	public Book() {
		super();
		// TODO Auto-generated constructor stub
		this.quantity_sold = 0;
		this.category = "";
		this.total_pages = 0;
		this.mota = "";
		this.img = "";
	}
	public Book(int bookcode, String title, String author, String category, Date release_date, int total_pages,
			int quantity_sold, String mota, String img) {
		super();
		this.bookcode = bookcode;
		this.title = title;
		this.author = author;
		this.category = category;
		this.release_date = release_date;
		this.total_pages = total_pages;
		this.quantity_sold = quantity_sold;
		this.mota = mota;
		this.img = img;
	}
	public String getMota() {
		return mota;
	}
	public void setMota(String mota) {
		this.mota = mota;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public int getBookcode() {
		return bookcode;
	}
	public void setBookcode(int bookcode) {
		this.bookcode = bookcode;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getRelease_date() {
		return release_date;
	}
	public void setRelease_date(Date release_date) {
		this.release_date = release_date;
	}
	public int getTotal_pages() {
		return total_pages;
	}
	public void setTotal_pages(int total_pages) {
		this.total_pages = total_pages;
	}
	public int getQuantity_sold() {
		return quantity_sold;
	}
	public void setQuantity_sold(int quantity_sold) {
		this.quantity_sold = quantity_sold;
	}
	
}
