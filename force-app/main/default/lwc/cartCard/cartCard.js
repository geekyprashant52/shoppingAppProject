import { LightningElement,api } from 'lwc';
import LightningPrompt from 'lightning/prompt';
import LightningConfirm from 'lightning/confirm';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import removeCartItems from '@salesforce/apex/cartController.removeCartItems';

export default class CartCard extends LightningElement {
    @api item;

    handleDelete()
    {
        let data = JSON.parse(JSON.stringify(this.item));
        if(data.itemCount__c > 1){
            this.handlePromptClick(data);
        }
        else
        {
            this.handleConfirmClick(data);
        }
        
    }

    async handlePromptClick(data)
    {
        const result = await LightningPrompt.open({
                message: 'Please select quantity to remove from cart.\n\n Items available: ' + data.itemCount__c,
                label: 'Please select quantity', // this is the header text
                theme: 'warning', 
                defaultValue: 1, //this is optional
            });
            const regex = new RegExp(/[^0-9]/, 'g');
            if(result != null)
            {
                if ( result.trim().match(regex) || result.trim().length == 0) 
                { //not valid
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Please enter a valid number!',
                            variant: 'error'
                        })
                    );
                }
                else
                { //valid
                    if(parseInt(result) <= data.itemCount__c)
                    { // valid delete data here only
                        let atlastId = data.AtlasItemId__c;
                        removeCartItems({itemId: atlastId, quantity: parseInt(result)})
                        .then((response)=>{
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Success',
                                    message: result + ' Items removed successfully',
                                    variant: 'success'
                                })
                            );
                        })
                        .catch((error)=>{
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Item not removed!',
                                    message: error.body.message,
                                    variant: 'error'
                                })
                            );
                            console.log(error)
                        })
                            
                            //console.log(data.AtlasItemId__c)
                    }
                    else
                    {//not valid
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error',
                                message: 'Quantity cannot exceed '+ data.itemCount__c,
                                variant: 'error'
                            })
                        );
                    }
                }
            }
           
    }

     async handleConfirmClick(data) {
        const result = await LightningConfirm.open({
            message: 'Are you sure?',
            label: 'Confirm delete',
            theme: 'warning'
            // setting theme would have no effect
        });
        //result is true if OK was clicked
        //and false if cancel was clicked
        if(result)
        {
            let atlastId = data.AtlasItemId__c;
                        removeCartItems({itemId: atlastId, quantity: 1})
                        .then((response)=>{
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Success',
                                    message: '1 Item removed successfully',
                                    variant: 'success'
                                })
                            );
                        })
                        .catch((error)=>{
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Item not removed!',
                                    message: error.body.message,
                                    variant: 'error'
                                })
                            );
                            console.log(error)
                        })
        }
        //console.log('Result: '+ result);
        //Confirm has been closed
        
    }
}