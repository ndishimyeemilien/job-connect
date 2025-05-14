import  { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 150,
  deletingSpeed = 50,
  delayBetween = 2000
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isWaiting) return;

      if (isDeleting) {
        // Deleting text
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        // Typing text
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        
        // If we've typed the full word, wait before deleting
        if (displayText.length === currentWord.length) {
          setIsWaiting(true);
          setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, delayBetween);
        }
      }
    };

    const typingInterval = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(typingInterval);
  }, [words, currentWordIndex, displayText, isDeleting, isWaiting, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
}
 