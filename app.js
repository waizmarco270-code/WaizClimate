// WAIZ Weather Ultimate Edition - Enhanced JavaScript Application
class WeatherAppUltimate {
    constructor() {
        this.apiKey = '013fedf73717fb49511ad985b53d70e0';
        this.apiEndpoints = {
            current: 'https://api.openweathermap.org/data/2.5/weather',
            forecast: 'https://api.openweathermap.org/data/2.5/forecast',
            geocoding: 'https://api.openweathermap.org/geo/1.0/direct',
            radar: 'https://tile.openweathermap.org/map/',
            airPollution: 'https://api.openweathermap.org/data/2.5/air_pollution'
        };
        
        this.currentTheme = 'dark';
        this.seasonalThemeEnabled = true;
        this.isCelsius = true;
        this.currentCity = null;
        this.refreshInterval = null;
        this.animationsEnabled = true;
        this.soundEnabled = true;
        this.volume = 0.5;
        this.favorites = [];
        this.radarMap = null;
        this.radarMapFull = null;
        this.radarLayer = null;
        this.radarAnimation = null;
        this.recognition = null;
        this.isListening = false;
        
        // Performance monitoring
        this.fps = 0;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fpsInterval = null;
        
        // Animation system
        this.animationFrameId = null;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.weatherParticles = [];
        
        // Sound system
        this.audioContext = null;
        this.currentAudio = null;
        this.ambientSounds = {};
        
        // Theme definitions with enhanced features
        this.themes = {
            dark: { name: 'Dark Matrix', effects: 'matrix', sounds: 'ambient', season: null },
            light: { name: 'Light Mode', effects: 'none', sounds: 'nature', season: null },
            neon: { name: 'Neon Cyber', effects: 'matrix-green', sounds: 'cyber', season: null },
            xenon: { name: 'Xenon Storm', effects: 'electric', sounds: 'electric', season: null },
            cherry: { name: 'Cherry Blossom', effects: 'petals', sounds: 'zen', season: 'spring' },
            space: { name: 'Deep Space', effects: 'stars', sounds: 'space', season: 'winter' },
            aurora: { name: 'Aurora Borealis', effects: 'northern-lights', sounds: 'arctic', season: 'autumn' },
            pixel: { name: 'Retro Pixel', effects: 'pixel-art', sounds: '8bit', season: null },
            galaxy: { name: 'Galaxy Nebula', effects: 'nebula', sounds: 'cosmic', season: null },
            rainy: { name: 'Rainy Glass', effects: 'water-drops', sounds: 'rain', season: 'monsoon' },
            fireice: { name: 'Fire & Ice', effects: 'fire-ice-split', sounds: 'elements', season: 'summer' },
            anime: { name: 'Anime City 💖', effects: 'anime-city', sounds: 'anime', season: null },
            zen: { name: 'Minimal Zen', effects: 'waves', sounds: 'meditation', season: null }
        };
        
        // Seasonal theme mapping
        this.seasonalThemes = {
            spring: 'cherry',
            summer: 'fireice',
            monsoon: 'rainy',
            autumn: 'aurora',
            winter: 'space'
        };
        
        this.indianCities = [
            {"name": "Mumbai", "state": "Maharashtra", "lat": 19.0760, "lon": 72.8777},
            {"name": "Delhi", "state": "Delhi", "lat": 28.6139, "lon": 77.2090},
            {"name": "Bangalore", "state": "Karnataka", "lat": 12.9716, "lon": 77.5946},
            {"name": "Chennai", "state": "Tamil Nadu", "lat": 13.0827, "lon": 80.2707},
            {"name": "Hyderabad", "state": "Telangana", "lat": 17.3850, "lon": 78.4867},
            {"name": "Kolkata", "state": "West Bengal", "lat": 22.5726, "lon": 88.3639},
            {"name": "Pune", "state": "Maharashtra", "lat": 18.5204, "lon": 73.8567},
            {"name": "Ahmedabad", "state": "Gujarat", "lat": 23.0225, "lon": 72.5714},
            {"name": "Jaipur", "state": "Rajasthan", "lat": 26.9124, "lon": 75.7873},
            {"name": "Surat", "state": "Gujarat", "lat": 21.1702, "lon": 72.8311},
            {"name": "Lucknow", "state": "Uttar Pradesh", "lat": 26.8467, "lon": 80.9462},
            {"name": "Kanpur", "state": "Uttar Pradesh", "lat": 26.4499, "lon": 80.3319},
            {"name": "Nagpur", "state": "Maharashtra", "lat": 21.1458, "lon": 79.0882},
            {"name": "Indore", "state": "Madhya Pradesh", "lat": 22.7196, "lon": 75.8577},
            {"name": "Thane", "state": "Maharashtra", "lat": 19.2183, "lon": 72.9781},
            {"name": "Bhopal", "state": "Madhya Pradesh", "lat": 23.2599, "lon": 77.4126},
            {"name": "Visakhapatnam", "state": "Andhra Pradesh", "lat": 17.6868, "lon": 83.2185},
            {"name": "Patna", "state": "Bihar", "lat": 25.5941, "lon": 85.1376},
            {"name": "Vadodara", "state": "Gujarat", "lat": 22.3072, "lon": 73.1812},
            {"name": "Ghaziabad", "state": "Uttar Pradesh", "lat": 28.6692, "lon": 77.4538},
            {"name": "Ludhiana", "state": "Punjab", "lat": 30.9010, "lon": 75.8573},
            {"name": "Agra", "state": "Uttar Pradesh", "lat": 27.1767, "lon": 78.0081},
            {"name": "Nashik", "state": "Maharashtra", "lat": 19.9975, "lon": 73.7898},
            {"name": "Faridabad", "state": "Haryana", "lat": 28.4089, "lon": 77.3178},
            {"name": "London", "state": "England", "lat": 51.5074, "lon": -0.1278},
            {"name": "New York", "state": "New York", "lat": 40.7128, "lon": -74.0060},
            {"name": "Tokyo", "state": "Japan", "lat": 35.6762, "lon": 139.6503},
            {"name": "Paris", "state": "France", "lat": 48.8566, "lon": 2.3522},
            {"name": "Sydney", "state": "Australia", "lat": -33.8688, "lon": 151.2093},
            {"name": "Dubai", "state": "UAE", "lat": 25.2048, "lon": 55.2708},
            {"name": "Singapore", "state": "Singapore", "lat": 1.3521, "lon": 103.8198}
        ];
        
        this.weatherEmojis = {
            200: "⛈️", 201: "⛈️", 202: "⛈️", 210: "🌩️", 211: "🌩️", 212: "🌩️", 221: "🌩️", 230: "⛈️", 231: "⛈️", 232: "⛈️",
            300: "🌦️", 301: "🌦️", 302: "🌧️", 310: "🌦️", 311: "🌧️", 312: "🌧️", 313: "🌦️", 314: "🌧️", 321: "🌦️",
            500: "🌧️", 501: "🌧️", 502: "🌧️", 503: "🌧️", 504: "🌧️", 511: "🌧️", 520: "🌦️", 521: "🌦️", 522: "🌧️", 531: "🌦️",
            600: "🌨️", 601: "🌨️", 602: "❄️", 611: "🌨️", 612: "🌨️", 613: "🌨️", 615: "🌨️", 616: "🌨️", 620: "🌨️", 621: "🌨️", 622: "❄️",
            700: "🌫️", 701: "🌫️", 711: "💨", 721: "🌫️", 731: "💨", 741: "🌫️", 751: "💨", 761: "💨", 762: "🌋", 771: "💨", 781: "🌪️",
            800: "☀️", 801: "🌤️", 802: "⛅", 803: "🌥️", 804: "☁️"
        };
        
        // Initialize with error handling
        this.initializeApp();
    }
    
