export const getCreateBucketListItem = () => {
    const createBucketListItem = 'CREATE TABLE [Bucket].[BucketListItem]( '
        + ' 	[BucketListItemId] [int] IDENTITY(1,1) NOT NULL, '
        + ' 	[ListItemName] [nvarchar](max) NULL, '
        + ' 	[Created] [datetime] NULL, '
        + ' 	[Category] [nvarchar](255) NULL, '
        + ' 	[Achieved] [bit] NULL, '
        + ' 	[CategorySortOrder] [int] NULL, '
        + ' 	[Latitude] [decimal](18, 10) NULL, '
        + ' 	[Longitude] [decimal](18, 10) NULL, '
        + ' 	CONSTRAINT [PK_BucketListItems] PRIMARY KEY CLUSTERED  '
        + ' 	( '
        + ' 		[BucketListItemId] ASC '
        + ' 	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]  '
        + ' 	) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]';

    return createBucketListItem;
};

export const getDropTableBucketListItem = () => {
    const deletecreateBucketListItem = 'IF OBJECT_ID(\'[Bucket].[BucketListItem]\', \'U\') IS NOT NULL '
                                      + 'DROP TABLE [Bucket].[BucketListItem];';

    return deletecreateBucketListItem;
};
