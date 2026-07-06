package com.extension.ai_email.service;

import com.extension.ai_email.dto.EmailRequestDTO;
import com.extension.ai_email.dto.EmailResponseDTO;

public interface EmailGeneratorService {
    public EmailResponseDTO generateEmail(EmailRequestDTO emailRequestDTO);
}
