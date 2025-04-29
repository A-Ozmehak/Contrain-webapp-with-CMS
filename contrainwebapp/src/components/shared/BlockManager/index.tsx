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
import SkillsComponent from '@/reusableComponents/skills/skills';
import ServicesLargeComponent from '@/reusableComponents/servicesLarge/servicesLarge';
import ServiceFormComponent from '@/reusableComponents/servicesForm/serviceForm';
import StackedCarousel from '@/reusableComponents/ui/stackedCarousel/stackedCarousel';
import ProjectDetailsComponent from '@/reusableComponents/projectDetails/projectDetails';
import ExpandingCardsComponent from '@/reusableComponents/ui/expanding-cards/expanding-cards';
import TitleSectionComponent from '@/reusableComponents/titleSection/titleSection';
import OffertComponent from '@/reusableComponents/offertComponent/offertComponent';
import ImageAndTextComponent from '@/reusableComponents/imageAndText/imageAndText';
import SeveralImagesComponent from '@/reusableComponents/serveralImages/severalImages';
import MaterialComponent from '@/reusableComponents/material/material';
import MaterialListComponent from '@/reusableComponents/materialList/materialList';
import TitleAndTextComponent from '@/reusableComponents/service-titleAndText/titleAndText';
import BatchesComponent from '@/reusableComponents/batches/batches';
import AccordionComponent from '@/reusableComponents/accordion/accordion';

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
    'blocks.skills': SkillsComponent,
    'blocks.services-large': ServicesLargeComponent,
    'blocks.services-form': ServiceFormComponent,
    'blocks.stacked-slider': StackedCarousel,
    'blocks.project-details': ProjectDetailsComponent,
    'blocks.expanding-cards': ExpandingCardsComponent,
    'blocks.title-section': TitleSectionComponent,
    'blocks.offert-component': OffertComponent,
    'blocks.image-and-text': ImageAndTextComponent,
    'blocks.several-images': SeveralImagesComponent,
    'blocks.material': MaterialComponent,
    'blocks.material-list': MaterialListComponent,
    'blocks.service-title-and-text': TitleAndTextComponent,
    'blocks.batches': BatchesComponent,
    'blocks.accordion': AccordionComponent
   
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
            <div className="w-full flex justify-center" key={`${block.__component}-${block.id}`}>
              <Component
                items={block.items || []}
              />
            </div>
          );
        }

          if (block.__component === "blocks.offert-component") {
            return (
              <OffertComponent
                key={block.id}
                contactInfo={block.ContactInfo}
                offertForm={block.OffertForm}
                PageTitle={block.PageTitle || ""}
                PageSubTitle={block.PageSubTitle || ""}
              />
            );
          }

          if (block.__component === 'blocks.contact-form') {
            return (
              <ContactFormComponent
                key={`${block.__component}-${block.id}`}
                {...block}
                BackgroundImage={block.BackgroundImage || ""}
              />
            );
          }

          if (block.__component === 'blocks.image-and-text') {
            return (
              <ImageAndTextComponent
                key={`${block.__component}-${block.id}`}
                Image={block.Image}
                Alt={block.Alt}
                TextContent={block.TextContent}
              />
            );
          }

          if (block.__component === "blocks.several-images") {
            return (
              <SeveralImagesComponent
                key={block.id}
                Image={block.Image || []}
              />
            );
          }

          if (block.__component === "blocks.service-title-and-text") {
            return (
              <TitleAndTextComponent
                key={block.id}
                Services={block.Service}
                Image={block.Image}
              />
            );
          }

          if (block.__component === "blocks.accordion") {
            return (
              <AccordionComponent
                key={block.id}
                AccordionItem={block.AccordionItem}
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
