document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.generate-btn');
    const inputField = document.getElementById('video-url'); // This matches your HTML
    const tagCloud = document.querySelector('.tag-cloud');
    const copyAllBtn = document.querySelector('.copy-all-btn');

    // Debug: Confirm elements exist
    console.log("Elements loaded:", { generateBtn, inputField, tagCloud, copyAllBtn });

    // Hide copy button initially
    copyAllBtn.style.display = 'none';

    generateBtn.addEventListener('click', generateTags);

    function generateTags() {
        const userInput = inputField.value.trim();
        console.log("Generating tags for:", userInput); // Debug
        
        if (!userInput || userInput.length < 3) {
            tagCloud.innerHTML = '<div class="tag-message">Please enter at least 3 characters...</div>';
            return;
        }

        // Show loading state
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        tagCloud.innerHTML = '<div class="loading">Generating tags...</div>';

        try {
            const tags = generateSEOTags(userInput);
            console.log("Generated tags:", tags); // Debug
            displayTags(tags);
        } catch (error) {
            console.error("Error:", error);
            tagCloud.innerHTML = '<div class="error-message">Failed to generate tags. Please try again.</div>';
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Tags';
        }
    }

    function generateSEOTags(topic) {
        const tags = new Set();
        const cleanTopic = topic.toLowerCase().trim();
        const words = cleanTopic.split(' ');

        // Core topic variations
        tags.add(cleanTopic);
        tags.add(`${cleanTopic} tutorial`);
        tags.add(`${cleanTopic} guide`);
        tags.add(`${cleanTopic} tips`);

        // How-to variations
        tags.add(`how to ${cleanTopic}`);
        tags.add(`learn ${cleanTopic}`);
        tags.add(`${cleanTopic} for beginners`);
        tags.add(`${cleanTopic} basics`);
        tags.add(`${cleanTopic} step by step`);

        // Trending variations
        tags.add(`${cleanTopic} 2024`);
        tags.add(`best ${cleanTopic}`);
        tags.add(`${cleanTopic} tips and tricks`);
        tags.add(`trending ${cleanTopic}`);
        tags.add(`popular ${cleanTopic}`);

        // Educational variations
        tags.add(`${cleanTopic} masterclass`);
        tags.add(`${cleanTopic} course`);
        tags.add(`${cleanTopic} training`);
        tags.add(`${cleanTopic} lessons`);
        tags.add(`${cleanTopic} education`);

        // Expert variations
        tags.add(`advanced ${cleanTopic}`);
        tags.add(`professional ${cleanTopic}`);
        tags.add(`${cleanTopic} expert tips`);
        tags.add(`${cleanTopic} mastery`);
        tags.add(`${cleanTopic} pro guide`);

        // Platform specific
        tags.add(`youtube ${cleanTopic}`);
        tags.add(`${cleanTopic} video`);
        tags.add(`${cleanTopic} channel`);
        tags.add(`${cleanTopic} content`);
        tags.add(`${cleanTopic} creator`);

        // Additional variations
        words.forEach(word => {
            if (word.length > 3) {
                tags.add(`${word} tips`);
                tags.add(`${word} guide`);
                tags.add(`best ${word}`);
                tags.add(`${word} tutorial`);
                tags.add(`how to ${word}`);
            }
        });

        return Array.from(tags).slice(0, 30); // Return top 30 tags
    }

    function displayTags(tags) {
        console.log("Displaying tags:", tags); // Debug
        
        if (!tags.length) {
            tagCloud.innerHTML = '<div class="tag-message">No tags generated. Try a different input.</div>';
            return;
        }

        const tagElements = tags.map(tag => `
            <div class="tag-item">
                <span class="tag-text">${tag}</span>
                <div class="tag-actions">
                    <button class="tag-copy" onclick="copyTag(this)" title="Copy tag">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="tag-remove" onclick="removeTag(this)" title="Remove tag">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');

        tagCloud.innerHTML = `
            <div class="tags-header">
                <span class="tags-count">${tags.length} tags generated</span>
            </div>
            <div class="tags-container">${tagElements}</div>
        `;

        copyAllBtn.style.display = 'flex';
    }

    // Copy individual tag
    window.copyTag = function(button) {
        const tagText = button.closest('.tag-item').querySelector('.tag-text').textContent;
        copyToClipboard(tagText, button);
    };

    // Remove individual tag
    window.removeTag = function(button) {
        const tagItem = button.closest('.tag-item');
        tagItem.classList.add('removing');
        setTimeout(() => {
            tagItem.remove();
            updateTagsCount();
        }, 300);
    };

    // Copy all tags
    copyAllBtn.addEventListener('click', function() {
        const allTags = Array.from(document.querySelectorAll('.tag-text'))
            .map(tag => tag.textContent)
            .join(', ');
        
        copyToClipboard(allTags, this);
    });

    function copyToClipboard(text, button) {
        console.log("Copying to clipboard:", text); // Debug
        navigator.clipboard.writeText(text).then(() => {
            const icon = button.querySelector('i');
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = 'fas fa-copy';
            }, 2000);
        }).catch((err) => {
            console.error("Clipboard error:", err); // Debug
            alert('Failed to copy to clipboard');
        });
    }

    function updateTagsCount() {
        const countElement = document.querySelector('.tags-count');
        const currentCount = document.querySelectorAll('.tag-item').length;
        if (countElement) {
            countElement.textContent = `${currentCount} tags generated`;
        }
        copyAllBtn.style.display = currentCount ? 'flex' : 'none';
    }
});