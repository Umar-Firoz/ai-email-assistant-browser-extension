package com.extension.ai_email.service.Impl;

import com.extension.ai_email.dto.EmailRequestDTO;
import com.extension.ai_email.dto.EmailResponseDTO;
import com.extension.ai_email.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmailGeneratorServiceImpl implements EmailGeneratorService {

    private final ChatClient chatClient;
    private static final Logger logger =
            LoggerFactory.getLogger(EmailGeneratorServiceImpl.class);

    @Override
    public EmailResponseDTO generateEmail(EmailRequestDTO emailRequestDTO) {
        try {
            logger.info("Received {} request", emailRequestDTO.getAction());
            String prompt = buildPrompt(emailRequestDTO);
            logger.debug("Prompt generated successfully");
            logger.info("Calling Gemini AI");
            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
            logger.info("AI response generated successfully");
            logger.debug("Response length: {} characters", response.length());
            EmailResponseDTO emailResponseDTO = new EmailResponseDTO();
            emailResponseDTO.setGeneratedEmail(response);
            logger.info("Returning response to client");
            return emailResponseDTO;
        } catch (Exception exception) {
            logger.error("Failed to process {} request", emailRequestDTO.getAction(), exception);
            throw exception;
        }
    }

    private String buildPrompt(EmailRequestDTO emailRequestDTO) {
        StringBuilder prompt = new StringBuilder();
        switch (emailRequestDTO.getAction()) {
            case REPLY -> {
                prompt.append("You are an expert email writing assistant. ")
                        .append("Generate a professional, polite, and well-structured email reply. ")
                        .append("Do not generate a subject line. ")
                        .append("Do not use long dashes ('—') anywhere in the response. ");

                if (emailRequestDTO.getTone() != null && !emailRequestDTO.getTone().isBlank()) {
                    prompt.append("Use a ")
                            .append(emailRequestDTO.getTone())
                            .append(" tone. ");
                }

                prompt.append("Return only the email reply.\n\n")
                        .append("Original Email:\n")
                        .append(emailRequestDTO.getEmailContent());
            }
            case SUMMARIZE -> prompt.append("Summarize the following email into concise bullet points while preserving all important information. Return only the summary.\n\n")
                    .append(emailRequestDTO.getEmailContent());

            case GRAMMAR -> prompt.append("Correct the grammar, spelling, and punctuation of the following email. Preserve the original meaning, tone, and formatting. Return only the corrected email.\n\n")
                    .append(emailRequestDTO.getEmailContent());

            case TRANSLATE -> prompt.append("Translate the following email into ")
                    .append(emailRequestDTO.getLanguage())
                    .append(". Preserve the original meaning and tone. Return only the translated email.\n\n")
                    .append(emailRequestDTO.getEmailContent());

            default -> throw new IllegalArgumentException("Unsupported action: " + emailRequestDTO.getAction());
        }

        return prompt.toString();
    }
}
