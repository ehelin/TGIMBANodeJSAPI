export const getCreateTableLog = () => {
    const createLog = 'CREATE TABLE [Bucket].[Log](  '
        +  '  [LogId] [bigint] IDENTITY(1,1) NOT NULL,  '
        +  '  [LogMessage] [nvarchar](max) NULL,  '
        +  '  [Created] [datetime] NULL,  '
        +  '  CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED   '
        +  '  (  '
        +  '  [LogId] ASC  '
        +  '  )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]  '
        +  '  ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]  ';

    return createLog;
};

export const getDropTableLog = () => {
    const deleteLog = 'IF OBJECT_ID(\'[Bucket].[Log]\', \'U\') IS NOT NULL '
        + 'DROP TABLE [Bucket].[Log];';

    return deleteLog;
};


