public class itemListController {
    @AuraEnabled(cacheable = true)
    public static List<AtlasItem__c> getItemList(){
        return [SELECT Id, Name__c, Cost__c, Description__c, Type__c, Image__c, Rating__c, Item_rarity__c FROM AtlasItem__c];
    }
}
