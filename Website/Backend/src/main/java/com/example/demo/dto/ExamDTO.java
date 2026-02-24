package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamDTO {
    private Long id;
    private String title;
    private String description;
    private Integer duration;
    private Integer totalMarks;
    private Double passPercentage;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long facultyId;
    private String facultyName;
    private Integer questionCount;
}
