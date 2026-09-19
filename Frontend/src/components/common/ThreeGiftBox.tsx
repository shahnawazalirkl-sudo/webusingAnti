"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeGiftBox = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 460;
    const height = currentMount.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 6.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2.2, 20);
    goldLight.position.set(-3, 3, 4);
    scene.add(goldLight);

    const softPinkLight = new THREE.PointLight(0xf472b6, 1.2, 18);
    softPinkLight.position.set(3, 2, 3);
    scene.add(softPinkLight);

    // Group for entire showcase
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);

    // Materials
    const goldMat = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      specular: 0xffe28a,
      shininess: 90
    });

    const creamBoxMat = new THREE.MeshPhongMaterial({
      color: 0xfdfaf5,
      specular: 0xffffff,
      shininess: 35
    });

    const blushBoxMat = new THREE.MeshPhongMaterial({
      color: 0xedd3c8,
      specular: 0xfff0ea,
      shininess: 40
    });

    const velvetMat = new THREE.MeshPhongMaterial({
      color: 0x831843,
      specular: 0xbe185d,
      shininess: 25
    });

    const glassMat = new THREE.MeshPhongMaterial({
      color: 0x243e2e,
      specular: 0x5eead4,
      shininess: 100,
      transparent: true,
      opacity: 0.85
    });

    // 1. Luxury Gift Box (Left & Center)
    const boxGroup = new THREE.Group();
    boxGroup.position.set(-0.2, -0.4, 0);

    // Base Box
    const boxBottom = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.2, 2.3), creamBoxMat);
    boxBottom.castShadow = true;
    boxBottom.receiveShadow = true;
    boxGroup.add(boxBottom);

    // Open Tilt Lid
    const boxLid = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 2.4), blushBoxMat);
    boxLid.position.set(0.6, 1.1, -0.4);
    boxLid.rotation.x = -0.3;
    boxLid.rotation.z = 0.25;
    boxLid.castShadow = true;
    boxGroup.add(boxLid);

    // Gold Ribbons across Box Lid
    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.37, 0.3), goldMat);
    boxLid.add(ribbonH);
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.37, 2.44), goldMat);
    boxLid.add(ribbonV);

    // Gold Monogram Seal on Lid
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 32), goldMat);
    seal.position.set(0, 0.22, 0);
    boxLid.add(seal);

    // 2. Interior Elements
    // Velvet Double Ring Vault inside Box
    const ringBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.8), velvetMat);
    ringBox.position.set(-0.4, 0.6, 0.2);
    ringBox.rotation.y = 0.3;
    ringBox.castShadow = true;
    boxGroup.add(ringBox);

    // Small Gold Ring details
    const ringGeo = new THREE.TorusGeometry(0.12, 0.03, 16, 32);
    const ring1 = new THREE.Mesh(ringGeo, goldMat);
    ring1.position.set(-0.4, 0.9, 0.15);
    ring1.rotation.x = 1.2;
    boxGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, goldMat);
    ring2.position.set(-0.32, 0.88, 0.28);
    ring2.rotation.x = 1.1;
    ring2.rotation.y = 0.3;
    boxGroup.add(ring2);

    // Emerald Perfume Flacon
    const perfumeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 0.9, 8), glassMat);
    perfumeBody.position.set(0.55, 0.7, 0.3);
    perfumeBody.castShadow = true;
    boxGroup.add(perfumeBody);

    const perfumeCap = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.3), goldMat);
    perfumeCap.position.set(0.55, 1.25, 0.3);
    boxGroup.add(perfumeCap);

    showcaseGroup.add(boxGroup);

    // Mouse Interaction
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0.2;
    let targetRotationX = 0.05;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        targetRotationY += deltaX * 0.01;
        previousMouseX = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous floating
      boxGroup.position.y = -0.3 + Math.sin(elapsedTime * 1.5) * 0.08;

      if (!isDragging) {
        targetRotationY += 0.003;
      }

      // Smooth lerp rotation
      showcaseGroup.rotation.y += (targetRotationY - showcaseGroup.rotation.y) * 0.05;
      showcaseGroup.rotation.x += (targetRotationX - showcaseGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" style={{ touchAction: 'none' }} />
      <div className="absolute bottom-3 right-4 pointer-events-none bg-surface-container-lowest/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-outline-variant/40 flex items-center gap-1.5 text-[11px] text-primary font-medium">
        <span className="material-symbols-outlined text-[14px]">3d_rotation</span>
        <span>Drag to rotate 3D box</span>
      </div>
    </div>
  );
};

export default ThreeGiftBox;
