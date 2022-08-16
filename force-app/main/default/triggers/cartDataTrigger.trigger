trigger cartDataTrigger on myCart__c (before insert) {
    List<myCart__c> oldCartList = [SELECT Id, Name__c, AtlasItemId__c,itemCount__c FROM myCart__c];
    List<myCart__c> itemsTobeDeleted = new List<myCart__c>();
    if(oldCartList.size()>0){
        for(myCart__c oldItem: oldCartList){
            for(myCart__c cartItem: Trigger.new)
            {
                if(oldItem.AtlasItemId__c == cartItem.AtlasItemId__c){
                    Double oldCount = oldItem.itemCount__c;
                    cartItem.itemCount__c = oldCount + 1;
                    itemsTobeDeleted.add(oldItem);
                }
            }
        }

        if(itemsTobeDeleted.size()>0)
        {
            delete itemsTobeDeleted;
        }
        
        
    }

    
    
}