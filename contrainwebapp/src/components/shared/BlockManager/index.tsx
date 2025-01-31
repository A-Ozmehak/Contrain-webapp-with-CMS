import React from 'react';
import ContactFormComponent from '@/reusableComponents/contactForm/contactForm';
import ContactInfoComponent from '@/reusableComponents/contactInfo/contactInfo';
import SocialMediaComponent from '@/reusableComponents/socialMedia/socialMedia';
import QuoteComponent from '@/reusableComponents/quote/quote';
import HeroComponent from '@/reusableComponents/hero/hero';

interface BlockProps {
  __component: string;
  id: number;
  [key: string]: any;
}

interface BlockManagerProps {
  blocks: BlockProps[];
}

const blockRegistry: { [key: string]: React.ElementType } = {
    'blocks.hero': HeroComponent,
    'blocks.contact-form': ContactFormComponent,
    'blocks.contact-info': ContactInfoComponent,
    'blocks.social-media': SocialMediaComponent,
    'blocks.quote': QuoteComponent,
   
  // Add more blocks here
};

const BlockManager: React.FC<BlockManagerProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => {
        const Block = blockRegistry[block.__component];

        if (!Block) {
          console.warn(`Unknown block type: ${block.__component}`);
          return null;
        }

        return <Block key={block.id} {...block} />;
      })}
    </div>
  );
};

export default BlockManager;
