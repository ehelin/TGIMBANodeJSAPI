import {getCredentials} from "../credentials";
export const GET_USER_COUNT = 'SELECT [UserName] FROM [Bucket].[User];';

export const USER_EXISTS_PART_1 = 'SELECT [PassWord]  FROM [Bucket].[User] where [UserName] = ';
export const USER_EXISTS_PART_2 = ' and [PassWord] = ';

export const INSERT_USER = ' declare @beforeCount int '
    + ' declare @afterCount int '
    + '  '
    + ' select @beforeCount = count(*) from [Bucket].[User]  '
    + '  '
    + ' if not exists (select UserName  '
    + '                 from [Bucket].[User]  '
    + ' 				where UserName = @userName) '
    + ' begin '
    + ' 	Insert into [Bucket].[User]  '
    + ' 	select @userName, @salt, @passWord, @email, null, getdate(), \'Website\', getdate(), \'Website\' '
    + ' end '
    + '    '
    + ' select @afterCount = count(*) from [Bucket].[User]  '
    + '  '
    + ' if (@afterCount-1 = @beforeCount) '
    + ' 	select 1 result '
    + ' else '
    + ' 	select 0 result ';

export const DELETE_BUCKET_LIST_ITEM = 'delete from Bucket.BucketListUser '
    + ' where BucketListItemId = @BucketListItemId '
    + '  '
    + ' delete from Bucket.BucketListItem  '
    + ' where BucketListItemId = @BucketListItemId ';

export const GET_BUCKET_LIST = 'select bli.ListItemName, '
    + ' bli.Created, '
    + ' bli.Category, '
    + ' bli.Achieved, '
    + ' bli.BucketListItemId '
    + ' from Bucket.BucketListItem bli '
    + ' inner join Bucket.BucketListUser blu on bli.BucketListItemId = blu.BucketListItemId '
    + ' inner join [Bucket].[User] u on blu.UserId = u.UserId '
    + ' where u.UserName = @userName  ';

export const UPSERT_BUCKET_LIST_ITEM = ' declare @InsertDbId int '
    + ' declare @UserDbId int '
    + '  '
    + ' if (select count(*)  '
    + '           from [Bucket].[BucketListItem]  '
    + '           where BucketListItemId = @BucketListItemId) > 0 '
    + ' begin  '
    + '     update [Bucket].[BucketListItem] '
    + '     set ListItemName = @ListItemName, '
    + '         Created = @Created, '
    + '         Category = @Category, '
    + '         Achieved = @Achieved '
    + '     where BucketListItemId = @BucketListItemId '
    + ' end '
    + ' else '
    + ' begin '
    + '     INSERT INTO [Bucket].[BucketListItem] '
    + '     select @ListItemName, '
    + '             @Created, '
    + '             @Category, '
    + '             @Achieved, '
    + '              case @Category '
    + '                 when \'Hot\' then 1 '
    + '                 when \'Warm\' then 2 '
    + '                 when \'Cool\' then 3 '
    + '              end '
    + '      '
    + '     select @UserDbId = UserId '
    + '     from [Bucket].[User] '
    + '     where UserName = @UserName '
    + '      '
    + '     SELECT @InsertDbId = SCOPE_IDENTITY()     '
    + '     insert into Bucket.BucketListUser '
    + '     select @InsertDbId, @UserDbId '
    + ' end ';

export function getSqlServerConfig()
{
    var config = getCredentials();

    return config;
}
