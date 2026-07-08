console.log("Email Writer Extension - Content Script Loaded");



function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;

function insertIntoComposeBox(text) {
    const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
    if (composeBox) {
        composeBox.focus();
        document.execCommand('insertText', false, text);
    } else {
        console.error('Compose box not found');
    }
}



async function callEmailAPI(payload) {
    const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.generatedEmail;
}


function createComposeUI() {
    const container = document.createElement('div');
    container.className = 'ai-compose-container';


    const toneSelector = document.createElement('select');
    toneSelector.className = 'ai-selector ai-tone-selector';
    ['Professional', 'Friendly', 'Formal', 'Casual'].forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        toneSelector.appendChild(opt);
    });

    const replyBtn = document.createElement('button');
    replyBtn.className = 'ai-btn ai-reply-btn';
    replyBtn.textContent = '✨ Generate Reply';

    const grammarBtn = document.createElement('button');
    grammarBtn.className = 'ai-btn ai-grammar-btn';
    grammarBtn.textContent = '✏️ Fix Grammar';

    container.appendChild(toneSelector);
    container.appendChild(replyBtn);
    container.appendChild(grammarBtn);


    replyBtn.addEventListener('click', async () => {
        const original = replyBtn.textContent;
        try {
            replyBtn.textContent = 'Generating...';
            replyBtn.disabled = true;

            const result = await callEmailAPI({
                emailContent: getEmailContent(),
                action: 'REPLY',
                tone: toneSelector.value
            });
            insertIntoComposeBox(result);
        } catch (error) {
            console.error('AI Reply error:', error);
            alert('Failed to generate reply. Is the backend running?');
        } finally {
            replyBtn.textContent = original;
            replyBtn.disabled = false;
        }
    });


    grammarBtn.addEventListener('click', async () => {
        const original = grammarBtn.textContent;
        try {
            grammarBtn.textContent = 'Fixing...';
            grammarBtn.disabled = true;

            const result = await callEmailAPI({
                emailContent: getEmailContent(),
                action: 'GRAMMAR'
            });
            insertIntoComposeBox(result);
        } catch (error) {
            console.error('Grammar fix error:', error);
            alert('Failed to fix grammar. Is the backend running?');
        } finally {
            grammarBtn.textContent = original;
            grammarBtn.disabled = false;
        }
    });

    return container;
}



function injectButton() {
    const existing = document.querySelector('.ai-compose-container');
    if (existing) existing.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log('Toolbar not found');
        return;
    }

    console.log('Toolbar found — injecting AI compose UI');
    const ui = createComposeUI();
    toolbar.insertBefore(ui, toolbar.firstChild);
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_EMAIL_CONTENT') {
        sendResponse({ content: getEmailContent() });
    }
    return true;
});



const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (
                node.matches('.aDh, .btC, [role="dialog"]') ||
                node.querySelector('.aDh, .btC, [role="dialog"]')
            )
        );
        if (hasComposeElements) {
            console.log('Compose Window Detected');
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true })}