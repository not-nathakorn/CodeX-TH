"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAnimationFrame } from "framer-motion";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const angleRef = useRef(0);

    // Update rect on scroll/resize
    useEffect(() => {
      const updateRect = () => {
        if (containerRef.current) {
          rectRef.current = containerRef.current.getBoundingClientRect();
        }
      };

      updateRect();
      window.addEventListener("scroll", updateRect, { passive: true });
      window.addEventListener("resize", updateRect, { passive: true });

      return () => {
        window.removeEventListener("scroll", updateRect);
        window.removeEventListener("resize", updateRect);
      };
    }, []);

    // Track mouse position
    useEffect(() => {
      const handlePointerMove = (e: PointerEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }, []);

    useAnimationFrame(() => {
      if (disabled || !containerRef.current || !rectRef.current) return;

      const element = containerRef.current;
      const rect = rectRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      const center = [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5];
      const distanceFromCenter = Math.hypot(
        mouseX - center[0],
        mouseY - center[1]
      );
      const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * inactiveZone;

      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty("--active", "0");
        return;
      }

      const isActive =
        mouseX > rect.left - proximity &&
        mouseX < rect.left + rect.width + proximity &&
        mouseY > rect.top - proximity &&
        mouseY < rect.top + rect.height + proximity;

      element.style.setProperty("--active", isActive ? "1" : "0");

      if (!isActive) return;

      const targetAngle =
        (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

      // Smooth angle interpolation
      const currentAngle = angleRef.current;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff * 0.1; // Simple lerp factor

      angleRef.current = newAngle;
      element.style.setProperty("--start", String(newAngle));
    });

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #ffb6ff 10%, #ffb6ff00 20%),
                radial-gradient(circle at 40% 40%, #b6ffff 5%, #b6ffff00 15%),
                radial-gradient(circle at 60% 60%, #b6ffb6 10%, #b6ffb600 20%), 
                radial-gradient(circle at 40% 60%, #ffffb6 10%, #ffffb600 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #ffb6ff 0%,
                  #b6ffff calc(25% / var(--repeating-conic-gradient-times)),
                  #b6ffb6 calc(50% / var(--repeating-conic-gradient-times)), 
                  #ffffb6 calc(75% / var(--repeating-conic-gradient-times)),
                  #ffb6ff calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
