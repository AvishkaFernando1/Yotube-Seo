document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.generate-btn');
    const summaryInput = document.getElementById('video-summary');
    const descriptionText = document.querySelector('.description-text');
    const copyBtn = document.querySelector('.copy-description-btn');

    // Store previous generations to avoid repetition
    let previousDescriptions = [];
    const maxPreviousDescriptions = 3;

    generateBtn.addEventListener('click', generateDescription);

    async function generateDescription() {
        const summary = summaryInput.value.trim();
        
        if (!summary || summary.length < 10) {
            descriptionText.innerHTML = 'Please enter at least 10 characters...';
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        descriptionText.innerHTML = 'Generating description...';

        try {
            const description = await generateSEODescription(summary);
            displayDescription(description);
            previousDescriptions.unshift(description);
            if (previousDescriptions.length > maxPreviousDescriptions) {
                previousDescriptions.pop();
            }
        } catch (error) {
            descriptionText.innerHTML = 'Failed to generate description. Please try again.';
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Description';
        }
    }

    function generateSEODescription(summary) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const template = generateEnhancedTemplate(summary);
                resolve(template);
            }, 1000);
        });
    }

    function generateEnhancedTemplate(summary) {
        const currentDate = new Date().toLocaleDateString();
        const hashtags = generateSmartHashtags(summary);
        const hook = generateHook(summary);
        const timestamps = generateTimestamps(summary);
        const callToAction = generateCTA();
        const socialProof = generateSocialProof();
        const mainContent = generateMainContent(summary);
        
        return `${hook}

${mainContent}

⏰ Quick Navigation:
${timestamps}

${socialProof}

${callToAction}

📱 Connect With Us:
▶️ Subscribe: https://youtube.com/@yourchannel
🐦 Twitter: @yourchannel
📸 Instagram: @yourchannel
🌐 Website: https://yourwebsite.com

${hashtags}

📅 Published: ${currentDate}
✨ Thanks for watching! Don't forget to like and share! ✨`;
    }

    function generateMainContent(summary) {
        return `📝 About This Video:
${generateIntroduction(summary)}

🎯 Key Topics Covered:
${generateBulletPoints(summary)}

💡 Why Watch This Video:
${generateValueProposition(summary)}`;
    }

    function generateIntroduction(summary) {
        return `Welcome to our comprehensive guide on ${summary}. In this video, we'll walk you through everything you need to know about this topic, from basic concepts to advanced techniques.`;
    }

    function generateValueProposition(summary) {
        const benefits = [
            `✓ Learn practical skills for ${summary}`,
            `✓ Get insider tips from industry experts`,
            `✓ Master proven techniques and strategies`,
            `✓ Avoid common pitfalls and mistakes`
        ];
        return benefits.join('\n');
    }

    function generateHook(summary) {
        const hooks = [
            `🔥 Ready to ${summary.toLowerCase().includes('how') ? 'master' : 'discover'} ${summary}?`,
            `⚡ Want to know the secrets of ${summary}?`,
            `🎯 Struggling with ${summary}? We've got you covered!`,
            `🚀 Transform your approach to ${summary} today!`
        ];
        return hooks[Math.floor(Math.random() * hooks.length)];
    }

    function generateBulletPoints(summary) {
        const points = summary.split(' ')
            .filter(word => word.length > 3)
            .slice(0, 3)
            .map(word => `• Master ${word.toLowerCase()}`);
        
        points.push(
            '• Expert tips and strategies',
            '• Real-world applications',
            '• Common mistakes to avoid'
        );
        
        return points.join('\n');
    }

    function generateTimestamps(summary) {
        const sections = [
            '0:00 - Introduction',
            '1:30 - Overview',
            '3:45 - Step-by-Step Guide',
            '7:20 - Pro Tips',
            '10:15 - Common Mistakes',
            '12:30 - Real Examples',
            '15:00 - Conclusion'
        ];
        return sections.join('\n');
    }

    function generateCTA() {
        const ctas = [
            '🔔 SUBSCRIBE & hit the bell to never miss our latest content!',
            '👍 If this helped you, SMASH that like button!',
            '💬 Share your experience in the comments below!',
            '🎯 Join our community for exclusive content!'
        ];
        return ctas.join('\n');
    }

    function generateSocialProof() {
        const proofs = [
            '💡 Join thousands of successful learners',
            '🏆 Trusted by industry professionals',
            '⭐ Rated 5 stars by our community'
        ];
        return proofs[Math.floor(Math.random() * proofs.length)];
    }

    function generateSmartHashtags(summary) {
        const words = summary.toLowerCase()
            .split(' ')
            .filter(word => word.length > 3);
        
        const trendingTags = ['tutorial', 'howto', 'learning', 'education', 'tips'];
        const nicheTags = words.map(word => word + 'tutorial');
        const allTags = [...new Set([...words, ...trendingTags, ...nicheTags])]
            .slice(0, 10)
            .map(tag => '#' + tag.replace(/[^a-z0-9]/g, ''));
        
        return allTags.join(' ');
    }

    function displayDescription(description) {
        descriptionText.innerHTML = description.replace(/\n/g, '<br>');
        copyBtn.style.display = 'block';
    }

    copyBtn.addEventListener('click', async function() {
        try {
            const description = descriptionText.innerText;
            await navigator.clipboard.writeText(description);
            
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i> Copy Description';
            }, 2000);
        } catch (err) {
            alert('Failed to copy description');
        }
    });
});