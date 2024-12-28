import { useState, useEffect } from 'react';

const TypewriterTitle = ({ texts }: { texts: string[] }) => {
  const [textIndex, setTextIndex] = useState(0); // Current text index
  const [displayedText, setDisplayedText] = useState(''); // Text being displayed
  const [isDeleting, setIsDeleting] = useState(false); // Whether text is being deleted
  const typingSpeed = isDeleting ? 100 : 200; // Speed of typing/deleting

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentText) {
      // Pause after completing the full text
      timeout = setTimeout(() => setIsDeleting(true), 1000); // 1-second pause
    } else if (isDeleting && displayedText === '') {
      // Move to the next text after deleting
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      // Add or remove characters
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentText.slice(0, displayedText.length - 1) // Remove one character
          : currentText.slice(0, displayedText.length + 1); // Add one character
        setDisplayedText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [displayedText, isDeleting, textIndex, texts]);

  return (
    <h1>
      {displayedText}
      <span style={{ borderRight: '2px solid white', marginLeft: '2px' }}></span>
    </h1>
  );
};

export default TypewriterTitle;
