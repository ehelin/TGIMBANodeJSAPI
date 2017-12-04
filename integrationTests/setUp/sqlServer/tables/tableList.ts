export const getDbTableList = () => {
    const createBrowserCapability = 'SELECT TABLE_NAME '
     + ' FROM INFORMATION_SCHEMA.TABLES '
     + ' WHERE TABLE_TYPE = \'BASE TABLE\''
     + ' AND TABLE_NAME NOT IN '
     + '(\'spt_fallback_db\','
     + '\'spt_fallback_dev\','
     + '\'spt_fallback_usg\','
     + '\'spt_monitor\','
     + '\'MSreplication_options\')';

    return createBrowserCapability;
};



