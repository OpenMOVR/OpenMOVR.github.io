// Lightweight Session Management for MOVR Viewers
// Three-tier access control system

// Access level definitions
const ACCESS_LEVELS = {
    admin: ['data_dictionary_viewer.html', 'vendor_mapping_viewer.html', 'movr_data_hub_viewer.html'],
    dictionary: ['data_dictionary_viewer.html'], 
    hub: ['vendor_mapping_viewer.html', 'movr_data_hub_viewer.html']
};

function checkAccess(requiredPage) {
    const session = getActiveSession();
    if (!session) return false;
    
    const userLevel = session.level;
    const allowedPages = ACCESS_LEVELS[userLevel] || [];
    
    return allowedPages.some(page => requiredPage.includes(page));
}

function getActiveSession() {
    // Check for stored session
    const session = sessionStorage.getItem('userSession');
    if (session) {
        try {
            return JSON.parse(session);
        } catch (e) {
            sessionStorage.removeItem('userSession');
            return null;
        }
    }
    return null;
}

function authenticateUser(password) {
    // Import password config
    return import('./password-config.js').then(module => {
        const PASSWORD_CONFIG = module.default || module.PASSWORD_CONFIG;
        const today = new Date().toISOString().split('T')[0];
        
        // Check all access levels
        for (const [level, config] of Object.entries(PASSWORD_CONFIG)) {
            for (const passEntry of config.passwords) {
                if (password === passEntry.password) {
                    if (today <= passEntry.expires) {
                        // Valid password found
                        const sessionData = {
                            level: passEntry.level || level,
                            userType: passEntry.description,
                            loginTime: new Date().toISOString(),
                            expires: passEntry.expires,
                            password: passEntry.password
                        };
                        
                        // Store session under single key
                        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
                        sessionStorage.setItem('userAccessLevel', sessionData.level);
                        return { success: true, session: sessionData };
                    } else {
                        return { success: false, error: `Password "${passEntry.description}" expired on ${passEntry.expires}` };
                    }
                }
            }
        }
        
        return { success: false, error: 'Incorrect password' };
    });
}

function showAccessDeniedMessage(pageName, userLevel) {
    // Remove existing prompts
    const existing = document.getElementById('access-denied-prompt');
    if (existing) existing.remove();
    
    const prompt = document.createElement('div');
    prompt.id = 'access-denied-prompt';
    prompt.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 2000;
        display: flex; align-items: center; justify-content: center;
    `;
    
    prompt.innerHTML = `
        <div style="background: white; padding: 32px; border-radius: 8px; max-width: 500px; text-align: center;">
            <h3 style="color: #f44336; margin-bottom: 16px;">🚫 Access Denied</h3>
            <p style="margin-bottom: 20px; color: #666;">
                Your current access level <strong>(${userLevel})</strong> doesn't allow access to <strong>${pageName}</strong>.
            </p>
            
            <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; font-size: 14px; text-align: left;">
                <strong>Need elevated access?</strong><br>
                Contact <a href="mailto:movr@mdausa.org" style="color: #2c5aa0; text-decoration: none;">movr@mdausa.org</a> 
                to request the appropriate credentials for this tool.
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="goToIndex()" 
                        style="padding: 10px 20px; background: #2c5aa0; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Back to Home
                </button>
                <button onclick="logout(); location.reload();" 
                        style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Logout & Try Different Account
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(prompt);
}

