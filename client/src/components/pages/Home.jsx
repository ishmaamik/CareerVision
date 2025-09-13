import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses } from "../../styles/themes";
import * as THREE from "three";

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const objectsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    candidates: 0,
    success: 0,
  });

  // Enhanced features with human-centered descriptions
  const features = [
    {
      icon: "🧭",
      title: "Personal Career Navigation",
      description:
        "Like a GPS for your career journey. Our AI understands your unique strengths, interests, and goals to guide you toward fulfilling opportunities that align with who you are.",
      benefits: [
        "Personalized career mapping",
        "Skills assessment & growth",
        "Market opportunity insights",
      ],
      color: isDarkMode ? "#22C55E" : "#D4A574",
    },
    {
      icon: "🌟",
      title: "Skill-Centric Job Matching",
      description:
        "Connect with opportunities that value what you bring to the table. Our platform showcases your skills to employers who are looking for exactly what you offer.",
      benefits: [
        "Skill-based matching",
        "Portfolio showcase",
        "Direct employer connections",
      ],
      color: isDarkMode ? "#4ADE80" : "#F59E0B",
    },
    {
      icon: "💬",
      title: "Interactive Interview Mastery",
      description:
        "Build confidence through practice with real-world scenarios. Our AI coaching adapts to your communication style and helps you present your best authentic self.",
      benefits: [
        "Personalized feedback",
        "Confidence building",
        "Real-time improvement",
      ],
      color: isDarkMode ? "#16A34A" : "#EAB308",
    },
    {
      icon: "🎯",
      title: "Purpose-Driven Growth Paths",
      description:
        "Every professional journey is unique. Create learning roadmaps that evolve with your ambitions, keeping you motivated and on track toward your ideal career.",
      benefits: [
        "Adaptive learning paths",
        "Goal-oriented milestones",
        "Progress celebration",
      ],
      color: isDarkMode ? "#10B981" : "#C17817",
    },
  ];

  // Enhanced counter animation
  useEffect(() => {
    const targetStats = {
      jobs: 25000,
      companies: 5000,
      candidates: 150000,
      success: 98,
    };

    const duration = 3000;
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setStats({
        jobs: Math.floor(targetStats.jobs * easeOutCubic),
        companies: Math.floor(targetStats.companies * easeOutCubic),
        candidates: Math.floor(targetStats.candidates * easeOutCubic),
        success: Math.floor(targetStats.success * easeOutCubic),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array is correct here

  // Enhanced Three.js setup with Interactive 3D Globe
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    camera.position.set(0, 0, 6);

    // Lighting for the globe
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      isDarkMode ? 0x22c55e : 0xd4a574,
      1.0
    );
    directionalLight.position.set(3, 3, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(
      isDarkMode ? 0x4ade80 : 0xf59e0b,
      0.8,
      10
    );
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Create Interactive 3D Globe
    const createGlobe = () => {
      const globeGroup = new THREE.Group();

      // Main Globe Sphere
      const globeGeometry = new THREE.SphereGeometry(2, 64, 64);

      // Globe wireframe
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: isDarkMode ? 0x22c55e : 0xd4a574,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const wireframeGlobe = new THREE.Mesh(globeGeometry, wireframeMaterial);

      // Globe surface with gradient effect
      const surfaceMaterial = new THREE.MeshPhysicalMaterial({
        color: isDarkMode ? 0x1a4d3a : 0xe8ddd0,
        transparent: true,
        opacity: 0.1,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });
      const surfaceGlobe = new THREE.Mesh(globeGeometry, surfaceMaterial);

      globeGroup.add(wireframeGlobe);
      globeGroup.add(surfaceGlobe);

      // Add glowing rings around the globe
      const ringGeometry = new THREE.TorusGeometry(2.3, 0.02, 16, 100);

      // Horizontal ring
      const horizontalRing = new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
          color: isDarkMode ? 0x4ade80 : 0xf59e0b,
          transparent: true,
          opacity: 0.8,
        })
      );
      horizontalRing.rotation.x = Math.PI / 2;

      // Vertical ring
      const verticalRing = new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
          color: isDarkMode ? 0x22c55e : 0xd4a574,
          transparent: true,
          opacity: 0.6,
        })
      );

      // Diagonal ring
      const diagonalRing = new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
          color: isDarkMode ? 0x16a34a : 0xeab308,
          transparent: true,
          opacity: 0.4,
        })
      );
      diagonalRing.rotation.z = Math.PI / 4;
      diagonalRing.rotation.x = Math.PI / 4;

      globeGroup.add(horizontalRing);
      globeGroup.add(verticalRing);
      globeGroup.add(diagonalRing);

      // Store references for animation
      globeGroup.userData = {
        wireframe: wireframeGlobe,
        surface: surfaceGlobe,
        rings: [horizontalRing, verticalRing, diagonalRing],
        isInteracting: false,
        targetRotation: { x: 0, y: 0 },
        currentRotation: { x: 0, y: 0 },
      };

      scene.add(globeGroup);
      return globeGroup;
    };

    const globe = createGlobe();
    objectsRef.current = [globe];

    // Create floating connection points around the globe with career keywords
    const createConnectionPoints = () => {
      const points = [];
      const careerKeywords = [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "UX Designer",
        "Marketing Manager",
        "Sales Director",
        "Finance Analyst",
        "HR Specialist",
        "DevOps Engineer",
        "Business Analyst",
        "Project Manager",
        "Consultant",
        "Research Scientist",
        "Digital Marketer",
        "Operations Manager",
        "AI Engineer",
        "Cybersecurity Expert",
        "Cloud Architect",
        "Full Stack Developer",
        "Strategy Lead",
      ];

      const pointCount = careerKeywords.length;

      for (let i = 0; i < pointCount; i++) {
        // Distribute points evenly on sphere surface
        const phi = Math.acos(-1 + (2 * i) / pointCount);
        const theta = Math.sqrt(pointCount * Math.PI) * phi;

        const x = 2.4 * Math.cos(theta) * Math.sin(phi);
        const y = 2.4 * Math.cos(phi);
        const z = 2.4 * Math.sin(theta) * Math.sin(phi);

        // Create point geometry
        const pointGeometry = new THREE.SphereGeometry(0.06, 8, 8);
        const pointMaterial = new THREE.MeshBasicMaterial({
          color: isDarkMode ? 0x22c55e : 0xd4a574,
          transparent: true,
          opacity: 0.9,
        });

        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);

        // Create text label for career keyword
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 64;

        // Style the text
        context.fillStyle = isDarkMode ? "#22C55E" : "#D4A574";
        context.font = "bold 16px Arial";
        context.textAlign = "center";
        context.fillText(careerKeywords[i], 128, 35);

        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.8,
        });

        const label = new THREE.Sprite(labelMaterial);
        label.scale.set(1, 0.25, 1);
        label.position.set(x * 1.15, y * 1.15, z * 1.15);

        // Add pulsing effect and career data
        point.userData = {
          originalScale: 1,
          pulseSpeed: 1 + Math.random() * 2,
          pulsePhase: Math.random() * Math.PI * 2,
          careerTitle: careerKeywords[i],
          label: label,
        };

        scene.add(point);
        scene.add(label);
        points.push(point);
      }

      return points;
    };

    const connectionPoints = createConnectionPoints();

    // Mouse interaction for globe rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseDown = (event) => {
      isMouseDown = true;
      globe.userData.isInteracting = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isMouseDown) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        mouseX = event.clientX;
        mouseY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setTimeout(() => {
        globe.userData.isInteracting = false;
      }, 1000);
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    // Create background particles
    const createParticles = () => {
      const particleCount = 150;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;

        const color = new THREE.Color();
        color.setHSL(
          isDarkMode ? 0.3 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1,
          0.7,
          0.6 + Math.random() * 0.4
        );

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      return particles;
    };

    particlesRef.current = createParticles();

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate globe
      if (globe) {
        // Auto-rotation when not interacting
        if (!globe.userData.isInteracting) {
          targetRotationY += 0.005;
        }

        // Smooth rotation interpolation
        globe.userData.currentRotation.x +=
          (targetRotationX - globe.userData.currentRotation.x) * 0.05;
        globe.userData.currentRotation.y +=
          (targetRotationY - globe.userData.currentRotation.y) * 0.05;

        globe.rotation.x = globe.userData.currentRotation.x;
        globe.rotation.y = globe.userData.currentRotation.y;

        // Animate rings
        globe.userData.rings[0].rotation.z += 0.01; // Horizontal ring
        globe.userData.rings[1].rotation.y += 0.008; // Vertical ring
        globe.userData.rings[2].rotation.x += 0.012; // Diagonal ring

        // Breathing effect for the globe
        const breathScale = 1 + Math.sin(time * 1.2) * 0.02;
        globe.scale.setScalar(breathScale);
      }

      // Animate connection points and labels
      connectionPoints.forEach((point, index) => {
        // Pulsing effect
        const pulse =
          1 +
          Math.sin(
            time * point.userData.pulseSpeed + point.userData.pulsePhase
          ) *
            0.3;
        point.scale.setScalar(pulse);

        // Gentle floating
        const float = Math.sin(time * 0.5 + index) * 0.05;
        point.position.y += float * 0.01;

        // Rotate labels to always face camera
        if (point.userData.label) {
          point.userData.label.lookAt(camera.position);
          // Gentle floating for labels too
          point.userData.label.position.y += float * 0.01;
        }
      });

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0003;
        particlesRef.current.rotation.x += 0.0001;
      }

      // Camera movement based on mouse (subtle)
      camera.position.x +=
        (mouseRef.current.x * 0.2 - camera.position.x) * 0.02;
      camera.position.y +=
        (mouseRef.current.y * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();
    animationIdRef.current = animationId;
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });

      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen ${themeClasses.bg.primary} transition-all duration-500 overflow-hidden relative`}
    >
      {/* Hero Section with Clean Layout */}
      <section className="min-h-screen flex items-center">
        {/* Left Content - Simplified */}
        <div className="w-1/2 px-6 lg:px-12 z-10">
          <div className="space-y-8 max-w-xl">
            {/* Hero Badge */}
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${themeClasses.bg.surface} ${themeClasses.border.primary} border shadow-lg backdrop-blur-sm`}
            >
              <span className="text-2xl">🌍</span>
              <span
                className={`text-sm font-medium ${themeClasses.text.secondary}`}
              >
                Global Career Opportunities
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1
                className={`text-4xl lg:text-6xl font-bold ${themeClasses.text.primary} leading-tight`}
              >
                <span className="block">Discover</span>
                <span
                  className={`block bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}
                >
                  Global Careers
                </span>
              </h1>

              <p
                className={`text-lg lg:text-xl ${themeClasses.text.secondary} leading-relaxed`}
              >
                Connect with opportunities worldwide. AI-powered matching,
                global network, endless possibilities.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className={`px-8 py-4 ${themeClasses.brand.bg} text-white rounded-xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl`}
              >
                Explore Opportunities
              </button>

              <button
                onClick={() => navigate("/discover")}
                className={`px-8 py-4 ${themeClasses.bg.surface} ${themeClasses.text.primary} border-2 ${themeClasses.border.primary} rounded-xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Learn More
              </button>
            </div>

            {/* Simplified Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                {
                  number: stats.jobs.toLocaleString() + "+",
                  label: "Global Jobs",
                },
                {
                  number: stats.companies.toLocaleString() + "+",
                  label: "Companies",
                },
                { number: stats.success + "%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`text-2xl lg:text-3xl font-bold ${themeClasses.brand.primary} mb-1`}
                  >
                    {stat.number}
                  </div>
                  <div
                    className={`text-sm ${themeClasses.text.muted} font-medium`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - 3D Globe (Takes More Space) */}
        <div className="w-1/2 h-screen relative">
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        </div>
      </section>

      {/* Simplified Features Section */}
      <section className={`py-16 px-6 lg:px-12 ${themeClasses.bg.secondary}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl lg:text-4xl font-bold ${themeClasses.text.primary} mb-4`}
            >
              Why{" "}
              <span
                className={`bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}
              >
                CareerVision
              </span>
            </h2>
            <p
              className={`text-lg ${themeClasses.text.secondary} max-w-2xl mx-auto`}
            >
              Professional platform designed for global career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 ${themeClasses.bg.surface} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${themeClasses.border.primary} border`}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3
                  className={`text-lg font-bold ${themeClasses.text.primary} mb-3`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`${themeClasses.text.secondary} text-sm leading-relaxed mb-4`}
                >
                  {feature.description.split(".")[0]}.
                </p>

                <div className="space-y-1">
                  {feature.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div
                        className={`w-1.5 h-1.5 ${themeClasses.brand.bg} rounded-full`}
                      />
                      <span className={`text-xs ${themeClasses.text.muted}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Opportunities Section */}
      <section className={`py-20 px-6 lg:px-12 ${themeClasses.bg.primary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl lg:text-5xl font-bold ${themeClasses.text.primary} mb-6`}
            >
              <span
                className={`bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}
              >
                Global
              </span>{" "}
              Career Network
            </h2>
            <p
              className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}
            >
              Connect with opportunities across continents. Our platform bridges
              talent with global employers, creating pathways to international
              career success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* International Companies */}
            <div
              className={`${themeClasses.bg.surface} rounded-2xl p-8 shadow-xl`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${themeClasses.brand.bg} rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4`}
                >
                  🏢
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Global Companies
                  </h3>
                  <p className={`${themeClasses.text.muted} text-sm`}>
                    Fortune 500 & Startups
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Remote-First Organizations",
                  "Multinational Corporations",
                  "Tech Unicorns",
                  "Innovation Labs",
                  "Government Agencies",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 ${themeClasses.brand.bg} rounded-full`}
                    />
                    <span className={`${themeClasses.text.secondary} text-sm`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div
              className={`${themeClasses.bg.surface} rounded-2xl p-8 shadow-xl`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${themeClasses.brand.bg} rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4`}
                >
                  🚀
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Career Paths
                  </h3>
                  <p className={`${themeClasses.text.muted} text-sm`}>
                    Diverse Opportunities
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Technology & Engineering",
                  "Business & Strategy",
                  "Creative & Design",
                  "Healthcare & Research",
                  "Finance & Analytics",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 ${themeClasses.brand.bg} rounded-full`}
                    />
                    <span className={`${themeClasses.text.secondary} text-sm`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div
              className={`${themeClasses.bg.surface} rounded-2xl p-8 shadow-xl`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${themeClasses.brand.bg} rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4`}
                >
                  ⭐
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Success Stories
                  </h3>
                  <p className={`${themeClasses.text.muted} text-sm`}>
                    Real Career Growth
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "150K+ Successful Placements",
                  "98% Interview Success Rate",
                  "85% Salary Increase Average",
                  "60+ Countries Reached",
                  "24/7 Career Support",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 ${themeClasses.brand.bg} rounded-full`}
                    />
                    <span className={`${themeClasses.text.secondary} text-sm`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Features Section */}
      <section className={`py-20 px-6 lg:px-12 ${themeClasses.bg.secondary}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl lg:text-5xl font-bold ${themeClasses.text.primary} mb-6`}
            >
              AI-Powered{" "}
              <span
                className={`bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}
              >
                Career Intelligence
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}
            >
              Advanced algorithms and machine learning drive personalized career
              recommendations, skill gap analysis, and market trend insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div
                className={`${themeClasses.bg.surface} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">🤖</div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Smart Matching Algorithm
                  </h3>
                </div>
                <p className={`${themeClasses.text.secondary} mb-4`}>
                  Our AI analyzes your skills, experience, and career goals to
                  match you with opportunities that align perfectly with your
                  professional aspirations.
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 ${themeClasses.brand.bg} text-white text-xs rounded-full`}
                  >
                    95% Accuracy
                  </div>
                  <div
                    className={`px-3 py-1 ${themeClasses.bg.accent} ${themeClasses.text.primary} text-xs rounded-full`}
                  >
                    Real-time Updates
                  </div>
                </div>
              </div>

              <div
                className={`${themeClasses.bg.surface} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">📊</div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Market Intelligence
                  </h3>
                </div>
                <p className={`${themeClasses.text.secondary} mb-4`}>
                  Stay ahead with real-time salary data, skill demand trends,
                  and industry insights from over 60 countries worldwide.
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 ${themeClasses.brand.bg} text-white text-xs rounded-full`}
                  >
                    Live Data
                  </div>
                  <div
                    className={`px-3 py-1 ${themeClasses.bg.accent} ${themeClasses.text.primary} text-xs rounded-full`}
                  >
                    Global Insights
                  </div>
                </div>
              </div>

              <div
                className={`${themeClasses.bg.surface} p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">🎯</div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text.primary}`}
                  >
                    Personalized Roadmaps
                  </h3>
                </div>
                <p className={`${themeClasses.text.secondary} mb-4`}>
                  AI-generated learning paths and skill development plans
                  tailored to your target roles and career timeline.
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 ${themeClasses.brand.bg} text-white text-xs rounded-full`}
                  >
                    Adaptive Learning
                  </div>
                  <div
                    className={`px-3 py-1 ${themeClasses.bg.accent} ${themeClasses.text.primary} text-xs rounded-full`}
                  >
                    Goal-Oriented
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${themeClasses.bg.surface} p-8 rounded-2xl shadow-xl`}
            >
              <h3
                className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 text-center`}
              >
                Platform Statistics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${themeClasses.brand.primary} mb-2`}
                  >
                    5M+
                  </div>
                  <div className={`text-sm ${themeClasses.text.muted}`}>
                    AI Matches Made
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${themeClasses.brand.primary} mb-2`}
                  >
                    99.7%
                  </div>
                  <div className={`text-sm ${themeClasses.text.muted}`}>
                    Platform Uptime
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${themeClasses.brand.primary} mb-2`}
                  >
                    2.3s
                  </div>
                  <div className={`text-sm ${themeClasses.text.muted}`}>
                    Avg Response Time
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${themeClasses.brand.primary} mb-2`}
                  >
                    24/7
                  </div>
                  <div className={`text-sm ${themeClasses.text.muted}`}>
                    AI Support
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-opacity-20">
                <div className="text-center">
                  <p className={`${themeClasses.text.secondary} text-sm mb-4`}>
                    Join the thousands of professionals who trust our AI to
                    accelerate their careers
                  </p>
                  <button
                    onClick={() => navigate("/demo")}
                    className={`px-6 py-3 ${themeClasses.brand.bg} text-white rounded-xl font-semibold hover:scale-105 transform transition-all duration-300`}
                  >
                    Try AI Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-6 lg:px-12 ${themeClasses.bg.primary}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl lg:text-5xl font-bold ${themeClasses.text.primary} mb-6`}
            >
              Success{" "}
              <span
                className={`bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}
              >
                Stories
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.text.secondary} max-w-2xl mx-auto`}
            >
              Real professionals, real career transformations, real global
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Data Scientist",
                company: "Google",
                location: "Singapore → Mountain View",
                image: "👩‍💻",
                quote:
                  "CareerVision's AI matching connected me with my dream role at Google. The personalized roadmap helped me upskill strategically.",
                outcome: "300% salary increase",
              },
              {
                name: "Marcus Johnson",
                role: "Product Manager",
                company: "Spotify",
                location: "Lagos → Stockholm",
                image: "👨‍💼",
                quote:
                  "From Nigeria to Sweden, CareerVision made my international career transition seamless. The global network is incredible.",
                outcome: "Lead PM role in 6 months",
              },
              {
                name: "Priya Sharma",
                role: "UX Design Lead",
                company: "Airbnb",
                location: "Mumbai → San Francisco",
                image: "👩‍🎨",
                quote:
                  "The interview coaching and skill assessments were game-changers. I felt confident and well-prepared for every opportunity.",
                outcome: "Design Lead at 28",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`${themeClasses.bg.surface} rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${themeClasses.text.primary}`}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className={`${themeClasses.brand.primary} font-semibold text-sm`}
                    >
                      {testimonial.role}
                    </p>
                    <p className={`${themeClasses.text.muted} text-xs`}>
                      {testimonial.company} • {testimonial.location}
                    </p>
                  </div>
                </div>

                <blockquote
                  className={`${themeClasses.text.secondary} italic mb-6 leading-relaxed`}
                >
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`px-4 py-2 ${themeClasses.brand.bg} text-white rounded-lg text-center font-semibold text-sm`}
                >
                  {testimonial.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section
        className={`py-16 px-6 lg:px-12 ${themeClasses.bg.primary} relative overflow-hidden`}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2
            className={`text-3xl lg:text-4xl font-bold ${themeClasses.text.primary} mb-6`}
          >
            Ready to Go Global?
          </h2>
          <p
            className={`text-lg ${themeClasses.text.secondary} mb-8 max-w-xl mx-auto`}
          >
            Join professionals worldwide who are building international careers
            with CareerVision.
          </p>

          <button
            onClick={() => navigate("/register")}
            className={`px-10 py-4 ${themeClasses.brand.bg} text-white rounded-xl font-bold text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl`}
          >
            Start Your Global Journey
          </button>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-32 h-32 ${themeClasses.brand.bg} rounded-full blur-3xl animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
