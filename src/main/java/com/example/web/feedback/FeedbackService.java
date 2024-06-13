package com.example.web.feedback;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
	@Autowired
	private FeedbackRepository fbr;
	
	public List<Feedback> getFeedback(int bookcode) {
		return fbr.findByBookcode(bookcode);
	}
	
	public Feedback addFeedback(Feedback feedback) {
		feedback.setId(0);
		return fbr.save(feedback);
	}
}
