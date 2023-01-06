public with sharing class CreateRecordByApex {
    @AuraEnabled
    public static Contact submitScoreAction(string fName,string lName, string conEmail, string conPhone, date conBday , integer cobProQua, string conTilte){
        Contact scoreCardObj = new Contact();
        scoreCardObj.FirstName=fName;
        scoreCardObj.LastName=lName;
        scoreCardObj.Email=conEmail;
        scoreCardObj.Phone=conPhone;
        scoreCardObj.Birthdate=conBday;
        // scoreCardObj.Products_Quantity__c=cobProQua;
        scoreCardObj.Title=conTilte;
 
        insert scoreCardObj;
        return scoreCardObj;
    }

    @AuraEnabled
    public static Account accountRecMethod(Account accRec){
        try {
            
            insert accRec;
            return accRec;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

       
    }

    @AuraEnabled
    public static List<Contact> getContactList() {
        return [SELECT Id, LastName,FirstName,Birthdate, Phone,Title, Email FROM Contact order by createdDate DESC ];
    }
}