// components/sections/OurSolutionSection.jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Grid,
  Paper
} from '@mui/material';
import { brandColors } from '../../utils/constants';

const OurSolutionSection = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: brandColors.purple, fontWeight: 'bold', my: 4 }}>
        Our Solution
      </Typography>
      
      <Card elevation={3} sx={{ mb: 5 }}>
        <CardHeader 
          title="Building on the Shoulders of Past Researchers" 
          titleTypographyProps={{ variant: 'h5', color: brandColors.purple, fontWeight: 'bold' }}
          sx={{ bgcolor: `${brandColors.lightPurple}15` }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            The paper <Link href="https://people.eecs.berkeley.edu/~tygar/papers/Buck.pdf" target="_blank" rel="noopener noreferrer">
              Systematic Analysis and Evaluation of Web Privacy Policies and Implementations
            </Link>, authored by <strong>Brad Miller, Kaitlyn Buck, and J.D. Tygar</strong> of UC Berkeley and Microsoft 
            in 2012, presents a framework for evaluating website privacy policies. It critiques existing privacy 
            disclosures, highlighting their complexity and inaccessibility to average users. The authors propose 
            a structured rubric that assesses transparency, data handling, and user control, combining legal, 
            technical, and usability perspectives. The paper also discusses how websites often fail to comply 
            with their stated privacy policies and the challenges of enforcing meaningful privacy protections.
          </Typography>
        </CardContent>
      </Card>
      
      <Card elevation={3} sx={{ mb: 5 }}>
        <CardHeader 
          title="What has Changed Since 2012?" 
          titleTypographyProps={{ variant: 'h5', color: brandColors.purple, fontWeight: 'bold' }}
          sx={{ bgcolor: `${brandColors.lightPurple}15` }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            Since the paper's publication, privacy regulations and industry practices have evolved significantly. 
            The EU's GDPR (2018) and the California CCPA (2020) introduced stricter requirements for user consent, 
            data access, and transparency. Academic studies have highlighted that privacy policies remain difficult 
            to read, leading to the adoption of simplified privacy notices, layered disclosures, and AI-driven 
            privacy summaries.
          </Typography>
          <Typography variant="body1" paragraph>
            Additionally, technical research has exposed loopholes in enforcement, with companies continuing to 
            track users despite opt-out mechanisms. Studies have also evaluated the usability of privacy controls, 
            emphasizing that users rarely adjust default settings due to interface complexity. The modernized 
            rubric reflects these insights by stressing explicit opt-in/opt-out options, user control over 
            tracking, and improved transparency in data collection.
          </Typography>
        </CardContent>
      </Card>
      
      <Card elevation={3} sx={{ mb: 5 }}>
        <CardHeader 
          title="Modern Times Require Modern Solutions" 
          titleTypographyProps={{ variant: 'h5', color: brandColors.purple, fontWeight: 'bold' }}
          sx={{ bgcolor: `${brandColors.lightPurple}15` }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            The original Berkeley rubric focused on policy accessibility, comprehensibility, and enforcement, 
            evaluating whether websites aligned with their stated privacy commitments. It analyzed data collection 
            transparency, security measures, and third-party sharing, but lacked explicit attention to modern 
            tracking methods (e.g., fingerprinting, persistent identifiers beyond cookies).
          </Typography>
          <Typography variant="body1" paragraph>
            The PrivacyLens rubric expands upon this foundation by incorporating newer privacy concerns, such as 
            device fingerprinting and cross-platform tracking. It also emphasizes user rights, including data 
            modification, deletion, and retention limits—which were not as prominent in the original study. 
            Additionally, the PrivacyLens rubric accounts for opt-out mechanisms and granular consent options, 
            aligning it with contemporary privacy laws.
          </Typography>
          <Typography variant="body1" paragraph>
            The intent and ethos behind PrivacyLens is to provide users with as much information as they want 
            and need in order to browse health-care websites safely. While the current iteration of the rubric 
            accounts for many different types of metrics and focus areas, there is always room for improvement. 
            With that said, PrivacyLens has the entire rubric along with the LLM's Master Prompt posted in order 
            to provide maximum visibility and awareness to PrivacyLens's users. Our team welcomes feedback and 
            recommendations as it can only help everyone.
          </Typography>
        </CardContent>
      </Card>
      
      <Card elevation={3}>
        <CardHeader 
          title="PrivacyLens Scoring" 
          titleTypographyProps={{ variant: 'h5', color: brandColors.purple, fontWeight: 'bold' }}
          sx={{ bgcolor: `${brandColors.lightPurple}15` }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            The PrivacyLens rubric consists of 29 metrics across 5 major categories to properly score 
            websites' privacy policies. A Large Language Model, ChatGPT, is being utilized to automatically 
            assess each website's privacy policy according to the rubric, providing a repeatable and quick 
            method of scoring. While an LLM is a powerful tool in these assessments, it is important to 
            understand the standard in which these policies are being graded.
          </Typography>
          <Typography variant="body1" paragraph>
            Currently, the rubric consists of 29 metrics that are binary ('Yes' or 'No') with an associated 
            score of either 0 or 1. However, this implementation is limited by its lack of flexibility. For 
            instance, some situations may require 'grey' scoring such as partial matches. Future iterations 
            of this rubric will allow for weighting and floating scores between 0 and 1 to account for such nuances.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Websites whose privacy policies lack data for the metrics automatically score a zero in those areas. 
            However, the same zero score is applied to policies that provide the required data but show poor 
            results. While the rubric aims to encourage comprehensive privacy documentation, this approach can 
            result in harsher scores for websites that don't explicitly state information. It's important to 
            consider that even a poorly worded policy may be better than no mention of a topic at all.
          </Typography>
          
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            {[
              {
                title: "1. Privacy Document Accessibility",
                content: "This section evaluates how easily users can find and understand the website's privacy policy. A well-structured and readily available privacy policy demonstrates transparency and a commitment to user privacy. Each metric in this section is binary (0 or 1). A website earns a 1 if it provides a dedicated, easily accessible privacy policy, includes a last-updated date, and offers notifications about changes."
              },
              {
                title: "2. Privacy Document Scope",
                content: "This section measures how well the privacy policy communicates key details about data collection, processing, and sharing. A transparent privacy policy should outline what data is collected, how it is gathered, and for what purpose. Each metric is scored as 1 if the policy provides clear and comprehensive information, and 0 if it is missing or ambiguous."
              },
              {
                title: "3. Browser Storage",
                content: "This section assesses whether the website uses browser storage techniques such as cookies, HTML5 Local Storage, or other tracking technologies. Websites that avoid persistent tracking methods (e.g., third-party cookies, HTML5 local storage) and provide clear disclosures earn 1 point per metric. A high score in this section indicates that the site respects user control over browser storage and tracking."
              },
              {
                title: "4. Third-Party Tracking",
                content: "This section evaluates how much user data is shared with third parties and whether tracking mechanisms persist beyond the website itself. Websites that avoid unnecessary third-party tracking earn 1 point per metric. If tracking is unavoidable, clear disclosures and opt-out mechanisms are required to receive full credit."
              },
              {
                title: "5. Data Handling",
                content: "This section focuses on how securely the website manages user data, whether users have control over their stored information, and whether retention policies are reasonable. Websites that allow users to access, modify, and delete their data, and that default to HTTPS for secure communication, earn 1 point per metric."
              }
            ].map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ 
                  p: 3, 
                  height: '100%',
                  borderTop: `4px solid ${index % 2 === 0 ? brandColors.purple : brandColors.green}`
                }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color={index % 2 === 0 ? brandColors.purple : brandColors.green}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2">
                    {category.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OurSolutionSection;