## What is it?

BizTrust is a comprehensive solution that seamlessly integrates various technologies to address the challenges inherent in B2B (business-to-business) payments and simplify the onboarding process for businesses. At its core, our solution offers a streamlined, secure, and efficient ecosystem for businesses to engage in digital transactions.

Presentation : https://pitch.com/public/970b826a-facc-4d3d-a614-c03d178a3d27
## Existing Problems

1. **Transparency Deficiency:** We eliminate the opacity surrounding business identities by issuing verifiable credentials based on company information, addressing the lack of transparency that plagues B2B transactions.
2. **Payment Trustworthiness:** With our trust scoring system, businesses can boost their credibility based on timely payments, building trust within the B2B community.
3. **Payment Delays:** We introduce an escrow payment method to ensure on-time payments, minimizing transaction delays that often hinder B2B interactions.

## Our Solution

- **Seamless Registration:** Businesses can effortlessly register on our platform using Biconomy Social onboarding, ensuring a hassle-free experience.
- **Credential Issuance:** Verifiable credentials, including ProofOfName, ProofOfAddress, TrustScore, ProofOfRegistration, ProofOfTax, and verifiedCustomer, are issued based on user-provided information.
- **Credential Storage:** Users can securely store these credentials in their local browser, ensuring easy access when needed.
- **Identity Verification:** VPs (Verifiable Presentations) are used for identity verification, enhancing security in transactions and interactions.
- **Invoice Issuance:** Businesses can issue invoices to other companies, and recipients can use VPs for direct payments, streamlining the payment process.
- **Trust Score System:** Our scoring system rates businesses from 1 to 1000 based on payment history and added details, with benefits such as reduced gas fees and demo credit lines.

## Tech Used

**Onyx SSI SDK**: Our solution begins with the use of the Onyx SSI SDK, which allows us to create Verifiable Credentials for the businesses we onboard. This technology enables us to verify the authenticity of these credentials, securely store them in the user's local storage, and create corresponding Verifiable Presentations (VPs). Additionally, we offer a convenient way for users to sign their proofs using passcode encryption in order to verify themselves - [Usage Ref](https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/components/onyx.ts)


**Magic Link**: For a seamless and hassle-free onboarding experience, we implement the Magic Link feature. With just a single click of a button, users can easily onboard, streamlining the registration process. [Usage Ref](https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/pages/index.tsx)

**Biconomy**: To simplify payment solutions and enhance user experiences, we integrate the Biconomy SDK. This technology facilitates various features such as Social Login, Paymaster, and Session Keys, creating an intersection between digital entities, verifiable credentials, and payments. This ensures a smooth and efficient payment process for businesses. [Usage Ref](https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/pages/index.tsx) ,[Usage Ref](https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/components/CreateSession.tsx)

## For Nerds

**Signing Up**: We sign up users using magic link and Biconomy Bundler and Paymaster,which creates a smart contract account for the user. Once it is created, we generate session keys for the user, so they don't have to sign transactions again and again.

**Onboarding**: We onboard companies by simply taking their details like name, addrs, taxNo., RegistrationNo., etc. and store it in firebase(for now). Once it is stored we allow the user to generate verifiable credentials and create a passcode which stores Signed JWT in an encrypted formed in the Secure local storage & will later be used to verify thier credentials. The Unsigend VCs are being stored on Firebase for records

**OverView**: Here, the user can see thier VC and company details and their Trust Score , fetched dynamically from database

**Invoice**: Here, the user can the invoices that are created for them and pay them using Biconomy Gasless Transactions and can even create invoices for other business that they deal with to request payments. We show the recepeint business data like there Score , credentials and badged to build trust and imnprove transparency

**Transactions**: Here, user can see all past payments.

**VPs**: User can generate VPs here using the Onyx SSI SDK, that ensures more creditibility to the company, and can be used easily to provide a proof to recieve payments. Verification happens on the backend Server that handles the API to verify Presentation  JWT , verify Credential JWTs , verify vailidity of Schema , Expiry and revocation status

