package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExam(Exam exam);

    void deleteByExam(Exam exam);
}