    async initializeApp() {
        try {
            console.log('Starting WAIZ Weather Ultimate Edition...');
            
            // Show loading screen immediately
            this.showLoadingScreen();
            
            // Initialize components with error handling
            this.setupEventListeners();
            this.setupCanvas();
            this.setupAudioSafely();
            this.setupVoiceRecognitionSafely();
            this.startPerformanceMonitoring();
            this.startAnimations();
            
            // Apply seasonal theme if enabled
            if (this.seasonalThemeEnabled) {
                this.applySeasonalTheme();
            }
            
            // Load initial weather data
            await this.loadInitialWeatherData();
            
            // Initialize radar after a delay
            setTimeout(() => {
                this.initializeRadarSafely();
            }, 1000);
            
            // Start auto-refresh
            this.startAutoRefresh();
            
            console.log('App initialization completed successfully');
            
        } catch (error) {
            console.error('App initialization error:', error);
        } finally {
            // Always hide loading screen after 2 seconds
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
        }
    }
    
    async loadInitialWeatherData() {
        try {
            // First try geolocation with timeout
            const locationResult = await Promise.race([
                this.getCurrentLocationSafely(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Location timeout')), 5000))
            ]);
            
            if (!locationResult) {
                throw new Error('Location failed');
            }
            
        } catch (error) {
            console.log('Using default location (Mumbai):', error.message);
            // Default to Mumbai if geolocation fails
            await this.loadWeatherData(19.0760, 72.8777, 'Mumbai, Maharashtra');
        }
    }
    
    async getCurrentLocationSafely() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const locationName = await this.reverseGeocode(latitude, longitude);
                        await this.loadWeatherData(latitude, longitude, locationName);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                },
                (error) => reject(error),
                { 
                    timeout: 8000, 
                    enableHighAccuracy: false,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }
    
    setupEventListeners() {
        try {
            // Theme selector
            const themeSelector = document.getElementById('theme-selector');
            if (themeSelector) {
                themeSelector.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showThemeModal();
                });
            }
            
