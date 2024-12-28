export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

const RichText = ({ body }: { body: string }) => (
    <div>
      <p dangerouslySetInnerHTML={{ __html: body }} /> {/* Renders HTML content */}
    </div>
);
  
  export default RichText;