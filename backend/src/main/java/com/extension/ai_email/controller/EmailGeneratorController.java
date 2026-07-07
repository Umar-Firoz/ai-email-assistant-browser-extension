package com.extension.ai_email.controller;

import com.extension.ai_email.dto.EmailRequestDTO;
import com.extension.ai_email.dto.EmailResponseDTO;
import com.extension.ai_email.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<EmailResponseDTO> generateEmail(@RequestBody EmailRequestDTO emailRequestDTO){
        return ResponseEntity.ok(emailGeneratorService.generateEmail(emailRequestDTO));
    }

}
