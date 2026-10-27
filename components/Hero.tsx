"use client"

import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useLenisPhysics } from "./SmoothScroll"

const disciplines = [
  {
    word: "Web",
    code: "01",
    stack: "React · Next.js · Laravel · MySQL",
    scope: "Full-Stack & Sistem ERP",
  },
  {
    word: "Video",
    code: "02",
    stack: "Premiere Pro · After Effects · Color Grading",
    scope: "Visual Storytelling & Editing",
  },
  {
    word: "UI/UX",
    code: "03",
    stack: "Figma · Design System · Prototyping",
    scope: "Product & Interface Design",
  },
  {
    word: "IoT",
    code: "04",
    stack: "Arduino · ESP32 · Sensor · MQTT",
    scope: "Hardware & Embedded System",
  },
  {
    word: "Mobile",
    code: "05",
    stack: "Flutter · Android Studio · React Native",
    scope: "iOS & Android Apps",
  },
]

/* ── Inline SVG icons ── */
function JavaScriptIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z" />
    </svg>
  )
}

function AndroidStudioIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path d="M25.1 17.7l13.4.1c-4.9 4.9-7.8 11.2-8.8 18.3l-5.1-.1c-5.5-.2-9.8-4.3-9.7-9.3 0-5.1 4.5-9 10.2-9zm40.2 77.2c.9 2.2 6.9 14.4 6.9 14.4H55.1s5.5-11.5 6.7-14.4c1-2.2 2.5-2.3 3.5 0z" />
      <path d="M114.9 47.9c-1.1 4.3-5.5 7.5-10.9 7.5h-5c-.3.1-.5.3-.4.6v53.3h-9.1L72 73.1c1.8-2 2.9-4.7 2.9-7.6 0-4.8-2.8-9.1-7-10.8v-4.9c0-2.1-1.8-3.6-3.9-3.6h-.2c-2.1 0-3.9 1.8-3.9 3.9v4.6c-4.6 1.5-8 5.8-8 11 0 3 1.2 5.8 3.1 7.8l-17 35.9H23.1c-5.7 0-10.2-4.6-10.2-10.3V29.7s0-.6.1 0c.8 4.8 5 8.5 10.1 8.6H100c-.1 0 14.6-1.3 14.9 9.6z" />
      <path d="M63.3 59.8c3.1 0 5.7 2.6 5.6 5.8 0 3.1-2.6 5.7-5.8 5.6-3.1 0-5.6-2.6-5.6-5.7 0-1.5.6-2.9 1.7-4 1.2-1.1 2.6-1.7 4.1-1.7zm2.3-3.3v-6c0-.7-.3-1.3-.9-1.6-.9-.5-2-.2-2.5.7-.2.3-.3.6-.2 1v5.8c-5 .8-8.5 5.5-7.7 10.6v.1c.4 2.4 1.7 4.6 3.7 6l-21.3 45.7c-.8 1.6-.7 3.6.4 5.1 1.6 2.3 4.7 2.9 7 1.3.8-.5 1.4-1.3 1.8-2.1L60 92.5c.9-2 3.3-2.9 5.4-1.9.8.4 1.5 1.1 1.9 1.9l14.5 30.3c1.2 2.5 4.2 3.5 6.7 2.3s3.5-4.2 2.3-6.7L69 72.9c4-3.2 4.7-9.1 1.5-13.1-1.2-1.6-2.9-2.7-4.9-3.3m14-43.6h-.1l5.3-9.2c.3-.5.1-1.1-.3-1.5-.5-.2-1-.1-1.3.3L77.6 12c-8.7-3.9-18.7-3.9-27.5 0l-5.4-9.4c-.2-.3-.6-.6-1-.6s-.8.2-1 .6c-.2.4-.2.8 0 1.1l5.4 9.2c-8.8 4.9-14.6 13.3-16 23.1h63.8c-1.5-9.8-7.5-18.2-16.3-23.1zM51.2 28l-.4.4c-.5.5-1.2.8-1.9.8h.1c-1.5 0-2.7-1.2-2.7-2.6v-.1c0-.7.3-1.4.8-1.9.9-1.1 2.6-1.3 3.7-.4 1.3.9 1.4 2.6.4 3.8zm27.4 1c-1.5.1-2.7-1.1-2.7-2.6v-.1c0-.7.3-1.4.8-1.9 1-1 2.7-1 3.8 0 .5.5.8 1.2.8 1.9 0 1.6-1.2 2.7-2.7 2.7zm27.1 29h-4.2c-.2.1-.4.3-.4.6v66.5c0 .3.2.5.5.5h4.4c5.1 0 9.2-4.2 9.2-9.2 0 0-.1-61.1 0-63.4.1-2.4-.5-.7-.7-.2-1.5 3.2-4.8 5.3-8.6 5.3h-.2z" />
      <circle cx="63.3" cy="65.5" r="3.2" />
    </svg>
  )
}

function ArduinoIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path
        d="M.3 66.5v-9.6c.2-.1.2-.3.2-.5 3-13.1 11.2-21 24.2-24.1 1.1-.3 2.3-.2 3.4-.6h6.4c.1.2.4.1.6.1 6.4.7 12.2 3 17.3 7 4.4 3.3 7.8 7.5 10.9 12 .4.6.6.6 1 0 1.8-2.6 3.7-5.1 5.9-7.4 5.3-5.7 11.7-9.7 19.5-11.1 1.1-.3 2.4-.2 3.5-.6h6.2c.1.2.3.1.5.1 1.9.2 3.7.6 5.5 1.1 13.4 3.9 22.9 16.2 22.1 30.1-.6 11.7-6.5 20.1-16.8 25.4-5.1 2.8-10.7 3.5-16.5 3.4-7.6-.1-14.2-2.7-19.9-7.7-4-3.5-7.1-7.7-10-12.1-.4-.6-.6-.5-1 .1-1.8 2.7-3.7 5.4-5.9 8-3.9 4.4-8.4 8-14 9.9-6.9 2.4-13.9 2.5-20.9.6-10.1-2.9-17-9.3-20.8-19.1-.6-1.6-.9-3.4-1.4-5zm31.8 14.7c5.7.2 10.6-1.7 14.8-5.6 4.3-4 7.4-9 10.5-13.9.1-.3.1-.5-.1-.8-2.6-4.1-5.3-8.2-8.9-11.6-6.9-6.6-15-8.8-24.1-5.9-7.5 2.5-12.3 7.8-13.4 15.8-1.1 7.5 1.8 13.5 7.8 18 4 2.9 8.5 4.1 13.4 4zm63.4 0c2.2 0 4.4-.1 6.5-.7 7.9-2.4 13.1-7.3 14.6-15.5 1.5-8.1-1.6-14.6-8.4-19.2-7.5-5.2-18.4-4.7-26 1-5.1 3.8-8.5 8.9-11.9 14.2-.2.3-.1.5 0 .8 2.7 4.3 5.4 8.6 8.9 12.3 4.4 4.7 9.7 7.4 16.3 7.1z"
        fillRule="evenodd"
      />
      <path
        d="M32 58.5c3.2 0 6.5.1 9.7 0 .8 0 .9.2.9 1-.1.9-.1 1.8 0 2.7.1.8-.1 1-1 1H28.8c-2.2 0-4.4-.1-6.6 0-.7 0-.9-.2-.9-1 .1-.9.1-1.8 0-2.8 0-.7.2-.9.9-.9 3.2.1 6.5 0 9.8 0zm63-6.4c.8 0 1.6.1 2.3 0 .5 0 .7.2.7.7-.1 1.4 0 2.8-.1 4.2 0 .7.2.9.9.9 1.3-.1 2.7 0 4.1-.1.6 0 .8.1.8.8v4.6c0 .5-.2.7-.7.7-1.4-.1-2.8 0-4.3-.1-.6 0-.8.2-.8.8.1 1.4 0 2.8.1 4.2 0 .6-.2.9-.8.9-1.5-.1-3-.1-4.5 0-.6 0-.8-.2-.8-.8.1-1.5 0-2.9.1-4.4 0-.5-.2-.7-.7-.7-1.4.1-2.8 0-4.2.1-.8 0-.9-.3-.9-.9 0-1.4.1-2.8 0-4.2-.1-.8.3-1 1-1 1.4.1 2.7 0 4.1.1.5 0 .7-.2.7-.7-.1-1.4 0-2.9-.1-4.3 0-.6.2-.8.8-.8.8.1 1.5 0 2.3 0z"
        fillRule="evenodd"
      />
    </svg>
  )
}

function PremiereProIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path d="M50.3 38.5h-7.4v20.7h7.4c5 0 9.1-4.1 9.1-9.1v-2.4c0-5.1-4.1-9.2-9.1-9.2z" />
      <path d="M0 0v128h128V0H0zm51.2 67.5h-8.3v21.3h-9.6V30.3h18.5c9.4-.1 17.1 7.4 17.2 16.8v2.3c0 9.9-8 18-17.8 18.1zm46.1-14.2s-7 0-10.1 1.3v34.2H77.1V48.9s10.2-5.1 20.2-3.8v8.2z" />
    </svg>
  )
}

function CanvaIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path d="M59.39.152c-.484.051-1.995.23-3.328.387-5.374.613-11.468 2.227-16.816 4.48C19.891 13.106 5.324 30.849 1.305 51.2.359 56.04.129 58.418.129 64c0 7.195.715 12.16 2.61 18.434 6.195 20.53 22.323 36.632 42.906 42.851 6.195 1.871 11.187 2.586 18.355 2.586 7.195 0 12.16-.715 18.434-2.61 20.53-6.195 36.632-22.323 42.851-42.906 1.871-6.195 2.586-11.187 2.586-18.355 0-3.047-.152-6.527-.332-7.809-2.074-14.796-8.168-27.238-18.328-37.402C99.07 8.703 86.68 2.586 72.19.512c-1.996-.282-11.238-.54-12.8-.36zm-20.863 40.32c1.36.41 1.996.794 2.918 1.715 1.793 1.82 2.203 2.817 2.203 5.555 0 2.051-.078 2.434-.691 3.508-1.18 1.996-3.918 3.84-5.812 3.89-1.333.028-1.278-.562.18-2.097 1.945-2.023 2.226-2.79 2.226-5.813-.024-2.917-.383-3.914-1.739-4.734-1.128-.691-2.355-.64-4.148.203-4.66 2.23-9.703 9.653-11.672 17.258-2.613 10.137 2.02 18.25 9.649 16.867 2.226-.41 6.425-2.558 8.246-4.25 1.508-1.379 1.508-1.406 1.66-3.12.336-3.587 2.867-7.169 6.25-8.833 1.558-.77 1.945-.844 4.043-.844 1.996 0 2.457.102 3.43.637 3.097 1.77 2.457 5.89-.895 5.89-1.945 0-2.945-1-1.535-1.534 1.383-.512.867-2.434-.742-2.868-1.895-.488-4.047.793-5.403 3.25-1.64 2.97-1.715 6.504-.156 8.114 1.512 1.613 3.406.336 4.867-3.329.766-1.867 1.867-2.867 3.149-2.867 1.125 0 1.332.692.843 2.793-.718 3.25-.23 4.094 1.793 3.098.664-.309 1.766-1.023 2.43-1.535l1.254-1 .848-4.43c.922-4.965 1.277-5.633 3.172-5.988 1.82-.336 2.23.562 1.562 3.402l-.36 1.59 1.333-1.36c3.148-3.226 7.015-4.812 8.347-3.48.715.715.637 1.613-.386 4.785-.485 1.512-1.153 3.895-1.457 5.25-.461 2.047-.489 2.535-.23 2.868.82.972 3.327-.028 5.554-2.204l1.305-1.277.156-2.844c.152-3.277.457-4.453 1.328-5.504.82-.972 2.305-1.687 3.098-1.484.793.207.793.973.078 3.227-1 3.097-.895 10.238.129 10.238.41 0 2.507-2.2 3.84-4.043l.996-1.36-.793-.816c-1.383-1.46-1.715-2.406-1.715-4.789 0-1.738.129-2.379.562-3.227.719-1.328 1.844-2.3 3.176-2.687 1.406-.434 3.148.281 3.863 1.562.719 1.305.54 4.223-.383 6.223l-.664 1.457h.895c1.23 0 1.715-.305 3.918-2.379 1.152-1.101 2.484-2.05 3.48-2.511 3.918-1.84 8.528-.895 9.293 1.921.64 2.254-.765 3.84-3.226 3.66-1.766-.128-2.098-.59-1.074-1.456 1.843-1.54 0-3.508-2.637-2.793-1.434.386-3.047 1.996-3.89 3.867-1.692 3.738-.794 8.14 1.636 8.14.973 0 2.691-1.921 3.355-3.789.793-2.152 2.457-3.507 3.711-3.02.692.255.743.946.309 3.122-.488 2.383-.563 4.61-.18 5.633.153.382.614 1.101 1.051 1.586.816.921.844 1.254.152 1.691-.332.23-.77.129-1.843-.46-1.485-.77-2.766-2.153-3.227-3.458l-.281-.766-1.024.766c-.59.41-1.511.871-2.047 1.023-2.125.563-4.738-.894-5.964-3.351-.489-.95-.641-3.738-.282-4.813.204-.59.204-.59-.617-.18-.433.231-1.355.485-2.07.563-1.18.13-1.36.258-2.535 1.742-1.664 2.07-4.61 4.864-5.813 5.454-2.558 1.277-3.402.918-4.07-1.72l-.461-1.765-1.102.973c-1.406 1.23-4.222 2.715-5.836 3.074-1.535.332-3.175-.156-3.84-1.18-.995-1.535-.663-4.785.922-9.164 1.176-3.25.333-3.3-2.636-.203-2.203 2.328-3.149 3.992-3.762 6.578-.64 2.688-1.41 3.66-3.148 4.07-1.051.231-1.54-.41-1.332-1.816l.152-1.129-.973.668c-1.383.946-3.125 1.817-4.328 2.149-1.203.332-2.789-.024-3.172-.692-.691-1.175-.691-1.175-1.765-.332-2.332 1.895-5.66 1.356-7.348-1.152l-.54-.793-1.687 1.562c-4.867 4.454-10.957 6.45-15.464 5.067-5.735-1.738-8.907-6.656-8.856-13.746.024-7.117 3.172-14.617 8.473-20.172 2.996-3.125 5.812-4.969 8.68-5.66 2.07-.512 3.328-.485 5.296.129z" />
      <path d="M90.418 58.676c-.563.562-.356 2.816.36 4.25.359.742.742 1.332.87 1.332.102 0 .332-.59.512-1.309.64-2.66-.512-5.504-1.742-4.273z" />
    </svg>
  )
}

function FigmaIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
      fill="currentColor"
    >
      <path d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5zm0 0M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5zm0 0M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5zm0 0" />
    </svg>
  )
}

const iconComponents: Record<
  string,
  React.ComponentType<{ readonly className?: string }>
> = {
  javascript: JavaScriptIcon,
  androidstudio: AndroidStudioIcon,
  arduino: ArduinoIcon,
  premierepro: PremiereProIcon,
  canva: CanvaIcon,
  figma: FigmaIcon,
}

const icons = [
  {
    icon: "javascript",
    label: "JS · ES2026",
    x: "11%",
    y: "24%",
    zStart: 60,
    zEnd: 620,
    dx: -360,
    dy: -240,
    rotY: 28,
  },
  {
    icon: "androidstudio",
    label: "ANDROID · SDK",
    x: "88%",
    y: "25%",
    zStart: 40,
    zEnd: 580,
    dx: 360,
    dy: -220,
    rotY: -28,
  },
  {
    icon: "canva",
    label: "VISUAL · DESIGN",
    x: "7%",
    y: "54%",
    zStart: -20,
    zEnd: 540,
    dx: -420,
    dy: 20,
    rotY: 35,
  },
  {
    icon: "figma",
    label: "FIGMA · UI/UX",
    x: "92%",
    y: "53%",
    zStart: 90,
    zEnd: 650,
    dx: 420,
    dy: 15,
    rotY: -35,
  },
  {
    icon: "arduino",
    label: "IOT · ARDUINO",
    x: "15%",
    y: "81%",
    zStart: 50,
    zEnd: 590,
    dx: -320,
    dy: 260,
    rotY: 22,
  },
  {
    icon: "premierepro",
    label: "PREMIERE · PRO",
    x: "85%",
    y: "80%",
    zStart: 70,
    zEnd: 610,
    dx: 340,
    dy: 250,
    rotY: -22,
  },
]

