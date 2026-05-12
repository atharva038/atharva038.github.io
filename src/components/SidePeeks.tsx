import {useEffect, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type {MotionValue} from "framer-motion";

const spring = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.8,
};

const PEEK_VISIBLE_MS = 2000;
const PEEK_CYCLE_MS = 9000;

function scrollToProjects() {
  const target = document.querySelector("#projects");
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  window.history.pushState(null, "", "#projects");
}

function usePeekCycle(
  controls: ReturnType<typeof useAnimationControls>,
  states: {hidden: string; peek: string},
  delayMs: number,
) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  const updateHovering = (nextIsHovering: boolean) => {
    isHoveringRef.current = nextIsHovering;
    setIsHovering(nextIsHovering);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set(states.peek);
      return;
    }

    let isMounted = true;
    let timeoutId: number | undefined;

    const runCycle = async () => {
      if (!isMounted || isHoveringRef.current) return;
      await controls.start(states.peek);
      if (!isMounted || isHoveringRef.current) return;
      timeoutId = window.setTimeout(() => {
        if (!isMounted || isHoveringRef.current) return;
        void controls.start(states.hidden);
      }, PEEK_VISIBLE_MS);
    };

    const intervalId = window.setInterval(runCycle, PEEK_CYCLE_MS);

    controls.set(states.hidden);
    timeoutId = window.setTimeout(runCycle, delayMs);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [controls, delayMs, shouldReduceMotion, states.hidden, states.peek]);

  return {
    isHovering,
    setIsHovering: updateHovering,
    shouldReduceMotion,
  };
}

