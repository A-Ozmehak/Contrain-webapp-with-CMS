import ImageBlock from '../reusableComponents/imageBlock';
import IconAndTextBlock from '../reusableComponents/iconAndTextBlock';
import TextAndSubtextBlock from '../reusableComponents/textAndSubtextBlock';
import RichText from '@/reusableComponents/richText';
import { RichTextBlock } from '@/reusableComponents/richText';
import { ImageBlockInterface } from '../reusableComponents/imageBlock';
import { IconAndTextBlockInterface } from '../reusableComponents/iconAndTextBlock';


export type Block = RichTextBlock | ImageBlockInterface | IconAndTextBlockInterface;

const DynamicZone = ({ blocks }: { blocks: any[] }) => {
    return (
      <>
        {blocks.map((block) => {
          switch (block.__component) {
            case 'shared.rich-text':
              return <RichText key={block.id} body={block.body} />;
            case 'shared.media':
              return <ImageBlock key={block.id} file={block.file} />;
            case 'shared.icon-and-text':
              return (
                <IconAndTextBlock
                  key={block.id}
                  icon={block.icon}
                  text={block.text}
                  subtext={block.subtext}
                />
              );
            default:
              return null; // Handle unknown components gracefully
          }
        })}
      </>
    );
  };
  
  export default DynamicZone;
  
