package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByFaculty(User faculty);
}
