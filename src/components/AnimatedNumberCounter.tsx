import  { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedNumberCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedNumberCounter({
  value,
  duration = 1.5,
  suffix = ''
}: AnimatedNumberCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const nextValue = Math.floor(progress * value);
      
      setDisplayValue(nextValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value, duration, hasAnimated]);

  // Format large numbers with commas
  const formattedValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div ref={ref} className="inline-block">
      {formattedValue}{suffix}
    </div>
  );
}
 