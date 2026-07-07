import axios from "axios";
import type { EmailRequest, EmailResponse } from "../components/types/email";

const BASE_URL = "http://localhost:8080/api/email";

export async function generateEmail(request: EmailRequest): Promise<EmailResponse> {
    const response = await axios.post<EmailResponse>(
        `${BASE_URL}/generate`,
        request
    );

    return response.data;
}