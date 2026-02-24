package com.example.demo.controller;

import com.example.demo.dto.ExamDTO;
import com.example.demo.dto.QuestionDTO;
import com.example.demo.dto.ResultDTO;
import com.example.demo.dto.SubmitRequest;
import com.example.demo.service.AttemptService;
import com.example.demo.service.ExamService;
import com.example.demo.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final ExamService examService;
    private final QuestionService questionService;
    private final AttemptService attemptService;

    // ── View available exams ───────────────────────────────

    @GetMapping("/exams")
    public ResponseEntity<List<ExamDTO>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    @GetMapping("/exams/{examId}")
    public ResponseEntity<ExamDTO> getExam(@PathVariable Long examId) {
        return ResponseEntity.ok(examService.getExamById(examId));
    }

    // ── Questions (without correct answers) ───────────────

    @GetMapping("/exams/{examId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@PathVariable Long examId) {
        return ResponseEntity.ok(questionService.getQuestionsByExam(examId, false));
    }

    // ── Exam attempt ──────────────────────────────────────

    @PostMapping("/exams/{examId}/start")
    public ResponseEntity<String> startExam(@PathVariable Long examId,
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(attemptService.startExam(examId, user.getUsername()));
    }

    @PostMapping("/exams/{examId}/submit")
    public ResponseEntity<ResultDTO> submitExam(@PathVariable Long examId,
            @RequestBody SubmitRequest submitRequest,
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(attemptService.submitExam(examId, user.getUsername(), submitRequest));
    }

    // ── Results ───────────────────────────────────────────

    @GetMapping("/results")
    public ResponseEntity<List<ResultDTO>> getMyResults(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(attemptService.getStudentResults(user.getUsername()));
    }
}
