package com.extension.ai_email.dto;

import com.extension.ai_email.enums.EmailAction;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequestDTO {
    private EmailAction action;

    @NotBlank(message = "Email content cannot be empty")
    private String emailContent;
    private String tone;
    private String language;
}
