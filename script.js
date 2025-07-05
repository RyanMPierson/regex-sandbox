document.addEventListener('DOMContentLoaded', function () {
    const regexInput = document.getElementById('regex-input');
    const flagsInput = document.getElementById('flags-input');
    const textInput = document.getElementById('text-input');
    const resultDiv = document.getElementById('result');
    const errorMsg = document.getElementById('error-msg');
    const matchInfo = document.getElementById('match-info');
    const patternSuggestions = document.getElementById('pattern-suggestions');

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function (tag) {
            const chars = {
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            };
            return chars[tag] || tag;
        });
    }

    function highlightMatches() {
        let pattern = regexInput.value;
        let flags = flagsInput.value.replace(/\s+/g, '');
        let text = textInput.value;
        errorMsg.textContent = '';
        matchInfo.textContent = '';
        
        if (!pattern) {
            resultDiv.innerHTML = escapeHtml(text);
            return;
        }
        
        try {
            let regex = new RegExp(pattern, flags);
            let lastIndex = 0;
            let result = '';
            let match;
            let hasMatch = false;
            let matchCount = 0;
            
            if (!flags.includes('g')) {
                // If no global flag, only highlight the first match
                match = regex.exec(text);
                if (match) {
                    hasMatch = true;
                    matchCount = 1;
                    // Highlight groups if present
                    let start = match.index;
                    let end = start + match[0].length;
                    result += escapeHtml(text.slice(0, start));
                    if (match.length > 1) {
                        // Highlight groups within the match
                        let groupResult = '';
                        let matchText = match[0];
                        let groupIndices = [];
                        let offset = 0;
                        for (let i = 1; i < match.length; i++) {
                            if (match[i] !== undefined && match[i] !== null) {
                                let groupStart = matchText.indexOf(match[i], offset);
                                if (groupStart !== -1) {
                                    groupIndices.push({
                                        start: groupStart,
                                        end: groupStart + match[i].length
                                    });
                                    offset = groupStart + match[i].length;
                                }
                            }
                        }
                        let last = 0;
                        for (let g of groupIndices) {
                            groupResult += escapeHtml(matchText.slice(last, g.start));
                            groupResult += `<span class="highlight">${escapeHtml(matchText.slice(g.start, g.end))}</span>`;
                            last = g.end;
                        }
                        groupResult += escapeHtml(matchText.slice(last));
                        result += groupResult;
                    } else {
                        result += `<span class="highlight">${escapeHtml(match[0])}</span>`;
                    }
                    result += escapeHtml(text.slice(end));
                } else {
                    result = escapeHtml(text);
                }
            } else {
                // Global flag: highlight all matches
                let lastEnd = 0;
                while ((match = regex.exec(text)) !== null) {
                    hasMatch = true;
                    matchCount++;
                    let start = match.index;
                    let end = start + match[0].length;
                    result += escapeHtml(text.slice(lastEnd, start));
                    if (match.length > 1) {
                        // Highlight groups within the match
                        let groupResult = '';
                        let matchText = match[0];
                        let groupIndices = [];
                        let offset = 0;
                        for (let i = 1; i < match.length; i++) {
                            if (match[i] !== undefined && match[i] !== null) {
                                let groupStart = matchText.indexOf(match[i], offset);
                                if (groupStart !== -1) {
                                    groupIndices.push({
                                        start: groupStart,
                                        end: groupStart + match[i].length
                                    });
                                    offset = groupStart + match[i].length;
                                }
                            }
                        }
                        let last = 0;
                        for (let g of groupIndices) {
                            groupResult += escapeHtml(matchText.slice(last, g.start));
                            groupResult += `<span class="highlight">${escapeHtml(matchText.slice(g.start, g.end))}</span>`;
                            last = g.end;
                        }
                        groupResult += escapeHtml(matchText.slice(last));
                        result += groupResult;
                    } else {
                        result += `<span class="highlight">${escapeHtml(match[0])}</span>`;
                    }
                    lastEnd = end;
                    // Prevent infinite loop for zero-length matches
                    if (regex.lastIndex === start) regex.lastIndex++;
                }
                result += escapeHtml(text.slice(lastEnd));
            }
            
            resultDiv.innerHTML = result;
            
            // Show match information
            if (hasMatch) {
                matchInfo.textContent = `Found ${matchCount} match${matchCount !== 1 ? 'es' : ''}`;
            } else {
                matchInfo.textContent = 'No matches found';
            }
        } catch (e) {
            errorMsg.textContent = e.message;
            resultDiv.innerHTML = escapeHtml(textInput.value);
        }
    }

    // Handle pattern suggestions dropdown
    patternSuggestions.addEventListener('change', function() {
        if (this.value) {
            regexInput.value = this.value;
            // Set appropriate flags for certain patterns
            if (this.value.includes('\\b\\w+\\b') || this.value === '\\d+') {
                flagsInput.value = 'g';
            }
            highlightMatches();
            this.selectedIndex = 0; // Reset dropdown
        }
    });

    regexInput.addEventListener('input', highlightMatches);
    flagsInput.addEventListener('input', highlightMatches);
    textInput.addEventListener('input', highlightMatches);

    highlightMatches(); // Initial run
});