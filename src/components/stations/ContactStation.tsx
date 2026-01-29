'use client';

import { motion } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
  color: string;
  description: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'atharva@example.com',
    href: 'mailto:atharva@example.com',
    icon: '✉️',
    color: '#ff6b6b',
    description: 'For project inquiries and collaboration',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/atharvajoshi',
    href: 'https://linkedin.com/in/atharvajoshi',
    icon: '💼',
    color: '#0077b5',
    description: 'Professional networking and connections',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@atharva_beast',
    href: 'https://github.com/atharva_beast',
    icon: '🐙',
    color: '#6e5494',
    description: 'Open source projects and contributions',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    value: '@atharvadev',
    href: 'https://twitter.com/atharvadev',
    icon: '🐦',
    color: '#1da1f2',
    description: 'Tech thoughts and daily updates',
  },
];

export function ContactStation() {
  const { currentStation, isMobile } = useMetroStore();
  const isActive = currentStation === 5;

  return (
    <section
      id="contact"
      data-station={5}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } ${isMobile ? '' : 'overflow-y-auto'}`}
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1f0a0f 50%, #0a0a0f 100%)',
        paddingTop: isMobile ? '96px' : '128px',
        paddingBottom: isMobile ? '96px' : '128px',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(29, 161, 242, 0.15) 0%, transparent 50%),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)
            `,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div
        className="relative w-full"
        style={{
          maxWidth: '1280px',
          paddingLeft: isMobile ? '24px' : '40px',
          paddingRight: isMobile ? '24px' : '40px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          {/* End of Line Indicator */}
          <div
            className="inline-flex items-center gap-4"
            style={{
              marginBottom: '20px',
            }}
          >
            <div
              className="w-16 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #ff6b6b 100%)',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full"
              style={{
                background: '#ff6b6b',
                boxShadow: '0 0 20px rgba(255, 107, 107, 0.8), 0 0 40px rgba(255, 107, 107, 0.4)',
              }}
            />
            <div
              className="w-16 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ff6b6b 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Label */}
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{
              marginBottom: '12px',
              color: '#ff6b6b',
              fontWeight: 600,
            }}
          >
            Final Destination
          </div>

          {/* Main Heading */}
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{
              marginBottom: '16px',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Let&apos;s Connect
          </h2>

          {/* Supporting Text */}
          <p
            className="text-base md:text-lg"
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
              color: '#a0a0b0',
            }}
          >
            Thanks for taking this journey with me. I&apos;m always open to new opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        {/* CONTACT CARDS GRID */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          {CONTACT_METHODS.map((method, index) => (
            <motion.a
              key={method.id}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl cursor-pointer group"
              style={{
                paddingTop: '28px',
                paddingBottom: '28px',
                paddingLeft: '32px',
                paddingRight: '32px',
                background: 'rgba(30, 30, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 0 0 1px ${method.color}10
                `,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 12px 48px ${method.color}30,
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  0 0 0 1px ${method.color}40
                `;
                e.currentTarget.style.background = 'rgba(30, 30, 42, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 8px 32px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 0 0 1px ${method.color}10
                `;
                e.currentTarget.style.background = 'rgba(30, 30, 42, 0.6)';
              }}
            >
              {/* Top Accent Gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${method.color} 0%, transparent 70%)`,
                }}
              />

              {/* Icon & Label */}
              <div
                className="flex items-center gap-4"
                style={{
                  marginBottom: '14px',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${method.color}15`,
                    border: `1px solid ${method.color}30`,
                  }}
                >
                  {method.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      color: '#ffffff',
                      fontFamily: 'Space Grotesk, sans-serif',
                      marginBottom: '2px',
                    }}
                  >
                    {method.label}
                  </h3>
                  <p
                    className="text-sm font-mono"
                    style={{
                      color: method.color,
                      fontWeight: 600,
                    }}
                  >
                    {method.value}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm"
                style={{
                  lineHeight: '1.6',
                  color: '#b0b0c0',
                }}
              >
                {method.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5"
                  style={{ color: '#8a8a9a' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* RESUME DOWNLOAD CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <div
            className="inline-block rounded-2xl"
            style={{
              padding: isMobile ? '32px 24px' : '40px 48px',
              background: 'rgba(30, 30, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{
                marginBottom: '12px',
                color: '#ffffff',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Want to know more?
            </h3>
            <p
              className="text-sm md:text-base"
              style={{
                marginBottom: '24px',
                maxWidth: '400px',
                color: '#a0a0b0',
              }}
            >
              Download my resume for a complete overview of my experience, skills, and projects.
            </p>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #00a8e8 0%, #ff6b6b 100%)',
                boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </motion.a>
          </div>
        </motion.div>

        {/* AVAILABILITY STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(30, 30, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full"
              style={{
                background: '#00d68f',
                boxShadow: '0 0 12px rgba(0, 214, 143, 0.8)',
              }}
            />
            <span className="text-sm font-medium" style={{ color: '#b0b0c0' }}>
              Currently available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm" style={{ color: '#606070' }}>
            <span>© 2024 Atharva Joshi</span>
            <span className="hidden md:block">•</span>
            <span>Built with Next.js, GSAP, Framer Motion & ❤️</span>
            <span className="hidden md:block">•</span>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#00d68f' }}
              />
              <span>All systems operational</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Spacer */}
        <div style={{ height: isMobile ? '32px' : '48px' }} />
      </div>
    </section>
  );
}
