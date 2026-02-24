package com.example.demo.controller;

import com.example.demo.dto.ExamDTO;
import com.example.demo.dto.QuestionDTO;
import com.example.demo.dto.ResultDTO;
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
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final ExamService examService;
    private final QuestionService questionService;
    private final AttemptService attemptService;

    // ── Exam CRUD ──────────────────────────────────────────

    @PostMapping("/exams")
    public ResponseEntity<ExamDTO> createExam(@RequestBody ExamDTO dto,
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(examService.createExam(dto, user.getUsername()));
    }

    @GetMapping("/exams")
    public ResponseEntity<List<ExamDTO>> getMyExams(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(examService.getAllExamsByFaculty(user.getUsername()));
    }

    @PutMapping("/exams/{id}")
    public ResponseEntity<ExamDTO> updateExam(@PathVariable Long id,
            @RequestBody ExamDTO dto,
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(examService.updateExam(id, dto, user.getUsername()));
    }

    @DeleteMapping("/exams/{id}")
    public ResponseEntity<String> deleteExam(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails user) {
        examService.deleteExam(id, user.getUsername());
        return ResponseEntity.ok("Exam deleted successfully");
    }

    // ── Question CRUD ─────────────────────────────────────

    @PostMapping("/exams/{examId}/questions")
    public ResponseEntity<QuestionDTO> addQuestion(@PathVariable Long examId,
            @RequestBody QuestionDTO dto) {
        return ResponseEntity.ok(questionService.addQuestion(examId, dto));
    }

    @GetMapping("/exams/{examId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@PathVariable Long examId) {
        return ResponseEntity.ok(questionService.getQuestionsByExam(examId, true));
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id,
            @RequestBody QuestionDTO dto) {
        return ResponseEntity.ok(questionService.updateQuestion(id, dto));
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully");
    }

    // ── Results ───────────────────────────────────────────

    @GetMapping("/exams/{examId}/results")
    public ResponseEntity<List<ResultDTO>> getExamResults(@PathVariable Long examId) {
        return ResponseEntity.ok(attemptService.getExamResults(examId));
    }
}