function BuilderIllustration({
  eyeX,
  eyeY,
  isHovering,
  shouldReduceMotion,
}: {
  eyeX: MotionValue<number>;
  eyeY: MotionValue<number>;
  isHovering: boolean;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <svg
      aria-hidden="true"
      className="h-[200px] w-[388px] overflow-visible drop-shadow-[0_16px_36px_var(--glass-shadow)]"
      viewBox="0 0 620 320"
      fill="none"
    >
      <defs>
        <radialGradient
          id="botShell"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(152 122) rotate(92) scale(145 122)"
        >
          <stop stopColor="var(--theme-surface-light)" />
          <stop offset="0.5" stopColor="var(--theme-surface)" />
          <stop offset="1" stopColor="var(--theme-background)" />
        </radialGradient>
        <linearGradient
          id="botVisor"
          x1="57"
          y1="99"
          x2="243"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-electric)" stopOpacity="0.38" />
          <stop
            offset="0.3"
            stopColor="var(--theme-electric)"
            stopOpacity="0.22"
          />
          <stop
            offset="0.58"
            stopColor="var(--theme-background)"
            stopOpacity="0.96"
          />
          <stop offset="1" stopColor="var(--theme-surface)" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient
          id="botPanel"
          x1="315"
          y1="72"
          x2="603"
          y2="243"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-surface)" stopOpacity="0.94" />
          <stop
            offset="0.52"
            stopColor="var(--theme-background)"
            stopOpacity="0.92"
          />
          <stop
            offset="1"
            stopColor="var(--theme-surface-light)"
            stopOpacity="0.88"
          />
        </linearGradient>
        <radialGradient
          id="botGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(143 125) rotate(90) scale(164 196)"
        >
          <stop stopColor="var(--theme-electric)" stopOpacity="0.36" />
          <stop
            offset="0.55"
            stopColor="var(--theme-electric)"
            stopOpacity="0.12"
          />
          <stop
            offset="1"
            stopColor="var(--theme-background)"
            stopOpacity="0"
          />
        </radialGradient>
        <filter id="themeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        animate={{
          opacity: isHovering || shouldReduceMotion ? 1 : 0,
          x: isHovering || shouldReduceMotion ? 0 : -18,
        }}
        transition={spring}
      >
        <rect
          x="302"
          y="73"
          width="286"
          height="126"
          rx="28"
          fill="url(#botPanel)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.58"
          strokeWidth="1.2"
        />
        <path
          d="M333 73H560C575 73 588 86 588 101V171"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.18"
        />
        <path
          d="M305 184H586"
          stroke="var(--theme-electric)"
          strokeOpacity="0.5"
          filter="url(#themeGlow)"
        />
        <text
          x="326"
          y="124"
          fill="var(--theme-foreground)"
          fontSize="20"
          fontWeight="700"
          fontFamily="Outfit, system-ui, sans-serif"
        >
          You won&apos;t regret hiring me.
        </text>
        <text
          x="326"
          y="155"
          fill="var(--theme-muted-foreground)"
          fontSize="14"
          fontWeight="600"
          fontFamily="Outfit, system-ui, sans-serif"
        >
          Full-stack systems, shipped clean.
        </text>
        <circle
          cx="582"
          cy="75"
          r="26"
          fill="var(--theme-background)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.5"
        />
        <path
          d="M572 75H592M582 65V85"
          stroke="var(--theme-foreground)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#themeGlow)"
        />
      </motion.g>

      <motion.path
        animate={shouldReduceMotion ? undefined : {y: [0, -4, 0]}}
        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
        d="M88 254C89 215 116 189 151 189C187 189 214 215 215 254H88Z"
        fill="url(#botShell)"
        stroke="var(--theme-electric)"
        strokeOpacity="0.38"
        strokeWidth="1.2"
      />
      <ellipse cx="151" cy="112" rx="118" ry="104" fill="url(#botGlow)" />
      <path
        d="M47 122C47 56 92 23 151 23C211 23 255 57 255 122C255 178 212 209 151 209C90 209 47 178 47 122Z"
        fill="url(#botShell)"
        stroke="var(--theme-electric)"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d="M67 119C67 69 102 45 151 45C201 45 235 70 235 119C235 162 201 186 151 186C101 186 67 162 67 119Z"
        fill="var(--theme-background)"
        fillOpacity="0.52"
        stroke="var(--theme-electric)"
        strokeOpacity="0.2"
      />
      <path
        d="M85 101C91 77 113 65 151 65C190 65 213 78 218 102C225 135 201 156 151 156C102 156 78 134 85 101Z"
        fill="url(#botVisor)"
        stroke="var(--theme-foreground)"
        strokeOpacity="0.42"
        strokeWidth="1.2"
      />
      <path
        d="M191 74C212 78 224 88 227 105"
        stroke="var(--theme-foreground)"
        strokeOpacity="0.58"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <motion.ellipse
        cx="123"
        cy="116"
        rx="10"
        initial={{ry: 10}}
        animate={shouldReduceMotion ? {ry: 10} : {ry: [10, 10, 1.2, 10]}}
        transition={{
          duration: 0.22,
          repeat: Infinity,
          repeatDelay: 4.8,
          ease: "easeInOut",
        }}
        fill="var(--theme-electric)"
        filter="url(#themeGlow)"
        style={{x: eyeX, y: eyeY}}
      />
      <motion.ellipse
        cx="123"
        cy="116"
        rx="5"
        initial={{ry: 5}}
        animate={shouldReduceMotion ? {ry: 5} : {ry: [5, 5, 0.6, 5]}}
        transition={{
          duration: 0.22,
          repeat: Infinity,
          repeatDelay: 4.8,
          ease: "easeInOut",
        }}
        fill="var(--theme-foreground)"
        fillOpacity="0.42"
        style={{x: eyeX, y: eyeY}}
      />
      <motion.ellipse
        cx="180"
        cy="116"
        rx="10"
        initial={{ry: 10}}
        animate={shouldReduceMotion ? {ry: 10} : {ry: [10, 10, 1.2, 10]}}
        transition={{
          duration: 0.22,
          repeat: Infinity,
          repeatDelay: 4.8,
          ease: "easeInOut",
        }}
        fill="var(--theme-electric)"
        filter="url(#themeGlow)"
        style={{x: eyeX, y: eyeY}}
      />
      <motion.ellipse
        cx="180"
        cy="116"
        rx="5"
        initial={{ry: 5}}
        animate={shouldReduceMotion ? {ry: 5} : {ry: [5, 5, 0.6, 5]}}
        transition={{
          duration: 0.22,
          repeat: Infinity,
          repeatDelay: 4.8,
          ease: "easeInOut",
        }}
        fill="var(--theme-foreground)"
        fillOpacity="0.42"
        style={{x: eyeX, y: eyeY}}
      />
      <path
        d="M137 147C145 154 159 154 166 147"
        stroke="var(--theme-electric)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M64 108C35 111 17 131 17 158C17 185 35 205 64 209"
        stroke="var(--theme-electric)"
        strokeOpacity="0.36"
      />
      <circle
        cx="52"
        cy="154"
        r="23"
        fill="var(--theme-surface)"
        stroke="var(--theme-electric)"
        strokeOpacity="0.62"
        strokeWidth="2"
      />
      <circle
        cx="52"
        cy="154"
        r="12"
        fill="var(--theme-background)"
        stroke="var(--theme-electric)"
        filter="url(#themeGlow)"
      />
      <path
        d="M239 117C262 124 278 145 278 172C278 196 266 215 247 226"
        stroke="var(--theme-electric)"
        strokeOpacity="0.64"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M250 229C255 234 260 239 265 245"
        stroke="var(--theme-electric)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M131 238H172"
        stroke="var(--theme-electric)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#themeGlow)"
      />
      <path
        d="M31 24C85 -17 181 -1 229 45"
        stroke="var(--theme-foreground)"
        strokeOpacity="0.14"
      />
    </svg>
  );
}

