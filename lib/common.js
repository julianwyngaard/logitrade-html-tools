// ABOUTME: Shared JavaScript utilities for Julian's HTML Tools
// ABOUTME: Provides status display, clipboard, and URL parameter handling

/**
 * Display a status message that auto-clears for success/info types
 * @param {HTMLElement} statusEl - The status element to update
 * @param {string} message - Message to display
 * @param {string} type - One of: 'success', 'error', 'info'
 */
function showStatus(statusEl, message, type) {
    statusEl.textContent = message;
    statusEl.className = 'status ' + type;
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'status';
        }, 3000);
    }
}

/**
 * Copy text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - True if successful
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        // Fallback: create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

/**
 * Get a URL parameter value
 * @param {string} name - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Update URL parameter without page reload
 * @param {string} name - Parameter name
 * @param {string|null} value - Parameter value (null to remove)
 */
function setUrlParam(name, value) {
    const url = new URL(window.location);
    if (value === null) {
        url.searchParams.delete(name);
    } else {
        url.searchParams.set(name, value);
    }
    window.history.replaceState({}, '', url);
}
