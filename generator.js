document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.generate-btn');
    const inputField = document.getElementById('video-url');
    const resultsContainer = document.querySelector('.results-container');

    generateBtn.addEventListener('click', () => generateTitles());

    async function generateTitles() {
        const userInput = inputField.value.trim();
        
        if (!userInput || userInput.length < 3) {
            resultsContainer.innerHTML = '<div class="result-card"><p class="result-text">Please enter at least 3 characters...</p></div>';
            return;
        }

        // Show loading state
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        resultsContainer.innerHTML = '<div class="loading">Generating creative titles...</div>';

        try {
            // Mock title generation since we don't have a backend
            const titles = generateMockTitles(userInput);
            setTimeout(() => {
                displayTitles(titles);
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Titles';
            }, 1500); // Simulate API delay

        } catch (error) {
            resultsContainer.innerHTML = `
                <div class="result-card">
                    <p class="result-text">Failed to generate titles. Please try again.</p>
                </div>`;
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Titles';
        }
    }

    function generateMockTitles(topic) {
        const templates = [
            `Top 10 ${topic} Tips You Need to Know in 2024`,
            `How to Master ${topic} - Complete Guide`,
            `${topic} Secrets Revealed - Expert Tips`,
            `The Ultimate ${topic} Tutorial for Beginners`,
            `${topic} Masterclass - From Beginner to Pro`,
            `5 Game-Changing ${topic} Techniques`,
            `Why Your ${topic} Strategy Isn't Working`,
            `${topic} Made Simple - Step by Step Guide`,
            `Revolutionary ${topic} Methods for 2024`,
            `Transform Your ${topic} Skills Today`
        ];
        return templates;
    }

    function displayTitles(titles) {
        if (!titles.length) {
            resultsContainer.innerHTML = '<div class="result-card"><p class="result-text">No titles generated. Try a different input.</p></div>';
            return;
        }

        resultsContainer.innerHTML = titles.map((title, index) => `
            <div class="result-card">
                <span class="title-number">${index + 1}</span>
                <p class="result-text">${title}</p>
                <button class="copy-btn" onclick="copyToClipboard(this)" title="Copy to clipboard">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    }

    // Copy to clipboard functionality
    window.copyToClipboard = function(button) {
        const titleText = button.previousElementSibling.textContent;
        navigator.clipboard.writeText(titleText).then(() => {
            const icon = button.querySelector('i');
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = 'fas fa-copy';
            }, 2000);
        });
    };
});