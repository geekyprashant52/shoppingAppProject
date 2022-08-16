import { LightningElement, track, wire } from 'lwc';
import getcartData from '@salesforce/apex/cartController.getcartData';
import { refreshApex } from '@salesforce/apex';



export default class CartPage extends LightningElement {

    columns = [
        {label: 'Name', fieldName: 'Name__c', type: 'Text'},
        {label: 'Quantity', fieldName: 'itemCount__c', type: 'Number'},
        {label: 'Price', fieldName: 'Cost__c', type: 'Currency'}
    ]

    storeDatalist;
    error;
    finalPrice = 0;


    cartDatarefresh;







    @wire(getcartData) 
    cartData({ error, data }) {
        if (data) {
            this.cartDatarefresh = data;
            this.storeDatalist = data;
            this.error = undefined;
            this.getFinalPrice(data)
            console.log("Connected")
        } else if (error) {
            this.error = error;
            this.storeDatalist = undefined;
            console.log(this.error);
        }
    }


    getFinalPrice(data)
    {
        data.map((item)=>{
            this.finalPrice += item.Cost__c * item.itemCount__c;
        })
    }
    

    handleRefreshData()
    {
        //eval("$A.get('e.force:refreshView').fire();");
        refreshApex(this.storeDatalist);
    }

    // getItemCount(data)
    // {
    //     let counter = {};
    //     let sampleData = [...data];
    //     let finalData = [];

    //     sampleData.forEach(function(obj) {
    //         var key = obj.AtlasItemId__c;
    //         counter[key] = (counter[key] || 0) + 1
    //     })

    //     let sortedArray = [...new Map(sampleData.map(item => [item['AtlasItemId__c'], item])).values()]

    //     sortedArray.map((item)=>{
    //         let altlasId = item.AtlasItemId__c;
    //         //item.itemCount__c = counter[altlasId];
    //         let item2 = JSON.parse(JSON.stringify(item));
    //         item2.itemCount__c = counter[altlasId];
    //         finalData.push(item2)
    //     })

    //     finalData.map((item)=>{
    //         this.finalPrice += item.Cost__c * item.itemCount__c;
    //     })

    //     this.storeDatalist = finalData;
    //     //console.log(this.storeDatalist)

    // }

    
   


    

}