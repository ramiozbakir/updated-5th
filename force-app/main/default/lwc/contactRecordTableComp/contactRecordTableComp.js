import { api, LightningElement, track ,wire} from 'lwc';
import submitScoreAction from '@salesforce/apex/CreateRecordByApex.submitScoreAction';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getContactList from '@salesforce/apex/CreateRecordByApex.getContactList';
import { refreshApex } from '@salesforce/apex';

export default class ContactRecordTableComp extends LightningElement {

    @track columns = [{
        label: 'First name',
        fieldName: 'FirstName',
        type: 'text',
        sortable: true
    },
    {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'Email',
        sortable: true
    },
    {
        label: 'Birth Date',
        fieldName: 'Birthdate',
        type: 'date',
       
    },
    {
        label: 'Title',
        fieldName: 'Title',
        type: 'text',
        sortable: true
    }
    ];
    //.... for saving record.....
    @track fName='';
    @track cEmail='';
    @track cPhone='';
    @track lName='';
    @track conBday='';
    @track cTitle='';
    @track scoreRecoreId;
    @track errorMsg;
    // ........... 

    @track error;
    @track conData;
    connectedCallback(){
      this.getConData();
    }

    getConData() {
        getContactList({ })
            .then((result) => {
                this.conData = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.conData = undefined;
            });
    }

    // @wire(getContactList)
    // wiredContacts({
    //     error,
    //     data
    // }) {
    //     if (data) {
    //         this.conData = data;
    //     } else if (error) {
    //         this.error = error;
    //     }
    // }

    // ........... for saving rec ......... 
    scoreHandleChange(event){
        if(event.target.name == 'fName'){
        this.fName = event.target.value; 
        window.console.log('scoreRecoreId##Vijay2 ' + this.fName);        
        //window.console.log('scoreObName ##' + this.scoreObName);
        }
      if(event.target.name == 'cEmail'){
        this.cEmail = event.target.value;  
      }
  
      if(event.target.name == 'cPhone'){
        this.cPhone = event.target.value;  
      }
      if(event.target.name == 'lName'){
        this.lName = event.target.value;  
      }
      if(event.target.name == 'conBday'){
        this.conBday = event.target.value;  
      }
      if(event.target.name == 'cTitle'){
        this.cTitle = event.target.value;  
      }
  
  
  }
  
  submitAction(){
    submitScoreAction({fName:this.fName,conEmail:this.cEmail,conPhone:this.cPhone,lName:this.lName,conBday:this.conBday,conTilte:this.cTitle})
    .then(result=>{
        this.scoreRecoreId = result.Id;
        window.console.log('scoreRecoreId##Vijay2 ' + this.scoreRecoreId);       
       this.dispatchEvent(
        new ShowToastEvent({
            title:'Success',
            message:'Record saved successfully',
            variant:'success'
        })
       );
       this.fName='';
       this.lName='';
       this.cEmail='';
       this.cPhone='';
       this.cTitle='';
       this.conBday='';

       return refreshApex(this.getConData());
  })
    .catch(error =>{
       this.errorMsg=error.message;
       window.console.log(this.error);
    });
  
  }

}