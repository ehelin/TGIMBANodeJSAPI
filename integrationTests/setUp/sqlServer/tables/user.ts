export const getCreateTableUser = () => {
    const createBucketListUser = 'CREATE TABLE [Bucket].[User](   '
        +  '  [UserId] [int] IDENTITY(1,1) NOT NULL,   '
        +  '  [UserName] [nvarchar](255) NULL,   '
        +  '  [Salt] [nvarchar](max) NULL,   '
        +  '  [PassWord] [nvarchar](max) NULL,   '
        +  '  [Email] [nvarchar](255) NULL,   '
        +  '  [Token] [nvarchar](1000) NULL,   '
        +  '  [Created] [datetime] NULL,   '
        +  '  [CreatedBy] [nvarchar](255) NULL,   '
        +  '  [Modified] [datetime] NULL,   '
        +  '  [ModifiedBy] [nvarchar](255) NULL,   '
        +  '  CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED    '
        +  '  (   '
        +  '  [UserId] ASC   '
        +  '  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]   '
        +  '  ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]  ';

return createBucketListUser;
};

export const getDropTableUser = () => {
    const deleteUser = 'IF OBJECT_ID(\'[Bucket].[User]\', \'U\') IS NOT NULL '
        + 'DROP TABLE [Bucket].[User];';

    return deleteUser;
};


