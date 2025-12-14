import React from 'react';
import styles from './GlassButton.module.css';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // New prop
}

const GlassButton = ({ children, className, isActive, style, ...props }: GlassButtonProps) => {
  return (
    <div 
      className={styles.container} 
      style={style} // Allow passing inline styles (like fontSize) to the container
    >
      <button 
        className={`${styles.button} ${isActive ? styles.active : ''} ${className || ''}`} 
        {...props}
      >
        <span className={styles.text}>{children}</span>
      </button>
      <div className={styles.shadow}></div>
    </div>
  );
};

export default GlassButton;