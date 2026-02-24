package com.example.demo.repository;

import com.example.demo.entity.Answer;
import com.example.demo.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByAttempt(Attempt attempt);
}
