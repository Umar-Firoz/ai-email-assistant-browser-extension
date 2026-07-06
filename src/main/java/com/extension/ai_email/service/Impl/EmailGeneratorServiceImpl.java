package com.extension.ai_email.service.Impl;

import com.extension.ai_email.dto.EmailRequestDTO;
import com.extension.ai_email.dto.EmailResponseDTO;
import com.extension.ai_email.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailGeneratorServiceImpl implements EmailGeneratorService {

    private final ChatClient chatClient;


    @Override
    public EmailResponseDTO generateEmail(EmailRequestDTO emailRequestDTO) {
        //build a prompt
        String prompt=buildPrompt(emailRequestDTO);

        //craft a request
//        Map<String,Object> requestBody=new HashMap<>();
//        requestBody.put("model", "gemini-2.5-flash");
//        requestBody.put("input", prompt);

        //Do request and get response

        String response = chatClient.prompt()
                .user("write a para about MR.360")
                .call()
                .content();
        System.out.println(response);


        EmailResponseDTO emailResponseDTO=new EmailResponseDTO();
        return emailResponseDTO;

    }

    private String buildPrompt(EmailRequestDTO emailRequestDTO) {
        StringBuilder prompt=new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line and dont use long dash '-' any where in the output ");
        if(emailRequestDTO.getTone()!=null && !emailRequestDTO.getTone().isEmpty()){
            prompt.append("Use a").append(emailRequestDTO.getTone()).append(" tone.");
        }
        prompt.append("\n Original Email : \n").append(emailRequestDTO.getEmailContent());
        return prompt.toString();
    }
}