function LivingProjectCore({
  isHovering,
  shouldReduceMotion,
}: {
  isHovering: boolean;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <svg
      aria-hidden="true"
      className="h-[250px] w-[340px] overflow-visible drop-shadow-[0_24px_70px_var(--glass-shadow)]"
      viewBox="0 0 340 250"
      fill="none"
    >
      <defs>
        {/* Background aura */}
        <radialGradient
          id="botAuraPro"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(164 118) rotate(90) scale(120 165)"
        >
          <stop stopColor="var(--theme-electric)" stopOpacity="0.34" />
          <stop
            offset="0.45"
            stopColor="var(--theme-electric)"
            stopOpacity="0.12"
          />
          <stop
            offset="1"
            stopColor="var(--theme-background)"
            stopOpacity="0"
          />
        </radialGradient>

        {/* Bot shell */}
        <linearGradient
          id="botShellPro"
          x1="72"
          y1="38"
          x2="187"
          y2="188"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-foreground)" stopOpacity="0.28" />
          <stop
            offset="0.42"
            stopColor="var(--theme-surface-light)"
            stopOpacity="0.92"
          />
          <stop
            offset="1"
            stopColor="var(--theme-background)"
            stopOpacity="0.96"
          />
        </linearGradient>

        {/* Bot visor */}
        <linearGradient
          id="botVisorPro"
          x1="80"
          y1="67"
          x2="178"
          y2="116"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-electric)" stopOpacity="0.26" />
          <stop
            offset="0.45"
            stopColor="var(--theme-background)"
            stopOpacity="0.96"
          />
          <stop offset="1" stopColor="var(--theme-surface)" stopOpacity="0.9" />
        </linearGradient>

        {/* Resume card */}
        <linearGradient
          id="resumeCardPro"
          x1="202"
          y1="42"
          x2="300"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-surface-light)" stopOpacity="0.92" />
          <stop
            offset="0.48"
            stopColor="var(--theme-background)"
            stopOpacity="0.94"
          />
          <stop
            offset="1"
            stopColor="var(--theme-electric)"
            stopOpacity="0.12"
          />
        </linearGradient>

        {/* Glass shine */}
        <linearGradient
          id="glassShinePro"
          x1="85"
          y1="48"
          x2="180"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-foreground)" stopOpacity="0.5" />
          <stop
            offset="0.45"
            stopColor="var(--theme-foreground)"
            stopOpacity="0.08"
          />
          <stop
            offset="1"
            stopColor="var(--theme-electric)"
            stopOpacity="0.2"
          />
        </linearGradient>

        {/* Resume accent */}
        <linearGradient
          id="resumeAccentPro"
          x1="220"
          y1="151"
          x2="294"
          y2="151"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--theme-electric)" stopOpacity="1" />
          <stop
            offset="1"
            stopColor="var(--theme-foreground)"
            stopOpacity="0.85"
          />
        </linearGradient>

        {/* Soft glow */}
        <filter id="softGlowPro" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.45
                0 0 0 0 0.65
                0 0 0 0 1
                0 0 0 0.65 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="resumeShadowPro"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="var(--theme-electric)"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* Resume document */}
      <motion.g
        animate={
          shouldReduceMotion
            ? undefined
            : {y: [0, -3, 0], rotate: [-3, -1.8, -3]}
        }
        transition={{duration: 5.8, repeat: Infinity, ease: "easeInOut"}}
        style={{originX: "255px", originY: "126px"}}
        filter="url(#resumeShadowPro)"
      >
        <rect
          x="205"
          y="46"
          width="102"
          height="154"
          rx="14"
          fill="url(#resumeCardPro)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />

        {/* Fold shine */}
        <path
          d="M270 46H293C301 46 307 52 307 60V82C296 68 284 56 270 46Z"
          fill="var(--theme-electric)"
          fillOpacity="0.12"
        />

        {/* Profile header */}
        <circle
          cx="230"
          cy="70"
          r="16"
          fill="var(--theme-background)"
          fillOpacity="0.78"
          stroke="var(--theme-electric)"
          strokeOpacity="0.55"
        />
        <circle
          cx="230"
          cy="63.5"
          r="5.5"
          fill="var(--theme-electric)"
          fillOpacity="0.75"
        />
        <path
          d="M219 80C224 73.5 236 73.5 241 80"
          stroke="var(--theme-electric)"
          strokeOpacity="0.62"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M254 61H287M254 73H294M254 85H282"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.48"
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        <path
          d="M219 103H292"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />

        {/* Resume sections */}
        <path
          d="M222 116H230M238 116H286M238 127H296M238 138H277"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.42"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M222 158H230M238 158H292M238 169H282"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.36"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M222 150L227 155L237 143"
          stroke="var(--theme-electric)"
          strokeOpacity="0.75"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Skill bars */}
        <path
          d="M222 181H286"
          stroke="url(#resumeAccentPro)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M222 190H268"
          stroke="url(#resumeAccentPro)"
          strokeOpacity="0.78"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M222 199H296"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.22"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Scanner line */}
        <motion.path
          d="M214 107H298"
          stroke="var(--theme-electric)"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          animate={
            shouldReduceMotion
              ? undefined
              : {y: [0, 75, 0], opacity: [0.05, 0.55, 0.05]}
          }
          transition={{duration: 3.4, repeat: Infinity, ease: "easeInOut"}}
        />
      </motion.g>

      {/* Main bot */}
      <motion.g
        animate={
          shouldReduceMotion
            ? undefined
            : {y: [0, -5, 0], rotate: [-0.4, 0.45, -0.4]}
        }
        transition={{duration: 6.5, repeat: Infinity, ease: "easeInOut"}}
        style={{originX: "140px", originY: "120px"}}
      >
        {/* Body */}
        <path
          d="M101 190C104 158 119 139 140 139C162 139 178 159 181 190H101Z"
          fill="url(#botShellPro)"
          stroke="var(--glass-border)"
          strokeWidth="1.2"
        />

        <path
          d="M116 184C123 174 158 174 166 185"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.12"
          strokeLinecap="round"
        />

        {/* Neck */}
        <rect
          x="121"
          y="126"
          width="38"
          height="21"
          rx="10"
          fill="var(--theme-background)"
          fillOpacity="0.9"
          stroke="var(--theme-electric)"
          strokeOpacity="0.16"
        />

        {/* Layered head and cap */}
        <path
          d="M77 82C77 39 103 17 140 17C178 17 204 40 205 83C206 126 179 150 140 150C101 150 75 125 77 82Z"
          fill="url(#botShellPro)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.58"
          strokeWidth="1.6"
        />
        <path
          d="M85 76C91 41 113 26 141 26C171 26 193 44 197 78C178 66 106 64 85 76Z"
          fill="var(--theme-foreground)"
          fillOpacity="0.08"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.12"
        />
        <path
          d="M88 62C101 39 119 30 141 30C165 30 184 41 195 65C164 55 119 55 88 62Z"
          fill="url(#glassShinePro)"
          opacity="0.86"
        />
        <path
          d="M86 91C87 70 105 59 140 59C176 59 194 71 196 92C190 79 173 71 140 71C108 71 92 79 86 91Z"
          fill="var(--theme-background)"
          fillOpacity="0.36"
          stroke="var(--theme-electric)"
          strokeOpacity="0.18"
        />

        {/* Deep face plate */}
        <path
          d="M91 88C94 63 114 50 140 50C167 50 187 64 190 89C193 116 171 132 140 132C108 132 88 115 91 88Z"
          fill="url(#botVisorPro)"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.36"
          strokeWidth="1.2"
        />
        <path
          d="M100 86C105 67 119 59 140 59C162 59 177 68 181 88"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.1"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M165 47C181 52 191 63 194 79"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.48"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M177 35C183 37 188 41 192 46"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.38"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Side cap pods */}
        <circle
          cx="75"
          cy="88"
          r="19"
          fill="url(#botShellPro)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.56"
          strokeWidth="1.7"
        />
        <circle
          cx="75"
          cy="88"
          r="10"
          fill="var(--theme-background)"
          stroke="var(--theme-electric)"
          strokeOpacity="0.84"
        />
        <path
          d="M66 78C70 74 79 73 85 77"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.22"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M197 81C210 85 219 97 221 113"
          stroke="var(--theme-electric)"
          strokeOpacity="0.36"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Face */}
        <motion.path
          d="M116 84C121 79 129 79 134 84M148 84C153 79 161 79 166 84"
          stroke="var(--theme-electric)"
          strokeWidth="4.2"
          strokeLinecap="round"
          filter="url(#softGlowPro)"
          animate={shouldReduceMotion ? undefined : {opacity: [1, 1, 0.22, 1]}}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            repeatDelay: 4.8,
            ease: "easeInOut",
          }}
        />

        <path
          d="M130 105C136 110 146 110 153 105"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.7"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Arms */}
        <path
          d="M94 151C84 162 83 175 94 186"
          stroke="var(--theme-foreground)"
          strokeOpacity="0.24"
          strokeWidth="13"
          strokeLinecap="round"
        />

        <path
          d="M188 139C198 130 210 126 222 128"
          stroke="var(--theme-electric)"
          strokeOpacity="0.52"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Hand holding resume */}
        <g>
          <ellipse
            cx="300"
            cy="112"
            rx="11"
            ry="8"
            fill="var(--theme-surface)"
            stroke="var(--theme-electric)"
            strokeOpacity="0.48"
          />
          <ellipse
            cx="302"
            cy="131"
            rx="12"
            ry="8"
            fill="var(--theme-surface)"
            stroke="var(--theme-electric)"
            strokeOpacity="0.48"
          />
          <ellipse
            cx="300"
            cy="150"
            rx="11"
            ry="8"
            fill="var(--theme-surface)"
            stroke="var(--theme-electric)"
            strokeOpacity="0.48"
          />
          <path
            d="M295 112H304M297 131H308M295 150H304"
            stroke="var(--theme-electric)"
            strokeOpacity="0.72"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Chest badge */}
        <circle
          cx="140"
          cy="169"
          r="17"
          fill="var(--theme-background)"
          fillOpacity="0.68"
          stroke="var(--theme-electric)"
          strokeOpacity="0.48"
        />
        <path
          d="M140 157L144 166L154 169L145 174L143 184L137 176L127 179L132 170L127 162L137 164Z"
          fill="var(--theme-electric)"
          fillOpacity="0.82"
          filter="url(#softGlowPro)"
        />
      </motion.g>

      {/* Brand pill - cleaner */}
      <motion.g
        animate={{
          opacity: isHovering || shouldReduceMotion ? 1 : 0,
          y: isHovering || shouldReduceMotion ? 0 : 10,
          scale: isHovering || shouldReduceMotion ? 1 : 0.96,
        }}
        transition={spring}
      >
        <rect
          x="125"
          y="203"
          width="142"
          height="34"
          rx="17"
          fill="var(--theme-background)"
          fillOpacity="0.84"
          stroke="var(--glass-border)"
        />
        <text
          x="196"
          y="222"
          textAnchor="middle"
          fill="var(--theme-foreground)"
          fontSize="13"
          fontWeight="800"
          fontFamily="Outfit, system-ui, sans-serif"
        >
          SmartNShine
        </text>
        <text
          x="196"
          y="232"
          textAnchor="middle"
          fill="var(--theme-muted-foreground)"
          fontSize="7.5"
          fontWeight="600"
          fontFamily="Outfit, system-ui, sans-serif"
        >
          AI Resume Builder
        </text>
      </motion.g>
    </svg>
  );
}

