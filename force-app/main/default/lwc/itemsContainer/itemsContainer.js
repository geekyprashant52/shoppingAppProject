import { LightningElement, wire, track } from 'lwc';
import getItemList from '@salesforce/apex/itemListController.getItemList';
export default class ItemsContainer extends LightningElement {


    @track storeDatalist;
    error;
    @track sortValue;
    duplicateDatalist;

    get options() {
        return [
            { label: 'Outfit', value: 'outfit' },
            { label: 'Backpack', value: 'backpack' },
            { label: 'Bundle', value: 'bundle' },
            { label: 'Emote', value: 'emote' },
            { label: 'Glider', value: 'glider' },
            { label: 'Music', value: 'music' },
            { label: 'Pickaxe', value: 'pickaxe' },
            { label: 'Wrap', value: 'wrap' },
        ];
    }

    @wire(getItemList) 
    itemsList({ error, data }) {
        if (data) {
            this.storeDatalist = data;
            this.duplicateDatalist = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.storeDatalist = undefined;
            console.log(this.error);
        }
    }


    sortDataByCategory(category)
    {
        this.storeDatalist = this.duplicateDatalist;
        let sortedData = this.storeDatalist.filter((item)=>{
            return item.Type__c === category
        })
        this.storeDatalist = sortedData;
        //console.log(JSON.parse(JSON.stringify(this.storeDatalist)))
    }

    handleSortChange(event)
    {
        this.sortValue = event.detail.value;
        this.sortDataByCategory(this.sortValue);
        //console.log(this.sortValue)
    }
    
}