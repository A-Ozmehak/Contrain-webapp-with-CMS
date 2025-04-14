import React from 'react';
import { getStrapiMedia } from '@/utils';
import { normalizeImageFromBlock } from '@/utils/image';
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
import StackedCarousel from '@/reusableComponents/ui/stackedCarousel/stackedCarousel';
import ProjectDetailsComponent from '@/reusableComponents/projectDetails/projectDetails';
import ExpandingCardsComponent from '@/reusableComponents/ui/expanding-cards/expanding-cards';

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
    'blocks.stacked-slider': StackedCarousel,
    'blocks.project-details': ProjectDetailsComponent,
    'blocks.expanding-cards': ExpandingCardsComponent,
   
  // Add more blocks here
};

const BlockManager: React.FC<BlockManagerProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => {
        const Component = blockRegistry[block.__component];

        if (!Component) {
          console.warn(`Unknown block type: ${block.__component}`);
          return null;
        }

        if (block.__component === 'blocks.slider') {
          const slides = (block.Images || []).map((item: any) => ({
            image: normalizeImageFromBlock(item.Image),
            HoverTitle: item.HoverTitle,
            HoverDescription: item.HoverDescription,
            Url: item.Url,
            Alt: item.Alt || 'Slider image',
          }));
        
          return (
            <Component
              key={`${block.__component}-${block.id}`}
              Images={slides}
              SectionTitle={block.SectionTitle || ''}
              BackgroundColor={block.BackgroundColor || ''}
            />
          );
        }
        
        // 🔹 Fix "Service" → "Services"
        if (block.__component === 'blocks.our-services') {
          return (
            <Component
              key={`${block.__component}-${block.id}`}
              {...block}
              Services={block.Service || []}
            />
          );
        }

        if (block.__component === 'blocks.stacked-slider') {
          const slides = (block.Images || []).map((item: any) => ({
            image:
              getStrapiMedia(
                item.Image?.formats?.medium?.url ||
                item.Image?.url ||
                '/microcontroller.webp'
              ),
            HoverTitle: item.HoverTitle,
            HoverDescription: item.HoverDescription,
            Url: item.Url,
          }));
        
          return (
            <Component
              key={`${block.__component}-${block.id}`}
              slides={slides}
              SectionTitle={block.SectionTitle || ""}
              BackgroundColor={block.BackgroundColor || ""}
            />
          );
        }

        if (block.__component === 'blocks.printing-form') {
          return (
            <Component
              key={`${block.__component}-${block.id}`}
              {...block}
              MaterialOptions={block.MaterialOptions || []}
              ColorOptions={block.ColorOptions || []}
              DeliveryTimeOptions={block.DeliveryTimeOptions || []}
              ExtraServicesOptions={block.ExtraServicesOptions || []}
            />
          );
        }

        if (block.__component === 'blocks.expanding-cards') {
          return (
            <Component
              key={`${block.__component}-${block.id}`}
              items={block.items || []}
            />
          );
        }
        
        // 🔹 Default render for all other blocks
        return (
          <Component key={`${block.__component}-${block.id}`} {...block} />
        );
      })}
    </div>
  );
};



export default BlockManager;
