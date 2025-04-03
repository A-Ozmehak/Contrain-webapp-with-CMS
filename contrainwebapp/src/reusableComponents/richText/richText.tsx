'use client';

import React, { JSX } from 'react';
import styles from './richText.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

export interface RichTextNode {
  type: string;
  text?: string;
  url?: string;
  level?: number;
  format?: string;
  bold?: boolean;
  children?: RichTextNode[];
}

interface RichTextProps {
  RichText: RichTextNode[];
  BackgroundColor?: string;
}

const RichTextComponent: React.FC<RichTextProps> = ({ RichText, BackgroundColor }) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  const renderNode = (node: RichTextNode, index: number) => {
    if (node.type === 'heading') {
      const HeadingTag = (`h${node.level || 3}` as keyof JSX.IntrinsicElements); 
      return <HeadingTag key={index} className={styles.heading}>{node.children?.map((child, i) => renderNode(child, i))}</HeadingTag>;
    }
    
    if (node.type === 'paragraph') {
      return <p key={index} className={styles.paragraph}>{node.children?.map((child, i) => renderNode(child, i))}</p>;
    }

    if (node.type === 'list') {
      const ListTag = node.format === 'unordered' ? 'ul' : 'ol';
      return <ListTag key={index} className={styles.list}>{node.children?.map((child, i) => renderNode(child, i))}</ListTag>;
    }

    if (node.type === 'list-item') {
      return <li key={index} className={styles.listItem}>{node.children?.map((child, i) => renderNode(child, i))}</li>;
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} className={styles.link} target="_blank" rel="noopener noreferrer">
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    if (node.type === 'text') {
      return (
        <span key={index} className={node.bold ? styles.bold : ''}>
          {node.text}
        </span>
      );
    }

    return null;
  };

  return (
    <div className={`${styles.richTextContainer} ${backgroundClass}`.trim()}>
      <div className={styles.richTextContent}>{RichText.map((node, index) => renderNode(node, index))}</div>
    </div>
  )
};

export default RichTextComponent;
