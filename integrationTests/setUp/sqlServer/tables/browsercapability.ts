export const getCreateTableBrowserCapability = () => {
    const createBrowserCapability = 'CREATE TABLE [Bucket].[BrowserCapability]( '
                            + ' 	[BrowserCapabilityId] [bigint] IDENTITY(1,1) NOT NULL, '
                            + ' 	[BrowserLogId] [bigint] NULL, '
                            + ' 	[Key] [varchar](100) NULL, '
                            + ' 	[Value] [varchar](500) NULL, '
                            + '  CONSTRAINT [PK_BrowserCapability] PRIMARY KEY CLUSTERED  '
                            + ' ( '
                            + ' 	[BrowserCapabilityId] ASC '
                            + ' )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] '
                            + ' ) ON [PRIMARY] ';

    return createBrowserCapability;
};

export const getDropTableBrowserCapability = () => {
    const deleteBrowserCapability = 'IF OBJECT_ID(\'[Bucket].[BrowserCapability]\', \'U\') IS NOT NULL '
                                    + 'DROP TABLE [Bucket].[BrowserCapability];';

    return deleteBrowserCapability;
};


