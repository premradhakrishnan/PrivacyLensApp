// components/sections/ProblemBackgroundSectionWithCustom.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link
} from '@mui/material';
import CustomAccordion from '../common/CustomAccordion';
import { brandColors } from '../../utils/constants';

const ProblemBackgroundSectionWithCustom = () => {
  // State to track which accordion is expanded
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: brandColors.purple, fontWeight: 'bold', my: 4, textAlign: 'left' }}>
        Problem Background
      </Typography>
      
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color={brandColors.purple} sx={{ textAlign: 'left' }}>
            How Our Private Health Data Is Exploited Online
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 3, textAlign: 'left' }}>
            Today, a booming business of data brokers collects, analyzes, and sells our private health 
            information in ways that defy most Americans' expectations and evade HIPAA restrictions. 
            This sensitive information is being traded without our knowledge or genuine consent.
          </Typography>
          
          {/* Accordion Group */}
          <Box sx={{ mt: 4 }}>
            {/* Using our Custom Accordion Component */}
            <CustomAccordion
              title="Data Brokers and Health Profiling"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel1"
              color="purple"
            >
            <Typography variant="body1" paragraph>
              Everything these data brokers can access appears to be fair game: your online orders, social 
              media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownership, 
              hobbies, education, delinquent payments, media consumption, and more.
            </Typography>

            <Typography variant="body1" paragraph>
              If you're a minority who belongs to a low-income family, it turns out that patterns in vast troves 
              of digital footprints suggest that you may face heightened health risks and cost an insurance 
              company more money. If you're a woman who purchases plus-size clothing, you're <Link href="https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates" target="_blank" rel="noopener noreferrer">evidently</Link> at 
              risk of depression. 
            </Typography>

            <Typography variant="body1" paragraph>
              In 2020 alone, 25 large data brokers in the US <Link href="https://themarkup.org/privacy/2021/04/01/the-little-known-data-broker-industry-is-spending-big-bucks-lobbying-congress" target="_blank" rel="noopener noreferrer">spent</Link> $29 million on lobbying the United States 
              federal government. 
              This industry exists under the guise of improving health outcomes, but the evidence suggests this 
              data is used for other, more nefarious purposes as well.
            </Typography>            
          </CustomAccordion>
            
            <CustomAccordion
              title="High-Profile Privacy Violations"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel2"
              color="green"
            >
              <Typography variant="body1" paragraph>
                Recent years have witnessed a number of high-profile cases in which Americans' health information 
                has been exploited. The online therapy platform BetterHelp collected sensitive mental health 
                information from its patients and assured its users that "We never sell or rent any information 
                you share with us." The firm collected information on sensitive topics, including experience 
                with depression, medication use, and self-harm tendencies.
              </Typography>
              
              <Typography variant="body1" paragraph>
                However, the firm actually shared data from over 7 million users with Facebook, Snapchat, 
                Criteo, and Pinterest. The Federal Trade Commission <Link href="https://www.ftc.gov/business-guidance/blog/2023/03/ftc-says-online-counseling-service-betterhelp-pushed-people-handing-over-health-information-broke" target="_blank" rel="noopener noreferrer">fined</Link> BetterHelp $7.8 million in 2023, 
                the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement 
                action for the firm's practice of sharing consumers' personal data with a number of large tech 
                platforms. 
                GoodRx helped patients access discounted prices on prescription drugs.
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="The Mental Health Data Market"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel3"
              color="purple"
            >
              <Typography variant="body1" paragraph>
                A February 2023 <Link href="https://techpolicy.sanford.duke.edu/wp-content/uploads/sites/4/2023/02/Kim-2023-Data-Brokers-and-the-Sale-of-Americans-Mental-Health-Data.pdf" target="_blank" rel="noopener noreferrer">report</Link> published by Duke University researcher Joanne Kim found that people 
                seeking mental health services online "often unknowingly [put] their sensitive mental health 
                data at risk" and that the industry underlying this marketplace for sensitive data "appears 
                to lack a set of best practices for handling individuals' mental health data".
              </Typography>  

              <Typography variant="body1" paragraph>
                In one <Link href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">case</Link>, the cost of 5,000 records of mental health-related information was just $275 – 
                less than 6 cents per record. About a dozen data brokers were found to "sell mental health 
                data for dirt cheap" with little effort to limit how the purchased data would be used by 
                potential buyers.
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="How Tracking Technology Collects Health Data"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel4"
              color="green"
            >
              <Typography variant="body1" paragraph>
                How is this information amassed in the first place? For starters, a vast collection of tracking 
                technologies that power the economic model of the modern Internet – advertising – hoovers up 
                data about our online activities. Cookies and tracking pixels, for instance, are used to 
                connect health data to activity on social media platforms.
              </Typography>
              
              <Typography variant="body1" paragraph>
                An investigation by The Markup, "Facebook Is Receiving Sensitive Medical Information from 
                Hospital Websites," published in June 2022, found that Meta's Pixel was present on the 
                websites of 33 of the country's top 100 hospitals. The tracking technology enabled information 
                on patients' medical conditions, appointments, and prescriptions to be shared with Meta.
              </Typography>
              
              <Typography variant="body1" paragraph>
                When scheduling an appointment with a doctor on the website of the University Hospitals 
                Cleveland Medical Center, this tracking Pixel <Link href="https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites" target="_blank" rel="noopener noreferrer">sent</Link> Meta information about the physician's 
                name and the query used to reach her online: "pregnancy termination".
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="Why PrivacyLens Is Needed"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel5"
              color="purple"
            >
              <Typography variant="body1" paragraph>
                Our health data – what medications we take, what side effects we sustain, what troubles our minds, 
                what symptoms we experience, what diets we adhere to, which chronic conditions we manage – is 
                some of the most private information about us. At a time when health insurers want access to all 
                this information, those of us interested in protecting our online privacy must be selective about 
                those entities with whom we entrust this sensitive information.
              </Typography>
              
              <Typography variant="body1" paragraph>
                We are all patients at some point in our lives, and protecting our online privacy helps ensure 
                we keep sensitive information safe while also sending a sign to businesses that we demand 
                measured treatment of our most private data. PrivacyLens was created to help us accomplish 
                precisely this goal.
              </Typography>
            </CustomAccordion>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProblemBackgroundSectionWithCustom;