package com.example.demo.service;

import com.example.demo.dto.ResultDTO;
import com.example.demo.dto.SubmitRequest;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepository;
    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    @Transactional
    public String startExam(Long examId, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        // Check if already completed
        attemptRepository.findByStudentAndExamAndIsCompleted(student, exam, true).ifPresent(a -> {
            throw new RuntimeException("You have already completed this exam");
        });

        // Check for in-progress attempt
        attemptRepository.findByStudentAndExamAndIsCompleted(student, exam, false).ifPresent(a -> {
            throw new RuntimeException("You already have an ongoing attempt for this exam");
        });

        Attempt attempt = Attempt.builder()
                .student(student)
                .exam(exam)
                .isCompleted(false)
                .build();

        attemptRepository.save(attempt);
        return "Exam started successfully";
    }

    @Transactional
    public ResultDTO submitExam(Long examId, String studentEmail, SubmitRequest submitRequest) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Attempt attempt = attemptRepository
                .findByStudentAndExamAndIsCompleted(student, exam, false)
                .orElseThrow(() -> new RuntimeException("No active attempt found. Please start the exam first."));

        List<Question> questions = questionRepository.findByExam(exam);
        Map<Long, String> submittedAnswers = submitRequest.getAnswers();

        int score = 0;
        List<Answer> answers = new ArrayList<>();

        for (Question question : questions) {
            String selected = submittedAnswers.getOrDefault(question.getId(), null);
            answers.add(Answer.builder()
                    .attempt(attempt)
                    .question(question)
                    .selectedOption(selected)
                    .build());

            if (selected != null && selected.equalsIgnoreCase(question.getCorrectAnswer())) {
                score += question.getMarks();
            }
        }

        answerRepository.saveAll(answers);

        double percentage = exam.getTotalMarks() > 0
                ? (double) score / exam.getTotalMarks() * 100
                : 0.0;
        AttemptStatus status = percentage >= exam.getPassPercentage()
                ? AttemptStatus.PASS
                : AttemptStatus.FAIL;

        attempt.setScore(score);
        attempt.setPercentage(percentage);
        attempt.setStatus(status);
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setIsCompleted(true);

        attemptRepository.save(attempt);

        return buildResultDTO(attempt);
    }

    public List<ResultDTO> getStudentResults(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return attemptRepository.findByStudent(student).stream()
                .filter(Attempt::getIsCompleted)
                .map(this::buildResultDTO)
                .collect(Collectors.toList());
    }

    public List<ResultDTO> getExamResults(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        return attemptRepository.findByExam(exam).stream()
                .filter(Attempt::getIsCompleted)
                .map(this::buildResultDTO)
                .collect(Collectors.toList());
    }

    private ResultDTO buildResultDTO(Attempt attempt) {
        ResultDTO dto = new ResultDTO();
        dto.setAttemptId(attempt.getId());
        dto.setExamId(attempt.getExam().getId());
        dto.setExamTitle(attempt.getExam().getTitle());
        dto.setStudentId(attempt.getStudent().getId());
        dto.setStudentName(attempt.getStudent().getName());
        dto.setScore(attempt.getScore());
        dto.setTotalMarks(attempt.getExam().getTotalMarks());
        dto.setPercentage(attempt.getPercentage());
        dto.setStatus(attempt.getStatus() != null ? attempt.getStatus().name() : null);
        dto.setSubmittedAt(attempt.getSubmittedAt());
        return dto;
    }
}
