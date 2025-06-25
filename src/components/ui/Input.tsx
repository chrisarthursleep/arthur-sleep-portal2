import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-stone-700 mb-2">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border transition-all',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-stone-200 focus:ring-amber-500',
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {hint && !error && (
          <p className="mt-1 text-sm text-stone-500">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input