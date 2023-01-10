import { api, LightningElement, track ,wire} from 'lwc';
import { refreshApex } from '@salesforce/apex';

export default class ContactRecordTableComp extends LightningElement {
    columns = [{
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
    @api conData;
  
    

}