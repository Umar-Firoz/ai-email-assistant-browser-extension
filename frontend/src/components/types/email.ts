export interface EmailRequest {
    emailContent: string;
    action: string;
    tone: string;
    language: string;
}

export interface EmailResponse {
    generatedEmail: string;
}