'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../layouts/header';
import Footer from '../layouts/footer';

// Global Chainsaw Cursor Component
// const GlobalChainsawCursor = React.memo(function GlobalChainsawCursor() {
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const [isMoving, setIsMoving] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Custom cursor tracking
//   useEffect(() => {
//     if (!mounted) return;
    
//     let moveTimer = null;
    
//     const handleMouseMove = (e) => {
//       setCursorPos({ x: e.clientX, y: e.clientY });
//       setIsMoving(true);
      
//       // Clear existing timer
//       if (moveTimer) clearTimeout(moveTimer);
      
//       // Set cursor to stationary after 100ms of no movement
//       moveTimer = setTimeout(() => {
//         setIsMoving(false);
//       }, 100);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (moveTimer) clearTimeout(moveTimer);
//     };
//   }, [mounted]);

//   // Hide default cursor globally
//   useEffect(() => {
//     if (!mounted) return;
    
//     const style = document.createElement('style');
//     style.id = 'global-chainsaw-cursor-style';
//     style.textContent = `
//       * {
//         cursor: none !important;
//       }
//     `;
//     document.head.appendChild(style);
    
//     return () => {
//       const existingStyle = document.getElementById('global-chainsaw-cursor-style');
//       if (existingStyle) {
//         document.head.removeChild(existingStyle);
//       }
//     };
//   }, [mounted]);

//   if (!mounted) return null;

//   return (
//     <div 
//       className="fixed pointer-events-none z-[10000]"
//       style={{
//         left: cursorPos.x - 16,
//         top: cursorPos.y - 16,
//         transition: 'none'
//       }}
//     >
//       <div className="relative w-13 h-13">
//         {/* Chainsaw Icon - Clean and simple */}
//         <img 
//           width="80" 
//           height="80" 
//           src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-chainsaw-gardening-flaticons-flat-flat-icons.png" 
//           alt="chainsaw cursor"
//           className={`drop-shadow-lg transition-all duration-200 ${isMoving ? 'brightness-125 drop-shadow-xl' : ''}`}
//           style={{ 
//             transform: 'rotate(0deg)',
//             filter: isMoving ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
//           }}
//         />
        
//         {/* Spark effects when moving */}
//         {isMoving && (
//           <div className="absolute inset-0 pointer-events-none">
//             <div 
//               className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
//               style={{ 
//                 top: '20px', 
//                 left: '25px',
//                 animationDuration: '0.3s'
//               }}
//             />
//             <div 
//               className="absolute w-0.5 h-0.5 bg-orange-500 rounded-full animate-ping"
//               style={{ 
//                 top: '18px', 
//                 left: '28px',
//                 animationDuration: '0.4s',
//                 animationDelay: '0.1s'
//               }}
//             />
//             <div 
//               className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
//               style={{ 
//                 top: '35px', 
//                 left: '40px',
//                 animationDuration: '0.5s',
//                 animationDelay: '0.2s'
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// Centralized Global Particle System (consistent across all pages)
const GlobalParticles = React.memo(function GlobalParticles() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Create particles with better visibility
  const particles = Array.from({ length: 20 }, (_, i) => {
    // Create a grid-like distribution to ensure even spread
    const gridX = (i % 5) * 20 + Math.random() * 15; // 5 columns, 0-80% + random offset
    const gridY = Math.floor(i / 5) * 25 + Math.random() * 20; // 4 rows, 0-75% + random offset
    
    return {
      id: i,
      initialX: gridX,
      initialY: gridY,
      size: Math.random() * 3 + 4, // 2-5px size
      duration: Math.random() * 4 + 6, // 6-10 seconds
      delay: Math.random() * 8, // 0-8 second delay
    };
  });
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#989b2e] rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0.6, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
            y: [0, -50, -100, -50, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

function BgLayout({ children, className = "" }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Global Background Overlay - Black to Transparent to Black */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
      
      {/* Global Chainsaw Cursor */}
      {/* <GlobalChainsawCursor /> */}
      
      {/* Centralized Particle System */}
      <GlobalParticles />
      
      <header className="relative z-50">
        <Header />
      </header>

      <main className={`relative z-20 ${className}`}>
        {children}
      </main>

      <footer className="relative z-20">
        <Footer />
      </footer>
    </div>
  );
}

export default BgLayout;