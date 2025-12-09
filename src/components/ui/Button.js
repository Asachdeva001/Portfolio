'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Button component with primary and secondary variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant ('primary' or 'secondary')
 * @param {string} props.href - Link href (optional, makes button a link)
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - Button type (button, submit, reset)
 */
export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'text-white',
    secondary: 'border border-[#8DB1A4] text-[#8DB1A4] bg-transparent hover:bg-[#8DB1A4] hover:text-[#0A0F0D]'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`;

  const gradientStyle = variant === 'primary' ? {
    background: 'linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)'
  } : {};

  const hoverGradientStyle = variant === 'primary' ? {
    background: 'linear-gradient(135deg, #8DB1A4, #2D4F4A, #0A0F0D)'
  } : {};

  const handleMouseOver = (e) => {
    if (variant === 'primary' && !disabled) {
      e.currentTarget.style.background = hoverGradientStyle.background;
    }
  };

  const handleMouseOut = (e) => {
    if (variant === 'primary' && !disabled) {
      e.currentTarget.style.background = gradientStyle.background;
    }
  };

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        style={gradientStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button with motion
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      style={gradientStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
