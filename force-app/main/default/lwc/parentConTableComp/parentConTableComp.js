import { LightningElement ,api} from 'lwc';
import getContactList from '@salesforce/apex/CreateRecordByApex.getContactList';
export default class ParentConTableComp extends LightningElement {
    savedRecordData;
    error;
    
    connectedCallback(){
      this.getConData();
    }

    getConData() {
        getContactList({ })
            .then((result) => {
                this.savedRecordData = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.savedRecordData = undefined;
            });

    }

    handlesavedCon(event){
        console.log('Event 3 =>>'+JSON.stringify(event.detail));
        this.getConData();

    }

}