import { LightningElement, api,wire } from 'lwc';
import saveAtlasItem from '@salesforce/apex/cartController.saveAtlasItem';
import getcartData from '@salesforce/apex/cartController.getcartData';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class ItemCard extends LightningElement {
    
    @api item;

    cartDatalist;
    error;

    @wire(getcartData) 
    cartData({ error, data }) {
        if (data) {
            this.cartDatalist = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.cartDatalist = undefined;
            console.log(this.error);
        }
    }



    handleCartClick()
    {
        let data = JSON.parse(JSON.stringify(this.item))
        let itemId = data.Id;
        let cartcount = 1;

        let cartItemObj = {
            AtlasItemId__c: data.Id, 
            Name__c: data.Name__c, 
            Description__c: data.Description__c, 
            Cost__c: data.Cost__c, 
            Image__c: data.Image__c, 
            Item_rarity__c: data.Item_rarity__c, 
            Type__c: data.Type__c, 
            Rating__c: data.Rating__c,
            itemCount__c: cartcount
        }

        this.saveCartItems(cartItemObj)
       
        

        // if(this.cartDatalist.length > 0){
        //     console.log(this.cartDatalist)
        //     let objectId;
        //     this.cartDatalist.map((item)=>{
        //         if(item.AtlasItemId__c == itemId){
        //             cartcount = item.itemCount__c + cartcount;
        //             objectId = item.Id;
        //             //console.log(cartcount);
        //         }
        //     })
        //     if(cartcount>1){
        //        //update
        //        const fields = {};
        //         fields[ID_FIELD.fieldApiName] = objectId;
        //         fields[ATLASITEMID_FIELD.fieldApiName] = data.Id;
        //         fields[CARTCOUNT_FIELD.fieldApiName] = cartcount;

        //         const recordInput = { fields };
        //         this.updateCartData(recordInput)
        //         console.log("Updating data")
        //     }
        //     else{
        //         this.saveCartItems(cartItemObj)
        //         console.log("Just saving")
        //     }
        // }
        // else{
        //     //fresh save 
        //     console.log("fresh save ")
        //     this.saveCartItems(cartItemObj)
        // }
        

        
        
        //console.log(itemId);
    }

    saveCartItems(cartItemObj)
    {
        saveAtlasItem({cartItemObj: cartItemObj})
        .then((result)=>{
            const toastEvent = new ShowToastEvent({
              title:'Success',
              message:'Item added successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch((error)=>{
            const toastEvent = new ShowToastEvent({
              title:'Error!',
              message:'Item not added ' + error,
              variant:'error'
            });
            this.dispatchEvent(toastEvent);
            console.log(error)
        })
    }

    // updateCartData(recordInput)
    // {
    //     updateRecord(recordInput)
    //             .then(() => {
    //                 this.dispatchEvent(
    //                     new ShowToastEvent({
    //                         title: 'Success',
    //                         message: 'Item Updated successfully',
    //                         variant: 'success'
    //                     })
    //                 );
    //                 // Display fresh data in the form
    //                 //return refreshApex(this.contact);
    //             })
    //             .catch(error => {
    //                 this.dispatchEvent(
    //                     new ShowToastEvent({
    //                         title: 'Error Updating cart',
    //                         message: error.body.message,
    //                         variant: 'error'
    //                     })
    //                 );
    //             });
    // }
}