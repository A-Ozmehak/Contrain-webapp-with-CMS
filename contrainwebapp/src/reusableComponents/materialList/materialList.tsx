'use client';
import React from 'react';
import styles from './materialList.module.css'; // Also create basic styles

interface MaterialListItem {
  id: number;
  Name: string;
  Flexibility: string;
  Endurance: string;
  Details: string;
  Usage: string;
  Sustainability: string;
}

interface MaterialListProps {
  MaterialNameLabel?: string;
  MaterialSustainabilityLabel?: string;
  MaterialFlexibilityLabel?: string;
  MaterialEnduranceLabel?: string;
  MaterialDetailsLabel?: string;
  MaterialUsageLabel?: string;
  MaterialList?: MaterialListItem[];
}

const MaterialListComponent: React.FC<MaterialListProps> = ({
  MaterialNameLabel,
  MaterialSustainabilityLabel,
  MaterialFlexibilityLabel,
  MaterialEnduranceLabel,
  MaterialDetailsLabel,
  MaterialUsageLabel,
  MaterialList,
}) => {
  return (
    <section className={styles.materialListContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{MaterialNameLabel || 'Material'}</th>
            <th>{MaterialSustainabilityLabel || 'Sustainability'}</th>
            <th>{MaterialFlexibilityLabel || 'Flexibility'}</th>
            <th>{MaterialEnduranceLabel || 'Endurance'}</th>
            <th>{MaterialDetailsLabel || 'Details'}</th>
            <th>{MaterialUsageLabel || 'Usage'}</th>
          </tr>
        </thead>
        <tbody>
          {MaterialList?.map((material) => (
            <tr key={material.id}>
              <td>{material.Name}</td>
              <td>{material.Sustainability}</td>
              <td>{material.Flexibility}</td>
              <td>{material.Endurance}</td>
              <td>{material.Details}</td>
              <td>{material.Usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MaterialListComponent
