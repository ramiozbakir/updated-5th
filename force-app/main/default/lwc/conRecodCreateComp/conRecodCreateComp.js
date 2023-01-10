import { api, LightningElement, track ,wire} from 'lwc';
import submitScoreAction from '@salesforce/apex/CreateRecordByApex.submitScoreAction';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ConRecodCreateComp extends LightningElement {
    //.... for saving record.....
    @track fName='';
    @track cEmail='';
    @track cPhone='';
    @track lName='';
    @track conBday='';
    @track cTitle='';
    @track scoreRecoreId;
    @track errorMsg;
    @api sendDatatoParent;

    scoreHandleChange(event){
        if(event.target.name == 'fName'){
        this.fName = event.target.value; 
        window.console.log('scoreRecoreId##Vijay2 ' + this.fName);        
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
       const selectedEvent = new CustomEvent('savedrecord', { detail: result});
       // Dispatches the event.
       this.dispatchEvent(selectedEvent);
      
  })
    .catch(error =>{
       this.errorMsg=error.message;
       window.console.log(this.error);
    });
 
  }
  
}