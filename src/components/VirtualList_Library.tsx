import React, { useState, useEffect } from "react";
import { List, type RowComponentProps } from "react-window";
import type { VirtualListProps } from "../types/list-interfaces";

const VirtualList_Library: React.FC<VirtualListProps> = ({
  items,
  itemHeight = 5,
  height = 80,
  overscan = 5,
}) => {
  const [vhInPx, setVhInPx] = useState(window.innerHeight / 100);

  const itemHeightPx = itemHeight * vhInPx;
  const heightPx = height * vhInPx;

  useEffect(() => {
    const handleResize = () => {
      setVhInPx(window.innerHeight / 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Row renderer component for react-window v2
  const RowComponent = ({
    index,
    items,
    style,
  }: RowComponentProps<{ items: React.ReactNode[] }>) => (
    <div
      style={{
        ...style,
        borderBottom: "1px solid #eee",
        padding: "0 8px",
        boxSizing: "border-box",
      }}
    >
      {items[index]}
    </div>
  );

  return (
    <div style={{ border: "1px solid #000" }}>
      <List
        rowComponent={RowComponent}
        rowCount={items.length}
        rowHeight={itemHeightPx}
        rowProps={{ items }}
        overscanCount={overscan}
        style={{ height: heightPx, width: "100%" }}
      />
    </div>
  );
};

export default VirtualList_Library;
