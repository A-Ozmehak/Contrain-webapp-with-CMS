import React from 'react';
import ContactFormComponent from '@/reusableComponents/contactForm/contactForm';
import ContactInfoComponent from '@/reusableComponents/contactInfo/contactInfo';
import SocialMediaComponent from '@/reusableComponents/socialMedia/socialMedia';
import QuoteComponent from '@/reusableComponents/quote/quote';
import HeroComponent from '@/reusableComponents/hero/hero';
import SliderComponent from '@/reusableComponents/slider/slider';
import TextWithBackgroundImageComponent from '@/reusableComponents/textWithBackgroundImage/textWithBackgroundImage';
import OurServicesComponent from '@/reusableComponents/ourServices/ourServices';
import RichTextComponent from '@/reusableComponents/richText/richText';
import AboutComponent from '@/reusableComponents/about/about';
import PrintingFormComponent from '@/reusableComponents/printingForm/printingForm';
import SkillsComponent from '@/reusableComponents/skills/skills';
import ServicesLargeComponent from '@/reusableComponents/servicesLarge/servicesLarge';
import ServiceFormComponent from '@/reusableComponents/servicesForm/serviceForm';

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
    'blocks.slider': SliderComponent,
    'blocks.text-with-background-image': TextWithBackgroundImageComponent,
    'blocks.our-services': OurServicesComponent,
    'blocks.rich-text': RichTextComponent,
    'blocks.about': AboutComponent,
    'blocks.printing-form': PrintingFormComponent,
    'blocks.skills': SkillsComponent,
    'blocks.services-large': ServicesLargeComponent,
    'blocks.services-form': ServiceFormComponent,
   
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

            // 🔹 Fix: Convert "Service" → "Services" before passing to OurServicesComponent
            const updatedBlockProps =
            block.__component === 'blocks.our-services'
              ? { ...block, Services: block.Service || [] } // ✅ Rename Service → Services
              : block;

          return <Block key={`${block.__component}-${block.id}`} {...updatedBlockProps} />;

      })}
    </div>
  );
};

export default BlockManager;