![Wasp (2)](https://github.com/Dhruv-2003/BizTrust/assets/91938348/19bd5bcb-03cc-4016-859e-18320ea90d93)

## Trust Score System

- **Scoring Criteria:** Our platform employs a dynamic Trust Score system that evaluates users based on their transaction history and the completeness of their profile information.
- **Initial Score:** When users create their profiles, they start with an initial Trust Score of 500.
- **Profile Enhancement:** To encourage users to provide additional details, such as tax and registration information, we reward them with a boosted score, jumping to 600.
- **Payment Performance:** Users' scores continue to evolve with their payment performance. Completing two successful payments raises the score to 700.
- **Continuous Improvement:** The Trust Score can reach 800 through further successful payments. Subsequently, each successful payment increases the score by 10.
- **Benefits of a High Score:** Users with a Trust Score of 600 or higher enjoy several benefits:
    - **Free Gas via Biconomy or ZkSync Paymaster:** Higher scores result in reduced gas fees for transactions, making payments more cost-effective.
    - **Demo Credit Line:** We offer a demo credit line to businesses with high scores, facilitating their payments. The interest rate on this credit line depends on the Trust Score:
        - 12% Nominal Interest Rate
        - 10% Interest Rate for 700 Score
        - 8% Interest Rate for 800 Score

Our Trust Score system not only incentivizes users to provide accurate profile information but also rewards them for reliable payment behavior. It's a win-win for businesses, promoting trust and financial benefits in our ecosystem.

## Verifiable Credentials

- **Proof of Name** : for the name of the company registerd
- **Proof of Address** : for the Address of the Company
- **Proof of Registeration** : for the Registeration no of the company 
- **Proof of Tax** : for Tax no of the company
- **Trust Score credential** : for Trust Score of the Company 
- **Verified Customer Credential** :  Shows that the Company is verified for the details they entered on the platform , only Issued once user Verified proof of entity VP 

## Verifiable Presentation

- **Proof of Entity** : Requires Proof of Name , Address , Registeration and Tax VCs, to issue a proof that entity has provided these info , can be done only after registeration.
- **Proof of Verified Customer** : Can be verified to show that the entity owns Verified Customer VC and can be trusted
- **Proof of Trust Score Credential** : Can be used to get benefits on the basis of trust Score for the user

## Images

![WhatsApp Image 2023-10-09 at 1 17 11 AM](https://github.com/Dhruv-2003/BizTrust/assets/90101251/70d62ba5-f7ec-4ce7-a11c-d8b2416ae78e)

![WhatsApp Image 2023-10-09 at 1 17 11 AM (1)](https://github.com/Dhruv-2003/BizTrust/assets/90101251/28d9e4ff-c6c6-4797-9ca3-2a8905a6d6b5)


<img width="1434" alt="Screenshot 2023-10-09 at 1 58 36 AM" src="https://github.com/Dhruv-2003/BizTrust/assets/90101251/b44e6591-afa0-47b2-b7ce-6e37f0a3dd5f">
<img width="1436" alt="Screenshot 2023-10-09 at 1 58 17 AM" src="https://github.com/Dhruv-2003/BizTrust/assets/90101251/91780821-6e3f-4c65-8498-025a2937feff">

![WhatsApp Image 2023-10-09 at 1 59 10 AM](https://github.com/Dhruv-2003/BizTrust/assets/90101251/a1f9075f-2cfb-44f8-a348-ca41f99a5de9)

## Links

Session Key Genaration : https://mumbai.polygonscan.com/tx/0x605079d4e356281916bd25d9c72a785b012180bc2a51356c8bf0cd722a66dcd1

## Team 

- [Dhruv Agarwal](https://bento.me/0xdhruv) - Worked on Backend system , and intergrating the Onyx SSI SDK
- [Archit Sharma](https://bento.me/archit-sh) - Worked on Fronted , and integrating Biconomy , ZK sync & Magic link
