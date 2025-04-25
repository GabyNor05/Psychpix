import React, { useRef, useState } from 'react';
import { XLogo, LinkedinLogo, InstagramLogo, MessengerLogo } from "@phosphor-icons/react";

const icons = [XLogo, LinkedinLogo, InstagramLogo, MessengerLogo];

const IconDock = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [containerRect, setContainerRect] = useState(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerRect(rect);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: null, y: null });
    setContainerRect(null);
  };

  return (
    <div
      className="icon-dock-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {icons.map((Icon, index) => (
        <DockIcon key={index} Icon={Icon} index={index} mousePos={mousePos} containerRect={containerRect} />
      ))}
    </div>
  );
};

const DockIcon = ({ Icon, index, mousePos, containerRect }) => {
  const iconRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);

  const getTransform = () => {
    if (
      mousePos.x === null ||
      mousePos.y === null ||
      !iconRef.current ||
      !containerRect
    ) {
      return 'scale(1) translate(0px, 0px)';
    }

    const iconRect = iconRef.current.getBoundingClientRect();
    const iconCenterX =
      iconRect.left - containerRect.left + iconRect.width / 2;
    const iconCenterY =
      iconRect.top - containerRect.top + iconRect.height / 2;

    const distanceX = mousePos.x - iconCenterX;
    const distanceY = mousePos.y - iconCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const maxDistance = 500;
    const snapThreshold = 60;

    const scale = Math.max(1, 1.8 - distance / maxDistance);

    let translateX = 0;
    let translateY = -15 * (scale - 1); // Default "lift"

    // Snap to cursor if close enough
    if (distance < snapThreshold) {
      translateX = distanceX;
      translateY = distanceY;
    }

    return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };
  
  

  return (
    <div className="dock-icon-wrapper">
      <div ref={iconRef} className="dock-icon" style={{ transform: getTransform(), }}>
        <Icon size={48} />
      </div>
    </div>      
  );
};

export default IconDock;
