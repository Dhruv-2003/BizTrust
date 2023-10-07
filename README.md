## Needs

-> Issue the VCs to the new business by the issuer
-> VCs could be registeration certificates , TaxNos , Other Business related verifiable data
-> Another VC would be the business trust Score , which will change and will be modified overtime
-> Being able to prove these VCs , by presenting them as VPs to the verifiers
-> Other businesses should be able to verify if opp party has some VCs
-> This Verification can be also needed on chain , maybe for Credit capacity , or even for providing extra benefits and perks to the Business while transacting onchain

## TO DOs with Onyx

-> Generate or add a Issuer Private Key ✅
-> Create a VC Schema
-> Get Holder's DID:ethr ✅
-> Create a VC's DID key and generate the VC ✅
-> Sign the Credential with Issuer's DID and generate a VC JWT ✅
-> Request VCs to be signed
-> Holder can create VPs from one or multiple VCs using the Holder's DID:ethr generatign the ✅
-> Sign VPs using Holder's DID:ethr and generate a VP JWT
-> Verify the VP JWT ✅
-> Get VCs from the VP ✅
-> Verify the VCs ✅
-> We can also verify the VCs , with a particular Schema & other params ✅

## Challenges

-> Where to store these VCs and VPs JWT and proofs
-> How to share
-> How to handle the on chain part , and how to verify and post these proofs on chain

## Answers

-> Maybe we can use the register from DID here , to add the record on chain
-> Then the verifier Contract to check for these credentials
