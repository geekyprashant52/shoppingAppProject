public class cartController {

    public class customException extends Exception {}
    @AuraEnabled
    public static void saveAtlasItem(myCart__c cartItemObj){
        try{
            insert cartItemObj;
        }
        catch(DmlException e){
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<myCart__c> getcartData(){
        return [SELECT Name__c, Description__c, Cost__c, AtlasItemId__c, Image__c, Item_rarity__c, itemCount__c, Type__c, Rating__c FROM myCart__c];
    }

    @AuraEnabled
    public static void removeCartItems(String itemId, Integer quantity){
        if(quantity>1){
            try {
                List<myCart__c> cartList = [SELECT Id, Name__c, AtlasItemId__c,itemCount__c FROM myCart__c where AtlasItemId__c = :itemId];
                if(cartList.size() > 0){
                    for(myCart__c cartItem: cartList)
                    {
                        if(quantity > cartItem.itemCount__c)
                        {
                            throw new customException('Quantity exceeded!');
                        }
                        else 
                        {
                            cartItem.itemCount__c = cartItem.itemCount__c - quantity;
                        }

                    }
                    update cartList;
                }
                
            } catch (Exception e) {
                throw new customException('Item not deleted ' + e.getMessage());
            }
        }
        else
        {
           try {
                List<myCart__c> cartList = [SELECT Id, Name__c, AtlasItemId__c,itemCount__c FROM myCart__c where AtlasItemId__c = :itemId];
                if(cartList.size() > 0){
                    delete cartList;
                }
                
            } catch (Exception e) {
                throw new customException('Item not deleted ' + e.getMessage());
            }
        }
        
    }
}
