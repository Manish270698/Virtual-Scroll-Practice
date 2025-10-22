import React, { useEffect, useRef, useState } from "react";
import type { VirtualListProps } from "../types/list-interfaces";

const VirtualList_Manual: React.FC<VirtualListProps> = ({
  items,
  itemHeight = 5, // in vh
  height = 80, // container height in vh
  overscan = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vhInPx, setVhInPx] = useState(window.innerHeight / 100);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeightPx = itemHeight * vhInPx;
  const heightPx = height * vhInPx;

  const totalHeightPx = items.length * itemHeightPx;
  const visibleCount = Math.ceil(heightPx / itemHeightPx);
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeightPx) - overscan
  );
  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + overscan * 2
  );
  const offsetY = startIndex * itemHeightPx;

  const visibleItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener("scroll", onScroll);

    const handleResize = () => {
      setVhInPx(window.innerHeight / 100);
    };
    window?.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${height}vh`,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #000",
      }}
    >
      <div
        style={{
          height: `${totalHeightPx}px`,
          position: "relative",
        }}
      >
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: `${itemHeight}vh`,
                borderBottom: "1px solid #eee",
                padding: "0 8px",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList_Manual;