            // Theme modal
            const closeThemeModal = document.getElementById('close-theme-modal');
            if (closeThemeModal) {
                closeThemeModal.addEventListener('click', () => {
                    this.hideModal('theme-modal');
                });
            }
            
            // Theme options
            document.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => {
                    const theme = option.dataset.theme;
                    if (theme) {
                        this.changeTheme(theme);
                        this.hideModal('theme-modal');
                    }
                });
            });
            
            // Search functionality
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.handleSearch(e.target.value);
                });
                
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const query = e.target.value.trim();
                        if (query) {
                            this.searchCity(query);
                        }
                    }
                });
            }
            
            // Voice search
            const voiceSearchBtn = document.getElementById('voice-search');
            if (voiceSearchBtn) {
                voiceSearchBtn.addEventListener('click', () => {
                    this.toggleVoiceSearch();
                });
            }
            
            // Sound controls
            const soundToggle = document.getElementById('sound-toggle');
            const volumeSlider = document.getElementById('volume-slider');
            
            if (soundToggle) {
                soundToggle.addEventListener('click', () => {
                    this.toggleSound();
                });
            }
            
            if (volumeSlider) {
                volumeSlider.addEventListener('input', (e) => {
                    this.setVolume(e.target.value / 100);
                });
            }
            
            // Units toggle
            const unitsToggle = document.getElementById('units-toggle');
            if (unitsToggle) {
                unitsToggle.addEventListener('click', () => {
                    this.toggleUnits();
                });
            }
            
            // Favorites
            const favoritesBtn = document.getElementById('favorites-btn');
            if (favoritesBtn) {
                favoritesBtn.addEventListener('click', () => {
                    this.showFavoritesModal();
                });
            }
            
            const favoriteCurrent = document.getElementById('favorite-current');
            if (favoriteCurrent) {
                favoriteCurrent.addEventListener('click', () => {
                    this.toggleCurrentFavorite();
                });
            }
            
            // Settings
            const settingsBtn = document.getElementById('settings-btn');
            if (settingsBtn) {
                settingsBtn.addEventListener('click', () => {
                    this.showSettingsModal();
                });
            }
            
            // Radar
            const radarBtn = document.getElementById('radar-btn');
            if (radarBtn) {
                radarBtn.addEventListener('click', () => {
                    this.showRadarModal();
                });
            }
            
            // Modal overlays
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal');
                    if (modal) {
                        this.hideModal(modal.id);
                    }
                });
            });
            
            // Close modal buttons
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal');
                    if (modal) {
                        this.hideModal(modal.id);
                    }
                });
            });
            
            // Toast close buttons
            document.querySelectorAll('.close-toast').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const toast = e.target.closest('.toast');
                    if (toast) {
                        this.hideToast(toast.id);
                    }
                });
            });
            
            // Settings toggles
            const animationsToggle = document.getElementById('animations-toggle');
            if (animationsToggle) {
                animationsToggle.addEventListener('change', (e) => {
                    this.animationsEnabled = e.target.checked;
                    if (!this.animationsEnabled) {
                        this.stopAnimations();
                    } else {
                        this.startAnimations();
                    }
                });
            }
            
            const seasonalThemeToggle = document.getElementById('seasonal-theme-toggle');
            if (seasonalThemeToggle) {
                seasonalThemeToggle.addEventListener('change', (e) => {
                    this.seasonalThemeEnabled = e.target.checked;
                    if (this.seasonalThemeEnabled) {
                        this.applySeasonalTheme();
                    }
                });
            }
            
            // Click outside search results to close
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchResults();
                }
            });
            
            console.log('Event listeners setup completed');
            
        } catch (error) {
            console.error('Event listeners setup error:', error);
        }
    }
    
    // Enhanced loading screen
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = loadingScreen?.querySelector('.progress-bar');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
            
            // Animate progress bar
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 20 + 5;
                if (progress > 100) progress = 100;
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
                if (progress >= 100) {
                    clearInterval(progressInterval);
                }
            }, 300);
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
            }, 500);
        }
    }
    
    // Seasonal theme system
    applySeasonalTheme() {
        try {
            const currentSeason = this.getCurrentSeason();
            const seasonalTheme = this.seasonalThemes[currentSeason];
            
            if (seasonalTheme) {
                this.changeTheme(seasonalTheme);
                this.updateSeasonIndicator(currentSeason);
                setTimeout(() => {
                    this.showSuccessToast(`Auto-switched to ${currentSeason} theme: ${this.themes[seasonalTheme].name}`);
                }, 3000);
            }
        } catch (error) {
            console.error('Seasonal theme error:', error);
        }
    }
    
    getCurrentSeason() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        
        // Indian seasons with monsoon consideration
        if (month >= 3 && month <= 5) return 'spring';
        if (month >= 6 && month <= 9) return 'monsoon'; // Monsoon season in India
        if (month >= 10 && month <= 11) return 'autumn';
        if (month === 12 || month <= 2) return 'winter';
        
        return 'spring';
    }
    
    updateSeasonIndicator(season) {
        try {
            const seasonIcon = document.getElementById('season-icon');
            const seasonText = document.getElementById('season-text');
            
            const seasonData = {
                spring: { icon: 'fa-leaf', text: 'Spring' },
                summer: { icon: 'fa-sun', text: 'Summer' },
                monsoon: { icon: 'fa-cloud-rain', text: 'Monsoon' },
                autumn: { icon: 'fa-tree', text: 'Autumn' },
                winter: { icon: 'fa-snowflake', text: 'Winter' }
            };
            
            if (seasonIcon && seasonText && seasonData[season]) {
                seasonIcon.className = `fas ${seasonData[season].icon}`;
                seasonText.textContent = `${seasonData[season].text} Auto`;
            }
        } catch (error) {
            console.error('Season indicator update error:', error);
        }
    }
    
    // Safe audio setup
    setupAudioSafely() {
        try {
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        } catch (error) {
            console.warn('Audio not supported:', error);
            this.soundEnabled = false;
        }
    }
    
    // Safe voice recognition setup
    setupVoiceRecognitionSafely() {
        try {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.recognition = new SpeechRecognition();
                
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.lang = 'en-US';
                
                this.recognition.onresult = (event) => {
                    const result = event.results[0][0].transcript;
                    document.getElementById('search-input').value = result;
                    this.searchCity(result);
                    this.stopVoiceSearch();
                };
                
                this.recognition.onerror = () => {
                    this.stopVoiceSearch();
                };
                
                this.recognition.onend = () => {
                    this.stopVoiceSearch();
                };
            }
        } catch (error) {
            console.warn('Voice recognition setup error:', error);
        }
    }
    
    toggleVoiceSearch() {
        if (!this.recognition) {
            this.showErrorToast('Voice recognition not supported in your browser');
            return;
        }
        
        if (this.isListening) {
            this.stopVoiceSearch();
        } else {
            this.startVoiceSearch();
        }
    }
    
    startVoiceSearch() {
        if (!this.recognition) return;
        
        this.isListening = true;
        const voiceBtn = document.getElementById('voice-search');
        
        if (voiceBtn) {
            voiceBtn.classList.add('listening');
        }
        
        try {
            this.recognition.start();
            this.showSuccessToast('Listening... Speak the city name');
        } catch (error) {
            this.stopVoiceSearch();
        }
    }
    
    stopVoiceSearch() {
        this.isListening = false;
        const voiceBtn = document.getElementById('voice-search');
        
        if (voiceBtn) {
            voiceBtn.classList.remove('listening');
        }
        
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (error) {
                // Already stopped
            }
        }
    }
    
    // Performance monitoring
    startPerformanceMonitoring() {
        try {
            this.fpsInterval = setInterval(() => {
                this.updateFPSDisplay();
            }, 1000);
            
            this.lastFrameTime = performance.now();
            this.measureFPS();
        } catch (error) {
            console.error('Performance monitoring error:', error);
        }
    }
    
    measureFPS() {
        try {
            const currentTime = performance.now();
            this.frameCount++;
            
            if (currentTime - this.lastFrameTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFrameTime));
                this.frameCount = 0;
                this.lastFrameTime = currentTime;
            }
            
            if (this.animationsEnabled) {
                requestAnimationFrame(() => this.measureFPS());
            }
        } catch (error) {
            console.error('FPS measurement error:', error);
        }
    }
    
    updateFPSDisplay() {
        try {
            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = `${this.fps} FPS`;
                
                // Color code based on performance
                if (this.fps >= 60) {
                    fpsCounter.style.color = 'var(--theme-accent)';
                } else if (this.fps >= 30) {
                    fpsCounter.style.color = '#ffa500';
                } else {
                    fpsCounter.style.color = '#ff6b6b';
                }
            }
        } catch (error) {
            console.error('FPS display update error:', error);
        }
    }
    
    // Safe radar initialization
    initializeRadarSafely() {
        try {
            if (window.L && typeof L === 'object') {
                this.setupRadarMap();
            } else {
                console.warn('Leaflet not loaded, radar unavailable');
            }
        } catch (error) {
            console.error('Radar initialization error:', error);
        }
    }
    
    setupRadarMap() {
        try {
            const radarMapElement = document.getElementById('radar-map');
            if (!radarMapElement) return;
            
            this.radarMap = L.map('radar-map').setView([20.5937, 78.9629], 5); // Center on India
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.radarMap);
            
            this.addRadarLayer();
            
            // Add current location marker if available
            if (this.currentCity) {
                L.marker([this.currentCity.lat, this.currentCity.lon])
                    .addTo(this.radarMap)
                    .bindPopup(this.currentCity.name)
                    .openPopup();
            }
        } catch (error) {
            console.error('Radar map setup error:', error);
        }
    }
    
    addRadarLayer() {
        try {
            if (!this.radarMap) return;
            
            const layerType = document.getElementById('radar-layer')?.value || 'precipitation_new';
            
            if (this.radarLayer) {
                this.radarMap.removeLayer(this.radarLayer);
            }
            
            this.radarLayer = L.tileLayer(
                `${this.apiEndpoints.radar}${layerType}/{z}/{x}/{y}.png?appid=${this.apiKey}`,
                {
                    opacity: 0.6,
                    attribution: '© OpenWeatherMap'
                }
            ).addTo(this.radarMap);
        } catch (error) {
            console.error('Radar layer error:', error);
        }
    }
    
    showRadarModal() {
        const modal = document.getElementById('radar-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    async reverseGeocode(lat, lon) {
        try {
            const response = await fetch(
                `${this.apiEndpoints.geocoding}?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`
            );
            if (!response.ok) throw new Error('Geocoding failed');
            
            const data = await response.json();
            if (data.length > 0) {
                const location = data[0];
                return `${location.name}${location.state ? ', ' + location.state : ''}${location.country ? ', ' + location.country : ''}`;
            }
            return 'Unknown Location';
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
            return 'Unknown Location';
        }
    }
    
    async loadWeatherData(lat, lon, locationName) {
        try {
            console.log(`Loading weather for ${locationName}...`);
            
            // Load current weather
            const currentResponse = await fetch(
                `${this.apiEndpoints.current}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );
            
            if (!currentResponse.ok) {
                throw new Error(`Weather API error: ${currentResponse.status}`);
            }
            
            const currentData = await currentResponse.json();
            
            // Load forecast data
            const forecastResponse = await fetch(
                `${this.apiEndpoints.forecast}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );
            
            if (!forecastResponse.ok) {
                throw new Error(`Forecast API error: ${forecastResponse.status}`);
            }
            
            const forecastData = await forecastResponse.json();
            
            this.currentCity = {
                name: locationName,
                lat: lat,
                lon: lon,
                current: currentData,
                forecast: forecastData
            };
            
            this.updateWeatherDisplay();
            this.updateLastUpdated();
            this.updateFavoriteButton();
            
            console.log('Weather data loaded successfully');
            
        } catch (error) {
            console.error('Failed to load weather data:', error);
            this.showErrorToast('Failed to load weather data. Please try again.');
        }
    }
    
    updateWeatherDisplay() {
        try {
            if (!this.currentCity || !this.currentCity.current) return;
            
            const current = this.currentCity.current;
            const forecast = this.currentCity.forecast;
            
            // Update main weather card
            const currentTempEl = document.getElementById('current-temp');
            const currentLocationEl = document.getElementById('current-location');
            const currentConditionEl = document.getElementById('current-condition');
            const feelsLikeEl = document.getElementById('feels-like');
            const weatherEmojiEl = document.getElementById('weather-emoji');
            
            if (currentTempEl) currentTempEl.textContent = this.formatTemperature(current.main.temp);
            if (currentLocationEl) currentLocationEl.textContent = this.currentCity.name;
            if (currentConditionEl) currentConditionEl.textContent = current.weather[0].description;
            if (feelsLikeEl) feelsLikeEl.textContent = `Feels like ${this.formatTemperature(current.main.feels_like)}`;
            if (weatherEmojiEl) weatherEmojiEl.textContent = this.weatherEmojis[current.weather[0].id] || '🌤️';
            
            // Get today's high/low from forecast
            if (forecast && forecast.list) {
                const today = new Date().toDateString();
                const todayForecasts = forecast.list.filter(item => 
                    new Date(item.dt * 1000).toDateString() === today
                );
                
                if (todayForecasts.length > 0) {
                    const temps = todayForecasts.map(item => item.main.temp);
                    const high = Math.max(...temps);
                    const low = Math.min(...temps);
                    
                    const tempHighEl = document.getElementById('temp-high');
                    const tempLowEl = document.getElementById('temp-low');
                    if (tempHighEl) tempHighEl.textContent = `H:${this.formatTemperature(high)}`;
                    if (tempLowEl) tempLowEl.textContent = `L:${this.formatTemperature(low)}`;
                }
            }
            
            // Update weather details
            const visibilityEl = document.getElementById('visibility');
            const humidityEl = document.getElementById('humidity');
            const windSpeedEl = document.getElementById('wind-speed');
            const pressureEl = document.getElementById('pressure');
            const uvIndexEl = document.getElementById('uv-index');
            const airQualityEl = document.getElementById('air-quality');
            
            if (visibilityEl) visibilityEl.textContent = `${(current.visibility / 1000).toFixed(1)} km`;
            if (humidityEl) humidityEl.textContent = `${current.main.humidity}%`;
            if (windSpeedEl) windSpeedEl.textContent = this.formatWindSpeed(current.wind ? current.wind.speed : 0);
            if (pressureEl) pressureEl.textContent = `${current.main.pressure} hPa`;
            if (uvIndexEl) uvIndexEl.textContent = 'N/A'; // UV index not in basic API
            if (airQualityEl) airQualityEl.textContent = 'Good'; // Default value
            
            // Update forecasts
            this.updateHourlyForecast();
            this.updateDailyForecast();
            
        } catch (error) {
            console.error('Weather display update error:', error);
        }
    }
    
    updateHourlyForecast() {
        try {
            const hourlyContainer = document.getElementById('hourly-forecast');
            if (!hourlyContainer || !this.currentCity.forecast) return;
            
            hourlyContainer.innerHTML = '';
            
            // Show next 16 entries (48 hours with 3-hour intervals)
            const hourlyData = this.currentCity.forecast.list.slice(0, 16);
            
            hourlyData.forEach(item => {
                const time = new Date(item.dt * 1000);
                const hourlyItem = document.createElement('div');
                hourlyItem.className = 'hourly-item';
                
                const timeString = time.getHours() === 0 ? 
                    time.toLocaleDateString('en-US', { weekday: 'short' }) : 
                    `${time.getHours()}:00`;
                
                hourlyItem.innerHTML = `
                    <div class="hourly-time">${timeString}</div>
                    <span class="hourly-emoji">${this.weatherEmojis[item.weather[0].id] || '🌤️'}</span>
                    <div class="hourly-temp">${this.formatTemperature(item.main.temp)}</div>
                `;
                
                hourlyContainer.appendChild(hourlyItem);
            });
        } catch (error) {
            console.error('Hourly forecast update error:', error);
        }
    }
    
    updateDailyForecast() {
        try {
            const dailyContainer = document.getElementById('daily-forecast');
            if (!dailyContainer || !this.currentCity.forecast) return;
            
            dailyContainer.innerHTML = '';
            
            // Group forecast by day
            const dailyData = {};
            this.currentCity.forecast.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                if (!dailyData[date]) {
                    dailyData[date] = [];
                }
                dailyData[date].push(item);
            });
            
            // Get 7 days
            const days = Object.keys(dailyData).slice(0, 7);
            
            days.forEach((date, index) => {
                const dayData = dailyData[date];
                const temps = dayData.map(item => item.main.temp);
                const high = Math.max(...temps);
                const low = Math.min(...temps);
                const weather = dayData[Math.floor(dayData.length / 2)].weather[0]; // Mid-day weather
                
                const dayName = index === 0 ? 'Today' : 
                               index === 1 ? 'Tomorrow' :
                               new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                
                const dailyItem = document.createElement('div');
                dailyItem.className = 'daily-item';
                
                dailyItem.innerHTML = `
                    <div class="daily-day">${dayName}</div>
                    <span class="daily-emoji">${this.weatherEmojis[weather.id] || '🌤️'}</span>
                    <div class="daily-desc">${weather.description}</div>
                    <div class="daily-high">${this.formatTemperature(high)}</div>
                    <div class="daily-low">${this.formatTemperature(low)}</div>
                `;
                
                dailyContainer.appendChild(dailyItem);
            });
        } catch (error) {
            console.error('Daily forecast update error:', error);
        }
    }
    
    formatTemperature(temp) {
        if (this.isCelsius) {
            return `${Math.round(temp)}°`;
        } else {
            return `${Math.round(temp * 9/5 + 32)}°`;
        }
    }
    
    formatWindSpeed(speed) {
        // Speed is in m/s, convert to km/h or mph
        if (this.isCelsius) {
            return `${Math.round(speed * 3.6)} km/h`;
        } else {
            return `${Math.round(speed * 2.237)} mph`;
        }
    }
    
    toggleUnits() {
        this.isCelsius = !this.isCelsius;
        const unitsText = document.getElementById('units-toggle')?.querySelector('.units-text');
        if (unitsText) {
            unitsText.textContent = this.isCelsius ? '°C' : '°F';
        }
        this.updateWeatherDisplay();
    }
    
    updateLastUpdated() {
        try {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            const lastUpdatedEl = document.getElementById('last-updated');
            if (lastUpdatedEl) {
                lastUpdatedEl.textContent = `Updated ${timeString}`;
            }
        } catch (error) {
            console.error('Last updated error:', error);
        }
    }
    
    // Search functionality
    async handleSearch(query) {
        try {
            if (query.length < 2) {
                this.hideSearchResults();
                return;
            }
            
            const results = this.searchCities(query);
            this.showSearchResults(results);
        } catch (error) {
            console.error('Search handling error:', error);
        }
    }
    
    async searchCity(query) {
        try {
            // First try to find in our cities database
            const localResults = this.searchCities(query);
            if (localResults.length > 0) {
                const city = localResults[0];
                await this.loadWeatherData(city.lat, city.lon, `${city.name}, ${city.state}`);
                document.getElementById('search-input').value = '';
                this.hideSearchResults();
                return;
            }
            
            // If not found locally, try geocoding API
            const response = await fetch(
                `${this.apiEndpoints.geocoding}?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`
            );
            
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const location = data[0];
                    const locationName = `${location.name}${location.state ? ', ' + location.state : ''}${location.country ? ', ' + location.country : ''}`;
                    await this.loadWeatherData(location.lat, location.lon, locationName);
                    document.getElementById('search-input').value = '';
                    this.hideSearchResults();
                    this.showSuccessToast(`Weather updated for ${locationName}`);
                } else {
                    this.showErrorToast(`City "${query}" not found. Please try another city.`);
                }
            } else {
                throw new Error('Geocoding API error');
            }
        } catch (error) {
            console.error('Search failed:', error);
            this.showErrorToast(`Failed to search for "${query}". Please try again.`);
        }
    }
    
    searchCities(query) {
        return this.indianCities.filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.state.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8); // Show max 8 results
    }
    
    showSearchResults(results) {
        try {
            const container = document.getElementById('search-results');
            if (!container) return;
            
            container.innerHTML = '';
            
            if (results.length === 0) {
                container.classList.add('hidden');
                return;
            }
            
            results.forEach(city => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                
                const info = document.createElement('div');
                info.innerHTML = `<strong>${city.name}</strong><br><small>${city.state}</small>`;
                
                const coords = document.createElement('small');
                coords.textContent = `${city.lat.toFixed(2)}, ${city.lon.toFixed(2)}`;
                coords.style.color = 'var(--theme-text-secondary)';
                
                item.appendChild(info);
                item.appendChild(coords);
                
                item.addEventListener('click', async () => {
                    await this.loadWeatherData(city.lat, city.lon, `${city.name}, ${city.state}`);
                    document.getElementById('search-input').value = '';
                    this.hideSearchResults();
                });
                
                container.appendChild(item);
            });
            
            container.classList.remove('hidden');
        } catch (error) {
            console.error('Search results display error:', error);
        }
    }
    
    hideSearchResults() {
        const container = document.getElementById('search-results');
        if (container) {
            container.classList.add('hidden');
        }
    }
    
    // Theme system
    showThemeModal() {
        const modal = document.getElementById('theme-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // Mark current theme as active
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.toggle('active', option.dataset.theme === this.currentTheme);
            });
        }
    }
    
    changeTheme(theme) {
        try {
            this.currentTheme = theme;
            document.body.className = `theme-${theme}`;
            
            // Show special anime signature
            const animeSignature = document.querySelector('.waizmarco-signature-special');
            if (theme === 'anime' && animeSignature) {
                animeSignature.classList.remove('hidden');
            } else if (animeSignature) {
                animeSignature.classList.add('hidden');
            }
            
            this.updateAnimationEffects();
            this.showSuccessToast(`Theme changed to ${this.themes[theme]?.name || theme}`);
        } catch (error) {
            console.error('Theme change error:', error);
        }
    }
    
    // Favorites system
    showFavoritesModal() {
        const modal = document.getElementById('favorites-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.updateFavoritesList();
        }
    }
    
    updateFavoritesList() {
        try {
            const container = document.getElementById('favorites-list');
            if (!container) return;
            
            if (this.favorites.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; color: var(--theme-text-secondary); padding: 3rem;">
                        <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                        <p>No favorite cities yet</p>
                        <p>Add cities by clicking the heart icon!</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = '';
            this.favorites.forEach((favorite, index) => {
                const item = document.createElement('div');
                item.className = 'favorite-item';
                
                item.innerHTML = `
                    <div class="favorite-info">
                        <h4>${favorite.name}</h4>
                        <p>Tap to view weather</p>
                    </div>
                    <div class="favorite-temp">${favorite.temp || '--°'}</div>
                    <button class="remove-favorite" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                item.addEventListener('click', (e) => {
                    if (!e.target.closest('.remove-favorite')) {
                        this.loadWeatherData(favorite.lat, favorite.lon, favorite.name);
                        this.hideModal('favorites-modal');
                    }
                });
                
                item.querySelector('.remove-favorite').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeFavorite(index);
                });
                
                container.appendChild(item);
            });
        } catch (error) {
            console.error('Favorites list update error:', error);
        }
    }
    
    toggleCurrentFavorite() {
        try {
            if (!this.currentCity) return;
            
            const favoriteBtn = document.getElementById('favorite-current');
            if (!favoriteBtn) return;
            
            const icon = favoriteBtn.querySelector('i');
            
            const existingIndex = this.favorites.findIndex(fav => 
                fav.name === this.currentCity.name
            );
            
            if (existingIndex >= 0) {
                this.favorites.splice(existingIndex, 1);
                icon.className = 'far fa-heart';
                favoriteBtn.classList.remove('active');
                this.showSuccessToast('Removed from favorites');
            } else {
                this.favorites.push({
                    name: this.currentCity.name,
                    lat: this.currentCity.lat,
                    lon: this.currentCity.lon,
                    temp: this.formatTemperature(this.currentCity.current.main.temp)
                });
                icon.className = 'fas fa-heart';
                favoriteBtn.classList.add('active');
                this.showSuccessToast('Added to favorites');
            }
            
            this.updateFavoriteButton();
        } catch (error) {
            console.error('Toggle favorite error:', error);
        }
    }
    
    updateFavoriteButton() {
        try {
            if (!this.currentCity) return;
            
            const favoriteBtn = document.getElementById('favorite-current');
            if (!favoriteBtn) return;
            
            const icon = favoriteBtn.querySelector('i');
            
            const isFavorite = this.favorites.some(fav => 
                fav.name === this.currentCity.name
            );
            
            if (isFavorite) {
                icon.className = 'fas fa-heart';
                favoriteBtn.classList.add('active');
            } else {
                icon.className = 'far fa-heart';
                favoriteBtn.classList.remove('active');
            }
        } catch (error) {
            console.error('Favorite button update error:', error);
        }
    }
    
    removeFavorite(index) {
        this.favorites.splice(index, 1);
        this.updateFavoritesList();
        this.updateFavoriteButton();
        this.showSuccessToast('Favorite removed');
    }
    
    // Settings modal
    showSettingsModal() {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    // Sound controls
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById('sound-toggle');
        
        if (soundBtn) {
            const icon = soundBtn.querySelector('i');
            if (this.soundEnabled) {
                icon.className = 'fas fa-volume-up';
                soundBtn.classList.remove('muted');
            } else {
                icon.className = 'fas fa-volume-mute';
                soundBtn.classList.add('muted');
            }
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    // Modal system
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    // Toast notifications
    showErrorToast(message) {
        this.showToast('error-toast', 'error-message', message, 5000);
    }
    
    showSuccessToast(message) {
        this.showToast('success-toast', 'success-message', message, 3000);
    }
    
    showToast(toastId, messageId, message, duration) {
        try {
            const toast = document.getElementById(toastId);
            const messageEl = document.getElementById(messageId);
            
            if (toast && messageEl) {
                messageEl.textContent = message;
                toast.classList.remove('hidden');
                
                setTimeout(() => {
                    this.hideToast(toastId);
                }, duration);
            }
        } catch (error) {
            console.error('Toast display error:', error);
        }
    }
    
    hideToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('hidden');
        }
    }
    
    startAutoRefresh() {
        try {
            this.refreshInterval = setInterval(() => {
                if (this.currentCity) {
                    this.loadWeatherData(
                        this.currentCity.lat, 
                        this.currentCity.lon, 
                        this.currentCity.name
                    );
                }
            }, 5 * 60 * 1000); // 5 minutes
        } catch (error) {
            console.error('Auto refresh setup error:', error);
        }
    }
    
    // Animation system
    setupCanvas() {
        try {
            this.canvas = document.getElementById('effects-canvas');
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            
            window.addEventListener('resize', () => this.resizeCanvas());
        } catch (error) {
            console.error('Canvas setup error:', error);
        }
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        try {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } catch (error) {
            console.error('Canvas resize error:', error);
        }
    }
    
    startAnimations() {
        if (!this.animationsEnabled || !this.canvas) return;
        
        try {
            this.updateAnimationEffects();
            this.animate();
        } catch (error) {
            console.error('Animation start error:', error);
        }
    }
    
    stopAnimations() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.particles = [];
        this.weatherParticles = [];
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    animate() {
        if (!this.animationsEnabled || !this.ctx || !this.canvas) return;
        
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Simple particle animation for demonstration
            if (this.particles.length > 0) {
                this.ctx.fillStyle = 'var(--theme-accent)';
                this.particles.forEach((particle, index) => {
                    particle.y += particle.speed || 2;
                    if (particle.y > this.canvas.height) {
                        particle.y = -10;
                        particle.x = Math.random() * this.canvas.width;
                    }
                    
                    this.ctx.globalAlpha = particle.opacity || 0.5;
                    this.ctx.fillRect(particle.x, particle.y, 2, 10);
                });
            }
            
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        } catch (error) {
            console.error('Animation error:', error);
        }
    }
    
    updateAnimationEffects() {
        try {
            this.particles = [];
            
            // Simple matrix-like effect for dark theme
            if (this.currentTheme === 'dark' || this.currentTheme === 'neon') {
                for (let i = 0; i < 50; i++) {
                    this.particles.push({
                        x: Math.random() * (this.canvas?.width || window.innerWidth),
                        y: Math.random() * (this.canvas?.height || window.innerHeight),
                        speed: Math.random() * 3 + 1,
                        opacity: Math.random() * 0.5 + 0.2
                    });
                }
            }
        } catch (error) {
            console.error('Animation effects update error:', error);
        }
    }
}

// Initialize the enhanced app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.weatherApp = new WeatherAppUltimate();
        console.log('WAIZ Weather Ultimate Edition initialized');
    } catch (error) {
        console.error('App initialization failed:', error);
        // Fallback: hide loading screen even if initialization fails
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
            }
        }, 3000);
    }
});