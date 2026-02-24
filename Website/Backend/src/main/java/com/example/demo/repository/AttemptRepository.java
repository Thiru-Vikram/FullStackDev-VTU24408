package com.example.demo.repository;

import com.example.demo.entity.Attempt;
import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByStudent(User student);

    List<Attempt> findByExam(Exam exam);

    Optional<Attempt> findByStudentAndExamAndIsCompleted(User student, Exam exam, Boolean isCompleted);

    boolean existsByStudentAndExam(User student, Exam exam);
}
