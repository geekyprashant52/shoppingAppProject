import { api, LightningElement } from 'lwc';

export default class CartTable extends LightningElement {
    columns = [
        {label: 'Name', fieldName: 'Name__c', type: 'Text'},
        {label: 'Quantity', fieldName: 'itemCount__c', type: 'Number'},
        {label: 'Price', fieldName: 'Cost__c', type: 'Currency'}
    ]


    @api storeDatalist;
    @api finalPrice;
}