function DeveloperPeek() {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {stiffness: 130, damping: 18, mass: 0.2});
  const smoothY = useSpring(pointerY, {stiffness: 130, damping: 18, mass: 0.2});
  const eyeX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const eyeY = useTransform(smoothY, [-1, 1], [-1.6, 1.6]);
  const {isHovering, setIsHovering, shouldReduceMotion} = usePeekCycle(
    controls,
    {hidden: "hidden", peek: "peek"},
    7000,
  );

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    pointerX.set(
      Math.max(-1, Math.min(1, (event.clientX - centerX) / (rect.width / 2))),
    );
    pointerY.set(
      Math.max(-1, Math.min(1, (event.clientY - centerY) / (rect.height / 2))),
    );
  };

  const handleHoverStart = () => {
    setIsHovering(true);
    void controls.start("revealed");
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    pointerX.set(0);
    pointerY.set(0);
    void controls.start(shouldReduceMotion ? "peek" : "hidden");
  };

  return (
    <motion.button
      ref={containerRef}
      type="button"
      aria-label="View selected work"
      onClick={scrollToProjects}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      onPointerMove={handlePointerMove}
      animate={controls}
      variants={{
        hidden: {x: -205, opacity: 0},
        peek: {x: -105, opacity: 1},
        revealed: {x: -8, opacity: 1},
      }}
      transition={spring}
      className="group fixed left-0 top-[48%] z-40 hidden -translate-y-1/2 outline-none md:block"
    >
      <span className="relative block h-[200px] w-[175px] rounded-r-[30px] focus-visible:ring-0">
        <span
          aria-hidden="true"
          className="absolute left-4 top-8 h-36 w-24 rounded-r-[52px] bg-electric/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <BuilderIllustration
          eyeX={eyeX}
          eyeY={eyeY}
          isHovering={isHovering}
          shouldReduceMotion={shouldReduceMotion}
        />
      </span>
    </motion.button>
  );
}