function showLoginPrompt(currentPage, message = 'This page requires authentication.') {
    // Remove existing prompts
    const existing = document.getElementById('login-prompt');
    if (existing) existing.remove();
    
    const prompt = document.createElement('div');
    prompt.id = 'login-prompt';
    prompt.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 2000;
        display: flex; align-items: center; justify-content: center;
    `;
    
    prompt.innerHTML = `
        <div style="background: white; padding: 32px; border-radius: 8px; max-width: 400px; text-align: center;">
            <h3 style="color: #2c5aa0; margin-bottom: 16px;">Authentication Required</h3>
            <p style="margin-bottom: 20px; color: #666;">${message}</p>
            
            <input type="text" id="login-password" placeholder="Enter password" 
                   style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 16px;">
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="handleLogin('${currentPage}')" 
                        style="padding: 10px 20px; background: #2c5aa0; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Login
                </button>
                <button onclick="goToIndex()" 
                        style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Back to Home
                </button>
            </div>
            <div id="login-error" style="color: #d32f2f; margin-top: 12px; font-size: 14px;"></div>
        </div>
    `;
    
    document.body.appendChild(prompt);
    
    // Focus password input
    setTimeout(() => {
        const input = document.getElementById('login-password');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin(currentPage);
            });
        }
    }, 100);
}

function handleLogin(currentPage) {
    const password = document.getElementById('login-password').value.trim();
    const errorDiv = document.getElementById('login-error');
    
    if (!password) {
        errorDiv.textContent = 'Please enter a password';
        return;
    }
    
    authenticateUser(password).then(result => {
        if (result.success) {
            // Check if user has access to current page
            if (checkAccess(currentPage)) {
                // Remove login prompt
                const prompt = document.getElementById('login-prompt');
                if (prompt) prompt.remove();
                
                // Show main content if it's hidden
                const mainContent = document.getElementById('main-content');
                const passwordLock = document.getElementById('password-lock');
                if (mainContent && mainContent.style.display === 'none') {
                    mainContent.style.display = 'block';
                }
                if (passwordLock && passwordLock.style.display !== 'none') {
                    passwordLock.style.display = 'none';
                }
                
                // Add session indicator
                addSessionIndicator(result.session);
                showPopup('✅ Access granted!', '#4caf50');
                
                // Reload page or show content
                if (currentPage.includes('data_dictionary_viewer.html')) {
                    // For dictionary viewer, just refresh enhanced features
                    if (typeof window.showEnhancedFeatures === 'function') {
                        window.showEnhancedFeatures();
                    }
                    // Hide login prompt button
                    const loginBtn = document.getElementById('login-prompt-btn');
                    if (loginBtn) loginBtn.style.display = 'none';
                    
                    // Show session redirect option
                    showPostLoginOptions();
                } else if (typeof window.loadDataCallback === 'function') {
                    window.loadDataCallback();
                } else if (typeof showMainContent === 'function') {
                    showMainContent();
                } else {
                    location.reload();
                }
            } else {
                errorDiv.textContent = `Your access level (${result.session.level}) doesn't allow access to this page. Contact movr@mdausa.org for elevated access.`;
            }
        } else {
            errorDiv.textContent = result.error;
        }
    }).catch(err => {
        errorDiv.textContent = 'Authentication error. Please try again.';
        console.error('Auth error:', err);
    });
}

function goToIndex() {
    window.location.href = '../index.html';
}

function addSessionIndicator(userInfo) {
    // Remove existing session indicator if any
    const existing = document.getElementById('session-indicator');
    if (existing) existing.remove();
    
    // Create session indicator
    const indicator = document.createElement('div');
    indicator.id = 'session-indicator';
    
    const level = userInfo.level || 'guest';
    const colors = {
        admin: '#4caf50',
        dictionary: '#2196f3', 
        hub: '#ff9800',
        guest: '#9e9e9e'
    };
    
    const bgColor = colors[level] || '#9e9e9e';
    const textColor = '#fff';
    
    indicator.style.cssText = `
        position: fixed; top: 10px; right: 10px; 
        background: ${bgColor}; color: ${textColor};
        padding: 8px 16px; border-radius: 20px;
        font-size: 12px; font-weight: 500;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 1001; display: flex; align-items: center; gap: 10px;
    `;
    
    const levelText = level.charAt(0).toUpperCase() + level.slice(1);
    indicator.innerHTML = `
        <span>👤 ${levelText}: ${userInfo.userType}</span>
        <button onclick="logout()" style="background:rgba(255,255,255,0.2); border:none; color:${textColor}; padding:2px 6px; border-radius:3px; cursor:pointer; font-size:11px;">Logout</button>
    `;
    
    document.body.appendChild(indicator);
}

function logout() {
    // Clear all session data
    sessionStorage.removeItem('viewerSession_admin');
    sessionStorage.removeItem('viewerSession_dictionary');
    sessionStorage.removeItem('viewerSession_hub');
    
    // Remove session indicator
    const indicator = document.getElementById('session-indicator');
    if (indicator) indicator.remove();
    
    // Remove login prompt if exists
    const prompt = document.getElementById('login-prompt');
    if (prompt) prompt.remove();
    
    showPopup('👋 Logged out successfully', '#2196f3');
    
    // For dictionary viewer, it can stay accessible
    const currentPath = window.location.pathname;
    if (currentPath.includes('data_dictionary_viewer.html')) {
        // Dictionary viewer remains accessible, just remove session indicator
        return;
    } else {
        // Other pages need authentication, redirect to index
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    }
}

