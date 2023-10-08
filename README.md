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

**Onyx SSI SDK**: Our solution begins with the use of the Onyx SSI SDK, which allows us to create Verifiable Credentials for the businesses we onboard. This technology enables us to verify the authenticity of these credentials, securely store them in the user's local storage, and create corresponding Verifiable Presentations (VPs). Additionally, we offer a convenient way for users to sign their proofs using passcode encryption in order to verify themselves.

**Magic Link**: For a seamless and hassle-free onboarding experience, we implement the Magic Link feature. With just a single click of a button, users can easily onboard, streamlining the registration process.

**Biconomy**: To simplify payment solutions and enhance user experiences, we integrate the Biconomy SDK. This technology facilitates various features such as Social Login, Paymaster, and Session Keys, creating an intersection between digital entities, verifiable credentials, and payments. This ensures a smooth and efficient payment process for businesses.

## For Nerds

**Signing Up**: We sign up users using magic link and Biconomy Bundler and Paymaster,which creates a smart contract account for the user. Once it is created, we generate session keys for the user, so they don't have to sign transactions again and again.
**Onboarding**: We onboard companies by simply taking their details like name, addrs, taxNo., RegistrationNo., etc. and store it in firebase(for now). Once it is stored we allow the user to generate verifiable credentials and create a passcode whichis stored in an encrypted formed in the local  will later be used to verify thier credentials.
**OverView**: Here, the user can see thier VC and company details and their Trust Score.
**Invoice**: Here, the user can the invoices that are created for them and pay them using Biconomy Gasless Transactions and can even create invoices for other business that they deal with to reuest payments.
**Transactions**: Here, user can see all past payments.
**VPs**: User can generate VPs here using the Onyx SSI SDK, that ensures more creditibility to the company, and can be used easily to provide a proof to recieve payments.

## Images

![WhatsApp Image 2023-10-09 at 1 17 11 AM](https://github.com/Dhruv-2003/BizTrust/assets/90101251/70d62ba5-f7ec-4ce7-a11c-d8b2416ae78e)

![WhatsApp Image 2023-10-09 at 1 17 11 AM (1)](https://github.com/Dhruv-2003/BizTrust/assets/90101251/28d9e4ff-c6c6-4797-9ca3-2a8905a6d6b5)


<img width="1434" alt="Screenshot 2023-10-09 at 1 58 36 AM" src="https://github.com/Dhruv-2003/BizTrust/assets/90101251/b44e6591-afa0-47b2-b7ce-6e37f0a3dd5f">
<img width="1436" alt="Screenshot 2023-10-09 at 1 58 17 AM" src="https://github.com/Dhruv-2003/BizTrust/assets/90101251/91780821-6e3f-4c65-8498-025a2937feff">

![WhatsApp Image 2023-10-09 at 1 59 10 AM](https://github.com/Dhruv-2003/BizTrust/assets/90101251/a1f9075f-2cfb-44f8-a348-ca41f99a5de9)

## Links

Session Key Genaration : https://mumbai.polygonscan.com/tx/0x605079d4e356281916bd25d9c72a785b012180bc2a51356c8bf0cd722a66dcd1
