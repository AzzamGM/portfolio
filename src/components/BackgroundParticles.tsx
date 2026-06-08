import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BackgroundParticles() {
  const [particlePositions, setParticlePositions] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      left: (i * 3.33) % 100,
      top: (i * 5.67) % 100,
    })),
  );
  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    );
  }, []);

  const updateParticlePosition = (index: number) => {
    setParticlePositions((prev) =>
      prev.map((pos, i) =>
        i === index
          ? { left: Math.random() * 100, top: Math.random() * 100 }
          : pos,
      ),
    );
  };
  return (
    <div className="particle-wrapper">
      {[...Array(120)].map((_, i) => (
        <motion.div
          key={i}
          className="particle-dot"
          animate={{
            y: [-20, -120],
            x: [0, Math.sin(i) * 50],
            opacity: [0, 0.8, 0],
            boxShadow: [
              "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
              "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)",
              "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
            ],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: i * 0.2,
          }}
          onAnimationComplete={() => updateParticlePosition(i)}
          style={{
            left: `${particlePositions[i]?.left || 0}%`,
            top: `${particlePositions[i]?.top || 0}%`,
          }}
        />
      ))}
    </div>
  );
}
