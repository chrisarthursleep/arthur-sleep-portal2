import clsx from 'clsx'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'amber' | 'green' | 'blue' | 'red'
}

export default function Progress({ 
  value, 
  max = 100, 
  className,
  showLabel = false,
  size = 'md',
  color = 'amber'
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  const colors = {
    amber: 'bg-amber-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500'
  }
  
  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-stone-600">Progress</span>
          <span className="text-sm text-stone-600">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-stone-200 rounded-full overflow-hidden', sizes[size])}>
        <div 
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            colors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}