export interface IconAndTextBlockInterface {
    __component: 'shared.icon-and-text';
    id: number;
    icon: string;
    text: string;
    subtext?: string;
  }

const IconAndTextBlock = ({ icon, text, subtext }: { icon: string, text: string, subtext?: string }) => (
    <div>
        <i className={icon}></i>
        <h3>{text}</h3>
       { subtext && <p>{subtext}</p> }
    </div>
);

export default IconAndTextBlock;