function showPopup(message, color) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed; top: 20px; right: 20px; 
        background: ${color}; color: white; 
        padding: 12px 20px; border-radius: 4px; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 1000; font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 300);
        }
    }, 3000);
}

// Page access control
function initializePageAccess(requiredLevel = null, callback = null) {
    const currentPath = window.location.pathname;
    
    // Dictionary viewer is always accessible (no password required)
    if (currentPath.includes('data_dictionary_viewer.html')) {
        // Show optional login prompt in top corner
        addOptionalLoginButton();
        if (callback) callback();
        return;
    }
    
    // Other pages require authentication
    if (currentPath.includes('vendor_mapping_viewer.html') || 
        currentPath.includes('movr_data_hub_viewer.html')) {
        
        const session = getActiveSession();
        if (!session || !checkAccess(currentPath)) {
            const pageName = currentPath.includes('vendor_mapping') ? 'Vendor Mapping Viewer' : 'MOVR Data Hub Viewer';
            
            // If user has a session but insufficient access, show specific message
            if (session && !checkAccess(currentPath)) {
                showAccessDeniedMessage(pageName, session.level);
                return;
            }
            
            // Otherwise show login prompt
            showLoginPrompt(currentPath, `Access to ${pageName} requires authentication.`);
            return;
        }
        
        // User has access, show session indicator
        addSessionIndicator(session);
        
        // Show main content if hidden
        const mainContent = document.getElementById('main-content');
        const passwordLock = document.getElementById('password-lock');
        if (mainContent && mainContent.style.display === 'none') {
            mainContent.style.display = 'block';
        }
        if (passwordLock && passwordLock.style.display !== 'none') {
            passwordLock.style.display = 'none';
        }
        
        // Execute callback if provided (e.g., load data)
        if (callback) callback();
    }
}

function addOptionalLoginButton() {
    const session = getActiveSession();
    if (session) {
        addSessionIndicator(session);
        return;
    }
    
    // Add optional login button for dictionary viewer
    const loginBtn = document.createElement('div');
    loginBtn.style.cssText = `
        position: fixed; top: 10px; right: 10px;
        background: #2c5aa0; color: white;
        padding: 8px 16px; border-radius: 20px;
        font-size: 12px; font-weight: 500;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 1001; cursor: pointer;
    `;
    loginBtn.textContent = '🔐 Login for More Access';
    loginBtn.onclick = () => showLoginPrompt(window.location.pathname, 'Login to access additional viewers and features.');
    
    document.body.appendChild(loginBtn);
}

function showPostLoginOptions() {
    // Show success message with navigation options
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 24px; border-radius: 8px; 
        box-shadow: 0 4px 16px rgba(0,0,0,0.3); z-index: 2001;
        text-align: center; max-width: 400px;
    `;
    
    popup.innerHTML = `
        <h3 style="color: #2c5aa0; margin-bottom: 16px;">✅ Login Successful!</h3>
        <p style="margin-bottom: 20px; color: #666;">You now have enhanced access to MOVR tools.</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="stayOnPage()" style="padding: 10px 20px; background: #2c5aa0; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Stay Here
            </button>
            <button onclick="goToHome()" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Go to Home
            </button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 5000);
    
    // Global functions for buttons
    window.stayOnPage = () => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    };
    
    window.goToHome = () => {
        window.location.href = '../index.html';
    };
}

// Make functions globally available
window.checkAccess = checkAccess;
window.getActiveSession = getActiveSession;
window.authenticateUser = authenticateUser;
window.showLoginPrompt = showLoginPrompt;
window.showAccessDeniedMessage = showAccessDeniedMessage;
window.handleLogin = handleLogin;
window.goToIndex = goToIndex;
window.addSessionIndicator = addSessionIndicator;
window.logout = logout;
window.showPopup = showPopup;
window.initializePageAccess = initializePageAccess;
window.addOptionalLoginButton = addOptionalLoginButton;
window.showPostLoginOptions = showPostLoginOptions;

// ES6 Module exports
export {
    checkAccess,
    getActiveSession,
    authenticateUser,
    showLoginPrompt,
    showAccessDeniedMessage,
    handleLogin,
    goToIndex,
    addSessionIndicator,
    logout,
    showPopup,
    initializePageAccess,
    addOptionalLoginButton,
    showPostLoginOptions
};