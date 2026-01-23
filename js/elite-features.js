// Elite Features: Custom Cursor, Preloader, WebGL Fluid
(function() {
  'use strict';
  
  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursor && cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effects
    document.querySelectorAll('a, button, input, textarea, .project-box, .cert-card, .criteria-card, .role-item, .post-card, .category-tag, .faq-item, .demo-card, .metric-card, .chart-container, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.opacity = '0.8';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.opacity = '0.5';
      });
    });
  }
  
  // Fast Preloader
  const preloader = document.getElementById('preloader');
  const progressPercent = document.getElementById('progress-percent');
  
  if (preloader && progressPercent) {
    let progress = 0;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;
      progressPercent.textContent = Math.floor(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.3s ease';
        setTimeout(() => preloader.style.display = 'none', 300);
      }
    }, 50);
    
    // Hide immediately if page loads fast (under 300ms)
    window.addEventListener('load', () => {
      const loadTime = Date.now() - startTime;
      if (loadTime < 300) {
        clearInterval(interval);
        preloader.style.display = 'none';
      }
    });
  }
  
  // WebGL Fluid Simulation
  const fluidCanvas = document.getElementById('fluid-canvas');
  const gl = fluidCanvas?.getContext('webgl', { alpha: true, antialias: false });
  
  if (gl) {
    fluidCanvas.width = window.innerWidth;
    fluidCanvas.height = window.innerHeight;
    
    // Vertex shader
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, 'attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}');
    gl.compileShader(vs);
    
    // Fragment shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      void main(){
        vec2 uv=gl_FragCoord.xy/resolution.xy;
        vec2 m=mouse/resolution.xy;
        float d=length(uv-m);
        vec2 flow=(uv-m)/(d+0.1);
        uv+=flow*0.02*sin(time*2.0+d*10.0);
        vec3 col=0.5+0.5*cos(time+uv.xyx*2.0+vec3(0,2,4));
        col*=1.0-d*0.5;
        gl_FragColor=vec4(col*0.3,0.8);
      }
    `);
    gl.compileShader(fs);
    
    // Program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    
    // Geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    
    // Uniforms
    const resolutionLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');
    const mouseLoc = gl.getUniformLocation(program, 'mouse');
    
    let mouseFluidX = 0, mouseFluidY = 0;
    document.addEventListener('mousemove', e => {
      mouseFluidX = e.clientX;
      mouseFluidY = fluidCanvas.height - e.clientY;
    });
    
    const renderStart = Date.now();
    function renderFluid() {
      const time = (Date.now() - renderStart) * 0.001;
      gl.uniform2f(resolutionLoc, fluidCanvas.width, fluidCanvas.height);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(mouseLoc, mouseFluidX, mouseFluidY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(renderFluid);
    }
    renderFluid();
    
    // Handle resize
    window.addEventListener('resize', () => {
      fluidCanvas.width = window.innerWidth;
      fluidCanvas.height = window.innerHeight;
      gl.viewport(0, 0, fluidCanvas.width, fluidCanvas.height);
    });
  }
})();
