package com.example.demo.dto;

import lombok.Data;

import java.util.Map;

@Data
public class SubmitRequest {
    // Map of questionId -> selectedOption (A, B, C, or D)
    private Map<Long, String> answers;
}
