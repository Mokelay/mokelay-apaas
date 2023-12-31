// 登录接口 dsl
export default [
  {
    id: 3731,
    apiAlias: 'ty-login',
    index: 1,
    description: '读取用户信息',
    uuid: '1066',
    legoAlias: 'read',
    oiAlias: 'ty_user',
    legoName: '读取',
    oiName: '用户表',
    dsAlias: 'db_ty',
    _index: 1310,
    inputFields: [
      {
        id: 30932,
        name: '用户名',
        description: '',
        apiLegoId: 0,
        fieldName: 'userName',
        ct: 'eq',
        ift: 'condition',
        fvt: 'request',
        fromApiLegoId: 0,
        alias: 'userName',
        validate: '[{"validateName":"required","params":"用户名必填"}]',
        connectorPath: '',
        dt: 'string',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'userName',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6889',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '0',
        _index: 10465,
      },
      {
        id: 30933,
        name: '密码',
        description: '',
        apiLegoId: 0,
        fieldName: 'password',
        ct: 'eq',
        ift: 'condition',
        fvt: 'request',
        fromApiLegoId: 0,
        alias: 'password',
        validate: '[{"validateName":"required","params":"密码必填"},{"validateName":"md5Encrypt"}]',
        connectorPath: '',
        dt: 'string',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'password',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6890',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '0',
        _index: 10466,
      },
      {
        id: 30934,
        name: 'ID',
        description: '',
        apiLegoId: 0,
        fieldName: 'id',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'id',
        connectorPath: '',
        dt: '',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'id',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6891',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10467,
      },
      {
        id: 30935,
        name: '创建时间',
        description: '',
        apiLegoId: 0,
        fieldName: 'createDate',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'createDate',
        connectorPath: '',
        dt: '',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'createDate',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6892',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10468,
      },
      {
        id: 30936,
        name: '姓名',
        description: '',
        apiLegoId: 0,
        fieldName: 'xingMing',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'xingMing',
        connectorPath: '',
        dt: '',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'xingMing',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6893',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10469,
      },
      {
        id: 30937,
        name: '用户名',
        description: '',
        apiLegoId: 0,
        fieldName: 'userName',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'userName',
        connectorPath: '',
        dt: '',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'userName',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6894',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10470,
      },
      {
        id: 30938,
        name: '用户别名',
        description: '',
        apiLegoId: 0,
        fieldName: 'alias',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'alias',
        connectorPath: '',
        dt: '',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'alias',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6895',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10471,
      },
      {
        id: 30939,
        name: '租户序列号',
        description: '',
        apiLegoId: 0,
        fieldName: 'tenantSerialNumber',
        ct: 'eq',
        ift: 'read',
        fvt: '',
        fromApiLegoId: 0,
        alias: 'tenantSerialNumber',
        connectorPath: '',
        dt: 'string',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: '',
        requestParamName: 'tenantSerialNumber',
        sessionParamName: '',
        fieldTpl: '',
        uuid: 'A4389F2A-97FD-4B85-81F1-4065205DC11C1525487587170',
        apiLegoUuid: '1066',
        fromApiLegoUuid: '',
        _index: 10472,
      },
    ],
    outputFields: [
      {
        id: 5040,
        name: 'data',
        description: '',
        apiLegoId: 0,
        fieldName: 'data',
        oft: 'common',
        response: false,
        handle: '[{"handleName":"dataResultEqJudge","params":"NULL,账号或者密码错误"}]',
        alias: 'data',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1156',
        apiLegoUuid: '1066',
        _index: 1731,
      },
      {
        id: 5041,
        name: 'ID',
        description: '',
        apiLegoId: 0,
        fieldName: 'id',
        oft: 'read',
        response: false,
        handle: '',
        alias: 'id',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1157',
        apiLegoUuid: '1066',
        _index: 1732,
      },
      {
        id: 5042,
        name: '创建时间',
        description: '',
        apiLegoId: 0,
        fieldName: 'createDate',
        oft: 'read',
        response: false,
        handle: '',
        alias: 'createDate',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1158',
        apiLegoUuid: '1066',
        _index: 1733,
      },
      {
        id: 5043,
        name: '姓名',
        description: '',
        apiLegoId: 0,
        fieldName: 'xingMing',
        oft: 'read',
        response: true,
        handle: '',
        alias: 'xingMing',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1159',
        apiLegoUuid: '1066',
        _index: 1734,
      },
      {
        id: 5044,
        name: '用户名',
        description: '',
        apiLegoId: 0,
        fieldName: 'userName',
        oft: 'read',
        response: false,
        handle: '',
        alias: 'userName',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1160',
        apiLegoUuid: '1066',
        _index: 1735,
      },
      {
        id: 5045,
        name: '用户别名',
        description: '',
        apiLegoId: 0,
        fieldName: 'alias',
        oft: 'read',
        response: false,
        handle: '',
        alias: 'alias',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: '1161',
        apiLegoUuid: '1066',
        _index: 1736,
      },
      {
        id: 5046,
        name: '租户序列号',
        description: '',
        apiLegoId: 0,
        fieldName: 'tenantSerialNumber',
        oft: 'read',
        response: true,
        handle: '',
        alias: 'tenantSerialNumber',
        dt: 'string',
        outputFieldDescribeId: 0,
        uuid: 'F81DEFD0-FBF7-4B92-97D2-C119FECEB78B1525487652389',
        apiLegoUuid: '1066',
        _index: 1737,
      },
    ],
  },
  {
    id: 3732,
    apiAlias: 'ty-login',
    index: 2,
    description: '存储用户信息',
    uuid: '1067',
    legoAlias: 'sessionStore',
    legoName: '存session',
    _index: 1311,
    inputFields: [
      {
        id: 30940,
        name: 'TY用户信息',
        description: '',
        apiLegoId: 0,
        fieldName: 'TY_SESSION_CONFIG_USER',
        ct: 'eq',
        ift: 'common',
        fvt: 'output',
        fromApiLegoId: 0,
        alias: 'TY_SESSION_CONFIG_USER',
        validate: '[{"validateName":"dataToJson"}]',
        connectorPath: '',
        dt: 'string',
        constant: '',
        inputFieldDescribeId: 0,
        fromApiLegoOutputFieldAlias: 'data',
        requestParamName: '',
        sessionParamName: '',
        fieldTpl: '',
        uuid: '6896',
        apiLegoUuid: '1067',
        fromApiLegoUuid: '1066',
        _index: 10473,
      },
    ],
    outputFields: [],
  },
  {
    id: 3733,
    apiAlias: 'ty-login',
    index: 3,
    description: '登录后清空TY缓存',
    uuid: '1088',
    legoAlias: 'clearCache',
    legoName: '清除Cache缓存',
    _index: 1312,
    inputFields: [],
    outputFields: [],
  },
];
