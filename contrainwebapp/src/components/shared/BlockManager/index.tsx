import React from 'react';
import Hero from '../../../reusableComponents/hero/hero';
import TypewriterTexts from '../../../components/typewriterTexts/typewriterTexts';

interface BlockProps {
  __component: string;
  id: number;
  [key: string]: any;
}

interface BlockManagerProps {
  blocks: BlockProps[];
}

const blockRegistry: { [key: string]: React.ElementType } = {
  'blocks.hero': Hero, // Register the Hero component
  'blocks.typewriter-texts': TypewriterTexts,
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
