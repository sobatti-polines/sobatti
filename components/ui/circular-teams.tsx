"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  src: string;
}

interface CircularTeamsProps {
  members: TeamMember[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const CircularTeams = ({
  members,
  autoplay = true,
}: CircularTeamsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const membersLength = useMemo(() => members.length, [members]);
  const activeMember = useMemo(
    () => members[activeIndex],
    [activeIndex, members],
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % membersLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [membersLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + membersLength) % membersLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [membersLength]);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % membersLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, membersLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, membersLength, handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + membersLength) % membersLength === index;
    const isRight = (activeIndex + 1) % membersLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-[56rem] px-8">
      <div className="grid gap-20 md:grid-cols-2">
        <div
          ref={imageContainerRef}
          className="relative w-full h-96 perspective-[1000px]"
        >
          {members.map((member, index) => (
            <img
              key={member.src}
              src={member.src}
              alt={member.name}
              className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] object-[25%] ${
                !imageLoaded[index] ? "opacity-0" : "opacity-100"
              }`}
              data-index={index}
              style={getImageStyle(index)}
              onLoad={() => setImageLoaded((prev) => ({ ...prev, [index]: true }))}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-3">
                <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-orange">
                  {activeMember.role}
                </span>
              </div>
              <h3 className="font-display font-normal mb-6 text-[clamp(24px,3vw,32px)] leading-[1.15] tracking-[-0.01em] text-foreground">
                {activeMember.name}
              </h3>
              <motion.p className="font-body leading-[1.7] text-foreground/50">
                {activeMember.bio.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-6 pt-12 md:pt-0">
            <div className="flex items-center gap-3">
              {members.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    if (autoplayIntervalRef.current)
                      clearInterval(autoplayIntervalRef.current);
                  }}
                  aria-label={`Go to member ${i + 1}`}
                  className="transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2"
                  style={{
                    width: i === activeIndex ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    backgroundColor:
                      i === activeIndex
                        ? "var(--accent-blue)"
                        : "rgba(2, 72, 133, 0.2)",
                  }}
                />
              ))}
            </div>

            <div className="flex gap-3 ml-auto">
              <motion.button
                onClick={handlePrev}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous member"
                className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-foreground/10 bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent-blue"
                  initial={false}
                  animate={{
                    opacity: hoverPrev ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <ArrowLeft
                  size={20}
                  className="relative z-10 transition-colors duration-200"
                  style={{ color: hoverPrev ? "var(--white)" : "var(--foreground)" }}
                />
              </motion.button>
              <motion.button
                onClick={handleNext}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next member"
                className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-foreground/10 bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent-blue"
                  initial={false}
                  animate={{
                    opacity: hoverNext ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <ArrowRight
                  size={20}
                  className="relative z-10 transition-colors duration-200"
                  style={{ color: hoverNext ? "var(--white)" : "var(--foreground)" }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTeams;
