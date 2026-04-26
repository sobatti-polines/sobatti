"use client";

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"

const words = ["Web", "Video", "UI/UX", "IoT", "Mobile"]

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block relative text-accent-orange"
      style={{ minWidth: "4.5ch" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Inline SVG icons — replaces devicon.min.css (127KB) ── */
function JavaScriptIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"/>
    </svg>
  )
}

function AndroidStudioIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M25.1 17.7l13.4.1c-4.9 4.9-7.8 11.2-8.8 18.3l-5.1-.1c-5.5-.2-9.8-4.3-9.7-9.3 0-5.1 4.5-9 10.2-9zm40.2 77.2c.9 2.2 6.9 14.4 6.9 14.4H55.1s5.5-11.5 6.7-14.4c1-2.2 2.5-2.3 3.5 0z"/>
      <path d="M114.9 47.9c-1.1 4.3-5.5 7.5-10.9 7.5h-5c-.3.1-.5.3-.4.6v53.3h-9.1L72 73.1c1.8-2 2.9-4.7 2.9-7.6 0-4.8-2.8-9.1-7-10.8v-4.9c0-2.1-1.8-3.6-3.9-3.6h-.2c-2.1 0-3.9 1.8-3.9 3.9v4.6c-4.6 1.5-8 5.8-8 11 0 3 1.2 5.8 3.1 7.8l-17 35.9H23.1c-5.7 0-10.2-4.6-10.2-10.3V29.7s0-.6.1 0c.8 4.8 5 8.5 10.1 8.6H100c-.1 0 14.6-1.3 14.9 9.6z"/>
      <path d="M63.3 59.8c3.1 0 5.7 2.6 5.6 5.8 0 3.1-2.6 5.7-5.8 5.6-3.1 0-5.6-2.6-5.6-5.7 0-1.5.6-2.9 1.7-4 1.2-1.1 2.6-1.7 4.1-1.7zm2.3-3.3v-6c0-.7-.3-1.3-.9-1.6-.9-.5-2-.2-2.5.7-.2.3-.3.6-.2 1v5.8c-5 .8-8.5 5.5-7.7 10.6v.1c.4 2.4 1.7 4.6 3.7 6l-21.3 45.7c-.8 1.6-.7 3.6.4 5.1 1.6 2.3 4.7 2.9 7 1.3.8-.5 1.4-1.3 1.8-2.1L60 92.5c.9-2 3.3-2.9 5.4-1.9.8.4 1.5 1.1 1.9 1.9l14.5 30.3c1.2 2.5 4.2 3.5 6.7 2.3s3.5-4.2 2.3-6.7L69 72.9c4-3.2 4.7-9.1 1.5-13.1-1.2-1.6-2.9-2.7-4.9-3.3m14-43.6h-.1l5.3-9.2c.3-.5.1-1.1-.3-1.5-.5-.2-1-.1-1.3.3L77.6 12c-8.7-3.9-18.7-3.9-27.5 0l-5.4-9.4c-.2-.3-.6-.6-1-.6s-.8.2-1 .6c-.2.4-.2.8 0 1.1l5.4 9.2c-8.8 4.9-14.6 13.3-16 23.1h63.8c-1.5-9.8-7.5-18.2-16.3-23.1zM51.2 28l-.4.4c-.5.5-1.2.8-1.9.8h.1c-1.5 0-2.7-1.2-2.7-2.6v-.1c0-.7.3-1.4.8-1.9.9-1.1 2.6-1.3 3.7-.4 1.3.9 1.4 2.6.4 3.8zm27.4 1c-1.5.1-2.7-1.1-2.7-2.6v-.1c0-.7.3-1.4.8-1.9 1-1 2.7-1 3.8 0 .5.5.8 1.2.8 1.9 0 1.6-1.2 2.7-2.7 2.7zm27.1 29h-4.2c-.2.1-.4.3-.4.6v66.5c0 .3.2.5.5.5h4.4c5.1 0 9.2-4.2 9.2-9.2 0 0-.1-61.1 0-63.4.1-2.4-.5-.7-.7-.2-1.5 3.2-4.8 5.3-8.6 5.3h-.2z"/>
      <circle cx="63.3" cy="65.5" r="3.2"/>
    </svg>
  )
}

function ArduinoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M.3 66.5v-9.6c.2-.1.2-.3.2-.5 3-13.1 11.2-21 24.2-24.1 1.1-.3 2.3-.2 3.4-.6h6.4c.1.2.4.1.6.1 6.4.7 12.2 3 17.3 7 4.4 3.3 7.8 7.5 10.9 12 .4.6.6.6 1 0 1.8-2.6 3.7-5.1 5.9-7.4 5.3-5.7 11.7-9.7 19.5-11.1 1.1-.3 2.4-.2 3.5-.6h6.2c.1.2.3.1.5.1 1.9.2 3.7.6 5.5 1.1 13.4 3.9 22.9 16.2 22.1 30.1-.6 11.7-6.5 20.1-16.8 25.4-5.1 2.8-10.7 3.5-16.5 3.4-7.6-.1-14.2-2.7-19.9-7.7-4-3.5-7.1-7.7-10-12.1-.4-.6-.6-.5-1 .1-1.8 2.7-3.7 5.4-5.9 8-3.9 4.4-8.4 8-14 9.9-6.9 2.4-13.9 2.5-20.9.6-10.1-2.9-17-9.3-20.8-19.1-.6-1.6-.9-3.4-1.4-5zm31.8 14.7c5.7.2 10.6-1.7 14.8-5.6 4.3-4 7.4-9 10.5-13.9.1-.3.1-.5-.1-.8-2.6-4.1-5.3-8.2-8.9-11.6-6.9-6.6-15-8.8-24.1-5.9-7.5 2.5-12.3 7.8-13.4 15.8-1.1 7.5 1.8 13.5 7.8 18 4 2.9 8.5 4.1 13.4 4zm63.4 0c2.2 0 4.4-.1 6.5-.7 7.9-2.4 13.1-7.3 14.6-15.5 1.5-8.1-1.6-14.6-8.4-19.2-7.5-5.2-18.4-4.7-26 1-5.1 3.8-8.5 8.9-11.9 14.2-.2.3-.1.5 0 .8 2.7 4.3 5.4 8.6 8.9 12.3 4.4 4.7 9.7 7.4 16.3 7.1z" fillRule="evenodd"/>
      <path d="M32 58.5c3.2 0 6.5.1 9.7 0 .8 0 .9.2.9 1-.1.9-.1 1.8 0 2.7.1.8-.1 1-1 1H28.8c-2.2 0-4.4-.1-6.6 0-.7 0-.9-.2-.9-1 .1-.9.1-1.8 0-2.8 0-.7.2-.9.9-.9 3.2.1 6.5 0 9.8 0zm63-6.4c.8 0 1.6.1 2.3 0 .5 0 .7.2.7.7-.1 1.4 0 2.8-.1 4.2 0 .7.2.9.9.9 1.3-.1 2.7 0 4.1-.1.6 0 .8.1.8.8v4.6c0 .5-.2.7-.7.7-1.4-.1-2.8 0-4.3-.1-.6 0-.8.2-.8.8.1 1.4 0 2.8.1 4.2 0 .6-.2.9-.8.9-1.5-.1-3-.1-4.5 0-.6 0-.8-.2-.8-.8.1-1.5 0-2.9.1-4.4 0-.5-.2-.7-.7-.7-1.4.1-2.8 0-4.2.1-.8 0-.9-.3-.9-.9 0-1.4.1-2.8 0-4.2-.1-.8.3-1 1-1 1.4.1 2.7 0 4.1.1.5 0 .7-.2.7-.7-.1-1.4 0-2.9-.1-4.3 0-.6.2-.8.8-.8.8.1 1.5 0 2.3 0z" fillRule="evenodd"/>
    </svg>
  )
}

function PremiereProIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M50.3 38.5h-7.4v20.7h7.4c5 0 9.1-4.1 9.1-9.1v-2.4c0-5.1-4.1-9.2-9.1-9.2z"/>
      <path d="M0 0v128h128V0H0zm51.2 67.5h-8.3v21.3h-9.6V30.3h18.5c9.4-.1 17.1 7.4 17.2 16.8v2.3c0 9.9-8 18-17.8 18.1zm46.1-14.2s-7 0-10.1 1.3v34.2H77.1V48.9s10.2-5.1 20.2-3.8v8.2z"/>
    </svg>
  )
}

function CanvaIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M59.39.152c-.484.051-1.995.23-3.328.387-5.374.613-11.468 2.227-16.816 4.48C19.891 13.106 5.324 30.849 1.305 51.2.359 56.04.129 58.418.129 64c0 7.195.715 12.16 2.61 18.434 6.195 20.53 22.323 36.632 42.906 42.851 6.195 1.871 11.187 2.586 18.355 2.586 7.195 0 12.16-.715 18.434-2.61 20.53-6.195 36.632-22.323 42.851-42.906 1.871-6.195 2.586-11.187 2.586-18.355 0-3.047-.152-6.527-.332-7.809-2.074-14.796-8.168-27.238-18.328-37.402C99.07 8.703 86.68 2.586 72.19.512c-1.996-.282-11.238-.54-12.8-.36zm-20.863 40.32c1.36.41 1.996.794 2.918 1.715 1.793 1.82 2.203 2.817 2.203 5.555 0 2.051-.078 2.434-.691 3.508-1.18 1.996-3.918 3.84-5.812 3.89-1.333.028-1.278-.562.18-2.097 1.945-2.023 2.226-2.79 2.226-5.813-.024-2.917-.383-3.914-1.739-4.734-1.128-.691-2.355-.64-4.148.203-4.66 2.23-9.703 9.653-11.672 17.258-2.613 10.137 2.02 18.25 9.649 16.867 2.226-.41 6.425-2.558 8.246-4.25 1.508-1.379 1.508-1.406 1.66-3.12.336-3.587 2.867-7.169 6.25-8.833 1.558-.77 1.945-.844 4.043-.844 1.996 0 2.457.102 3.43.637 3.097 1.77 2.457 5.89-.895 5.89-1.945 0-2.945-1-1.535-1.534 1.383-.512.867-2.434-.742-2.868-1.895-.488-4.047.793-5.403 3.25-1.64 2.97-1.715 6.504-.156 8.114 1.512 1.613 3.406.336 4.867-3.329.766-1.867 1.867-2.867 3.149-2.867 1.125 0 1.332.692.843 2.793-.718 3.25-.23 4.094 1.793 3.098.664-.309 1.766-1.023 2.43-1.535l1.254-1 .848-4.43c.922-4.965 1.277-5.633 3.172-5.988 1.82-.336 2.23.562 1.562 3.402l-.36 1.59 1.333-1.36c3.148-3.226 7.015-4.812 8.347-3.48.715.715.637 1.613-.386 4.785-.485 1.512-1.153 3.895-1.457 5.25-.461 2.047-.489 2.535-.23 2.868.82.972 3.327-.028 5.554-2.204l1.305-1.277.156-2.844c.152-3.277.457-4.453 1.328-5.504.82-.972 2.305-1.687 3.098-1.484.793.207.793.973.078 3.227-1 3.097-.895 10.238.129 10.238.41 0 2.507-2.2 3.84-4.043l.996-1.36-.793-.816c-1.383-1.46-1.715-2.406-1.715-4.789 0-1.738.129-2.379.562-3.227.719-1.328 1.844-2.3 3.176-2.687 1.406-.434 3.148.281 3.863 1.562.719 1.305.54 4.223-.383 6.223l-.664 1.457h.895c1.23 0 1.715-.305 3.918-2.379 1.152-1.101 2.484-2.05 3.48-2.511 3.918-1.84 8.528-.895 9.293 1.921.64 2.254-.765 3.84-3.226 3.66-1.766-.128-2.098-.59-1.074-1.456 1.843-1.54 0-3.508-2.637-2.793-1.434.386-3.047 1.996-3.89 3.867-1.692 3.738-.794 8.14 1.636 8.14.973 0 2.691-1.921 3.355-3.789.793-2.152 2.457-3.507 3.711-3.02.692.255.743.946.309 3.122-.488 2.383-.563 4.61-.18 5.633.153.382.614 1.101 1.051 1.586.816.921.844 1.254.152 1.691-.332.23-.77.129-1.843-.46-1.485-.77-2.766-2.153-3.227-3.458l-.281-.766-1.024.766c-.59.41-1.511.871-2.047 1.023-2.125.563-4.738-.894-5.964-3.351-.489-.95-.641-3.738-.282-4.813.204-.59.204-.59-.617-.18-.433.231-1.355.485-2.07.563-1.18.13-1.36.258-2.535 1.742-1.664 2.07-4.61 4.864-5.813 5.454-2.558 1.277-3.402.918-4.07-1.72l-.461-1.765-1.102.973c-1.406 1.23-4.222 2.715-5.836 3.074-1.535.332-3.175-.156-3.84-1.18-.995-1.535-.663-4.785.922-9.164 1.176-3.25.333-3.3-2.636-.203-2.203 2.328-3.149 3.992-3.762 6.578-.64 2.688-1.41 3.66-3.148 4.07-1.051.231-1.54-.41-1.332-1.816l.152-1.129-.973.668c-1.383.946-3.125 1.817-4.328 2.149-1.203.332-2.789-.024-3.172-.692-.691-1.175-.691-1.175-1.765-.332-2.332 1.895-5.66 1.356-7.348-1.152l-.54-.793-1.687 1.562c-4.867 4.454-10.957 6.45-15.464 5.067-5.735-1.738-8.907-6.656-8.856-13.746.024-7.117 3.172-14.617 8.473-20.172 2.996-3.125 5.812-4.969 8.68-5.66 2.07-.512 3.328-.485 5.296.129z"/>
      <path d="M90.418 58.676c-.563.562-.356 2.816.36 4.25.359.742.742 1.332.87 1.332.102 0 .332-.59.512-1.309.64-2.66-.512-5.504-1.742-4.273z"/>
    </svg>
  )
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5zm0 0M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5zm0 0M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5zm0 0"/>
    </svg>
  )
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  "javascript": JavaScriptIcon,
  "androidstudio": AndroidStudioIcon,
  "arduino": ArduinoIcon,
  "premierepro": PremiereProIcon,
  "canva": CanvaIcon,
  "figma": FigmaIcon,
}

