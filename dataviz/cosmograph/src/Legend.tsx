import React from 'react';
import './Legend.css'; // Assuming styles are in a separate CSS file

interface LegendItem {
  label: string;
  color: string;
}

const legendItems: LegendItem[] = [
  { label: 'Job Search', color: '#ffcc66' },
  { label: 'Job Offer', color: '#7fff7f' },
  { label: 'Position', color: '#66b3ff' },
  { label: 'Service Offer', color: '#ff6699' },
  { label: 'Vermittlung', color: '#fdbf6f' },
];

const Legend: React.FC = () => {
  return (
    <div className="legend">
      {legendItems.map((item, index) => (
        <div className="legend-item" key={index}>
          <span className="color-box" style={{ backgroundColor: item.color }}></span>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Legend;
