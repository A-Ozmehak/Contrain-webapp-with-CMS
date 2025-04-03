import RichTextComponent from '../richText/richText';
import styles from './projectDetails.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';
import type { RichTextNode } from '@/reusableComponents/richText/richText';

interface ProjectDetailsProps {
    ProjectText: RichTextNode[];
    ProjectTextTitle: string;
    ProjectNameLabel: string;
    ProjectNameInput: string;
    ClientLabel: string;
    ClientInput: string;
    ProjecttypeLabel: string;
    ProjecttypeInput: string;
    ProjectlengthLabel: string;
    ProjectlengthInput: string;
    ProjectManagerLabel: string;
    ProjectManagerInput: string;
    BackgroundColor?: string;
  }

const ProjectDetailsComponent: React.FC<ProjectDetailsProps> = ({ 
    ProjectText,
    ProjectTextTitle,
    ProjectNameLabel, 
    ProjectNameInput, 
    ClientLabel, 
    ClientInput,
    ProjecttypeLabel,
    ProjecttypeInput,
    ProjectlengthLabel,
    ProjectlengthInput,
    ProjectManagerLabel,
    ProjectManagerInput,
    BackgroundColor
}) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div className={`${styles.projectDetailsContainer} ${backgroundClass}`.trim()}>
        {ProjectText && (
            <div className={styles.projectRichText}>
                <h5>{ProjectTextTitle}</h5>
                <RichTextComponent RichText={ProjectText} BackgroundColor={BackgroundColor} />
            </div>
        )}
        <div className={styles.shortProjectDetailsContainer}>
            <div className={styles.projectTitles}>
                <p>{ProjectNameLabel}</p>
                <p>{ClientLabel}</p>
                <p>{ProjecttypeLabel}</p>
                <p>{ProjectlengthLabel}</p>
                <p>{ProjectManagerLabel}</p>
            </div>
            
            <div className={styles.projectDetail}>
                <p>{ProjectNameInput}</p>
                <p>{ClientInput}</p>
                <p>{ProjecttypeInput}</p>
                <p>{ProjectlengthInput}</p>
                <p>{ProjectManagerInput}</p>
            </div>
        </div>
        
    </div>
  );
};

export default ProjectDetailsComponent;
