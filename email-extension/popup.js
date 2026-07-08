const API_URL = 'http://localhost:8080/api/email/generate';


const summarizeBtn   = document.getElementById('summarize-btn');
const translateBtn   = document.getElementById('translate-btn');
const translateGoBtn = document.getElementById('translate-go-btn');
const languageSel    = document.getElementById('language-selector');
const statusMsg      = document.getElementById('status-msg');
const resultArea     = document.getElementById('result-area');
const resultLabel    = document.getElementById('result-label');
const resultContent  = document.getElementById('result-content');
const copyBtn        = document.getElementById('copy-btn');


function showStatus(message, type = 'loading') {
    statusMsg.textContent = message;
    statusMsg.className = `status-msg status-${type}`;
    statusMsg.classList.remove('hidden');
    resultArea.classList.add('hidden');
}

function showResult(label, content) {
    statusMsg.classList.add('hidden');
    resultLabel.textContent = label;
    resultContent.textContent = content;
    resultArea.classList.remove('hidden');
}

function showError(message) {
    showStatus(message, 'error');
}

function setLoading(btn, loading, originalText) {
    btn.disabled = loading;
    btn.querySelector('.btn-label').textContent = loading ? 'Loading...' : originalText;
}


function getEmailContentFromPage() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) {
                reject(new Error('No active tab found'));
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_EMAIL_CONTENT' }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }
                resolve(response?.content || '');
            });
        });
    });
}


async function callAPI(payload) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Backend error: ${response.status}`);
    const data = await response.json();
    return data.generatedEmail;
}



summarizeBtn.addEventListener('click', async () => {
    setLoading(summarizeBtn, true, 'Summarize Email');
    showStatus('Reading email...');

    try {
        const emailContent = await getEmailContentFromPage();
        if (!emailContent) {
            showError('No email content found. Please open an email first.');
            return;
        }

        showStatus('Generating summary...');
        const result = await callAPI({ emailContent, action: 'SUMMARIZE' });
        showResult('📋 Summary', result);
    } catch (err) {
        console.error('Summarize error:', err);
        showError('Failed to summarize. Make sure an email is open and the backend is running.');
    } finally {
        setLoading(summarizeBtn, false, 'Summarize Email');
    }
});


translateBtn.addEventListener('click', () => {
    languageSel.classList.toggle('hidden');
    translateGoBtn.classList.toggle('hidden');
    translateBtn.querySelector('.btn-label').textContent =
        languageSel.classList.contains('hidden') ? 'Translate Email' : 'Cancel';
});


translateGoBtn.addEventListener('click', async () => {
    const language = languageSel.value;
    setLoading(translateGoBtn, true, 'Go →');
    showStatus(`Reading email...`);

    try {
        const emailContent = await getEmailContentFromPage();
        if (!emailContent) {
            showError('No email content found. Please open an email first.');
            return;
        }

        showStatus(`Translating to ${language}...`);
        const result = await callAPI({ emailContent, action: 'TRANSLATE', language });
        showResult(`🌐 Translation — ${language}`, result);
    } catch (err) {
        console.error('Translate error:', err);
        showError('Failed to translate. Make sure an email is open and the backend is running.');
    } finally {
        setLoading(translateGoBtn, false, 'Go →');
    }
});



copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(resultContent.textContent);
        copyBtn.textContent = ' Copied!';
        setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2000);
    } catch {
        copyBtn.textContent = ' Failed';
        setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2000);
    }
});
