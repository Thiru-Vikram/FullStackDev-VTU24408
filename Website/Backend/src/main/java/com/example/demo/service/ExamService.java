package com.example.demo.service;

import com.example.demo.dto.ExamDTO;
import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExamService {

    private final ExamRepository examRepository;
    private final UserRepository userRepository;

    public ExamDTO createExam(ExamDTO dto, String facultyEmail) {
        User faculty = userRepository.findByEmail(facultyEmail)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Exam exam = Exam.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .duration(dto.getDuration())
                .totalMarks(dto.getTotalMarks())
                .passPercentage(dto.getPassPercentage())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .faculty(faculty)
                .build();

        return toDTO(examRepository.save(exam));
    }

    public List<ExamDTO> getAllExamsByFaculty(String facultyEmail) {
        User faculty = userRepository.findByEmail(facultyEmail)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        return examRepository.findByFaculty(faculty).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ExamDTO updateExam(Long examId, ExamDTO dto, String facultyEmail) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (!exam.getFaculty().getEmail().equals(facultyEmail)) {
            throw new RuntimeException("Unauthorized: You did not create this exam");
        }

        exam.setTitle(dto.getTitle());
        exam.setDescription(dto.getDescription());
        exam.setDuration(dto.getDuration());
        exam.setTotalMarks(dto.getTotalMarks());
        exam.setPassPercentage(dto.getPassPercentage());
        exam.setStartTime(dto.getStartTime());
        exam.setEndTime(dto.getEndTime());

        return toDTO(examRepository.save(exam));
    }

    public void deleteExam(Long examId, String facultyEmail) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (!exam.getFaculty().getEmail().equals(facultyEmail)) {
            throw new RuntimeException("Unauthorized: You did not create this exam");
        }

        examRepository.delete(exam);
    }

    public List<ExamDTO> getAllExams() {
        return examRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ExamDTO getExamById(Long examId) {
        return toDTO(examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found")));
    }

    public ExamDTO toDTO(Exam exam) {
        ExamDTO dto = new ExamDTO();
        dto.setId(exam.getId());
        dto.setTitle(exam.getTitle());
        dto.setDescription(exam.getDescription());
        dto.setDuration(exam.getDuration());
        dto.setTotalMarks(exam.getTotalMarks());
        dto.setPassPercentage(exam.getPassPercentage());
        dto.setStartTime(exam.getStartTime());
        dto.setEndTime(exam.getEndTime());
        dto.setFacultyId(exam.getFaculty().getId());
        dto.setFacultyName(exam.getFaculty().getName());
        dto.setQuestionCount(exam.getQuestions() != null ? exam.getQuestions().size() : 0);
        return dto;
    }
}
