import { cn } from "@/lib/utils";
import React from "react";

export function StarBorder({
  as: Component = "button",
  className,
  color,
  speed = "6s",
  children,
  ...props
}) {
  const defaultColor = color || "hsl(var(--foreground))";

  return (
    <Component
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      {/* Button background color updated to black */}
      <div
        className={cn(
          "relative z-1 text-foreground text-center text-base py-4 px-6 rounded-[20px",
          "bg-black border border-border/40" // Button background set to black
        )}
      >
        {children}
      </div>
    </Component>
  );
}
