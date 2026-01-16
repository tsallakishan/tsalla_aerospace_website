"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Custom Hooks (useMedia, useMeasure) ---
const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue
  }
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handler = () => setValue(get)
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler))

    // Set initial value after mount
    setValue(get())

    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  return value
}

const useMeasure = () => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, size]
}

// --- Image Preloader ---
const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = img.onerror = () => resolve()
        }),
    ),
  )
}

// --- Masonry Component ---
const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)", "(min-width: 400px)"],
    [5, 4, 3, 2],
    1,
  )

  const [containerRef, { width }] = useMeasure()
  const [imagesReady, setImagesReady] = useState(false)

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }
    let direction = animateFrom
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"]
      direction = dirs[Math.floor(Math.random() * dirs.length)]
    }
    switch (direction) {
      case "top":
        return { x: item.x, y: -200 }
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 }
      case "left":
        return { x: -200, y: item.y }
      case "right":
        return { x: window.innerWidth + 200, y: item.y }
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo(() => {
    if (!width) return []
    const colHeights = new Array(columns).fill(0)
    const gap = 16
    const totalGaps = (columns - 1) * gap
    const columnWidth = (width - totalGaps) / columns
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = col * (columnWidth + gap)
      const height = (child.height / child.width) * columnWidth
      const y = colHeights[col]
      colHeights[col] += height + gap
      return { ...child, x, y, w: columnWidth, h: height }
    })
  }, [columns, items, width])

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h }
      if (!hasMounted.current) {
        const start = getInitialPosition(item)
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        )
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        })
      }
    })
    hasMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease])

  const handleMouseEnter = (id, element) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay")
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
    }
  }

  const handleMouseLeave = (id, element) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay")
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
    }
  }

  const gridHeight = grid.length > 0 ? Math.max(...grid.map((g) => g.y + g.h)) : 0

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${gridHeight}px` }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: "transform, width, height, opacity" }}
          onClick={() => window.open(item.url, "_blank", "noopener")}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[0.625rem] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[0.625rem] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Main Page Component ---
export default function HiringProcess() {
  const masonryItems = [
    { id: "1", img: "https://picsum.photos/id/1015/600/900", url: "#", width: 600, height: 900 },
    { id: "2", img: "https://picsum.photos/id/1011/600/400", url: "#", width: 600, height: 400 },
    { id: "3", img: "https://picsum.photos/id/1020/600/800", url: "#", width: 600, height: 800 },
    { id: "4", img: "https://picsum.photos/id/103/600/750", url: "#", width: 600, height: 750 },
    { id: "5", img: "https://picsum.photos/id/1043/600/600", url: "#", width: 600, height: 600 },
    { id: "6", img: "https://picsum.photos/id/1047/600/900", url: "#", width: 600, height: 900 },
    { id: "7", img: "https://picsum.photos/id/1050/600/500", url: "#", width: 600, height: 500 },
    { id: "8", img: "https://picsum.photos/id/106/600/800", url: "#", width: 600, height: 800 },
    { id: "9", img: "https://picsum.photos/id/1060/600/1000", url: "#", width: 600, height: 1000 },
    { id: "10", img: "https://picsum.photos/id/1062/600/700", url: "#", width: 600, height: 700 },
    { id: "11", img: "https://picsum.photos/id/1074/600/800", url: "#", width: 600, height: 800 },
    { id: "12", img: "https://picsum.photos/id/1084/600/600", url: "#", width: 600, height: 600 },
  ]

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <ContentWrapper>
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-black font-clash tracking-tighter" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Life at Tsalla</h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 mt-4 max-w-2xl mx-auto">
            A glimpse into the moments, the people, and the culture that define our journey.
          </p>
        </header>
        <main>
          <Masonry
            items={masonryItems}
            duration={0.8}
            stagger={0.06}
            scaleOnHover={true}
            hoverScale={1.05}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </main>
      </ContentWrapper>
    </div>
  )
}
