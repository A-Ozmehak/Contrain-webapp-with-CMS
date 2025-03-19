'use client';

import useIsMobile from '@/hooks/useIsMobile';
import styles from './skills.module.css';

interface SkillsProps {
  Title: string;
  SubText: string;
  Skills: Array<{ id: number; Icon: string; SkillTitle: string; SkillText: string }>;
  SkillImage: string;
}

const SkillsComponent: React.FC<SkillsProps> = ({ Title, SubText, Skills = [], SkillImage }) => {
  const isMobile = useIsMobile(); // Default breakpoint is 768px

  return (
    <div id='skills' className={styles.skillsContainer}>
      <h3>{Title}</h3>
      <p>{SubText}</p>
      {Skills.map((skill) => (
        <div key={skill.id} className={styles.skillCard}>
          <div className={styles.skillText}>
            <h4>{skill.SkillTitle}</h4>
            <p>{skill.SkillText}</p>
          </div>
          <i className={skill.Icon} />
        </div>
      ))}
      {/* <img src={SkillImage} alt="Skill" /> */}
      <img src='/bestcontrain-3.webp' alt="Skill" />
      
    </div>
  );
};

export default SkillsComponent;