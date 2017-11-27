// TODO - handle password/salt and 'other' sql server table properties
export interface createBucketList {
    user: string,
    bucketListItems: [BucketListItem],
}

export interface BucketListItem {
    ListItemName: string,
    Created: string,            // TODO handle date
    Category: string,
    CategorySortOrder: string,  // TODO handle integer
    Achieved: string,
    BucketListItemId: string,   // TODO handle integer
    UserName: string,
}

export interface BucketListId {
    BucketListItemId: string,
}