const icons = [
  { icon: "javascript", x: "12%", y: "18%", delay: 0 },
  { icon: "androidstudio", x: "88%", y: "25%", delay: 0.1 },
  { icon: "arduino", x: "8%", y: "72%", delay: 0.2 },
  { icon: "premierepro", x: "92%", y: "65%", delay: 0.1 },
  { icon: "canva", x: "20%", y: "45%", delay: 0.15 },
  { icon: "figma", x: "83%", y: "50%", delay: 0.25 },
]

function FloatingIcon({ icon, x, y, delay }: { icon: string; x: string; y: string; delay: number }) {
  const IconComponent = iconComponents[icon]
  if (!IconComponent) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute pointer-events-none text-accent-blue/25"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <div
        className="animate-float"
        style={{ animationDelay: `${delay * 0.5}s` }}
      >
        <IconComponent className="w-9 h-9 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px]" />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Floating icons */}
      {icons.map((item, index) => (
        <FloatingIcon key={index} {...item} />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent circle — far background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-accent-blue/[0.06] pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border border-accent-blue/[0.04] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
        <div className="max-w-[860px] mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8"
          >
            <Announcement className="bg-accent-orange/[0.06] border-accent-orange/20">
              <Badge variant="default" className="bg-accent-orange text-white">Promo</Badge>
              <AnnouncementTitle className="text-accent-orange/80">
                Diskon up to 60% — Untuk Mahasiswa Polines
              </AnnouncementTitle>
            </Announcement>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(32px,8vw,80px)] font-normal leading-[1.00] tracking-[-0.02em] text-foreground"
          >
            Kuasai <RotatingWord />
            <br />
            dengan bimbingan{" "}
            <span className="relative">
              <span className="relative z-10 text-accent-orange">Ahli</span>
              <span className="absolute inset-0 bg-accent-orange/30 -rotate-2 scale-y-110 scale-x-120" />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 mx-auto max-w-[560px] font-body text-[15px] sm:text-[17px] leading-[1.7] text-foreground/50"
          >
            Bimbel IT di Semarang langsung bareng mentor ahli — dari tugas kampus sampai proyek jadi, terutama area Tembalang
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="#services" className="btn btn-primary w-full sm:w-auto">
              Daftar Kelas Gratis
            </Link>
            <Link
              href="#about"
              className="btn btn-ghost text-foreground/60 hover:text-foreground w-full sm:w-auto"
            >
              Lihat Program Kami
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/30 font-semibold">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
}
