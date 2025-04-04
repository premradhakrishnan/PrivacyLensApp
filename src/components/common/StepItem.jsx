// components/common/StepItem.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Tooltip,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  FormatQuoteRounded, 
  ExpandMore, 
  ExpandLess 
} from '@mui/icons-material';
import { getScoreLevelInfo } from '/src/utils/resultsUtils';

/**
 * StepItem component for displaying rubric items with score, justification, and excerpt
 * 
 * @param {Object} props Component props
 * @param {number} props.enumeration Enumeration number of the rubric item
 * @param {string} props.question Question or criteria text
 * @param {number} props.score Score (0-2) for this item
 * @param {string} props.justification Justification for the score
 * @param {string} props.excerpt Excerpt from the privacy policy supporting the score
 * @param {string} props.section Section name this item belongs to
 * @param {boolean} props.expanded Whether details are expanded
 * @param {Function} props.onToggleExpand Function to toggle expanded state
 * @param {Object} props.sx Additional styling props
 */
const StepItem = ({
  enumeration,
  question,
  score,
  justification,
  excerpt,
  section,
  expanded = false,
  onToggleExpand,
  sx = {}
}) => {
  // Get score level information (label and color)
  const { label, color } = getScoreLevelInfo(score);
  
  // Check if we have an excerpt to display
  const hasExcerpt = excerpt && excerpt.trim().length > 0;
  
  return (
    <Paper
      variant="outlined"
      sx={{ 
        p: 2, 
        mb: 2, 
        borderColor: 'rgba(0,0,0,0.12)',
        borderLeft: `4px solid ${color}`,
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Enumeration Circle */}
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              mr: 1.5,
              flexShrink: 0
            }}
          >
            {enumeration}
          </Box>
          
          {/* Question Text */}
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {question}
            </Typography>
            {section && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                Section: {section}
              </Typography>
            )}
          </Box>
        </Box>
        
        {/* Score Chip */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip 
            label={label} 
            size="small"
            sx={{ 
              bgcolor: color,
              color: 'white',
              fontWeight: 'bold',
              mr: 1
            }}
          />
          
          {/* Expand Button - only if we have justification or excerpt */}
          {(justification || hasExcerpt) && (
            <IconButton 
              size="small" 
              onClick={onToggleExpand}
              sx={{ ml: 0.5 }}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>
      </Box>
      
      {/* Expandable Justification & Excerpt */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2, pl: 4 }}>
          {justification && (
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 1,
                color: score < 2 ? color : 'text.secondary',
                fontStyle: score < 2 ? 'italic' : 'normal',
              }}
            >
              <strong>Justification:</strong> {justification}
            </Typography>
          )}
          
          {hasExcerpt && (
            <Box 
              sx={{ 
                mt: 1, 
                p: 1.5, 
                bgcolor: 'rgba(0,0,0,0.03)', 
                borderLeft: `3px solid ${color}`,
                borderRadius: '0 4px 4px 0',
              }}
            >
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <FormatQuoteRounded sx={{ mr: 1, color: 'text.disabled' }} />
                <Box component="span" sx={{ fontStyle: 'italic' }}>
                  {excerpt}
                </Box>
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default StepItem;