function SpatialIconTotem({
  item,
  scrollYProgress,
  isHydrated,
}: {
  readonly item: (typeof icons)[number]
  readonly scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  readonly isHydrated: boolean
}) {
  const IconComponent = iconComponents[item.icon]
  // Blast radially outward in 3D space as the camera zooms into the Hero font!
  const x = useTransform(scrollYProgress, [0, 0.14, 0.65], [0, 0, item.dx])
  const y = useTransform(scrollYProgress, [0, 0.14, 0.65], [0, 0, item.dy])
  const z = useTransform(
    scrollYProgress,
    [0, 0.14, 0.65],
    [item.zStart, item.zStart + 20, item.zEnd]
  )
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.65],
    [item.rotY, item.rotY * 2.8]
  )
  const rotateX = useTransform(scrollYProgress, [0, 0.65], [10, -35])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.52], [0.9, 0.7, 0])

  if (!IconComponent) return null

  return (
    <motion.div
      aria-hidden="true"
      style={
        isHydrated
          ? {
              left: item.x,
              top: item.y,
              x,
              y,
              z,
              rotateY,
              rotateX,
              opacity,
            }
          : {
              left: item.x,
              top: item.y,
            }
      }
      className="hidden md:flex flex-col items-center gap-1.5 absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none preserve-3d"
    >
      <div className="relative text-accent-blue/25">
        <IconComponent className="w-11 h-11 lg:w-14 lg:h-14" />
      </div>
      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-foreground/45 uppercase">
        {item.label}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [portalActive, setPortalActive] = useState(false)
  const { isHydrated } = useLenisPhysics()

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % disciplines.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [isPaused])

  // Cursor 3D tilt values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 24 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 24 })

  const tiltRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6])
  const tiltRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.0005,
  })

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const nextPortal = v > 0.35
    setPortalActive((prev) => (prev !== nextPortal ? nextPortal : prev))
  })

  // 1. Peripheral UI (Top Promo, Discipline Switcher, Bottom Subheadline & CTAs)
  // Stays 100% readable at 0 -> 0.14, then parts outward as the camera zooms into "Ahli"
  const topUiY = useTransform(smoothProgress, [0, 0.14, 0.42], [0, 0, -140])
  const topUiOpacity = useTransform(smoothProgress, [0, 0.14, 0.36], [1, 1, 0])

  const bottomUiY = useTransform(smoothProgress, [0, 0.14, 0.42], [0, 0, 150])
  const bottomUiOpacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.36],
    [1, 1, 0]
  )

  // 2. Exponential Total Zoom-In into the focal word "Ahli"
  // 0 -> 0.14: scale 1 (reading plateau)
  // 0.14 -> 0.88: zooms in exponentially up to 68x directly into the center of "Ahli"
  const headlineScale = useTransform(
    smoothProgress,
    [0, 0.14, 0.38, 0.62, 0.88, 1],
    [1, 1, 3.2, 16, 64, 85]
  )

  // Upper lines ("Kuasai [Web] dengan bimbingan") fade out as we dive deep into "Ahli"
  const upperLinesOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.44],
    [1, 1, 0]
  )

  // "Ahli" morphs from accent-blue (#024885) into dark-surface (#0a0b0d) as it swallows the screen
  const ahliColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.52],
    ["#024885", "#024885", "#0a0b0d"]
  )

  // Dark portal core inside "Ahli" expands to guarantee 100% seamless #0a0b0d screen fill at peak zoom
  const portalCoreScale = useTransform(
    smoothProgress,
    [0, 0.38, 0.62, 0.82],
    [0, 0, 14, 48]
  )
  const portalCoreOpacity = useTransform(
    smoothProgress,
    [0, 0.38, 0.54, 1],
    [0, 0, 1, 1]
  )

  // 3. Inner Portal Reveal (appears inside the dark interior of the zoomed-in font!)
  const innerPortalOpacity = useTransform(
    smoothProgress,
    [0.58, 0.72, 0.92, 1],
    [0, 1, 1, 1]
  )
  const innerPortalScale = useTransform(
    smoothProgress,
    [0.56, 0.76, 1],
    [0.78, 1, 1.06]
  )
  const innerPortalY = useTransform(smoothProgress, [0.56, 0.76, 1], [36, 0, -20])

  // 4. 3D Gyroscope rings expand and spin as we zoom through them
  const ring1RotateZ = useTransform(smoothProgress, [0, 0.7], [0, 220])
  const ring2RotateZ = useTransform(smoothProgress, [0, 0.7], [0, -260])
  const ringScale = useTransform(smoothProgress, [0, 0.14, 0.65], [1, 1.05, 3.6])
  const ringOpacity = useTransform(smoothProgress, [0, 0.35, 0.58], [1, 0.6, 0])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(nx)
    mouseY.set(ny)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const currentDiscipline = disciplines[activeIdx] ?? disciplines[0]

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[300vh] lg:h-[340vh] bg-paper-surface"
    >
      {/* Pinned 3D Spatial Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center scene-3d-deep">
        {/* Subtle Architectural Target Crosshairs in Background */}
        <motion.div
          aria-hidden="true"
          style={isHydrated ? { opacity: ringOpacity } : undefined}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-px bg-foreground/[0.04]" />
          <div className="h-full w-px bg-foreground/[0.04] absolute" />
        </motion.div>

        {/* 3D World Container */}
        <motion.div
          style={
            isHydrated
              ? {
                  rotateX: tiltRotateX,
                  rotateY: tiltRotateY,
                }
              : undefined
          }
          className="relative w-full h-full flex items-center justify-center preserve-3d"
        >
          {/* 3D Tilted Orbital Ring 01 */}
          <motion.div
            aria-hidden="true"
            style={
              isHydrated
                ? {
                    rotateX: 68,
                    rotateY: -16,
                    rotateZ: ring1RotateZ,
                    scale: ringScale,
                    opacity: ringOpacity,
                  }
                : undefined
            }
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[540px] sm:h-[540px] lg:w-[800px] lg:h-[800px] rounded-full border border-foreground/[0.08] pointer-events-none preserve-3d"
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-accent-orange bg-paper-surface" />
          </motion.div>

          {/* 3D Tilted Orbital Ring 02 */}
          <motion.div
            aria-hidden="true"
            style={
              isHydrated
                ? {
                    rotateX: -58,
                    rotateY: 22,
                    rotateZ: ring2RotateZ,
                    scale: ringScale,
                    opacity: ringOpacity,
                  }
                : undefined
            }
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[440px] sm:h-[440px] lg:w-[640px] lg:h-[640px] rounded-full border border-accent-blue/15 pointer-events-none preserve-3d"
          >
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-accent-blue" />
          </motion.div>

          {/* 3D Spatial Floating Tech Icons */}
          {icons.map((item) => (
            <SpatialIconTotem
              key={item.icon}
              item={item}
              scrollYProgress={smoothProgress}
              isHydrated={isHydrated}
            />
          ))}

          {/* Center Stage Container */}
          <div
            className={`relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 w-full flex flex-col items-center justify-center pt-14 preserve-3d ${
              portalActive ? "pointer-events-none" : ""
            }`}
          >
            {/* ── TOP UI: Promo Banner + Architectural 5-Discipline Index ── */}
            <motion.div
              style={
                isHydrated
                  ? {
                      y: topUiY,
                      opacity: topUiOpacity,
                    }
                  : undefined
              }
              className="flex flex-col items-center mb-6 md:mb-8"
            >
              <Link
                href="#portfolio"
                className="inline-flex items-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-full mb-5"
              >
                <Announcement className="bg-white hover:bg-secondary-surface/60 border-foreground/15 hover:border-accent-blue transition-colors duration-200 px-3 py-1.5 shadow-none">
                  <Badge
                    variant="default"
                    className="bg-accent-orange text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    PROMO
                  </Badge>
                  <AnnouncementTitle className="text-foreground font-semibold text-xs sm:text-sm flex items-center gap-1.5 pr-1">
                    <span>
                      Special ERP Website{" "}
                      <span className="text-foreground/65 font-normal hidden sm:inline">
                        · Solusi Sistem Custom &amp; Bimbingan Proyek
                      </span>
                    </span>
                    <ArrowRight className="size-3.5 text-accent-orange transition-transform duration-200 group-hover:translate-x-1" />
                  </AnnouncementTitle>
                </Announcement>
              </Link>

              {/* Architectural 5-Discipline Index (No bubble-pill glassmorphism) */}
              <div
                role="group"
                aria-label="Pilih bidang keahlian IT"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="inline-flex flex-wrap items-center justify-center border-y border-foreground/10 divide-x divide-foreground/10"
              >
                {disciplines.map((d, idx) => {
                  const isActive = idx === activeIdx
                  return (
                    <button
                      key={d.word}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`relative min-h-[44px] sm:min-h-[38px] px-3.5 sm:px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue ${
                        isActive
                          ? "text-white"
                          : "text-foreground/65 hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="hero-discipline-pill"
                          transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 30,
                          }}
                          className="absolute inset-0 bg-accent-blue -z-10"
                        />
                      )}
                      <span
                        className={
                          isActive
                            ? "text-white/80 mr-1"
                            : "text-accent-orange mr-1"
                        }
                      >
                        /{d.code}
                      </span>
                      {d.word}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* ── CENTER ZOOM PORTAL HEADLINE ── */}
            {/* Zooms in 85x directly into the word "Ahli" at the bottom-center of the h1 */}
            <motion.div
              style={
                isHydrated
                  ? {
                      scale: headlineScale,
                      transformOrigin: "50% 82%",
                    }
                  : undefined
              }
              className="relative text-center select-none will-change-transform"
            >
              <h1 className="font-display text-[clamp(36px,5.6vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground">
                <motion.span
                  style={
                    isHydrated ? { opacity: upperLinesOpacity } : undefined
                  }
                  className="block"
                >
                  Kuasai{" "}
                  <span
                    className="inline-flex items-baseline justify-center relative text-accent-orange scene-3d align-baseline"
                    style={{ minWidth: "4.2ch" }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentDiscipline.word}
                        initial={{ rotateX: -85, y: 28, opacity: 0 }}
                        animate={{ rotateX: 0, y: 0, opacity: 1 }}
                        exit={{ rotateX: 85, y: -28, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: "50% 50% -20px" }}
                        className="inline-block font-extrabold preserve-3d"
                      >
                        {currentDiscipline.word}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>

                <motion.span
                  style={
                    isHydrated ? { opacity: upperLinesOpacity } : undefined
                  }
                  className="block mt-1"
                >
                  dengan bimbingan
                </motion.span>

                {/* THE PORTAL ANCHOR WORD: "Ahli" (Centered on its own line so the 85x zoom dives straight through it) */}
                <span className="relative inline-flex items-center justify-center mt-1.5 px-4 py-0.5">
                  {/* Expanding Dark Portal Core inside "Ahli" so peak zoom transitions seamlessly into #0a0b0d */}
                  <motion.span
                    aria-hidden="true"
                    style={
                      isHydrated
                        ? {
                            scale: portalCoreScale,
                            opacity: portalCoreOpacity,
                          }
                        : { opacity: 0 }
                    }
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-surface -z-10 will-change-transform"
                  />

                  <motion.span
                    style={isHydrated ? { color: ahliColor } : undefined}
                    className="relative inline-block text-accent-blue"
                  >
                    Ahli.
                    <motion.span
                      aria-hidden="true"
                      style={
                        isHydrated ? { opacity: upperLinesOpacity } : undefined
                      }
                      className="block h-[3px] w-full bg-accent-orange mt-1"
                    />
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* ── BOTTOM UI: Architectural Tech Readout + Subheadline + CTAs ── */}
            <motion.div
              style={
                isHydrated
                  ? {
                      y: bottomUiY,
                      opacity: bottomUiOpacity,
                    }
                  : undefined
              }
              className="flex flex-col items-center text-center mt-6 md:mt-7"
            >
              {/* Clean Typographic Stack Readout (No Sparkles icon, no nested pill) */}
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 mb-4 font-mono text-[11px] tracking-[0.14em] uppercase">
                <span className="font-bold text-accent-orange">
                  /{currentDiscipline.code}
                </span>
                <span className="font-bold text-accent-blue">
                  {currentDiscipline.scope}
                </span>
                <span aria-hidden="true" className="text-foreground/30">
                  /
                </span>
                <span className="font-medium text-foreground/75">
                  {currentDiscipline.stack}
                </span>
              </div>

              <p className="mx-auto max-w-[540px] font-body text-[15.5px] sm:text-[17.5px] leading-[1.68] text-foreground/75">
                Bimbel IT di Semarang langsung bareng mentor ahli, dari tugas
                kampus sampai proyek jadi, terutama area Tembalang
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="#services"
                  className="btn btn-primary w-full sm:w-auto group"
                >
                  <span>Daftar Kelas Gratis</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#about"
                  className="btn btn-ghost text-foreground/80 hover:text-foreground w-full sm:w-auto"
                >
                  Lihat Program Kami
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── INNER PORTAL REVEAL (Emerges inside the dark interior of "Ahli" at peak zoom!) ── */}
        <motion.div
          aria-hidden={!portalActive}
          style={
            isHydrated
              ? {
                  opacity: innerPortalOpacity,
                  scale: innerPortalScale,
                  y: innerPortalY,
                }
              : { opacity: 0 }
          }
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 bg-dark-surface/95"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-2 w-2 bg-accent-orange" />
            <span className="font-mono text-[11px] font-bold tracking-[0.28em] uppercase text-accent-orange">
              /00 · MEMASUKI EKOSISTEM SOBATTI
            </span>
          </div>

          <p className="font-display text-[clamp(26px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white max-w-[820px]">
            Dari baris kode pertama hingga{" "}
            <span className="text-accent-orange">proyek siap produksi</span>{" "}
            bersama mentor praktisi.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] tracking-[0.24em] uppercase text-white/70">
            <span>TEMBALANG</span>
            <span className="text-accent-orange">·</span>
            <span>POLINES</span>
            <span className="text-accent-orange">·</span>
            <span>UNNES</span>
            <span className="text-accent-orange">·</span>
            <span>SEMARANG</span>
          </div>
        </motion.div>

        {/* Scroll Prompt at Bottom */}
        <motion.div
          aria-hidden="true"
          style={isHydrated ? { opacity: bottomUiOpacity } : undefined}
          className="hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 items-center gap-3 text-foreground/65 pointer-events-none z-20"
        >
          <span className="font-mono text-[10px] font-bold tracking-[0.26em] uppercase">
            SCROLL UNTUK MASUK KE PORTAL AHLI
          </span>
        </motion.div>
      </div>
    </section>
  )
}
