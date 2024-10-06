import { motion } from "framer-motion";

const AimLabzSVG = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  const blue = "#0099ff"
  return (
    <motion.svg
      width="3000"
      height="3000"
      viewBox="0 0 650 650"
      initial="hidden"
      animate="visible"
      className="aimlabz-container"
    >
      {/* A */}
      <motion.line
        x1="10"
        y1="180"
        x2="70"
        y2="60"
        stroke={blue}
        variants={draw}
        custom={1}
      />
      <motion.line
        x1="70"
        y1="60"
        x2="130"
        y2="180"
        stroke="#0099ff"
        variants={draw}
        custom={1.5}
      />

      {/* I */}

      <motion.line
        x1="230"
        y1="60"
        x2="350"
        y2="60"
        stroke="#ff0055"
        variants={draw}
        custom={2}
      />
      <motion.line
        x1="230"
        y1="180"
        x2="350"
        y2="180"
        stroke="#ff0055"
        variants={draw}
        custom={2.5}
      />
      <motion.line
        x1="290"
        y1="60"
        x2="290"
        y2="180"
        stroke="#ff0055"
        variants={draw}
        custom={2.5}
      />

      {/* M */}

      <motion.line
        x1="450"
        y1="60"
        x2="450"
        y2="180"
        stroke="#0099ff"
        variants={draw}
        custom={3}
      />

      <motion.line
        x1="510"
        y1="180"
        x2="570"
        y2="60"
        stroke="#0099ff"
        variants={draw}
        custom={3.2}
      />
      <motion.line
        x1="450"
        y1="60"
        x2="510"
        y2="180"
        stroke="#0099ff"
        variants={draw}
        custom={3.3}
      />

      <motion.line
        x1="570"
        y1="60"
        x2="570"
        y2="180"
        stroke="#0099ff"
        variants={draw}
        custom={3.4}
      />
      {/* L */}

      <motion.line
        x1="10"
        y1="280"
        x2="10"
        y2="400"
        stroke="#ff0055"
        variants={draw}
        custom={4}
      />

      <motion.line
        x1="10"
        y1="400"
        x2="130"
        y2="400"
        stroke="#ff0055"
        variants={draw}
        custom={4.1}
      />

      {/* A */}
      <motion.line
        x1="230"
        y1="400"
        x2="290"
        y2="280"
        stroke="#0099ff"
        variants={draw}
        custom={5}
      />
      <motion.line
        x1="290"
        y1="280"
        x2="350"
        y2="400"
        stroke="#0099ff"
        variants={draw}
        custom={5.5}
      />

      {/* B */}

      <motion.line
        x1="450"
        y1="280"
        x2="450"
        y2="400"
        stroke="#ff0055"
        variants={draw}
        custom={6}
      />

      <motion.line
        x1="450"
        y1="280"
        x2="570"
        y2="290"
        stroke="#ff0055"
        variants={draw}
        custom={6.1}
      />
      <motion.line
        x1="570"
        y1="290"
        x2="570"
        y2="330"
        stroke="#ff0055"
        variants={draw}
        custom={6.2}
      />
      <motion.line
        x1="570"
        y1="330"
        x2="450"
        y2="340"
        stroke="#ff0055"
        variants={draw}
        custom={6.3}
      />

      <motion.line
        x1="450"
        y1="340"
        x2="570"
        y2="350"
        stroke="#ff0055"
        variants={draw}
        custom={6.4}
      />
      <motion.line
        x1="570"
        y1="350"
        x2="570"
        y2="390"
        stroke="#ff0055"
        variants={draw}
        custom={6.5}
      />
      <motion.line
        x1="570"
        y1="390"
        x2="450"
        y2="400"
        stroke="#ff0055"
        variants={draw}
        custom={6.6}
      />

      {/* Z */}
      <motion.line
        x1="230"
        y1="500"
        x2="350"
        y2="500"
        stroke="#ff0055"
        variants={draw}
        custom={7}
      />
      <motion.line
        x1="350"
        y1="500"
        x2="230"
        y2="620"
        stroke="#ff0055"
        variants={draw}
        custom={7.1}
      />
      <motion.line
        x1="230"
        y1="620"
        x2="350"
        y2="620"
        stroke="#ff0055"
        variants={draw}
        custom={7.2}
      />
    </motion.svg>
  );
};

export default AimLabzSVG;
