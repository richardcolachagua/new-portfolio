import React, { useRef, useState, useCallback } from "react";

type MouseState = {
  elementX: number | null;
  elementY: number | null;
};

export function useMouse(): [MouseState, React.RefObject<HTMLDivElement>] {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<MouseState>({
    elementX: null,
    elementY: null,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        elementX: event.clientX - rect.left,
        elementY: event.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({
      elementX: null,
      elementY: null,
    });
  }, []);

  // Attach listeners
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return [mouse, ref];
}
