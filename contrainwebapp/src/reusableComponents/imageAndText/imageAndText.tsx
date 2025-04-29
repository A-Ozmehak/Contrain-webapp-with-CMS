import React from 'react';
import RichTextComponent from '@/reusableComponents/richText/richText'; 
import styles from './imageAndText.module.css';

interface ImageAndTextProps {
  Image?: string;
  Alt?: string;
  TextContent?: any;
}

const ImageAndTextComponent: React.FC<ImageAndTextProps> = ({ Image, Alt, TextContent }) => {
  return (
    <div className={styles.imageAndTextContainer}>
      {Image && (
        <div className={styles.imageAndTextImageWrapper}>
          <img
            src={Image}
            alt={Alt || 'Image'}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}

      {TextContent && (
        <div className={styles.imageAndTextContent}>
          <RichTextComponent RichText={TextContent} />
        </div>
      )}
    </div>
  );
};

export default ImageAndTextComponent;
