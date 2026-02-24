package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultDTO {
    private Long attemptId;
    private Long examId;
    private String examTitle;
    private Long studentId;
    private String studentName;
    private Integer score;
    private Integer totalMarks;
    private Double percentage;
    private String status; // PASS or FAIL
    private LocalDateTime submittedAt;
}
