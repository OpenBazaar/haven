import React from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import Button from '../atoms/FullButton';
import { OBLightModal } from '../templates/OBModal';

import { onboardingStyles, footerStyles } from '../../utils/styles';
import { brandColor } from '../commonColors';
import { EMAIL_URL } from '../../config/supportUrls';

const shieldImg = require('../../assets/images/privacyShield.png');
const bottomImg = require('../../assets/images/privacyBottom.png');

const styles = {
  contentWrapper: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  header: {
    height: 96,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 47,
    height: 52,
  },
  privacyText: {
    fontSize: 13,
    lineHeight: 13,
    color: 'white',
    backgroundColor: '#8cd885',
    left: 16,
    paddingLeft: 11,
    paddingRight: 9,
    paddingTop: 7,
    paddingBottom: 5,
    letterSpacing: 1,
    borderRadius: 13,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  privacyDescriptionNormal: {
    marginTop: 16,
    fontSize: 16,
    // lineHeight: 26,
    color: '#404040',
  },
  privacyDescriptionBold: {
    marginTop: 16,
    fontSize: 16,
    // lineHeight: 26,
    color: '#404040',
    fontWeight: 'bold',
  },
  hyperlinkContainer: {
    paddingHorizontal: 16,
    // flex: 1,
  },
  privacyButtonText: {
    color: brandColor,
    textDecorationLine: 'underline',
  },
  bottomImg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
};

const scrollStyleProps = {
  style: {
    flex: 1,
  },
  // showsVerticalScrollIndicator: false,
};

export default class EULAModal extends React.Component {
  handleShowModal = (url) => {
    if (url === 'mailto:haven@ob1.io') {
      Linking.openURL(EMAIL_URL);
    }
  };

  render() {
    const { show, onClose } = this.props;
    return (
      <OBLightModal
        animationType="slide"
        transparent
        visible={show}
      >
        <Image style={styles.bottomImg} source={bottomImg} resizeMode="contain" />
        <View style={styles.header}>
          <Image style={styles.logo} source={shieldImg} resizeMode="contain" />
        </View>
        <Text style={[styles.privacyText]}>
          EULA
        </Text>
        <ScrollView {...scrollStyleProps}>
          <Hyperlink
            style={styles.hyperlinkContainer}
            linkStyle={styles.privacyButtonText}
            onPress={this.handleShowModal}
          >
            <Text style={styles.privacyDescriptionBold}>
              End User License Agreement terms and conditions governing download and use of this mobile application, downloaded by you via Apple, Inc.’s (“Apple”) App Store (the “App Store”) or Google Play. Please read this End User License Agreement terms and conditions carefully.
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              This End User License Agreement sets forth the terms and conditions (“Terms”) under which OB1 (“OB1”) (alternatively referred to as “us,” “we,” or “our”) offers you the right to download and use the Haven mobile application (including any updates thereto, the “Application”) and your use of the Application is governed by these Terms. By accepting these Terms (i) you represent that you are of legal age to enter into a binding contract and (ii) you signify that you have read, understood and agree to these Terms (and that such Terms are enforceable like any other written negotiated agreement signed by you) and certify that you are at least 17 years old or older. If you do not agree to these Terms, or you are not at least 17 years old, you may not use the Application. Violations of these Terms will result in a permanent removal from the Application.
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              These Terms constitute an agreement strictly between OB1 and you and you acknowledge that OB1 (in accordance with the limitations herein) rather than Apple and Google is responsible for any claim or liability arising from your use of the Application including, but not limited to, any third party claim of infringement of intellectual property rights. Nevertheless, you agree to abide by all terms, conditions or usage rules imposed by Apple and Google applicable to the use of this Application, including, but not limited to, any terms, conditions or usage rules set forth in the App Store Terms of Service.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              1. License and Restrictions
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              The Application is licensed, not sold, to you. All rights, title and interest (including, without limitation, all copyrights, trademarks and other intellectual property rights) in and to this Application belong to us or our licensors. Subject to your compliance with these Terms, we grant you a non-transferable, non-assignable, revocable, limited license to download and install one copy of this Application on a mobile device that you personally own or control and to use that copy of this Application on that mobile device solely for your own personal use. You may not install or use a copy of the Application on a device you do not own or control. You may not distribute or make the Application available over a network where it could be used by multiple devices at the same time. You may not sell, rent, lend, lease, redistribute, or sublicense the Application or circumvent any technical limitations in the Application or otherwise interfere in any manner with the operation of the Application, or the hardware or network used to operate the Application. You may not copy, reverse engineer, decompile, disassemble, modify, create derivative works or otherwise attempt to derive the source code of this Application. This Application and its content are protected by copyright under both United States and foreign laws. Any use of the Application and its content not explicitly permitted by these Terms is a breach of this agreement and may violate the law. If you violate these Terms, your license to use this Application automatically terminates and you must immediately cease using the Application and destroy all copies, full or partial, of the Application.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              2. Ownership
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              We alone (and our licensors, where applicable) shall own all right, title and interest, including, without limitation, all intellectual property rights, in and to the Application and any suggestions, ideas, enhancement requests, feedback, recommendations or other information provided by you or any other party relating to the Application. Any copy, modification, revision, enhancement, adaptation, translation, or derivative work of or created from the Application shall be owned solely and exclusively by us, and/or, as applicable, our third-party vendors, as shall any and all patent rights, copyrights, trade secret rights, trademark rights, and all other proprietary rights, worldwide therein and thereto, and you hereby assign to OB1 any and all of your rights, title or interests that you may have or obtain in the Application or any modification to or derivative work of the Application. You shall not remove or authorize or permit any third party to remove any proprietary rights legend from the Application.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              3. Your Responsibilities as the Application User
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Use of the Application requires third party services and equipment such as a compatible mobile device, internet access and a telecommunications carrier. Obtaining and maintaining the equipment and services necessary to use the Application is your responsibility. OB1 is not responsible for equipment defects, lack of service, dropped calls, or other issues arising from third party services or equipment. You are solely responsible for your use of those services on your mobile device and compliance with any applicable third party terms and payment of all applicable third party fees associated with any carrier service plan you use in connection with your use of those services (such as voice, data, SMS, MMS, roaming or other applicable fees charged by the carrier). You agree not to use the Application to communicate in an offensive or obscene manner, or to spam, threaten, defame or harass other users. OB1 is not in any way responsible for any such use by you or by any person using your device, nor for any harassing, threatening, defamatory, offensive, or illegal messages or transmissions that you may receive as a result of using the Application. OB1 reserves the right, but does not assume the obligation, to remove any objectionable activity or language used in the Application at any time. OB1 reserves the right, but does not assume the obligation, to not publish or to terminate any communication, or posting it determines objectionable in its sole discretion. Use of the Application is void where prohibited. You shall not use the Application to falsely state or otherwise misrepresent yourself or your affiliation with any person or entity; or to intentionally or unintentionally violate any applicable local, state, national or international law, including, but not limited to, U.S. regulations pertaining to the export of software from the U.S. to embargoed countries. You will ensure that the information you provide to us through the Application is accurate and complete. We reserve the right to immediately terminate your use of the Application should you fail to comply with any of the foregoing.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              4. Third Party Sites, Services and Devices
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              The Application may enable you to access third-party mobile applications and websites (“Third Party Materials”). Access to Third Party Materials may require you to accept additional terms and conditions and privacy policies. You acknowledge that OB1 is not responsible for the terms and conditions or privacy policies of Third Party Materials. You understand that by using any of the Third Party Materials you may encounter content that may be deemed offensive, indecent, or objectionable, which content may or may not be identified as having explicit language, and that the results of any search or entering of a particular URL may automatically and unintentionally generate links or references to objectionable material. Nevertheless, you agree to use the Third Party Materials at your sole risk and that neither OB1 nor its agents shall have any liability to you for content that may be found to be offensive, indecent, or objectionable.
              Certain Third Party applications or materials may provide links to additional third party websites or allow you to upload or enter your own data. By using the Third Party Materials, you acknowledge and agree that neither OB1 nor its agents is responsible for the content, accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect of such Third Party Materials, or the data you choose to upload or enter into the Application through those Third Party Materials. Neither OB1 nor its agents warrant or endorse, and each does not assume and will not have any liability or responsibility to you or any other person for, any Third Party Materials. Links to Third Party Materials are provided solely as a convenience to you.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              5. User Submissions
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Any information submitted through the Application, including listings, posts, messages, may be provided to our staff and may be viewable to other Application users. OB1 is not responsible for the content of any communication submitted or posted by Application users nor do we guarantee the truthfulness, accuracy or validity of any posted communication. Any action you take or do not take based upon information posted to the Application, including, but not limited to, investment, purchasing, trading, employment or other decisions, is done at your own risk.
              By submitting communications or content to any part of this Application that is viewable by other Application users, you acknowledge that the submission may be viewed and further disclosed by other Application users. We encourage you to not include personally identifiable information in such submissions and cannot be held liable for the further disclosure of your personally identifiable information by other Application users. You acknowledge that OB1 only acts as a passive conduit for the distribution of content and other material posted by Application users and is not responsible or liable to you or any third party for the content or accuracy of those materials. We, however, reserve the right, but assume no obligation, to monitor any submissions or postings and delete, move or edit any content that we consider inappropriate or unacceptable for any reason. You shall not submit any communication or content that infringes or violates any right of any party or that is not original to you. Illicit or abusive content is strictly prohibited. Where we do moderate interactive features, we will endeavor to review comments and postings for relevance, topicality and appropriateness, and we may withhold or remove postings for any reason, within our sole discretion. We are unlikely to post comments relating to ongoing legal matters or regulatory issues.
              We reserve the right to republish and use any material contributed by Application users as permitted by these Terms or otherwise by law. By posting a message, content or other material in any public area of the Application or submitting any correspondence to us, you expressly grant us, and anyone authorized by us, a global, royaltyfree, perpetual, irrevocable, unrestricted, nonexclusive license to publish, reproduce, sell, disclose, modify, create derivative works from, distribute, publicly perform or display, or otherwise use such material, in whole or in part, in any manner or medium (whether now known or hereafter developed), for any purpose whatsoever. You hereby further grant us, and anyone authorized by us, the global, royalty-free, perpetual, irrevocable, unrestricted, nonexclusive right to use any ideas, concepts or techniques, in whole or in part, in any manner or medium (whether now known or hereafter developed), embodied in such materials for any purpose whatsoever. In addition, you hereby waive any and all moral rights you may have in any such materials. You also agree that all such material will be deemed to be provided to us on a non-confidential and non-proprietary basis. Material that is copyright protected may not be submitted without permission from the copyright owner, and you are solely responsible for the failure to obtain any such permission.
              We will comply with any legal requests to disclose any submissions, communications or postings to others, including to law enforcement agencies.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              6. Privacy Statement
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Your use of the Application is also subject to the terms and conditions of the Mobile Application Privacy Policy.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              7. Legal Compliance
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              The Application is subject to United States export laws and regulations. You will not use or otherwise export the Application except as authorized by United States law and the laws of the jurisdiction in which the Application was obtained. You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country; and (ii) you are not listed in any U.S. Government list of prohibited or restricted parties. OB1 does not represent that the Application is appropriate or available for use in all countries. OB1 prohibits accessing materials from countries or states where such content is illegal. You are using the Application on your own initiative and you are responsible for compliance with all applicable laws.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              8. Disclaimer of Warranty
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Any use of the Application shall be at your sole risk. This Application and the information you access through the Application is provided on an "AS IS", “WITH ALL FAULTS” and "AS AVAILABLE" basis and without any warranty, express or implied, of any kind, to the fullest extent permissible pursuant to applicable law. OB1, Apple, Google, wireless carriers over whose network the Application is distributed, and each of our respective affiliates and suppliers (collectively, “Distributors”) give no express or implied warranties, guarantees, or conditions under or in relation to the Application. Distributors disclaim all express or implied warranties related to the Application including, but not limited to, implied warranties for merchantability, non-infringement, and fitness for a particular purpose. Distributors make no warranty as to the reliability, accuracy, timeliness, usefulness or completeness of the Application or any information accessed through the Application. Distributors cannot and do not warrant against human, services and machine errors, omissions, delays, failures, interruptions or losses. Distributors cannot and do not guarantee or warrant that the Application will be free of infection or viruses, worms, malware, Trojan Horses or other malicious codes. OB1 reserves the right to terminate, without notice, your use of the Application at any time and for any reason. Please note that some jurisdictions may not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you. In such case, exclusions will apply to the greatest extent consistent with applicable law. You are solely responsible for any damages to your hardware device(s) or loss of data that results from the download or use of the Application. Your sole and exclusive remedy for dissatisfaction with the Application is to stop using it.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              9. Limitation of Liability
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Under no circumstances will Distributors be liable for any damages you suffer as a result of your reliance on this Application or any content provided by the Application or Third Party Materials, nor will Distributors be liable to you or any third party for any incidental, special, consequential, indirect or punitive damages whatsoever, including, without limitation, loss of profits, loss of data, business interruption or any other personal injury or commercial damages or losses arising out of or that result from the use of, or the inability to use, the Application, regardless of the theory of liability (contract, tort, strict liability, negligence, guarantee or condition, or otherwise), even if advised of the possibility of such damages or repair or replacement of the Application does not fully compensate you for any losses. In no event shall Distributor's total liability to you for all damages (other than as may be required by applicable law in cases involving personal injury) exceed the amount of One Hundred ($100) Dollars. The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              10. Maintenance and Support Services
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              Any maintenance and support services made available by OB1 are at the discretion of OB1 which may initiate or cease providing maintenance and support services at any time without notice to you. You acknowledge that Apple, Google, and your wireless carrier are not responsible for providing maintenance and support services for the Application.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              11. Location Data
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              OB1, Apple, Google, Distributors or other providers or their partners may collect, maintain, process and use your location data, including the real-time geographic location of your mobile device as necessary to provide the Application’s full functionality. By using or activating any location-based services on your mobile device, you agree and consent to OB1's, and such parties' collection, maintenance, publishing, processing and use of your location data to provide you with such services. You may withdraw this consent at any time by turning off the location-based feature on your mobile device or by not using any location-based features. Turning off or not using these features may impact the functionality of the Application. Location data provided by the Application is for basic navigational purposes only and is not intended to be relied upon in situations where precise location information is needed or where erroneous, inaccurate or incomplete location data may lead to death, personal injury, property or environmental damage. Use of real time route guidance is at your sole risk. Location data may not be accurate. Neither OB1, nor such parties guarantee the availability, accuracy, completeness, reliability or timeliness of information or location displayed by the Application.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              12. Choice of Laws, Jurisdiction, Entire Agreement
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              By downloading or using the Application, you expressly agree that these Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to its conflict of laws provisions or your actual state or country of residence. You further expressly agree that exclusive jurisdiction for any dispute with OB1 in any way relating to your use of this Application is in the federal or district courts of the State of Delaware, and you agree and expressly consent to the exercise of personal jurisdiction in state or federal court in the State of Delaware, in connection with any such dispute including any claim involving OB1 or its affiliates or content providers. If any provision of these Terms shall be unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions. This is the entire agreement between the parties relating to the subject matter herein and it supersedes all previous or contemporaneous agreements, proposals and communications, written or oral, relating to that subject matter. As a user of the Application, you agree to contact us prior to seeking legal recourse for any harm you believe you have suffered from your use of the Application. In the event that you believe our Application has harmed you, you agree to inform us and to give us thirty (30) days to cure the harm before initiating any action. You also agree that you must initiate any cause of action within one (1) year after the claim has arisen, or you will be barred from pursuing any cause of action.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              13. Indemnity
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              You will defend, indemnify and hold OB1, its officers, directors, employees, agents, licensors, and vendors, harmless from and against any and all claims, actions or demands, liabilities and settlements including without limitation, reasonable legal and accounting fees, resulting from, or alleged to result from, (i) your violation of these Terms, whether by act, omission or negligence, or by any other person using your account, (ii) your use of the Application, (iii) your violation of any rights of another, and/or (iv) any communications, content or other material posted to or transmitted through the Application by you or by others using your account.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              14. Third Party Beneficiary
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              OB1 and you acknowledge that Apple, Apple’s subsidiaries, Google, Google’s subsidiaries are third party beneficiaries to this agreement. Upon your acceptance of these Terms, Apple and Google will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third party beneficiary. Aside from Apple and Google, there are no third party beneficiaries to this agreement.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              15. Amendment
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              We have the right, at any time and without prior written notice, to add to or modify the Terms, by amending the Terms available within the Home page or by requiring you to accept an updated agreement upon accessing the Application. Your access or use of the Application after the date of such amended Terms constitutes acceptance of such amended Terms. By continuing to access or use the Application after we post such changes, you agree to these Terms, as modified.
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              16. Contact Us
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              For Questions, please email us at haven@ob1.io
            </Text>

            <Text style={styles.privacyDescriptionBold}>
              17. Copyright Infringement – DMCA Notice
            </Text>
            <Text style={styles.privacyDescriptionNormal} textBreakStrategy="simple">
              The Digital Millennium Copyright Act of 1998 (the “DMCA”) provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under US copyright law. If you believe in good faith that content or material on this Application infringes a copyright owned by you, you (or your agent) may send OB1 a notice requesting that the material be removed, or access to it blocked. This request should be sent to: haven@ob1.io. The notice must include the following information: (a) a physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed; (b) identification of the copyrighted work claimed to have been infringed; (c) identification of the material that is claimed to be infringing or the subject of infringing activity; (d) the name, address, telephone number, and email address of the complaining party; (e) a statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and (f) a statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed. If you believe in good faith that a notice of copyright infringement has been wrongly filed against you, the DMCA permits you to send us a counter-notice. Notices and counter-notices must meet the then-current statutory requirements imposed by the DMCA. Notices and counternotices with respect to the Application should be sent to the address above.
            </Text>

          </Hyperlink>
        </ScrollView>
        <View style={footerStyles.roundButtonContainer}>
          <Button
            wrapperStyle={onboardingStyles.button}
            title="I Accept"
            onPress={onClose}
          />
        </View>
      </OBLightModal>
    );
  }
}
