// components/common/CustomAccordion.jsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brandColors } from '../../utils/constants';

const CustomAccordion = ({ 
  title, 
  children, 
  expanded, 
  onChange, 
  panelId,
  color = 'purple', // 'purple' or 'green'
  iconPosition = 'end' // 'start' or 'end'
}) => {
  const colorScheme = color === 'green' ? brandColors.green : brandColors.purple;
  
  return (
    <Accordion
      expanded={expanded === panelId}
      onChange={onChange(panelId)}
      sx={{
        mb: 2,
        boxShadow: 'none',
        '&:before': { display: 'none' },
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: `${colorScheme}15`,
          '&:hover': { backgroundColor: `${colorScheme}25` },
          flexDirection: iconPosition === 'start' ? 'row-reverse' : 'row',
          '& .MuiAccordionSummary-expandIconWrapper': {
            marginRight: iconPosition === 'start' ? 1 : 0,
            marginLeft: iconPosition === 'start' ? 0 : 1
          }
        }}
      >
        <Typography fontWeight="bold" sx={{ color: colorScheme, textAlign: 'left' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ textAlign: 'left' }}>
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;