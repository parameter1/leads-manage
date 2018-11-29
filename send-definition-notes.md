EmailSendDefinition
- CustomerKey (generate random UUID)
- Name (the name of the deployment)
- DeduplicateByEmail (boolean)
- IsMultipart (boolean true by default)
- IsSendLogging (boolean)
- IsSeedListSend (boolean)
- SuppressTracking (boolean)

- DeliveryScheduledTime (dateTime)

- Email
  - ID: 1234
  - IDSpecified: true

- CategoryID (the id of the folder the deployment is in?)

- SendClassification
  - ObjectID

- SenderProfile
  - ObjectID (e.g. IEN Today newsletters@ien.com)

- SendDefinitionList [
  //
]

SendDefinitionList
// For DEs
- DataSourceTypeID (CustomObject [for DEs])
- CustomObjectID (The DE ObjectID when using DEs)

// For Publication Lists
- List
  - ID (this publication list ID, when used)
  - IDSpecified: true

- SendDefinitionListType (leave blank for regular, otherwise ExclusionList for suppressions)
