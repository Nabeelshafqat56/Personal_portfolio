/**
 * Personal Portfolio - 3D space Flight & Interactive Cursor Engine
 * Inspired by Lusion.co visual travel and interactive cursor mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. PAGE LOADER PROGRESS ENGINE
    // ==========================================================================
    const initPageLoader = () => {
        const loader = document.getElementById('ftco-loader');
        if (!loader) return;

        const fill = loader.querySelector('.loader-bar-fill');
        const num = loader.querySelector('.loader-number');
        const status = loader.querySelector('.loader-status');

        if (!fill || !num) {
            window.addEventListener('load', () => {
                loader.classList.add('loaded');
            });
            setTimeout(() => loader.classList.add('loaded'), 3000);
            return;
        }

        const statuses = [
            "Initializing Space Flight",
            "Loading 3D Meshes",
            "Compiling WebGL Shaders",
            "Syncing Database Networks",
            "Polishing Components",
            "Welcome to the Journey"
        ];

        let progress = 0;
        let speed = 20;

        const updateProgress = () => {
            const increment = Math.floor(Math.random() * 8) + 2;
            progress = Math.min(progress + increment, 100);

            fill.style.width = `${progress}%`;
            num.textContent = `${String(progress).padStart(2, '0')}%`;

            const statusIdx = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
            if (status) {
                status.textContent = statuses[statusIdx];
            }

            if (progress < 100) {
                const currentSpeed = (document.readyState === 'complete' && progress > 40) ? 6 : speed;
                setTimeout(updateProgress, currentSpeed);
            } else {
                setTimeout(() => {
                    loader.classList.add('loaded');
                    
                    // Trigger scroll reveals for first section
                    setTimeout(() => {
                        const firstSection = document.querySelector('.story-section');
                        if (firstSection) {
                            firstSection.querySelectorAll('.reveal-item').forEach(item => {
                                item.classList.add('revealed');
                            });
                        }
                    }, 400);
                }, 400);
            }
        };

        setTimeout(updateProgress, 100);
    };
    initPageLoader();

    // ==========================================================================
    // 2. INTERACTIVITY ENGINE: 3D CARD TILT & MAGNETIC PARALLAX
    // ==========================================================================
    const initInteractivityEngine = () => {
        // 2A. 3D Tilt Engine for Cards
        const initTiltCards = () => {
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                // Find or create shine element for mouse-reflective lighting
                let shine = card.querySelector('.card-shine');
                if (!shine) {
                    shine = document.createElement('div');
                    shine.className = 'card-shine';
                    card.appendChild(shine);
                }

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // Calculate rotation angles (max tilt ~10 degrees)
                    const rotateX = ((centerY - y) / centerY) * 10;
                    const rotateY = ((x - centerX) / centerX) * 10;

                    // Smooth rotation on hover
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                    // Shine gradient tracking
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%)`;
                    shine.style.opacity = '1';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    shine.style.opacity = '0';
                });
            });
        };
        initTiltCards();

        // 2B. Magnetic component pull effects with inner parallax depth
        const initMagnets = () => {
            const magneticElements = document.querySelectorAll('.btn-modern-primary, .btn-modern-outline, .about-social-link, .nav-item, .modern-logo');
            
            magneticElements.forEach(el => {
                el.classList.add('magnetic-item');

                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    // Pull elements by 30% displacement
                    window.requestAnimationFrame(() => {
                        el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
                        
                        // Parallax offset for nested labels/icons inside elements
                        const popContent = el.querySelector('i, span, p');
                        if (popContent) {
                            popContent.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
                            popContent.style.transition = 'none'; // Instant follow during mousemove
                        }
                    });
                });

                el.addEventListener('mouseleave', () => {
                    window.requestAnimationFrame(() => {
                        el.style.transform = 'translate3d(0, 0, 0)';
                        
                        const popContent = el.querySelector('i, span, p');
                        if (popContent) {
                            popContent.style.transform = 'translate3d(0, 0, 0)';
                            popContent.style.transition = 'transform 0.4s ease'; // Smooth reset on leave
                        }
                    });
                });
            });
        };
        initMagnets();
    };
    initInteractivityEngine();

    // ==========================================================================
    // 3. FLOATING NAVBAR
    // ==========================================================================
    const initNavbar = () => {
        const navContainer = document.querySelector('.modern-navbar-container');
        if (!navContainer) return;

        const handleScroll = () => {
            if (window.scrollY > 40) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    };
    initNavbar();

    // ==========================================================================
    // 4. MOBILE NAVBAR MENU OVERLAY
    // ==========================================================================
    const initMobileMenu = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navOverlay = document.querySelector('.mobile-nav-overlay');
        
        if (!navToggle || !navOverlay) return;

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navOverlay.classList.toggle('active');
            
            if (navOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        const navLinks = navOverlay.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    };
    initMobileMenu();

    // ==========================================================================
    // 5. SCROLL PROGRESS BAR
    // ==========================================================================
    const initScrollProgress = () => {
        const progressBar = document.querySelector('.KW_progressBar');
        if (!progressBar) return;

        const updateProgress = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const progress = (window.scrollY / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    };
    initScrollProgress();

    // ==========================================================================
    // 6. HERO TYPING BANNER
    // ==========================================================================
    const initTypewriter = () => {
        const typedSpan = document.querySelector('.hero-role-typed');
        if (!typedSpan) return;

        const words = [
            "Full Stack Developer",
            "MERN Stack Developer",
            "Next.js Developer",
            "Docker & AWS Developer"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 30 : 60;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }
            
            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 800);
    };
    initTypewriter();

    // ==========================================================================
    // 7. THREE.JS 3D SPACE FLIGHT & WARP SPEED ENGINE (LUSION-STYLE WORLD TRAVEL)
    // ==========================================================================
    const initSpaceFlight = () => {
        const canvas = document.getElementById('canvas-3d');
        if (!canvas || !window.THREE) return;

        const chapterColors = [
            '#030206', // 0: Home (Deep space)
            '#060214', // 1: Resume (Violet hue)
            '#020b0f', // 2: Services (Teal grid)
            '#0c020d', // 3: Portfolio (Purple nebula)
            '#020707'  // 4: Contact (Teal galaxy)
        ];

        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(0, 0, 450);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const createGlowTexture = (colorStr) => {
            const canv = document.createElement('canvas');
            canv.width = 16;
            canv.height = 16;
            const ctx = canv.getContext('2d');
            const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.35, colorStr);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 16, 16);
            return new THREE.CanvasTexture(canv);
        };

        const cyanTexture = createGlowTexture('rgba(6,182,212,0.85)');
        const violetTexture = createGlowTexture('rgba(139,92,246,0.85)');

        const tunnelMaterial = new THREE.PointsMaterial({
            size: 4,
            map: cyanTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const shapeMaterial = new THREE.PointsMaterial({
            size: 4.8,
            map: violetTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        // SYSTEM A: 3D CYLINDRICAL SPACE TUNNEL
        const tunnelCount = 1800;
        const tunnelGeometry = new THREE.BufferGeometry();
        const tunnelPositions = new Float32Array(tunnelCount * 3);

        for (let i = 0; i < tunnelCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 150 + Math.random() * 200;
            const z = (Math.random() - 0.5) * 2600 - 400; 
            
            tunnelPositions[i * 3] = Math.cos(angle) * radius;
            tunnelPositions[i * 3 + 1] = Math.sin(angle) * radius;
            tunnelPositions[i * 3 + 2] = z;
        }

        tunnelGeometry.setAttribute('position', new THREE.BufferAttribute(tunnelPositions, 3));
        const tunnelPoints = new THREE.Points(tunnelGeometry, tunnelMaterial);
        scene.add(tunnelPoints);

        // SYSTEM B: SPATIAL CONSTELLATION NODES (Along Z-axis)
        
        // Shape 1: Double DNA Helix (Z = 200)
        const helixCount = 250;
        const helixGeom = new THREE.BufferGeometry();
        const helixPos = new Float32Array(helixCount * 3);
        for (let i = 0; i < helixCount; i++) {
            const angle = (i / helixCount) * Math.PI * 14;
            const radius = 45;
            const side = i % 2 === 0 ? 1 : -1;
            helixPos[i * 3] = Math.cos(angle) * radius * side;
            helixPos[i * 3 + 1] = (i / helixCount - 0.5) * 180;
            helixPos[i * 3 + 2] = Math.sin(angle) * radius * side;
        }
        helixGeom.setAttribute('position', new THREE.BufferAttribute(helixPos, 3));
        const helixMesh = new THREE.Points(helixGeom, shapeMaterial);
        helixMesh.position.set(0, 0, 200);
        scene.add(helixMesh);

        // Shape 2: Torus Knot (Z = -200)
        const knotCount = 300;
        const knotGeom = new THREE.BufferGeometry();
        const knotPos = new Float32Array(knotCount * 3);
        for (let i = 0; i < knotCount; i++) {
            const phi = (i / knotCount) * Math.PI * 2 * 6;
            const r = 50 + Math.sin(phi * 3) * 15;
            knotPos[i * 3] = r * Math.cos(2 * phi) * Math.cos(3 * phi);
            knotPos[i * 3 + 1] = r * Math.sin(2 * phi) * Math.cos(3 * phi);
            knotPos[i * 3 + 2] = r * Math.sin(3 * phi);
        }
        knotGeom.setAttribute('position', new THREE.BufferAttribute(knotPos, 3));
        const knotMesh = new THREE.Points(knotGeom, shapeMaterial);
        knotMesh.position.set(0, 0, -200);
        scene.add(knotMesh);

        // Shape 3: Concentric Loops (Z = -600)
        const loopsCount = 300;
        const loopsGeom = new THREE.BufferGeometry();
        const loopsPos = new Float32Array(loopsCount * 3);
        for (let i = 0; i < loopsCount; i++) {
            const ringIdx = i % 3;
            const angle = (i / (loopsCount / 3)) * Math.PI * 2;
            const r = 50 + ringIdx * 30;
            if (ringIdx === 0) {
                loopsPos[i * 3] = Math.cos(angle) * r;
                loopsPos[i * 3 + 1] = Math.sin(angle) * r;
                loopsPos[i * 3 + 2] = 0;
            } else if (ringIdx === 1) {
                loopsPos[i * 3] = Math.cos(angle) * r;
                loopsPos[i * 3 + 1] = 0;
                loopsPos[i * 3 + 2] = Math.sin(angle) * r;
            } else {
                loopsPos[i * 3] = 0;
                loopsPos[i * 3 + 1] = Math.cos(angle) * r;
                loopsPos[i * 3 + 2] = Math.sin(angle) * r;
            }
        }
        loopsGeom.setAttribute('position', new THREE.BufferAttribute(loopsPos, 3));
        const loopsMesh = new THREE.Points(loopsGeom, shapeMaterial);
        loopsMesh.position.set(0, 0, -600);
        scene.add(loopsMesh);

        // Shape 4: Digital Wave Grid (Z = -1000)
        const waveCount = 400;
        const waveGeom = new THREE.BufferGeometry();
        const wavePos = new Float32Array(waveCount * 3);
        const waveOriginals = [];
        const cols = 20;
        for (let i = 0; i < waveCount; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const px = (col - cols / 2) * 15;
            const pz = (row - (waveCount / cols) / 2) * 15;
            const py = 0;
            
            wavePos[i * 3] = px;
            wavePos[i * 3 + 1] = py;
            wavePos[i * 3 + 2] = pz;
            waveOriginals.push({ x: px, z: pz, speed: 0.8 + Math.random() * 1.5 });
        }
        waveGeom.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
        const waveMesh = new THREE.Points(waveGeom, shapeMaterial);
        waveMesh.position.set(0, -65, -1000); 
        scene.add(waveMesh);

        // Shape 5: Sphere Globe (Z = -1400)
        const globeCount = 300;
        const globeGeom = new THREE.BufferGeometry();
        const globePos = new Float32Array(globeCount * 3);
        for (let i = 0; i < globeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 90;
            globePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            globePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            globePos[i * 3 + 2] = r * Math.cos(phi);
        }
        globeGeom.setAttribute('position', new THREE.BufferAttribute(globePos, 3));
        const globeMesh = new THREE.Points(globeGeom, shapeMaterial);
        globeMesh.position.set(0, 0, -1400);
        scene.add(globeMesh);

        // FLIGHT PHYSICS & SCROLL CONTROLS
        let currentChapterIndex = 0;
        const sections = document.querySelectorAll('.story-section');
        const chapterDots = document.querySelectorAll('.chapter-dot');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.getAttribute('data-chapter'));
                    if (idx !== currentChapterIndex) {
                        currentChapterIndex = idx;
                        document.body.style.backgroundColor = chapterColors[idx];
                        
                        chapterDots.forEach((dot, dIdx) => {
                            if (dIdx === idx) dot.classList.add('active');
                            else dot.classList.remove('active');
                        });
                    }
                }
            });
        }, { threshold: 0.35 });
        sections.forEach(sec => observer.observe(sec));

        // Speed warp tracking
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollVelocity += Math.abs(currentScrollY - lastScrollY) * 0.15;
            lastScrollY = currentScrollY;
        });

        // Mouse Steering Rigs
        let mouseX = 0, mouseY = 0;
        let targetCamX = 0, targetCamY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.12;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.12;
        });

        // Render Frame loop
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.005;

            // Z-axis Space Flight position mapping
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
            
            const startZ = 450;
            const endZ = -1500;
            const targetCamZ = startZ + scrollPercent * (endZ - startZ);
            camera.position.z += (targetCamZ - camera.position.z) * 0.04;

            // Mouse camera steering adjustments
            targetCamX += (mouseX * 0.7 - targetCamX) * 0.04;
            targetCamY += (-mouseY * 0.7 - targetCamY) * 0.04;
            camera.position.x += (targetCamX - camera.position.x) * 0.04;
            camera.position.y += (targetCamY - camera.position.y) * 0.04;

            const lookZ = camera.position.z - 250;
            camera.lookAt(new THREE.Vector3(targetCamX * 0.25, targetCamY * 0.25, lookZ));

            // Eased warp stretch (FOV adjustments)
            scrollVelocity *= 0.92;
            const targetFov = 60 + Math.min(scrollVelocity, 40) * 0.45;
            camera.fov += (targetFov - camera.fov) * 0.1;
            camera.updateProjectionMatrix();

            // Slow rotations
            helixMesh.rotation.y = time * 0.4;
            helixMesh.rotation.x = time * 0.1;

            knotMesh.rotation.z = time * 0.25;
            knotMesh.rotation.y = time * 0.15;

            loopsMesh.rotation.x = time * 0.3;
            loopsMesh.rotation.y = time * 0.3;

            globeMesh.rotation.y = time * 0.2;
            globeMesh.rotation.z = time * 0.08;

            tunnelPoints.rotation.z = time * 0.05;

            const wavePosAttr = waveGeom.attributes.position;
            for (let i = 0; i < waveCount; i++) {
                const orig = waveOriginals[i];
                const waveY = Math.sin(orig.x * 0.02 + time * orig.speed * 4) * 
                              Math.cos(orig.z * 0.02 + time * orig.speed * 4) * 20;
                wavePosAttr.array[i * 3 + 1] = waveY;
            }
            wavePosAttr.needsUpdate = true;

            renderer.render(scene, camera);
        };

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.body.style.backgroundColor = chapterColors[0];
        animate();
    };
    initSpaceFlight();

    // ==========================================================================
    // 8. BACKGROUND OUTLINE WATERMARKS PARALLAX
    // ==========================================================================
    const initWatermarkParallax = () => {
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                const watermarks = document.querySelectorAll('.bg-watermark');
                const scrollY = window.scrollY;
                watermarks.forEach((wm, idx) => {
                    const speed = (idx % 2 === 0) ? 0.25 : -0.25;
                    wm.style.transform = `translateY(-50%) translateX(${scrollY * speed}px)`;
                });
            });
        });
    };
    initWatermarkParallax();

    // ==========================================================================
    // 9. ADVANCED CSS 3D TILT ENGINE
    // ==========================================================================
    const init3DTilt = () => {
        const tiltCards = document.querySelectorAll('.tilt-card');
        if (tiltCards.length === 0) return;

        tiltCards.forEach(card => {
            let shine = card.querySelector('.card-shine');
            if (!shine) {
                shine = document.createElement('div');
                shine.className = 'card-shine';
                card.appendChild(shine);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const cardWidth = rect.width;
                const cardHeight = rect.height;

                const centerX = cardWidth / 2;
                const centerY = cardHeight / 2;

                const maxRotate = 10;

                const rotateX = ((centerY - mouseY) / centerY) * maxRotate;
                const rotateY = ((mouseX - centerX) / centerX) * maxRotate;

                const shineX = (mouseX / cardWidth) * 100;
                const shineY = (mouseY / cardHeight) * 100;

                window.requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 60%)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                window.requestAnimationFrame(() => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                    shine.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 60%)';
                });
            });
        });
    };
    init3DTilt();

    // ==========================================================================
    // 10. SCROLL REVEAL TRIGGERS (Intersection Observer)
    // ==========================================================================
    const initScrollReveals = () => {
        const revealItems = document.querySelectorAll('.reveal-item');
        if (revealItems.length === 0) return;

        const observerOptions = {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        const targetWidth = skillBar.getAttribute('data-width');
                        skillBar.style.width = targetWidth;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);
        revealItems.forEach(item => observer.observe(item));
    };
    initScrollReveals();

    // ==========================================================================
    // 11. ACHIEVEMENT METRICS COUNTERS
    // ==========================================================================
    const initCounters = () => {
        const counterNumbers = document.querySelectorAll('.counter-number');
        if (counterNumbers.length === 0) return;

        const animateCounter = (el) => {
            const target = +el.getAttribute('data-count');
            let current = 0;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = `${target}+`;
                    clearInterval(timer);
                } else {
                    el.textContent = `${Math.ceil(current)}+`;
                }
            }, stepTime);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterNumbers.forEach(num => counterObserver.observe(num));
    };
    initCounters();
});