export const getCreateTableBucketListUser = () => {
    const createBucketListUser = 'CREATE TABLE [Bucket].[BucketListUser](   '
	    +  '  [BucketListUserId] [int] IDENTITY(1,1) NOT NULL,  '
        +  '  [BucketListItemId] [int] NULL,  '
        +  '  [UserId] [int] NULL,  '
        +  '  CONSTRAINT [PK_BucketListUser] PRIMARY KEY CLUSTERED   '
        +  '  (  '
        +  '  [BucketListUserId] ASC  '
        +  '  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]  '
        +  '  ) ON [PRIMARY]  ';

    return createBucketListUser;
};

export const getDropTableBucketListUser = () => {
    const deleteBucketListUser = 'IF OBJECT_ID(\'[Bucket].[BucketListUser]\', \'U\') IS NOT NULL '
        + 'DROP TABLE [Bucket].[BucketListUser];';

    return deleteBucketListUser;
};

