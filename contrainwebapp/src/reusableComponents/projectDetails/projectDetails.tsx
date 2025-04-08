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
                {ClientInput &&
                    <p>{ClientLabel}</p>
                }
                {ProjecttypeInput &&
                    <p>{ProjecttypeLabel}</p>
                }
                {ProjectlengthInput &&
                    <p>{ProjectlengthLabel}</p>
                }
                {ProjectManagerInput &&
                    <p>{ProjectManagerLabel}</p>
                }
            </div>
            
            <div className={styles.projectDetail}>
                <p>{ProjectNameInput}</p>
                {ClientInput &&
                    <p>{ClientInput}</p>  
                }
                {ProjecttypeInput &&
                    <p>{ProjecttypeInput}</p>
                }
                {ProjectlengthInput &&
                    <p>{ProjectlengthInput}</p>
                }
                {ProjectManagerInput &&
                    <p>{ProjectManagerInput}</p>
                }
            </div>
        </div>
        
    </div>
  );
};

export default ProjectDetailsComponent;
