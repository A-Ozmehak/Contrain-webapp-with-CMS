export interface ImageBlockInterface {
  __component: 'shared.media';
  id: number;
  file: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  }[];
}

const ImageBlock = ({ file }: { file: any[] }) => (
  <div>
    {file.map((media) => (
      <img
        key={media.id}
        src={`http://localhost:1337${media.url}`}
        alt={media.alternativeText || 'Media'}
        width={media.width}
        height={media.height}
      />
    ))}
  </div>
);

export default ImageBlock;