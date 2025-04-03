'use client';

import styles from './skills.module.css';
import { useBackgroundClass } from '@/hooks/useBackgroundColor';

interface SkillsProps {
  Title: string;
  SubText: string;
  Skills: Array<{ id: number; Icon: string; SkillTitle: string; SkillText: string }>;
  SkillImage: {
    url: string;
    } | null;
  BackgroundColor?: string;
}

const SkillsComponent: React.FC<SkillsProps> = ({ Title, SubText, Skills = [], SkillImage, BackgroundColor }) => {
  const backgroundClass = useBackgroundClass(BackgroundColor);

  return (
    <div id='skills' className={`${styles.skillsContainer} ${backgroundClass}`.trim()}>
      <h3>{Title}</h3>
      <p>{SubText}</p>

      <div className={styles.skillsGrid}>
        {/* Left 3 */}
        <div className={styles.skillsColumn}>
          {Skills.slice(0, 3).map((skill) => (
            <div key={skill.id} className={`${styles.skillCard} ${styles.skillCardLeft}`}>
              <div className={styles.skillText}>
                <h4>{skill.SkillTitle}</h4>
                <p>{skill.SkillText}</p>
              </div>
              <i className={skill.Icon} />
            </div>
          ))}
        </div>

        {/* Center image */}
        {SkillImage?.url && (
          <div className={styles.imageWrapper}>
            <img src={SkillImage.url} alt="Skill" className={styles.skillImage} />
          </div>
        )}

        {/* Right 3 */}
        <div className={styles.skillsColumn}>
          {Skills.slice(3).map((skill) => (
            <div key={skill.id} className={`${styles.skillCard} ${styles.skillCardReversed}`}>
              <i className={skill.Icon} />
              <div className={styles.skillText}>
                <h4>{skill.SkillTitle}</h4>
                <p>{skill.SkillText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsComponent;