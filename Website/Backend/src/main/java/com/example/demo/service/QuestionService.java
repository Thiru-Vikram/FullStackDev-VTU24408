package com.example.demo.service;

import com.example.demo.dto.QuestionDTO;
import com.example.demo.entity.Exam;
import com.example.demo.entity.Question;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;

    public QuestionDTO addQuestion(Long examId, QuestionDTO dto) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Question question = Question.builder()
                .exam(exam)
                .questionText(dto.getQuestionText())
                .optionA(dto.getOptionA())
                .optionB(dto.getOptionB())
                .optionC(dto.getOptionC())
                .optionD(dto.getOptionD())
                .correctAnswer(dto.getCorrectAnswer())
                .marks(dto.getMarks())
                .build();

        return toDTO(questionRepository.save(question), true);
    }

    public List<QuestionDTO> getQuestionsByExam(Long examId, boolean includeAnswer) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        return questionRepository.findByExam(exam).stream()
                .map(q -> toDTO(q, includeAnswer))
                .collect(Collectors.toList());
    }

    public QuestionDTO updateQuestion(Long questionId, QuestionDTO dto) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestionText(dto.getQuestionText());
        question.setOptionA(dto.getOptionA());
        question.setOptionB(dto.getOptionB());
        question.setOptionC(dto.getOptionC());
        question.setOptionD(dto.getOptionD());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setMarks(dto.getMarks());

        return toDTO(questionRepository.save(question), true);
    }

    public void deleteQuestion(Long questionId) {
        questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        questionRepository.deleteById(questionId);
    }

    public QuestionDTO toDTO(Question q, boolean includeAnswer) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(q.getId());
        dto.setExamId(q.getExam().getId());
        dto.setQuestionText(q.getQuestionText());
        dto.setOptionA(q.getOptionA());
        dto.setOptionB(q.getOptionB());
        dto.setOptionC(q.getOptionC());
        dto.setOptionD(q.getOptionD());
        dto.setMarks(q.getMarks());
        if (includeAnswer) {
            dto.setCorrectAnswer(q.getCorrectAnswer());
        }
        return dto;
    }
}
