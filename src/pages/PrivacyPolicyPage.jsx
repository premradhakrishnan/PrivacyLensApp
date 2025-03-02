// pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Container, Typography, Box, Divider, Paper } from '@mui/material';
import { textStyles, LeftAlignedSection } from '../utils/textStyles';
import { brandColors } from '../utils/constants';

const PrivacyPolicyPage = () => {
  return (
    <Box component="main" sx={{ flex: 1, py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ ...textStyles.headingLeft, color: brandColors.purple, fontWeight: 'bold' }}>
            Privacy Lens Privacy Policy
          </Typography>
          
          <Typography variant="subtitle1" sx={{ ...textStyles.bodyLeft, mb: 4 }}>
            <strong>Last Updated:</strong> March 2, 2025
          </Typography>
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              1. Introduction
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens is committed to protecting your privacy. We've created this privacy policy to demonstrate our commitment to transparency and to reflect the same high standards we use to evaluate other websites' privacy policies.
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              As an organization dedicated to making healthcare privacy policies transparent and understandable for users worldwide, we hold ourselves to the highest standards of data protection and privacy. This policy explains how we collect, use, share, and protect information when you use our website (privacylens.info) and browser extension.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              2. About Privacy Lens
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens provides tools that help users globally understand the privacy implications of health-related websites. We do this through:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>A browser extension that analyzes search results for health-related queries and displays privacy ratings</li>
              <li>A web application that provides detailed privacy analysis of health websites</li>
              <li>A tool allowing users to submit specific website URLs for privacy policy evaluation</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Our mission is to empower users worldwide to protect their sensitive health information while still accessing the resources they need.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              3. Information We Collect
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              3.1 Information You Provide Directly
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li><strong>Website URLs</strong>: When you submit a URL for privacy policy analysis through our tool, we process this information solely to perform the analysis. We do not store which URLs individual users have analyzed.</li>
              <li><strong>Contact Information</strong>: If you choose to contact us via email, we use this information only to respond to your inquiry.</li>
            </Box>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              3.2 No Automatic Data Collection
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens is designed with privacy as its core principle. As such:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li><strong>No Cookies</strong>: We do not use cookies to track users or their behavior.</li>
              <li><strong>No User Accounts</strong>: We do not have a login system or store any user-specific information.</li>
              <li><strong>No Usage Tracking</strong>: We do not track how individual users interact with our website or extension.</li>
              <li><strong>No Analytics</strong>: We do not implement third-party analytics services.</li>
            </Box>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              3.3 Search Query Processing (Browser Extension Only)
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              If you use our browser extension:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>When you perform a search, the extension sends your search query to our AWS backend API</li>
              <li>Our backend system uses an LLM (Large Language Model) to determine if the query is health-related</li>
              <li>If the query is health-related, our system checks our MongoDB database for existing privacy ratings of websites in the search results</li>
              <li>For new websites without ratings, our background process automatically locates their privacy policies and analyzes them using OpenAI's models against our privacy rubric</li>
              <li>Once the analysis is complete, the privacy ratings are sent back to your browser and displayed alongside search results</li>
              <li>We do not store your search queries after processing</li>
              <li>We do not associate search queries with individual users</li>
              <li>We do not track which websites you ultimately visit</li>
              <li>No personal identifiers are required to use the extension</li>
            </Box>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              4. How We Use Information
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We use information in the following ways:
            </Typography>
            <Box sx={{ ...textStyles.bodyLeft }}>
              <Typography paragraph>
                <strong>Processing Search Queries</strong>: When you use our browser extension, we process your search queries through our AWS backend to determine if they are health-related. This processing is temporary and solely for providing real-time privacy ratings.
              </Typography>
              <Typography paragraph>
                <strong>Analyzing Website Privacy Policies</strong>: When you submit a website URL (either directly or through search results), we analyze its privacy policy against our rubric using our automated system and store the analysis results in our database.
              </Typography>
              <Typography paragraph>
                <strong>Building Our Privacy Rating Database</strong>: We maintain a database of website privacy ratings that is not connected to user identities or activities. These ratings are available to all users of our service.
              </Typography>
              <Typography paragraph>
                <strong>Background Analysis Process</strong>: For newly encountered health-related websites, our system automatically visits them, locates their privacy policies, and extracts the text for analysis against our privacy rubric.
              </Typography>
              <Typography paragraph>
                <strong>Service Improvement</strong>: We may analyze patterns in commonly evaluated websites to improve our service and rubric.
              </Typography>
              <Typography paragraph>
                <strong>Communication</strong>: If you contact us, we use your contact information solely to respond to your inquiry.
              </Typography>
            </Box>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              5. Information Sharing and Disclosure
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              5.1 Third-Party Service Providers
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We work with the following categories of service providers to operate our service:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>Cloud hosting providers (AWS Amplify for website hosting)</li>
              <li>Database services (MongoDB for storing website privacy ratings)</li>
              <li>AI processing services (OpenAI for analyzing privacy policies)</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              These services only process the specific information needed to analyze privacy policies and do not receive any personal user data, as we do not collect it.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              5.2 No Sharing of User Data
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Since we do not collect personal user data, we have no user data to share with any third parties, whether healthcare partners or commercial entities.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              5.3 Research and Aggregate Data
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Any research we conduct is based solely on our database of website privacy ratings and does not involve user-specific information. There is no need to opt out as no personal data is involved.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              5.4 Data Sale
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              <strong>We never sell data</strong> under any circumstances. Since we do not collect user data, there is nothing to sell.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              6. Regulatory Compliance
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              6.1 Global Privacy Regulations
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Because Privacy Lens does not collect, store, or process personal information about our users, many privacy regulations have limited applicability to our service. Our privacy-by-design approach means:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>We are not subject to most health data protection regulations worldwide as we do not collect or process protected health information</li>
              <li>We are not subject to many obligations under global consumer privacy laws (such as GDPR in Europe, CCPA in California, PIPEDA in Canada, LGPD in Brazil, or POPIA in South Africa) because we do not collect personal information that would trigger these requirements</li>
              <li>We do not transfer personal data internationally because we don't collect personal data</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              While many regulatory requirements do not apply to us due to our minimal data collection practices, we still follow privacy best practices and apply the principles underlying these global regulations to our service.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              6.2 Commitment to Privacy Best Practices
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Although not required by regulation, we voluntarily implement many privacy best practices that align with international standards:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>Transparency about our data practices</li>
              <li>Data minimization (collecting only what is necessary)</li>
              <li>Purpose limitation (using data only for stated purposes)</li>
              <li>Security safeguards for our systems and database</li>
              <li>International data protection considerations in our rubric</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Our approach is to exceed regulatory requirements by simply not collecting the types of data that would create privacy risks for our users in the first place, regardless of which country they're accessing our service from.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              7. Data Security
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We implement technical, administrative, and physical safeguards to protect your information, including:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>Data encryption in transit and at rest</li>
              <li>Access controls and authentication for our systems</li>
              <li>Regular security assessments and monitoring</li>
              <li>Staff training on data protection and privacy</li>
            </Box>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              8. Your Privacy Rights
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              As we do not collect or store personal information about our users, there is no personal data for us to provide access to, correct, or delete. However:
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              8.1 Website Database
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              If you believe a website's privacy score in our database is incorrect or outdated, you may notify us, and we will review the analysis.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              8.2 Contact Information
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              If you have contacted us via email, you may request that we delete your correspondence by contacting privacy@privacylens.info.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              8.3 Data Retention
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We do not retain any user-specific data. The only information we retain is our database of website privacy ratings, which is not connected to individual users.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              8.4 Global Privacy Rights
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We respect data subject rights regardless of location and citizenship. While we don't collect personal data that would typically be subject to these rights, we are committed to upholding the principles behind global privacy regulations such as the EU's GDPR, Brazil's LGPD, Canada's PIPEDA, and other international frameworks.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              9. Your Choices
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              9.1 Browser Extension Settings
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              You can customize the Privacy Lens extension's behavior through its settings panel, including:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>Enabling or disabling automatic health query detection</li>
              <li>Controlling when privacy ratings appear</li>
              <li>Adjusting notification preferences</li>
            </Box>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              9.2 Do Not Track
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              As we do not track users, Do Not Track signals do not affect our service's functionality. We inherently respect your privacy preferences without requiring specific browser settings.
            </Typography>
            
            <Typography variant="h6" sx={{ ...textStyles.headingLeft, fontWeight: 'bold' }}>
              9.3 Completely Private by Design
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens is designed to function without collecting user data. You can use all features of our service without concerns about tracking or data collection.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              10. Changes to This Policy
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              We will notify users of significant changes to this policy through:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>A prominent notice on our website</li>
              <li>An update notification in the browser extension</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Changes will take effect 30 days after posting, unless otherwise specified.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              11. Data Breach Notification
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Since we do not collect or store personal user information, the risk of a personal data breach is minimal. However, we take the security of our system seriously. In the unlikely event of a security incident affecting our database of website privacy ratings or our service infrastructure:
            </Typography>
            <Box component="ol" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>We will post a notification on our website within 72 hours of discovery</li>
              <li>We will provide information about the nature of the incident</li>
              <li>We will explain steps we're taking to address the issue and prevent future occurrences</li>
              <li>Where required by applicable laws in affected regions, we will notify relevant data protection authorities</li>
            </Box>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Given our privacy-by-design approach where no personal user data is collected, there would be no personal information compromised in such an incident.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              12. Contact Information
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              For questions or concerns about this privacy policy or our privacy practices:
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              <strong>Privacy Officer</strong>: privacy@privacylens.info<br />
              <strong>General Contact</strong>: connect@privacylens.info
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              13. Children's Privacy
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens services are designed to help users understand privacy policies for health-related websites. While our services may be valuable to users of all ages concerned about privacy, they are primarily intended for general audiences and not specifically directed at children under the age of digital consent in their jurisdiction.
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Since we do not collect personal information from any users, including children, most children's privacy protection laws worldwide have limited applicability to our service. Different countries define the digital age of consent differently (13 in the US under COPPA, 16 in many EU countries under GDPR, and various ages in other jurisdictions). Regardless of these regulations, we encourage parents and guardians to supervise their children's online activities and help them understand the importance of privacy.
            </Typography>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <LeftAlignedSection>
            <Typography variant="h5" sx={{ ...textStyles.sectionTitle, color: brandColors.purple }}>
              14. International Users
            </Typography>
            <Typography paragraph sx={textStyles.bodyLeft}>
              Privacy Lens is designed for users worldwide. Our privacy rubric evaluates health website policies against global standards, recognizing that health privacy expectations are universal while regulatory approaches may differ. Our own practices reflect this global perspective:
            </Typography>
            <Box component="ul" sx={{ ...textStyles.bodyLeft, pl: 4 }}>
              <li>We apply consistent privacy standards regardless of user location</li>
              <li>Our evaluation criteria incorporate elements from major global privacy frameworks</li>
              <li>We recognize regional variations in privacy regulations while focusing on core health privacy principles</li>
              <li>We do not differentiate our privacy practices based on user geography</li>
            </Box>
          </LeftAlignedSection>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', fontStyle: 'italic' }}>
            <Typography paragraph sx={textStyles.bodyLeft}>
              <em>Privacy Lens is committed to setting the standard for transparent, user-friendly privacy policies in the digital health space globally. We continuously evaluate and improve our privacy practices to ensure they align with our mission of empowering users worldwide to protect their health information.</em>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;