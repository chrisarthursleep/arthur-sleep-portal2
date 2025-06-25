import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'bordered'
}

export default function Card({ 
  children, 
  variant = 'bordered',
  className,
  ...props 
}: CardProps) {
  const baseStyles = 'bg-white rounded-3xl'
  
  const variants = {
    default: '',
    elevated: 'shadow-lg',
    bordered: 'border border-stone-200'
  }
  
  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}