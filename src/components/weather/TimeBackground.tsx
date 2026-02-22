import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
};

const config: Record<TimeOfDay, {
  gradient: string;
  orbs: { color: string; x: string; y: string; size: string; blur: string; opacity: number }[];
}> = {
  morning: {
    gradient: "from-[hsl(199,89%,92%)] via-[hsl(38,80%,90%)] to-[hsl(199,89%,85%)]",
    orbs: [
      { color: "hsl(38, 92%, 60%)", x: "75%", y: "10%", size: "500px", blur: "120px", opacity: 0.35 },
      { color: "hsl(199, 89%, 70%)", x: "20%", y: "60%", size: "400px", blur: "100px", opacity: 0.25 },
      { color: "hsl(45, 93%, 80%)", x: "50%", y: "30%", size: "350px", blur: "90px", opacity: 0.2 },
    ],
  },
  afternoon: {
    gradient: "from-[hsl(199,89%,80%)] via-[hsl(210,100%,88%)] to-[hsl(199,70%,90%)]",
    orbs: [
      { color: "hsl(38, 92%, 55%)", x: "60%", y: "5%", size: "450px", blur: "110px", opacity: 0.3 },
      { color: "hsl(199, 89%, 60%)", x: "15%", y: "50%", size: "500px", blur: "120px", opacity: 0.25 },
      { color: "hsl(210, 100%, 75%)", x: "80%", y: "70%", size: "350px", blur: "100px", opacity: 0.2 },
    ],
  },
  evening: {
    gradient: "from-[hsl(260,40%,25%)] via-[hsl(25,80%,30%)] to-[hsl(280,50%,18%)]",
    orbs: [
      { color: "hsl(25, 95%, 45%)", x: "70%", y: "15%", size: "500px", blur: "130px", opacity: 0.35 },
      { color: "hsl(350, 70%, 40%)", x: "30%", y: "50%", size: "400px", blur: "110px", opacity: 0.3 },
      { color: "hsl(280, 60%, 35%)", x: "50%", y: "80%", size: "450px", blur: "120px", opacity: 0.25 },
    ],
  },
  night: {
    gradient: "from-[hsl(222,47%,8%)] via-[hsl(240,50%,12%)] to-[hsl(222,47%,6%)]",
    orbs: [
      { color: "hsl(240, 60%, 30%)", x: "20%", y: "20%", size: "500px", blur: "140px", opacity: 0.3 },
      { color: "hsl(199, 80%, 25%)", x: "75%", y: "60%", size: "450px", blur: "130px", opacity: 0.25 },
      { color: "hsl(260, 50%, 20%)", x: "50%", y: "40%", size: "400px", blur: "120px", opacity: 0.2 },
      { color: "hsl(45, 80%, 70%)", x: "85%", y: "10%", size: "6px", blur: "0px", opacity: 0.8 },
      { color: "hsl(45, 80%, 70%)", x: "15%", y: "25%", size: "4px", blur: "0px", opacity: 0.6 },
      { color: "hsl(45, 80%, 70%)", x: "45%", y: "8%", size: "5px", blur: "0px", opacity: 0.7 },
      { color: "hsl(45, 80%, 70%)", x: "65%", y: "35%", size: "3px", blur: "0px", opacity: 0.5 },
      { color: "hsl(45, 80%, 70%)", x: "90%", y: "45%", size: "4px", blur: "0px", opacity: 0.6 },
    ],
  },
};

export const TimeBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const { gradient, orbs } = config[timeOfDay];
  const isDark = timeOfDay === "night" || timeOfDay === "evening";

  return (
    <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} transition-colors duration-1000`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={`${timeOfDay}-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur})`,
            opacity: orb.opacity,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [orb.opacity, orb.opacity * 1.3, orb.opacity],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${isDark ? "hsla(0,0%,100%,0.02)" : "hsla(0,0%,0%,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  );
};

export const useTimeOfDay = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  useEffect(() => {
    const interval = setInterval(() => setTimeOfDay(getTimeOfDay()), 60000);
    return () => clearInterval(interval);
  }, []);
  return timeOfDay;
};