function ProjectPeek() {
  const controls = useAnimationControls();
  const {isHovering, setIsHovering, shouldReduceMotion} = usePeekCycle(
    controls,
    {hidden: "hidden", peek: "peek"},
    9000,
  );

  const handleHoverStart = () => {
    setIsHovering(true);
    void controls.start("revealed");
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    void controls.start(shouldReduceMotion ? "peek" : "hidden");
  };

  return (
    <motion.button
      type="button"
      aria-label="View SmartNShine project"
      onClick={scrollToProjects}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      animate={controls}
      variants={{
        hidden: {x: 310, opacity: 0},
        peek: {x: 198, opacity: 1},
        revealed: {x: 0, opacity: 1},
      }}
      transition={spring}
      className="group fixed right-0 top-[62%] z-40 hidden -translate-y-1/2 text-left outline-none md:block"
    >
      <span className="relative block h-[214px] w-[288px]">
        <span
          aria-hidden="true"
          className="absolute right-2 top-10 h-40 w-28 rounded-l-full bg-electric/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <LivingProjectCore
          isHovering={isHovering}
          shouldReduceMotion={shouldReduceMotion}
        />
      </span>
    </motion.button>
  );
}

export default function SidePeeks() {
  return (
    <>
      <DeveloperPeek />
      <ProjectPeek />
    </>
  );
}
