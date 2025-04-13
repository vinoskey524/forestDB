// deno-lint-ignore-file no-unused-vars no-explicit-any ban-types prefer-const no-empty require-await

import { web_cipherFunc, web_decipherFunc, web_createHashFunc, crypto_cipherFunc, crypto_decipherFunc, crypto_createHashFunc, bufferToHexFunc, hexToBufferFunc } from './dbc.ts';

/* --------------------------------------------- Types --------------------------------------------- */

type STRING_ARR_TYPE = string | string[];
type NUMBER_ARR_TYPE = number | number[];
type ANY_ARR_TYPE = any | any[];


type BRANCH_SCHEMA_TYPE = {
    [branchName: string]: {
        [key: string]: ['string', string] | ['number', number] | ['boolean', boolean] | ['array', Array<any>] | ['json', { [key: string]: any }] | ['any', string | number | boolean | object | null],
    } & { __local__?: { [key: string]: any } }
};


type MAIN_TYPE = {
    /**
    * Add a method to the chain 
    * @returns 
    */
    _chain: (x: any) => void,


    /**
    * Do bulk operations (bulkOps)
    * @returns
    */
    bulk: () => void,


    /**
    * Store simple "key: value" pair
    * @returns
    */
    store: (x: JSON_BASIC_TYPE, y?: (number | string)[]) => FUNCTION_BASIC_RETURN_TYPE,


    /**
    * Store user session data as simple "key: value" pair
    * @returns
    */
    session: (x: JSON_BASIC_TYPE, y?: (number | string)[]) => FUNCTION_BASIC_RETURN_TYPE,


    /**
    * Store simple "key: value" pair
    * @returns
    */
    return: (x: RETURN_ARG_TYPE) => RETURN_RETURN_TYPE,


    /**
    * Return a list of multiple methods
    * @returns
    */
    method: () => METHOD_RETURN_TYPE,


    /**
    * Select a tree
    * @param x - The tree name
    * @param options? - Additional options
    * @returns
    */
    onTree: (x: string, options?: { transactionId?: string }) => ONTREE_RETURN_TYPE,


    /**
    * Insert new data
    * @param x - data as object or array of objects
    * @param options 
    * @returns 
    */
    set: (x: JSON_BASIC_TYPE, options?: {}) => SET_RETURN_TYPE,


    /**
    * Update existing data
    * @param x 
    * @returns 
    */
    update: (x: UPDATE_ARG_TYPE) => UPDATE_RETURN_TYPE,


    /**
    * Update all existing data, matching a certain condition if provided, on a branch.
    * @param x
    * @returns 
    */
    updateAll: (x: UPDATE_ALL_ARG_TYPE) => UPDATE_ALL_RETURN_TYPE,


    /**
    * Get data
    * @param x 
    * @returns 
    */
    get: (x: GET_ARG_TYPE) => GET_RETURN_TYPE,


    /**
    * Delete data
    * @param x 
    * @returns 
    */
    delete: <T extends DELETE_ARG_X_TYPE>(x: T, y?: DELETE_ARG_Y_TYPE) => DELETE_RETURN_TYPE<T>,


    /**
    * Sort data
    * @param x 
    * @returns 
    */
    orderBy: (x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE) => ORDERBY_RETURN_TYPE,


    /**
    * Limit the number of fetchable data
    * @param x = number or percentage
    * @returns 
    */
    limit: (x: LIMIT_ARG_TYPE) => LIMIT_RETURN_TYPE,


    /**
    * Join another querie
    * @param x = join id
    * @returns 
    */
    join: (x: string) => JOIN_RETURN_TYPE,


    /**
    * Run transaction asynchroniously
    * @returns 
    */
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>,


    /**
    * Mutation
    * @returns 
    */
    mutation: () => MUTATION_RETURN_TYPE,


    /**
    * Condition
    * @returns 
    */
    condition: () => CONDITION_RETURN_TYPE,


    /**
    * Watch feed, branch and store
    * @returns
    */
    watch: (x?: string) => WATCH_RETURN_TYPE,


    /**
    * Use Watcher
    * @returns
    */
    useWatcher: (x: USE_WATCHER_ARG_TYPE) => USE_WATCHER_RETURN_TYPE,


    /**
    * Trigger
    * @returns
    */
    trigger: (x?: TRIGGER_ARG_X_TYPE, y?: TRIGGER_ARG_Y_TYPE) => TRIGGER_RETURN_TYPE,


    /**
    * Extract
    * @returns
    */
    extract: <T extends EXTRACT_ARG_X_TYPE>(...args: EXTRACT_ALL_ARG_TYPE<T>) => FUNCTION_BASIC_RETURN_TYPE,


    /**
    * Manage ws
    * @returns
    */
    ws: () => WS_RETURN_TYPE,


    /**
    * Manage fs
    * @returns
    */
    fs: () => FS_RETURN_TYPE,


    /**
    * Manage http request
    * @returns
    */
    http: () => HTTP_RETURN_TYPE


    /**
    * Execute query between Clients and Servers
    * @returns
    */
    // query: () => QUERY_RETURN_TYPE,
    query: () => void,
};


type PLG_WS_TYPE = {
    /** Configure WebSocket server */
    as_server?: { websocket: any, port: number },
    /** Configure WebSocket client(s) */
    as_client?: {
        /** websocket */
        websocket: any,
        /** Servers to connect to */
        servers: { id: string, host: string, port?: number } | { id: string, host: string, port?: number }[],
    }
};
type PLG_HTTP_TYPE = {
    /** Configure http server */
    as_server?: {
        /** Choose the server that matches your runtime */
        deno?: { api: any, response: any }, /** use "Deno" instance as API */
        node?: { express: any, cors: any, bodyParser: any, formidable: any, compression?: any, helmet?: any },
        bun?: { api: any, response: any }, /** use "Bun" instance as API */
        /** Port */
        port: number,
        /** Endpoint - The default route name */
        endpoint?: string,
        /** Default "0.0.0.0" (Listen to all available network interfaces) - Can be the domain name or the address of your server */
        host?: string,
        /** Max request timeout in milliseconds - 30_000ms by default */
        timeout?: number,
        /** Maximum request size limit in MB - Default "256MB" */
        requestSizeLimit?: number,
        /** Static files to serve */
        staticFiles?: {
            /** Default is "static" - Then you can access files for example via "http://locahost/static/myfile.png" */
            routeName?: string,
            /** The path of the directory containing static files */
            path: string
        }
    },
    /** Configure http client */
    as_client?: {
        /** Axios API */
        axios: any,
        /** Web document API */
        document?: any,
        /** Servers to connect to */
        servers: { id: string, url: string, endpoint?: string } | { id: string, url: string, endpoint?: string }[],
    }
};
type PLG_FS_TYPE = {
    /** For "Deno" and "Bun" */
    api?: any,
    /** "fs/Promise" package */
    fs?: any,
    /** Location to store "forest" folder */
    storagePath?: string
    /** FNSS (Filename Secure Storage) - If true, unlock the storage function */
    // FNSS?: boolean
};
type INIT_ARG_TYPE = {
    /**
    * The main key (mk) for each feed.
    * Ensure yourself that the "mk" is unique in your forest to avoid collision or data overwritting.
    */
    mainKey: string,
    /** Server id - used for session */
    // serverId?: string,
    /** Default date formats */
    dateFormat: CONDITION_DATE_FORMAT[],
    /** Schema of all branches */
    // schema?: BRANCH_SCHEMA_TYPE,
    /** The LIB (Let It Breath) */
    // LIB?: { rate: number, ms: number },
    /** Plugins */
    plugins?: {
        /** Runtime */
        runtime: RUN_TIME_TYPE,
        /** WebSocket for forest inter-connection */
        ws?: PLG_WS_TYPE,
        /** http */
        http?: PLG_HTTP_TYPE,
        /** File system */
        fs?: PLG_FS_TYPE
        /** Crypto */
        crypto?: {
            crypto?: any,
            /** A 32 length alphanumeric string - (Recommended)*/
            secretKey?: string,
            /** If "true", enable crypto */
            enable: boolean
        }
    }
};


type DB_TYPE = {
    init: (x?: INIT_ARG_TYPE) => Pick<MAIN_TYPE,
        'store' | 'session' | 'return' | 'method' | 'onTree' | 'mutation' | 'condition'
        | 'watch' | 'useWatcher' | 'trigger' | 'extract' | 'ws' | 'fs' | 'http'
    >
};


type RETURN_ARG_TYPE = '*' | string | string[];
type RETURN_RETURN_TYPE = {
    fromFeed: (x: string) => FUNCTION_BASIC_RETURN_TYPE,
    fromStore: () => FUNCTION_BASIC_RETURN_TYPE,
    fromSession: () => FUNCTION_BASIC_RETURN_TYPE
};


type METHOD_RETURN_TYPE = {
    /** Generated a random id - Return a string*/
    generateId: () => string,

    /** 
    * Check if a Json object has  
    * @param x A json Object
    * @param y The key you're searching for
    * @return boolean
    */
    hasProperty: (x: JSON_BASIC_TYPE, y: string) => boolean,

    /**
    * Clone a json object or an array
    * @param x A json or an array
    * @returns The cloned object or an empty array or an empty json if an error occur
    */
    cloneObject: (x: JSON_BASIC_TYPE | any[]) => JSON_BASIC_TYPE | any[],

    /**
    * Merge two json object.
    *
    * This function doesn't modify the original json objects
    * @param x Target
    * @param y Source
    * @returns 
    */
    mergeJson: (x: { target: JSON_BASIC_TYPE, source: JSON_BASIC_TYPE }) => JSON_BASIC_TYPE,

    // /**
    // * Delete a json field
    // *
    // * It doesn't modify the original json object
    // * @param target The json object
    // * @param path The path to the field
    // * @returns An object like { status: 'success' | 'error', log: string, data: JSON_BASIC_TYPE }
    // */
    // deleteJsonField: (x: { target: JSON_BASIC_TYPE, path: string | (string | number)[] }) => JSON_BASIC_TYPE,

    /**
    * Return the type of a variable
    * 
    * @param x The variable
    * @returns The data type
    */
    getTypeOf: (x: any) => string,

    /**
    * Check if a string is alphanumeric
    * @param x The string
    * @returns 
    */
    isAlphanumeric: (x: string) => boolean,

    /** 
    * Hash a string
    *
    * @param x The string
    * @returns The hashed string
    */
    createHash: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>
};


type ONTREE_RETURN_TYPE = Pick<MAIN_TYPE, 'set' | 'update' | 'updateAll' | 'get' | 'delete'>;


type JOIN_RETURN_TYPE = ONTREE_RETURN_TYPE;


type WHERE_ARG_PRE_TYPE = { [key: string]: string | number | boolean | object | undefined | void };
type WHERE_ARG_TYPE = WHERE_ARG_PRE_TYPE | WHERE_ARG_PRE_TYPE[];


type SET_RETURN_TYPE_FOR_ONBRANCH = Pick<MAIN_TYPE, 'join' | 'end'>;
type SET_RETURN_TYPE = { onBranch: (x: string) => SET_RETURN_TYPE_FOR_ONBRANCH };


type UPDATE_ARG_TYPE = JSON_BASIC_TYPE | JSON_BASIC_TYPE[];
type UPDATE_RETURN_TYPE_FOR_WHERE = Pick<MAIN_TYPE, 'join' | 'end'>;
type UPDATE_RETURN_TYPE = {
    where: (x: WHERE_ARG_TYPE) => UPDATE_RETURN_TYPE_FOR_WHERE,
    join: (x: string) => JOIN_RETURN_TYPE,
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>
};


type UPDATE_ALL_ARG_TYPE = JSON_BASIC_TYPE;
type UPDATE_ALL_RETURN_TYPE_FOR_WHERE = Pick<MAIN_TYPE, 'orderBy' | 'limit' | 'join' | 'end'>;
type UPDATE_ALL_RETURN_TYPE_FOR_ONBRANCH = {
    where: (x: WHERE_ARG_TYPE) => UPDATE_ALL_RETURN_TYPE_FOR_WHERE,
    orderBy: (x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE) => ORDERBY_RETURN_TYPE,
    limit: (x: LIMIT_ARG_TYPE) => LIMIT_RETURN_TYPE,
    join: (x: string) => JOIN_RETURN_TYPE,
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type UPDATE_ALL_RETURN_TYPE = {
    onBranch: (x: string) => UPDATE_ALL_RETURN_TYPE_FOR_ONBRANCH
};


type GET_ARG_TYPE = '*' | string | Array<string>;
type GET_RETURN_TYPE_FOR_WHERE = Pick<MAIN_TYPE, 'orderBy' | 'limit' | 'join' | 'end'>;
type GET_RETURN_TYPE_FOR_ONBRANCH = {
    where: (x: WHERE_ARG_TYPE) => GET_RETURN_TYPE_FOR_WHERE,
    orderBy: (x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE) => ORDERBY_RETURN_TYPE,
    limit: (x: LIMIT_ARG_TYPE) => LIMIT_RETURN_TYPE,
    join: (x: string) => JOIN_RETURN_TYPE,
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type GET_RETURN_TYPE = {
    fromBranch: (x: string) => GET_RETURN_TYPE_FOR_ONBRANCH
};


type DELETE_ARG_X_TYPE = 'field' | 'feed' | 'branch';
type DELETE_ARG_Y_TYPE = '*' | string | string[];
type DELETE_FEED_RETURN_TYPE_FOR_FROMBRANCH = {
    where: (x: WHERE_ARG_TYPE) => DELETE_FEED_RETURN_TYPE_FOR_WHERE,
    orderBy: (x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE) => ORDERBY_RETURN_TYPE,
    limit: (x: LIMIT_ARG_TYPE) => LIMIT_RETURN_TYPE,
    join: (x: string) => JOIN_RETURN_TYPE,
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type DELETE_FEED_RETURN_TYPE_FOR_WHERE = Pick<MAIN_TYPE, 'orderBy' | 'limit' | 'join' | 'end'>;
/* - */
/* type DELETE_FIELD_RETURN_TYPE_FOR_FROMBRANCH = { where: (x: WHERE_ARG_TYPE) => Pick<MAIN_TYPE, 'join' | 'end'> }; */
type DELETE_FIELD_RETURN_TYPE_FOR_FROMBRANCH = {
    where: (x: WHERE_ARG_TYPE) => DELETE_FEED_RETURN_TYPE_FOR_WHERE,
    orderBy: (x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE) => ORDERBY_RETURN_TYPE,
    limit: (x: LIMIT_ARG_TYPE) => LIMIT_RETURN_TYPE,
    join: (x: string) => JOIN_RETURN_TYPE,
    end: () => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type DELETE_FIELD_RETURN_TYPE_FOR_WHERE = Pick<DELETE_FEED_RETURN_TYPE_FOR_WHERE, 'orderBy' | 'limit' | 'join' | 'end'>;
/* - */
type DELETE_RETURN_TYPE<T> = T extends 'field' ? { fromBranch: (x: string) => DELETE_FEED_RETURN_TYPE_FOR_FROMBRANCH }
    : T extends 'feed' ? { fromBranch: (x: string) => DELETE_FEED_RETURN_TYPE_FOR_FROMBRANCH }
    : T extends 'branch' ? { join: (x: string) => JOIN_RETURN_TYPE, end: () => Promise<FUNCTION_BASIC_RETURN_TYPE> }
    : {};


type ORDERBY_ARG_X_TYPE = string;
type ORDERBY_ARG_Y_TYPE = 'ASC' | 'DESC';
type ORDERBY_RETURN_TYPE = Pick<MAIN_TYPE, 'limit' | 'join' | 'end'>;


type LIMIT_ARG_TYPE = number;
type LIMIT_RETURN_TYPE = Pick<MAIN_TYPE, 'join' | 'end'>;


type ARRAY_TWO_STRING_TYPE = [string, string];
type ARRAY_TWO_NUMBER_TYPE = [number, number];


type MUTATION_ACTION_TYPE_FOR_NUMBER = 'set' | 'increment' | 'decrement' | 'multiply' | 'divide' | 'increaseBy' | 'decreaseBy' | 'custom';
type MUTATION_ACTION_TYPE_FOR_STRING = 'set' | 'concat_before' | 'concat_after' | 'upper' | 'lower' | 'custom';
type MUTATION_ACTION_TYPE_FOR_BOOLEAN = 'set' | 'invert_boolean' | 'custom';
type MUTATION_ACTION_TYPE_FOR_OBJECT = 'set' | 'push' | 'push_content' | 'assign' | 'custom' | MUTATION_ACTION_TYPE_FOR_NUMBER | MUTATION_ACTION_TYPE_FOR_STRING | MUTATION_ACTION_TYPE_FOR_BOOLEAN;
/* - */
type MUTATION_ARG_TYPE_FOR_NUMBER = { action: MUTATION_ACTION_TYPE_FOR_NUMBER, path?: string, value?: number, customMutation?: Function, keepPositive?: boolean };
type MUTATION_ARG_TYPE_FOR_STRING = { action: MUTATION_ACTION_TYPE_FOR_STRING, path?: string, value?: string, customMutation?: Function, };
type MUTATION_ARG_TYPE_FOR_BOOLEAN = { action: MUTATION_ACTION_TYPE_FOR_BOOLEAN, path?: string, value?: boolean, customMutation?: Function, };
type MUTATION_ARG_TYPE_FOR_OBJECT = { action: MUTATION_ACTION_TYPE_FOR_OBJECT, path?: string | string[] | (number | string)[], value?: string | number | boolean | object, customMutation?: Function, };

// type MUTATION_ARG_TYPE_FOR_OBJECT<T extends MUTATION_ACTION_TYPE_FOR_OBJECT> = T extends 'push_content' ? { action: T, path?: string | string[] | (number | string)[], value?: any[] }
//     : T extends 'set' | 'push' ? { action: T, path?: string | string[] | (number | string)[], value?: string | number | boolean | object }
//     : T extends 'assign' ? { action: T, path?: string | string[] | (number | string)[], value?: { [key: string]: any } }
//     : T extends 'increment' | 'decrement' | 'multiply' | 'divide' ? { action: T, path?: string | string[] | (number | string)[], value?: number }
//     : T extends 'concat_before' | 'concat_after' | 'upper' | 'lower' ? { action: T, path?: string | string[] | (number | string)[], value?: string }
//     : T extends 'invert_boolean' ? { action: T, path?: string | string[] | (number | string)[], value?: boolean }
//     : { action: T, path?: string | string[] | (number | string)[], value?: string | number | boolean | object };

/* - */
type MUTATION_RETURN_TYPE_FOR_ANY = { mutation: MUTATION_ARG_TYPE_FOR_NUMBER[] | MUTATION_ARG_TYPE_FOR_STRING[] | MUTATION_ARG_TYPE_FOR_BOOLEAN[], _$$type: 'number' | 'string' | 'boolean' | 'object', _$$isMutation: true };
type MUTATION_RETURN_TYPE_FOR_OBJECT = { mutation: MUTATION_ARG_TYPE_FOR_NUMBER[] | MUTATION_ARG_TYPE_FOR_STRING[] | MUTATION_ARG_TYPE_FOR_BOOLEAN[] | MUTATION_ARG_TYPE_FOR_OBJECT[], _$$type: 'number' | 'string' | 'boolean' | 'object', _$$isMutation: true };
// type MUTATION_RETURN_TYPE_FOR_OBJECT<T extends MUTATION_ACTION_TYPE_FOR_OBJECT> = { mutation: MUTATION_ARG_TYPE_FOR_NUMBER[] | MUTATION_ARG_TYPE_FOR_STRING[] | MUTATION_ARG_TYPE_FOR_BOOLEAN[] | MUTATION_ARG_TYPE_FOR_OBJECT<T>[], _$$type: 'number' | 'string' | 'boolean' | 'object', _$$isMutation: true };
type MUTATION_RETURN_TYPE = {
    /**
    * number mutation
    * @param x 
    * @params action ->
    * @params value ->
    * @params keepPositive? ->
    * @returns 
    */
    number: (x: MUTATION_ARG_TYPE_FOR_NUMBER | MUTATION_ARG_TYPE_FOR_NUMBER[]) => void,

    /**
    * string mutation
    * @param x 
    * @returns 
    */
    string: (x: MUTATION_ARG_TYPE_FOR_STRING | MUTATION_ARG_TYPE_FOR_STRING[]) => void,

    /**
    * boolean mutation
    * @param x 
    * @returns 
    */
    boolean: (x: MUTATION_ARG_TYPE_FOR_BOOLEAN | MUTATION_ARG_TYPE_FOR_BOOLEAN[]) => void,

    /**
    * object (json and array) mutation
    * @param x 
    * @returns 
    */
    object: (x: MUTATION_ARG_TYPE_FOR_OBJECT | MUTATION_ARG_TYPE_FOR_OBJECT[]) => void,
    // object: <T extends MUTATION_ACTION_TYPE_FOR_OBJECT>(x: MUTATION_ARG_TYPE_FOR_OBJECT<T> | MUTATION_ARG_TYPE_FOR_OBJECT<T>[]) => void,
};


type AT_JSON_ACTION_TYPE = 'extract' | MUTATION_ACTION_TYPE_FOR_OBJECT;


type CONDITION_OPERATOR_FOR_NUMBER = '===' | '!==' | '>' | '>=' | '<=' | '<' | '<>' | '!<>' | '<*>' | '!<*>' | '><' | '>*<' | '!><' | '!>*<' | '<?>' | '!<?>' | '%' | 'custom';
type CONDITION_OPERATOR_FOR_STRING = '===' | '!==' | '<>' | '!<>' | '<*>' | '!<*>' | '<?>' | '!<?>' | 'L==' | 'L>' | 'L>=' | 'L<' | 'L<=' | 'wL==' | 'wL>' | 'wL>=' | 'wL<' | 'wL<=' | 'custom';
type CONDITION_OPERATOR_FOR_BOOLEAN = '===' | '!==' | 'custom';
type CONDITION_OPERATOR_FOR_DATE = '===' | '!==' | '>' | '>=' | '<=' | '<' | '<>' | '!<>' | '<*>' | '!<*>' | '><' | '>*<' | '!><' | '!>*<' | '<?>' | '!<?>' | '=Q1' | '=Q2' | '=Q3' | '=Q4' | '=S1' | '=S2' | /* 'Y->' | 'M->' | 'Dt->' | 'Dy->' | 'H->' | 'Mn->' | 'S->' | 'T->' | 'D??' | 'N??' | */ 'custom';
type CONDITION_OPERATOR_FOR_OBJECT = CONDITION_OPERATOR_FOR_NUMBER | CONDITION_OPERATOR_FOR_STRING | CONDITION_OPERATOR_FOR_DATE | '[*]' | '![*]' | '[?]' | '![?]' | '[=]' | '{k}' | '!{k}' | '{k*}' | '!{k*}' | '{v}' | '!{v}' | '{v*}' | '!{v*}' | '{=}';
/* - */
type CONDITION_VALUE_TYPE_FOR_NUMBER = number | number[] | ARRAY_TWO_NUMBER_TYPE | ARRAY_TWO_NUMBER_TYPE[];
type CONDITION_VALUE_TYPE_FOR_STRING = number | string | string[] | (string[] | string)[];
type CONDITION_VALUE_TYPE_FOR_BOOLEAN = boolean;
type CONDITION_VALUE_TYPE_FOR_DATE = number | number[] | string | string[] | (number | number[] | string | string[])[] | ARRAY_TWO_NUMBER_TYPE | ARRAY_TWO_NUMBER_TYPE[] | ARRAY_TWO_STRING_TYPE | ARRAY_TWO_STRING_TYPE[];
/* - */
type CONDITION_DATE_FORMAT = 'YYYY_MM_DD' | 'DD_MM_YYYY' | 'MM_DD_YYYY';
/* - */
type CONDITION_ARG_TYPE_FOR_NUMBER = { operator: CONDITION_OPERATOR_FOR_NUMBER, path?: string | (string | number)[], value?: CONDITION_VALUE_TYPE_FOR_NUMBER, permutation?: Function, customCondition?: Function, case_sensitive?: boolean };
type CONDITION_ARG_TYPE_FOR_STRING = { operator: CONDITION_OPERATOR_FOR_STRING, path?: string | (string | number)[], value?: CONDITION_VALUE_TYPE_FOR_STRING, permutation?: Function, customCondition?: Function, case_sensitive?: boolean };
type CONDITION_ARG_TYPE_FOR_BOOLEAN = { operator: CONDITION_OPERATOR_FOR_BOOLEAN, path?: string | (string | number)[], value?: CONDITION_VALUE_TYPE_FOR_BOOLEAN, permutation?: Function, customCondition?: Function };
type CONDITION_ARG_TYPE_FOR_DATE = { operator: CONDITION_OPERATOR_FOR_DATE, path?: string | (string | number)[], value?: CONDITION_VALUE_TYPE_FOR_DATE, permutation?: Function, customCondition?: Function, case_sensitive?: boolean, year?: number };
type CONDITION_ARG_TYPE_FOR_OBJECT = { operator: CONDITION_OPERATOR_FOR_OBJECT, path?: string | string[], isDate?: boolean, value?: CONDITION_VALUE_TYPE_FOR_NUMBER | CONDITION_VALUE_TYPE_FOR_STRING | CONDITION_VALUE_TYPE_FOR_DATE | object | boolean, permutation?: Function, customCondition?: Function, case_sensitive?: boolean, year?: number };
/* - */
type CONDITION_RETURN_TYPE_FOR_ANY = { condition: CONDITION_ARG_TYPE_FOR_NUMBER[] | CONDITION_ARG_TYPE_FOR_STRING[] | CONDITION_ARG_TYPE_FOR_BOOLEAN[] | CONDITION_ARG_TYPE_FOR_DATE[] | CONDITION_ARG_TYPE_FOR_OBJECT[], link: 'OR' | 'AND', _$$type: 'number' | 'string' | 'boolean' | 'date' | 'object', _$$isCondition: true };
type CONDITION_RETURN_TYPE = {
    /**
    * number condition
    * @param x 
    * @returns 
    */
    number: (x: CONDITION_ARG_TYPE_FOR_NUMBER | CONDITION_ARG_TYPE_FOR_NUMBER[], y?: 'OR' | 'AND') => void,

    /**
    * string condition
    * @param x 
    * @returns 
    */
    string: (x: CONDITION_ARG_TYPE_FOR_STRING | CONDITION_ARG_TYPE_FOR_STRING[], y?: 'OR' | 'AND') => void,

    /**
    * boolean condition
    * @param x 
    * @returns 
    */
    boolean: (x: CONDITION_ARG_TYPE_FOR_BOOLEAN | CONDITION_ARG_TYPE_FOR_BOOLEAN[], y?: 'OR' | 'AND') => void,

    /**
    * object condition
    * @param x 
    * @returns 
    */
    object: (x: CONDITION_ARG_TYPE_FOR_OBJECT | CONDITION_ARG_TYPE_FOR_OBJECT[], y?: 'OR' | 'AND') => void,

    /**
    * date condition
    * @param x - condition
    * @param y - condition Link
    * @returns
    */
    date: (x: CONDITION_ARG_TYPE_FOR_DATE | CONDITION_ARG_TYPE_FOR_DATE[], y?: 'OR' | 'AND') => void
};





type WATCH_FEED_ON_ARG_TYPE = { set?: Function, update?: Function, delete?: Function };
type WATCH_BRANCH_ON_ARG_TYPE = { set?: Function, delete?: Function, self_create?: Function, self_delete?: Function };
type WATCH_STORE_ON_ARG_TYPE = { set?: Function, update?: Function, delete?: Function };
/* - */
type WATCHER_TYPE_FOR_FEED = {
    [fid: string]: {
        set: { [wid: string]: Function },
        update: { [wid: string]: Function },
        delete: { [wid: string]: Function }
    }
};
type WATCHER_TYPE_FOR_BRANCH = {
    [treen: string]: {
        [bname: string]: {
            set: { [wid: string]: Function },
            delete: { [wid: string]: Function },
            self_create: { [wid: string]: Function },
            self_delete: { [wid: string]: Function }
        }
    }
};
type WATCHER_TYPE_FOR_STORE = {
    set: { [wid: string]: Function },
    update: { [wid: string]: Function },
    delete: { [wid: string]: Function }
};
/* - */
type WATCH_FEED_RETURN_TYPE = { on: (x: WATCH_FEED_ON_ARG_TYPE) => void };
type WATCH_BRANCH_RETURN_TYPE = {
    fromTree: (x: string) => {
        on: (x: WATCH_BRANCH_ON_ARG_TYPE) => void
    }
};
type WATCH_STORE_RETURN_TYPE = { on: (x: WATCH_STORE_ON_ARG_TYPE) => void };
type WATCH_ARG_TYPE = STRING_ARR_TYPE;
/* - */
type WATCH_RETURN_TYPE = {
    feed: (x: WATCH_ARG_TYPE) => WATCH_FEED_RETURN_TYPE,
    branch: (x: WATCH_ARG_TYPE) => WATCH_BRANCH_RETURN_TYPE
    store: () => WATCH_STORE_RETURN_TYPE
};


type WATCHER_MAPPING_TYPE = {
    [wid: string]: {
        id: string,
        type: 'feed' | 'branch' | 'store',
        targets: { [targetId: string]: string }
    }
};


type USE_WATCHER_ARG_TYPE = string;
type USE_WATCHER_TARGET_TYPE = 'feed' | 'branch';
type USE_WATCHER_OTHER_ARG_TYPE<T extends USE_WATCHER_TARGET_TYPE> = T extends 'feed' ? [T, '*' | STRING_ARR_TYPE] : [T, '*' | STRING_ARR_TYPE, string];
type USE_WATCHER_CLEAR_ARG_TYPE<T extends USE_WATCHER_TARGET_TYPE> = T extends 'feed' ? [T] : [T, string];
type USE_WATCHER_RETURN_TYPE = {
    set: <T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>) => FUNCTION_BASIC_RETURN_TYPE,
    add: <T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>) => FUNCTION_BASIC_RETURN_TYPE,
    delete: <T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>) => FUNCTION_BASIC_RETURN_TYPE,
    clear: <T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_CLEAR_ARG_TYPE<T>) => FUNCTION_BASIC_RETURN_TYPE
};


type TRIGGER_ARG_X_TYPE = 'async';
type TRIGGER_ARG_Y_TYPE = TASK_EXECUTION_TYPE;
type TRIGGER_METHOD_TYPE = {
    id: { [tgid: string]: { [func_name: string]: Function } },
    family: { [family_name: string]: { [tgid: string]: string } }
};
type TRIGGER_CREATE_ARG_TYPE = { id: string, family?: string, methods: { [func_name: string]: Function } };
type TRIGGER_WITH_ARG_TYPE = {
    run: (x: string, y?: string) => TRIGGER_RUN_RETURN_TYPE,
    fromId: (x: string) => any,
    fromFamily: (x: string) => any
};
type TRIGGER_WITH_ARG_ASYNC_TYPE = {
    run: (x: string, y?: string) => TRIGGER_RUN_RETURN_TYPE,
    fromId: (x: string) => Promise<any>,
    fromFamily: (x: string) => Promise<any>
};
type TRIGGER_RUN_FUNC_TYPE = { name: string, alias: string, args: any[] };
type TRIGGER_RUN_RETURN_TYPE = {
    withArgs: (...x: any) => TRIGGER_WITH_ARG_TYPE
    // fromId: (x: string) => any,
    // fromFamily: (x: string) => any
};
type TRIGGER_RETURN_TYPE = {
    create: (x: TRIGGER_CREATE_ARG_TYPE) => FUNCTION_BASIC_RETURN_TYPE,
    run: (x: string, y?: string) => TRIGGER_RUN_RETURN_TYPE
};





type EXTRACT_ARG_X_TYPE = 'feed_id' | 'branch_name' | 'tree_name';
type EXTRACT_ALL_ARG_TYPE<T extends EXTRACT_ARG_X_TYPE> = T extends 'feed_id' ? [T, string, string]
    : T extends 'branch_name' ? [T, string]
    : T extends 'tree_name' ? [T] : [];



type TASK_EXECUTION_TYPE = 'sequential' | 'parallel';


type TREE_DATA_TYPE = {
    [treeName: string]: {
        name: string,
        branchCount: number
    }
};


type BRANCH_DATA_TYPE = {
    [treeName: string]: {
        [branchName: string]: {
            feedMainKey: { [mk: string]: string /* mk */ }
            feedCount: number
        }
    }
};

type BRANCH_FEED_REF_DATA_TYPE = {
    [treeName: string]: {
        [branchName: string]: {
            [mk: string]: JSON_BASIC_TYPE
        }
    }
};


type FEED_DATA_TYPE = {
    [mainKey: string]: { [key: string]: any }
};


type MK_TO_BRANCH_DATA_TYPE = {
    [mk: string]: string /* branch name */
};


type LOG_DATA_TYPE = {
    [treeName: string]: string
};


type TID_DATA_TYPE = {
    [treeName: string]: { [tid: string]: string }
};


type TRANSACTION_SCOOPE_DATA = {
    [tid: string]: {
        treeName: string,
        treeOptions: JSON_BASIC_TYPE,
        locked_feed: JSON_BASIC_TYPE,
        transaction_per_branch: { [mk: string]: number }
    }
};


type LOG_TYPE = 'unknown' | 'onTree' | 'set' | 'update' | 'updateAll' | 'get' | 'delete' | 'onBranch' | 'fromBranch' | 'orderBy' | 'limit' | 'where' | 'join' | 'end' | 'store' | 'return' | 'watch';


type CHAIN_TYPE = Array<{ func: string, data: any }>;


type VALID_VALUE_TYPE = 'string' | 'number' | 'boolean' | 'object' | 'undefined';


type JSON_BASIC_TYPE = { [key: string]: any };


type FUNCTION_BASIC_RETURN_TYPE = { status: 'success' | 'error', log: string, data: any };


type DELETED_FIELD_TYPE = { [mk: string]: Array<{ id: number, type: 'delete', data: string[] | JSON_BASIC_TYPE }> };


type COMMIT_TRANSACTION_TYPE = { tid: string, feed: { [mk: string]: any }, metamorphose: JSON_BASIC_TYPE, deletedFeed: JSON_BASIC_TYPE, deletedBranch: JSON_BASIC_TYPE, deletedTree: JSON_BASIC_TYPE, mk: { [branchName: string]: { [mk: string]: string } }, mkToBranch: JSON_BASIC_TYPE };


type RUN_TIME_TYPE = 'Deno' | 'Node' | 'Bun' | 'React_native' | 'Browser';

type ENV_DATA_TYPE = {
    hasInit: boolean,
    isLoadingSchema: boolean,
    runtime: RUN_TIME_TYPE | undefined,
    wstate: WS_STATE_TYPE
};




type WS_SERVER_CONFIG_TYPE = { [serverId: string]: { config: any, retryCount: number, isActive: boolean } };
type WS_PARSING_COLLECTOR_TYPE = { runtime: RUN_TIME_TYPE, type: 'server' | 'client', api: any, serverId?: string, host?: string, port?: number };
type WS_SERVER_TYPE = {
    [server_id: string]: {
        id: string,
        api: any,
        store?: {},
        session: JSON_BASIC_TYPE
    }
};
type WS_CLIENT_TYPE = {
    [client_id: string]: {
        id: string,
        api: any,
        store: JSON_BASIC_TYPE,
        session: JSON_BASIC_TYPE
    }
};
type WS_STATE_TYPE = { status: 'open' | 'close' | 'handshake' | 'error', log: string };
type WS_MESSAGE_OBJECT_TYPE = 'client_handshake' | 'server_handshake' | 'commit_store' | 'commit_session' | 'trigger_method' | 'trigger_back' | 'close';
type WS_MESSAGE_TYPE = {
    id: string, /* Id of "server" or "client" sending the messsage - session id or source id */
    object: WS_MESSAGE_OBJECT_TYPE,
    data?: JSON_BASIC_TYPE,
    oldSessionId?: string,
    target?: 'single' | 'multi',
    targetType?: 'client' | 'server',
    targetId?: string, /* For message sent from "client" to "client" via the server */
    callbackId?: string,
    callbackOwnerId?: string /* the first original source "id" */
    sessionFilter?: JSON_BASIC_TYPE
};
type WS_TRIGGER_H_RUN_FUNC_TYPE = { name: string, alias: string, args: any[] };
type WS_REQ_COLLECTOR_TYPE = {
    targetId: string, /* Id of "server" or "client" to send message to - The receiver id */
    targetType: 'client' | 'server',
    execOrder: TASK_EXECUTION_TYPE,
    method: WS_TRIGGER_H_RUN_FUNC_TYPE | WS_TRIGGER_H_RUN_FUNC_TYPE[],
    type: 'id' | 'family',
    source: string,
    targetFilter?: JSON_BASIC_TYPE,
    callback?: Function,
    callbackId?: string
};
type WS_TRIGGER_H_USE_CALLBACK_RETURN_TYPE = {
    fromId: (x: string) => Promise<any>,
    fromFamily: (x: string) => Promise<any>
};
type WS_TRIGGER_H_WITH_ARG_RETURN_TYPE = {
    run: (x: string, y?: string) => WS_TRIGGER_H_RUN_RETURN_TYPE,
    useCallback: (x: Function, y?: string) => WS_TRIGGER_H_USE_CALLBACK_RETURN_TYPE,
    fromId: (x: string) => Promise<any>,
    fromFamily: (x: string) => Promise<any>
};
type WS_TRIGGER_H_RUN_RETURN_TYPE = {
    // useCallback: (x: Function) => WS_TRIGGER_H_USE_CALLBACK_RETURN_TYPE,
    withArgs: (...x: any) => WS_TRIGGER_H_WITH_ARG_RETURN_TYPE,
    // fromId: (x: string) => Promise<any>,
    // fromFamily: (x: string) => Promise<any>
};
type WS_TRIGGER_WHERE_SESSION_RETURN_TYPE = {
    fromId: (x: string) => Promise<any>,
    fromFamily: (x: string) => Promise<any>
};
type WS_TRIGGER_H_WITH_ARG_SESSION_TYPE = {
    whereSession: (x: JSON_BASIC_TYPE) => WS_TRIGGER_WHERE_SESSION_RETURN_TYPE,
    run: (x: string, y?: string) => WS_TRIGGER_H_BROADCAST_RUN_RETURN_TYPE,
    fromId: (x: string) => Promise<any>,
    fromFamily: (x: string) => Promise<any>
};
type WS_TRIGGER_H_BROADCAST_RUN_RETURN_TYPE = {
    // whereSession: (x: JSON_BASIC_TYPE) => WS_TRIGGER_WHERE_SESSION_RETURN_TYPE,
    withArgs: (...x: any) => WS_TRIGGER_H_WITH_ARG_SESSION_TYPE,
    // fromId: (x: string) => Promise<any>,
    // fromFamily: (x: string) => Promise<any>
};
type WS_RETURN_TYPE = {
    /* get all clients and server id */
    get: () => {
        clients: (x?: 'count') => Promise<string[] | number>
        servers: (x?: 'count') => Promise<string[] | number>
    },
    /* trigger method(s) on one server */
    useServer: (x: string) => {
        trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => WS_TRIGGER_H_RUN_RETURN_TYPE },
    },
    /* trigger method(s) on one client */
    useClient: (x: string) => {
        trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => WS_TRIGGER_H_RUN_RETURN_TYPE },
    },
    /* trigger method(s) on many clients or servers */
    broadcast: (x: 'to_clients' | 'to_servers') => {
        trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => WS_TRIGGER_H_BROADCAST_RUN_RETURN_TYPE },
    }
};





type FS_IF_COND_RETURN_TYPE = Omit<FS_RETURN_TYPE, 'if'>;
type FS_ELSIF_COND_RETURN_TYPE = Omit<FS_RETURN_TYPE, 'if'>;
type FS_ELSE_COND_RETURN_TYPE = Omit<FS_RETURN_TYPE, 'if' | 'elsif'>;
/* - */
type FS_X_FILE_ARG_TYPE = { path?: string, content?: any, overwrite?: boolean };
type FS_X_FOLDER_ARG_TYPE = { path: string, files?: { name: string, content: any } | { name: string, content: any }[] };
/* - */
type FS_READ_FILE_ARG_TYPE = { id: string, path: string };
type FS_READ_FOLDER_ARG_TYPE = { id: string, path: string, target?: 'files' | 'folders' | 'all' };
/* - */
type FS_RENAME_X_ARG_TYPE = { path: string, newName: string };
/* - */
type FS_MOVE_X_ARG_TYPE = { from: string, to: string };
/* - */
type FS_COPY_X_ARG_TYPE = { from: string, to: string /* , overwrite?: boolean */ };
/* - */
type FS_CLEAR_FOLDER_ARG_TYPE = { path: string, target?: 'files' | 'folders' | 'all' };
/* - */
type FS_WHERE_COND_ARG_TYPE = {};
type FS_WHERE_COND_RETURN_TYPE = {};
/* - */
type FS_RETURN_TYPE = {
    // /* if */
    // if: (x: JSON_BASIC_TYPE) => FS_IF_COND_RETURN_TYPE,

    // /* else if */
    // elsif: (x: JSON_BASIC_TYPE) => FS_ELSIF_COND_RETURN_TYPE,

    // /* else */
    // else: (x: JSON_BASIC_TYPE) => FS_ELSE_COND_RETURN_TYPE,

    /* Create */
    create: () => {
        folder: (x: FS_X_FOLDER_ARG_TYPE | FS_X_FOLDER_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: FS_X_FILE_ARG_TYPE | FS_X_FILE_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* write or Update files */
    write: () => {
        file: (x: FS_X_FILE_ARG_TYPE | FS_X_FILE_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Read */
    read: () => {
        folder: (x: FS_READ_FOLDER_ARG_TYPE | FS_READ_FOLDER_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: FS_READ_FILE_ARG_TYPE | FS_READ_FILE_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Delete */
    delete: () => {
        folder: (x: string | string[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: string | string[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Rename */
    rename: () => {
        folder: (x: FS_RENAME_X_ARG_TYPE | FS_RENAME_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: FS_RENAME_X_ARG_TYPE | FS_RENAME_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Move */
    move: () => {
        folder: (x: FS_MOVE_X_ARG_TYPE | FS_MOVE_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: FS_MOVE_X_ARG_TYPE | FS_MOVE_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Copy */
    copy: () => {
        folder: (x: FS_COPY_X_ARG_TYPE | FS_COPY_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: FS_COPY_X_ARG_TYPE | FS_COPY_X_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    },

    /* Clear */
    clear: () => {
        folder: (x: FS_CLEAR_FOLDER_ARG_TYPE | FS_CLEAR_FOLDER_ARG_TYPE[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
        file: (x: string | string[]) => Promise<FUNCTION_BASIC_RETURN_TYPE>
    }
};

/* Types for fs methods */

type FS_METHOD_TYPE = 'folder' | 'file';

type FS_METHOD_CREATE_TYPE<T extends FS_METHOD_TYPE> = {
    type: T,
    data:
    T extends 'folder' ? FS_X_FOLDER_ARG_TYPE | FS_X_FOLDER_ARG_TYPE[] :
    T extends 'file' ? FS_X_FILE_ARG_TYPE | FS_X_FILE_ARG_TYPE[] : {}
};




type HTTP_SERVER_TYPE = {
    [server_id: string]: {
        id: string,
        api: any,
        upload_api: any,
        endpoint: string
    }
};
type HTTP_CLIENT_TYPE = {
    [client_id: string]: {
        id: string,
        api: any
    }
};
type HTTP_PARSING_COLLECTOR_TYPE = {
    runtime: RUN_TIME_TYPE, type: 'server' | 'client', api: any, endpoint?: string, serverId?: string, host?: string,
    port?: number, url?: string, timeout?: number, requestSize?: number, staticFiles?: { routeName: string, path: string }
};
type HTTP_TRIGGER_H_RUN_FUNC_TYPE = { name: string, alias: string, args: any[] };
type HTTP_REQ_COLLECTOR_TYPE = {
    serverId: string,
    execOrder: TASK_EXECUTION_TYPE,
    method: HTTP_TRIGGER_H_RUN_FUNC_TYPE | HTTP_TRIGGER_H_RUN_FUNC_TYPE[],
    type: 'id' | 'family',
    source: string
};
type HTTP_TRIGGER_H_WITH_ARG_TYPE = {
    run: (x: string, y?: string) => HTTP_TRIGGER_H_RUN_RETURN_TYPE,
    fromId: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
    fromFamily: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type HTTP_TRIGGER_H_RUN_RETURN_TYPE = {
    withArgs: (...x: any) => HTTP_TRIGGER_H_WITH_ARG_TYPE,
    // fromId: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
    // fromFamily: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type HTTP_RETURN_TYPE = {
    useServer: (x: string) => {
        trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => HTTP_TRIGGER_H_RUN_RETURN_TYPE },
        // upload: () => Promise<any>, /* TODO :: */
        // download: () => Promise<any>, /* TODO :: */
    }
};




type QUERY_TRIGGER_H_RUN_RETURN_TYPE = {
    withArgs: (...x: any) => HTTP_TRIGGER_H_WITH_ARG_TYPE,
    fromId: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>,
    fromFamily: (x: string) => Promise<FUNCTION_BASIC_RETURN_TYPE>
};
type QUERY_RETURN_TYPE = {
    // get: () => {},
    // broadcast: (x: 'to_clients' | 'to_servers') => {},
    // useServer: (x: string) => {
    //     trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => {} },
    //     upload: () => Promise<any>,
    //     download: () => Promise<any>
    // },
    // useClient: (x: string) => {
    //     trigger: (x?: TASK_EXECUTION_TYPE) => { run: (x: string, y?: string) => {} },
    //     upload: () => Promise<any>,
    //     download: () => Promise<any>
    // }
};





type PRIVATE_SESSION_TYPE = {
    id: string,
    oldSessionId: string,
    runtime: RUN_TIME_TYPE | undefined,
    runtimeType: 'client' | 'server' | undefined, /* websocket main type */
    fsEnable: boolean,
    cryptoEnable: boolean,
    httpConfig?: { /* TODO :: reorganise this part */
        as_server?: {
            api?: {
                deno?: { app: any, response: any }
                node?: { app: any, express: any, cors: any, bodyParser: any, compression: any, helmet: any, formidable: any }
                bun?: {}
            },
            abortController?: any,
            endpoint?: string,
            timeout?: number,
            requestSize?: number,
            port?: number,
            staticFiles?: { routeName: string, path: string }
        },
        as_client?: {},
    }
};


type DATE_MODEL = { hasDate: false, hasTime: false, hasSec: false, hasMilli: false, hasUTCHour: false, hasUTCMin: false, point: 0 };

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* --------------------------------------------- DATA LOGISTIC --------------------------------------------- */

/** Constants */
const _can_log_ = false;
const _support_runtime_for_ws_ = [];
const _valid_value_type_ = ['string', 'number', 'boolean', 'object', 'undefined'];
const _reserved_keys_ = ['_$$type', '_$$isMutation', '_$$isCondition', '_$$default'];
const _date_format_: { current: CONDITION_DATE_FORMAT[] } = { current: ['YYYY_MM_DD', 'MM_DD_YYYY', 'DD_MM_YYYY'] };
const _headers_ = {
    json: { headers: { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } },
    file: { headers: { 'Content-type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } },
};
const _crypto_key_length_ = 32;
/* - */
const _max_tree_name_length_ = 100;
const _max_branch_name_length_ = 100;
const _max_json_key_length_ = 200;
const _max_json_field_size_ = 1 * 1024 * 1024; /* 1 MB */
const _max_json_field_count_ = 1_000;
const _max_feed_size_ = 1 * 1024 * 1024; /* 1 MB */
const _max_object_depth_length_ = 35; /* Both array and json */
const _max_array_length = 1_000;
const _max_transaction_timeout_ = 120; /* in seconds */
const _max_fnss_length = 200; /* "FNSS" => File Name Storage - Specify the max length of each filename */
const _max_ws_retry_count = 300; /* about 12min */
const _max_ws_retry_time_interval = 2000;
/* - */
const _default_http_endpoint_ = 'forest';
const _default_http_upload_endpoint_ = 'butterfly';
const _default_http_host_ = '0.0.0.0';
const _default_http_timeout_ = 30_000;
const _default_http_upload_timeout_ = 120_000;
const _default_http_static_files_routename_ = 'static';
const _default_max_request_size_ = 256;
const _default_server_runtime_ = ['Deno', 'Node', 'Bun'];
const _default_client_runtime_ = ['Browser', 'React_native'];
const _default_fs_storage_path_ = './forest';


/** Error code */
const errCode = {
    initialization_failed: 'initialization_failed',
    max_tree_name_length_exceeded: 'max_tree_name_length_exceeded',
    not_branch_specified: 'not_branch_specified',
    empty_json_data: 'empty_json_data',
    transaction_failed: 'transaction_failed',
    feed_update_failed: 'feed_update_failed',
    request_failed: 'request_failed',

    phantom_tree: 'phantom_tree',
    phantom_branch: 'phantom_branch',
    phantom_feed: 'phantom_feed',

    corrupted_chain: 'corrupted_chain',
    corrupted_condition: 'corrupted_condition',

    invalid_path: 'invalid_path',
    invalid_tree_name: 'invalid_tree_name',
    invalid_tree_name_length: 'invalid_tree_name_length',
    invalid_tree_options: 'invalid_tree_options',
    invalid_argument: 'invalid_argument',
    invalid_chain: 'invalid_chain',
    invalid_date: 'invalid_date',
    invalid_mutation: 'invalid_mutation',
    invalid_mutation_path: 'invalid_mutation_path',
    invalid_json_path: 'invalid_json_path',
    invalid_condition: 'invalid_condition',
    invalid_condition_operator: 'invalid_condition_operator',
    invalid_condition_path: 'invalid_condition_path',
    invalid_condition_value: 'invalid_condition_value',
    invalid_value_type: 'invalid_value_type',
    invalid_target_value_type: 'invalid_target_value_type',

    unmatched_type: 'unmatched_type',
    unmatched_condition: 'unmatched_condition',
    unmatched_condition_type: 'unmatched_condition_type',

    tree_not_found: 'tree_not_found',
    no_tree_found: 'no_tree_found',
    branch_not_found: 'branch_not_found',
    feed_not_found: 'feed_not_found',

    incorrect_data_type: 'incorrect_data_type',
    incorrect_branch_name: 'incorrect_branch_name',

    nested_mutation_found: 'nested_mutation_found',
    nested_condition_found: 'nested_condition_found'
};


/** Initial config */
const initConfig: { config: INIT_ARG_TYPE } = {
    config: {
        mainKey: 'id',
        dateFormat: ['YYYY_MM_DD', 'MM_DD_YYYY']
    }
};


/** API */
const fs_API: { current: any } = { current: undefined }; /* Native "Deno" and "Bun" fs API */
const fs_node_API: { current: any } = { current: undefined }; /* Node "fs" package API */
const crypto_API: { current: any } = { current: undefined }; /* Node "crypto" package API */
const self_ws_API: { current: any } = { current: undefined }; /* - */
const self_http_API: { current: any } = { current: undefined }; -/* store http server instance */

/** - */
const fs_storage_path: { current: string } = { current: _default_fs_storage_path_ }; /* default storage path for forest */

/** LIB */
const LIB_config: { current: { rate: number, ms: number } } = { current: { rate: 2 * 1024 * 1024, ms: 60 } };

/** Runtime */
const Runtime: { current: RUN_TIME_TYPE | undefined } = { current: undefined };

/** FNSS */
const FNSS: { enable: boolean } = { enable: false };

/** Crypto */
const crypto: { enable: boolean } = { enable: false };
const secretKey: { value: string | undefined } = { value: undefined };

/** DB main data storage */
const forest_schema_DATA: BRANCH_SCHEMA_TYPE = {}; /* store forest schema */
/* - */
const tree_DATA: TREE_DATA_TYPE = {}; /* store trees */
const branch_DATA: BRANCH_DATA_TYPE = {}; /* store feed id per branchs per tree */
const branch_feed_ref_DATA: BRANCH_FEED_REF_DATA_TYPE = {}; /* store feed ref per branchs per tree */
const feed_DATA: FEED_DATA_TYPE = {}; /* store real feeds data for all trees */
const store_DATA: JSON_BASIC_TYPE = {}; /* store simple "key: value" pair */
/* - */
const deleted_field_DATA: DELETED_FIELD_TYPE = {}; /* store field to be deleted */
const mk_to_branch_DATA: MK_TO_BRANCH_DATA_TYPE = {}; /* store relation between feed mainKey and branch, per tree | mk stand for "mainKey" */
const locked_feed_id_DATA: JSON_BASIC_TYPE = {}; /* store feed being processed by a running transaction */
const phantom_feed_id_DATA: JSON_BASIC_TYPE = {}; /* store pending deleted feed id */
const phantom_branch_id_DATA: { [treen: string]: JSON_BASIC_TYPE } = {}; /* store pending deleted branch id */
const phantom_tree_id_DATA: JSON_BASIC_TYPE = {}; /* store pending deleted tree id */
/* - */
const transaction_scoope_DATA: TRANSACTION_SCOOPE_DATA = {}; /* store each running transaction data */
const active_transaction_per_branch_DATA: { [treen: string]: { [bname: string]: number } } = {};
/* - */
const log_DATA: LOG_DATA_TYPE = {}; /* store logs per tree */
const tid_DATA: TID_DATA_TYPE = {}; /* store all transaction ids per tree */
const env_DATA: ENV_DATA_TYPE = { /* store global env data */
    hasInit: false,
    isLoadingSchema: false,
    runtime: undefined,
    wstate: { status: 'close', log: 'WebSocket is off' }
};
/* - */
const mutation_custom_func_DATA: { [func_id: string]: Function } = {};
/* - */
const feed_watcher_DATA: WATCHER_TYPE_FOR_FEED = {};
const branch_watcher_DATA: WATCHER_TYPE_FOR_BRANCH = {};
const store_watcher_DATA: WATCHER_TYPE_FOR_STORE = { set: {}, update: {}, delete: {} };
/* - */
const watcher_mapping_DATA: WATCHER_MAPPING_TYPE = {};
/* - */
const trigger_method_DATA: TRIGGER_METHOD_TYPE = { id: {}, family: {} };
/* - */
const ws_server_DATA: WS_SERVER_TYPE = {};
const ws_client_DATA: WS_CLIENT_TYPE = {};
const ws_server_config_DATA: WS_SERVER_CONFIG_TYPE = {}; /* client's servers config */
const ws_callback_DATA: { [func_id: string]: Function } = {};
/* - */
const http_server_DATA: HTTP_SERVER_TYPE = {};
const http_client_DATA: HTTP_CLIENT_TYPE = {};
/* - */
const private_session_DATA: PRIVATE_SESSION_TYPE = {
    id: '',
    oldSessionId: '',
    runtime: undefined,
    runtimeType: 'client',
    fsEnable: false,
    cryptoEnable: false
};
const public_session_DATA: JSON_BASIC_TYPE = {};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* --------------------------------------------- Global methods --------------------------------------------- */

/** Log */
const logFunc = (...log: any[]) => { if (_can_log_) console.log(...log) }

/** Permanent Log */
const plog = (...log: any[]) => { console.log(...log) }

/** Id generator */
const generateIdFunc = (x?: { length: number, noTmp?: boolean }) => {
    const ntmp = x?.noTmp ?? true;
    const val = '0aW9zXe8CrVt1By5NuA46iZ3oEpRmTlYkUjIhOgPfMdQsSqDwFxGcHvJbKnL';
    const length = (x?.length !== undefined) ? x.length : val.length;
    const tmp = String(new Date().getTime());
    let id = '';
    for (let i = 0; i < length; i++) id += val.charAt(Math.floor(Math.random() * 36));
    id = ntmp ? id : (id + tmp);
    return id;
};

/** Check if string is alphanumeric - But can accept special chars like '_' and '-' */
const isAlphanumericFunc = (x: { value: string, acceptSpecial?: boolean }) => { return x.acceptSpecial ? /^[a-zA-Z0-9_-]+$/.test(x.value) : /^[a-zA-Z0-9]+$/.test(x.value) };

/** Set zero if negative */
const keepPositiveFunc = (x: { operation: number }) => { return (x.operation < 0) ? 0 : x.operation };

/** Delay function execution */
const delayFunc = (x?: { ms?: number }): Promise<void> => { return new Promise(resolve => setTimeout(resolve, x?.ms || 0.5)) };

/** Get object type */
const getObjectTypeFunc = (x: { object: any }): 'array' | 'json' | 'null' | 'undefined' => {
    const obj = x.object, tobj = typeof obj;
    if (tobj !== 'object') return 'undefined';
    return (tobj === null) ? 'null' : Array.isArray(obj) ? 'array' : 'json'
};

/** Set log */
const setLogFunc = (x: { treeName: string, status: '•' | '-', type: LOG_TYPE, value: string, transactionId: string, joinId?: string, skipCommit?: boolean }): string => {
    const treeName = x.treeName, status = x.status, type = x.type, value = x.value, transactionId = x.transactionId, joinId = x.joinId, skipCommit = x.skipCommit || false;
    // const t = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour12: true }); // Output: "Friday, December 27, 2024 at 3:45:30 PM";
    const t = new Date().toISOString();
    const log = `[${status}][${type}][${t}][GTID -> '${transactionId}'][JID -> '${joinId ?? null}'] :: [${value}];\n`;


    /* return log now and skip commits */
    if (skipCommit) return log;

    /* commit log */
    if (typeof log_DATA[treeName] !== 'string') log_DATA[treeName] = '';
    log_DATA[treeName] = log_DATA[treeName] + log;

    /* commit transaction id */
    if (typeof tid_DATA[treeName] !== 'object') tid_DATA[treeName] = {};
    tid_DATA[treeName][transactionId] = transactionId;

    /* return current log */
    return log;
};

/** Check both nested array and json object */
const checkMaxNestedObjFunc = (x: { input: JSON_BASIC_TYPE | any[], maxDepth?: number }): boolean => {
    const input = x.input, maxDepth = x.maxDepth || _max_object_depth_length_;

    /* Recursive function */
    const recurse = (x: { value: any, currentDepth: number }): boolean => {
        const value = (typeof x.value === 'object') ? x.value : undefined, currentDepth = x.currentDepth;

        /* If the current depth exceeds the max depth, return true immediately */
        if (currentDepth > maxDepth) return true;

        /* If value is an array or object, recurse into it */
        if (value && (typeof value === 'object' || Array.isArray(value))) {
            /* Iterate over all properties or elements in the array or object */
            for (let k in value) {
                const exd = recurse({ value: value[k], currentDepth: currentDepth + 1 });
                if (exd) return true;  /* If depth exceeds maxDepth, return true immediately */
            }
        }

        /* If no excess depth is found, return false */
        return false;
    };

    /* Start the recursion with depth 1 */
    return recurse({ value: input, currentDepth: 1 });
};

/** Check deeply if an object contains a mutation or a condition */
const hasMutationOrConditionFunc = (x: { check: 'all' | 'mutation' | 'condition', obj: object }) => {
    const check = x.check, obj = x.obj;
    if (typeof obj === 'object' && obj !== null) {
        const json: JSON_BASIC_TYPE = obj;
        let hasFound = false;

        /* - */
        if (check === 'all' && (isMutationFunc({ obj: json }) || isConditionFunc({ obj: json }))) hasFound = true;
        else if (check === 'mutation' && isMutationFunc({ obj: json })) hasFound = true;
        else if (check === 'condition' && isConditionFunc({ obj: json })) hasFound = true;

        /* - */
        if (hasFound) return true;
        else {
            const keys = Object.keys(json);
            for (let i = 0; i < keys.length; i++) {
                const target = keys[i];
                const targetValue = json[target];
                if (typeof targetValue === 'object') {
                    const found = hasMutationOrConditionFunc({ check: check, obj: targetValue }); /* recurse */
                    if (found) return true;
                }
            }
            return false;
        }
    } else return false;
};

/** Check if a property exists */
const hasPropertyFunc = (x: any, y: string): boolean => {
    const obj = (typeof x === 'object' && x !== null) ? x : {};
    return Object.prototype.hasOwnProperty.call(obj, y);
};

/** Clone object */
const cloneObjFunc = (x: { obj: any, useLoop?: boolean }): any => {
    try {
        const tp: boolean = (typeof x.obj === 'object' && x.obj !== null) ? true : false;
        const obj = x.obj, useLoop = x.useLoop ?? false;
        let data: any = {};
        if (tp) {
            if (!useLoop) data = structuredClone(obj);
            else {
                data = [];
                for (let f = 0; f < obj.length; f++) {
                    const cln = structuredClone(obj[f]);
                    data.push(cln);
                }
            }
            return data;
        }
        /* if obj is not an object */
        return Array.isArray(x.obj) ? [] : {};

    } catch (e: any) {
        plog('Clonning failed !');
        return { status: 'error', log: e.message, data: undefined };
    }
};

/** Is mutation */
const isMutationFunc = (x: { obj: any }) => { return ((typeof x.obj === 'object' && !Array.isArray(x.obj) && x.obj !== null) && hasPropertyFunc(x.obj, '_$$isMutation')) ? true : false };

/** Is condition */
const isConditionFunc = (x: { obj: any }) => { return ((typeof x.obj === 'object' && !Array.isArray(x.obj) && x.obj !== null) && hasPropertyFunc(x.obj, '_$$isCondition')) ? true : false };

/** check if value is a number */
const isNumericFunc = (x: { value: string }) => { return isFinite(Number(x.value)) };

/** Load schema */
const loadSchemaFunc = (x: { schema: any }): { status: 'success' | 'error', log: string, data: any } => {
    try {
        env_DATA.isLoadingSchema = true;
        const schema = x.schema;

        /* - */
        logFunc('\n');
        logFunc('----------------- schema -----------------');
        logFunc(schema);
        logFunc('\n');

        /* - */
        env_DATA.isLoadingSchema = false;
        return { status: 'success', log: '', data: '' };

    } catch (e: any) {
        env_DATA.isLoadingSchema = false;
        const err = e.message;
        return { status: 'error', log: '', data: '' };
    }
};

/** Merge nested array */
const mergeNestedArrayFunc = (x: { arr: any[] }) => { return (x.arr).flat() };

/* Get array depth */
const getArrayDepthFunc = (x: { arr: any[], maxLevel?: number }): number => {
    const arr = x.arr, maxLevel = x.maxLevel || 2;

    /* Check if not an array */
    if (!Array.isArray(arr)) return -1;

    /* Start with 1 level (the array itself) */
    let depth = 1;

    /* Loop through each element to check for nested arrays */
    for (const item of arr) {
        if (Array.isArray(item)) {
            const itemDepth = getArrayDepthFunc({ arr: item, maxLevel: maxLevel }); /* Recurse with maxLevel */
            if (itemDepth === -1) return -1; /* If depth exceeds maxLevel, stop and return -1 */
            depth = Math.max(depth, itemDepth + 1);
            if (depth > maxLevel) return -1; /* Stop early if the depth exceeds maxLevel */
        }
    }

    /* Return the calculated depth */
    return depth;
};

/** Remove ascents (diacritics) from string */
const removeAccentFunc = (x: { value: string, lowerCase?: boolean, keepSpaces?: boolean }): string => {
    const keepSpaces = x.keepSpaces ?? false;
    const str: string = (x.value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const data: string = x.lowerCase ? str.toLocaleLowerCase() : str;
    if (x.keepSpaces) data.replaceAll(' ', '');
    return data;
};

/* Get days in month */
const monthDays: Record<number, number> = {
    1: 31,  // January
    2: 28,  // February (29 in leap years)
    3: 31,  // March
    4: 30,  // April
    5: 31,  // May
    6: 30,  // June
    7: 31,  // July
    8: 31,  // August
    9: 30,  // September
    10: 31, // October
    11: 30, // November
    12: 31  // December
};
const getDaysInMonthFunc = (x: { month: number, year: number }): number => {
    const month = x.month, year = x.year;
    return month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : monthDays[month];
}

/* Get word count */
const getWordCountFunc = (x: { value: string }): number => { return ((x.value).match(/\b\w+\b/g) || []).length };

/* insert data in string or array at specified index */
const insertAtFunc = (x: { target: string | any[], index: number, value: any }): string | any[] => {
    const arr: any[] = (typeof x.target === 'string') ? (x.target).split('') : x.target, index = x.index, value = x.value;
    arr.splice(index, 0, value);
    return (typeof x.target === 'string') ? arr.join('') : arr;
};

/* Build a json object from a path */
const buildJsonFromPathFunc = (x: { path: string | (string | number)[], value: any }): JSON_BASIC_TYPE => {
    const path = Array.isArray(x.path) ? (x.path).join('.') : x.path, value = x.value;
    const pathTab: string[] = path.split('.').reverse(), plen = pathTab.length;
    let jtab: any[] = Array(plen).fill(undefined).map(() => { return {} });
    for (let i = 0; i < plen; i++) {
        const cp = pathTab[i]; /* current path */
        if (i === 0) jtab[i][cp] = value;
        else jtab[i][cp] = jtab[i - 1];
    }
    return jtab[plen - 1];
};

/* extract data from a givin' path */
const resolvePathFunc = (x: { path: string | (string | number)[], firstKey?: string, sourceObj?: object, asJson?: boolean }): FUNCTION_BASIC_RETURN_TYPE => {
    const path = Array.isArray(x.path) ? (x.path).join('.') : x.path, firstKey = x.firstKey || undefined, sourceObj = x.sourceObj || undefined, asJson = x.asJson ?? false;
    let mlog = '';

    try {
        /* check giving path validity */
        let pathTab: string[] = path.split('.');

        /* check path type */
        let pathType: 'short' | 'long' = 'short';
        const pcopy = cloneObjFunc({ obj: pathTab });
        const strPath: string = pcopy.join('.');
        pathType = (strPath[0] === '#') ? 'long' : 'short';

        /* get real object and real path */
        let realObj: any = {}, realPath = [];
        if (pathType === 'short') {
            /* check obj */
            const otype = getObjectTypeFunc({ object: sourceObj });
            if (sourceObj === undefined || otype !== 'json') {
                /* ERROR :: log error */
                mlog = mlog + `Invalid source`;
                throw new Error();
            }

            /* insure that "firstKey" is present in "pathTab" at index 0 */
            if (firstKey !== undefined && pathTab[0] !== firstKey) pathTab = [firstKey, ...pathTab];

            /* set "realObj" and "realPath" */
            realObj = cloneObjFunc({ obj: sourceObj });
            realPath = pathTab;

        } else { /* if long path */
            const fid = pathTab[0].replace('#', '');

            /* check if feed exists */
            const est = hasPropertyFunc(feed_DATA, fid);
            if (!est) {
                /* ERROR :: log error */
                mlog = mlog + `The feed "${fid}" doesn't exists`;
                throw new Error(mlog);
            }

            /* Set "realObj" and "realPath" */
            realObj = cloneObjFunc({ obj: feed_DATA[fid] });
            realPath = strPath.replace('#', '').split('.');
        }

        /* extract data */
        const ptl = pathTab.length;
        const currentPathValue: { current: any } = { current: undefined };
        let breakLoop = false;
        for (let n = 0; n < ptl; n++) {
            if (breakLoop) break; /* break loop */

            /* - */
            const ky = pathTab[n]; /* current key */
            const validPathData = (currentPathValue.current === undefined) ? false : true;
            const isNumericPath = isNumericFunc({ value: currentPathValue.current });
            const isBeforeLastLoop = (n === (ptl - 2)) ? true : false;
            const isLastLoop = (n === (ptl - 1)) ? true : false;

            /* if path doesn't exists */
            if (!isNumericPath && !hasPropertyFunc((validPathData ? currentPathValue.current : realObj), ky)) {
                /* ERROR :: log error */
                mlog = mlog + `The path "${path}" doesn't exists`;
                throw new Error(mlog);
            }

            /* get next path value */
            if (currentPathValue.current !== undefined) {
                const propExists = hasPropertyFunc(currentPathValue.current, ky);
                if (!propExists) { currentPathValue.current[ky] = {} }
            }
            currentPathValue.current = validPathData ? currentPathValue.current[ky] : realObj[ky];
        }

        /* build json */
        if (asJson) currentPathValue.current = buildJsonFromPathFunc({ path: realPath, value: currentPathValue.current });

        /* return */
        return { status: 'success', log: mlog, data: currentPathValue.current };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};

/* Extract number */
const extractNumberFunc = (x: { value: string }): number[] => { return ((x.value).match(/\d+/g) || []).map(Number) };

/* Extract number with index */
const extractNumberIndexFunc = (x: { value: string }): { index: number, value: number }[] => {
    const mtc = (x.value).matchAll(/\d+/g);
    let res: any[] = [];
    mtc.forEach((e: any) => { res.push({ index: e.index, value: e[0] }) });
    return res;
};

/* Extract data from string */
const extractDataFromStringFunc = (x: { value: string }): { index: number, value: any }[] => {
    const reg = new RegExp(x.value, 'g');
    const mtc = (x.value).matchAll(reg);
    let res: any[] = [];
    mtc.forEach((e: any) => { res.push({ index: e.index, value: e.input }) });
    return res;
};

/* Build date "proto" and "fullDate" format from model */
const buildDateTemplateFunc = (x: DATE_MODEL, y?: DATE_MODEL): { proto: string[], fullDate: string } => {
    /* define the most advanced or complet model */
    let md = x;
    if (y !== undefined) {
        const xp = x.point, yp = y.point;
        md = (xp >= yp) ? x : y;
    }
    let proto = [];
    let fullDate = '';

    /* For "date" */
    if (md.hasDate) { proto.push(...['YYYY', 'MM', 'DD']); fullDate = fullDate + 'YYYY-MM-DD' }
    /* For "time" */
    if (md.hasTime) { proto.push(...['HH', 'mm']); fullDate = fullDate + 'THH:mm' }
    /* For "seconds" */
    if (md.hasSec) { proto.push('ss'); fullDate = fullDate + ':ss' }
    /* For "milli" */
    if (md.hasMilli) { proto.push('sss'); fullDate = fullDate + '.sss' }
    /* For "utc hour" */
    if (md.hasUTCHour) { proto.push('+HH'); fullDate = fullDate + '++HH' }
    else { fullDate = fullDate + 'Z' }
    /* For "utc miniutes" */
    if (md.hasUTCMin) { proto.push('+mm'); fullDate = fullDate + ':+mm' }

    /* - */
    const final = { proto: proto, fullDate: fullDate };
    return final;
};

/* Extract timestamp (in milliseconds) from any valid date value */
const tmpExtractorFunc = (x: { value: string | number, format?: CONDITION_DATE_FORMAT, template?: { proto: string[], fullDate: string }, extractModel?: boolean }): any => {
    let value: any = x.value, format = x.format;
    const template = x.template || undefined;
    const extractModel = x.extractModel || false;
    const custom = (template !== undefined || extractModel) ? true : false;

    let mlog = '';
    let model = { hasDate: false, hasTime: false, hasSec: false, hasMilli: false, hasUTCHour: false, hasUTCMin: false, point: 0 };

    try {
        /* return timestamp immediately if value is it's a number and extractModel is false */
        if (!custom && typeof value === 'number') {
            const len = String(value).length;
            return (len === 10) ? value * 1000 :  /* Convert seconds to milliseconds */
                (len === 13) ? value : /* Milliseconds (standard) */
                    (len > 13 && len <= 16) ? Math.floor(value / 10 ** (len - 13)) : /* Convert micro/nano to ms */
                        -1; /* return -1 by default */
        }

        /* convert "date" into ISO format */
        if (custom && typeof value === 'number') {
            value = new Date(value).toISOString();
            // logFunc('gh ::', value);
        }

        /* extract numbers from date string */
        let nDate = custom ? value : String(value.replaceAll(' ', ''));
        let numTab: number[] = extractNumberFunc({ value: nDate });

        /* check if date is valid */
        if (numTab.length < 3 || numTab.length === 4) {
            /* ERROR :: log error */
            mlog = mlog + `invalid date "${nDate}"`;
            throw new Error(mlog);
        }

        /* extract "date" data */
        const sdt = numTab.splice(0, 3); /* split date */
        let dArr: number[] = [
            (format === 'DD_MM_YYYY') ? sdt[2] : (format === 'MM_DD_YYYY') ? sdt[2] : (format === 'YYYY_MM_DD') ? sdt[0] : -1, /* extract year */
            (format === 'DD_MM_YYYY') ? sdt[1] : (format === 'MM_DD_YYYY') ? sdt[0] : (format === 'YYYY_MM_DD') ? sdt[1] : -1, /* extact month */
            (format === 'DD_MM_YYYY') ? sdt[0] : (format === 'MM_DD_YYYY') ? sdt[1] : (format === 'YYYY_MM_DD') ? sdt[2] : -1  /* extact date */
        ];

        /* extract "time" data */
        let mArr: number[] = [];
        if (nDate.includes(':')) {
            const ix = nDate.lastIndexOf('+') || nDate.lastIndexOf('Z') || nDate.lastIndexOf('z') || -1;
            const oc: string[] = nDate.match(/:/g) || [];
            if (oc.length > 3 || oc.length < 1) {
                /* ERROR :: log error */
                mlog = mlog + `invalid date "${nDate}"`;
                throw new Error(mlog);
            }

            const ioc = nDate.indexOf(':') - 2;
            const str = (ix !== -1) ? nDate.slice(ioc, ix) : nDate.slice(ioc);
            const extr = extractNumberFunc({ value: str }), ixtr = extr.length;
            if (ixtr === 0) {
                /* ERROR :: log error */
                mlog = mlog + `invalid date "${nDate}"`;
                throw new Error(mlog);
            }

            mArr = [
                extr[0], /* hour */
                (ixtr === 1) ? 0 : extr[1], /* minute */
            ];
            if (extr[2] !== undefined) mArr.push((ixtr <= 2) ? 0 : extr[2]); /* seconds */
            if (extr[3] !== undefined) mArr.push((ixtr === 3) ? 0 : extr[3]); /* milli */
        }

        /* extract "utc" data */
        let uArr: number[] = [];
        if (nDate.includes('+')) {
            const ix = nDate.lastIndexOf('+'), str = nDate.slice(ix);
            const extr = extractNumberFunc({ value: str }), ixtr = extr.length;
            if (ixtr === 0) {
                /* ERROR :: log error */
                mlog = mlog + `invalid date "${nDate}"`;
                throw new Error(mlog);
            }

            uArr = [
                extr[0] /* UTC hour */
            ];
            if (extr[1] !== undefined) mArr.push((ixtr === 1) ? 0 : extr[1]); /* UTC minute */
        }

        /* set all "date" data */
        numTab = [...dArr, ...mArr, ...uArr];

        /* format date */
        const protoTab: string[] = template?.proto || ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss', 'sss', '+HH', '+mm']; /* this order is very important */
        let fullDate: string = template?.fullDate || 'YYYY-MM-DDTHH:mm:ss.sss++HH:+mm';
        for (let d = 0; d < protoTab.length; d++) {
            const cprot = protoTab[d], val: number = numTab[d] ?? -1;
            const pval = (val === -1) ? numTab[d] : val;
            switch (cprot) {
                /* set year */
                case 'YYYY': {
                    const len = String(val).length;
                    if ((len < 4) || (val === -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid year "${pval}"`;
                        throw new Error(mlog);
                    }
                    fullDate = fullDate.replace('YYYY', String(val));
                    model.hasDate = true; /* update model for "date" */
                } break;

                /* set month */
                case 'MM': {
                    if ((val < 1 || val > 12) || (val === -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid month "${pval}"`;
                        throw new Error(mlog);
                    }
                    fullDate = fullDate.replace('MM', String(val).padStart(2, '0'));
                } break;

                /* set date */
                case 'DD': {
                    const days: number = getDaysInMonthFunc({ month: numTab[1], year: numTab[0] });
                    if ((val < 1 || val > days) || (val === -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid date "${pval}", the range should be from 1 to "${days}"`;
                        throw new Error(mlog);
                    }
                    fullDate = fullDate.replace('DD', String(val).padStart(2, '0'));
                } break;

                /* set hour */
                case 'HH': {
                    if ((val < 0 || val > 23) && (val !== -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid hour "${pval}"`;
                        throw new Error(mlog);
                    }
                    const ext = (val !== -1) ? true : false;
                    fullDate = fullDate.replace('HH', !ext ? '00' : String(val).padStart(2, '0'));
                    model.hasTime = ext ? true : false; /* update model for "time" */
                } break;

                /* set minute */
                case 'mm': {
                    if ((val < 0 || val > 59) && (val !== -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid minute "${pval}"`;
                        throw new Error(mlog);
                    }
                    fullDate = fullDate.replace('mm', (val === -1) ? '00' : String(val).padStart(2, '0'));
                } break;

                /* set second */
                case 'ss': {
                    if ((val < 0 || val > 59) && (val !== -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid seconds "${pval}"`;
                        throw new Error(mlog);
                    }
                    const ext = (val !== -1) ? true : false;
                    fullDate = fullDate.replace('ss', !ext ? '00' : String(val).padStart(2, '0'));
                    model.hasSec = ext ? true : false; /* update model for "Seconds" */
                } break;

                /* set millisecond */
                case 'sss': {
                    if ((val < 0 || val > 999) && (val !== -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid seconds "${pval}"`;
                        throw new Error(mlog);
                    }
                    const ext = (val !== -1) ? true : false;
                    fullDate = fullDate.replace('sss', !ext ? '000' : String(val).padStart(3, '0'));
                    model.hasMilli = ext ? true : false; /* update model for "milli" */
                } break;

                /* set UTC hour */
                case '+HH': {
                    const ext = (val !== -1) ? true : false;
                    if (!ext) { fullDate = fullDate.replace('++HH:+mm', 'Z'); break }

                    /* - */
                    if (val < 0 || val > 23) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid UTC hour "${pval}"`;
                        throw new Error(mlog);
                    }
                    fullDate = fullDate.replace('+HH', String(val).padStart(2, '0'));
                    model.hasUTCHour = ext ? true : false; /* update model for "UTC hour" */
                } break;

                /* set UTC minute */
                case '+mm': {
                    if ((val < 0 || val > 59) && (val !== -1)) {
                        /* ERROR :: log error */
                        mlog = mlog + `invalid seconds "${pval}"`;
                        throw new Error(mlog);
                    }
                    const ext = (val !== -1) ? true : false;
                    fullDate = fullDate.replace('+mm', !ext ? '00' : String(val).padStart(2, '0'));
                    model.hasUTCMin = ext ? true : false; /* update model for "UTC minute" */
                } break;

                /* - */
                default: {
                    /* ERROR :: log error */
                    mlog = mlog + `unknown date parameter "${cprot}"`;
                    throw new Error(mlog);
                };
            };
        }

        /* set "model" point */
        const mdv = Object.values(model);
        const btr = mdv.filter((e: any) => e === true);
        model.point = btr.length;

        /* Convert to timestamp in UTC */
        const dateObj = new Date(fullDate);
        // if (custom) logFunc('mod ::', value, fullDate, dateObj);
        let final = isNaN(dateObj.getTime()) ? -1 : dateObj.getTime();

        /* return */
        return extractModel ? { tmp: final, model: model } : final;

    } catch (e: any) {
        logFunc('err "tmpExtractorFunc" fail ::', e.message);
        return -1;
    }
};
/* - */
const extractTimestampFunc = (x: { value: string | number, dateFormat?: CONDITION_DATE_FORMAT[], template?: any, extractModel?: boolean }): any => {
    const value = x.value, dateFormat: any[] = (x.dateFormat !== undefined) ? cloneObjFunc({ obj: x.dateFormat }) : cloneObjFunc({ obj: _date_format_.current });
    let final: number = -1;
    for (let i = 0; i < dateFormat.length; i++) {
        const form = dateFormat[i], extract = tmpExtractorFunc({ value: value, format: form, template: x.template, extractModel: x.extractModel });
        final = extract;
        if (extract !== -1) break;
    }
    return final;
};

/* check and transform all valid date string or number in timestamp, and sort arrays in ascendent way */
const transformIntoTimestampFunc = (x: { value: any[], format: CONDITION_DATE_FORMAT[] }): FUNCTION_BASIC_RETURN_TYPE => {
    const value = x.value, format = x.format;
    let mlog = '', currentTarget = undefined;
    try {
        /* - */
        for (let i = 0; i < value.length; i++) {
            const target = value[i];
            if (Array.isArray(target)) {
                const newTar: any[] = target;
                for (let j = 0; j < target.length; j++) {
                    const crtVal = newTar[j];
                    currentTarget = crtVal;
                    const xtmp = extractTimestampFunc({ value: crtVal, dateFormat: format });
                    if (xtmp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The date "${crtVal}" doesn't respect provided date format "[${_date_format_.current}]"`;
                        throw new Error(mlog);
                    }
                    newTar[j] = xtmp;
                }
                value[i] = newTar.sort((a: number, b: number) => a - b);

            } else {
                currentTarget = target;
                value[i] = extractTimestampFunc({ value: target, dateFormat: format });
            }
        }

        /* check all date are valid */
        const marr = mergeNestedArrayFunc({ arr: value });
        if (marr.includes(-1)) return { status: 'error', log: mlog, data: currentTarget };

        /* - */
        return { status: 'success', log: mlog, data: value };

    } catch (e: any) { return { status: 'error', log: mlog, data: currentTarget } }
};

/* Deeply merge json */
const mergeObjFunc = (x: { target: JSON_BASIC_TYPE, data: JSON_BASIC_TYPE }): JSON_BASIC_TYPE => {
    const target = x.target, data = x.data;
    const ttype = getObjectTypeFunc({ object: target }), tdata = getObjectTypeFunc({ object: data });

    /* check type */
    if (ttype !== 'json' || tdata !== 'json') return data;

    /* - */
    for (const key in data) {
        if (hasPropertyFunc(data, key)) {
            const ttk = getObjectTypeFunc({ object: target[key] }), tdk = getObjectTypeFunc({ object: data[key] });
            if (key in target && ttk === 'json' && tdk === 'json') target[key] = mergeObjFunc({ target: target[key], data: data[key] });
            else target[key] = data[key];
        }
    }

    /* return */
    return target;
};

/* Delete json fields */
const deleteJsonFieldFunc = (x: { target: JSON_BASIC_TYPE, path: string | (string | number)[], firstkey?: string }): FUNCTION_BASIC_RETURN_TYPE => {
    const path = Array.isArray(x.path) ? (x.path).join('.') : x.path, obj = x.target, fk = x.firstkey;
    let pathTab = path.split('.');
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };

    try {
        /* Ensure first key is present */
        if (fk !== undefined && pathTab[0] !== fk) pathTab = [fk, ...pathTab];
        let plen = pathTab.length

        /* - */
        let cursor: any = {};
        for (let i = 0; i < plen; i++) {
            const ck = pathTab[i];
            const who = (i === 0) ? obj : cursor;

            /* check if key exists */
            if (!hasPropertyFunc(who, ck)) { res.status = 'error'; throw new Error(`Path "${ck}" not found`) }

            /* dive into json */
            cursor = who[ck];

            /* delete target key */
            if (i === (plen - 2)) {
                const nk = pathTab[i + 1];
                delete cursor[nk];
                break;
            }
        }
        res.data = obj;

    } catch (e: any) { res.log = e.message };

    /* return */
    return res;
};

/* Parse URL */
const parseUrlFunc = (x: { url: string }): { protocol: string | undefined, hostname: string, port: string | undefined } | undefined => {
    try {
        const url = x.url;

        /* If address contains "://", use URL constructor */
        if (url.includes("://")) {
            const parsedUrl = new URL(url);
            return {
                protocol: parsedUrl.protocol.replace(':', ''),
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || undefined,
            };
        }

        /* Manually handle cases like "localhost:8812" or "192.168.1.1:5000" */
        const [host, port] = url.split(':');
        return {
            protocol: undefined,
            hostname: host,
            port: port || undefined,
        };

    } catch (error) { return undefined }
};

/** Transform a Json data into top-level only */
const topLevelJsonFunc = (x: { data: JSON_BASIC_TYPE, ktab?: string[] }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let coll: JSON_BASIC_TYPE = {};
    try {
        const data = x.data;
        for (let key in data) {
            const kdat = data[key], ktab: string[] = x.ktab ? [...x.ktab] : [];
            const dtyp = getObjectTypeFunc({ object: kdat });
            if (dtyp === 'json') {
                ktab.push(key);
                const recu = topLevelJsonFunc({ data: kdat, ktab: ktab });
                mergeObjFunc({ target: coll, data: recu.data });
            } else {
                ktab.push(key);
                const fk = ktab.join('.');
                coll[fk] = data[key];
            }
        }
        res.data = coll; /* set res data */

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Remove undefined value from an object */
const removeUndefinedValuesFunc = (x: { obj: JSON_BASIC_TYPE, clone?: boolean, recursive?: boolean }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const obj = x.obj;
        const clone = x.clone ?? false;
        const ocl = clone ? cloneObjFunc({ obj: obj }) : obj;
        const kys = Object.keys(ocl);
        for (let k = 0; k < kys.length; k++) {
            const ck = kys[k];
            if (ocl[ck] === undefined) { delete ocl[ck]; continue }
            /* - */
            const val = ocl[ck];
            if (typeof val === 'object' && val !== null) removeUndefinedValuesFunc({ obj: val, clone: false, recursive: true });
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/** Get new path */
const getNewPathFunc = (x: { oldPath: string, newName: string }): string => {
    /* Normalize to forward slashes first */
    const normalized = x.oldPath.replace(/[\\/]/g, '/');
    const lastSlash = normalized.lastIndexOf('/');

    /* Reconstruct with system separator */
    return (lastSlash === -1)
        ? x.newName
        : normalized.slice(0, lastSlash + 1) + x.newName;
};

/** Create hash */
const createHashFunc = async (x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    const res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const isNode = Runtime.current === 'Node' ? true : false;

        /* check data type */
        if (typeof x !== 'string') throw new Error(`The value to hash is not a string`);

        /* check crypto API */
        if (isNode && crypto_API.current === undefined) throw new Error(`Unable to find crypto's API`);

        /* hash */
        let edat = isNode ? await crypto_createHashFunc({ data: x, api: crypto_API.current }) : await web_createHashFunc({ data: x });

        /* set res */
        res.data = edat;

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Cipher */

/** Encrypt data */
const encryptFunc = async (x: { data: string }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        if (private_session_DATA.cryptoEnable) {
            const scrt = secretKey.value || undefined;
            const cp = (crypto_API.current !== undefined && private_session_DATA.runtime === 'Node') ? crypto_cipherFunc({ data: x.data, api: crypto_API.current, privateKey: scrt }) : await web_cipherFunc({ data: x.data, privateKey: scrt });
            if (cp.status !== 'success') throw new Error(`Encryption failed`);
            res.data = cp.data;
        }
        return res;

    } catch (e: any) { res.status = 'error'; res.log = e.message; res.data = x.data }
    return res;
};

/** Decrypt data */
const decryptFunc = async (x: { data: string }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    const data = x.data || undefined;
    try {
        if (data === undefined) throw new Error(`Invalid data`);
        if (private_session_DATA.cryptoEnable) {
            const scrt = secretKey.value || undefined;
            const cp = (crypto_API.current !== undefined) ? crypto_decipherFunc({ data: x.data, api: crypto_API.current, privateKey: scrt }) : await web_decipherFunc({ data: x.data, privateKey: scrt });
            if (cp.status !== 'success') throw new Error(`Decryption failed`);
            res.data = cp.data;
        }
        return res;

    } catch (e: any) { res.status = 'error'; res.log = e.message; res.data = x.data }
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* Websocket messaging methods */

/* Send websocket message */
const ws_sendFunc = async (x: { api: any, msg: WS_MESSAGE_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    const api = x.api, msg = JSON.stringify(x.msg);
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let message: { value: any } = { value: msg };
    let final: string = '';

    try {
        /* cipher if crypto is enable */
        if (private_session_DATA.cryptoEnable) {
            const enc = await encryptFunc({ data: message.value });
            if (enc.status !== 'success') throw new Error(enc.log);
            message.value = enc.data;
        }

        /* set message value */
        final = JSON.stringify(message);

    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${e.message}` };

    /* send message */
    // const bin = new TextEncoder().encode(final);
    api.send(final);
    return res;
};

/* Commit client session */
const ws_commitClientSessionFunc = async (x: { data: JSON_BASIC_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    const data = x.data;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        /* check if there is server available for commit */
        const srv = Object.keys(ws_server_DATA);
        if (srv.length === 0) throw new Error('Not server found to commit client session');

        /* commit session */
        let fail: string[] = [];
        for (let s = 0; s < srv.length; s++) {
            const cid = srv[s];
            const targ: any = ws_server_DATA[cid];
            const sid = targ.id, api = targ.api;
            const wss = await ws_sendFunc({ api: api, msg: { id: private_session_DATA.id, object: 'commit_session', data: data, target: 'single', targetId: sid, oldSessionId: private_session_DATA.oldSessionId } });
            if (wss.status !== 'success') { fail.push(sid); logFunc('session failed to commit ::', wss.log); continue }
        }

        /* check for failed commits */
        const flen = fail.length, slen = srv.length;
        if (flen > 0) {
            if (flen < slen) res.log = `Failed to commit session to following server(s) "[${fail}"]`;
            else if (flen === slen) throw new Error(`Failed to commit session`);
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };

    /* return */
    return res;
};

/* Commit client store */
const ws_commitClientStoreFunc = async (x: { data: JSON_BASIC_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    const data = x.data;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        /* check if there is server available for commit */
        const srv = Object.keys(ws_server_DATA);
        if (srv.length === 0) throw new Error('Not server found to commit client store');

        /* commit store */
        let fail: string[] = [];
        for (let s = 0; s < srv.length; s++) {
            const cid = srv[s];
            const targ: any = ws_server_DATA[cid];
            const sid = targ.id, api = targ.api;
            const wss = await ws_sendFunc({ api: api, msg: { id: private_session_DATA.id, oldSessionId: private_session_DATA.oldSessionId, object: 'commit_store', data: data, target: 'single', targetId: sid } });
            if (wss.status !== 'success') { fail.push(sid); logFunc('store failed to commit ::', wss.log); continue }
        }

        /* check for failed commits */
        const flen = fail.length, slen = srv.length;
        if (flen > 0) {
            if (flen < slen) res.log = `Failed to commit store to following server(s) "[${fail}"]`;
            else if (flen === slen) throw new Error(`Failed to commit store`);
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };

    /* return */
    return res;
};

/* Filter */
const ws_filterFunc = async (x: { targetType: 'client' | 'server', filter: JSON_BASIC_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const targetType = x.targetType, filter = x.filter;
        const dataSource = (targetType === 'client') ? ws_client_DATA : ws_server_DATA;
        const targets = Object.keys(dataSource);
        let collector = [];

        /* filter */
        let lrate = 0;
        if (targets.length > 0) for (let f = 0; f < targets.length; f++) {
            /* Trigger a "LIB" */
            if (lrate > 0 && lrate % LIB_config.current.rate === 0) await delayFunc({ ms: LIB_config.current.ms }); /* Let It Breath */

            /* check conditions */
            const tid = targets[f];
            const tdata = dataSource[tid];
            const css = tdata.session;
            if (css === undefined || Object.keys(css).length === 0) continue; /* - */
            const checond = checkConditionFunc({ feed: css, condition: filter });
            if (checond.status !== 'success') throw new Error(checond.log);
            if (checond.data) collector.push(tdata.id);

            /* update loop rate */
            lrate++;
        }

        /* set data */
        res.data = collector;

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/* Send trigger methods via ws */
const ws_sendtriggerMethodFunc = async (x: WS_REQ_COLLECTOR_TYPE): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const arg: WS_REQ_COLLECTOR_TYPE = x;
        const targetId = arg.targetId;
        const isBroadcast = (targetId === '*') ? true : false;
        const hasFilter = (arg.targetFilter !== undefined && Object.keys(arg.targetFilter).length > 0) ? true : false;
        const dly = 1000; /* delay ms to establish ws connection */

        /* extract trigger data to send */
        const tgData = { type: arg.type, source: arg.source, func: arg.method, xorder: arg.execOrder };

        /* - */
        switch (arg.targetType) {
            /** 
            * Send from server to client(s)
            */
            case 'client': {
                /* Broadcast */
                if (isBroadcast) {
                    let clients = [];

                    /* await to let connections to be established */
                    if (Object.keys(ws_client_DATA).length === 0) await delayFunc({ ms: dly * 5 });

                    /* collect clients id */
                    if (hasFilter) {
                        const fres = await ws_filterFunc({ targetType: 'client', filter: arg.targetFilter || {} });
                        if (fres.status !== 'success') throw new Error(fres.log);
                        clients = fres.data;
                    } else clients = Object.keys(ws_client_DATA);

                    /* If no clients found */
                    if (clients.length === 0) throw new Error(hasFilter ? `No client matches the filter - Broadcast cancelled` : `No clients found - Broadcast cancelled`);

                    /* broadcast message to all clients */
                    let lrate = 0;
                    for (let m = 0; m < clients.length; m++) {
                        /* Trigger a "LIB" */
                        if (lrate > 0 && lrate % LIB_config.current.rate === 0) await delayFunc({ ms: LIB_config.current.ms }); /* Let It Breath */

                        /* send msg */
                        const cid = clients[m], capi = ws_client_DATA[cid].api;
                        if (capi === undefined) { /* Ignore client if api is incorrect */
                            res.log = res.log + `Unable to send message to client with id "${cid}" - It API may be broken \n`;
                            lrate++; /* update loop rate */
                            continue;
                        }
                        try { await ws_sendFunc({ api: capi, msg: { id: private_session_DATA.id, object: 'trigger_method', data: tgData } }) } /* send */
                        catch (e: any) {
                            res.log = res.log + `Unable to send message to client with id "${cid}" - ${e.message} \n`;
                            lrate++; /* update loop rate */
                            continue;
                        }

                        /* update loop rate */
                        lrate++;
                    }
                }

                /* Single message */
                else {
                    let tex = hasPropertyFunc(ws_client_DATA, arg.targetId);

                    /* await to let connections to be established */
                    if (!tex) {
                        await delayFunc({ ms: dly * 5 });
                        tex = hasPropertyFunc(ws_client_DATA, targetId);
                    }

                    /* - */
                    if (!tex) throw new Error(`Can't found a client with id "${arg.targetId}"`);
                    const cid = arg.targetId, clientRealId = ws_client_DATA[cid].id, capi = ws_client_DATA[cid].api;
                    if (capi === undefined) throw new Error(`Invalid API for client "${cid}"`);

                    /* check callback */
                    let callbackId: any = undefined, callbackOwnerId: any = undefined;
                    if (arg.callback !== undefined) {
                        if (typeof arg.callback !== 'function') throw new Error(`Invalid callback`);
                        const cbid = arg.callbackId || generateIdFunc({ length: 8 });
                        if (hasPropertyFunc(ws_callback_DATA, cbid)) throw new Error(`The id "${cbid}" is already used by another callback`); /* Check and avoid callback id collision or overwrite */
                        ws_callback_DATA[cbid] = arg.callback;
                        callbackId = cbid;
                        callbackOwnerId = private_session_DATA.id;
                    }

                    /* send */
                    await ws_sendFunc({ api: capi, msg: { id: private_session_DATA.id, object: 'trigger_method', data: tgData, callbackId: callbackId, callbackOwnerId: callbackOwnerId } });
                }
            } break;

            /**
            * Send from client to server(s)
            */
            case 'server': {
                /* Broadcast */
                if (isBroadcast) {
                    let servers: string[] = Object.keys(ws_server_DATA);

                    /* await to let connections to be established */
                    if (servers.length === 0) {
                        await delayFunc({ ms: dly });
                        servers = Object.keys(ws_server_DATA);
                    }

                    /* If no servers found */
                    if (servers.length === 0) throw new Error(`No server found - Broadcast cancelled`);

                    /* broadcast message to all servers */
                    let lrate = 0;
                    for (let m = 0; m < servers.length; m++) {
                        /* Trigger a "LIB" */
                        if (lrate > 0 && lrate % LIB_config.current.rate) await delayFunc({ ms: LIB_config.current.ms }); /* Let It Breath */

                        /* send msg */
                        const cid = servers[m];
                        const capi = ws_server_DATA[cid].api;
                        const serverRealId = ws_server_DATA[cid].id;
                        if (capi === undefined) {
                            res.log = res.log + `Unable to send message to server with id "${cid}" - It API may be broken \n`;
                            lrate++; /* update loop rate */
                            continue;
                        }
                        try { await ws_sendFunc({ api: capi, msg: { id: private_session_DATA.id, object: 'trigger_method', data: tgData, targetId: serverRealId, sessionFilter: arg.targetFilter || {} } }) } /* send */
                        catch (e: any) {
                            res.log = res.log + `Unable to send message to server with id "${cid}" - ${e.message} \n`;
                            lrate++; /* update loop rate */
                            continue;
                        }

                        /* update loop rate */
                        lrate++;
                    }
                }

                /* Single message */
                else {
                    let tex = hasPropertyFunc(ws_server_DATA, targetId);

                    /* await to let connections to be established */
                    if (!tex) {
                        await delayFunc({ ms: dly });
                        tex = hasPropertyFunc(ws_server_DATA, targetId);
                    }

                    /* - */
                    if (!tex) throw new Error(`Can't found a server with id "${targetId}"`);
                    const cid = targetId, serverRealId = ws_server_DATA[cid].id, capi = ws_server_DATA[cid].api;
                    if (capi === undefined) throw new Error(`Invalid API for server "${cid}"`);

                    /* check callback */
                    let callbackId: any = undefined, callbackOwnerId: any = undefined;
                    if (arg.callback !== undefined) {
                        if (typeof arg.callback !== 'function') throw new Error(`Invalid callback`);
                        const cbid = arg.callbackId || generateIdFunc({ length: 8 });
                        if (hasPropertyFunc(ws_callback_DATA, cbid)) throw new Error(`The id "${cbid}" is already used by another callback`); /* Check and avoid callback id collision or overwrite */
                        ws_callback_DATA[cbid] = arg.callback;
                        callbackId = cbid;
                        callbackOwnerId = private_session_DATA.id;
                    }

                    /* send */
                    await ws_sendFunc({ api: capi, msg: { id: private_session_DATA.id, object: 'trigger_method', data: tgData, callbackId: callbackId, callbackOwnerId: callbackOwnerId } });
                }
            } break;

            /* default */
            default: { };
        };

    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${res.log + `\n` + e.message}` }
    return res;
};

/* Restart ws connection to server */
const ws_restartConnectionToServerFunc = (x: { config: any }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try { setupWebsocketFunc(x.config) } catch (e: any) { res.status = 'error', res.data = `[WebSocket] :: ${e.message}` }
    return res;
};

/* Restart dead connection */
const ws_restartDeadConnectionsFunc = (): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        /* check servers */
        if (Object.keys(ws_server_config_DATA).length === 0) { res.log = `No server found`; return res }

        /* - */
        const wsClient = ws_server_config_DATA;
        for (let key in wsClient) {
            const targ: any = wsClient[key];
            if (targ.isActive || targ.retryCount !== 0) continue;
            const conf = ws_restartConnectionToServerFunc({ config: targ.config });
            if (conf.status !== 'success') {
                const lg = (conf.log).replaceAll('[WebSocket] :: ', '');
                throw new Error(lg);
            }
        }

    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${e.message}` }
    return res;
};


/* Websocket setup */


/* Process messages */
const processWebsocketFunc = async (x: { event: 'open' | 'message' | 'close' | 'error', type: 'client' | 'server', serverId?: string, data?: any, api?: any, config?: any }): Promise<void> => {
    try {
        const event = x.event;
        const type = x.type || private_session_DATA.runtimeType;
        const serverId = x.serverId || undefined;
        const data = x.data || undefined;
        const api = x.api || undefined;
        const config = x.config || undefined;

        /* Process events */
        switch (event) {
            /** 
            * On open 
            */
            case 'open': {
                /** 
                * Client
                * When "client" open a new connexion 
                */
                if (type === 'client') {
                    /* check server id */
                    if (serverId === undefined) {
                        plog(`[WebSocket] :: Unable to find server ID`);
                        return;
                    }

                    /* init server config - isActive = true */
                    if (!hasPropertyFunc(ws_server_config_DATA, serverId)) ws_server_config_DATA[serverId] = { config: config, retryCount: 0, isActive: true };
                    else {
                        ws_server_config_DATA[serverId].retryCount = 0;
                        ws_server_config_DATA[serverId].isActive = true;
                    }

                    /* - */
                    self_ws_API.current = api;
                    const sending = await ws_sendFunc({
                        api: self_ws_API.current,
                        msg: { id: private_session_DATA.id, oldSessionId: private_session_DATA.oldSessionId, object: 'client_handshake' }
                    });
                }
            } break;


            /**
            * On message 
            */
            case 'message': {
                /* parse data to extract value */
                const str = String(data);
                const pars: any = JSON.parse(str);
                const val: string = pars.value;
                let msg: any = val;

                /* Decrypt msg */
                if (private_session_DATA.cryptoEnable) {
                    const dec = await decryptFunc({ data: val }); /* Decryption */
                    if (dec.status !== 'success') {
                        logFunc('dec failed ::', dec.log);
                        throw new Error(`[WebSocket] :: Message descryption failed`);
                    }
                    msg = (typeof dec.data === 'string') ? JSON.parse(dec.data) : dec.data; /* set message */
                }
                if (typeof msg === 'string') msg = JSON.parse(msg); /* IMPORTANT :: Parse message "AGAIN" to avoid "Bun" effect */


                /** 
                * Client
                * When "client" receive a message 
                */
                if (type === 'client') {
                    const id: string = msg.id, object: WS_MESSAGE_OBJECT_TYPE = msg.object, callbackOwnerId = msg.callbackOwnerId;
                    const sid = serverId || id; /* server "id" */
                    switch (object) {
                        /* [client] :: Client first connection */
                        case 'server_handshake': {
                            const ch = hasPropertyFunc(ws_server_DATA, sid);
                            ws_server_DATA[sid] = { id: sid, api: api, store: {}, session: {} };
                            await ws_commitClientSessionFunc({ data: public_session_DATA });
                            plog(`[WebSocket] :: Successfully connected to server "${sid}"`);
                        } break;


                        /* [client] :: Trigger */
                        case 'trigger_method': {
                            const mdata: any = msg.data, callbackId = msg.callbackId;
                            const rtg = await runTriggerAsyncFunc({ type: mdata.type, source: mdata.source, func: mdata.func, xorder: mdata.xorder });

                            /* Respond back if a callback exists */
                            if (callbackId !== undefined) {
                                const capi = ws_server_DATA[sid].api;
                                await ws_sendFunc({
                                    api: capi,
                                    msg: {
                                        id: private_session_DATA.id, oldSessionId: private_session_DATA.oldSessionId, object: 'trigger_back', data: rtg,
                                        callbackId: callbackId, callbackOwnerId: callbackOwnerId
                                    }
                                });
                            }
                        } break;


                        /* [client] :: Trigger back - Respond back to a trigger */
                        case 'trigger_back': {
                            const mdata: any = msg.data, callbackId = msg.callbackId;
                            if (callbackId !== undefined) {
                                const cbfunc = ws_callback_DATA[callbackId];
                                if (typeof cbfunc !== 'function') return;
                                try { await cbfunc({ id: callbackId, response: mdata }) } catch (e: any) { } /* run callback function */
                                delete ws_callback_DATA[callbackId]; /* delete or unmount callback function ref */
                            }
                        } break;


                        /* - */
                        default: { };
                    };
                }


                /** 
                * Server
                * When "server" receive a message 
                */
                else {
                    const clientId: string = msg.id, clientOldId = msg.oldSessionId, object: WS_MESSAGE_OBJECT_TYPE = msg.object, clientData = msg.data, callbackOwnerId = msg.callbackOwnerId;
                    const clientExists = hasPropertyFunc(ws_client_DATA, clientId); /* check client exist */
                    switch (object) {
                        /* [server] :: Client first connection */
                        case 'client_handshake': {
                            ws_client_DATA[clientId] = { id: clientId, api: api, store: {}, session: {} };
                            await ws_sendFunc({ api: api, msg: { id: private_session_DATA.id, oldSessionId: private_session_DATA.oldSessionId, object: 'server_handshake' } });

                            /* Try to restart dead connections */
                            ws_restartDeadConnectionsFunc();
                        } break;


                        /* [server] :: Store client "session" on the server */
                        case 'commit_session': {
                            /* check if session id have been updated */
                            if (!clientExists) {
                                const choid = (clientOldId === '') ? false : hasPropertyFunc(ws_client_DATA, clientOldId);
                                if (choid) {
                                    ws_client_DATA[clientId] = ws_client_DATA[clientOldId]; /* transfert data from old id to new id */
                                    ws_client_DATA[clientId].id = clientId;
                                    delete ws_client_DATA[clientOldId]; /* delete old id */
                                }
                                else ws_client_DATA[clientId] = { id: clientId, api: api, store: {}, session: {} };
                            }

                            /* Update client session data */
                            mergeObjFunc({ target: ws_client_DATA[clientId].session, data: clientData });
                        } break;


                        /* [server] :: Store client "store" on the server */
                        case 'commit_store': {
                            /* check if session id have been updated */
                            if (!clientExists) {
                                const choid = (clientOldId === '') ? false : hasPropertyFunc(ws_client_DATA, clientOldId);
                                if (choid) {
                                    ws_client_DATA[clientId] = ws_client_DATA[clientOldId]; /* transfert data from old id to new id */
                                    delete ws_client_DATA[clientOldId]; /* delete old id */
                                }
                                else ws_client_DATA[clientId] = { id: clientId, api: api, store: {}, session: {} };
                            }

                            /* Update client store data */
                            mergeObjFunc({ target: ws_client_DATA[clientId].store, data: clientData });
                        } break;


                        /* [server] :: Trigger */
                        case 'trigger_method': {
                            /* If it's a broadcast, filter server session to see if it match broadcast filter */
                            const filter = msg.sessionFilter;
                            if (filter !== undefined && Object.keys(filter).length > 0) {
                                const css = cloneObjFunc({ obj: public_session_DATA });
                                const checond = checkConditionFunc({ feed: css, condition: filter });
                                if (checond.status !== 'success' || !checond.data) return; /* Ignore broadcast if filter doesn't match server's public session */
                            }

                            /* - */
                            const mdata = msg.data, callbackId = msg.callbackId;
                            const rtg = await runTriggerAsyncFunc({ type: mdata.type, source: mdata.source, func: mdata.func, xorder: mdata.xorder });

                            /* Respond back if a callback exists */
                            if (callbackId !== undefined) {
                                const capi = ws_client_DATA[clientId].api;
                                await ws_sendFunc({
                                    api: capi,
                                    msg: {
                                        id: private_session_DATA.id, oldSessionId: private_session_DATA.oldSessionId, object: 'trigger_back', data: rtg,
                                        callbackId: callbackId, callbackOwnerId: callbackOwnerId
                                    }
                                });
                            }
                        } break;


                        /* [server] :: Trigger back - Respond back to a trigger */
                        case 'trigger_back': {
                            const mdata: any = msg.data, callbackId = msg.callbackId;
                            if (callbackId !== undefined) {
                                const cbfunc = ws_callback_DATA[callbackId];
                                if (typeof cbfunc !== 'function') return;
                                try { await cbfunc({ id: callbackId, response: mdata }) } catch (e: any) { } /* run callback function */
                                delete ws_callback_DATA[callbackId]; /* delete or unmount callback function ref */
                            }
                        } break;


                        /* - */
                        default: { };
                    };
                }
            } break;


            /**
            * On close 
            */
            case 'close': {
                /** 
                * Client
                * When "Server" close the connexion 
                */
                if (type === 'client') {
                    /* save server config */
                    if (serverId === undefined || config === undefined) {
                        plog('[WebSocket] :: Server ID or config not found, impossible to establish a connection');
                        return;
                    }

                    /* init server config - isActive = false */
                    if (!hasPropertyFunc(ws_server_config_DATA, serverId)) ws_server_config_DATA[serverId] = { config: config, retryCount: 0, isActive: false };

                    /* Retry connection to server */
                    const srid = config.serverId;
                    const rtc = ws_server_config_DATA[srid].retryCount;

                    /* retry connection */
                    if (rtc < _max_ws_retry_count) delayFunc({ ms: _max_ws_retry_time_interval }).then(() => {
                        if (rtc === 0) plog(`[WebSocket] :: Connection to server "${srid}" via "${config.host}" failed - Please wait while forest retry the process...`);
                        ws_server_config_DATA[srid].retryCount += 1; /* update retry count for current server */
                        const res = ws_restartConnectionToServerFunc({ config: config });
                        if (res.status !== 'success') ws_server_config_DATA[srid].retryCount = _max_ws_retry_count;
                    });
                    /* - */
                    else {
                        plog(`[WebSocket] :: Unfortunally, connection to server "${srid}" failed after "${_max_ws_retry_count}" attempts - Please check that the server is serving on the right port`);
                        ws_server_config_DATA[srid].retryCount = 0;
                        ws_server_config_DATA[srid].isActive = false;
                    }
                }

                /** 
                * Server
                * When "client" close the connexion
                */
                else {
                    // logFunc('Hi am a server => event =', event);
                }
            } break;


            /**
            * On error 
            */
            case 'error': {
                /* 
                * Client
                * When an error occure on "server" side
                */
                if (type === 'client') { }

                /** 
                * Server
                * When an error occure on "client" side
                */
                else { }
            } break;


            /* default */
            default: { };
        };

    } catch (e: any) { logFunc('[WebSocket] ::', e.message) }
    return;
};

/* Setup web socket */
const setupWebsocketFunc = (x: { rt: RUN_TIME_TYPE, ws: any, type: 'server' | 'client', serverId?: string, host?: string, wsPort?: number }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const arg = x;
        const rt = x.rt || undefined;
        const ws: any = x.ws || undefined;
        const type: any = x.type || undefined;
        const serverId: any = x.serverId || undefined;
        const host: any = x.host || undefined;
        const wsPort: any = x.wsPort || undefined;

        /* Set server "runtimeType" (client | server) */
        const prs = private_session_DATA;
        if (prs.runtimeType === undefined && prs.runtime !== undefined) private_session_DATA.runtimeType = _default_server_runtime_.includes(prs.runtime) ? 'server' : _default_client_runtime_.includes(prs.runtime) ? 'client' : undefined;

        /**
        * For websocket client(s)
        */
        if (type === 'client') {
            const socket = new ws(host);

            /* Open */
            socket.onopen = async () => { await processWebsocketFunc({ event: 'open', type: type, serverId: serverId, api: socket, config: arg }) };

            /* Message */
            socket.onmessage = async (x: { data: any }) => { await processWebsocketFunc({ event: 'message', type: type, serverId: serverId, api: socket, data: x.data }) };

            /* Close */
            socket.onclose = async () => { await processWebsocketFunc({ event: 'close', type: type, serverId: serverId, api: socket, config: arg }) };

            /* Error */
            socket.onerror = async (x: any) => { await processWebsocketFunc({ event: 'error', type: type, serverId: serverId, api: socket, data: x, config: arg }) };
        }

        /**
        * For websocket server
        */
        else if (type === 'server') {
            switch (rt) {
                /**
                * For "Deno"
                * use "Deno.serve"
                */
                case 'Deno': {
                    ws.serve({ port: wsPort }, async (req: any) => {
                        /* Check if the request is a WebSocket upgrade request */
                        if (req.headers.get('upgrade') === 'websocket') {
                            const { socket, response } = Deno.upgradeWebSocket(req);

                            /* Open */
                            socket.onopen = async () => { await processWebsocketFunc({ event: 'open', type: type, serverId: serverId, api: socket }) };

                            /* Message */
                            socket.onmessage = async (x: { data: any }) => { await processWebsocketFunc({ event: 'message', type: type, serverId: serverId, api: socket, data: x.data }) };

                            /* Close */
                            socket.onclose = async () => { await processWebsocketFunc({ event: 'close', type: type, serverId: serverId, api: socket, config: arg }) };

                            /* Error */
                            socket.onerror = async (x: any) => { await processWebsocketFunc({ event: 'error', type: type, serverId: serverId, api: socket, data: x, config: arg }) };

                            return response;
                        }

                        /* If not a WebSocket request, return a 400 response */
                        return new Response('Invalid request', { status: 400 });
                    });
                } break;


                /** 
                * For "Node"
                * Use "ws" package from node 
                */
                case 'Node': {
                    const socket = new ws({ port: wsPort });
                    socket.on('connection', (socket: any, req: any) => {
                        /* Open */
                        socket.on('open', async () => { await processWebsocketFunc({ event: 'open', type: type, serverId: serverId, api: socket }) });

                        /* Message */
                        socket.on('message', async (x: any) => { await processWebsocketFunc({ event: 'message', type: type, serverId: serverId, api: socket, data: x }) });

                        /* Close */
                        socket.on('close', async () => { await processWebsocketFunc({ event: 'close', type: type, serverId: serverId, api: socket, config: arg }) });

                        /* Error */
                        socket.on('error', async (x: any) => { await processWebsocketFunc({ event: 'error', type: type, serverId: serverId, api: socket, data: x, config: arg }) });
                    });
                } break;


                /**
                * For "Bun"
                * use "Bun.serve"
                */
                case 'Bun': {
                    ws.serve({
                        port: wsPort,
                        websocket: {
                            /* Open */
                            async open(socket: any) { await processWebsocketFunc({ event: 'open', type: type, serverId: serverId, api: socket }) },

                            /* Message */
                            async message(socket: any, msg: any) { await processWebsocketFunc({ event: 'message', type: type, serverId: serverId, data: msg, api: socket }) },

                            /* Close */
                            async close(socket: any, code: any, reason: any) { await processWebsocketFunc({ event: 'close', type: type, serverId: serverId, data: { code: code, reason: reason }, api: socket, config: arg }) },

                            /* Error */
                            async error(socket: any, err: any) { await processWebsocketFunc({ event: 'error', type: type, serverId: serverId, data: err, api: socket, config: arg }) }
                        },
                        fetch(req: any, server: any) {
                            if (server.upgrade(req)) return;
                            return new Response('Forest socket is ready...');
                        }
                    });
                } break;


                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${e.message}` }
    return res;
};

/* Bulk websocket setup */
const bulkWebsocketConfigFunc = (x: WS_PARSING_COLLECTOR_TYPE[]): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        if (x.length === 0) throw new Error(`Empty websocket config list`);
        for (let c = 0; c < x.length; c++) {
            const data = x[c];
            const setup = setupWebsocketFunc({ rt: data.runtime, ws: data.api, type: data.type, serverId: data.serverId, host: data.host, wsPort: data.port });
            if (setup.status !== 'success') throw new Error(setup.log);
        }
    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${e.message}` }
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* Http */

/** Process all http request for "Deno" - server side */
const httpDenoRequestProcessorFunc = async (req: any, resp: any): Promise<any> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    const send: any = resp;
    try {
        const mtod = (req.method).toLowerCase(), headers = req.headers, body: any = await req.json();
        const bval = body.value;
        const route = ((new URL(req.url)).pathname).replace('/', '');
        const endpoint = private_session_DATA.httpConfig?.as_server?.endpoint;

        /* check method type */
        if (mtod !== 'post') {
            res.status = 'error'; res.log = 'Not a POST request';
            const final = JSON.stringify(res);
            return new send(final, _headers_.json);
        }

        /* Reject request if route is not correct */
        if (![endpoint, _default_http_upload_endpoint_].includes(route)) {
            res.status = 'error'; res.log = `Unknow route "${route}"`;
            return new send(JSON.stringify(res), _headers_.json);
        }

        /** 
        * For "default" route 
        */
        if (route === endpoint) {
            /* Decrypt request */
            let data = bval;
            if (private_session_DATA.cryptoEnable) {
                const dec = await decryptFunc({ data: bval });
                if (dec.status !== 'success') throw new Error(`Descryption failed`);
                data = (typeof dec.data === 'string') ? JSON.parse(dec.data) : dec.data; /* Format data if it's a string */
                if (typeof data === 'string') data = JSON.parse(data); /* IMPORTANT :: Parse message "AGAIN" to avoid "Bun" effect */
            }
            else {
                data = (typeof data === 'string' && data.includes('{')) ? JSON.parse(data) : data;
                if (typeof data === 'string') throw new Error(`Descryption failed`); /* Data send by client is encrypted, but encryption is disable on server side */
            }

            /* Execute req */
            const type = data.type, source = data.source, func = data.method, xorder = data.xorder;
            const exec = await runTriggerAsyncFunc({ type: type, source: source, func: func, xorder: xorder });
            res = exec;

            /* Encrypt resp */
            let secData = JSON.stringify(res);
            if (private_session_DATA.cryptoEnable) {
                const enc = await encryptFunc({ data: secData });
                if (enc.status !== 'success') throw new Error(enc.log);
                secData = enc.data; /* return encrypted data as string */
            }

            /* return */
            return new send(secData, _headers_.json);
        }

        /**
        * For "upload" route 
        */
        else if (route === _default_http_upload_endpoint_) {
            logFunc('h ::', headers.get('content-type'));
        }

    } catch (e: any) {
        res.status = 'error'; res.log = e.message;
        const final = JSON.stringify(res);
        return new send(final, _headers_.json);
    }
}

/** Process all http request for "Node" - server side */
const httpNodeRequestProcessorFunc = async (req: any, resp: any): Promise<any> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    const send: any = resp;
    try {
        const body = req.body, headers = req.headers;
        const bval = body.value;

        /* Decrypt request */
        let data = bval;
        if (private_session_DATA.cryptoEnable) {
            const dec = await decryptFunc({ data: bval });
            if (dec.status !== 'success') throw new Error(`Descryption failed`);
            data = (typeof dec.data === 'string') ? JSON.parse(dec.data) : dec.data; /* Format data if it's a string */
            if (typeof data === 'string') data = JSON.parse(data); /* IMPORTANT :: Parse message "AGAIN" to avoid "Bun" effect */
        }
        else {
            data = (typeof data === 'string' && data.includes('{')) ? JSON.parse(data) : data;
            if (typeof data === 'string') throw new Error(`Descryption failed`); /* Data send by client is encrypted, but encryption is disable on server side */
        }

        /* Execute req */
        const type = data.type, source = data.source, func = data.method, xorder = data.xorder;
        const exec = await runTriggerAsyncFunc({ type: type, source: source, func: func, xorder: xorder });
        res = exec;

        /* Encrypt resp */
        let secData = JSON.stringify(res);
        if (private_session_DATA.cryptoEnable) {
            const enc = await encryptFunc({ data: secData });
            if (enc.status !== 'success') throw new Error(enc.log);
            secData = enc.data; /* return encrypted data as string */
        }

        /* send resp */
        send.json(secData);

    } catch (e: any) {
        const err = e.message;
        return send.json({ status: 'error', log: err, data: undefined });
    }
};

/** Process all http request for "Bun" - server side */
const httpBunRequestProcessorFunc = async (req: any, resp: any): Promise<any> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    const send: any = resp;
    try {
        const mtod = (req.method).toLowerCase(), headers = req.headers, body: any = await req.json();
        const bval = body.value;
        const route = ((new URL(req.url)).pathname).replace('/', '');
        const endpoint = private_session_DATA.httpConfig?.as_server?.endpoint;

        /* check method type */
        if (mtod !== 'post') {
            res.status = 'error'; res.log = 'Not a POST request';
            const final = JSON.stringify(res);
            return new send(final, _headers_.json);
        }

        /* Reject request if route is not correct */
        if (![endpoint, _default_http_upload_endpoint_].includes(route)) {
            res.status = 'error'; res.log = `Unknow route "${route}"`;
            return new send(JSON.stringify(res), _headers_.json);
        }

        /** 
        * For "default" route 
        */
        if (route === endpoint) {
            /* Decrypt request */
            let data = bval;
            if (private_session_DATA.cryptoEnable) {
                const dec = await decryptFunc({ data: bval });
                if (dec.status !== 'success') throw new Error(`Descryption failed`);
                data = (typeof dec.data === 'string') ? JSON.parse(dec.data) : dec.data; /* Format data if it's a string */
                if (typeof data === 'string') data = JSON.parse(data); /* IMPORTANT :: Parse message "AGAIN" to avoid "Bun" effect */
            }
            else {
                data = (typeof data === 'string' && data.includes('{')) ? JSON.parse(data) : data;
                if (typeof data === 'string') throw new Error(`Descryption failed`); /* Data send by client is encrypted, but encryption is disable on server side */
            }

            /* Execute req */
            const type = data.type, source = data.source, func = data.method, xorder = data.xorder;
            const exec = await runTriggerAsyncFunc({ type: type, source: source, func: func, xorder: xorder });
            res = exec;

            /* Encrypt resp */
            let secData = JSON.stringify(res);
            if (private_session_DATA.cryptoEnable) {
                const enc = await encryptFunc({ data: secData });
                if (enc.status !== 'success') throw new Error(enc.log);
                secData = enc.data; /* return encrypted data as string */
            }

            /* return */
            return new send(secData, _headers_.json);
        }

        /**
        * For "upload" route 
        */
        else if (route === _default_http_upload_endpoint_) {
            logFunc('h ::', headers.get('content-type'));
        }

    } catch (e: any) {
        res.status = 'error'; res.log = e.message;
        const final = JSON.stringify(res);
        return new send(final, _headers_.json);
    }
}

/** Upload file - client side */
const httpUploadFunc = async (x: any): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/** Prepare files for upload */
const httpPrepareUploadFilesFunc = (x: { source: 'html_input' | 'file_path', inputId?: string, path?: string | string[], limit?: number, maxSize?: number }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const source = x.source, inputId = x.inputId, path = x.path, limit = x.limit, maxSize = x.maxSize;

        /* For "file_path" */
        if (source === 'file_path') {
            /* check runtime */
            if (initConfig.config.plugins?.runtime === 'Browser') throw new Error(`You can't use "file_path" as source inside a browser`);

            /* check path */
            if (path === undefined) throw new Error(`Invalid path`);
            const fpath: any[] = Array.isArray(path) ? path : [path];

            /* check path type */
            for (let p = 0; p < fpath.length; p++) {
                const cp = fpath[p];
                if (typeof cp !== 'string') throw new Error(`Invalid path "${cp}" found at index "${p}"`);
            }

            /* - */

        }
        /* For "html_input" */
        else if (source === 'html_input') {

        }

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/** Send http requests - client side */
const sendHTTPrequestFunc = async (x: HTTP_REQ_COLLECTOR_TYPE): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const serverId = x.serverId, execOrder = x.execOrder, method = x.method, type = x.type, source = x.source;
        let secData = { value: '' };

        /* check if server exist */
        const chsr = hasPropertyFunc(http_server_DATA, serverId);
        if (!chsr) throw new Error(`Server "${serverId}" not found - Check http plugin config`);

        /* - */
        const srv = http_server_DATA[serverId];
        const sapi = srv.api, endpoint = srv.endpoint || _default_http_endpoint_;
        const postData = { xorder: execOrder, method: method, type: type, source: source };

        /* Encrypt req */
        secData.value = JSON.stringify(postData);
        if (private_session_DATA.cryptoEnable) {
            const enc = await encryptFunc({ data: secData.value });
            if (enc.status !== 'success') throw new Error(enc.log);
            secData.value = enc.data;
        }

        /* send request */
        const req = await sapi.post(`/${endpoint}`, secData, {})
            .then(async (resp: any) => {
                const rdat = resp.data;

                /* Decrypt resp */
                let data: any = (typeof rdat === 'string' && rdat.includes('{')) ? JSON.parse(rdat) : rdat;
                if (private_session_DATA.cryptoEnable) {
                    const dec = await decryptFunc({ data: rdat });
                    if (dec.status !== 'success') throw new Error(`Descryption failed`);
                    data = (typeof dec.data === 'string') ? JSON.parse(dec.data) : dec.data; /* Format data if it's a string */
                    if (typeof data === 'string') data = JSON.parse(data); /* IMPORTANT :: Parse message "AGAIN" to avoid "Bun" effect */
                }

                /* return res */
                res = data;
                return res;
            })
            .catch((e: any) => {
                res.status = 'error'; res.log = e.message;
                return res;
            });

        return req;

    } catch (e: any) { res.status = 'error'; res.log = e.message }
    return res;
};

/* - */

/** Setup http server and client(s) */
const setupHTTPserverClientFunc = (x: { runtime: RUN_TIME_TYPE, type: 'client' | 'server', api: any, endpoint?: string, serverId?: string, host?: string, port?: number, url?: string, timeout?: number, requestSize?: number, staticFiles?: { routeName: string, path: string } }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const arg = x;

        /* Set server "runtimeType" (client | server) */
        const prs = private_session_DATA;
        if (prs.runtimeType === undefined && prs.runtime !== undefined) private_session_DATA.runtimeType = _default_server_runtime_.includes(prs.runtime) ? 'server' : _default_client_runtime_.includes(prs.runtime) ? 'client' : undefined;

        /**
        * For http client(s)
        */
        if (arg.type === 'client' && arg.serverId !== undefined) {
            const axios: any = arg.api;
            const svr = axios.create({ baseURL: arg.url, timeout: arg.timeout }); /* create axios instance for current server */
            const upapi = axios.create({ baseURL: arg.url, timeout: arg.timeout, headers: { 'Content-Type': 'multipart/form-data' } }); /* create axios instance for current server */
            http_server_DATA[arg.serverId] = { id: arg.serverId, api: svr, upload_api: upapi, endpoint: arg.endpoint || _default_http_endpoint_ }; /* store server http api */
        }

        /**
        * For http server
        */
        else if (arg.type === 'server') {
            /* Setup http config for private session */
            mergeObjFunc({
                target: private_session_DATA,
                data: {
                    httpConfig: {
                        as_server: {
                            api: {},
                            abortController: undefined,
                            port: arg.port,
                            timeout: arg.timeout,
                            endpoint: arg.endpoint,
                            requestSize: arg.requestSize,
                            staticFiles: arg.staticFiles
                        }
                    }
                }
            });

            /* - */
            switch (arg.runtime) {
                /**
                * For "Deno" 
                */
                case 'Deno': {
                    const dapi: any = arg.api;
                    const denoo = dapi.api;
                    const resp = dapi.response;
                    /* start server */
                    denoo.serve({
                        port: arg.port,
                        hostname: arg.host,
                        onListen: () => {
                            const targ: any = private_session_DATA.httpConfig;
                            targ.as_server.api = { deno: { app: denoo, response: resp } }; /* very sensitive */
                            plog('Forest server is running...');
                        },
                        onError: (e: any) => { plog('Internal Server Error ::', e) }
                    }, async (req: any) => { return await httpDenoRequestProcessorFunc(req, resp) });
                } break;

                /**
                * For "Node"
                */
                case 'Node': {
                    const napi = arg.api;
                    const express: any = napi.express;
                    const cors: any = napi.cors;
                    const bodyParser: any = napi.bodyParser;
                    const compression: any = napi.compression;
                    const helmet: any = napi.helmet;

                    /* setup express */
                    const app: any = express();
                    if (arg.staticFiles !== undefined) app.use(`/${arg.staticFiles.routeName || _default_http_static_files_routename_}`, express.static(arg.staticFiles.path, { maxAge: '1d' }));
                    if (helmet !== undefined) app.use(helmet());
                    if (compression !== undefined) app.use(compression());
                    //
                    app.use(bodyParser.json({ limit: arg.requestSize }));
                    app.use(bodyParser.urlencoded({ extended: true, limit: arg.requestSize }));
                    app.use(cors());
                    app.use(express.json({ limit: arg.requestSize }));

                    /* setup main endpoint */
                    app.post(`/${arg.endpoint || _default_http_endpoint_}`, httpNodeRequestProcessorFunc);

                    /* Global Error Handling */
                    app.use((err: any, req: any, res: any, next: any) => {
                        plog('Internal Server Error ::', err);  /* Don't remove this "log" */
                        res.status(500).json({ error: 'Internal Server Error' });
                    });

                    /* start server */
                    app.listen(arg.port, arg.host, () => {
                        const targ: any = private_session_DATA.httpConfig;
                        targ.as_server.api = { node: { app: app, ...napi } }; /* very sensitive */
                        plog(`Forest server is running...`);/* Don't remove this "log" */
                    });
                } break;

                /** 
                * For "Bun"
                */
                case 'Bun': {
                    const bapi = arg.api;
                    const bunn = bapi.api;
                    const resp = bapi.response;
                    /* start server */
                    bunn.serve({
                        port: arg.port,
                        hostname: arg.host,
                        maxRequestBodySize: arg.requestSize,
                        async fetch(req: any) { return await httpBunRequestProcessorFunc(req, resp) }
                    });
                    plog(`Forest server is running...`); /* Do no remove "log" */
                } break;

                /* default */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Configure http server and multiple http clients */
const bulkHTTPconfigFunc = (x: HTTP_PARSING_COLLECTOR_TYPE[]): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        if (x.length === 0) throw new Error(`Empty http config list`);
        for (let i = 0; i < x.length; i++) {
            const data = x[i];
            const setup = setupHTTPserverClientFunc({
                runtime: data.runtime, type: data.type, api: data.api, endpoint: data.endpoint, serverId: data.serverId, host: data.host, port: data.port,
                url: data.url, timeout: data.timeout, requestSize: data.requestSize, staticFiles: data.staticFiles
            });
            if (setup.status !== 'success') throw new Error(setup.log);
        }
    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* File system */

/** Fs create */
const fs_createFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        if (Runtime.current === undefined) throw new Error(`"runtime" is undefined`);
        const type = x.type, data = (x.data !== undefined) ? x.data : [];

        /* Folder */
        if (type === 'folder') {
            const fdata: FS_X_FOLDER_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let f = 0; f < fdata.length; f++) {
                        const ct = fdata[f];
                        const cpath = ct.path, files = (ct.files !== undefined) ? Array.isArray(ct.files) ? ct.files : [ct.files] : [];

                        /* create folder */
                        await fs_API.current.mkdir(cpath, { recursive: true });

                        /* create files if available */
                        if (files.length > 0) for (let g = 0; g < files.length; g++) {
                            const cfl = files[g];
                            const name = cfl.name, content = cfl.content || '';
                            const fcont = new TextEncoder().encode(content);
                            await fs_API.current.writeFile(`${cpath}/${name}`, fcont, { append: true }); /* write file */
                        }
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let f = 0; f < fdata.length; f++) {
                        const ct = fdata[f];
                        const cpath = ct.path, files = (ct.files !== undefined) ? Array.isArray(ct.files) ? ct.files : [ct.files] : [];

                        /* create folder */
                        await fs_node_API.current.mkdir(cpath, { recursive: true });

                        /* create files if available */
                        if (files.length > 0) for (let g = 0; g < files.length; g++) {
                            const cfl = files[g];
                            const name = cfl.name, content = cfl.content || '';
                            await fs_node_API.current.writeFile(`${cpath}/${name}`, content, { encoding: 'utf8', flag: 'a' });
                        }
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let f = 0; f < fdata.length; f++) {
                        const ct = fdata[f];
                        const cpath = ct.path, files = (ct.files !== undefined) ? Array.isArray(ct.files) ? ct.files : [ct.files] : [];

                        /* create folder */
                        await fs_node_API.current.mkdir(cpath, '').catch((e: any) => { });

                        /* create files if available */
                        if (files.length > 0) for (let g = 0; g < files.length; g++) {
                            const cfl = files[g];
                            const name = cfl.name, content = cfl.content || '';
                            await fs_API.current.write(`${cpath}/${name}`, content, { append: true }); /* write file */
                        }
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: FS_X_FILE_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content;
                        const fcont = new TextEncoder().encode(content);
                        await fs_API.current.writeFile(path, fcont, { append: true }); /* write file */
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content;
                        await fs_node_API.current.writeFile(path, content, { encoding: 'utf8', flag: 'a' }); /* write file */
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content;
                        await fs_node_API.current.writeFile(path, content, { encoding: 'utf8', flag: 'a' }); /* write file */
                    }
                    /* - */
                } break;

                /* For "React-native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${res.log + e.message}` };
    return res;
};


/** Fs write */
const fs_writeFunc = async (x: { type: 'file', data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        if (type === 'file') {
            const fdata: FS_X_FILE_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content, ovw = ct.overwrite || false;
                        const fcont = new TextEncoder().encode(content);
                        await fs_API.current.writeFile(path, fcont, { append: ovw ? false : true }); /* write file */
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content, ovw = ct.overwrite || false;
                        await fs_node_API.current.writeFile(path, content, { encoding: 'utf8', flag: ovw ? 'w' : 'a' }); /* write file */
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content, ovw = ct.overwrite || false;
                        await fs_node_API.current.writeFile(path, content, { encoding: 'utf8', flag: ovw ? 'w' : 'a' }); /* write file */
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a];
                        const path = ct.path, content = ct.content, ovw = ct.overwrite || false;
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};


/** Fs read */
const fs_readFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            let dcoll: { [folder_name: string]: { files: any[], folders: any[] } } = {};
            const fdata: FS_READ_FOLDER_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfold = fdata[a]; /* current folder */
                        const cid = cfold.id, cpath = cfold.path, ctarg = cfold.target || 'all';

                        /* init */
                        dcoll[cid] = { files: [], folders: [] };

                        /* collect */
                        for await (const dentry of fs_API.current.readDir(cpath)) {
                            const enam = dentry.name;
                            if (dentry.isFile && ['files', 'all'].includes(ctarg)) dcoll[cid].files.push(enam);
                            else if (dentry.isDirectory && ['folders', 'all'].includes(ctarg)) dcoll[cid].folders.push(enam);
                        }
                    }

                    /* Set data */
                    res.data = dcoll;
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfold = fdata[a]; /* current folder */
                        const cid = cfold.id, cpath = cfold.path, ctarg = cfold.target || 'all';

                        /* init */
                        dcoll[cid] = { files: [], folders: [] };

                        /* collect */
                        const entries = await fs_node_API.current.readdir(cpath, { withFileTypes: true });
                        entries.forEach((entry: any) => {
                            const enam = entry.name;
                            if (entry.isFile() && ['files', 'all'].includes(ctarg)) dcoll[cid].files.push(enam);
                            else if (entry.isDirectory() && ['folders', 'all'].includes(ctarg)) dcoll[cid].folders.push(enam);
                        });
                    }

                    /* Set data */
                    res.data = dcoll;
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfold = fdata[a]; /* current folder */
                        const cid = cfold.id, cpath = cfold.path, ctarg = cfold.target || 'all';

                        /* init */
                        dcoll[cid] = { files: [], folders: [] };

                        /* collect */
                        const entries = await fs_node_API.current.readdir(cpath, { withFileTypes: true });
                        entries.forEach((entry: any) => {
                            const enam = entry.name;
                            if (entry.isFile() && ['files', 'all'].includes(ctarg)) dcoll[cid].files.push(enam);
                            else if (entry.isDirectory() && ['folders', 'all'].includes(ctarg)) dcoll[cid].folders.push(enam);
                        });
                    }

                    /* Set data */
                    res.data = dcoll;
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cfold = fdata[a]; /* current folder */
                    //     const cid = cfold.id, cpath = cfold.path, ctarg = cfold.target || 'all';

                    //     /* init */
                    //     dcoll[cid] = { files: [], folders: [] };

                    //     /* collect */
                    //     const entries = await fs_API.current.readdir(cpath, { withFileTypes: true });
                    //     for (const dentry of entries) {
                    //         const enam = dentry.name;
                    //         if (dentry.isFile() && ['files', 'all'].includes(ctarg)) dcoll[cid].files.push(enam);
                    //         else if (dentry.isDirectory() && ['folders', 'all'].includes(ctarg)) dcoll[cid].folders.push(enam);
                    //     }
                    // }

                    // /* Set data */
                    // res.data = dcoll;
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }

                    /* Set data */
                    res.data = dcoll;
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            let fcoll: { [fid: string]: any } = {};
            const fdata: FS_READ_FILE_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfile = fdata[a]; /* current path */
                        const cfid = cfile.id, cpath = cfile.path;
                        const content: any = await fs_API.current.readTextFile(cpath);
                        fcoll[cfid] = content;
                    }

                    /* set data */
                    res.data = fcoll;
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfile = fdata[a]; /* current path */
                        const cfid = cfile.id, cpath = cfile.path;
                        const content: any = await fs_node_API.current.readFile(cpath, 'utf8');
                        fcoll[cfid] = content;
                    }

                    /* set data */
                    res.data = fcoll;
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfile = fdata[a]; /* current path */
                        const cfid = cfile.id, cpath = cfile.path;
                        const file = fs_API.current.file(cpath);
                        if (await file.exists()) {
                            const content = await file.text();
                            fcoll[cfid] = content;
                        }
                        else fcoll[cfid] = undefined;
                    }

                    /* set data */
                    res.data = fcoll;
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }

                    /* set data */
                    res.data = fcoll;
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};


/** Fs delete */
const fs_deleteFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            const fdata: string[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                        const stat = await fs_API.current.stat(cpath);
                        if (!stat.isDirectory) continue;
                        await fs_API.current.remove(cpath, { recursive: true });
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                        await fs_node_API.current.rm(cpath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current dir path */
                        await fs_API.current.$`rm -rf ${cpath}`.quiet();
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: string[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                        const stat = await fs_API.current.stat(cpath);
                        if (!stat.isFile) continue;
                        await fs_API.current.remove(cpath);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                        await fs_node_API.current.rm(cpath, { force: true, maxRetries: 3, retryDelay: 200 });
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current path */
                        await fs_API.current.$`rm ${cpath}`.quiet();
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};


/** Fs rename */
const fs_renameFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            const fdata: FS_RENAME_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, newName = cdir.newName;
                        const stat = await fs_API.current.stat(cpath);
                        if (!stat.isDirectory) continue;
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, newName = cdir.newName;
                        /* await fs_node_API.current.access(cpath) // check if current dir exists */
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_node_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, newName = cdir.newName;
                        /* await fs_node_API.current.access(cpath) // check if current dir exists */
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_node_API.current.rename(cpath, npath);
                    }
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cdir = fdata[a]; /* current dir data */
                    //     const cpath = cdir.path, newName = cdir.newName;
                    //     let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                    //     await fs_API.current.rename(cpath, npath);
                    // }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: FS_RENAME_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cpath = cfil.path, newName = cfil.newName;
                        const stat = await fs_API.current.stat(cpath);
                        if (!stat.isFile) continue;
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cpath = cfil.path, newName = cfil.newName;
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_node_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cpath = cfil.path, newName = cfil.newName;
                        let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                        await fs_node_API.current.rename(cpath, npath);
                    }
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cfil = fdata[a]; /* current file data */
                    //     const cpath = cfil.path, newName = cfil.newName;
                    //     let npath = getNewPathFunc({ oldPath: cpath, newName: newName });
                    //     await fs_API.current.rename(cpath, npath);
                    // }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};


/** Fs move */
const fs_moveFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            const fdata: FS_MOVE_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir */
                        const cpath = cdir.from, npath = cdir.to;
                        const cstat = await fs_API.current.stat(cpath);
                        if (!cstat.isDirectory) continue;
                        await fs_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir */
                        const cpath = cdir.from, npath = cdir.to;
                        await fs_node_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir */
                        const cpath = cdir.from, npath = cdir.to;
                        await fs_node_API.current.rename(cpath, npath);
                    }
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cdir = fdata[a]; /* current dir */
                    //     const cpath = cdir.from, npath = cdir.to;
                    //     await fs_API.current.rename(cpath, npath);
                    // }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: FS_MOVE_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file */
                        const cpath = cfil.from, npath = cfil.to;
                        const cstat = await fs_API.current.stat(cpath);
                        if (!cstat.isFile) continue;
                        await fs_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file */
                        const cpath = cfil.from, npath = cfil.to;
                        await fs_node_API.current.rename(cpath, npath);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file */
                        const cpath = cfil.from, npath = cfil.to;
                        await fs_node_API.current.rename(cpath, npath);
                    }
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cfil = fdata[a]; /* current file */
                    //     const cpath = cfil.from, npath = cfil.to;
                    //     await fs_API.current.rename(cpath, npath);
                    // }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};


/** Fs copy */
const fs_copyFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            const fdata: FS_COPY_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cfrom = cdir.from, cto = cdir.to;

                        /* - */
                        const fost = await fs_API.current.stat(cfrom);
                        if (!fost.isDirectory) throw new Error(`The direction "${fost}" doesn't exists`);

                        /* create new dir */
                        await fs_API.current.mkdir(cto, { recursive: true });

                        /* Copy contents */
                        for await (const dentry of fs_API.current.readDir(cfrom)) {
                            const srcPath = `${cfrom}/${dentry.name}`;
                            const destPath = `${cto}/${dentry.name}`;

                            if (dentry.isDirectory) {
                                const ndat: any = { from: srcPath, to: destPath };
                                await fs_copyFunc({ type: 'folder', data: ndat });

                            } else if (dentry.isFile) await fs_API.current.copyFile(srcPath, destPath);
                        }
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cfrom = cdir.from, cto = cdir.to;
                        await fs_node_API.current.mkdir(cto, { recursive: true });

                        const entries = await fs_node_API.current.readdir(cfrom, { withFileTypes: true });
                        await Promise.all(entries.map(async (entry: any) => {
                            const srcPath = `${cfrom}/${entry.name}`;
                            const destPath = `${cto}/${entry.name}`;

                            if (entry.isDirectory()) {
                                const ndat: any = { from: srcPath, to: destPath };
                                await fs_copyFunc({ type: 'folder', data: ndat });

                            } else if (entry.isFile()) await fs_node_API.current.copyFile(srcPath, destPath);
                        }));
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cfrom = cdir.from, cto = cdir.to;
                        await fs_API.current.$`cp -r ${cfrom} ${cto}`.quiet();
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: FS_COPY_X_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cfrom = cfil.from, cto = cfil.to;
                        //  ovw = cfil.overwrite || false;
                        const fost = await fs_API.current.stat(cfrom);
                        if (!fost.isFile) throw new Error(`"${cfrom}" is not a file`);
                        // if (!ovw) {
                        //     const cfl = await fs_API.current.stat(cto);
                        //     if (cfl.isFile) throw new Error(`The file "${cto}" already exists - You can use "overwrite=true" to replace`);
                        // }
                        await fs_API.current.copyFile(cfrom, cto);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cfrom = cfil.from, cto = cfil.to;
                        //  ovw = cfil.overwrite || false;
                        await fs_node_API.current.copyFile(cfrom, cto);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cfil = fdata[a]; /* current file data */
                        const cfrom = cfil.from, cto = cfil.to;
                        //  ovw = cfil.overwrite || false;
                        const src = fs_API.current.file(cfrom);
                        const dest = fs_API.current.file(cto);
                        await fs_API.current.write(dest, src.stream());
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};


/** Fs clear */
const fs_clearFunc = async (x: { type: FS_METHOD_TYPE, data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        /* Folder */
        if (type === 'folder') {
            const fdata: FS_CLEAR_FOLDER_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, ctarg = cdir.target || 'all';
                        /* Remove all contents */
                        for await (const entry of fs_API.current.readDir(cpath)) {
                            const entryPath = `${cpath}/${entry.name}`;
                            if (entry.isFile && ['files', 'all'].includes(ctarg)) await fs_API.current.remove(entryPath);
                            else if (entry.isDirectory && ['folders', 'all'].includes(ctarg)) await fs_API.current.remove(entryPath, { recursive: true });
                        }
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, ctarg = cdir.target || 'all';
                        const files = await fs_node_API.current.readdir(cpath, { withFileTypes: true });
                        await Promise.all(
                            files.map((file: any) => {
                                const fname = file.name;
                                const fullPath = `${cpath}/${fname}`;
                                if (file.isFile() && ['files', 'all'].includes(ctarg)) return fs_node_API.current.unlink(fullPath);
                                else if (file.isDirectory() && ['folders', 'all'].includes(ctarg)) return fs_node_API.current.rm(fullPath, { recursive: true, force: true });
                            })
                        );
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cdir = fdata[a]; /* current dir data */
                        const cpath = cdir.path, ctarg = cdir.target || 'all';
                        const files = await fs_node_API.current.readdir(cpath, { withFileTypes: true });
                        await Promise.all(
                            files.map((file: any) => {
                                const fname = file.name;
                                const fullPath = `${cpath}/${fname}`;
                                if (file.isFile() && ['files', 'all'].includes(ctarg)) return fs_node_API.current.unlink(fullPath);
                                else if (file.isDirectory() && ['folders', 'all'].includes(ctarg)) return fs_node_API.current.rm(fullPath, { recursive: true, force: true });
                            })
                        );
                    }
                    // if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    // if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    //     const cdir = fdata[a]; /* current dir data */
                    //     const cpath = cdir.path, ctarg = cdir.target || 'all';
                    //     /* Remove all contents */
                    //     const entries = await fs_API.current.readdir(cpath, { withFileTypes: true });
                    //     for (const dentry of entries) {
                    //         const enam = dentry.name;
                    //         const fpath = `${cpath}/${enam}`;
                    //         if (dentry.isFile() && ['files', 'all'].includes(ctarg)) await fs_API.current.$`rm ${fpath}`.quiet();
                    //         else if (dentry.isDirectory() && ['folders', 'all'].includes(ctarg)) await fs_API.current.$`rm -rf ${fpath}`.quiet();
                    //     }
                    // }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: string[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current file path */
                        await Deno.truncate(cpath, 0);
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current file path */
                        await fs_node_API.current.truncate(cpath, 0);
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const cpath = fdata[a]; /* current file path */
                        await fs_API.current.write(cpath, '');
                    }
                } break;

                /* For "React_native" */
                case 'React_native': {
                    if (fs_API.current === undefined) throw new Error(`Fs package for "React_native" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                    }
                } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[FS] :: ${e.message}` };
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* Watchers */

/* Set up watchers for feed */
const setupFeedWatchersFunc = (x: { target: string | string[], event: WATCH_FEED_ON_ARG_TYPE, wid: string }) => {
    try {
        const target = x.target, event = x.event, wid = (typeof x.wid !== 'string') ? generateIdFunc({ length: 8 }) : x.wid;
        const setFunc = event.set, updateFunc = event.update, deleteFunc = event.delete;

        /* create new watcher mapping */
        const wex = hasPropertyFunc(watcher_mapping_DATA, wid);
        if (!wex) watcher_mapping_DATA[wid] = { id: wid, type: 'feed', targets: {} };

        /* init "_$$default" watcher */
        feed_watcher_DATA['_$$default'] = { set: {}, update: {}, delete: {} };

        /* process each feed */
        const trg = (typeof target === 'string') ? [target] : target;
        for (let t = 0; t < trg.length; t++) {
            const ctarg = trg[t];
            if (typeof ctarg !== 'string' || ctarg === '') continue;

            /* init feed watcher */
            const wex = hasPropertyFunc(feed_watcher_DATA, ctarg);
            if (!wex) feed_watcher_DATA[ctarg] = { set: {}, update: {}, delete: {} };

            /* set functions for feed */
            if (typeof setFunc === 'function') feed_watcher_DATA[ctarg]['set'][wid] = setFunc;
            if (typeof updateFunc === 'function') feed_watcher_DATA[ctarg]['update'][wid] = updateFunc;
            if (typeof deleteFunc === 'function') feed_watcher_DATA[ctarg]['delete'][wid] = deleteFunc;

            /* add feed to watcher mapping */
            watcher_mapping_DATA[wid]['targets'][ctarg] = ctarg;
        }

        /* set functions for "_$$default" */
        if (typeof setFunc === 'function') feed_watcher_DATA['_$$default']['set'][wid] = setFunc;
        if (typeof updateFunc === 'function') feed_watcher_DATA['_$$default']['update'][wid] = updateFunc;
        if (typeof deleteFunc === 'function') feed_watcher_DATA['_$$default']['delete'][wid] = deleteFunc;

    } catch (e: any) { /* No action needed here */ }
};
/* Trigger feed watchers */
const triggerFeedWatcherFunc = (x: { target: string, type: 'set' | 'update' | 'delete' }): void => {
    try {
        const target = x.target, type = x.type;
        if (!hasPropertyFunc(feed_watcher_DATA, target)) throw new Error(`Target "${target}" not found !`);

        /* - */
        switch (type) {
            case 'set': {
                const fobj = feed_watcher_DATA[target]['set'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    const fdata = cloneObjFunc({ obj: feed_DATA[target] });
                    func({ id: target, data: fdata }); /* exec set func */
                }
            } break;

            case 'update': {
                const fobj = feed_watcher_DATA[target]['update'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    const fdata = cloneObjFunc({ obj: feed_DATA[target] });
                    func({ id: target, data: fdata }); /* exec update func */
                }
            } break;

            case 'delete': {
                const fobj = feed_watcher_DATA[target]['delete'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    const fdata = cloneObjFunc({ obj: feed_DATA[target] });
                    func({ id: target, data: fdata }); /* exec delete func */
                }
            } break;

            default: { };
        };

    } catch (e: any) {
        // logFunc('tgg feed watcher failed ::', e.message);
    }
};


/* Set up watchers for branch */
const setupBranchWatchersFunc = (x: { target: string | string[], tree: string, event: WATCH_BRANCH_ON_ARG_TYPE, wid: string }) => {
    try {
        const target = x.target, tree = x.tree, event = x.event, wid = (typeof x.wid !== 'string') ? generateIdFunc({ length: 8 }) : x.wid;
        const addFunc = event.set, deleteFunc = event.delete, self_create = event.self_create, self_delete = event.self_delete;

        /* create new watcher mapping */
        const wex = hasPropertyFunc(watcher_mapping_DATA, wid);
        if (!wex) watcher_mapping_DATA[wid] = { id: wid, type: 'branch', targets: {} };

        /* init "tree" watcher */
        const ctr = hasPropertyFunc(branch_watcher_DATA, tree);
        if (!ctr) branch_watcher_DATA[tree] = {};

        /* init "_$$default" watcher */
        branch_watcher_DATA[tree]['_$$default'] = { set: {}, delete: {}, self_create: {}, self_delete: {} };

        /* process each branch */
        const trg = (typeof target === 'string') ? [target] : target;
        for (let t = 0; t < trg.length; t++) {
            const ctarg = trg[t];
            if (typeof ctarg !== 'string' || ctarg === '') continue;

            /* init branch watcher */
            const wex = hasPropertyFunc(branch_watcher_DATA[tree], ctarg);
            if (!wex) branch_watcher_DATA[tree][ctarg] = { set: {}, delete: {}, self_create: {}, self_delete: {} };

            /* set functions for branch */
            if (typeof addFunc === 'function') branch_watcher_DATA[tree][ctarg]['set'][wid] = addFunc;
            if (typeof deleteFunc === 'function') branch_watcher_DATA[tree][ctarg]['delete'][wid] = deleteFunc;
            if (typeof self_create === 'function') branch_watcher_DATA[tree][ctarg]['self_create'][wid] = self_create;
            if (typeof self_delete === 'function') branch_watcher_DATA[tree][ctarg]['self_delete'][wid] = self_delete;

            /* add branch to watcher mapping */
            watcher_mapping_DATA[wid]['targets'][ctarg] = ctarg;
        }

        /* set functions for "_$$default" */
        if (typeof addFunc === 'function') branch_watcher_DATA[tree]['_$$default']['set'][wid] = addFunc;
        if (typeof deleteFunc === 'function') branch_watcher_DATA[tree]['_$$default']['delete'][wid] = deleteFunc;
        if (typeof self_create === 'function') branch_watcher_DATA[tree]['_$$default']['self_create'][wid] = self_create;
        if (typeof self_delete === 'function') branch_watcher_DATA[tree]['_$$default']['self_delete'][wid] = self_delete;

    } catch (e: any) { /* No action needed here */ }
};
/* Trigger branch watchers */
const triggerBranchWatcherFunc = (x: { target: string, tree: string, type: 'set' | 'delete' | 'self_create' | 'self_delete', data: string[] }) => {
    try {
        const target = x.target, tree = x.tree, type = x.type, fdata = x.data || [];
        if (!hasPropertyFunc(branch_watcher_DATA[tree], target)) throw new Error(`Target "${target}" not found !`);

        /* - */
        switch (type) {
            case 'set': {
                const fobj = branch_watcher_DATA[tree][target]['set'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ name: target, data: fdata }); /* exec set func */
                }
            } break;

            case 'delete': {
                const fobj = branch_watcher_DATA[tree][target]['delete'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ name: target, data: fdata }); /* exec delete func */
                }
            } break;

            case 'self_create': {
                const fobj = branch_watcher_DATA[tree][target]['self_create'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ name: target, data: fdata }); /* exec self delete func */
                }
            } break;

            case 'self_delete': {
                const fobj = branch_watcher_DATA[tree][target]['self_delete'];
                const ftab = Object.values(fobj);
                if (ftab.length > 0) for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ name: target, data: fdata }); /* exec self delete func */
                }
            } break;

            default: { };
        };

    } catch (e: any) {
        // logFunc('tgg branch watcher failed ::', e.message);
    }
};


/* Set up watchers for store */
const setupStoreWatchersFunc = (x: { event: WATCH_STORE_ON_ARG_TYPE, wid: string }) => {
    try {
        const event = x.event, wid = (typeof x.wid !== 'string') ? generateIdFunc({ length: 8 }) : x.wid;

        /* create new watcher mapping */
        const wex = hasPropertyFunc(watcher_mapping_DATA, wid);
        if (!wex) watcher_mapping_DATA[wid] = { id: wid, type: 'store', targets: {} };

        /* - */
        const addFunc = event.set, updateFunc = event.update, deleteFunc = event.delete;
        if (typeof addFunc === 'function') store_watcher_DATA['set'][wid] = addFunc;
        if (typeof updateFunc === 'function') store_watcher_DATA['update'][wid] = updateFunc;
        if (typeof deleteFunc === 'function') store_watcher_DATA['delete'][wid] = deleteFunc;
    } catch (e: any) { /* No action needed here */ }
};
/* Trigger store watchers */
const triggerStoreWatcherFunc = (x: { type: 'set' | 'update' | 'delete', data: any }) => {
    try {
        const type = x.type, data = cloneObjFunc({ obj: x.data }) || {};

        /* check if data isn't empty */
        const n = Object.keys(data).length;
        if (n === 0) throw new Error();

        switch (type) {
            case 'set': {
                const fobj = store_watcher_DATA['set'];
                const ftab = Object.values(fobj);
                for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ data: data }); /* exec set func */
                }
            } break;

            case 'update': {
                const fobj = store_watcher_DATA['update'];
                const ftab = Object.values(fobj);
                for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ data: data }); /* exec update func */
                }
            } break;

            case 'delete': {
                const fobj = store_watcher_DATA['delete'];
                const ftab = Object.values(fobj);
                for (let f = 0; f < ftab.length; f++) {
                    const func = ftab[f];
                    func({ data: data }); /* exec delete func */
                }
            } break;

            default: { };
        };

    } catch (e: any) {
        // logFunc('tgg branch watcher failed ::', e.message);
    }
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Use watcher */

/* Manipulate watchers */
const useWatcherFunc = (x: { wid: string, type: 'set' | 'add' | 'delete' | 'clear', target: 'feed' | 'branch', data?: string | string[], tree?: string }): FUNCTION_BASIC_RETURN_TYPE => {
    const wid = x.wid; /* watcher id */
    const type = x.type;
    const target = x.target;
    const data = (x.data === '*') ? '*' : (typeof x.data === 'string') ? [x.data] : (Array.isArray(x.data)) ? x.data : undefined;
    const tree = x.tree || undefined;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };;

    /* - */
    try {
        /* check if watcher exists */
        const cw = hasPropertyFunc(watcher_mapping_DATA, wid);
        if (!cw) throw new Error(`Watcher "${wid}" not found`);

        /* get watcher type */
        const wtype = watcher_mapping_DATA[wid].type;

        /* check watcher type */
        if (type !== 'clear' && wtype !== target) { throw new Error(`Unmatched type - Watcher "${wid}" is of type "${wtype}"`) }

        /* clear watchers */
        if (type === 'clear') {
            /* For feed */
            if (wtype === 'feed') {
                const fwk: string[] = Object.keys(feed_watcher_DATA); /* get watched feed id */
                if (fwk.length > 0) for (let d = 0; d < fwk.length; d++) {
                    const fid = fwk[d];
                    if (fid === '_$$default') continue;
                    delete feed_watcher_DATA[fid];
                }
            }
            /* For branch */
            else if (wtype === 'branch') {
                if (typeof tree !== 'string') throw new Error(`The tree should be a "string"`); /* check tree type */

                /* check if tree exists */
                const ex = hasPropertyFunc(branch_watcher_DATA, tree);
                if (!ex) throw new Error(`Tree "${tree}" not found`);

                /* get watched branch id and process to deletion if possible */
                const fwk: string[] = Object.keys(branch_watcher_DATA[tree]);
                if (fwk.length > 0) for (let d = 0; d < fwk.length; d++) {
                    const bid = fwk[d];
                    if (bid === '_$$default') continue;
                    delete branch_watcher_DATA[tree][bid];
                    delete watcher_mapping_DATA[wid]['targets'][bid]; /* delete branch id from "watcher_mapping_DATA" */
                }
            }
        }

        /* set, add or delete watchers */
        else {

            /* set, add or delete "feed" watchers */
            if (target === 'feed') {
                switch (type) {
                    case 'set': {
                        /* check if valid data is provided */
                        if (data === '*') throw new Error(`You can't use "*" for "set" operations - It's only valid for "delete" operations`);
                        if (data === undefined || !Array.isArray(data)) throw new Error(`Invalid feed id`);

                        /* get watched feed id */
                        const fwk: string[] = Object.keys(feed_watcher_DATA);

                        /* set new feed */
                        const dlen = data.length;
                        if (dlen > 0) for (let d = 0; d < dlen; d++) {
                            const fid = data[d];
                            if (typeof fid !== 'string') throw new Error(`The feed id should be a "string"`); /* check fid type */

                            /* init feed watcher */
                            const cfw = hasPropertyFunc(feed_watcher_DATA, fid);
                            if (!cfw) feed_watcher_DATA[fid] = { set: {}, update: {}, delete: {} };

                            /* - */
                            feed_watcher_DATA[fid]['set'][wid] = feed_watcher_DATA['_$$default']['set'][wid];
                            feed_watcher_DATA[fid]['update'][wid] = feed_watcher_DATA['_$$default']['update'][wid];
                            feed_watcher_DATA[fid]['delete'][wid] = feed_watcher_DATA['_$$default']['delete'][wid];

                            /* add feed id to "watcher_mapping_DATA" */
                            watcher_mapping_DATA[wid]['targets'][fid] = fid;
                        }

                        /* delete old feed */
                        const etab = [...data, '_$$default']; /* exclusion tab - feed id to not delete */
                        for (let d = 0; d < fwk.length; d++) {
                            const fid = fwk[d], inc = etab.includes(fid);
                            if (!inc) {
                                delete feed_watcher_DATA[fid];
                                delete watcher_mapping_DATA[wid]['targets'][fid]; /* delete feed id from "watcher_mapping_DATA" */
                            }
                        }
                    } break;

                    case 'add': {
                        /* check if valid data is provided */
                        if (data === '*') throw new Error(`You can't use "*" for "add" operations - It's only valid for "delete" operations`);
                        if (data === undefined || !Array.isArray(data)) throw new Error(`Invalid feed id`);

                        /* add new feed */
                        const dlen = data.length;
                        if (dlen > 0) for (let d = 0; d < dlen; d++) {
                            const fid = data[d];
                            if (typeof fid !== 'string') throw new Error(`The feed id should be a "string"`); /* check fid type */

                            /* init feed watcher */
                            const cfw = hasPropertyFunc(feed_watcher_DATA, fid);
                            if (!cfw) feed_watcher_DATA[fid] = { set: {}, update: {}, delete: {} };

                            /* - */
                            feed_watcher_DATA[fid]['set'][wid] = feed_watcher_DATA['_$$default']['set'][wid];
                            feed_watcher_DATA[fid]['update'][wid] = feed_watcher_DATA['_$$default']['update'][wid];
                            feed_watcher_DATA[fid]['delete'][wid] = feed_watcher_DATA['_$$default']['delete'][wid];
                        }
                    } break;

                    case 'delete': {
                        /* check if valid data is provided */
                        if (data === undefined) throw new Error(`Invalid feed id`);

                        /* delete feed */
                        if (data === '*') {
                            const fwk: string[] = Object.keys(feed_watcher_DATA); /* get watched feed id */
                            for (let d = 0; d < fwk.length; d++) {
                                const fid = fwk[d];
                                if (fid === '_$$default') continue;
                                delete feed_watcher_DATA[fid];
                                delete watcher_mapping_DATA[wid]['targets'][fid]; /* delete feed id from "watcher_mapping_DATA" */
                            }

                        } else {
                            const dlen = data.length;
                            for (let d = 0; d < dlen; d++) {
                                const fid = data[d];
                                if (typeof fid !== 'string') throw new Error(`The feed id should be a "string"`); /* check fid type */
                                if (fid === '_$$default') continue;
                                delete feed_watcher_DATA[fid];
                                delete watcher_mapping_DATA[wid]['targets'][fid]; /* delete feed id from "watcher_mapping_DATA" */
                            }
                        }
                    } break;

                    default: { };
                };
            }

            /* set, add or delete "branch" watchers */
            else if (target === 'branch') {
                if (typeof tree !== 'string') throw new Error(`The tree name should be a "string"`); /* check tree type */
                switch (type) {
                    case 'set': {
                        /* check if valid data is provided */
                        if (data === '*') throw new Error(`You can't use "*" for "set" operations - It's only valid for "delete" operations`);
                        if (data === undefined || !Array.isArray(data)) throw new Error(`Invalid branch name`);

                        /* get watched branch id */
                        const fwk: string[] = Object.keys(branch_watcher_DATA[tree]);

                        /* init tree */
                        const ctw = hasPropertyFunc(branch_watcher_DATA, tree);
                        if (!ctw) branch_watcher_DATA[tree] = {};

                        /* set new branch */
                        const dlen = data.length;
                        if (dlen > 0) for (let d = 0; d < dlen; d++) {
                            const bid = data[d];
                            if (typeof bid !== 'string') throw new Error(`The branch name should be a "string"`); /* check bid type */

                            /* init branch */
                            const cbw = hasPropertyFunc(branch_watcher_DATA[tree], bid);
                            if (!cbw) branch_watcher_DATA[tree][bid] = { set: {}, delete: {}, self_create: {}, self_delete: {} };

                            /* - */
                            branch_watcher_DATA[tree][bid]['set'][wid] = branch_watcher_DATA[tree]['_$$default']['set'][wid];
                            branch_watcher_DATA[tree][bid]['delete'][wid] = branch_watcher_DATA[tree]['_$$default']['delete'][wid];
                            branch_watcher_DATA[tree][bid]['self_create'][wid] = branch_watcher_DATA[tree]['_$$default']['self_create'][wid];
                            branch_watcher_DATA[tree][bid]['self_delete'][wid] = branch_watcher_DATA[tree]['_$$default']['self_delete'][wid];

                            /* add branch id to "watcher_mapping_DATA" */
                            watcher_mapping_DATA[wid]['targets'][bid] = bid;
                        }

                        /* delete old branch */
                        const etab = [...data, '_$$default']; /* exclusion tab - branch id to not delete */
                        for (let d = 0; d < fwk.length; d++) {
                            const bid = fwk[d], inc = etab.includes(bid);
                            if (!inc) {
                                delete branch_watcher_DATA[tree][bid];
                                delete watcher_mapping_DATA[wid]['targets'][bid]; /* delete branch id from "watcher_mapping_DATA" */
                            }
                        }
                    } break;

                    case 'add': {
                        /* check if valid data is provided */
                        if (data === '*') throw new Error(`You can't use "*" for "add" operations - It's only valid for "delete" operations`);
                        if (data === undefined || !Array.isArray(data)) throw new Error(`Invalid branch name`);

                        /* init tree */
                        const ctw = hasPropertyFunc(branch_watcher_DATA, tree);
                        if (!ctw) branch_watcher_DATA[tree] = {};

                        /* add new branch */
                        const dlen = data.length;
                        if (dlen > 0) for (let d = 0; d < dlen; d++) {
                            const bid = data[d];
                            if (typeof bid !== 'string') throw new Error(`The branch name should be a "string"`); /* check bid type */

                            /* init branch */
                            const cbw = hasPropertyFunc(branch_watcher_DATA[tree], bid);
                            if (!cbw) branch_watcher_DATA[tree][bid] = { set: {}, delete: {}, self_create: {}, self_delete: {} };

                            /* - */
                            branch_watcher_DATA[tree][bid]['set'][wid] = branch_watcher_DATA[tree]['_$$default']['set'][wid];
                            branch_watcher_DATA[tree][bid]['delete'][wid] = branch_watcher_DATA[tree]['_$$default']['delete'][wid];
                            branch_watcher_DATA[tree][bid]['self_create'][wid] = branch_watcher_DATA[tree]['_$$default']['self_create'][wid];
                            branch_watcher_DATA[tree][bid]['self_delete'][wid] = branch_watcher_DATA[tree]['_$$default']['self_delete'][wid];

                            /* add branch id to "watcher_mapping_DATA" */
                            watcher_mapping_DATA[wid]['targets'][bid] = bid;
                        }
                    } break;

                    case 'delete': {
                        /* check if valid data is provided */
                        if (data === undefined) throw new Error(`Invalid branch name`);

                        /* delete branch */
                        if (data === '*') {
                            const fwk: string[] = Object.keys(branch_watcher_DATA[tree]); /* get watched branch id */
                            for (let d = 0; d < fwk.length; d++) {
                                const bid = fwk[d];
                                if (bid === '_$$default') continue;
                                delete branch_watcher_DATA[tree][bid];
                                delete watcher_mapping_DATA[wid]['targets'][bid]; /* delete branch id from "watcher_mapping_DATA" */
                            }

                        } else {
                            const dlen = data.length;
                            for (let d = 0; d < dlen; d++) {
                                const bid = data[d];
                                if (typeof bid !== 'string') throw new Error(`The branch name should be a "string"`); /* check bid type */
                                if (bid === '_$$default') continue;
                                delete branch_watcher_DATA[tree][bid];
                                delete watcher_mapping_DATA[wid]['targets'][bid]; /* delete branch id from "watcher_mapping_DATA" */
                            }
                        }
                    } break;

                    default: { };
                };
            }

        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };

    /* return */
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Trigger */

/* Create trigger */
const createTriggerFunc = (x: TRIGGER_CREATE_ARG_TYPE): FUNCTION_BASIC_RETURN_TYPE => {
    const id = x.id, family = x.family || '', methods = x.methods;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };

    /* - */
    try {
        /* check if at least one method is provided */
        const mtc = Object.keys(methods);
        if (mtc.length === 0) { res.status = 'error'; throw new Error(`You didn't provide any method`) }

        /* check if "id" is valid */
        const iiv = isAlphanumericFunc({ value: id, acceptSpecial: true });
        if (!iiv) { res.status = 'error'; throw new Error(`Invalid trigger id "${id}" - The trigger id should be alphanumeric and can only contain special char like "-" or "_"`) }

        /* check if id doesn't already exists */
        const chid = hasPropertyFunc(trigger_method_DATA['id'], id);
        if (chid) { res.status = 'error'; throw new Error(`The id "${id}" is already used by another trigger`) }
        else trigger_method_DATA['id'][id] = {}; /* init "id" */

        /* set method for "id" */
        Object.assign(trigger_method_DATA['id'][id], methods);

        /* For family */
        if (family !== undefined) {
            /* check family */
            const isAlp = isAlphanumericFunc({ value: family, acceptSpecial: true });
            if (!isAlp) { res.status = 'error'; throw new Error(`Invalid family name "${family}" - The family name should be alphanumeric and can only contain special char like "-" or "_"`) }

            /* init family */
            const chfm = hasPropertyFunc(trigger_method_DATA['family'], family);
            if (!chfm) trigger_method_DATA['family'][family] = {};

            /* set id into given family, if it's provided */
            trigger_method_DATA['family'][family][id] = id;
        }

    } catch (e: any) { res.log = e.message }

    /* return */
    return res;
};

/* Run trigger */
const runTriggerFunc = (x: { type: 'id' | 'family', source: string, func: TRIGGER_RUN_FUNC_TYPE[] }): FUNCTION_BASIC_RETURN_TYPE => {
    const type = x.type, source = x.source, func = x.func;
    let res: JSON_BASIC_TYPE = {};
    let final: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };

    try {
        /* check if family exists */
        if (type === 'family') {
            const cfam = hasPropertyFunc(trigger_method_DATA['family'], source);
            if (!cfam) throw new Error(`Trigger with family "${source}" not found`);
        }
        /* check if trigger "id" exists */
        else if (type === 'id') {
            const cf = hasPropertyFunc(trigger_method_DATA['id'], source);
            if (!cf) throw new Error(`Trigger with id "${source}" not found`);
        }

        /* - */
        const idTab = (type === 'id') ? [source] : Object.keys(trigger_method_DATA['family'][source]);
        if (idTab.length > 0) for (let f = 0; f < idTab.length; f++) { /* For each trigger */
            const cid = idTab[f]; /* trigger "id" */
            const ctarg = trigger_method_DATA['id'][cid];
            const resCol: JSON_BASIC_TYPE = {};

            /* - */
            let usedFid: string[] = [];
            for (let c = 0; c < func.length; c++) { /* For each function of the current trigger */
                const cfunc = func[c];
                const name = cfunc.name, alias = cfunc.alias, args = cfunc.args;
                const fid = alias !== '' ? alias : name; /* choose function id - set "alias" by default if available */

                /* check and ignore duplicated "fid" */
                if (usedFid.includes(fid)) continue;
                usedFid.push(fid); /* set "fid" */

                /* exec func */
                const mtod = ctarg[name];
                if (typeof mtod !== 'function') { resCol[fid] = `Method "${name}" not found on trigger "${cid}"`; continue }
                let exe: any = undefined;
                try { exe = (args.length > 0) ? mtod(...args) : mtod() } catch (e: any) { exe = `["${fid}" crashed] :: ${e.message}` }

                /* collect function response */
                resCol[fid] = exe || undefined;
            }

            /* - */
            res[cid] = resCol;
        }

        /* set data */
        final.data = res;

    } catch (e: any) { final.status = 'error'; final.log = e.message }

    /* return */
    return final;
};

/* Run trigger async */
const runTriggerAsyncFunc = async (x: { type: 'id' | 'family', source: string, func: TRIGGER_RUN_FUNC_TYPE[], xorder: TRIGGER_ARG_Y_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    const type = x.type, source = x.source, func = x.func, xorder = x.xorder; /* xorder = exection order */
    let res: JSON_BASIC_TYPE = {};
    let final: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let pfunc = [];

    try {
        /* check if family exists */
        if (type === 'family') {
            const cfam = hasPropertyFunc(trigger_method_DATA['family'], source);
            if (!cfam) throw new Error(`Trigger with family "${source}" not found`);
        }
        /* check if trigger "id" exists */
        else if (type === 'id') {
            const cf = hasPropertyFunc(trigger_method_DATA['id'], source);
            if (!cf) throw new Error(`Trigger with id "${source}" not found`);
        }

        /* - */
        const idTab = (type === 'id') ? [source] : Object.keys(trigger_method_DATA['family'][source]);
        let lrate = 0;
        if (idTab.length > 0) for (let f = 0; f < idTab.length; f++) { /* For each trigger */
            /* Trigger a "LIB" */
            if (lrate > 0 && lrate % LIB_config.current.rate === 0) await delayFunc({ ms: LIB_config.current.ms }); /* Let It Breath */

            /* - */
            const cid = idTab[f]; /* trigger "id" */
            const ctarg = trigger_method_DATA['id'][cid];
            const resCol: JSON_BASIC_TYPE = {};

            /* - */
            let usedFid: string[] = [];
            for (let c = 0; c < func.length; c++) { /* For each function of the current trigger */
                const cfunc = func[c];
                const fname = cfunc.name, falias = cfunc.alias, fargs = cfunc.args;
                const fid = falias !== '' ? falias : fname; /* choose function id - set "alias" by default if available */

                /* check and ignore duplicated "fid" */
                if (usedFid.includes(fid)) continue;
                usedFid.push(fid); /* set "fid" */

                /* - */
                const mtod = ctarg[fname];
                let exe: any = undefined;

                /* exec funcs sequentially */
                if (xorder === 'sequential') {
                    if (typeof mtod !== 'function') { resCol[fid] = `Method "${fname}" not found on trigger "${cid}"`; continue }
                    try { exe = (fargs.length > 0) ? await mtod(...fargs) : await mtod(); } catch (e: any) { exe = `["${fid}" crashed] :: ${e.message}` }
                    resCol[fid] = exe || undefined; /* collect function response */
                }
                /* exec funcs in parallel */
                else {
                    if (typeof mtod !== 'function') { resCol[fid] = `Method "${fname}" not found on trigger "${cid}"`; continue }
                    const fn = async (): Promise<any> => {
                        let pid = cid, pfun = fid;
                        let runFunc = undefined;
                        try { runFunc = (fargs.length > 0) ? await mtod(...fargs) : await mtod(); } catch (e: any) { runFunc = `["${fid}" crashed] :: ${e.message}` }
                        const chpid = hasPropertyFunc(res, pid);
                        if (!chpid) res[pid] = {};
                        res[pid][pfun] = runFunc || undefined;
                    };
                    pfunc.push(fn);
                }
            }

            /* set res */
            if (xorder === 'sequential') res[cid] = resCol;

            /* update loop rate */
            lrate++;
        }

        /* If parallel */
        if (xorder === 'parallel') await Promise.allSettled(pfunc.map((fn) => fn()));

        /* set data */
        final.data = res;

    } catch (e: any) { final.status = 'error'; final.log = `[Trigger] :: ${e.message}` }
    return final;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Extract */

/* Extract "feed_id", "branch_name" and "tree_name" */
const extractDataFunc = (...args: any): FUNCTION_BASIC_RETURN_TYPE => {
    const x: EXTRACT_ARG_X_TYPE = args[0], y = args[1] || undefined, z = args[2] || undefined;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: [] };

    /* extract */
    try {
        switch (x) {
            case 'feed_id': {
                const bname = y, tname = z;

                /* check tree */
                if (typeof tname !== 'string') { res.status = 'error'; throw new Error(`Invalid tree`) }
                const ctr = hasPropertyFunc(branch_DATA, tname);
                if (!ctr) { res.status = 'error'; throw new Error(`Tree "${tname}" not found`) }

                /* check branch */
                if (typeof bname !== 'string') { res.status = 'error'; throw new Error(`Invalid branch`) }
                const cbr = hasPropertyFunc(branch_DATA[tname], bname);
                if (!cbr) { res.status = 'error'; throw new Error(`Branch "${bname}" not found`) }

                /* extract feedId */
                const tab = Object.keys(branch_DATA[tname][bname].feedMainKey);
                res.data = tab;
            } break;

            case 'branch_name': {
                const tname = y;

                /* check tree */
                if (typeof tname !== 'string') { res.status = 'error'; throw new Error(`Invalid tree`) }
                const ctr = hasPropertyFunc(branch_DATA, tname);
                if (!ctr) { res.status = 'error'; throw new Error(`Tree "${tname}" not found`) }

                /* extract branches */
                const tab = Object.keys(branch_DATA[tname]);
                res.data = tab;
            } break;

            case 'tree_name': {
                const tab = Object.keys(tree_DATA);
                res.data = tab;
            } break;

            default: { res.status = 'error'; throw new Error(`Unknown type "${x}"`) };
        };

    } catch (e: any) { res.log = e.message };

    /* return */
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* Queries methods */

/** check WebSocket config */
const checkWebsocketConfigFunc = (x: PLG_WS_TYPE, y: RUN_TIME_TYPE): FUNCTION_BASIC_RETURN_TYPE => {
    const ws = x, runtime = y;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let collector: WS_PARSING_COLLECTOR_TYPE[] = [];

    try {
        /* - */
        const asserver = hasPropertyFunc(ws, 'as_server');
        const asclient = hasPropertyFunc(ws, 'as_client');

        /* check server config */
        if (asserver && x.as_server !== undefined) {
            const server = x.as_server;
            const sapi = server.websocket || undefined, sport = server.port || undefined;
            if (sapi === undefined) throw new Error(`Invalid api "${sapi}" for websocket server`);
            if (typeof sport !== 'number') throw new Error(`Invalid port "${sport}" for websocket server`);
            collector.push({ runtime: runtime, type: 'server', api: sapi, port: sport });
        }

        /* check client(s) config */
        if (asclient && x.as_client !== undefined) {
            const client = x.as_client;
            const capi = client.websocket, servers = Array.isArray(client.servers) ? client.servers : [client.servers];
            let idList: string[] = [];
            let hostList: string[] = [];
            for (let c = 0; c < servers.length; c++) {
                const srv = servers[c];
                const id = srv.id, host = srv.host, port = srv.port || undefined;

                /* check id types */
                if (typeof id !== 'string') throw new Error(`Invalid id "${id}" for server at index "${c}"`);
                if (typeof host !== 'string') throw new Error(`Invalid host "${host}" for server at index "${c}"`);

                /* check duplicated id & host */
                if (idList.includes(id)) throw new Error(`Duplicated server id "${id}" for server at index "${c}"`);
                if (hostList.includes(host)) throw new Error(`Duplicated host "${host}" for server at index "${c}"`);

                /* check host format */
                const ph: any = parseUrlFunc({ url: host });
                if (ph === undefined) throw new Error(`Invalid host "${host}" for server at index "${c}"`);
                if (ph.port === undefined && port === undefined) throw new Error(`No port specified for server at index "${c}"`);
                if (!['ws', 'wss'].includes(ph.protocol)) throw new Error(`Invalid protocol "${ph.protocol}"`);
                const fp = ph.port || port;
                const finalHost = (fp !== undefined) ? (`${ph.protocol}://` + ph.hostname + ':' + fp) : (`${ph.protocol}://` + ph.hostname);

                /* add checked "id" and "host" to list */
                idList.push(id);
                hostList.push(host);

                /* collect */
                collector.push({ runtime: runtime, type: 'client', serverId: id, api: capi, host: finalHost });
            }
        }

        /* - */
        res.data = collector;

    } catch (e: any) { res.status = 'error'; res.log = `[WebSocket] :: ${e.message}` };

    /* - */
    return res;
};

/** Check HTTP config */
const checkHTTPconfigFunc = (x: PLG_HTTP_TYPE, y: RUN_TIME_TYPE): FUNCTION_BASIC_RETURN_TYPE => {
    const http = x, runtime = y;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let collector: HTTP_PARSING_COLLECTOR_TYPE[] = [];

    try {
        /* - */
        const asserver = hasPropertyFunc(http, 'as_server');
        const asclient = hasPropertyFunc(http, 'as_client');

        /* check server config */
        if (asserver && x.as_server !== undefined) {
            let mcoll: HTTP_PARSING_COLLECTOR_TYPE = { runtime: runtime, type: 'server', api: {} };
            const server = x.as_server;

            /* check if the server matches the runtime */
            const rn: string = (runtime).toLowerCase();
            const rtype = hasPropertyFunc(server, rn);
            if (!rtype) throw new Error(`You didn't provide "${rn}" APIs`);
            const port = server.port, endpoint = server.endpoint, host = server.host, timeout = server.timeout, requestSize = server.requestSizeLimit, staticFiles = server.staticFiles;

            /* - */
            switch (rn) {
                /* For "deno" */
                case 'deno': {
                    const runapi = server['deno'];
                    if (runapi === undefined) throw new Error(`Invalid api`); /* - */
                    const rkeys = Object.keys(runapi);
                    for (let r = 0; r < rkeys.length; r++) {
                        const gk: any = rkeys[r];
                        const ck: 'api' | 'response' = gk;
                        if (runapi[ck] === undefined) throw new Error(`"${ck}" api is missing`);
                    }
                    mcoll.api = runapi;
                } break;

                /* For "node" */
                case 'node': {
                    const runapi = server['node'];
                    if (runapi === undefined) throw new Error(`Invalid api`); /* - */
                    const rkeys = Object.keys(runapi);
                    for (let r = 0; r < rkeys.length; r++) {
                        const gk: any = rkeys[r];
                        const required = ['express', 'cors', 'bodyParser', 'formidable'].includes(gk);
                        if (!required) continue; /* Ignore api check if it's not required */
                        const ck: 'express' | 'cors' | 'bodyParser' | 'formidable' | 'compression' | 'helmet' = gk;
                        if (runapi[ck] === undefined) throw new Error(`"${ck}" api is missing`);
                    }
                    mcoll.api = runapi;
                } break;

                /* For "bun" */
                case 'bun': {
                    const runapi = server['bun'];
                    if (runapi === undefined) throw new Error(`Invalid api`); /* - */
                    const rkeys = Object.keys(runapi);
                    for (let r = 0; r < rkeys.length; r++) {
                        const gk: any = rkeys[r];
                        const ck: 'api' | 'response' = gk;
                        if (runapi[ck] === undefined) throw new Error(`"${ck}" api is missing`);
                    }
                    mcoll.api = runapi;
                } break;

                /* default */
                default: { };
            };

            /* check endpoint */
            mcoll['endpoint'] = endpoint || _default_http_endpoint_;

            /* check "port" */
            if (port === undefined || typeof port !== 'number') throw new Error(`Invalid server port "${port}" for http plugin`);
            mcoll['port'] = port;

            /* check "host" */
            mcoll['host'] = host || _default_http_host_;

            /* check "timeout" - Ensure that timeout is higher than 5seconds */
            mcoll['timeout'] = (timeout !== undefined && timeout >= 5_000) ? timeout : _default_http_timeout_;

            /* check "requestSize" */
            mcoll['requestSize'] = ((requestSize !== undefined && requestSize >= 10) ? requestSize : _default_max_request_size_) * 1024 * 1024;

            /* check "staticFiles" config */
            if (staticFiles !== undefined) {
                mcoll['staticFiles'] = { routeName: _default_http_static_files_routename_, path: '' };
                const stc = staticFiles;
                /* route name */
                if (stc.routeName !== undefined) mcoll['staticFiles'].routeName = stc.routeName;
                /* path */
                if (stc.path === undefined || stc.path === '') throw new Error(`Invalid static file path`);
                mcoll['staticFiles'].path = stc.path;
            }

            /* - */
            collector.push(mcoll);
        }

        /* check client(s) config */
        if (asclient && x.as_client !== undefined) {
            const client = x.as_client;
            const axios = client.axios, servers = Array.isArray(client.servers) ? client.servers : [client.servers];

            /* check api */
            if (axios === undefined) throw new Error(`Invalid API "${axios}" for http client - Unable to find axios`);

            /* check servers config */
            let usedId: string[] = [];
            let usedUrl: string[] = [];
            if (servers === undefined) throw new Error(`As client, you must provide at least one http server to connect to`);
            for (let s = 0; s < servers.length; s++) {
                const csrv = servers[s];
                const sid = csrv.id, url = csrv.url, endpoint = csrv.endpoint || _default_http_endpoint_;

                /* check "id" */
                if (sid === undefined || sid === '') throw new Error(`Invalid id for server at index "${s}"`);
                if (usedId.includes(sid)) throw new Error(`Duplicated "${sid}" for server at index "${s}"`);
                usedId.push(sid);

                /* Check "url" */
                if (url === undefined || url === '') throw new Error(`Invalid url for server at index "${s}"`);
                if (usedUrl.includes(url)) throw new Error(`Duplicated "${url}" for server at index "${s}"`);
                usedUrl.push(url);

                /* collect data */
                collector.push({ runtime: runtime, type: 'client', api: axios, endpoint: endpoint, serverId: sid, url: url });
            }
        }

        /* set data */
        res.data = collector;

    } catch (e: any) { res.status = 'error'; res.log = `[Http] :: ${e.message}` }

    /* - */
    return res;
};

/** Init forest */
const initForestFunc = (x: any): { badInit: boolean, initLog: string } => {
    let badInit = false, initLog = ``;

    /* check if forest is already init */
    if (env_DATA.hasInit) return { badInit: false, initLog: '' };

    /* - */
    try {
        /* - */
        env_DATA.hasInit = true;

        /* Check if "mk" is provided and valid */
        if (x === undefined || !hasPropertyFunc(x, 'mainKey')) throw new Error(`You didn't provide a "mainKey"`);
        const chm = isAlphanumericFunc({ value: x.mainKey });
        if (!chm) throw new Error(`Your "mainKey" is not alphanumeric`);

        /* extract plugins before chain clonning */
        let ws: any = undefined, fs: any = undefined, http: any = undefined, crypt: any = undefined;
        if (x.plugins !== undefined) {
            ws = x.plugins.ws || undefined; delete x.plugins.ws;
            fs = x.plugins.fs || undefined; delete x.plugins.fs;
            http = x.plugins.http || undefined; delete x.plugins.http;
            crypt = x.plugins.crypto || undefined; delete x.plugins.crypto;
        }

        /* clone chain */
        const xclone = cloneObjFunc({ obj: x });
        const dateFormat: CONDITION_DATE_FORMAT[] | undefined = xclone.dateFormat || undefined;
        const schema = xclone.schema || undefined;
        const LIB = xclone.LIB || undefined;
        const plugins = xclone.plugins || undefined;

        /* set init config */
        initConfig.config = xclone;

        /* extract server id if provided */
        let serverId = '';
        const chid = hasPropertyFunc(x, 'serverId');
        if (chid) {
            const svid = xclone.serverId;
            if (typeof svid !== 'string' || svid === '') throw new Error(`Invalid server id "${svid}"`);
            serverId = svid;
        }

        /* generate private session id */
        const ssid = serverId || generateIdFunc();
        private_session_DATA.id = ssid;
        public_session_DATA.id = ssid;

        /* Set date format */
        if (dateFormat !== undefined) {
            if (Array.isArray(dateFormat)) {
                const valid = dateFormat.every((val: CONDITION_DATE_FORMAT) => (_date_format_.current).includes(val));
                if (valid) _date_format_.current = dateFormat;
            } else throw new Error(`Invalid date format "${dateFormat}"`);
        }

        /* Load schema */
        if (schema !== undefined) {
            if (typeof schema === 'object' && schema !== null && !Array.isArray(schema)) {
                // const loading = loadSchemaFunc({ schema: schema });
                // if (loading.status !== 'success') throw new Error(loading.log);
            } else throw new Error(`Ensure that your schema is json object`);
        }

        /* Check "LIB" */
        if (LIB !== undefined) {
            const rate = LIB.rate, ms = LIB.ms;

            /* set rate */
            if (typeof rate !== 'number') throw new Error(`Invalid "LIB" rate`);
            LIB_config.current.rate = ((rate >= 2 && rate <= 100) ? rate : 2) * 1024 * 1024;

            /* set ms */
            if (typeof ms !== 'number') throw new Error(`Invalid "LIB" ms`);
            LIB_config.current.ms = (ms >= 10 && ms <= 100) ? ms : 60;
        }

        /* Check and setup plugins */
        if (x.plugins !== undefined && plugins.runtime !== undefined) {
            /* check if runtime is correct */
            if (!['Deno', 'Node', 'Bun', 'React_native', 'Browser'].includes(plugins.runtime)) throw new Error(`Unsupported runtime "${plugins.runtime}"`);

            /* Disable plugins for react native */
            if (plugins.runtime === 'React_native') throw new Error(`"React native" doesn't support plugins yet !`);

            /* runtime */
            Runtime.current = plugins.runtime;
            private_session_DATA.runtime = plugins.runtime;

            /* Check and setup Websocket */
            if (ws !== undefined) {
                const asserver = hasPropertyFunc(ws, 'as_server') && ws.as_server !== undefined ? true : false;
                const asclient = hasPropertyFunc(ws, 'as_client') && ws.as_client !== undefined ? true : false;
                if (asserver || asclient) {
                    const cws = checkWebsocketConfigFunc(ws, plugins.runtime);
                    if (cws.status !== 'success') throw new Error(cws.log);
                    const conf = bulkWebsocketConfigFunc(cws.data);
                    if (conf.status !== 'success') throw new Error(conf.log);
                }
            }

            /* Check and setup http server and client(s) */
            if (http !== undefined) {
                const asserver = hasPropertyFunc(http, 'as_server') && http.as_server !== undefined ? true : false;
                const asclient = hasPropertyFunc(http, 'as_client') && http.as_client !== undefined ? true : false;
                if (asserver || asclient) {
                    const chttp = checkHTTPconfigFunc(http, plugins.runtime);
                    if (chttp.status !== 'success') throw new Error(http.log);
                    const conf = bulkHTTPconfigFunc(chttp.data);
                    if (conf.status !== 'success') throw new Error(conf.log);
                }
            }

            /* Check and setup fs */
            if (fs !== undefined) {
                /* Check fs runtime */
                if (!['Deno', 'Node', 'Bun'].includes(plugins.runtime)) throw new Error(`You can only configure "fs" for "Deno", "Node" and "Bun"`);

                /* Setup "FS" for "Deno" */
                if (plugins.runtime === 'Deno') {
                    /* check for native "fs" api */
                    if (!hasPropertyFunc(fs, 'api') || fs?.api === undefined) throw new Error(`"api" not found for "fs" plugin`);
                    fs_API.current = fs.api;

                    /* check storage path */
                    if (hasPropertyFunc(fs, 'storagePath') && fs.storagePath !== undefined) {
                        fs_storage_path.current = `${fs.storagePath}/forest`;
                        fs_API.current.mkdirSync(fs_storage_path.current, { recursive: true }); /* For "Deno" */
                    } else fs_API.current.mkdirSync(`./forest`, { recursive: true }); /* For "Deno" */

                    /* check if node "fs" is provided */
                    if (hasPropertyFunc(fs, 'fs') && fs.fs !== undefined) fs_node_API.current = fs.fs;
                }

                /* Setup "FS" for "Node" */
                else if (plugins.runtime === 'Node') {
                    /* check if node "fs" is provided */
                    if (!hasPropertyFunc(fs, 'fs') || fs?.fs === undefined) throw new Error(`"fs" not found`);
                    fs_node_API.current = fs.fs;

                    /* check storage path */
                    if (hasPropertyFunc(fs, 'storagePath') && fs.storagePath !== undefined) {
                        fs_storage_path.current = `${fs.storagePath}/forest`;
                        delayFunc().then(async () => { await fs_node_API.current.mkdir(fs_storage_path.current, { recursive: true }) });

                    } else delayFunc().then(async () => { await fs_node_API.current.mkdir(`./forest`, { recursive: true }) });
                }

                /* Setup "Fs" for "Bun" */
                else if (plugins.runtime === 'Bun') {
                    /* check for native "fs" api */
                    if (!hasPropertyFunc(fs, 'api') || fs?.api === undefined) throw new Error(`"api" not found for "fs" plugin`);
                    fs_API.current = fs.api;

                    /* check if node "fs" is provided */
                    if (hasPropertyFunc(fs, 'fs') && fs.fs !== undefined) {
                        fs_node_API.current = fs.fs;

                        /* check storage path */
                        if (hasPropertyFunc(fs, 'storagePath') && fs.storagePath !== undefined) {
                            fs_storage_path.current = `${fs.storagePath}/forest`;
                            delayFunc().then(async () => { await fs_node_API.current.mkdir(fs_storage_path.current, { recursive: true }) });

                        } else delayFunc().then(async () => { await fs_node_API.current.mkdir(`./forest`, { recursive: true }) });

                    } else throw new Error(`"fs" not found`);
                }

                /* Check "FNSS" */
                if (fs.FNSS === true) {
                    if (!['Deno', 'Bun', 'Node'].includes(plugins.runtime)) throw new Error(`"FNSS" is only available for "Deno", "Node" and "Bun"`);
                    FNSS.enable = true;
                }
            }

            /* Check and setup crypto */
            if (crypt !== undefined) {
                /* Check if crypto api is set for "Node" runtime */
                if (plugins.runtime === 'Node') {
                    if (crypt.crypto === undefined) throw new Error(`For "Node" you must define the package "crypto"`);
                    crypto_API.current = crypt.crypto;
                }

                /* check if "crypto" enable option is set */
                if (typeof crypto.enable !== 'boolean') throw new Error(`Invalid "crypto" config`);

                /* Check crypto secret key */
                const scrt = crypt.secretKey;
                if (scrt !== undefined) {
                    if (typeof scrt !== 'string') throw new Error(`Invalid "secretKey" - It's not a string`);
                    if (!isAlphanumericFunc({ value: scrt, acceptSpecial: false })) throw new Error(`You "secretKey" is not alphanumeric`);
                    const clen = scrt.length;
                    if (clen !== _crypto_key_length_) throw new Error(`Invalid "secretKey" length ("${clen}") - The valid key length is "${_crypto_key_length_}"`);

                    /* set "secretKey" */
                    secretKey.value = scrt;
                }

                /* Set crypto as enable */
                private_session_DATA.cryptoEnable = crypto.enable;
                crypto.enable = crypt.enable;
            }
        }

    } catch (e: any) {
        badInit = true, initLog = e.message, env_DATA.hasInit = false;
        plog(`[Initialization failed] :: ${initLog}`); /* Don't remove this log */
    }

    /* return */
    return { badInit: badInit, initLog: initLog };
};

/** Create tree if not exists */
const createTreeFunc = (x: { treeName: string | string[] }): FUNCTION_BASIC_RETURN_TYPE => {
    let mlog = '';
    try {
        const treenTab: string[] = Array.isArray(x.treeName) ? x.treeName : [x.treeName];

        /* check if all tree name are correct */
        for (let i = 0; i < treenTab.length; i++) {
            const treen = treenTab[i];

            /* check type */
            if (typeof treen !== 'string') {
                mlog = mlog + `The name "${treen}" is not a string`;
                throw new Error();
            }

            /* check alphanumeric */
            const aph = isAlphanumericFunc({ value: treen, acceptSpecial: true });
            if (!aph) {
                mlog = mlog + `The name "${treen}" should be alphanumeric and can only contain special chars like "_" or "-"`;
                throw new Error();
            }

            /* check length */
            if (treen.length > _max_tree_name_length_) {
                mlog = mlog + `The length of "${treen}" exceed the maximum tree name length (${_max_tree_name_length_})`;
                throw new Error();
            }
        }

        /* create tree */
        for (let t = 0; t < treenTab.length; t++) {
            const treeName = treenTab[t];
            const treeExists = hasPropertyFunc(tree_DATA, treeName);
            if (!treeExists) {
                tree_DATA[treeName] = { name: treeName, branchCount: 0 };
                branch_DATA[treeName] = {};
                branch_feed_ref_DATA[treeName] = {};
                active_transaction_per_branch_DATA[treeName] = {};
                log_DATA[treeName] = '';
                tid_DATA[treeName] = {};
            }
        }

        return { status: 'success', log: '', data: true };
    } catch (e: any) { return { status: 'error', log: mlog, data: false } }
};

/** Delete tree from db */
const deleteTreeFunc = (x: { treeName: string }): FUNCTION_BASIC_RETURN_TYPE => {
    let mlog = '';
    try {
        const treeName = x.treeName;
        const actr = Object.values(active_transaction_per_branch_DATA[treeName]);
        let treeActiveTrans = 0;
        treeActiveTrans = (actr.length > 0) ? actr.reduce((a: number, b: number) => a + b) : 0;
        if (treeActiveTrans === 0) {
            /* delete feeds and branch */
            const branchTab = branch_DATA[treeName];
            const bnameTab: string[] = Object.keys(branchTab) || [];
            if (bnameTab.length > 0) for (let b = 0; b < bnameTab.length; b++) {
                const bname = bnameTab[b];
                const feedsId: string[] = Object.keys(branchTab[bname].feedMainKey);

                /* delete feed on branch */
                if (feedsId.length > 0) for (let f = 0; f < feedsId.length; f++) {
                    const fid = feedsId[f];
                    delete feed_DATA[fid];
                }

                /* delete branch */
                delete branch_DATA[treeName][bname];
                delete branch_feed_ref_DATA[treeName][bname];
            }

            /* delete tree */
            delete tree_DATA[treeName];
            delete phantom_tree_id_DATA[treeName];
            delete phantom_branch_id_DATA[treeName];

        } else {
            /* ERROR :: log error */
            mlog = mlog + `The tree "${treeName}" is a "phantom tree"`;
            throw new Error(mlog);
        }

        return { status: 'success', log: mlog, data: true }
    } catch (e: any) { return { status: 'error', log: e.message, data: false } }
};

/** Delete branch from db */
const deleteBranchFunc = (x: { bname: string, tname: string }): FUNCTION_BASIC_RETURN_TYPE => {
    let mlog = '';
    try {
        const bname = x.bname, tname = x.tname;
        const activeTrans = active_transaction_per_branch_DATA[tname][bname];
        if (activeTrans === 0) {
            /* delete feeds and branch */
            const feedsId: string[] = Object.keys(branch_DATA[tname][bname].feedMainKey) || [];

            /* delete feed on branch */
            if (feedsId.length > 0) for (let f = 0; f < feedsId.length; f++) {
                const fid = feedsId[f];
                delete feed_DATA[fid];
                delete mk_to_branch_DATA[fid];
            }

            /* delete branch */
            delete branch_DATA[tname][bname];
            delete branch_feed_ref_DATA[tname][bname];
            delete phantom_branch_id_DATA[tname][bname];

        } else {
            /* ERROR :: log error */
            mlog = mlog + `The branch "${bname}" is a "phantom branch"`;
            throw new Error(mlog);
        }

        return { status: 'success', log: mlog, data: 'Branch deleted successfully' };
    } catch (e: any) { return { status: 'error', log: e.message, data: 'Branch deletion failed' } }
};

/** Delete feed from db */
/* TODO :: add branch name and tree name to delete feed from branch also */
const deleteFeedFunc = (x: { feedId: string }): FUNCTION_BASIC_RETURN_TYPE => {
    let mlog = '';
    try {
        const fid = x.feedId;
        const isLocked = hasPropertyFunc(locked_feed_id_DATA, fid);
        if (!isLocked) {
            /* deletion */
            delete feed_DATA[fid];
            delete deleted_field_DATA[fid];
            delete mk_to_branch_DATA[fid];
            delete feed_watcher_DATA[fid];

        } else {
            /* ERROR :: log error */
            mlog = mlog + `The feed "${fid}" is a "phantom feed"`;
            throw new Error(mlog);
        }

        return { status: 'success', log: mlog, data: 'Feed deleted successfully' };
    } catch (e: any) { return { status: 'error', log: e.message, data: 'Feed deletion failed' } }
};

/** Delete field from db - Delete fields directly on the real feed and return the "feed" at the end */
const deleteFieldFunc = (x: { fid: string }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };

    const fid = x.fid, mtm = deleted_field_DATA[fid] || [];
    if (mtm.length === 0) return res;

    try {
        let feed: JSON_BASIC_TYPE = {};
        for (let m = 0; m < mtm.length; m++) {
            const crtmtm = mtm[m], mtype = crtmtm.type, mdata = crtmtm.data;
            if (Array.isArray(mdata)) for (let d = 0; d < mdata.length; d++) {
                const field: string = mdata[d], isPath = field.includes('.');
                feed = feed_DATA[fid];
                if (!isPath) delete feed[field];
                else deleteJsonFieldFunc({ target: feed, path: field });
            }
            else deleted_field_DATA[fid].splice(m, 1); /* remove metamorphose if it's data is not an array */
        }

        /* set res data */
        res.data = feed;

    } catch (e: any) { res.status = 'error'; res = e.message };
    return res;
};

/** Set log for json check */
const setMiniLogForJsonCheckFunc = (x: { loopIndex: number, log: string, newLoopIndex?: boolean }): string => {
    const loopIndex = x.loopIndex, log = x.log, newLoopIndex = x.newLoopIndex || false;
    const pos = `For feed at index `;
    const idt4 = Array(4).fill(' ').join().replaceAll(',', '');
    const idtn = Array(pos.length).fill(' ').join().replaceAll(',', '');
    const symbol = '=>';
    const res = newLoopIndex ?
        `\n${idt4}${pos}${loopIndex} ${symbol} ${log};` :
        `\n${idt4}${idtn}${loopIndex} ${symbol} ${log};`;
    // logFunc(res);
    return res;
};

/** Check json feed validity */
const checkJsonFeedFunc = (x: { json: { [key: string]: VALID_VALUE_TYPE }, loopIndex: number, sourceFunc: string, ignoreMk?: boolean, mlog?: { current: string } }): FUNCTION_BASIC_RETURN_TYPE => {
    const json = x.json, loopIndex = x.loopIndex, sourceFunc = x.sourceFunc, ignoreMk = x.ignoreMk || false;
    const mlog = x.mlog || { current: '' };
    const mk = initConfig.config.mainKey; /* main key */

    try {
        /* Extract keys */
        const keys: string[] = Object.keys(json);

        /* Check if "mk" exists */
        if (!ignoreMk && !keys.includes(mk)) { /* If "mk" not found, while needed */
            mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `Main key (${mk}) not found`, newLoopIndex: mlog.current.length > 0 ? false : true });
        } else if (ignoreMk && keys.includes(mk)) { /* If "mk" found, while not needed (in "updateAll" case) */ }

        /* Process keys and value validity */
        for (let i = 0; i < keys.length; i++) {
            const ckey = keys[i];
            let keyIsValid = true;

            /* check key length */
            if (ckey.length > _max_json_key_length_) {
                keyIsValid = false;
                mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `The following key length exceed ${_max_json_key_length_} : "${ckey}"`, newLoopIndex: mlog.current.length > 0 ? false : true });
            }

            /* check if key is alphanumeric */
            if (!_reserved_keys_.includes(ckey) && !isAlphanumericFunc({ value: ckey, acceptSpecial: true })) {
                keyIsValid = false;
                mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `The following key should be alphanumeric : "${ckey}"`, newLoopIndex: mlog.current.length > 0 ? false : true });
            }

            /* check if feed already exists in case of "update" */
            if (ckey === mk && sourceFunc.match(/update/)) {
                const feedMk = json[mk];
                if (!hasPropertyFunc(feed_DATA, feedMk)) { mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `Feed with ${mk} "${feedMk}" not found so update failed`, newLoopIndex: mlog.current.length > 0 ? false : true }) };
            }

            /* check if value's is valid */
            const val: any = json[ckey], tval = typeof val;
            if (_valid_value_type_.includes(tval)) { /* If value type is valid */
                /* NB: always check if value type is conform to schema, if it's provided for targeted branch */
                switch (typeof val) {
                    case 'string': { } break;

                    case 'number': { } break;

                    case 'bigint': { } break;

                    case 'boolean': { } break;

                    case 'object': {
                        /* if value is an json object */
                        if (val !== null) {
                            /* check nested object count */
                            const tooMuch = checkMaxNestedObjFunc({ input: val });
                            if (tooMuch) mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `The property "${ckey}" has too much nested objects (more than ${_max_object_depth_length_})`, newLoopIndex: mlog.current.length > 0 ? false : true });

                            /* - */
                            const objType = getObjectTypeFunc({ object: val });
                            if (objType === 'json') {
                                /* recurse "checkJsonFeedFunc" */
                                checkJsonFeedFunc({ json: val, loopIndex: loopIndex, sourceFunc: sourceFunc, ignoreMk: true, mlog: mlog });

                                /* if it's a mutation */
                                if (isMutationFunc({ obj: val })) { }
                                /* if it's a condition */
                                else if (isConditionFunc({ obj: val })) { }

                            } else if (objType === 'array') { }
                        }
                    } break;

                    case 'undefined': { } break;

                    default: { };
                };

            } else { mlog.current = mlog.current + setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: `The value of property "${ckey}" has an unsupported type (${tval})`, newLoopIndex: mlog.current.length > 0 ? false : true }); }
        }

        const hasLog = mlog.current.length > 0 ? true : false;
        return { status: hasLog ? 'error' : 'success', log: mlog.current, data: undefined };

    } catch (e: any) {
        return { status: 'error', log: setMiniLogForJsonCheckFunc({ loopIndex: loopIndex, log: e.message, newLoopIndex: mlog.current.length > 0 ? false : true }), data: undefined }
    };
};

/** Perform a mutation at a json or array path */
const atObjectPathFunc = (x: { mtype: string, action: AT_JSON_ACTION_TYPE, path: string | (number | string)[] | undefined, obj: JSON_BASIC_TYPE, sourceKey: string, value?: any, keepPositive?: boolean, cusmid?: string }): FUNCTION_BASIC_RETURN_TYPE => {
    const action = x.action;
    let mlog = '';
    try {
        /* check feed */
        const ob = x.obj;
        const tob = getObjectTypeFunc({ object: ob });
        if (tob === undefined || tob === null) {
            /* ERROR :: log error */
            mlog = mlog + `Invalid feed or the feed doesn't exists`;
            throw new Error(mlog);
        }

        /* - */
        const mtype: any = x.mtype; /* mutation type */
        const path = x.path, obj = ob, value = x.value, sourceKey = x.sourceKey, keepPositive = x.keepPositive || false;
        const cusmid = x.cusmid || undefined;
        const valueType = typeof value;

        /* check if value exists for "set" action */
        if (action === 'set') {
            if (!hasPropertyFunc(obj, sourceKey)) {
                if (path !== undefined) {
                    let cp = path;
                    if (Array.isArray(cp)) cp = cp.join('.');
                    const ptab = cp.includes('.') ? cp.split('.') : [cp];
                    const fpath = ptab[0] === `${sourceKey}` ? cp : `${sourceKey}.${cp}`;
                    const bp = buildJsonFromPathFunc({ path: fpath, value: value });
                    mergeObjFunc({ target: obj, data: bp });

                } else {
                    if (valueType === 'number') obj[sourceKey] = keepPositive ? keepPositiveFunc({ operation: value }) : value;
                    else obj[sourceKey] = value;
                }
            }
        }

        /* check if json is valid */
        if (Object.keys(obj) === undefined || Object.keys(obj).length === 0) {
            /* ERROR :: log error */
            mlog = mlog + `Invalid feed or the feed doesn't exists`;
            throw new Error(mlog);
        }

        /* check giving path validity */
        const pathTab: { current: string[] } = { current: [] };
        if (path === undefined) pathTab.current.push(sourceKey);
        else if (typeof path === 'string') pathTab.current = path.split('.');
        else if (Array.isArray(path)) pathTab.current = path.join('.').split('.');
        else {
            /* ERROR :: log error */
            mlog = mlog + `Invalid path "${path}"`;
            throw new Error(mlog);
        }

        /* insure that "sourceKey" is present in "pathTab" at index 0 */
        if (sourceKey !== undefined && pathTab.current[0] !== sourceKey) { pathTab.current = [sourceKey, ...pathTab.current] }

        /* check if each content inside path array is alphanumeric */
        const ptl = pathTab.current.length;
        for (let i = 0; i < ptl; i++) {
            const tg = pathTab.current[i];
            const isal = isAlphanumericFunc({ value: tg, acceptSpecial: true });
            if (!isal) {
                /* ERROR :: log error */
                mlog = mlog + `"${tg}" isn't alphanumeric`;
                throw new Error(mlog);
            }
        }

        /* process data at specified path */
        const currentPathValue: { current: any } = { current: undefined };
        let breakLoop = false;
        for (let n = 0; n < ptl; n++) {
            if (breakLoop) break; /* break loop */

            /* - */
            const ky = pathTab.current[n]; /* current key */
            const validPathData = (currentPathValue.current === undefined) ? false : true;
            const isNumericPath = isNumericFunc({ value: currentPathValue.current });
            const isBeforeLastLoop = (n === (ptl - 2)) ? true : false;
            const isLastLoop = (n === (ptl - 1)) ? true : false;

            /* if path doesn't exists */
            if (!isNumericPath && !hasPropertyFunc(validPathData ? currentPathValue.current : obj, ky)) {
                continue;
                // if (action !== 'set') {
                //     /* ERROR :: log error */
                //     mlog = mlog + `The path "${path}" doesn't exists`;
                //     throw new Error(mlog);
                // }
            }

            /* get next path value */
            if (action === 'set' && currentPathValue.current !== undefined) {
                const propExists = hasPropertyFunc(currentPathValue.current, ky);
                if (!propExists) { currentPathValue.current[ky] = {} }
            }
            currentPathValue.current = validPathData ? currentPathValue.current[ky] : obj[ky];

            /* current path value type */
            const pathValueType = typeof currentPathValue.current;
            const pathObjType = getObjectTypeFunc({ object: currentPathValue.current }); /* get exact value type if it's an object */

            /* on set */
            switch (action) {
                /* For all */
                case 'set': {
                    if (ptl === 1) {
                        switch (pathObjType) {
                            case 'array': { obj[pathTab.current[0]] = value } break;

                            case 'json': { obj[pathTab.current[0]] = value } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `Invalid json path "${path}"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        const nextPath = pathTab.current[n + 1];
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* set data at index */
                                const nnextPath = Number(nextPath), cpvl = currentPathValue.current.length;
                                if (nmc) currentPathValue.current[(nnextPath >= cpvl) ? cpvl : nnextPath] = value;
                            } break;

                            case 'json': { currentPathValue.current[pathTab.current[n + 1]] = value } break;

                            default: {
                                /* ERRROR :: log error */
                                mlog = mlog + `Invalid json path "${path}"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'extract': { /* No action needed here, cause data is returned directly by the function */ breakLoop = true } break;



                /* For array */
                case 'push': {
                    if (ptl === 1) {
                        if (pathObjType !== 'array') {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "array" - Invalid path`;
                            throw new Error(mlog);
                        }
                        currentPathValue.current.push(value);
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        const nextPath = pathTab.current[n + 1];
                        const isar = Array.isArray(currentPathValue.current[nextPath]); /* check if next path is an array */
                        if (isar) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${nextPath}" is not an "array" - Invalid path`;
                            throw new Error(mlog);
                        }
                        currentPathValue.current[nextPath].push(value); /* push value into array */
                        breakLoop = true;
                    }
                } break;

                case 'push_content': {
                    /* check value type */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `"push_content" only accept an "array" as value`;
                        throw new Error(mlog);
                    }

                    /* - */
                    if (ptl === 1) {
                        if (pathObjType !== 'array') {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "array" - Invalid path`;
                            throw new Error(mlog);
                        }
                        currentPathValue.current.push(...value);
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        const nextPath = pathTab.current[n + 1];
                        /* check if next path is an array */
                        if (!Array.isArray(currentPathValue.current[nextPath])) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${nextPath}" is not an "array" - Invalid path`;
                            throw new Error(mlog);
                        }
                        currentPathValue.current[nextPath].push(...value); /* push value into array */
                        breakLoop = true;
                    }
                } break;



                /* For json */
                case 'assign': {
                    /* check if "value" is a json object */
                    if (typeof value !== 'object' || getObjectTypeFunc({ object: value }) !== 'json') {
                        /* ERROR :: log error */
                        mlog = mlog + `The mutation's value is not a "json object"`;
                        throw new Error(mlog);
                    }

                    /* - */
                    if (ptl === 1) {
                        if (pathObjType !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not a "json object" - Invalid path`;
                            throw new Error(mlog);
                        }
                        mergeObjFunc({ target: currentPathValue.current, data: value });
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        const nextPath = pathTab.current[n + 1];
                        const nt = getObjectTypeFunc({ object: currentPathValue.current[nextPath] }); /* check if next path is a json */
                        if (nt !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${nextPath}" is not a "json object" - Invalid path`;
                            throw new Error(mlog);
                        }
                        mergeObjFunc({ target: currentPathValue.current[nextPath], data: value });
                        breakLoop = true;
                    }
                } break;



                /* For number */
                case 'increment': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current + value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current + value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not a valid "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] + value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] + value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'decrement': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current - value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current - value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] - value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] - value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'multiply': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current * value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current * value;
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an object`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] * value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] * value;
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an object`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'divide': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = (currentPathValue.current === 0) ? 0 : (currentPathValue.current / value);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = (currentPathValue.current === 0) ? 0 : (currentPathValue.current / value);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* chech if "currentPathValue.current" is an array or json or return an error */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = (currentPathValue.current[nextPath] === 0) ? 0 : (currentPathValue.current[nextPath] / value);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = (currentPathValue.current[nextPath] === 0) ? 0 : (currentPathValue.current[nextPath] / value);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'increaseBy': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current + ((currentPathValue.current * value) / 100);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current + ((currentPathValue.current * value) / 100);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not a valid "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] + ((currentPathValue.current[nextPath] * value) / 100);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] + ((currentPathValue.current[nextPath] * value) / 100);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'decreaseBy': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get next path */

                    /* check value type */
                    if (valueType !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `You try to ${action} "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}" while value should be of type "number"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current - ((currentPathValue.current * value) / 100);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                if (pathValueType !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${pathValueType}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current - ((currentPathValue.current * value) / 100);
                                obj[pathTab.current[0]] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not a valid "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    /* ERROR :: log error */
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] - ((currentPathValue.current[nextPath] * value) / 100);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "number"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                const opt = currentPathValue.current[nextPath] - ((currentPathValue.current[nextPath] * value) / 100);
                                currentPathValue.current[nextPath] = keepPositive ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;



                /* For string */
                case 'concat_before': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* check value type */
                    if (valueType !== 'string') {
                        /* ERROR :: log error */
                        mlog = mlog + `"${action}" mutation failed because you try to concat "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}". Value should be of type "string"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = value + currentPathValue.current;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current; /* get value of current path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = value + currentPathValue.current;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an object`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = value + currentPathValue.current[nextPath];
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = value + currentPathValue.current[nextPath];
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'concat_after': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* check value type */
                    if (valueType !== 'string') {
                        /* ERROR :: log error */
                        mlog = mlog + `"${action}" mutation failed because you try to concat "${ptl === 1 ? crtPath : nextPath}" with a value of type "${valueType}". Value should be of type "string"`;
                        throw new Error(mlog);
                    }

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = currentPathValue.current + value;
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current; /* get value of current path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = currentPathValue.current + value;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = currentPathValue.current[nextPath] + value;
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = currentPathValue.current[nextPath] + value;
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'lower': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* no need to check given value */

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = (currentPathValue.current).toLowerCase();
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current; /* get value of current path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = (currentPathValue.current).toLowerCase();
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = (currentPathValue.current[nextPath]).toLowerCase();
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = (currentPathValue.current[nextPath]).toLowerCase();
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;

                case 'upper': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* no need to check given value */

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a "number"`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}" - But "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = (currentPathValue.current).toUpperCase();
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current; /* get value of current path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${typ}" - But"${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = (currentPathValue.current).toUpperCase();
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}" - But "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = (currentPathValue.current[nextPath]).toUpperCase();
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}" - But "${action}" only support data of type "string"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = (currentPathValue.current[nextPath]).toUpperCase();
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;



                /* For boolean */
                case 'invert_boolean': {
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* no need to check given value */

                    /* process to update operation */
                    if (ptl === 1) {
                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'boolean') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "boolean"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                obj[pathTab.current[0]] = !(obj[pathTab.current[0]]);
                            } break;

                            case 'json': {
                                /* check path value type */
                                const typ = typeof currentPathValue.current; /* get value of current path */
                                if (typ !== 'boolean') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" that's of type "${typ}", while "${action}" only support data of type "boolean"`;
                                    throw new Error('invalid_path_value');
                                }

                                /* update */
                                obj[pathTab.current[0]] = !(obj[pathTab.current[0]]);
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an object`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        /* update */
                        switch (pathObjType) {
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: nextPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${nextPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${crtPath}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'boolean') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${crtPath}" at index "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "boolean"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = !(currentPathValue.current[nextPath]);
                            } break;

                            case 'json': {
                                /* check next path value type */
                                const typ = typeof currentPathValue.current[nextPath]; /* get value of next path */
                                if (typ !== 'boolean') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to use "${action}" mutation on "${nextPath}" that's of type "${typ}", while "${action}" only support data of type "boolean"`;
                                    throw new Error(mlog);
                                }

                                /* update */
                                currentPathValue.current[nextPath] = !(currentPathValue.current[nextPath]);
                            } break;

                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an object`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;
                    }
                } break;



                /* custom */
                case 'custom': {
                    /* check if custom mutation function exists */
                    const chk = cusmid === undefined ? false : hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                    if (!chk) {
                        mlog = mlog + `Unable to find any function associated to "customMutation"`;
                        throw new Error(mlog);
                    }

                    /* extract custom mutation function */
                    const func = mutation_custom_func_DATA[cusmid || ''];

                    /* - */
                    const crtPath = ky; /* current path */
                    const nextPath = pathTab.current[n + 1]; /* get current path */

                    /* process to update operation */
                    if (ptl === 1) {
                        switch (pathObjType) {
                            /* For "array" */
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* Run "customMutation" func */
                                const ccpvt: any = typeof currentPathValue.current[nextPath];
                                const carg = (ccpvt === 'object' && ccpvt !== 'null') ? cloneObjFunc({ obj: currentPathValue.current[nextPath] }) : currentPathValue.current[nextPath];
                                let opt: any = '';

                                try { opt = func({ value: carg }) }
                                catch (e: any) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"customMutation" function has crashed at "${ky}" level - Have you checked the type of "x.value"`;
                                    throw new Error(mlog);
                                }

                                /* check returned custom value type */
                                const ot: any = typeof opt;
                                if (['string', 'number', 'boolean'].includes(mtype) && ot !== mtype) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned after executing the function inside "customMutation" is not a "${mtype}"`;
                                    throw new Error(mlog);
                                }

                                /* check if returned custom value is "undefined" or "null" */
                                if ([null, undefined].includes(opt)) mlog = mlog + `[Warning] :: Your "customMutation" has returned "${opt}" - If it's not intentional, please check the return type of that function`;

                                /* check if the custom value type is an unsupported type - should always comes after "null" & "undefined" check */
                                if (!['string', 'number', 'boolean', 'object'].includes(ot)) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned by "customMutation" is invalid - It's of type "${ot}"`;
                                    throw new Error(mlog);
                                }

                                /* set dat */
                                obj[pathTab.current[0]] = (mtype === 'number' && keepPositive) ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            /* For "json" */
                            case 'json': {
                                /* Run "customMutation" func */
                                const ccpvt: any = typeof currentPathValue.current[nextPath];
                                const carg = (ccpvt === 'object' && ccpvt !== 'null') ? cloneObjFunc({ obj: currentPathValue.current[nextPath] }) : currentPathValue.current[nextPath];
                                let opt: any = '';

                                try { opt = func({ value: carg }) }
                                catch (e: any) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"customMutation" function has crashed at "${ky}" level - Have you checked the type of "x.value"`;
                                    throw new Error(mlog);
                                }

                                /* check returned custom value type */
                                const ot: any = typeof opt;
                                if (['string', 'number', 'boolean'].includes(mtype) && ot !== mtype) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned after executing the function inside "customMutation" is not a "${mtype}"`;
                                    throw new Error(mlog);
                                }

                                /* check if returned custom value is "undefined" or "null" */
                                if ([null, undefined].includes(opt)) mlog = mlog + `[Warning] :: Your "customMutation" has returned "${opt}" - If it's not intentional, please check the return type of that function`;

                                /* check if the custom value type is an unsupported type - should always comes after "null" & "undefined" check  */
                                if (!['string', 'number', 'boolean', 'object'].includes(ot)) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned by "customMutation" is invalid - It's of type "${ot}"`;
                                    throw new Error(mlog);
                                }

                                /* set dat */
                                obj[pathTab.current[0]] = (mtype === 'number' && keepPositive) ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            /* default */
                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    } else if (ptl > 1 && isBeforeLastLoop) {
                        /* - */
                        if (pathValueType !== 'object' || currentPathValue.current === null) {
                            /* ERROR :: log error */
                            mlog = mlog + `The field "${ky}" is not an "object" - Invalid path`;
                            throw new Error(mlog);
                        }

                        switch (pathObjType) {
                            /* For "array" */
                            case 'array': {
                                /* check if next path can be numeric */
                                const nmc = isNumericFunc({ value: crtPath });
                                if (!nmc) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${ky}" is an array but the index "${crtPath}" that you specify in your path is not a number`;
                                    throw new Error(mlog);
                                }

                                /* check if giving index is higher than table last index */
                                const len = currentPathValue.current.length - 1, np = Number(nextPath);
                                if (np > len) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You want to do "${action}" mutation at index "${nextPath}" of "${ky}", but the last index is "${len}"`;
                                    throw new Error(mlog);
                                }

                                /* Run "customMutation" func */
                                const ccpvt: any = typeof currentPathValue.current[nextPath];
                                const carg = (ccpvt === 'object' && ccpvt !== 'null') ? cloneObjFunc({ obj: currentPathValue.current[nextPath] }) : currentPathValue.current[nextPath];
                                let opt: any = '';

                                try { opt = func({ value: carg }) }
                                catch (e: any) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"customMutation" function has crashed at "${ky}" level - Have you checked the type of "x.value"`;
                                    throw new Error(mlog);
                                }

                                /* check returned custom value type */
                                const ot: any = typeof opt;
                                if (['string', 'number', 'boolean'].includes(mtype) && ot !== mtype) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned after executing the function inside "customMutation" is not a "${mtype}"`;
                                    throw new Error(mlog);
                                }

                                /* check if returned custom value is "undefined" or "null" */
                                if ([null, undefined].includes(opt)) mlog = mlog + `[Warning] :: Your "customMutation" has returned "${opt}" - If it's not intentional, please check the return type of that function`;

                                /* check if the custom value type is an unsupported type - should always comes after "null" & "undefined" check  */
                                if (!['string', 'number', 'boolean', 'object'].includes(ot)) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned by "customMutation" is invalid - It's of type "${ot}"`;
                                    throw new Error(mlog);
                                }

                                /* set dat */
                                currentPathValue.current[nextPath] = (mtype === 'number' && keepPositive) ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            /* For "json" */
                            case 'json': {
                                /* Run "customMutation" func */
                                const ccpvt: any = typeof currentPathValue.current[nextPath];
                                const carg = (ccpvt === 'object' && ccpvt !== 'null') ? cloneObjFunc({ obj: currentPathValue.current[nextPath] }) : currentPathValue.current[nextPath];
                                let opt: any = '';

                                try { opt = func({ value: carg }) }
                                catch (e: any) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"customMutation" function has crashed at "${ky}" level - Have you checked the type of "x.value"`;
                                    throw new Error(mlog);
                                }

                                /* check returned custom value type */
                                const ot: any = typeof opt;
                                if (['string', 'number', 'boolean'].includes(mtype) && ot !== mtype) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned after executing the function inside "customMutation" is not a "${mtype}"`;
                                    throw new Error(mlog);
                                }

                                /* check if returned custom value is "undefined" or "null" */
                                if ([null, undefined].includes(opt)) mlog = mlog + `[Warning] :: Your "customMutation" has returned "${opt}" - If it's not intentional, please check the return type of that function \n`;

                                /* check if the custom value type is an unsupported type - should always comes after "null" & "undefined" check  */
                                if (!['string', 'number', 'boolean', 'object'].includes(ot)) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The value returned by "customMutation" is invalid - It's of type "${ot}"`;
                                    throw new Error(mlog);
                                }

                                /* set data */
                                currentPathValue.current[nextPath] = (mtype === 'number' && keepPositive) ? keepPositiveFunc({ operation: opt }) : opt;
                            } break;

                            /* default */
                            default: {
                                /* ERROR :: log error */
                                mlog = mlog + `"${ky}" is not an "object"`;
                                throw new Error(mlog);
                            };
                        };
                        breakLoop = true;

                    }
                } break;



                /* - */
                default: {
                    /* ERROR :: log error */
                    mlog = mlog + `Unknown action "${action}"`;
                    throw new Error(mlog);
                };
            };
        }

        /* return */
        return { status: 'success', log: mlog, data: (action === 'extract') ? currentPathValue.current : obj };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};

/** Update feed */
const updateFeedFunc = (x: { target: JSON_BASIC_TYPE, data: JSON_BASIC_TYPE, mtype?: any, recursive?: boolean }): FUNCTION_BASIC_RETURN_TYPE => {
    let mlog = '';
    try {
        const target: JSON_BASIC_TYPE = cloneObjFunc({ obj: x.target }), data: JSON_BASIC_TYPE = cloneObjFunc({ obj: x.data });

        /* process each json field */
        const dkeys = Object.keys(data);
        for (let i = 0; i < dkeys.length; i++) {
            const k = dkeys[i], val = data[k], vk = typeof val;
            if (vk === 'object') {
                /* Process mutations */
                if (isMutationFunc({ obj: val })) {
                    const mtype = x.mtype || val._$$type; /* mutation type */
                    switch (mtype) {
                        /* For number */
                        case 'number': { /* Process number mutation */
                            const mutation: any[] = val.mutation; /* all mutations array */
                            for (let n = 0; n < mutation.length; n++) {
                                const tval: number = target[k]; /* target field value */

                                /* check "tval" */
                                if (tval === undefined && !hasPropertyFunc(target, k)) {
                                    continue;
                                    // /* ERROR :: log error */
                                    // mlog = mlog + `Key "${k}" not found`;
                                    // throw new Error(mlog);
                                }

                                /* - */
                                const currentMutation = mutation[n];
                                const action: MUTATION_ACTION_TYPE_FOR_NUMBER = currentMutation.action, value = currentMutation.value, path = currentMutation.path, keepPositive = currentMutation.keepPositive;
                                const valueType = typeof value;
                                const cusmid = currentMutation.cusmid || undefined; /* custom mutation id */

                                /* check if value type is number */
                                if (action !== 'custom' && typeof value !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `You try to ${action} "${k}" with a value of type "${valueType}" while value should be of type "number"`;
                                    throw new Error(mlog);
                                };

                                /* Process at path, if it's provided */
                                if (path !== undefined) {
                                    const process = atObjectPathFunc({ mtype: mtype, action: action, path: path, obj: target, value: value, sourceKey: k, cusmid: cusmid });
                                    if (process.status === 'error') {
                                        /* ERROR :: log error */
                                        mlog = mlog + process.log;
                                        throw new Error(mlog);
                                    }
                                    Object.assign(target, process.data);
                                    continue; /* Jump to next mutation */
                                }

                                /* create field if it doesn't exists and action is "set" */
                                if (!hasPropertyFunc(target, k) && action === 'set') {
                                    target[k] = keepPositive ? keepPositiveFunc({ operation: value }) : value;
                                    continue;
                                }
                                /* check if target's value type is number */
                                else if (typeof tval !== 'number') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${k}" is not a number`;
                                    throw new Error(mlog);
                                };

                                /* processing */
                                switch (action) {
                                    /* set number */
                                    case 'set': { target[k] = keepPositive ? keepPositiveFunc({ operation: value }) : value } break;

                                    /* increment number */
                                    case 'increment': {
                                        const cal = tval + value;
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* decrement number */
                                    case 'decrement': {
                                        const cal = tval - value;
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* multiply number */
                                    case 'multiply': {
                                        const cal = tval * value;
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* divide number */
                                    case 'divide': {
                                        const cal = tval / value;
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* increase by */
                                    case 'increaseBy': {
                                        const cal = tval + ((tval * value) / 100);
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* decrease by */
                                    case 'decreaseBy': {
                                        const cal = tval - ((tval * value) / 100);
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: cal }) : cal;
                                    } break;

                                    /* custom */
                                    case 'custom': {
                                        /* check if custom mutation function exists */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            mlog = mlog + `Unable to found any function associated to the custom mutation`;
                                            throw new Error(mlog);
                                        }

                                        /* extract custom mutation function */
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* TODO :: check if funcion is asynchronous */
                                        let mval: any = 1;

                                        try { mval = func({ value: tval }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"customMutation" function has crashed at "${k}" level - Have you checked the type of "x.value"`;
                                            throw new Error(mlog);
                                        }

                                        /* check type of value return by the function */
                                        if (typeof mval !== 'number') {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The value returned by the "customMutation" function is not a number`;
                                            throw new Error(mlog);
                                        }

                                        /* set value */
                                        target[k] = keepPositive ? keepPositiveFunc({ operation: mval }) : mval;
                                    } break;

                                    default: { /* TODO :: log error */ };
                                };
                            }
                        } break;


                        /* For string */
                        case 'string': { /* Process string mutation */
                            const mutation: any[] = val.mutation;
                            for (let n = 0; n < mutation.length; n++) {
                                const tval: string = target[k];

                                /* check "tval" */
                                if (tval === undefined && !hasPropertyFunc(target, k)) {
                                    continue;
                                    // /* ERROR :: log error */
                                    // mlog = mlog + `Key "${k}" not found`;
                                    // throw new Error(mlog);
                                }

                                const currentMutation = mutation[n];
                                const action: MUTATION_ACTION_TYPE_FOR_STRING = currentMutation.action, path = currentMutation.path, value = currentMutation.value;
                                const cusmid = currentMutation.cusmid || undefined;

                                /* check if value is a string */
                                if (!['lower', 'upper'].includes(action)) {
                                    if ((['set', 'concat_before', 'concat_after'].includes(action) || action !== 'custom') && typeof value !== 'string') {
                                        /* ERROR :: log error */
                                        mlog = mlog + `The value "${value}" is not a string`;
                                        throw new Error(mlog);
                                    }
                                }

                                /* Process at path, if it's provided */
                                if (path !== undefined) {
                                    const process = atObjectPathFunc({ mtype: mtype, action: action, path: path, obj: target, value: value, sourceKey: k, cusmid: cusmid });
                                    if (process.status === 'error') {
                                        /* ERROR :: log error */
                                        mlog = mlog + process.log;
                                        throw new Error(mlog);
                                    }
                                    Object.assign(target, process.data);
                                    continue;
                                }

                                /* create field if it doesn't exists and action is "set" */
                                if (!hasPropertyFunc(target, k) && action === 'set') {
                                    target[k] = value;
                                    continue;
                                }
                                /* check if target's value type is string */
                                else if (typeof tval !== 'string') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The field "${k}" is not a string`;
                                    throw new Error(mlog);
                                };

                                /* processing */
                                switch (action) {
                                    /* set string */
                                    case 'set': { target[k] = value } break;

                                    /* concatenate string with y before x */
                                    case 'concat_before': { target[k] = value + tval } break;

                                    /* concatenate string with x before y */
                                    case 'concat_after': { target[k] = tval + value } break;

                                    /* uppercase string */
                                    case 'upper': { target[k] = tval.toUpperCase() } break;

                                    /* lowercase string */
                                    case 'lower': { target[k] = tval.toLowerCase() } break;

                                    /* custom */
                                    case 'custom': {
                                        /* check if custom mutation function exists */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            mlog = mlog + `Unable to found any function associated to the custom mutation`;
                                            throw new Error(mlog);
                                        }

                                        /* extract custom mutation function */
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* TODO :: check if funcion is asynchronous */
                                        let mval: any = '';

                                        try { mval = func({ value: tval }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"customMutation" function has crashed at "${k}" level - Have you checked the type of "x.value"`;
                                            throw new Error(mlog);
                                        }

                                        /* check type of value return by the function */
                                        if (typeof mval !== 'string') {
                                            mlog = mlog + `The value returned by the "customMutation" function is not a string`;
                                            throw new Error(mlog);
                                        }

                                        /* set value */
                                        target[k] = mval;
                                    } break;

                                    /* - */
                                    default: { /* TODO :: log error */ };
                                };
                            }
                        } break;


                        /* For boolean */
                        case 'boolean': { /* Process boolean mutation */
                            const mutation: any[] = val.mutation;
                            for (let n = 0; n < mutation.length; n++) {
                                const tval: boolean = target[k];

                                /* check "tval" */
                                if (tval === undefined && !hasPropertyFunc(target, k)) {
                                    continue;
                                    // /* ERROR :: log error */
                                    // mlog = mlog + `Key "${k}" not found`;
                                    // throw new Error(mlog);
                                }

                                const currentMutation = mutation[n];
                                const action: MUTATION_ACTION_TYPE_FOR_BOOLEAN = currentMutation.action, path = currentMutation.path, value = currentMutation.value;
                                const cusmid = currentMutation.cusmid;

                                /* check if value is a boolean for "set" action */
                                if (action !== 'custom') {
                                    if ((action === 'set') && typeof value !== 'boolean') {
                                        /* ERROR :: log error */
                                        mlog = mlog + `"${value}" is not a boolean`;
                                        throw new Error(mlog);
                                    }
                                }

                                /* Process at path, if it's provided */
                                if (path !== undefined) {
                                    const process = atObjectPathFunc({ mtype: mtype, action: action, path: path, obj: target, value: value, sourceKey: k, cusmid: cusmid });
                                    mlog = mlog + process.log + '\n';
                                    if (process.status === 'error') {
                                        /* ERROR :: log error */
                                        mlog = mlog + process.log;
                                        throw new Error(mlog);
                                    }
                                    Object.assign(target, process.data);
                                    continue;
                                }

                                /* create field if it doesn't exists and action is "set" */
                                if (!hasPropertyFunc(target, k) && action === 'set') {
                                    target[k] = value;
                                    continue;
                                }
                                /* check if target's value type is boolean */
                                if (typeof target[k] !== 'boolean') {
                                    /* ERROR :: log error */
                                    mlog = mlog + `"${k}" isn't a boolean`;
                                    throw new Error(mlog);
                                };

                                /* processing */
                                switch (action) {
                                    /* set boolean */
                                    case 'set': { target[k] = value } break;

                                    /* invert boolean */
                                    case 'invert_boolean': { target[k] = !tval } break;

                                    /* custom */
                                    case 'custom': {
                                        /* check if custom mutation function exists */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            mlog = mlog + `Unable to found any function associated to the custom mutation`;
                                            throw new Error(mlog);
                                        }

                                        /* extract custom mutation function */
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* TODO :: check if funcion is asynchronous */
                                        let mval: any = false;

                                        try { mval = func({ value: tval }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"customMutation" function has crashed at "${k}" level - Have you checked the type of "x.value"`;
                                            throw new Error(mlog);
                                        }

                                        /* check type of value return by the function */
                                        if (typeof mval !== 'boolean') {
                                            mlog = mlog + `The value returned by the "customMutation" function is not a boolean`;
                                            throw new Error(mlog);
                                        }

                                        /* set value */
                                        target[k] = mval;
                                    } break;

                                    default: { /* TODO :: log error */ };
                                };
                            }
                        } break;


                        /* For object (array | json) */
                        case 'object': { /* Process object (json | array) mutation */
                            const mutation: any[] = val.mutation;
                            for (let n = 0; n < mutation.length; n++) {
                                const tval: any = target[k];

                                /* check "tval" */
                                if (tval === undefined && !hasPropertyFunc(target, k)) {
                                    continue;
                                    // /* ERROR :: log error */
                                    // mlog = mlog + `Key "${k}" not found`;
                                    // throw new Error(mlog);
                                }

                                /* - */
                                const tvt = typeof tval;
                                if (['string', 'number', 'boolean'].includes(tvt)) {
                                    const rup = updateFeedFunc({ target: x.target, data: x.data, mtype: tvt, recursive: true });
                                    if (rup.status !== 'success') {
                                        /* ERROR :: log error */
                                        mlog = mlog + rup.log;
                                        throw new Error(mlog);
                                    }
                                    Object.assign(target, rup.data);
                                    continue;
                                }

                                /* - */
                                const currentMutation = mutation[n];
                                const action: MUTATION_ACTION_TYPE_FOR_OBJECT = currentMutation.action, path = currentMutation.path, value = currentMutation.value;
                                const cusmid = currentMutation.cusmid;

                                /* check for nested mutations */
                                const cdt = value;
                                if (typeof cdt === 'object') {
                                    const std = JSON.stringify(cdt);
                                    if (std.includes('_$$isMutation')) {
                                        /* ERROR :: log error */
                                        mlog = mlog + `Bad mutation usage - You can call mutations upon top-level keys only`;
                                        throw new Error(mlog);

                                    } else if (std.includes('_$$isCondition')) {
                                        /* ERROR :: log error */
                                        mlog = mlog + `Bad condition usage at "${k}" level - You can't set a "condition" inside the mutation's value`;
                                        throw new Error(mlog);
                                    }
                                }

                                /* check if value is "mutation" or "condition" */
                                const hasMorC = (typeof value === 'object' && value !== null) ? hasMutationOrConditionFunc({ check: 'all', obj: value }) : false;
                                if (hasMorC) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The "value" field inside a mutation cannot contain another mutation - Nested mutation isn't allowed`;
                                    throw new Error(mlog);
                                }

                                /* processing */
                                const process = atObjectPathFunc({ mtype: mtype, action: action, path: path, obj: target, value: value, sourceKey: k, cusmid: cusmid });
                                if (process.status === 'error') {
                                    /* ERROR :: log error */
                                    mlog = mlog + process.log;
                                    throw new Error(mlog);
                                }
                                Object.assign(target, process.data);
                            }
                        } break;


                        /* default */
                        default: { /* TODO :: log error */ };
                    };
                }

                /* Reject conditions */
                else if (isConditionFunc({ obj: val })) {
                    /* ERROR :: log error */
                    mlog = mlog + `You try to use a "condition" inside an "update" - It's not possible`;
                    throw new Error(mlog);
                }

                /* Apply simple updates */
                else {
                    /* check for nested mutations */
                    const cdt = data;
                    if (typeof cdt === 'object') {
                        const std = JSON.stringify(cdt);
                        if (std.includes('_$$isMutation')) {
                            /* ERROR :: log error */
                            mlog = mlog + `Bad mutation usage at "${k}" level - You can call mutations upon top-level keys only`;
                            throw new Error(mlog);
                        }
                    }

                    /* update */
                    target[k] = data[k];
                }
            }

            /* Apply simple updates */
            else target[k] = data[k];
        }

        /* return */
        return { status: 'success', log: mlog, data: target };

    } catch (e: any) { return { status: 'error', log: `[Mutation] :: ${mlog}`, data: undefined } }
};

/** Inspect condition value */
const inspectConditionValueFunc = (x: { condType: 'number' | 'string' | 'boolean' | 'object' | 'date', operator: string, fkey: string, ftyp: any, value: any, year: number, path: any, format: CONDITION_DATE_FORMAT[], isDate: boolean, recursive?: boolean }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    const condType = x.condType, operator = x.operator, value = x.value, year = x.year, path = x.path, format = x.format, isDate = x.isDate ?? false, recursive = x.recursive || false;
    const fkey = x.fkey; /* field key */
    const ftyp = x.ftyp; /* feed's value type */
    const vtype = typeof value;

    let val: any = undefined;
    let mlog = '';
    let upRes = true; /* update "res" before return */

    try {
        switch (condType) {
            /* For number */
            case 'number': {
                const tab0 = ['===', '!==', '>', '>=', '<', '<=', '%'], tab1 = ['<>', '!<>', '<*>', '!<*>', '><', '!><', '>*<', '!>*<'], tab2 = ['<?>', '!<?>'];
                if (tab0.includes(operator)) {
                    /* check if value is a number */
                    if (typeof value !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `"${value}" is not a number`;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = value;

                } else if (tab1.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `For number condition, operator "${operator}" works only with arrays of numbers, but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* get array depth */
                    const dp: number = getArrayDepthFunc({ arr: value, maxLevel: 2 });

                    /* check if depth level is exceeded */
                    if (dp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `the maximun array depth level (2) is exceeded`;
                        throw new Error(mlog);
                    }

                    /* check if every entry inside the array is a number */
                    const marr: any[] = mergeNestedArrayFunc({ arr: value });
                    for (let m = 0; m < marr.length; m++) {
                        const tg = marr[m];
                        if (typeof tg !== 'number') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tg}" is not a number`;
                            throw new Error(mlog);
                        }
                    }

                    /* check if every array is a pair of number and sort in ascendent way */
                    const vl: Array<number[]> = (dp === 1) ? [value] : value;
                    for (let p = 0; p < vl.length; p++) {
                        const tar: number[] = vl[p];

                        /* stop check if arr is not a pair */
                        if (tar.length !== 2) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tar}" should be an array of two numbers`;
                            throw new Error(mlog);
                        }

                        /* sort array in ascendent way */
                        tar.sort((a: number, b: number) => a - b);
                    }

                    /* set val */
                    val = vl;

                } else if (tab2.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `Operator "${operator}" works only with arrays but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* get array depth */
                    const dp: number = getArrayDepthFunc({ arr: value, maxLevel: 1 });

                    /* check if depth level is exceeded */
                    if (dp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The operator "${operator}" only accept an array of numbers`;
                        throw new Error(mlog);
                    }

                    /* check if every entry inside the array is a number */
                    const marr: any[] = mergeNestedArrayFunc({ arr: value });
                    for (let m = 0; m < marr.length; m++) {
                        const tg = marr[m];
                        if (typeof tg !== 'number') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tg}" is not a number`;
                            throw new Error(mlog);
                        }
                    }

                    /* set val if everything is correct */
                    val = marr;

                } else {
                    /* ERROR :: log error */
                    mlog = mlog + `unknown operator "${operator}" for "number" type`;
                    throw new Error(mlog);
                }
            } break;

            /* For string */
            case 'string': {
                const tab0 = ['===', '!=='], tab1 = ['<>', '!<>'], tab2 = ['L==', 'L>', 'L>=', 'L<', 'L<=', 'wL==', 'wL>', 'wL>=', 'wL<', 'wL<='],
                    tab3 = ['<?>', '!<?>'], tab4 = ['<*>', '!<*>'];
                if (tab0.includes(operator)) {
                    /* check if value is a string */
                    if (vtype !== 'string') {
                        /* ERROR :: log error */
                        mlog = mlog + `"${value}" is not a string`;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = value;

                } else if (tab1.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value) && vtype !== 'string') {
                        /* ERROR :: log error */
                        mlog = mlog + `For string condition, operator "${operator}" works only with string or arrays of strings, but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    if (vtype === 'string') val = [[value]];
                    else {
                        /* get array depth */
                        const dp: number = getArrayDepthFunc({ arr: value, maxLevel: 2 });

                        /* check if depth level is exceeded */
                        if (dp === -1) {
                            /* ERROR :: log error */
                            mlog = mlog + `The maximun array depth level (2) is exceeded`;
                            throw new Error(mlog);
                        }

                        /* check if every entry inside the array is a string */
                        const marr: any[] = mergeNestedArrayFunc({ arr: value });
                        for (let m = 0; m < marr.length; m++) {
                            const tg = marr[m];
                            if (typeof tg !== 'string') {
                                /* ERROR :: log error */
                                mlog = mlog + `"${tg}" is not a "string"`;
                                throw new Error(mlog);
                            }
                        }

                        /* set val */
                        val = (dp === 1) ? [value] : value;
                    }

                } else if (tab2.includes(operator)) {
                    /* check if value is a string or a number */
                    const vtype = typeof value;
                    if (!['string', 'number'].includes(vtype)) {
                        /* ERROR :: log error */
                        mlog = mlog + `"${value}" should be a "number" or a "string"`;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = value;

                } else if (tab3.includes(operator)) {
                    /* check value is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `For string condition, operator "${operator}" works only with an array of strings, but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* check if each entry inside the array is a string */
                    for (let t = 0; t < value.length; t++) {
                        const val = value[t];
                        if (typeof val !== 'string') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${val}" is not a "string"`;
                            throw new Error(mlog);
                        }
                    }

                    /* set val */
                    val = value;

                } else if (tab4.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `For string condition, operator "${operator}" works only arrays of strings, but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* get array depth */
                    const dp: number = getArrayDepthFunc({ arr: value, maxLevel: 2 });

                    /* check if depth level is exceeded */
                    if (dp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The maximun array depth level (2) is exceeded`;
                        throw new Error(mlog);
                    }

                    /* check if every entry inside the array is a string */
                    const marr: any[] = mergeNestedArrayFunc({ arr: value });
                    for (let m = 0; m < marr.length; m++) {
                        const tg = marr[m];
                        if (typeof tg !== 'string') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tg}" is not a "string"`;
                            throw new Error(mlog);
                        }
                    }

                    /* set val */
                    val = (dp === 1) ? [value] : value;

                } else {
                    /* ERROR :: log error */
                    mlog = mlog + `unknown operator "${operator}" for "string" type`;
                    throw new Error(mlog);
                }
            } break;

            /* For boolean */
            case 'boolean': {
                const tab0 = ['===', '!=='];
                if (tab0.includes(operator)) {
                    /* check if value is a boolean */
                    if (vtype !== 'boolean') {
                        /* ERROR :: log error */
                        mlog = mlog + `"${value}" is not a boolean`;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = value;

                } else {
                    /* ERROR :: log error */
                    mlog = mlog + `unknown operator "${operator}" for "boolean" type`;
                    throw new Error(mlog);
                }
            } break;

            /* For date */
            case 'date': {
                const tab0 = ['===', '!==', '>', '>=', '<=', '<'], tab1 = ['<>', '!<>', '<*>', '!<*>', '><', '>*<', '!><', '!>*<'], tab2 = ['<?>', '!<?>'];
                const tab3 = ['=Q1', '=Q2', '=Q3', '=Q4', '=S1', '=S2'], tab4 = ['Y->', 'M->', 'Dt->', 'Dy->', 'H->', 'Mn', 'S->', 'T->'], tab5 = ['D??', 'N??'];
                if (tab0.includes(operator)) {
                    const tmp = extractTimestampFunc({ value: value, dateFormat: _date_format_.current });
                    if (tmp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The value "${value}" is not a valid date`;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = tmp;

                } else if (tab1.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `For date conditions, the operator "${operator}" only works with arrays of numbers or strings, but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* get array depth */
                    const dp: number = getArrayDepthFunc({ arr: value, maxLevel: 2 });

                    /* check if depth level is exceeded */
                    if (dp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The maximun array depth level (2) is exceeded`;
                        throw new Error(mlog);
                    }

                    /* check if every entry inside the array is a number or a string */
                    const marr: any[] = mergeNestedArrayFunc({ arr: value });
                    for (let m = 0; m < marr.length; m++) {
                        const tg = marr[m];
                        if (!['string', 'number'].includes(typeof tg)) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tg}" should be a number or a string`;
                            throw new Error(mlog);
                        }
                    }

                    /* check if every array is a pair of number and sort in ascendent way */
                    const vl: Array<number[]> = (dp === 1) ? [value] : value;
                    for (let p = 0; p < vl.length; p++) {
                        const tar: number[] = vl[p];
                        /* stop check if arr is not a pair */
                        if (tar.length !== 2) {
                            /* ERROR :: log error */
                            mlog = mlog + `"[${tar}]" should be an array of two numbers or strings`;
                            throw new Error(mlog);
                        }
                    }

                    /* - */
                    let fval = [], hasNestedArr = false;
                    for (let f = 0; f < value.length; f++) { const crt = value[f]; if (Array.isArray(crt)) { hasNestedArr = true; break } }
                    fval = hasNestedArr ? value : [value];

                    /* transform date into tmp */
                    const cfval = cloneObjFunc({ obj: fval });
                    const trans = transformIntoTimestampFunc({ value: cfval, format: format });
                    if (trans.status !== 'success') {
                        /* ERROR :: log error */
                        mlog = mlog + trans.log;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = trans.data;

                } else if (tab2.includes(operator)) {
                    /* check if "value" is an array */
                    if (!Array.isArray(value)) {
                        /* ERROR :: log error */
                        mlog = mlog + `The operator "${operator}" works only with arrays but your value is of type "${vtype}"`;
                        throw new Error(mlog);
                    }

                    /* get array depth */
                    const dp: number = getArrayDepthFunc({ arr: value, maxLevel: _max_object_depth_length_ });

                    /* check if depth level is exceeded */
                    if (dp === -1) {
                        /* ERROR :: log error */
                        mlog = mlog + `The maximun array depth level ("${_max_object_depth_length_}") is exceeded`;
                        throw new Error(mlog);
                    }

                    /* check if every entry inside the array is a number */
                    const marr: any[] = mergeNestedArrayFunc({ arr: value });
                    for (let m = 0; m < marr.length; m++) {
                        const tg = marr[m];
                        if (!['string', 'number'].includes(typeof tg)) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${tg}" should be a number or a string`;
                            throw new Error(mlog);
                        }
                    }

                    /* transform date into tmp */
                    const trans = transformIntoTimestampFunc({ value: marr, format: format });
                    if (trans.status !== 'success') {
                        /* ERROR :: log error */
                        mlog = mlog + trans.log;
                        throw new Error(mlog);
                    }

                    /* set val */
                    val = trans.data;

                } else if (tab3.includes(operator)) {
                    if (typeof year !== 'number') {
                        /* ERROR :: log error */
                        mlog = mlog + `Invalid year for "${operator}" operator`;
                        throw new Error(mlog);
                    }
                    val = value;

                } else if (tab4.includes(operator)) {
                    /* check if value is a string or a number */
                    const vtype = typeof value;
                    if (!['string', 'number'].includes(vtype)) {
                        /* ERROR :: log error */
                        mlog = mlog + `"${value}" should be a number or a string`;
                        throw new Error(mlog);
                    }

                    /* - */
                    const minMax: any = { 'M->': [1, 12], 'Dt->': [1, 31], 'Dy->': [1, 7], 'H->': [0, 23], 'Mn': [0, 59], 'S->': [0, 59] };
                    const iobj: any = { 'M->': 'month', 'Dt->': 'date', 'Dy->': 'day', 'H->': 'hour', 'Mn': 'minute', 'S->': 'second' };
                    for (let e = 0; e < tab4.length; e++) {
                        const target: string = tab4[e];
                        if (['Y->', 'M->', 'Dt->', 'Dy->', 'H->', 'Mn->', 'S->'].includes(target)) {
                            /* - */
                            if (vtype === 'string' && !isNumericFunc({ value: value })) {
                                /* ERROR :: log error */
                                mlog = mlog + `Invalid value for "${target}" - "${value}" is not convertible to number`;
                                throw new Error(mlog);
                            }

                            /* check if value is in the normal range */
                            const nval = (vtype !== 'number') ? Number(value) : value;
                            if (target === 'Y->') {
                                if (value < 0) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `Invalid year "${nval}"`;
                                    throw new Error(mlog);
                                }
                            } else {
                                const tab: number[] = minMax[target];
                                if (value < tab[0] && value > tab[1]) {
                                    /* ERROR :: log error */
                                    mlog = mlog + `Invalid ${iobj[target]} "${nval}" - The valid range is "[${tab}]"`;
                                    throw new Error(mlog);
                                }
                            }

                            /* set val */
                            val = nval;

                        } else if (['T->'].includes(target)) { }
                    }

                } else if (tab5.includes(operator)) {
                    /* No operation needed yet */
                    val = value;

                } else {
                    /* ERROR :: log error */
                    mlog = mlog + `unknown operator "${operator}" for "date" type`;
                    throw new Error(mlog);
                }
            } break;

            /* For object */
            case 'object': {
                /* number - string - date */
                const ctp: any = condType;
                const tps = ['string', 'number', 'boolean', 'object', 'undefined'];

                /* - */
                if ((ctp === 'date' || ['number', 'string', 'boolean'].includes(ftyp)) && !recursive) {
                    upRes = false;
                    res = inspectConditionValueFunc(Object.assign(x, { condType: (ctp === 'date') ? 'date' : ftyp, recursive: true }));
                    if (res.status !== 'success') throw new Error(res.log);
                }

                /* object */
                else if (condType === 'object') {
                    const tab0 = ['[?]', '![?]'], tab1 = ['[=]'], tab2 = ['{k}', '!{k}'], tab3 = ['{v}', '!{v}'],
                        tab4 = '{=}', tab5 = ['{k*}', '!{k*}'], tab6 = ['{v*}', '!{v*}'], tab7 = ['[*]', '![*]'];

                    if (tab0.includes(operator)) {
                        /* check if the field value is an array */
                        if (ftyp !== 'array') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not an "array"`;
                            throw new Error(mlog);
                        }

                        /* check value type */
                        if (!tps.includes(vtype)) {
                            /* ERROR :: log error */
                            mlog = mlog + `Invalid value "${value}" for operator "${operator}"`;
                            throw new Error(mlog);
                        }

                    } else if (tab1.includes(operator)) {
                        /* check if the field value is an array */
                        if (ftyp !== 'array') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not an "array"`;
                            throw new Error(mlog);
                        }

                        /* check if value is an array */
                        if (!Array.isArray(value)) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept value of type "array"`;
                            throw new Error(mlog);
                        }

                    } else if (tab2.includes(operator)) {
                        /* check if the field value is a json */
                        if (ftyp !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not a "json" object`;
                            throw new Error(mlog);
                        }

                        /* - */
                        const isvr = Array.isArray(value);
                        if (vtype !== 'string' && !isvr) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept a string or an array of strings as "value"`;
                            throw new Error(mlog);
                        }

                        /* - */
                        if (isvr) for (let j = 0; j < value.length; j++) {
                            const targ = value[j];
                            if (typeof targ !== 'string') {
                                /* ERROR :: log error */
                                mlog = mlog + `"${operator}" only accept a string or an array of strings as "value"`;
                                throw new Error(mlog);
                            }
                        }

                    } else if (tab3.includes(operator)) {
                        /* check if the field value is a json */
                        if (ftyp !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not a "json" object`;
                            throw new Error(mlog);
                        }

                        /* - */
                        if (!tps.includes(vtype)) {
                            /* ERROR :: log error */
                            mlog = mlog + `Invalid value "${value}" for operator "${operator}"`;
                            throw new Error(mlog);
                        }

                    } else if (tab4.includes(operator)) {
                        /* check if the field value is a json */
                        if (ftyp !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not a "json" object`;
                            throw new Error(mlog);
                        }

                        /* - */
                        const typ = getObjectTypeFunc({ object: value });
                        if (typ !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept value of type "json"`;
                            throw new Error(mlog);
                        }

                    } else if (tab5.includes(operator)) {
                        /* check if the field value is a json */
                        if (ftyp !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not a "json" object`;
                            throw new Error(mlog);
                        }

                        /* - */
                        const isvr = Array.isArray(value);
                        if (!isvr) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept an array of strings as "value"`;
                            throw new Error(mlog);
                        }

                        /* - */
                        if (isvr) for (let j = 0; j < value.length; j++) {
                            const targ = value[j];
                            if (typeof targ !== 'string') {
                                /* ERROR :: log error */
                                mlog = mlog + `"${operator}" only accept an array of strings as "value"`;
                                throw new Error(mlog);
                            }
                        }

                    } else if (tab6.includes(operator)) {
                        /* check if the field value is a json */
                        if (ftyp !== 'json') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not a "json" object`;
                            throw new Error(mlog);
                        }

                        /* - */
                        if (!Array.isArray(value)) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept an array`;
                            throw new Error(mlog);
                        }

                    } else if (tab7.includes(operator)) {
                        /* check if the field value is an array */
                        if (ftyp !== 'array') {
                            /* ERROR :: log error */
                            mlog = mlog + `"${fkey}" is not an "array"`;
                            throw new Error(mlog);
                        }

                        /* check if value is an array */
                        if (!Array.isArray(value)) {
                            /* ERROR :: log error */
                            mlog = mlog + `"${operator}" only accept value of type "array"`;
                            throw new Error(mlog);
                        }

                    } else {
                        /* ERROR :: log error */
                        mlog = mlog + `Invalid value "${value}" for operator "${operator}"`;
                        throw new Error(mlog);
                    }

                    /* - */
                    val = value;
                }

                /* - */
                else {
                    /* ERROR :: log error */
                    mlog = mlog + `Invalid value "${value}" for operator "${operator}"`;
                    throw new Error(mlog);
                }
            } break;

            /* default */
            default: { };
        };

        /* - */
        if (upRes) { res.log = mlog; res.data = val }
        return res;

    } catch (e: any) {
        res.status = 'error';
        res.log = `${e.message}`;
        return res;
    }
};

/** Check if feed match some conditions - Look for result inside "data" and not "status", "True" is it match and "False" is not */
const checkConditionFunc = (x: { feed: JSON_BASIC_TYPE, condition: JSON_BASIC_TYPE | JSON_BASIC_TYPE[], recursive?: boolean }): FUNCTION_BASIC_RETURN_TYPE => {
    const feed = cloneObjFunc({ obj: x.feed, useLoop: Array.isArray(x.feed) ? true : false }), condition = Array.isArray(x.condition) ? x.condition : [x.condition], recursive = x.recursive || false;
    let mlog = '', match = false, matchTab: any[] = Array(condition.length).fill(undefined).map(() => []);
    try {
        /* process each condition */
        for (let c = 0; c < condition.length; c++) {
            const condCount = c;
            const currentCond = condition[c];

            /* extract conditions keys */
            const condKeys = Object.keys(currentCond);
            if (condKeys.length === 0) condKeys.push('@@_dont_mind_$$'); /* insert fake key, if user set an empty condition object, to avoid unwanted free validation */

            /* check current condition */
            for (let i = 0; i < condKeys.length; i++) {
                const ky = condKeys[i]; /* The first key on which to perform condition */
                if (hasPropertyFunc(feed, ky)) {
                    const feedValue = feed[ky] ?? undefined;

                    /* If value is undefined */
                    if (feedValue === undefined) {
                        matchTab[condCount].push(false);
                        continue;
                    }

                    /* - */
                    let fval = feedValue, condData = currentCond[ky];
                    let result = false;

                    /* - */
                    const isCondition = isConditionFunc({ obj: condData });
                    let value: any = condData; /* Never remove "condData" because if it's not a condition, it will server directly as the "value" */

                    /* if it's an db condition */
                    if (isCondition) {
                        /* retrieve main condition parameters */
                        const condTab = condData.condition;
                        const condLink: 'OR' | 'AND' = condData.link;
                        const condType = condData['_$$type'];

                        /* check each inner condition */
                        let innerResTab = [];
                        for (let j = 0; j < condTab.length; j++) {
                            const innerCond = condTab[j];
                            const operator = innerCond.operator;
                            const path = innerCond.path ?? undefined;
                            const isDate = innerCond.isDate || false;
                            const casesensitive = innerCond.case_sensitive ?? true;
                            const year = innerCond.year || undefined;
                            const cusmid = innerCond.cusmid; /* permutation function id */
                            const val = typeof innerCond.value === 'object' ? cloneObjFunc({ obj: innerCond.value }) || undefined : innerCond.value;

                            /* default date format */
                            const format: any[] = cloneObjFunc({ obj: _date_format_.current }) ?? ['YYYY_MM_DD'];

                            /* process per condition type */
                            switch (condType) {
                                /* For number - Becarful ! Any change made should be updated inside object */
                                case 'number': {
                                    /* get real feed value */
                                    let realFeedValue = feedValue;
                                    if (path !== undefined) {
                                        const rev = resolvePathFunc({ path: path, firstKey: ky, sourceObj: feed });
                                        if (rev.status !== 'success') continue;
                                        realFeedValue = rev.data;
                                    }

                                    /* Execute "permutation" function if available */
                                    if (operator !== 'custom' && cusmid !== undefined) {
                                        /* extract func */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function not found`;
                                            throw new Error(mlog);
                                        }
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* Exec func */
                                        // const carg = (typeof realFeedValue === 'object' && realFeedValue !== null) ? cloneObjFunc({obj: realFeedValue}) : realFeedValue;
                                        const carg = realFeedValue;
                                        let exc: any = 1;

                                        try { exc = func({ value: carg }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                            throw new Error(mlog);
                                        };

                                        if (typeof exc !== 'number') {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function returned a non-number value at "${ky}" level`;
                                            throw new Error(mlog);
                                        }

                                        realFeedValue = exc;
                                    }

                                    /* - */
                                    fval = realFeedValue;

                                    /* inspect and extract condition's value */
                                    if (operator !== 'custom') {
                                        /* - */
                                        let fty: any = typeof fval;
                                        if (fty === 'object') fty = getObjectTypeFunc({ object: fval });

                                        /* - */
                                        const inspect = inspectConditionValueFunc({ condType: isDate ? 'date' : condType, operator: operator, fkey: ky, ftyp: fty, value: innerCond.value, year: year, path: path, format: format, isDate: isDate });
                                        if (inspect.status !== 'success') {
                                            /* ERROR :: log error */
                                            mlog = mlog + inspect.log;
                                            throw new Error(mlog);
                                        }

                                        /* extract condition value */
                                        value = inspect.data;
                                    }

                                    /* check if data at feed level is a number */
                                    if (typeof fval !== 'number') {
                                        /* ERROR :: log error */
                                        mlog = mlog + `You try to do a number condition upon "${ky}", but it's not a number. It's of type "${typeof fval}"`;
                                        throw new Error(mlog);
                                    }

                                    /* process per operator */
                                    switch (operator) {
                                        /* basic ops */
                                        case '===': { innerResTab.push((fval === value) ? true : false) } break;
                                        case '!==': { innerResTab.push((fval !== value) ? true : false) } break;
                                        case '>': { innerResTab.push((fval > value) ? true : false) } break;
                                        case '>=': { innerResTab.push((fval >= value) ? true : false) } break;
                                        case '<': { innerResTab.push((fval < value) ? true : false) } break;
                                        case '<=': { innerResTab.push((fval <= value) ? true : false) } break;
                                        case '%': { innerResTab.push((fval % value) === 0 ? true : false) } break; /* check if "fval" is divisible by or a multiple of "value" */


                                        /*
                                        * EDGE INCLUSION or INSIDE
                                        */


                                        /* check if number is included INSIDE at least one range (include edge values) */
                                        case '<>': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval >= i0 && fval <= i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if number is included INSIDE absolutely all range (include edge values)s */
                                        case '<*>': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval >= i0 && fval <= i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if number isn't included INSIDE at least one range (include edge values) */
                                        case '!<>': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval < i0 || fval > i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if number isn't included INSIDE absolutely any range (include edge values) */
                                        case '!<*>': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval < i0 || fval > i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if number is included or equal to at least one number in the range */
                                        case '<?>': {
                                            const cval: number[] = value;
                                            innerResTab.push(cval.includes(fval) ? true : false);
                                        } break;

                                        /* check if number isn't included or not equal to any number in the range */
                                        case '!<?>': {
                                            const cval: number[] = value;
                                            innerResTab.push(!cval.includes(fval) ? true : false);
                                        } break;


                                        /* 
                                        * EDGE EXCLUSION or BETWEEN
                                        */


                                        /* check if number is included BETWEEN at least one range (exclude edge values) */
                                        case '><': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval > i0 && fval < i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if number is included inside absolutely all ranges (exclude edge values) */
                                        case '>*<': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval > i0 && fval < i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if number isn't included BETWEEN at least one range (exclude edge values) */
                                        case '!><': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval <= i0 || fval >= i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if number isn't included BETWEEN absolutely any range (exclude edge values) */
                                        case '!>*<': {
                                            const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                const i0 = carr[0], i1 = carr[1];
                                                miniRes.push((fval <= i0 || fval >= i1) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;



                                        /* Custom condition */
                                        case 'custom': {
                                            /* extract func */
                                            const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                            if (!chk) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function not found`;
                                                throw new Error(mlog);
                                            }

                                            const func: any = mutation_custom_func_DATA[cusmid];
                                            let exc: boolean = false;

                                            try { exc = func({ value: fval }) }
                                            catch (e: any) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"customCondition" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                                throw new Error(mlog);
                                            };

                                            if (typeof exc !== 'boolean') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function returned a non-boolean value at "${ky}" level`;
                                                throw new Error(mlog);
                                            }

                                            innerResTab.push(exc);
                                        } break;


                                        /* - */
                                        default: {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The operator "${operator}" is not compatible with number condition`;
                                            throw new Error(mlog);
                                        };
                                    };
                                } break;


                                /* For string - Becarful ! Any change made should be updated inside object */
                                case 'string': {
                                    /* get real feed value */
                                    let realFeedValue = feedValue;
                                    if (path !== undefined) {
                                        const rev = resolvePathFunc({ path: path, firstKey: ky, sourceObj: feed });
                                        if (rev.status !== 'success') continue;
                                        realFeedValue = rev.data;
                                    }

                                    /* Execute "permutation" function if available */
                                    if (operator !== 'custom' && cusmid !== undefined) {
                                        /* extract func */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `Premutation function not found`;
                                            throw new Error(mlog);
                                        }
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* Exec func */
                                        const carg = realFeedValue;
                                        let exc: any = '';

                                        try { exc = func({ value: carg }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                            throw new Error(mlog);
                                        };

                                        if (typeof exc !== 'string') {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function returned a non-string value at "${ky}" level`;
                                            throw new Error(mlog);
                                        }

                                        realFeedValue = casesensitive ? exc : removeAccentFunc({ value: exc, lowerCase: true });
                                    }

                                    /* - */
                                    fval = realFeedValue;

                                    /* inspect and extract condition's value */
                                    if (operator !== 'custom') {
                                        /* - */
                                        let fty: any = typeof fval;
                                        if (fty === 'object') fty = getObjectTypeFunc({ object: fval });

                                        /* - */
                                        const inspect = inspectConditionValueFunc({ condType: isDate ? 'date' : condType, operator: operator, fkey: ky, ftyp: fty, value: innerCond.value, year: year, path: path, format: format, isDate: isDate });
                                        if (inspect.status !== 'success') {
                                            /* ERROR :: log error */
                                            mlog = mlog + inspect.log;
                                            throw new Error(mlog);
                                        }

                                        /* extract condition value */
                                        value = inspect.data;
                                    }

                                    /* check if data at feed level is a string */
                                    if (typeof fval !== 'string') {
                                        /* ERROR :: log error */
                                        mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                        throw new Error(mlog);
                                    }

                                    /* process per operator */

                                    switch (operator) {
                                        /* Equality check */
                                        case '===': {
                                            fval = fval.replaceAll(' ', ''); value = value.replaceAll(' ', '');
                                            if (casesensitive) innerResTab.push((fval === value) ? true : false);
                                            else {
                                                const a = removeAccentFunc({ value: fval, lowerCase: true }), b = removeAccentFunc({ value: value, lowerCase: true });
                                                innerResTab.push((a === b) ? true : false);
                                            }
                                        } break;

                                        /* Inequality check */
                                        case '!==': {
                                            fval = fval.replaceAll(' ', ''); value = value.replaceAll(' ', '');
                                            if (casesensitive) innerResTab.push((fval !== value) ? true : false);
                                            else {
                                                const a = removeAccentFunc({ value: fval, lowerCase: true }), b = removeAccentFunc({ value: value, lowerCase: true });
                                                innerResTab.push((a !== b) ? true : false);
                                            }
                                        } break;



                                        /* compare string "char" length */
                                        case 'L==': {
                                            fval = fval.replaceAll(' ', '');
                                            let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                            if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                            innerResTab.push((fval.length === len) ? true : false);
                                        } break;

                                        /* compare string "char" length */
                                        case 'L>': {
                                            fval = fval.replaceAll(' ', '');
                                            let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                            if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                            innerResTab.push((fval.length > len) ? true : false);
                                        } break;

                                        /* compare string "char" length */
                                        case 'L>=': {
                                            fval = fval.replaceAll(' ', '');
                                            let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                            if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                            innerResTab.push((fval.length >= len) ? true : false);
                                        } break;

                                        /* compare string "char" length */
                                        case 'L<': {
                                            fval = fval.replaceAll(' ', '');
                                            let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                            if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                            innerResTab.push((fval.length < len) ? true : false);
                                        } break;

                                        /* compare string "char" length */
                                        case 'L<=': {
                                            fval = fval.replaceAll(' ', '');
                                            let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                            if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                            innerResTab.push((fval.length <= len) ? true : false);
                                        } break;



                                        /* compare string "word" length */
                                        case 'wL==': {
                                            const fvl = getWordCountFunc({ value: fval });
                                            const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                            innerResTab.push((fvl === len) ? true : false);
                                        } break;

                                        /* compare string "word" length */
                                        case 'wL>': {
                                            const fvl = getWordCountFunc({ value: fval });
                                            const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                            innerResTab.push((fvl > len) ? true : false);
                                        } break;

                                        /* compare string "word" length */
                                        case 'wL>=': {
                                            const fvl = getWordCountFunc({ value: fval });
                                            const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                            innerResTab.push((fvl >= len) ? true : false);
                                        } break;

                                        /* compare string "word" length */
                                        case 'wL<': {
                                            const fvl = getWordCountFunc({ value: fval });
                                            const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                            innerResTab.push((fvl < len) ? true : false);
                                        } break;

                                        /* compare string "word" length */
                                        case 'wL<=': {
                                            const fvl = getWordCountFunc({ value: fval });
                                            const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                            innerResTab.push((fvl <= len) ? true : false);
                                        } break;



                                        /* check if string contains at least one giving values */
                                        case '<>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: (string | string[])[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const ctar: string | string[] = cval[a];
                                                let microRes = [];

                                                /* cond 0 :: if current value is an array of strings */
                                                if (Array.isArray(ctar)) {
                                                    for (let b = 0; b < ctar.length; b++) {
                                                        const strg = ctar[b];
                                                        let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        if (fval.includes(sval)) { microRes.push(true); break }
                                                    }
                                                }

                                                /* cond 1 :: if current value is a string */
                                                else {
                                                    let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    microRes.push((fval.includes(sval)) ? true : false);
                                                }

                                                /* at least one condition should match */
                                                miniRes.push((microRes.includes(true)) ? true : false);
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if string don't contains one of the giving values */
                                        case '!<>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: (string | string[])[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const ctar: string | string[] = cval[a];
                                                let microRes = [];

                                                /* cond 0 :: if current value is an array of strings */
                                                if (Array.isArray(ctar)) {
                                                    for (let b = 0; b < ctar.length; b++) {
                                                        const strg = ctar[b];
                                                        let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        if (!fval.includes(sval)) { microRes.push(true); break }
                                                    }
                                                }

                                                /* cond 1 :: if current value is a string */
                                                else {
                                                    let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    microRes.push(!fval.includes(sval) ? true : false);
                                                }

                                                /* at least one condition should match */
                                                miniRes.push(microRes.includes(true) ? true : false);
                                            }
                                            innerResTab.push(miniRes.includes(true) ? true : false);
                                        } break;

                                        /* check if string contains absolutely all giving values */
                                        case '<*>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: (string | string[])[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const ctar: string | string[] = cval[a];
                                                let microRes = [];

                                                /* cond 0 :: if current value is an array of strings */
                                                if (Array.isArray(ctar)) {
                                                    let picoRes = [];
                                                    for (let b = 0; b < ctar.length; b++) {
                                                        const strg = ctar[b];
                                                        let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        picoRes.push((fval.includes(sval)) ? true : false);
                                                    }
                                                    microRes.push((picoRes.includes(false)) ? false : true); /* all should match */
                                                }

                                                /* cond 1 :: if current value is a string */
                                                else {
                                                    let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    microRes.push((fval.includes(sval)) ? true : false);
                                                }

                                                /* all conditions should match */
                                                miniRes.push((microRes.includes(false)) ? false : true);
                                            }
                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if string doesn't contains any giving values */
                                        case '!<*>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: (string | string[])[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const ctar: string | string[] = cval[a];
                                                let microRes = [];

                                                /* cond 0 :: if current value is an array of strings */
                                                if (Array.isArray(ctar)) {
                                                    let picoRes = [];
                                                    for (let b = 0; b < ctar.length; b++) {
                                                        const strg = ctar[b];
                                                        let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        picoRes.push(!fval.includes(sval) ? true : false);
                                                    }
                                                    microRes.push((picoRes.includes(false)) ? false : true); /* none should match */
                                                }

                                                /* cond 1 :: if current value is a string */
                                                else {
                                                    let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    microRes.push(!fval.includes(sval) ? true : false);
                                                }

                                                /* no condition should match */
                                                miniRes.push(microRes.includes(false) ? false : true);
                                            }
                                            innerResTab.push(miniRes.includes(false) ? false : true);
                                        } break;



                                        /* check if string is equal to at least one value in the array */
                                        case '<?>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: string[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const strg = cval[a];
                                                let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                miniRes.push(fval === sval ? true : false); /* at least one condition should match */
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if string isn't equal to any value in the array */
                                        case '!<?>': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* - */
                                            const cval: string[] = value;
                                            let miniRes = [];
                                            for (let a = 0; a < cval.length; a++) {
                                                const strg = cval[a];
                                                let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                miniRes.push(fval === sval ? true : false); /* no condition shouldn't match */
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? false : true);
                                        } break;



                                        /* Custom condition */
                                        case 'custom': {
                                            /* - */
                                            if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                            /* extract func */
                                            const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                            if (!chk) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function not found`;
                                                throw new Error(mlog);
                                            }

                                            const func: any = mutation_custom_func_DATA[cusmid];
                                            let exc: boolean = false;

                                            try { exc = func({ value: fval }) }
                                            catch (e: any) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"customCondition" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                                throw new Error(mlog);
                                            };

                                            if (typeof exc !== 'boolean') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function returned a non-boolean value at "${ky}" level`;
                                                throw new Error(mlog);
                                            }

                                            innerResTab.push(exc);
                                        } break;



                                        /* - */
                                        default: {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The operator "${operator}" is not compatible with string condition`;
                                            throw new Error(mlog);
                                        };
                                    };
                                } break;


                                /* For boolean - Becarful ! Any change made should be updated inside object */
                                case 'boolean': {
                                    /* get real feed value */
                                    let realFeedValue = feedValue;
                                    if (path !== undefined) {
                                        const rev = resolvePathFunc({ path: path, firstKey: ky, sourceObj: feed });
                                        if (rev.status !== 'success') continue;
                                        realFeedValue = rev.data;
                                    }

                                    /* Execute "permutation" function if available */
                                    if (operator !== 'custom' && cusmid !== undefined) {
                                        /* extract func */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function not found`;
                                            throw new Error(mlog);
                                        }
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* Exec func */
                                        const carg = realFeedValue;
                                        let exc: any = 1;

                                        try { exc = func({ value: carg }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                            throw new Error(mlog);
                                        };

                                        if (typeof exc !== 'boolean') {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function returned a non-boolean value at "${ky}" level`;
                                            throw new Error(mlog);
                                        }

                                        realFeedValue = exc;
                                    }

                                    /* - */
                                    fval = realFeedValue;

                                    /* inspect and extract condition's value */
                                    if (operator !== 'custom') {
                                        /* - */
                                        let fty: any = typeof fval;
                                        if (fty === 'object') fty = getObjectTypeFunc({ object: fval });

                                        /* - */
                                        const inspect = inspectConditionValueFunc({ condType: isDate ? 'date' : condType, operator: operator, fkey: ky, ftyp: fty, value: innerCond.value, year: year, path: path, format: format, isDate: isDate });
                                        if (inspect.status !== 'success') {
                                            /* ERROR :: log error */
                                            mlog = mlog + inspect.log;
                                            throw new Error(mlog);
                                        }

                                        /* extract condition value */
                                        value = inspect.data;
                                    }

                                    /* check if field value is a boolean */
                                    if (typeof fval !== 'boolean') {
                                        /* ERROR :: log error */
                                        mlog = mlog + `You try to do a boolean condition upon "${ky}", but it's not a boolean. It's of type "${typeof fval}"`;
                                        throw new Error(mlog);
                                    }

                                    /* process per operator */
                                    switch (operator) {
                                        /* basic ops */
                                        case '===': { innerResTab.push((fval === value) ? true : false) } break;
                                        case '!==': { innerResTab.push((fval !== value) ? true : false) } break;
                                        /* - */
                                        default: {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The operator "${operator}" is not compatible with boolean condition`;
                                            throw new Error(mlog);
                                        };
                                    };
                                } break;


                                /* For date - Becarful ! Any change made should be updated inside object */
                                case 'date': {
                                    /* get real feed value */
                                    let realFeedValue = feedValue;
                                    if (path !== undefined) {
                                        const rev = resolvePathFunc({ path: path, firstKey: ky, sourceObj: feed });
                                        if (rev.status !== 'success') continue;
                                        realFeedValue = rev.data;
                                    }

                                    /* Execute "permutation" function if available */
                                    if (operator !== 'custom' && cusmid !== undefined) {
                                        /* extract func */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `Premutation function not found`;
                                            throw new Error(mlog);
                                        }
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* Exec func */
                                        const carg = realFeedValue;
                                        let exc: any = undefined;

                                        try { exc = func({ value: carg }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                            throw new Error(mlog);
                                        };

                                        const xtp: any = typeof exc;
                                        if (!['string', 'number'].includes(xtp)) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function returned an invalid value for "date" condition at "${ky}" level - "Date" condition support values of type "string" or "number"`;
                                            throw new Error(mlog);
                                        }

                                        realFeedValue = exc;
                                    }

                                    /* - */
                                    const rfval = realFeedValue;
                                    fval = realFeedValue;

                                    /* inspect and extract condition's value */
                                    if (operator !== 'custom') {
                                        /* - */
                                        let fty: any = typeof fval;
                                        if (fty === 'object') fty = getObjectTypeFunc({ object: fval });

                                        /* - */
                                        const inspect = inspectConditionValueFunc({ condType: isDate ? 'date' : condType, operator: operator, fkey: ky, ftyp: fty, value: innerCond.value, year: year, path: path, format: format, isDate: isDate });
                                        if (inspect.status !== 'success') {
                                            /* ERROR :: log error */
                                            mlog = mlog + inspect.log;
                                            throw new Error(mlog);
                                        }

                                        /* extract condition value */
                                        value = inspect.data;
                                    }

                                    /* check if data at feed level is a number or a string */
                                    const ftype = typeof fval;
                                    if (!['string', 'number'].includes(ftype)) {
                                        /* ERROR :: log error */
                                        mlog = mlog + `You attempted a date condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                        throw new Error(mlog);
                                    }

                                    /* extract timestamp from "feedValue" */
                                    fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                    if (fval === -1) {
                                        /* ERROR :: log error */
                                        mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                        throw new Error(mlog);
                                    }

                                    /* process per operator */
                                    switch (operator) {
                                        /* basic ops */
                                        case '===': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv === ga.tmp) ? true : false);
                                        } break;

                                        case '!==': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv !== ga.tmp) ? true : false);
                                        } break;

                                        case '>': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv > ga.tmp) ? true : false);
                                        } break;

                                        case '>=': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv >= ga.tmp) ? true : false);
                                        } break;

                                        case '<': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv < ga.tmp) ? true : false);
                                        } break;

                                        case '<=': {
                                            const ga = extractTimestampFunc({ value: val, extractModel: true });
                                            const btm = buildDateTemplateFunc(ga.model);
                                            const fv = extractTimestampFunc({ value: rfval, template: btm });
                                            innerResTab.push((fv <= ga.tmp) ? true : false);
                                        } break;


                                        /*
                                        * EDGE INCLUSION or INSIDE
                                        */


                                        /* check if date is included INSIDE at least one range (include edge values) */
                                        case '<>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv >= tz[0] && fv <= tz[1]) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if date isn't included INSIDE at least one range (include edge values) */
                                        case '!<>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv < tz[0] || fv > tz[1]) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if date is included INSIDE absolutely all range (include edge values)s */
                                        case '<*>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv >= tz[0] && fv <= tz[1]) miniRes.push(true);
                                                else {
                                                    miniRes.push(false);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if date isn't included INSIDE absolutely any range (include edge values) */
                                        case '!<*>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv < tz[0] || fv > tz[1]) miniRes.push(true);
                                                else {
                                                    miniRes.push(false);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;




                                        /* check if date is included or equal to at least one date in the range */
                                        case '<?>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                dtab.push(xt);
                                            }

                                            /* - */
                                            for (let g = 0; g < dtab.length; g++) {
                                                const ta = dtab[g];
                                                const btm = buildDateTemplateFunc(ta.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });

                                                if (fv === ta.tmp) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if date isn't include or not equal to any date in the range */
                                        case '!<?>': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                dtab.push(xt);
                                            }

                                            /* - */
                                            for (let g = 0; g < dtab.length; g++) {
                                                const ta = dtab[g];
                                                const btm = buildDateTemplateFunc(ta.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });

                                                if (fv !== ta.tmp) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }
                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;


                                        /* 
                                        * EDGE EXCLUSION or BETWEEN
                                        */


                                        /* check if date is included BETWEEN at least one range (exclude edge values) */
                                        case '><': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv > tz[0] && fv < tz[1]) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if date isn't included BETWEEN at least one range (exclude edge values) */
                                        case '!><': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv <= tz[0] || fv >= tz[1]) {
                                                    miniRes.push(true);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(true)) ? true : false);
                                        } break;

                                        /* check if date is included inside absolutely all ranges (exclude edge values) */
                                        case '>*<': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv > tz[0] && fv < tz[1]) miniRes.push(true);
                                                else {
                                                    miniRes.push(false);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;

                                        /* check if date isn't included BETWEEN absolutely any range (include edge values) */
                                        case '!>*<': {
                                            const cval: any[] = val;
                                            let miniRes: boolean[] = [];

                                            let isNestedArray = false;
                                            let dtab: any[] = [];

                                            /* Collect "tmp" and "model" */
                                            for (let d = 0; d < cval.length; d++) {
                                                const dat = cval[d];
                                                const typ = typeof dat;

                                                /* If it's an array */
                                                if (typ === 'object') {
                                                    isNestedArray = true;
                                                    for (let f = 0; f < dat.length; f++) {
                                                        const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                        const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                        dtab.push([ga, gb]);
                                                    }
                                                }

                                                /* If it's a "string" */
                                                else {
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }
                                            }

                                            /* - */
                                            const ftab: any = isNestedArray ? dtab : [dtab];
                                            for (let g = 0; g < ftab.length; g++) {
                                                const darr: any[] = ftab[g];
                                                const ta = darr[0], tb = darr[1];

                                                const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                if (fv <= tz[0] || fv >= tz[1]) miniRes.push(true);
                                                else {
                                                    miniRes.push(false);
                                                    break;
                                                }
                                            }

                                            innerResTab.push((miniRes.includes(false)) ? false : true);
                                        } break;



                                        /* check if date is quarter (trimestre) 1 (Jan-Feb-Mar) */
                                        case '=Q1': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 1 && month <= 3)) ? true : false);
                                        } break;

                                        /* check if date is quarter (trimestre) 2 (Apr-May-Jun) */
                                        case '=Q2': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 4 && month <= 6)) ? true : false);
                                        } break;

                                        /* check if date is quarter (trimestre) 3 (Jul-Aug-Sep) */
                                        case '=Q3': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 7 && month <= 9)) ? true : false);
                                        } break;

                                        /* check if date is quarter (trimestre) 3 (Oct-Nov-Dec) */
                                        case '=Q4': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 10 && month <= 12)) ? true : false);
                                        } break;



                                        /* check if date is semester 1 (Jan-Feb-Mar-Apr-May-Jun) */
                                        case '=S1': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 1 && month <= 6)) ? true : false);
                                        } break;

                                        /* check if date is semester 2 (Jul-Aug-Sep-Oct-Nov-Dec) */
                                        case '=S2': {
                                            const dt = new Date(fval);
                                            const fyr = dt.getUTCFullYear();
                                            const month: number = dt.getUTCMonth() + 1;
                                            innerResTab.push(((year === fyr) && (month >= 7 && month <= 12)) ? true : false);
                                        } break;



                                        /* - */
                                        // case 'Y->': {
                                        //     const data = new Date(fval).getUTCFullYear();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'M->': {
                                        //     const data = new Date(fval).getUTCMonth() + 1;
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'Dt->': {
                                        //     const data = new Date(fval).getUTCDate();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'Dy->': {
                                        //     const data = new Date(fval).getUTCDay();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'H->': {
                                        //     const data = new Date(fval).getHours();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'Mn->': {
                                        //     const data = new Date(fval).getMinutes();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'S->': {
                                        //     const data = new Date(fval).getSeconds();
                                        //     innerResTab.push((data === value) ? true : false);
                                        // } break;
                                        // case 'T->': {
                                        //     // const data = new Date(fval).getU();
                                        //     // innerResTab.push((data === value) ? true : false);
                                        // } break;



                                        // /* check if date is "Day" and "Night" */
                                        // case 'D??': { } break;
                                        // case 'N??': { } break;



                                        /* Custom condition */
                                        case 'custom': {
                                            /* extract func */
                                            const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                            if (!chk) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function not found`;
                                                throw new Error(mlog);
                                            }

                                            const func: any = mutation_custom_func_DATA[cusmid];
                                            let exc: boolean = false;

                                            try { exc = func({ value: fval }) }
                                            catch (e: any) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"customCondition" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                                throw new Error(mlog);
                                            };

                                            if (typeof exc !== 'boolean') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function returned a non-boolean value at "${ky}" level`;
                                                throw new Error(mlog);
                                            }

                                            innerResTab.push(exc);
                                        } break;


                                        /* - */
                                        default: {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The operator "${operator}" is not compatible with date condition`;
                                            throw new Error(mlog);
                                        };
                                    };
                                } break;


                                /* For object */
                                case 'object': {
                                    /* get real feed value */
                                    let realFeedValue = feedValue;
                                    if (path !== undefined) {
                                        const rev = resolvePathFunc({ path: path, firstKey: ky, sourceObj: feed });
                                        if (rev.status !== 'success') continue;
                                        realFeedValue = rev.data;
                                    }

                                    /* Execute "permutation" function if available */
                                    if (operator !== 'custom' && cusmid !== undefined) {
                                        /* extract func */
                                        const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                        if (!chk) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `Premutation function not found`;
                                            throw new Error(mlog);
                                        }
                                        const func = mutation_custom_func_DATA[cusmid];

                                        /* Exec func */
                                        const rftp = typeof realFeedValue;
                                        const carg = (rftp === 'object' && realFeedValue !== null) ? cloneObjFunc({ obj: realFeedValue }) : realFeedValue;
                                        let exc: any = undefined;

                                        try { exc = func({ value: carg }) }
                                        catch (e: any) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `"Permutation" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                            throw new Error(mlog);
                                        };

                                        /* TODO :: for objects, check if type is "array" or "json" for better log */
                                        const xtp: any = typeof exc;
                                        if (rftp !== xtp) {
                                            /* ERROR :: log error */
                                            mlog = mlog + `The type ("${xtp}") of the value returned by "Permutation" function at "${ky}" level, is different from the type of "${ky}" ("${rftp}")`;
                                            throw new Error(mlog);
                                        }

                                        realFeedValue = exc;
                                    }

                                    /* - */
                                    const rfval = realFeedValue;
                                    fval = realFeedValue;

                                    /* inspect and extract condition's value */
                                    if (operator !== 'custom') {
                                        /* - */
                                        let fty: any = typeof fval;
                                        if (fty === 'object') fty = getObjectTypeFunc({ object: fval });

                                        /* - */
                                        const inspect = inspectConditionValueFunc({ condType: isDate ? 'date' : condType, operator: operator, fkey: ky, ftyp: fty, value: innerCond.value, year: year, path: path, format: format, isDate: isDate });
                                        if (inspect.status !== 'success') {
                                            /* ERROR :: log error */
                                            mlog = mlog + inspect.log;
                                            throw new Error(mlog);
                                        }

                                        /* extract condition value */
                                        value = inspect.data;
                                    }

                                    /* - */
                                    const fvalType = typeof fval;
                                    const ftype = isDate ? 'date' : fvalType;

                                    /* process per operator */
                                    switch (operator) {
                                        /* All */
                                        case '===': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval === value) ? true : false);

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', ''); value = value.replaceAll(' ', '');
                                                if (casesensitive) innerResTab.push((fval === value) ? true : false);
                                                else {
                                                    const a = removeAccentFunc({ value: fval, lowerCase: true }), b = removeAccentFunc({ value: value, lowerCase: true });
                                                    innerResTab.push((a === b) ? true : false);
                                                }
                                            }

                                            /* For "boolean" */
                                            else if (ftype === 'boolean') innerResTab.push((fval === value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a date condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv === ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '!==': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval !== value) ? true : false);

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', ''); value = value.replaceAll(' ', '');
                                                if (casesensitive) innerResTab.push((fval !== value) ? true : false);
                                                else {
                                                    const a = removeAccentFunc({ value: fval, lowerCase: true }), b = removeAccentFunc({ value: value, lowerCase: true });
                                                    innerResTab.push((a !== b) ? true : false);
                                                }
                                            }

                                            /* For "boolean" */
                                            else if (ftype === 'boolean') innerResTab.push((fval !== value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv !== ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* All */
                                        case '>': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval > value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv > ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '>=': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval >= value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv >= ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '<': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval < value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv < ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '<=': {
                                            /* For "number" */
                                            if (ftype === 'number') innerResTab.push((fval <= value) ? true : false);

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const ga = extractTimestampFunc({ value: val, extractModel: true });
                                                const btm = buildDateTemplateFunc(ga.model);
                                                const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                innerResTab.push((fv <= ga.tmp) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* String only - check length */
                                        case 'L==': {
                                            if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', '');
                                                let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                                if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                                innerResTab.push((fval.length === len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'L>': {
                                            if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', '');
                                                let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                                if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                                innerResTab.push((fval.length > len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'L>=': {
                                            if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', '');
                                                let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                                if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                                innerResTab.push((fval.length >= len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'L<': {
                                            if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', '');
                                                let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                                if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                                innerResTab.push((fval.length < len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'L<=': {
                                            if (ftype === 'string') {
                                                fval = fval.replaceAll(' ', '');
                                                let vtype = typeof value, len = (vtype === 'number') ? value : value.length;
                                                if (vtype === 'string') { value = value.replaceAll(' ', ''); len = value.length }
                                                innerResTab.push((fval.length <= len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* String only - check length */
                                        case 'wL==': {
                                            if (ftype === 'string') {
                                                const fvl = getWordCountFunc({ value: fval });
                                                const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                                innerResTab.push((fvl === len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'wL>': {
                                            if (ftype === 'string') {
                                                const fvl = getWordCountFunc({ value: fval });
                                                const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                                innerResTab.push((fvl > len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'wL>=': {
                                            if (ftype === 'string') {
                                                const fvl = getWordCountFunc({ value: fval });
                                                const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                                innerResTab.push((fvl >= len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'wL<': {
                                            if (ftype === 'string') {
                                                const fvl = getWordCountFunc({ value: fval });
                                                const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                                innerResTab.push((fvl < len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* String only - check length */
                                        case 'wL<=': {
                                            if (ftype === 'string') {
                                                const fvl = getWordCountFunc({ value: fval });
                                                const vtype = typeof value, len = (vtype === 'number') ? value : getWordCountFunc({ value: value });
                                                innerResTab.push((fvl <= len) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You try to do a string condition upon "${ky}", but it's not a string. It's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /*
                                        * EDGE INCLUSION or INSIDE
                                        */

                                        /* All */
                                        case '<>': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval >= i0 && fval <= i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                /* - */
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: (string | string[])[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const ctar: string | string[] = cval[a];
                                                    let microRes = [];

                                                    /* cond 0 :: if current value is an array of strings */
                                                    if (Array.isArray(ctar)) {
                                                        for (let b = 0; b < ctar.length; b++) {
                                                            const strg = ctar[b];
                                                            let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                            fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                            if (fval.includes(sval)) { microRes.push(true); break }
                                                        }
                                                    }

                                                    /* cond 1 :: if current value is a string */
                                                    else {
                                                        let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        microRes.push((fval.includes(sval)) ? true : false);
                                                    }

                                                    /* at least one condition should match */
                                                    miniRes.push((microRes.includes(true)) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv >= tz[0] && fv <= tz[1]) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '!<>': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval < i0 || fval > i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: (string | string[])[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const ctar: string | string[] = cval[a];
                                                    let microRes = [];

                                                    /* cond 0 :: if current value is an array of strings */
                                                    if (Array.isArray(ctar)) {
                                                        for (let b = 0; b < ctar.length; b++) {
                                                            const strg = ctar[b];
                                                            let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                            fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                            if (!fval.includes(sval)) { microRes.push(true); break }
                                                        }
                                                    }

                                                    /* cond 1 :: if current value is a string */
                                                    else {
                                                        let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        microRes.push(!fval.includes(sval) ? true : false);
                                                    }

                                                    /* at least one condition should match */
                                                    miniRes.push(microRes.includes(true) ? true : false);
                                                }
                                                innerResTab.push(miniRes.includes(true) ? true : false);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv < tz[0] || fv > tz[1]) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '<*>': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval >= i0 && fval <= i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: (string | string[])[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const ctar: string | string[] = cval[a];
                                                    let microRes = [];

                                                    /* cond 0 :: if current value is an array of strings */
                                                    if (Array.isArray(ctar)) {
                                                        let picoRes = [];
                                                        for (let b = 0; b < ctar.length; b++) {
                                                            const strg = ctar[b];
                                                            let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                            fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                            picoRes.push((fval.includes(sval)) ? true : false);
                                                        }
                                                        microRes.push((picoRes.includes(false)) ? false : true); /* all should match */
                                                    }

                                                    /* cond 1 :: if current value is a string */
                                                    else {
                                                        let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        microRes.push((fval.includes(sval)) ? true : false);
                                                    }

                                                    /* all conditions should match */
                                                    miniRes.push((microRes.includes(false)) ? false : true);
                                                }
                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv >= tz[0] && fv <= tz[1]) miniRes.push(true);
                                                    else {
                                                        miniRes.push(false);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* All */
                                        case '!<*>': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval < i0 || fval > i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* For "string" */
                                            else if (ftype === 'string') {
                                                /* - */
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: (string | string[])[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const ctar: string | string[] = cval[a];
                                                    let microRes = [];

                                                    /* cond 0 :: if current value is an array of strings */
                                                    if (Array.isArray(ctar)) {
                                                        let picoRes = [];
                                                        for (let b = 0; b < ctar.length; b++) {
                                                            const strg = ctar[b];
                                                            let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                            fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                            picoRes.push(!fval.includes(sval) ? true : false);
                                                        }
                                                        microRes.push((picoRes.includes(false)) ? false : true); /* none should match */
                                                    }

                                                    /* cond 1 :: if current value is a string */
                                                    else {
                                                        let sval: string = casesensitive ? ctar : removeAccentFunc({ value: ctar, lowerCase: true });
                                                        fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                        microRes.push(!fval.includes(sval) ? true : false);
                                                    }

                                                    /* no condition should match */
                                                    miniRes.push(microRes.includes(false) ? false : true);
                                                }
                                                innerResTab.push(miniRes.includes(false) ? false : true);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv < tz[0] || fv > tz[1]) miniRes.push(true);
                                                    else {
                                                        miniRes.push(false);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* For Number, String and Date only */
                                        case '<?>': {
                                            /* For number */
                                            if (ftype === 'number') {
                                                const cval: number[] = value;
                                                innerResTab.push(cval.includes(fval) ? true : false);
                                            }

                                            /* For string */
                                            else if (ftype === 'string') {
                                                /* - */
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: string[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const strg = cval[a];
                                                    let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    miniRes.push(fval === sval ? true : false); /* at least one condition should match */
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For date */
                                            else if (ftype === 'date') {
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }

                                                /* - */
                                                for (let g = 0; g < dtab.length; g++) {
                                                    const ta = dtab[g];
                                                    const btm = buildDateTemplateFunc(ta.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });

                                                    if (fv === ta.tmp) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* For Number, String and Date only */
                                        case '!<?>': {
                                            /* For number */
                                            if (ftype === 'number') {
                                                const cval: number[] = value;
                                                innerResTab.push(!cval.includes(fval) ? true : false);
                                            }

                                            else if (ftype === 'string') {
                                                /* - */
                                                if (!casesensitive) fval = removeAccentFunc({ value: fval, lowerCase: true });

                                                /* - */
                                                const cval: string[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const strg = cval[a];
                                                    let sval: string = casesensitive ? strg : removeAccentFunc({ value: strg, lowerCase: true });
                                                    fval = fval.replaceAll(' ', ''); sval = sval.replaceAll(' ', '');
                                                    miniRes.push(fval === sval ? true : false); /* no condition shouldn't match */
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? false : true);
                                            }

                                            /* For date */
                                            else if (ftype === 'date') {
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                    dtab.push(xt);
                                                }

                                                /* - */
                                                for (let g = 0; g < dtab.length; g++) {
                                                    const ta = dtab[g];
                                                    const btm = buildDateTemplateFunc(ta.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });

                                                    if (fv !== ta.tmp) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* 
                                        * EDGE EXCLUSION or BETWEEN
                                        */

                                        /* Number and Date only */
                                        case '><': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval > i0 && fval < i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv > tz[0] && fv < tz[1]) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Number and Date only */
                                        case '!><': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval <= i0 || fval >= i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a string — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv <= tz[0] || fv >= tz[1]) {
                                                        miniRes.push(true);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(true)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Number and Date only */
                                        case '>*<': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval > i0 && fval < i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv > tz[0] && fv < tz[1]) miniRes.push(true);
                                                    else {
                                                        miniRes.push(false);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Number and Date only */
                                        case '!>*<': {
                                            /* For "number" */
                                            if (ftype === 'number') {
                                                const cval: ARRAY_TWO_NUMBER_TYPE[] = value;
                                                let miniRes = [];
                                                for (let a = 0; a < cval.length; a++) {
                                                    const carr: ARRAY_TWO_NUMBER_TYPE = cval[a];
                                                    const i0 = carr[0], i1 = carr[1];
                                                    miniRes.push((fval <= i0 || fval >= i1) ? true : false);
                                                }
                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* For "date" */
                                            else if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const cval: any[] = val;
                                                let miniRes: boolean[] = [];

                                                let isNestedArray = false;
                                                let dtab: any[] = [];

                                                /* Collect "tmp" and "model" */
                                                for (let d = 0; d < cval.length; d++) {
                                                    const dat = cval[d];
                                                    const typ = typeof dat;

                                                    /* If it's an array */
                                                    if (typ === 'object') {
                                                        isNestedArray = true;
                                                        for (let f = 0; f < dat.length; f++) {
                                                            const ga = extractTimestampFunc({ value: dat[0], extractModel: true });
                                                            const gb = extractTimestampFunc({ value: dat[1], extractModel: true });
                                                            dtab.push([ga, gb]);
                                                        }
                                                    }

                                                    /* If it's a "string" */
                                                    else {
                                                        const xt = extractTimestampFunc({ value: dat, extractModel: true });
                                                        dtab.push(xt);
                                                    }
                                                }

                                                /* - */
                                                const ftab: any = isNestedArray ? dtab : [dtab];
                                                for (let g = 0; g < ftab.length; g++) {
                                                    const darr: any[] = ftab[g];
                                                    const ta = darr[0], tb = darr[1];

                                                    const btm = buildDateTemplateFunc(ta.model, tb.model);
                                                    const fv = extractTimestampFunc({ value: rfval, template: btm });
                                                    const tz = [ta.tmp, tb.tmp].sort((a: number, b: number) => a - b);

                                                    if (fv <= tz[0] || fv >= tz[1]) miniRes.push(true);
                                                    else {
                                                        miniRes.push(false);
                                                        break;
                                                    }
                                                }

                                                innerResTab.push((miniRes.includes(false)) ? false : true);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted an "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* Date only - check quarters or trimesters of the date */
                                        case '=Q1': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 1 && month <= 3)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Date only */
                                        case '=Q2': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 4 && month <= 6)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Date only */
                                        case '=Q3': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 7 && month <= 9)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Date only */
                                        case '=Q4': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 10 && month <= 12)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* Date only - check semesters of the date */
                                        case '=S1': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 1 && month <= 6)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;

                                        /* Date only */
                                        case '=S2': {
                                            if (ftype === 'date') {
                                                /* Check type */
                                                if (!['string', 'number'].includes(fvalType)) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `You attempted a "object" condition on "${ky}", but it's neither a number nor a date — it's of type "${typeof fval}"`;
                                                    throw new Error(mlog);
                                                }

                                                /* extract timestamp from "feedValue" */
                                                fval = extractTimestampFunc({ value: realFeedValue, dateFormat: format });
                                                if (fval === -1) {
                                                    /* ERROR :: log error */
                                                    mlog = mlog + `Invalid date "${realFeedValue}" from "${ky}" - It doesn't respect any provided date format "[${_date_format_.current}]"`;
                                                    throw new Error(mlog);
                                                }

                                                /* - */
                                                const dt = new Date(fval);
                                                const fyr = dt.getUTCFullYear();
                                                const month: number = dt.getUTCMonth() + 1;
                                                innerResTab.push(((year === fyr) && (month >= 7 && month <= 12)) ? true : false);
                                            }

                                            /* ERROR :: log error */
                                            else {
                                                mlog = mlog + `You attempted a date condition on "${ky}", but it's not a date — it's of type "${typeof fval}"`;
                                                throw new Error(mlog);
                                            }
                                        } break;



                                        /* For arrays only */

                                        case '[?]': {
                                            /* Check field value type */
                                            if (!Array.isArray(fval)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "[?]" on fields of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            const flen = fval.length;
                                            value = Array.isArray(value) ? value : [value];
                                            const vlen = value.length;

                                            /* Stringify "value" object */
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            if (vho) {
                                                for (let t = 0; t < flen; t++) {
                                                    const targ = fval[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) {
                                                        fval[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            } else {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t];
                                                    if (typeof targ === 'string') {
                                                        fval[t] = targ.replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            let mtch = false;
                                            for (let l = 0; l < vlen; l++) { if (fval.includes(value[l])) { mtch = true; break } }
                                            innerResTab.push(mtch);
                                        } break;

                                        case '![?]': {
                                            /* Check field value type */
                                            if (!Array.isArray(fval)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "![?]" on fields of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            const flen = fval.length;
                                            value = Array.isArray(value) ? value : [value];
                                            const vlen = value.length;

                                            /* Stringify "value" object */
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            if (vho) {
                                                for (let t = 0; t < flen; t++) {
                                                    const targ = fval[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) {
                                                        fval[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            } else {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t];
                                                    if (typeof targ === 'string') {
                                                        fval[t] = targ.replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            let mtch = false;
                                            for (let l = 0; l < vlen; l++) { if (!fval.includes(value[l])) { mtch = true; break } }
                                            innerResTab.push(mtch);
                                        } break;

                                        case '[*]': {
                                            /* Check field value type */
                                            if (!Array.isArray(fval)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "[*]" on fields of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            /* If value is an Array */
                                            if (!Array.isArray(value)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "[*]" with a value of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            if (vho) {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) {
                                                        fval[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            } else {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t];
                                                    if (typeof targ === 'string') {
                                                        fval[t] = targ.replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            const cmp = value.every((e: any) => fval.includes(e));
                                            innerResTab.push(cmp);
                                        } break;

                                        case '![*]': {
                                            /* Check field value type */
                                            if (!Array.isArray(fval)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "![*]" on fields of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            /* If value is an Array */
                                            if (!Array.isArray(value)) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `You can only use "![*]" with a value of type "array"`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            if (vho) {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) {
                                                        fval[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            } else {
                                                for (let t = 0; t < fval.length; t++) {
                                                    const targ = fval[t];
                                                    if (typeof targ === 'string') {
                                                        fval[t] = targ.replaceAll(' ', '');
                                                        if (!casesensitive) fval[t] = removeAccentFunc({ value: fval[t], lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* - */
                                            let mth = true;
                                            for (let v = 0; v < value.length; v++) { if (fval.includes(value[v])) { mth = false; break } }
                                            innerResTab.push(mth);
                                        } break;

                                        case '[=]': {
                                            /* Stringify "fval" */
                                            let sfv = JSON.stringify(fval).replaceAll(' ', '');
                                            if (!casesensitive) sfv = removeAccentFunc({ value: sfv, lowerCase: true });

                                            /* Stringify "value" */
                                            let svl = JSON.stringify(value).replaceAll(' ', '');
                                            if (!casesensitive) svl = removeAccentFunc({ value: svl, lowerCase: true });

                                            /* compare */
                                            const cmp = (sfv === svl) ? true : false;
                                            innerResTab.push(cmp);
                                        } break;



                                        /* Object only - check keys */

                                        case '{k}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            const ld = tlv.data;
                                            const kys = Object.keys(ld);
                                            let kstr = kys.join('_').replaceAll('.', '_').replaceAll(' ', '');
                                            if (!casesensitive) kstr = removeAccentFunc({ value: kstr, lowerCase: true });

                                            value = Array.isArray(value) ? value : [value];

                                            let mth = false;
                                            for (let v = 0; v < value.length; v++) {
                                                let targ = value[v].replaceAll(' ', '');
                                                if (!casesensitive) targ = removeAccentFunc({ value: targ, lowerCase: true });
                                                if (kstr.includes(targ)) { mth = true; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        case '!{k}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            const ld = tlv.data;
                                            const kys = Object.keys(ld);
                                            let kstr = kys.join('_').replaceAll('.', '_').replaceAll(' ', '');
                                            if (!casesensitive) kstr = removeAccentFunc({ value: kstr, lowerCase: true });

                                            value = Array.isArray(value) ? value : [value];

                                            let mth = false;
                                            for (let v = 0; v < value.length; v++) {
                                                let targ = value[v].replaceAll(' ', '');
                                                if (!casesensitive) targ = removeAccentFunc({ value: targ, lowerCase: true });
                                                if (!kstr.includes(targ)) { mth = true; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        case '{k*}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            /* - */
                                            const ld = tlv.data;
                                            let kys: any = Object.keys(ld).join('.');
                                            kys = kys.replaceAll(' ', '');
                                            if (!casesensitive) kys = removeAccentFunc({ value: kys, lowerCase: true });
                                            kys = kys.split('.');

                                            /* compare */
                                            const cmp = value.every((e: any) => {
                                                let val = e.replaceAll(' ', '');
                                                if (!casesensitive) val = removeAccentFunc({ value: val, lowerCase: true });
                                                return kys.includes(val) ? true : false;
                                            });
                                            innerResTab.push(cmp);
                                        } break;

                                        case '!{k*}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            const ld = tlv.data;
                                            let kys: any = Object.keys(ld).join('.').replaceAll(' ', '')
                                            if (!casesensitive) kys = removeAccentFunc({ value: kys, lowerCase: true });
                                            kys = kys.split('.');

                                            /* - */
                                            let mth = true;
                                            for (let v = 0; v < value.length; v++) {
                                                let val = value[v].replaceAll(' ', '');
                                                if (!casesensitive) val = removeAccentFunc({ value: val, lowerCase: true });
                                                if (kys.includes(val)) { mth = false; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        /* - */

                                        case '{v}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            value = Array.isArray(value) ? value : [value];
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ);
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            const ld = tlv.data;
                                            const fdvals = Object.values(ld);
                                            if (vho) {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) fdvals[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    targ = fdvals[t];
                                                    if (!casesensitive && typeof targ === 'string') fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                }
                                            } else {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t];
                                                    if (typeof targ === 'string') {
                                                        fdvals[t] = targ.replace(' ', '');
                                                        if (!casesensitive) fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            let mth = false;
                                            for (let v = 0; v < value.length; v++) {
                                                let targ = value[v];
                                                if (typeof targ === 'string') targ = targ.replaceAll(' ', '');
                                                if (fdvals.includes(targ)) { mth = true; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        case '!{v}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            value = Array.isArray(value) ? value : [value];
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ);
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            const ld = tlv.data;
                                            const fdvals = Object.values(ld);
                                            if (vho) {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) fdvals[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    targ = fdvals[t];
                                                    if (!casesensitive && typeof targ === 'string') fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                }
                                            } else {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t];
                                                    if (typeof targ === 'string') {
                                                        fdvals[t] = targ.replace(' ', '');
                                                        if (!casesensitive) fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            let mth = false;
                                            for (let v = 0; v < value.length; v++) {
                                                let targ = value[v];
                                                if (typeof targ === 'string') targ = targ.replaceAll(' ', '');
                                                if (!fdvals.includes(targ)) { mth = true; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        case '{v*}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            value = Array.isArray(value) ? value : [value];
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            const ld = tlv.data;
                                            const fdvals = Object.values(ld);
                                            if (vho) {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) fdvals[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    targ = fdvals[t];
                                                    if (!casesensitive && typeof targ === 'string') fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                }
                                            } else {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t];
                                                    if (typeof targ === 'string') {
                                                        fdvals[t] = targ.replace(' ', '');
                                                        if (!casesensitive) fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* compare */
                                            const cmp = value.every((e: any) => fdvals.includes(e));
                                            innerResTab.push(cmp);
                                        } break;

                                        case '!{v*}': {
                                            /* top lvl */
                                            const tlv = topLevelJsonFunc({ data: fval });
                                            if (tlv.status !== 'success') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `Error while processing Json data for "${operator}" operator`;
                                                throw new Error(mlog);
                                            }

                                            /* Stringify "value" object */
                                            value = Array.isArray(value) ? value : [value];
                                            let vho = false; /* If "value" contains an object */
                                            for (let t = 0; t < value.length; t++) {
                                                const targ = value[t];
                                                if (typeof targ === 'object' && targ !== null) {
                                                    vho = true;
                                                    value[t] = JSON.stringify(targ);
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                } else if (typeof targ === 'string') {
                                                    value[t] = targ.replaceAll(' ', '');
                                                    if (!casesensitive) value[t] = removeAccentFunc({ value: value[t], lowerCase: true });
                                                }
                                            }

                                            /* Stringify "fval" objects and strings */
                                            const ld = tlv.data;
                                            const fdvals = Object.values(ld);
                                            if (vho) {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t], ttp = typeof targ;
                                                    if (['string', 'object'].includes(ttp) && targ !== null) fdvals[t] = JSON.stringify(targ).replaceAll(' ', '');
                                                    targ = fdvals[t];
                                                    if (!casesensitive && typeof targ === 'string') fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                }
                                            } else {
                                                for (let t = 0; t < fdvals.length; t++) {
                                                    let targ = fdvals[t];
                                                    if (typeof targ === 'string') {
                                                        fdvals[t] = targ.replace(' ', '');
                                                        if (!casesensitive) fdvals[t] = removeAccentFunc({ value: targ, lowerCase: true });
                                                    }
                                                }
                                            }

                                            /* - */
                                            let mth = true;
                                            for (let v = 0; v < value.length; v++) {
                                                let targ = value[v];
                                                if (typeof targ === 'string') targ = targ.replaceAll(' ', '');
                                                if (fdvals.includes(targ)) { mth = false; break }
                                            }
                                            innerResTab.push(mth);
                                        } break;

                                        /* - */

                                        case '{=}': {
                                            /* Stringify "fval" */
                                            let sfv = JSON.stringify(fval).replaceAll(' ', '');
                                            if (!casesensitive) sfv = removeAccentFunc({ value: sfv, lowerCase: true });

                                            /* Stringify "value" */
                                            let svl = JSON.stringify(value).replaceAll(' ', '');
                                            if (!casesensitive) svl = removeAccentFunc({ value: svl, lowerCase: true });

                                            /* compare */
                                            const cmp = (sfv === svl) ? true : false;
                                            innerResTab.push(cmp);
                                        } break;



                                        /* Custom condition */
                                        case 'custom': {
                                            /* extract func */
                                            const chk = hasPropertyFunc(mutation_custom_func_DATA, cusmid);
                                            if (!chk) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function not found`;
                                                throw new Error(mlog);
                                            }

                                            const func: any = mutation_custom_func_DATA[cusmid];
                                            let exc: boolean = false;

                                            try { exc = func({ value: fval }) }
                                            catch (e: any) {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"customCondition" function has crashed at "${ky}" level - Have you checked the type of "x.value" ?`;
                                                throw new Error(mlog);
                                            };

                                            if (typeof exc !== 'boolean') {
                                                /* ERROR :: log error */
                                                mlog = mlog + `"CustomCondition" function returned a non-boolean value at "${ky}" level`;
                                                throw new Error(mlog);
                                            }

                                            innerResTab.push(exc);
                                        } break;



                                        /* - */
                                        default: {
                                            /* ERROR :: log error */
                                            mlog = mlog + `Unkown operator "${operator}"`;
                                            throw new Error(mlog);
                                        };
                                    };
                                } break;


                                /* defalut */
                                default: {
                                    /* ERROR :: log error */
                                    mlog = mlog + `The condition type "${condType}" is not supported`;
                                    throw new Error(mlog);
                                };
                            };
                        }

                        /* - */
                        result = (condLink === 'OR') ? (innerResTab.includes(true) ? true : false) : (condLink === 'AND') ? (innerResTab.includes(false) ? false : true) : false;
                    }

                    /* If it's not a condition, do simple equality check */
                    else result = (fval === value) ? true : false;

                    /* - */
                    matchTab[condCount].push(result);
                } else matchTab[condCount].push(false);
            }
        }

        /* check if feed match conditions */
        let finalTab = [];
        for (let t = 0; t < matchTab.length; t++) {
            const currentMTab = matchTab[t];
            finalTab.push(currentMTab.includes(false) ? false : true);
        }
        match = finalTab.includes(true) ? true : false;

        /* return */
        return { status: 'success', log: mlog, data: match };

    } catch (e: any) { return { status: 'error', log: mlog, data: false } }
};

/** Check if feed is locked */
const isFeedLockedFunc = (x: { feedId: string, tid: string }): boolean => { return (hasPropertyFunc(locked_feed_id_DATA, x.feedId) && ((locked_feed_id_DATA[x.feedId] ?? x.tid) !== x.tid)) ? true : false };

/** Add locked feed id to transaction scoope */
const addLockedFeedToTransactionScoopeFunc = (x: { feedId: string, tid: string }) => {
    const feedId = x.feedId, tid = x.tid;
    transaction_scoope_DATA[tid]['locked_feed'][feedId] = feedId;
};

/** Unlock feeds from transaction scoope */
const unlockFeedFromTransactionScoopeFunc = (x: { tid: string }) => {
    const scoope = transaction_scoope_DATA[x.tid];
    const lockedFeeds = scoope['locked_feed'] || {};
    const feedsId: string[] = Object.keys(lockedFeeds);
    const len = feedsId.length;
    if (len > 0) for (let i = 0; i < len; i++) {
        const fid = feedsId[i];
        delete locked_feed_id_DATA[fid];
    }
};

/** Chain transaction / TODO :: check if "customMutation", "customCondition" and "permutation" are async */
const chainTransactionFunc = (x: any): any => {
    const func: string = (x.func).toLowerCase();
    let cl: any = {};
    switch (func) {
        /* For "update" */
        case 'update': {
            const dat = Array.isArray(x.data.x) ? x.data.x : [x.data.x];
            for (let d = 0; d < dat.length; d++) {
                const fld = dat[d];
                for (let key in fld) {
                    const val = fld[key], ismu = isMutationFunc({ obj: val });
                    if (!ismu) continue; /* Jump to next field if current field is not a mutation */

                    /* If the current field is a mutation */
                    const mu = fld[key]['mutation'];
                    for (let m = 0; m < mu.length; m++) {
                        const cm = mu[m];
                        if (cm.action !== 'custom') continue;

                        /* If a custom mutation function is found */
                        const cvt = typeof cm.customMutation || undefined;
                        if (cvt !== 'function') {
                            delete fld[key]['mutation'][m]['customMutation'];
                            continue;
                        }
                        const mid = generateIdFunc({ length: 6 });
                        fld[key]['mutation'][m]['cusmid'] = mid; /* "cusmid" stands for "custom mutation ID" */
                        mutation_custom_func_DATA[mid] = cm.customMutation;
                        delete fld[key]['mutation'][m]['customMutation'];
                    }
                }
            }
        } break;

        /* For "updateAll" */
        case 'updateall': {
            const fld = x.data.x;
            for (let key in fld) {
                const val = fld[key], ismu = isMutationFunc({ obj: val });
                if (!ismu) continue; /* Jump to next field if current field is not a mutation */

                /* If the current field is a mutation */
                const mu = fld[key]['mutation'];
                for (let m = 0; m < mu.length; m++) {
                    const cm = mu[m];
                    if (cm.action !== 'custom') continue;

                    /* If a custom mutation function is found */
                    const cvt = typeof cm.customMutation || undefined;
                    if (cvt !== 'function') {
                        delete fld[key]['mutation'][m]['customMutation'];
                        continue;
                    }
                    const mid = generateIdFunc({ length: 6 });
                    fld[key]['mutation'][m]['cusmid'] = mid; /* "cusmid" stands for "custom mutation ID" */
                    mutation_custom_func_DATA[mid] = cm.customMutation;
                    delete fld[key]['mutation'][m]['customMutation'];
                }
            }
        } break;

        /* For "where" */
        case 'where': {
            const fld = x.data.x;
            for (let key in fld) {
                const val = fld[key], iscond = isConditionFunc({ obj: val });
                if (!iscond) continue; /* Jump to next field if current field is not a condition */

                /* If the current field is a condition */
                const premu = fld[key]['condition'];
                for (let m = 0; m < premu.length; m++) {
                    const cm = premu[m];
                    const oper = cm.operator;

                    /* check for "customCondition" func */
                    if (oper === 'custom') {
                        const cuv = cm.customCondition;
                        if (typeof cuv !== 'function') {
                            delete fld[key]['condition'][m]['customCondition'];
                            continue;
                        }

                        /* If "customCondition" function is found */
                        const mid = generateIdFunc({ length: 6 });
                        fld[key]['condition'][m]['cusmid'] = mid; /* "cusmid" stands for "custom mutation ID" */
                        mutation_custom_func_DATA[mid] = cuv;
                        delete fld[key]['condition'][m]['customCondition'];
                    }

                    /* Check for "permutation" func */
                    else {
                        const perm = cm.permutation;
                        if (typeof perm !== 'function') {
                            delete fld[key]['condition'][m]['permutation'];
                            continue;
                        }

                        /* If a "permutation" function is found */
                        const mid = generateIdFunc({ length: 6 });
                        fld[key]['condition'][m]['cusmid'] = mid; /* "cusmid" stands for "custom mutation ID" */
                        mutation_custom_func_DATA[mid] = perm;
                        delete fld[key]['condition'][m]['permutation'];
                    }
                }
            }
        } break;

        /* - */
        default: { };
    };

    /* - */
    cl = cloneObjFunc({ obj: x })
    return cl;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Store feeds on disk */

/** Fs store */
const storeFeedFsFunc = async (x: { type: 'folder' | 'file', data: any }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        if (Runtime.current === undefined) throw new Error(`"runtime" is undefined`);
        const type = x.type, data = (x.data !== undefined) ? x.data : [];
        const emptyContent = new Uint8Array();

        /* Folder */
        if (type === 'folder') {
            const fdata: FS_X_FOLDER_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let f = 0; f < fdata.length; f++) {
                        const ct = fdata[f];
                        const cpath = ct.path, files = (ct.files !== undefined) ? Array.isArray(ct.files) ? ct.files : [ct.files] : [];

                        /* create folder */
                        await fs_API.current.mkdir(cpath, { recursive: true });

                        /* create files if available */
                        if (files.length > 0) for (let g = 0; g < files.length; g++) {
                            const cfl = files[g], name = cfl.name;
                            await fs_API.current.writeFile(`${cpath}/${name}`, emptyContent); /* write file */
                        }
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let f = 0; f < fdata.length; f++) {
                        const ct = fdata[f];
                        const cpath = ct.path, files = (ct.files !== undefined) ? Array.isArray(ct.files) ? ct.files : [ct.files] : [];

                        /* create folder */
                        await fs_node_API.current.mkdir(cpath, { recursive: true });

                        /* create files if available */
                        if (files.length > 0) for (let g = 0; g < files.length; g++) {
                            const cfl = files[g], name = cfl.name;
                            await fs_node_API.current.writeFile(`${cpath}/${name}`, emptyContent); /* write file */
                        }
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */
                } break;

                /* For "React-native" */
                case 'React_native': { } break;

                /* - */
                default: { };
            };
        }
        /* File */
        else if (type === 'file') {
            const fdata: FS_X_FILE_ARG_TYPE[] = Array.isArray(data) ? data : [data];
            switch (Runtime.current) {
                /* For "Deno" */
                case 'Deno': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Deno" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a], path = ct.path;
                        await fs_API.current.writeFile(path, emptyContent); /* write file */
                    }
                } break;

                /* For "Node" */
                case 'Node': {
                    if (fs_node_API.current === undefined) throw new Error(`Fs package for "Node" not found`); /* Check fs api */
                    if (fdata.length > 0) for (let a = 0; a < fdata.length; a++) {
                        const ct = fdata[a], path = ct.path;
                        await fs_node_API.current.writeFile(path, emptyContent); /* write file */
                    }
                } break;

                /* For "Bun" */
                case 'Bun': {
                    if (fs_API.current === undefined) throw new Error(`Fs API for "Bun" not found`); /* Check fs api */

                    /* - */
                } break;

                /* For "React-native" */
                case 'React_native': { } break;

                /* - */
                default: { };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Build storage map */
const buildMapFunc = async (x: { data: JSON_BASIC_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const data = x.data;
        const mk = data[initConfig.config.mainKey];

        const map: JSON_BASIC_TYPE = {};
        const mapStorage: JSON_BASIC_TYPE = {};
        const feedStorage: JSON_BASIC_TYPE = {};

        mapStorage[mk] = [];
        feedStorage[mk] = [];

        /* build data storage */
        for (let key in data) {
            const kdat = data[key];
            const folderId = generateIdFunc({ length: 6 });
            const fdat: string = JSON.stringify(kdat);

            /* encrypt data */
            const ciph = await web_cipherFunc({ data: fdat });
            if (ciph.status !== 'success') throw new Error(ciph.data);
            const edat: string = ciph.data; /* encrypted data */

            /* build map */
            map[key] = folderId;

            /* - */
            const fdlen = edat.length, fcount = Math.ceil(fdlen / _max_fnss_length);
            let cursor = 0, files = [];
            for (let n = 0; n < fcount; n++) {
                if (cursor >= fdlen) continue; /* Quit loop if all string has been processed */
                const val = edat.slice(cursor, (cursor + _max_fnss_length));
                files.push({ name: `${n}_${val}`, content: '' });
                cursor += _max_fnss_length;
            }
            feedStorage[mk].push({ path: `${fs_storage_path.current}/.x/${mk}/${folderId}`, files: files })
        }

        /* build map storage */
        const longmap = JSON.stringify(map);

        /* encrypt map */
        const secure = await web_cipherFunc({ data: longmap });
        if (secure.status !== 'success') throw new Error(secure.data);

        /* - */
        const elm = secure.data; /* encrypted map */
        const mdlen = elm.length, mcount = Math.ceil(mdlen / _max_fnss_length);
        const suf = generateIdFunc({ length: 6 }), suffix = suf.slice(0, 6); /* The suffix allow to identify the differents part of the same map, in order to avoid confusion if ever data are duplicated inside a map folder */
        let index = 0;
        for (let n = 0; n < mcount; n++) {
            if (index >= mdlen) continue; /* Quit loop if all string has been processed */
            const val = elm.slice(index, (index + _max_fnss_length));
            mapStorage[mk].push({ name: `${n}_${val}_${suffix}`, content: '' });
            index += _max_fnss_length;
        }

        /* set data */
        res.data = { mk: mk, map: map, mapStorage: mapStorage, feedStorage: feedStorage };

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Decomposer */
const decomposerFunc = (x: { data: JSON_BASIC_TYPE, ktab?: string[], collector: JSON_BASIC_TYPE }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const data = x.data;
        for (let key in data) {
            const kdat = data[key], ktab: string[] = x.ktab ? [...x.ktab] : [];
            const dtyp = getObjectTypeFunc({ object: kdat });
            if (dtyp === 'json') {
                ktab.push(key);
                decomposerFunc({ data: kdat, ktab: ktab, collector: x.collector });
            } else {
                ktab.push(key);
                const fk = ktab.join('.');
                x.collector[fk] = data[key];
            }
        }

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Decompose Feed */
const decomposeFeedFunc = async (x: { feed: JSON_BASIC_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const feed = x.feed;

        /* - */
        let collector: JSON_BASIC_TYPE = {}; /* collect decomposed json */
        let ktab: string[] = [];
        const decomp = decomposerFunc({ data: feed, ktab: ktab, collector: collector });
        if (decomp.status !== 'success') throw new Error(decomp.log);

        /* - */
        const bmp = await buildMapFunc({ data: collector });
        if (bmp.status !== 'success') throw new Error(bmp.log);

        /* set res data */
        res.data = bmp.data;

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/** Store feed on disk */
const storeFeedOnDiskFunc = async (x: { tree: string, branch: string, feed: JSON_BASIC_TYPE | JSON_BASIC_TYPE[] }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        const funcTab: Function[] = [];
        const feedData = Array.isArray(x.feed) ? x.feed : [x.feed];
        if (feedData.length > 0) for (let f = 0; f < feedData.length; f++) {
            const cf = feedData[f], fid = cf[initConfig.config.mainKey]

            /* - */
            const decomp = await decomposeFeedFunc({ feed: cf });
            if (decomp.status !== 'success') {
                res.log = res.log + `Failed to decompose feed with id "${fid}" \n`;
                continue;
            }

            /* store map on disk */
            const mapFunc = async () => {
                try { const str = await storeFeedFsFunc({ type: 'folder', data: { path: `${fs_storage_path.current}/.y/${fid}`, files: decomp.data.mapStorage[fid] } }); if (str.status !== 'success') throw new Error(str.log) }
                catch (e: any) { res.log = res.log + e.message + `\n` }
            };
            funcTab.push(mapFunc);

            /* store feed on disk */
            const feedFunc = async () => {
                try { const str = await storeFeedFsFunc({ type: 'folder', data: decomp.data.feedStorage[fid] }); if (str.status !== 'success') throw new Error(str.log) }
                catch (e: any) { res.log = res.log + e.message + `\n` }
            };
            funcTab.push(feedFunc);
        }

        /* run promises */
        await Promise.allSettled(funcTab.map((fn) => fn()));

    } catch (e: any) { res.status = 'error'; res.log = res.log + e.message };
    return res;
};

/** Update feed on disk */
const upddateFeedOnDiskFunc = async (x: {}) => { };

/** Get feed from disk */
const extractFeedFromDiskFunc = async (x: {}) => { };

/** Delete feed from disk */
const deleteFeedFromDiskFunc = async (x: {}) => { };

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Process queries in memory */

/** step 0 */
const checkChainValidityFunc = (x: { tid: string, fullchain: CHAIN_TYPE }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };

    const fchain = x.fullchain, tid = x.tid, treeName = transaction_scoope_DATA[tid].treeName;
    const currentNode: { current: LOG_TYPE } = { current: 'unknown' };
    const mnk = initConfig.config.mainKey;
    let mlog = '';
    let joinIdTab: any[] = [];

    try {
        const fcl = fchain.length;
        let currentJoinId: string | undefined = undefined;

        /* check each node */
        for (let i = 0; i < fcl; i++) {
            const target = fchain[i], func = target.func, data = target.data;
            switch (func) {
                case 'onTree': {
                    currentNode.current = 'onTree'; /* Set current node */
                    const treeName = data.x, options = data.options || {};

                    /* check if tree name is alphanumeric */
                    if (!isAlphanumericFunc({ value: treeName, acceptSpecial: true })) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: currentNode.current, value: 'Tree name should be alphanumeric', transactionId: tid, skipCommit: true });
                        throw new Error(mlog);
                    }

                    /* check tree name length */
                    if (treeName.length > _max_tree_name_length_) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: currentNode.current, value: `Tree name length, should never be more than ${_max_tree_name_length_}`, transactionId: tid, skipCommit: true });
                        throw new Error(mlog);
                    }

                    /* check options type */
                    const check0 = [
                        hasPropertyFunc(options, 'transactionId') ? (typeof options.transactionId === 'string' ? true : false) : true
                    ];
                    if (check0.includes(false)) { /* if error found */
                        for (let k = 0; k < check0.length; k++) {
                            if (check0[k] === false) mlog = mlog + setLogFunc(
                                (k === 0) ? { treeName: treeName, status: '-', type: 'onTree', value: `"TransactionId" option should be a string`, transactionId: tid } :
                                    { treeName: treeName, status: '-', type: 'onTree', value: 'Unknown error', transactionId: tid }
                            );
                        }
                        throw new Error(mlog);
                    }
                } break;

                case 'set': {
                    currentNode.current = 'set';/* Set current node */
                    const arg = data.x;
                    const mk = initConfig.config.mainKey;

                    /* check arg type */
                    const objType: any = getObjectTypeFunc({ object: arg });
                    if (!['json', 'array'].includes(objType)) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'set', value: '"set" only accept a json object or an array of json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* - */
                    const tab = (objType === 'array') ? arg : [arg];
                    let minilog = '';

                    /* check each json object */
                    for (let k = 0; k < tab.length; k++) {
                        const obj = tab[k];
                        minilog = minilog + checkJsonFeedFunc({ json: obj, loopIndex: k, sourceFunc: 'set' }).log;
                        if (k === (tab.length - 1) && minilog.length > 0) minilog = minilog + '\n';
                    }

                    /* set logs */
                    if (minilog.length > 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'set', value: mlog, transactionId: tid });
                        throw new Error(mlog);
                    }

                } break;

                case 'update': {
                    currentNode.current = 'update';/* Set current node */
                    const arg = data.x;

                    /* check arg type */
                    const objType: any = getObjectTypeFunc({ object: arg });
                    if (!['json', 'array'].includes(objType)) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'update', value: '"update" only accept a json object or an array of json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check if arg isn't empty */
                    if (Object.keys(arg).length === 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'update', value: '"update" receive an empty json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* - */
                    const tab = (objType === 'array') ? arg : [arg];
                    let minilog = '';

                    /* check each json object */
                    for (let k = 0; k < tab.length; k++) {
                        const feed = tab[k];
                        minilog = minilog + checkJsonFeedFunc({ json: feed, loopIndex: k, sourceFunc: 'update' }).log;
                        if (k === (tab.length - 1) && minilog.length > 0) minilog = minilog + '\n';
                    }

                    /* set logs */
                    if (minilog.length > 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'update', value: minilog, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'updateAll': {
                    currentNode.current = 'updateAll'; /* Set current node */
                    const arg = data.x;

                    /* check json object */
                    const objType = getObjectTypeFunc({ object: arg });
                    if (objType !== 'json') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: '"updateAll" only accept one json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check if arg isn't empty */
                    if (Object.keys(arg).length === 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: '"updateAll" receive an empty json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* - */
                    const tab = [arg];
                    let minilog = '';

                    /* check json object */
                    for (let k = 0; k < tab.length; k++) {
                        const obj = tab[k];

                        /* check if "mainKey" is specified for updateAll and return an error if true */
                        const cmk = hasPropertyFunc(obj, mnk);
                        if (cmk) {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: `You can't modify the "mainKey" (${mnk}) - It's not allowed`, transactionId: tid });
                            throw new Error(mlog);
                        }

                        /* - */
                        minilog = minilog + checkJsonFeedFunc({ json: obj, loopIndex: k, sourceFunc: 'updateAll', ignoreMk: true }).log;
                        if (k === (tab.length - 1) && minilog.length > 0) minilog = minilog + '\n';
                    }

                    /* set logs */
                    if (minilog.length > 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: minilog, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'get': {
                    currentNode.current = 'get'; /* Set current node */
                    const arg = data.x;

                    /* check arg type */
                    if (typeof arg === 'string') {
                        const checkAlph = (arg === '*') ? true : isAlphanumericFunc({ value: arg, acceptSpecial: true });
                        if (!checkAlph) {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `"${arg}" is not alphanumeric`, transactionId: tid });
                            throw new Error(mlog);
                        }

                    } else if (Array.isArray(arg)) {
                        /* check if array is not empty */
                        if (arg.length === 0) {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: 'You set an empty array for "get"', transactionId: tid });
                            throw new Error(mlog);
                        }

                        /* check for non-string value inside the array */
                        for (let j = 0; j < arg.length; j++) if (typeof arg[j] !== 'string') {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `"get" only accept a string or an array of strings`, transactionId: tid });
                            throw new Error(mlog);
                        }

                    } else {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `"get" only accept a string or an array of strings`, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'delete': {
                    currentNode.current = 'delete'; /* Set current node */
                    const argX = data.x;
                    const argY = data.y;

                    /* check argX type */
                    if (!['field', 'feed', 'branch'].includes(argX)) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `The first argument of "delete" should be "field", "feed" or "branch"`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* Prevent "mainKey" deletion during a field deletion */
                    if (argX === 'field' && argY !== undefined) {
                        /* - */
                        if (typeof argY === 'string' && argY === mnk) {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `You can't delete the "mainKey" ("${mnk}") - It's not allowed`, transactionId: tid });
                            throw new Error(mlog);

                        } else if (Array.isArray(argY)) {
                            for (let a = 0; a < argY.length; a++) {
                                const targ = argY[a];

                                /* check if the "mainKey" is contained inside the array */
                                if (targ === mnk) {
                                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `You can't delete the "mainKey" ("${mnk}") - It's not allowed`, transactionId: tid });
                                    throw new Error(mlog);
                                }

                                /* check type of field's name */
                                if (typeof targ !== 'string') {
                                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `The field name "${targ}" is not a string`, transactionId: tid });
                                    throw new Error(mlog);
                                }
                            }
                        }
                    }

                    /* check type of feed's ID */
                    if (argX === 'feed' && Array.isArray(argY)) for (let a = 0; a < argY.length; a++) {
                        const targ = argY[a];
                        if (typeof targ !== 'string') {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `The feed ID "${targ}" is not a string`, transactionId: tid });
                            throw new Error(mlog);
                        }
                    }

                } break;

                case 'onBranch': {
                    currentNode.current = 'onBranch'; /* Set current node */
                    /* check if branch name is alphanumeric */
                    const bname = data.x;
                    if (!isAlphanumericFunc({ value: bname, acceptSpecial: true })) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'onBranch', value: `Branch name "${bname}" is not alphanumeric`, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'fromBranch': {
                    currentNode.current = 'fromBranch'; /* Set current node */
                    /* check if branch name is alphanumeric */
                    const bname = data.x;
                    if (!isAlphanumericFunc({ value: bname, acceptSpecial: true })) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'onBranch', value: `Branch name "${bname}" is not alphanumeric`, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'where': {
                    currentNode.current = 'where'; /* Set current node */
                    const arg = data.x;

                    /* check arg type */
                    const objType = getObjectTypeFunc({ object: arg });
                    if (objType !== 'json') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'where', value: `"where" accept only one json object`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check if arg isn't empty */
                    if (Object.keys(arg).length === 0) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: '"where" receive an empty json object', transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* ensure that where arg is a json object */
                    const wtyp = getObjectTypeFunc({ object: arg });
                    if (wtyp !== 'json') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'where', value: `"where" accept only one json object`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check there's no mutation inside where arg */
                    for (let key in arg) {
                        const val = arg[key];
                        const ismu = isMutationFunc({ obj: val });
                        if (ismu) {
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'where', value: `You're using a mutation inside "where" at "${key}" level - It's no allowed`, transactionId: tid });
                            throw new Error(mlog);
                        }
                    }
                } break;

                case 'orderBy': {
                    currentNode.current = 'orderBy'; /* Set current node */
                    const argX = data.x;
                    const argY = data.y;

                    /* check field type */
                    if (typeof argX !== 'string') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'orderBy', value: `The first argument of "orderBy" should be a string`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check order */
                    if (!['ASC', 'DESC'].includes(argY)) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'orderBy', value: `The second argument of "orderBy" should be "ASC" or "DESC"`, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'limit': {
                    currentNode.current = 'limit'; /* Set current node */
                    const limit = data.x;
                    if (typeof limit !== 'number') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'limit', value: `The limit should be a number`, transactionId: tid });
                        throw new Error(mlog);
                    }
                } break;

                case 'join': {
                    currentNode.current = 'join'; /* Set current node */
                    const jid = data.x; /* join id */

                    /* check if join id exists */
                    if (jid === undefined && typeof jid !== 'string') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'join', value: `No join id found or invalid joind id - It should be of type "string"`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check if join id is equal to "0" - "0" is the default ID of the first transaction */
                    if (jid === '0') {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'join', value: `You can't use "0" as join id - It's the "default" id of the first transaction`, transactionId: tid });
                        throw new Error(mlog);
                    }


                    /* check if join id is alphanumeric */
                    if (!isAlphanumericFunc({ value: jid, acceptSpecial: true })) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'join', value: `Join's id "${jid}" is not alphanumeric`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* check if join id already exists */
                    if (joinIdTab.includes(jid)) {
                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'join', value: `Join's id "${jid}" already exists`, transactionId: tid });
                        throw new Error(mlog);
                    }

                    /* cached join's id */
                    joinIdTab.push(jid);
                } break;

                case 'end': {
                    currentNode.current = 'end'; /* Set current node */
                    /* No check needed */
                } break;

                default: {
                    currentNode.current = 'unknown'; /* Set current node */
                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'unknown', value: `unknown function "${func}"`, transactionId: tid });
                    throw new Error(mlog);
                };
            };
        }

    } catch (e: any) { res.status = 'error'; res.log = `[Initial Check] :: ${mlog}` };
    return res;
};

/** step 1 */
const splitChainFunc = (x: { fullChain: CHAIN_TYPE }): Array<CHAIN_TYPE> => {
    const fchain = x.fullChain;
    const fcl = fchain.length;

    const tab: Array<CHAIN_TYPE> = [];
    let arr: CHAIN_TYPE = [];

    for (let i = 0; i < fcl; i++) {
        const target = fchain[i], func = target.func;

        if (!['onTree', 'join', 'end'].includes(func)) {
            (fchain[i - 1].func === 'join') && arr.push(fchain[i - 1]);
            arr.push(target);

        } else if (['join', 'end'].includes(func)) { tab.push(arr); arr = [] }
    }

    return tab;
};

/** step 2 */
const processChainFunc = async (x: { tid: string, splittedChain: Array<CHAIN_TYPE> }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let plog = ''; /* process logs */
    try {
        const mk = initConfig.config.mainKey;
        const schain = x.splittedChain, tid = x.tid, treeName = transaction_scoope_DATA[tid].treeName;
        const scl = schain.length;
        const currentNode: any = { func: '', joinId: '0' }; /* store current "func" and "joinId" */
        const transactionActiveBranch: string[] = [];
        let getReqCount = -1;

        /* store clonned branch from "branch_feed_ref_DATA" */
        const clonedBranch: BRANCH_FEED_REF_DATA_TYPE = {};
        clonedBranch[treeName] = {}; /* init tree */

        /* Clone branches used inside the transaction and cache it to optimise performance - Then next transactions in the chain wont clone it again */
        const cloneBranchSubFunc = (x: { bname: string }) => {
            if (hasPropertyFunc(clonedBranch[treeName], x.bname)) return; /* Ingore cloning if the branch has already been cloned */
            const docl = cloneObjFunc({ obj: branch_feed_ref_DATA[treeName][x.bname] });
            clonedBranch[treeName][x.bname] = docl;
        }

        /* Update Cloned branch - Very important - It allow to keep feeds of cloned branches updated for others transactions inside a chain of multiple transactions */
        const updateBranchClonedSubFunc = (x: { bname: string, feeds: any }) => {
            if (!hasPropertyFunc(clonedBranch[treeName], x.bname)) clonedBranch[treeName][x.bname] = {};
            mergeObjFunc({ target: clonedBranch[treeName][x.bname], data: x.feeds });
        }

        /* returnable */
        const processedFeed: { current: JSON_BASIC_TYPE } = { current: {} };
        const retrievedFeed: { current: JSON_BASIC_TYPE } = { current: {} }; /* store "get" req result */
        const metamorphose: { current: { [fid: string]: any[] } } = { current: {} };

        const settedFeed: { current: JSON_BASIC_TYPE } = { current: {} };
        const updatedFeed: { current: JSON_BASIC_TYPE } = { current: {} };
        const deletedFeed: { current: JSON_BASIC_TYPE } = { current: {} };

        const createdBranch: { current: JSON_BASIC_TYPE } = { current: {} };
        const deletedBranch: { current: JSON_BASIC_TYPE } = { current: {} };
        const deletedTree: { current: JSON_BASIC_TYPE } = { current: {} };

        const mkToBranch: { current: JSON_BASIC_TYPE } = { current: {} };
        const mkPerBranch: { current: { [branchName: string]: { [mk: string]: string } } } = { current: {} };

        const newAddedFeedPerBranch: { current: { [bname: string]: JSON_BASIC_TYPE } } = { current: {} };
        const deletedFeedPerBranch: { current: { [bname: string]: JSON_BASIC_TYPE } } = { current: {} };

        /* Try to delete tree if it's in a "phantom tree" */
        const isTreeDeletable = hasPropertyFunc(phantom_tree_id_DATA, treeName);
        if (isTreeDeletable) {
            /* Delete tree */
            const delTree = deleteTreeFunc({ treeName: treeName });

            /* ERROR :: log error */
            plog = plog + (delTree.status === 'success') ? `The tree "${treeName}" doesn't exists or have been deleted` : `The tree "${treeName}" is a phantom tree`;
            throw new Error(plog);
        }

        /* Create tree if it doesn't exists */
        const createTree = createTreeFunc({ treeName: treeName });
        if (createTree.status !== 'success') {
            /* ERROR :: log error */
            plog = plog + createTree.log;
            throw new Error(plog);
        }

        /* Very important to init the treeName for branchs */
        createdBranch.current[treeName] = {};
        deletedBranch.current[treeName] = {};

        /* Process each individual chain */
        for (let i = 0; i < scl; i++) {
            const chain = schain[i];
            const mainTarget = chain[(scl === 1) ? 0 : (i === 0 ? 0 : 1)];
            const primaryFunc = mainTarget.func;

            /* - */
            switch (primaryFunc) {
                /* For set */
                case 'set': {
                    currentNode.func = 'set'; /* set currentNode's func */
                    let mlog = '';

                    /* extract join id if it exists */
                    const checkJoin: any[] = chain.filter((e: any) => e.func === 'join');
                    if (checkJoin.length > 0) currentNode.joindId = checkJoin[0].data.x;

                    /* Extract branch name */
                    const branchData: { x: string } = (chain.filter((e: any) => e.func === 'onBranch'))[0].data;
                    const bname = branchData.x;

                    /* Try to delete branch if it's in a "phantom branch" */
                    const isBranchDeletable = hasPropertyFunc(phantom_branch_id_DATA[treeName], bname);
                    if (isBranchDeletable) {
                        /* Delete branch */
                        const delBranch = deleteBranchFunc({ bname: bname, tname: treeName });

                        /* ERROR :: log error */
                        plog = plog + (delBranch.status === 'success') ? `The branch "${bname}" doesn't exists or have been deleted` : `The branch "${bname}" is a phantom branch`;
                        throw new Error(plog);
                    }

                    /* Create branch if it doesn't exists */
                    const branchExists = hasPropertyFunc(branch_DATA[treeName], bname);
                    if (!branchExists) {
                        branch_DATA[treeName][bname] = { feedMainKey: {}, feedCount: 0 };
                        branch_feed_ref_DATA[treeName][bname] = {};
                        active_transaction_per_branch_DATA[treeName][bname] = 0;
                        createdBranch.current[treeName][bname] = bname; /* created branch */
                    }

                    /* - */
                    const chbr = hasPropertyFunc(clonedBranch[treeName], bname);
                    const clonedFeed = chbr ? clonedBranch[treeName][bname] : cloneObjFunc({ obj: branch_feed_ref_DATA[treeName][bname] });

                    /* increment active transaction per branch */
                    if (!transactionActiveBranch.includes(bname)) {
                        transaction_scoope_DATA[tid]['transaction_per_branch'][bname] = 1;
                        active_transaction_per_branch_DATA[treeName][bname] += 1;
                        transactionActiveBranch.push(bname);
                    }

                    /* "Set" feed */
                    const fd = mainTarget.data.x;
                    const feedTab = Array.isArray(fd) ? fd : [fd];
                    for (let n = 0; n < feedTab.length; n++) {
                        const currentFeed = feedTab[n];
                        const res = { current: {} };

                        /* check if feed exists */
                        const fid = currentFeed[mk];
                        const feedExists = { current: false };
                        if (hasPropertyFunc(processedFeed.current, fid) || hasPropertyFunc(feed_DATA, fid)) feedExists.current = true;

                        /* set feed in "processedFeed" */
                        if (feedExists.current) {
                            /* check if feed belongs to another branch */
                            const feedBranch = mk_to_branch_DATA[fid];
                            if (feedBranch !== bname) {
                                /* ERROR :: log error */
                                plog = plog + setLogFunc({ treeName: treeName, status: '-', type: 'set', value: `The feed "${fid}" already belongs to another branch "${feedBranch}"`, transactionId: tid, joinId: currentNode.joinId });
                                throw new Error(plog);
                            }

                            /* - */
                            const feedClone = hasPropertyFunc(processedFeed.current, fid) ? processedFeed.current[fid] : clonedFeed[fid]; /* get feed from "processedFeed" or clone feed */
                            res.current = Object.assign(feedClone, currentFeed); /* update cloned feed */
                            /* if a feed that already exists is set again, then it's considered as an update and feed is add to feed update watcher */
                            if (hasPropertyFunc(feed_DATA, fid)) updatedFeed.current[fid] = fid;

                        } else {
                            res.current = currentFeed;
                            /* set feed to new "set" feed watcher */
                            if (hasPropertyFunc(feed_watcher_DATA, fid)) settedFeed.current[fid] = fid;
                            /* Add feed to the list of feed that will be returned as new added feeds by branch watcher */
                            if (!hasPropertyFunc(newAddedFeedPerBranch.current, bname)) newAddedFeedPerBranch.current[bname] = {};
                            newAddedFeedPerBranch.current[bname][fid] = fid;
                        }

                        /* store processed feed */
                        processedFeed.current[fid] = res.current;

                        /* set "mk" to branch */
                        mkToBranch.current[fid] = bname;

                        /* set "mk" per branch */
                        if (!hasPropertyFunc(mkPerBranch.current, bname)) mkPerBranch.current[bname] = {};
                        mkPerBranch.current[bname][fid] = fid;
                    }

                    /* skip the rest of the process if it's only "set" transaction that's used */
                    if (scl === 1) continue;

                    /* Clone branch once */
                    cloneBranchSubFunc({ bname: bname });

                    /* update "clonedBranch" - Very important */
                    updateBranchClonedSubFunc({ bname: bname, feeds: processedFeed.current });
                } break;



                /* For updqte */
                case 'update': {
                    currentNode.func = 'update'; /* set currentNode's func */

                    /* extract join id if it exists */
                    const checkJoin: any[] = chain.filter((e: any) => e.func === 'join');
                    if (checkJoin.length > 0) currentNode.joindId = checkJoin[0].data.x;

                    /* feed */
                    const feed = mainTarget.data.x;
                    const ffeed = Array.isArray(feed) ? feed : [feed];
                    const delayedFeed: { id: string, data: any }[] = [];
                    let errorFound = false;
                    let mlog = '';

                    /* process update for each feed */
                    const updateSubFunc = (x: { source: any[], runningDelayed?: boolean }) => {
                        const source = x.source, runningDelayed = x.runningDelayed ?? false;
                        for (let n = 0; n < source.length; n++) {
                            const udata = source[n];
                            const targetId = udata[mk]; /* feed id */

                            /* extract feed's branch */
                            const bname: string = mk_to_branch_DATA[targetId];

                            /* Delete "phantom" branches */
                            const isBranchDeletable = hasPropertyFunc(phantom_branch_id_DATA[treeName], bname);
                            if (isBranchDeletable) {
                                /* try branch deletion */
                                const delBranch = deleteBranchFunc({ bname: bname, tname: treeName });

                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + `${(delBranch.status === 'success') ? `The feed "${targetId}" doesn't exists or have been deleted` : `The branch "${bname}" containing the feed "${targetId}" is a phantom branch`}`;
                                break;
                            }

                            /* Delete "phantom" feeds */
                            const isFeedDeletable = hasPropertyFunc(phantom_feed_id_DATA, targetId);
                            if (isFeedDeletable) {
                                /* try feed deletion */
                                const delFeed = deleteFeedFunc({ feedId: targetId });

                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + `After join "${currentNode.joindId}" - ` + (delFeed.status === 'success') ? `The feed "${targetId}" doesn't exists or have been deleted` : `The feed "${targetId}" is a phantom feed`;
                                break;
                            }

                            /* Check if the feed is already in another transaction and delay process if true */
                            const isLocked = isFeedLockedFunc({ feedId: targetId, tid: tid });
                            if (runningDelayed && isLocked) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + `The feed "${targetId}" is locked by another running transaction`;
                                break; /* stop process if error found */

                            } else if (!runningDelayed && isLocked) { delayedFeed.push({ id: targetId, data: udata }); continue }

                            /* lock feed */
                            locked_feed_id_DATA[targetId] = tid;
                            addLockedFeedToTransactionScoopeFunc({ feedId: targetId, tid: tid }); /* add locked feed into current transaction scoope */

                            /* increment active transaction per branch and tree */
                            if (!transactionActiveBranch.includes(bname)) {
                                transaction_scoope_DATA[tid]['transaction_per_branch'][bname] = 1;
                                active_transaction_per_branch_DATA[treeName][bname] += 1;
                                transactionActiveBranch.push(bname);
                            }

                            /* Try to apply metamorphose if it exists */
                            const delf = deleteFieldFunc({ fid: targetId });
                            if (delf.status !== 'success') throw new Error(`Error while executing "deleteFieldFunc" on feed ${targetId} :: ${delf.log}`);

                            /* update feed inside transaction, when fields are deleted */
                            const hpr = hasPropertyFunc(processedFeed.current, targetId);
                            if (delf.data !== undefined && hpr) processedFeed.current[targetId] = delf.data;

                            /* get copy of original feed to update as target */
                            const target = hpr ? processedFeed.current[targetId] : cloneObjFunc({ obj: feed_DATA[targetId] });

                            /* update feed */
                            const feedUpdate = updateFeedFunc({ target: target, data: udata });
                            if (feedUpdate.status === 'error') {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + feedUpdate.log;
                                break; /* stop process if error found */
                            }

                            /* set feed id to updatable watcher list */
                            const ctex = hasPropertyFunc(feed_watcher_DATA, targetId);
                            if (ctex) updatedFeed.current[targetId] = targetId;

                            /* store processed feed */
                            processedFeed.current[targetId] = feedUpdate.data;

                            /* update "clonedBranch" - Very important */
                            updateBranchClonedSubFunc({ bname: bname, feeds: processedFeed.current });
                        }
                    };

                    /* - */
                    updateSubFunc({ source: ffeed });

                    /* Re-run delayed feeds if it exists */
                    if (delayedFeed.length > 0 && !errorFound) {
                        for (let k = 0; k < delayedFeed.length; k++) {
                            const kid = delayedFeed[k].id, kdata = delayedFeed[k].data;
                            let isLocked = isFeedLockedFunc({ feedId: kid, tid: tid });
                            if (isLocked) {
                                /* ERROR :: log error */
                                errorFound = true;
                                plog = plog + `The feed "${kid}" is locked by another running transaction`;
                                throw new Error(plog); /* stop process if error found */

                            } else {
                                updateSubFunc({ source: [kdata], runningDelayed: true });
                                if (errorFound) { plog = plog + mlog; throw new Error(mlog) } /* if error found */
                            }
                        }
                    }

                    /* if error found */
                    plog = plog + mlog;
                    if (errorFound) throw new Error(plog);
                } break;



                /* For updateAll */
                case 'updateAll': {
                    currentNode.func = 'updateAll'; /* set currentNode's func */

                    /* extract join id if it exists */
                    const checkJoin: any[] = chain.filter((e: any) => e.func === 'join');
                    if (checkJoin.length > 0) currentNode.joindId = checkJoin[0].data.x;

                    /* feed updater data */
                    const feedUpData = mainTarget.data.x;
                    const delayedFeed: { id: string, data: any }[] = [];
                    let errorFound = false;
                    let mlog = '';

                    /* start process */
                    try {
                        /* check if branch is specified */
                        const checkBranch: any[] = chain.filter((e: any) => e.func === 'onBranch');
                        if (checkBranch.length === 0 || checkBranch[0].data.x === undefined) {
                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: `You forgot to specify a branch for "updateAll"`, transactionId: tid, joinId: currentNode.joinId });
                            throw new Error(mlog);
                        }

                        /* extract branch name */
                        const branchName: string = checkBranch[0].data.x;

                        /* Clone branch once */
                        cloneBranchSubFunc({ bname: branchName });
                        const clonedFeed = clonedBranch[treeName][branchName];

                        /* Try to delete branch if it's a "phantom branch" */
                        const isBranchDeletable = hasPropertyFunc(phantom_branch_id_DATA[treeName], branchName);
                        if (isBranchDeletable) {
                            /* try branch deletion */
                            const delBranch = deleteBranchFunc({ bname: branchName, tname: treeName });

                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + (delBranch.status === 'success') ? `The branch "${branchName}" doesn't exists or have been deleted` : `The branch "${branchName}" is a phantom branch`;
                            throw new Error(mlog);
                        }

                        /* check if branch exists */
                        if (!hasPropertyFunc(branch_DATA[treeName], branchName)) {
                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: `The branch "${branchName}" specified in "updateAll" operation doesn't exist on tree "${treeName}"`, transactionId: tid, joinId: currentNode.joinId });
                            throw new Error(mlog);
                        }

                        /* increment active transaction per branch and tree */
                        if (!transactionActiveBranch.includes(branchName)) {
                            transaction_scoope_DATA[tid]['transaction_per_branch'][branchName] = 1;
                            active_transaction_per_branch_DATA[treeName][branchName] += 1;
                            transactionActiveBranch.push(branchName);
                        }

                        /* Get branch feeds id */
                        const k0 = Object.keys(branch_DATA[treeName][branchName]['feedMainKey']); /* get feed ID from "branch_DATA" */
                        const k1 = Object.keys(clonedBranch[treeName][branchName]); /* get feed ID from "clonedBranch" - It may contains new added feed during the transaction when "get" it join after a "set" */
                        const branchFeedId: string[] = [...k0, ...k1];
                        let bfLen = branchFeedId.length;

                        /* jump to next feed if current branch is empty */
                        if (bfLen === 0) continue;

                        /* check if "where" condition is specified */
                        let whereCond: any = undefined;
                        const checkWhere: any[] = chain.filter((e: any) => e.func === 'where');
                        if (checkWhere.length > 0) {
                            const cond = checkWhere[0].data.x, condKy = Object.keys(cond);
                            whereCond = condKy.length > 0 ? cond : undefined;
                        }

                        /* collect feed's copy */
                        let usedFeedId: any = {};
                        let tempFeeds: any[] = [];
                        for (let c = 0; c < bfLen; c++) {
                            const fid = branchFeedId[c]; /* Feed id */

                            /* Check and avoid duplicated feedId - Very important */
                            if (hasPropertyFunc(usedFeedId, fid)) continue;
                            usedFeedId[fid] = '';

                            /* - */
                            const hasBeenProcessed = hasPropertyFunc(processedFeed.current, fid);
                            let feedClone = (hasBeenProcessed ? processedFeed.current[fid] : clonedFeed[fid]) || undefined;

                            /* Jump to next if feed it don't exists */
                            if (feedClone === undefined) continue;

                            /* Delete phantom "feeds" */
                            const isFeedDeletable = hasPropertyFunc(phantom_feed_id_DATA, fid);
                            if (isFeedDeletable) {
                                deleteFeedFunc({ feedId: fid });
                                continue; /* Ignore phantom feed */
                            }

                            /* Delete phantom "fields" */
                            const delf = deleteFieldFunc({ fid: fid });
                            if (delf.status !== 'success') throw new Error(`Error while executing "deleteFieldFunc" on feed ${fid} :: ${delf.log}`);

                            /* update feed inside transaction, when fields are deleted - (Very Important) */
                            const chf = hasPropertyFunc(processedFeed.current, fid);
                            const chcf = hasPropertyFunc(clonedFeed, fid);
                            if (delf.data !== undefined) {
                                if (chf) processedFeed.current[fid] = delf.data;
                                else if (chcf) clonedFeed[fid] = delf.data;
                                /* update cloned feed */
                                if (chf || chcf) feedClone = delf.data;
                            };

                            /* check if current feed match conditions, if it exists */
                            if (![null, undefined].includes(whereCond)) {
                                const match = checkConditionFunc({ feed: feedClone, condition: whereCond });
                                /* If an error occur during condition checking */
                                if (match.status !== 'success') {
                                    /* ERROR :: log error */
                                    errorFound = true;
                                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: match.log, transactionId: tid, joinId: currentNode.joinId });
                                    throw new Error(mlog);
                                }

                                /* Jump to next loop if current feed doesn't match condition */
                                if (!match.data) continue;
                            }

                            /* check if the feed is already in another transaction and delay process if true */
                            const isLocked = isFeedLockedFunc({ feedId: fid, tid: tid });
                            if (isLocked) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + `The feed "${fid}" is locked by another running transaction`;
                                throw new Error(mlog); /* stop process if error found */
                            }

                            /* lock feed inside current transaction */
                            locked_feed_id_DATA[fid] = tid;
                            addLockedFeedToTransactionScoopeFunc({ feedId: fid, tid: tid });  /* add locked feed into transaction scoope */

                            /* add feed to tmp */
                            tempFeeds.push(feedClone);
                        }

                        /* Update "bfLen" */
                        bfLen = tempFeeds.length;

                        /* check if "orderBy" is speficied */
                        let orderKey: any = undefined, orderType: 'ASC' | 'DESC' = 'ASC';
                        const checkOB: any[] = chain.filter((e: any) => e.func === 'orderBy');
                        if (checkOB.length > 0) { orderKey = checkOB[0].data.x; orderType = checkOB[0].data.y }

                        /* Order feeds */
                        if (orderKey !== undefined) {
                            const isPath = orderKey.includes('.');
                            tempFeeds.sort((a: any, b: any) => {
                                let x: any = undefined, y: any = undefined;
                                let otyp = 'unknown';

                                /* - */
                                if (isPath) {
                                    const rsa = resolvePathFunc({ path: orderKey, sourceObj: a }).data, rsb = resolvePathFunc({ path: orderKey, sourceObj: b }).data;
                                    const tya = typeof rsa, tyb = typeof rsb;
                                    otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                    x = rsa; y = rsb;

                                } else {
                                    const rsa = a[orderKey], rsb = b[orderKey];
                                    const tya = typeof rsa, tyb = typeof rsb;
                                    otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                    x = rsa; y = rsb;
                                }

                                /* For "number" */
                                if (otyp === 'number') return (orderType === 'ASC') ? (x - y) : (y - x);

                                /* For "boolean" */
                                else if (otyp === 'boolean') return (orderType === 'ASC') ? (y - x) : (x - y);

                                /* For "string" */
                                else return (orderType === 'ASC') ? -1 : 1;
                            });
                        }

                        /* check if a "limit" is speficied */
                        let limit = -1;
                        const checkLimit: any[] = chain.filter((e: any) => e.func === 'limit');
                        if (checkLimit.length > 0) limit = (bfLen <= checkLimit[0].data.x) ? bfLen : checkLimit[0].data.x;

                        /* update each branch's feed */
                        const updateAllSubFunc = (x: { source: any[], runningDelayed?: boolean }) => {
                            const source = x.source, runningDelayed = x.runningDelayed ?? false;
                            let dataCount: number = 1;
                            for (let k = 0; k < source.length; k++) {
                                const cfeed = source[k];
                                const fid = cfeed[mk];

                                /* proceed to feed update */
                                const feedUpdate = updateFeedFunc({ target: cfeed, data: feedUpData });
                                // mlog = mlog + feedUpdate.log + '\n';
                                if (feedUpdate.status !== 'success') {
                                    /* ERROR :: log error */
                                    errorFound = true;
                                    mlog = mlog + feedUpdate.log;
                                    throw new Error(mlog);
                                }

                                /* set feed id to updatable watcher list */
                                const cpfid = hasPropertyFunc(feed_watcher_DATA, fid);
                                if (cpfid) updatedFeed.current[fid] = fid;

                                /* store processed feed */
                                processedFeed.current[fid] = feedUpdate.data;

                                /* stop process if limit is reached | "datacount++" should always be at the end */
                                if (limit > 0) { if (dataCount === limit) break; dataCount++ }
                            }

                            /* update "clonedBranch" - Very important */
                            updateBranchClonedSubFunc({ bname: branchName, feeds: processedFeed.current });

                        };

                        /* update all matched feeds */
                        updateAllSubFunc({ source: tempFeeds });

                        /* Re-run delayed feeds if it exists */
                        // if (delayedFeed.length > 0 && !errorFound) {
                        //     for (let k = 0; k < delayedFeed.length; k++) {
                        //         const kid = delayedFeed[k].id;
                        //         let isLocked = isFeedLockedFunc({ feedId: kid, tid: tid });
                        //         if (isLocked) {
                        //             /* ERROR :: log error */
                        //             errorFound = true;
                        //             plog = plog + `The feed "${kid}" is locked by another running transaction`;
                        //             throw new Error(mlog); /* stop process if error found */

                        //         } else {
                        //             updateAllSubFunc({ source: [kid], runningDelayed: true });
                        //             if (errorFound) { plog = plog + mlog; throw new Error(mlog) } /* if error found */
                        //         }
                        //     }
                        // }

                    } catch (e: any) { /* No operation needed here */ }

                    /* if error found */
                    plog = plog + mlog;
                    if (errorFound) throw new Error(mlog);/* ERROR :: log error */
                } break;



                /* For get */
                case 'get': {
                    currentNode.func = 'get'; /* set currentNode's func */
                    getReqCount++; /* increment get req count */

                    /* extract join id if it exists */
                    const checkJoin: any[] = chain.filter((e: any) => e.func === 'join');
                    if (checkJoin.length > 0) currentNode.joindId = checkJoin[0].data.x;

                    /* - */
                    const fld: string | string[] = mainTarget.data.x;
                    const fields: string[] | '*' = (fld === '*') ? '*' : (typeof fld === 'string') ? [fld] : fld;
                    let errorFound = false;
                    let mlog = '';

                    /* start process */
                    try {
                        /* check if there's an "*" inside fields givin as array */
                        if (Array.isArray(fields)) {
                            const hstr = fields.includes('*');
                            if (hstr) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `You can't include "*" inside the array of fields`, transactionId: tid, joinId: currentNode.joinId });
                                throw new Error(mlog);
                            }
                        }

                        /* check if branch is specified */
                        const checkBranch: any[] = chain.filter((e: any) => e.func === 'fromBranch');
                        if (checkBranch.length === 0 || checkBranch[0].data.x === undefined) {
                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `You forgot to specify a branch for "get"`, transactionId: tid, joinId: currentNode.joinId });
                            throw new Error(mlog);
                        }

                        /* extract branch name */
                        const branchName: string = checkBranch[0].data.x;

                        /* clone branch once */
                        cloneBranchSubFunc({ bname: branchName });
                        const clonedFeed = clonedBranch[treeName][branchName];

                        /* Try to delete branch if it's a "phantom branch" */
                        const isBranchDeletable = hasPropertyFunc(phantom_branch_id_DATA[treeName], branchName);
                        if (isBranchDeletable) {
                            /* try branch deletion */
                            const delBranch = deleteBranchFunc({ bname: branchName, tname: treeName });

                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + (delBranch.status === 'success') ? `The branch "${branchName}" doesn't exists or have been deleted` : `The branch "${branchName}" is a phantom branch`;
                            throw new Error(mlog);
                        }

                        /* check if branch exists */
                        if (!hasPropertyFunc(branch_DATA[treeName], branchName)) {
                            /* ERROR :: log error */
                            errorFound = true;
                            mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `The branch "${branchName}" specified in "get" operation doesn't exist on tree "${treeName}"`, transactionId: tid, joinId: currentNode.joinId });
                            throw new Error(mlog);
                        }

                        /* increment active transaction per branch */
                        if (!transactionActiveBranch.includes(branchName)) {
                            transaction_scoope_DATA[tid]['transaction_per_branch'][branchName] = 1;
                            active_transaction_per_branch_DATA[treeName][branchName] += 1;
                            transactionActiveBranch.push(branchName);
                        }

                        /* Get branch feeds id */
                        const k0 = Object.keys(branch_DATA[treeName][branchName]['feedMainKey']); /* get feed ID from "branch_DATA" */
                        const k1 = Object.keys(clonedBranch[treeName][branchName]); /* get feed ID from "clonedBranch" - It may contains new added feed during the transaction when "get" it join after a "set" */
                        const branchFeedId: string[] = [...k0, ...k1];
                        let bfLen = branchFeedId.length;

                        /* jump to next feed if current branch is empty */
                        if (bfLen === 0) continue;

                        /* collect feed's copy */
                        let usedFeedId: any = {};
                        let tempFeeds: any[] = [];
                        for (let c = 0; c < bfLen; c++) {
                            const fid = branchFeedId[c]; /* Feed id */

                            /* Check and avoid duplicated feedId - Very important */
                            if (hasPropertyFunc(usedFeedId, fid)) continue;
                            usedFeedId[fid] = '';

                            /* - */
                            const hasBeenProcessed = hasPropertyFunc(processedFeed.current, fid);
                            const target = (hasBeenProcessed ? processedFeed.current[fid] : clonedFeed[fid]) || undefined;

                            /* Jump to next if feed don't exists */
                            if (target === undefined) continue;

                            /* Try to delete feed if it's a "phantom feed" */
                            const isFeedDeletable = hasPropertyFunc(phantom_feed_id_DATA, fid);
                            if (isFeedDeletable) {
                                deleteFeedFunc({ feedId: target }); /* try feed deletion */
                                continue; /* Ignore phantom feed */
                            }

                            /* add feed to tmp */
                            tempFeeds.push(target);
                        }

                        /* Update "bfLen" */
                        bfLen = tempFeeds.length;

                        /* check if "where" condition is specified */
                        let whereCond: any = undefined;
                        const checkWhere: any[] = chain.filter((e: any) => e.func === 'where');
                        if (checkWhere.length > 0) {
                            const cond = checkWhere[0].data.x, condKy = Object.keys(cond);
                            whereCond = condKy.length > 0 ? cond : undefined;
                        }

                        /* check if "orderBy" is speficied */
                        let orderKey: any = undefined, orderType: 'ASC' | 'DESC' = 'ASC';
                        const checkOB: any[] = chain.filter((e: any) => e.func === 'orderBy');
                        if (checkOB.length > 0) { orderKey = checkOB[0].data.x; orderType = checkOB[0].data.y }

                        /* Order feeds */
                        if (orderKey !== undefined) {
                            const isPath = orderKey.includes('.');
                            tempFeeds.sort((a: any, b: any) => {
                                let x: any = undefined, y: any = undefined;
                                let otyp = 'unknown';

                                /* - */
                                if (isPath) {
                                    const rsa = resolvePathFunc({ path: orderKey, sourceObj: a }).data, rsb = resolvePathFunc({ path: orderKey, sourceObj: b }).data;
                                    const tya = typeof rsa, tyb = typeof rsb;
                                    otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                    x = rsa; y = rsb;

                                } else {
                                    const rsa = a[orderKey], rsb = b[orderKey];
                                    const tya = typeof rsa, tyb = typeof rsb;
                                    otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                    x = rsa; y = rsb;
                                }

                                /* For "number" */
                                if (otyp === 'number') return (orderType === 'ASC') ? (x - y) : (y - x);

                                /* For "boolean" */
                                else if (otyp === 'boolean') return (orderType === 'ASC') ? (y - x) : (x - y);

                                /* For "string" */
                                else return (orderType === 'ASC') ? -1 : 1;
                            });
                        }

                        /* check if a "limit" is speficied */
                        let limit = -1;
                        const checkLimit: any[] = chain.filter((e: any) => e.func === 'limit');
                        if (checkLimit.length > 0) limit = (bfLen <= checkLimit[0].data.x) ? bfLen : checkLimit[0].data.x;

                        /* retrieve data */
                        let dataCount: number = 1;
                        let collectedDataTab: any[] = [];
                        if (bfLen > 0) for (let f = 0; f < bfLen; f++) {
                            /* fetch matched data */
                            let currentFeed: any = tempFeeds[f];
                            const currentfid = currentFeed[mk]
                            const collector: any = {};

                            /* Try to apply metamorphose if it exists */
                            const delf = deleteFieldFunc({ fid: currentfid });
                            if (delf.status !== 'success') throw new Error(`Error while executing "deleteFieldFunc" on feed ${currentfid} :: ${delf.log}`);
                            if (delf.data !== undefined) currentFeed = delf.data;

                            /* check if feed match condition */
                            if (![null, undefined].includes(whereCond)) {
                                const cnd = checkConditionFunc({ feed: currentFeed, condition: whereCond });

                                /* If an error occur during condition checking */
                                if (cnd.status !== 'success') {
                                    /* ERROR :: log error */
                                    errorFound = true;
                                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: cnd.log, transactionId: tid, joinId: currentNode.joinId });
                                    throw new Error(mlog);
                                }

                                /* Jump to next loop if current feed doesn't match condition */
                                if (!cnd.data) continue;
                            }

                            /* retrieve data */
                            if (fields === '*') Object.assign(collector, currentFeed);
                            else {
                                for (let g = 0; g < fields.length; g++) {
                                    const gkey = fields[g];
                                    const isPath = gkey.includes('.');
                                    /* - */
                                    if (!isPath) collector[gkey] = currentFeed[gkey];
                                    /* get data from path */
                                    else {
                                        const fk = gkey.split('.')[0]; /* first key */
                                        const rev = resolvePathFunc({ path: gkey, firstKey: fk, sourceObj: currentFeed, asJson: true });
                                        // if (rev.status !== 'success') {
                                        //     /* ERROR :: log error */
                                        //     errorFound = true;
                                        //     mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'get', value: `Invalid json path "${gkey}"`, transactionId: tid, joinId: currentNode.joinId });
                                        //     throw new Error(mlog);
                                        // }
                                        if (rev.status === 'success') mergeObjFunc({ target: collector, data: rev.data });
                                    }
                                }
                            }

                            /* collect data */
                            collectedDataTab.push(collector);

                            /* stop process if limit is reached | "datacount++" should always be at the end */
                            if (limit > 0) { if (dataCount === limit) break; dataCount++ }
                        }

                        /* retrieve feeds */
                        retrievedFeed.current[currentNode.joindId || getReqCount] = collectedDataTab;

                    } catch (e: any) { /* No operation needed here */ }

                    /* ERROR :: log error */
                    if (errorFound) {
                        plog = plog + mlog;
                        throw new Error(plog);
                    }
                } break;



                /* For delete */
                case 'delete': {
                    currentNode.func = 'delete'; /* set currentNode's func */

                    /* extract join id if it exists */
                    const checkJoin: any[] = chain.filter((e: any) => e.func === 'join');
                    if (checkJoin.length > 0) currentNode.joindId = checkJoin[0].data.x;

                    /* - */
                    const dtype: DELETE_ARG_X_TYPE = mainTarget.data.x;
                    const ddata: string[] | '*' = (mainTarget.data.y === '*') ? '*' : (typeof mainTarget.data.y === 'string') ? [mainTarget.data.y] : mainTarget.data.y || '*';
                    let errorFound = false;
                    let err = '';
                    let mlog = '';

                    /* start process */
                    try {
                        /* If deleting "field" or "feed" */
                        if (['field', 'feed'].includes(dtype)) {
                            /* check if "mk" is not included inside field to delete */
                            if (dtype === 'field' && Array.isArray(ddata) && ddata.includes(mk)) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `You cannot delete the main key "${mk}" of a feed`, transactionId: tid, joinId: currentNode.joinId });
                                throw new Error(mlog);
                            }

                            /* check if branch is specified */
                            const checkBranch: any[] = chain.filter((e: any) => e.func === 'fromBranch');
                            if (checkBranch.length === 0 || checkBranch[0].data.x === undefined) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `You forgot to specify a branch for "delete"`, transactionId: tid, joinId: currentNode.joinId });
                                throw new Error(mlog);
                            }

                            /* extract branch name */
                            const branchName: string = checkBranch[0].data.x;

                            /* check if branch exists */
                            if (!hasPropertyFunc(branch_DATA[treeName], branchName)) {
                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `The branch "${branchName}" specified in "delete" operation doesn't exist on tree "${treeName}"`, transactionId: tid, joinId: currentNode.joinId });
                                throw new Error(mlog);
                            }

                            /* Try to delete branch if it's a "phantom branch" */
                            const isBranchDeletable = hasPropertyFunc(phantom_branch_id_DATA[treeName], branchName);
                            if (isBranchDeletable) {
                                /* try branch deletion */
                                const delBranch = deleteBranchFunc({ bname: branchName, tname: treeName });

                                /* ERROR :: log error */
                                errorFound = true;
                                mlog = mlog + (delBranch.status === 'success') ? `The branch "${branchName}" doesn't exists` : `The branch "${branchName}" is a phantom branch`;
                                throw new Error(mlog);
                            }

                            /* increment active transaction per branch */
                            if (!transactionActiveBranch.includes(branchName)) {
                                transaction_scoope_DATA[tid]['transaction_per_branch'][branchName] = 1;
                                active_transaction_per_branch_DATA[treeName][branchName] += 1;
                                transactionActiveBranch.push(branchName);
                            }

                            /* Get branch feeds id */
                            const fmk = Object.keys(branch_DATA[treeName][branchName]['feedMainKey']);
                            let branchFeedIdTab: string[] = (dtype === 'feed' && Array.isArray(ddata)) ? ddata : fmk;
                            let bfLen = branchFeedIdTab.length;
                            let tempFeeds: any[] = [];

                            /*Jump to next loop if branch if empty */
                            if (bfLen === 0) continue;

                            /* check if "where" condition is specified */
                            let whereCond: any = undefined;
                            const checkWhere: any[] = chain.filter((e: any) => e.func === 'where');
                            if (checkWhere.length > 0) {
                                const cond = checkWhere[0].data.x, condKy = Object.keys(cond);
                                whereCond = (condKy.length > 0) ? cond : undefined;
                            }

                            /* check if "orderBy" is speficied */
                            let orderKey: any = undefined, orderType: 'ASC' | 'DESC' = 'ASC';
                            const checkOB: any[] = chain.filter((e: any) => e.func === 'orderBy');
                            if (checkOB.length > 0) { orderKey = checkOB[0].data.x; orderType = checkOB[0].data.y }

                            /* check if "limit" is speficied */
                            let limit = -1;
                            const checkLimit: any[] = chain.filter((e: any) => e.func === 'limit');
                            if (checkLimit.length > 0) limit = checkLimit[0].data.x;

                            /* collect feed's copy */
                            for (let c = 0; c < bfLen; c++) {
                                const fid = branchFeedIdTab[c];
                                const hasBeenProcessed = hasPropertyFunc(processedFeed.current, fid);
                                const target = (hasBeenProcessed ? processedFeed.current[fid] : feed_DATA[fid]) || undefined;
                                if (target !== undefined) tempFeeds.push(target);
                            }
                            tempFeeds = cloneObjFunc({ obj: tempFeeds });

                            /* Jump to next process if no feed found */
                            if (tempFeeds.length === 0) continue;

                            /* update "bfLen" */
                            bfLen = tempFeeds.length;

                            /* Order feeds */
                            if (orderKey !== undefined) {
                                const isPath = orderKey.includes('.');
                                tempFeeds.sort((a: any, b: any) => {
                                    let x: any = undefined, y: any = undefined;
                                    let otyp = 'unknown';

                                    /* - */
                                    if (isPath) {
                                        const rsa = resolvePathFunc({ path: orderKey, sourceObj: a }).data, rsb = resolvePathFunc({ path: orderKey, sourceObj: b }).data;
                                        const tya = typeof rsa, tyb = typeof rsb;
                                        otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                        x = rsa; y = rsb;

                                    } else {
                                        const rsa = a[orderKey], rsb = b[orderKey];
                                        const tya = typeof rsa, tyb = typeof rsb;
                                        otyp = (tya === 'number' && tya === tyb) ? 'number' : (tya === 'boolean' && tya === tyb) ? 'boolean' : 'unknown';
                                        x = rsa; y = rsb;
                                    }

                                    /* For "number" */
                                    if (otyp === 'number') return (orderType === 'ASC') ? (x - y) : (y - x);

                                    /* For "boolean" */
                                    else if (otyp === 'boolean') return (orderType === 'ASC') ? (y - x) : (x - y);

                                    /* For "string" */
                                    else return (orderType === 'ASC') ? -1 : 1;
                                });
                            }

                            /* start data deletion */
                            let dataCount: number = 1;
                            if (bfLen > 0) for (let f = 0; f < bfLen; f++) {
                                /* fetch matched data */
                                const currentFeed: any = tempFeeds[f];
                                const currentfid = currentFeed[mk];

                                /* check if feed match condition (if provided) */
                                if (![null, undefined].includes(whereCond)) {
                                    const cnd = checkConditionFunc({ feed: currentFeed, condition: whereCond });

                                    /* If an error occur during condition checking */
                                    if (cnd.status !== 'success') {
                                        /* ERROR :: log error */
                                        errorFound = true;
                                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'updateAll', value: cnd.log, transactionId: tid, joinId: currentNode.joinId });
                                        throw new Error(mlog);
                                    }

                                    /* Jump to next loop if current feed doesn't match condition */
                                    if (!cnd.data) continue;
                                }

                                /* Proceed to deletion */
                                switch (dtype) {
                                    case 'field': {
                                        const cmtm = metamorphose.current[currentfid] || undefined;
                                        if (cmtm === undefined) metamorphose.current[currentfid] = [];
                                        const mtm = metamorphose.current[currentfid] || [];
                                        const dfields = (ddata === '*') ? Object.keys(feed_DATA[currentfid]) : ddata;
                                        metamorphose.current[currentfid].push({ id: mtm.length, type: 'delete', data: dfields }); /* The id act like an index */

                                        /* Delete feed if all it fields are deleted */
                                        const fkys = Object.keys(currentFeed);
                                        let canDeleteFeed = fkys.every((k: string) => dfields.includes(k));
                                        if (ddata === '*' || canDeleteFeed) {
                                            /* Delete feed if all it fields are deleted */
                                            deletedFeed.current[currentfid] = currentfid;
                                            /* set delete feed id per branch */
                                            if (!hasPropertyFunc(deletedFeedPerBranch.current, branchName)) deletedFeedPerBranch.current[branchName] = {};
                                            deletedFeedPerBranch.current[branchName][currentfid] = currentfid;
                                        }
                                        /* if all field are not deleted, then it's considered as an update */
                                        else { if (hasPropertyFunc(feed_watcher_DATA, currentfid)) updatedFeed.current[currentfid] = currentfid }
                                    } break;

                                    case 'feed': {
                                        const checkEx = feed_DATA[currentfid] || undefined;
                                        if (checkEx !== undefined) {
                                            deletedFeed.current[currentfid] = currentfid;
                                            /* set deleted feed id per branch */
                                            if (!hasPropertyFunc(deletedFeedPerBranch.current, branchName)) deletedFeedPerBranch.current[branchName] = {};
                                            deletedFeedPerBranch.current[branchName][currentfid] = currentfid;
                                        }
                                    } break;

                                    default: {
                                        /* ERROR :: log error */
                                        errorFound = true;
                                        mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `Unkown deletion type "${dtype}"`, transactionId: tid, joinId: currentNode.joinId });
                                        throw new Error(mlog);
                                    };
                                };

                                /* stop process if limit is reached | "datacount++" should always be at the end */
                                if (limit > 0) { if (dataCount === limit) break; dataCount++ }
                            }
                        }

                        /* If deleting "branch" */
                        if (['branch'].includes(dtype)) {
                            switch (dtype) {
                                case 'branch': {
                                    /* - */
                                    let branchs = ddata;
                                    if (ddata === undefined || ddata === '*') branchs = Object.keys(branch_DATA[treeName]);

                                    /* deletion */
                                    if (branchs.length > 0) {
                                        const treeBranch = cloneObjFunc({ obj: branch_DATA[treeName] });
                                        for (let b = 0; b < branchs.length; b++) {
                                            const bname = branchs[b];
                                            const checkEx = treeBranch[bname] || undefined;
                                            if (checkEx !== undefined) {
                                                /* increment active transaction per branch */
                                                if (!transactionActiveBranch.includes(bname)) {
                                                    transaction_scoope_DATA[tid]['transaction_per_branch'][bname] = 1;
                                                    active_transaction_per_branch_DATA[treeName][bname] += 1;
                                                    transactionActiveBranch.push(bname);
                                                }

                                                /* delete the branch */
                                                deletedBranch.current[treeName][bname] = bname;

                                                /* delete every feeds on the branch */
                                                const branchFeeds = treeBranch[bname].feedMainKey;
                                                Object.assign(deletedFeed.current, branchFeeds);

                                                /* set deleted feed id per branch */
                                                if (!hasPropertyFunc(deletedFeedPerBranch.current, bname)) deletedFeedPerBranch.current[bname] = {};
                                                Object.assign(deletedFeedPerBranch.current[bname], branchFeeds);
                                            }
                                        }
                                    }
                                } break;

                                default: {
                                    /* ERROR :: log error */
                                    errorFound = true;
                                    mlog = mlog + setLogFunc({ treeName: treeName, status: '-', type: 'delete', value: `Unkown deletion type "${dtype}"`, transactionId: tid, joinId: currentNode.joinId });
                                    throw new Error(mlog);
                                };
                            };
                        }

                    } catch (e: any) { /* no action needed here */ }

                    /* if error found */
                    if (errorFound) {
                        /* ERROR :: log error */
                        plog = plog + mlog;
                        throw new Error(plog)
                    }
                } break;



                /* default */
                default: { /* TODO :: log error */ };
            };
        }

        /* return */
        return {
            status: 'success', log: plog, data: {
                processedFeed: processedFeed.current,
                retrievedFeed: retrievedFeed.current,
                metamorphose: metamorphose.current,

                settedFeed: settedFeed.current,
                updatedFeed: updatedFeed.current,
                deletedFeed: deletedFeed.current,

                createdBranch: createdBranch.current,
                deletedBranch: deletedBranch.current,
                deletedTree: deletedTree.current,

                mkToBranch: mkToBranch.current,
                mkPerBranch: mkPerBranch.current,

                newAddedFeedPerBranch: newAddedFeedPerBranch.current,
                deletedFeedPerBranch: deletedFeedPerBranch.current
            }
        };

    } catch (e: any) { return { status: 'error', log: e.message, data: undefined } }
};

/** step 3 */
/* commit metamorphose sub function */
const commitMetamorphoseSubFunc = (x: { mk: string, metamorphose: any }) => {
    const mk = x.mk, metamorphose = x.metamorphose;
    const crtmtm: any[] = metamorphose[mk] || [];
    if (crtmtm.length > 0) {
        /* check if some metamorphoses already exists for the current feed */
        const checkmtm = deleted_field_DATA[mk] || undefined;
        if (checkmtm === undefined) deleted_field_DATA[mk] = [];
        const mtmlen = (checkmtm === undefined) ? 0 : checkmtm.length;
        let newmtm: any[] = crtmtm;

        /* re-arrange new metamorphose's index */
        if (mtmlen > 0) {
            newmtm = crtmtm.sort((a: any, b: any) => a.index - b.index);
            for (let m = 0; m < newmtm.length; m++) { newmtm[m].index = mtmlen + m }
        }

        /* update metamorphose */
        deleted_field_DATA[mk].push(...newmtm);
    }
};
const commitTransactionFunc = (x: COMMIT_TRANSACTION_TYPE): FUNCTION_BASIC_RETURN_TYPE => {
    try {
        const tid = x.tid, feed = x.feed, metamorphose = x.metamorphose, deletedFeed = x.deletedFeed, deletedBranch = x.deletedBranch, deletedTree = x.deletedTree, mk = x.mk, mkToBranch = x.mkToBranch;
        const treeName = transaction_scoope_DATA[tid].treeName;
        const transPerBranch = transaction_scoope_DATA[tid]['transaction_per_branch'];
        const fkeys = Object.keys(feed);


        /* commit feeds */
        if (fkeys.length > 0) {
            for (let mk in feed) {
                /* Update feed already present in memory */
                if (hasPropertyFunc(feed_DATA, mk)) Object.assign(feed_DATA[mk], feed[mk]);
                /* Set feed directly in memory if "FNSS" is desabled */
                else if (!FNSS.enable) feed_DATA[mk] = feed[mk];

                /* commit "metamorphose" directly during feed committement */
                commitMetamorphoseSubFunc({ mk: mk, metamorphose: metamorphose });
            }

            /* Write file on disk if "FNSS" is enabled */
            if (FNSS.enable) {

            }
        }


        /* commit "metamorphose" alone when the there's no feed to commit */
        if (fkeys.length === 0) {
            const mmk = Object.keys(metamorphose);
            if (mmk.length > 0) for (let m = 0; m < mmk.length; m++) { const targ = mmk[m]; commitMetamorphoseSubFunc({ mk: targ, metamorphose: metamorphose }) }
        }


        /* commit deleted feed id */
        const dfkey = Object.keys(deletedFeed);
        if (dfkey.length > 0) Object.assign(phantom_feed_id_DATA, deletedFeed);


        /* commit deleted branch id */
        const dbkey = Object.keys(deletedBranch);
        if (dbkey.length > 0) Object.assign(phantom_branch_id_DATA, deletedBranch);


        /* commit deleted tree id */
        const dtkey = Object.keys(deletedTree);
        if (dtkey.length > 0) Object.assign(phantom_tree_id_DATA, deletedTree);


        /* commit "feed mk" and "feed ref" per branch */
        const branches = Object.keys(mk);
        if (branches.length > 0) for (let i = 0; i < branches.length; i++) {
            const currentBranchName = branches[i], branchMK = mk[currentBranchName];

            /* - */
            const bmk = Object.keys(branchMK);
            if (bmk.length > 0) for (let j = 0; j < bmk.length; j++) {
                const currentFeedId = bmk[j];
                /* set branch's name into "branch_DATA" under corresponding tree if it doesn't exists */
                if (!hasPropertyFunc(branch_DATA[treeName], currentBranchName)) branch_DATA[treeName][currentBranchName] = { feedMainKey: {}, feedCount: 0 };
                /* set branch's into "branch_feed_ref_DATA" under corresponding tree if it doesn't e */
                if (!hasPropertyFunc(branch_feed_ref_DATA[treeName], currentBranchName)) branch_feed_ref_DATA[treeName][currentBranchName] = {};
                /* set "mk" & "refs" into branch */
                if (typeof currentFeedId === 'string') {
                    branch_DATA[treeName][currentBranchName].feedMainKey[currentFeedId] = currentFeedId; /* set "mk" */
                    branch_feed_ref_DATA[treeName][currentBranchName][currentFeedId] = feed_DATA[currentFeedId]; /* set "ref" */
                }
            }

            /* update "feedCount" */
            const fcount = Object.keys(branch_DATA[treeName][currentBranchName].feedMainKey).length;
            branch_DATA[treeName][currentBranchName].feedCount = fcount;
        }


        /* commit mk to branch */
        const klen = Object.keys(mkToBranch);
        if (klen.length > 0) Object.assign(mk_to_branch_DATA, mkToBranch);


        /* decrement active transaction per branch */
        const bnameTab = Object.keys(transPerBranch);
        if (bnameTab.length > 0) for (let k = 0; k < bnameTab.length; k++) {
            const bname = bnameTab[k], val = transPerBranch[bname];
            active_transaction_per_branch_DATA[treeName][bname] -= val;
        }


        /* unlock feeds - should be the last operation */
        unlockFeedFromTransactionScoopeFunc({ tid: tid });


        /* return */
        return { status: 'success', log: 'commit succeed', data: '' };
    } catch (e: any) { return { status: 'error', log: '', data: e.message } }
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/** main step */
const processQueriesFunc = async (x: { chain: CHAIN_TYPE }): Promise<FUNCTION_BASIC_RETURN_TYPE> => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let rdata: any[] = [];

    const tid = { current: '' };
    const treen = { current: 'undefined' };
    let ffunc = '';
    let lvl = 0;

    try {
        const currentChain = x.chain;
        const fullChain = currentChain;

        /* Get first func in the chain */
        const firstFunc = currentChain[0];
        ffunc = firstFunc.func;
        switch (firstFunc.func) {
            case 'onTree': {
                const treeName = firstFunc.data.x;
                const treeOpt = firstFunc.data.options || {};
                treen.current = treeName;


                /* set transactionId */
                lvl = 1;
                const transactionId = hasPropertyFunc(treeOpt, 'transactionId') ? treeOpt.transactionId : generateIdFunc({ length: 6, noTmp: true });
                tid.current = transactionId;


                /* create transaction scoope */
                transaction_scoope_DATA[transactionId] = { treeName: treeName, treeOptions: treeOpt, locked_feed: {}, transaction_per_branch: {} };


                /* check full chain validity */
                lvl = 2;
                const checkValidity = checkChainValidityFunc({ tid: transactionId, fullchain: fullChain });
                if (checkValidity.status === 'error') { res.log = res.log + checkValidity.log; throw new Error(res.log) };


                /* split chains */
                const splittedChain = splitChainFunc({ fullChain: fullChain });


                /* process each chain */
                lvl = 3;
                const chainProcessing = await processChainFunc({ tid: transactionId, splittedChain: splittedChain });
                // res.log = res.log + chainProcessing.log + '\n';
                if (chainProcessing.status === 'error') { res.log = res.log + chainProcessing.log; throw new Error(res.log) };
                rdata = chainProcessing.data.retrievedFeed; /* - */


                /* commit transaction */
                lvl = 4;
                const commit = commitTransactionFunc({
                    tid: transactionId,
                    feed: chainProcessing.data.processedFeed,
                    metamorphose: chainProcessing.data.metamorphose,
                    deletedFeed: chainProcessing.data.deletedFeed,
                    deletedBranch: chainProcessing.data.deletedBranch,
                    deletedTree: chainProcessing.data.deletedTree,
                    mk: chainProcessing.data.mkPerBranch,
                    mkToBranch: chainProcessing.data.mkToBranch
                });
                if (commit.status === 'error') { res.log = res.log + commit.log; throw new Error(res.log) };


                /* Trigger "set" watchers for feeds */
                lvl = 5;
                const w_settedFeed: string[] = Object.keys(chainProcessing.data.settedFeed);
                if (w_settedFeed.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_settedFeed.length; w++) { const wtarg = w_settedFeed[w]; triggerFeedWatcherFunc({ target: wtarg, type: 'set' }) }
                }).catch((e: any) => { logFunc('tgg feed "set" watcher failed ::', e.message) });


                /* Trigger "update" watchers for feeds */
                lvl = 6;
                const w_updatedFeed: string[] = Object.keys(chainProcessing.data.updatedFeed);
                if (w_updatedFeed.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_updatedFeed.length; w++) { const wtarg = w_updatedFeed[w]; triggerFeedWatcherFunc({ target: wtarg, type: 'update' }) }
                }).catch((e: any) => { logFunc('tgg feed "update" watcher failed ::', e.message) });


                /* Trigger "delete" watchers for feeds */
                lvl = 7;
                const w_deletedFeed: string[] = Object.keys(chainProcessing.data.deletedFeed);
                if (w_deletedFeed.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_deletedFeed.length; w++) { const wtarg = w_deletedFeed[w]; triggerFeedWatcherFunc({ target: wtarg, type: 'delete' }) }
                }).catch((e: any) => { logFunc('tgg feed "delete" watcher failed ::', e.message) });


                /* Trigger "add" watchers for branchs */
                lvl = 8;
                const newFeedsPerBranch = chainProcessing.data.newAddedFeedPerBranch;
                const w_addedBranch: string[] = Object.keys(newFeedsPerBranch);
                if (w_addedBranch.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_addedBranch.length; w++) {
                        const cbname = w_addedBranch[w];
                        const fdata: string[] = Object.keys(newFeedsPerBranch[cbname]);
                        const cdata = cloneObjFunc({ obj: fdata });
                        if (fdata.length > 0) triggerBranchWatcherFunc({ target: cbname, tree: treeName, type: 'set', data: cdata });
                    }
                }).catch((e: any) => { logFunc('tgg branch "add" watcher failed ::', e.message) });


                /* Trigger "delete" watchers for branchs */
                lvl = 9;
                const deletedFeedsPerBranch = chainProcessing.data.deletedFeedPerBranch;
                const w_deletedFeedPerBranch: string[] = Object.keys(deletedFeedsPerBranch);
                if (w_deletedFeedPerBranch.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_deletedFeedPerBranch.length; w++) {
                        const cbname = w_deletedFeedPerBranch[w];
                        const fdata: string[] = Object.keys(deletedFeedsPerBranch[cbname]);
                        const cdata = cloneObjFunc({ obj: fdata });
                        if (fdata.length > 0) triggerBranchWatcherFunc({ target: cbname, tree: treeName, type: 'delete', data: cdata });
                    }
                }).catch((e: any) => { logFunc('tgg branch "delete" watcher failed ::', e.message) });


                /* Trigger "self_created" watchers for branchs */
                lvl = 10;
                const createdBranch = chainProcessing.data.createdBranch[treeName];
                const w_createdBranch: string[] = Object.keys(createdBranch);
                if (w_createdBranch.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_createdBranch.length; w++) {
                        const cbname = w_createdBranch[w];
                        const fdata: string[] = Object.keys(newFeedsPerBranch[cbname]);
                        const cdata = cloneObjFunc({ obj: fdata });
                        triggerBranchWatcherFunc({ target: cbname, tree: treeName, type: 'self_create', data: cdata });
                    }
                }).catch((e: any) => { logFunc('tgg branch "selef_create" watcher failed ::', e.message) });


                /* Trigger "self_deleted" watchers for branchs */
                lvl = 11;
                const deletedBranch = chainProcessing.data.deletedBranch[treeName];
                const w_deletedBranch: string[] = Object.keys(deletedBranch);
                if (w_deletedBranch.length > 0) delayFunc().then(() => {
                    for (let w = 0; w < w_deletedBranch.length; w++) {
                        const cbname = w_deletedBranch[w];
                        const fdata: string[] = Object.keys(deletedFeedsPerBranch[cbname]);
                        const cdata = cloneObjFunc({ obj: fdata });
                        triggerBranchWatcherFunc({ target: cbname, tree: treeName, type: 'self_delete', data: cdata });
                    }
                }).catch((e: any) => { logFunc('tgg branch "selef_delete" watcher failed ::', e.message) });
            } break;


            default: { /* No action needed here */ };
        };

        /* return */
        return { status: 'success', log: res.log || '', data: rdata };

    } catch (e: any) {
        /* unlock feeds */
        unlockFeedFromTransactionScoopeFunc({ tid: tid.current });
        /* return */
        return { status: 'error', log: res.log, data: undefined };
    }
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* Store */

/** Store "key: value" pair */
const storeDataFunc = (x: { data: JSON_BASIC_TYPE, varr?: (number | string)[] }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        /* check data type */
        const dtype = getObjectTypeFunc({ object: x.data });
        if (dtype !== 'json') throw new Error(`The store method only accept a json object as argumnt`);

        /* Check if list is empty */
        if (Object.keys(x.data).length === 0) throw new Error(`Empty json object`);

        /* - */
        let data = cloneObjFunc({ obj: x.data }), dataClone = cloneObjFunc({ obj: x.data });
        const varr = x.varr || undefined;
        let storeClone = cloneObjFunc({ obj: store_DATA });
        const field: { new: any, updated: any, deleted: any } = { new: {}, updated: {}, deleted: {} };

        /* check fields validity */
        const tlv = topLevelJsonFunc({ data: data }), dk = Object.keys(tlv.data);
        let coll: any = {}, hasPerc = false;
        for (let h = 0; h < dk.length; h++) {
            const ck: string = dk[h], cd = data[ck], invalid = isConditionFunc({ obj: cd });

            /* if condition found */
            if (invalid) throw new Error(`You can't store a "condition"`);

            /* detect and replace inline variables */
            if (varr !== undefined && Array.isArray(varr)) {
                const hasp = ck.includes('%');
                if (hasp) {
                    hasPerc = true;
                    const nbr = extractNumberIndexFunc({ value: ck });
                    const rg = new RegExp('%', 'g'), idx = ck.matchAll(rg);
                    idx.forEach((e: any) => {
                        const tindex = e.index, fd = nbr.filter((e) => e.index === (tindex + 1));
                        if (fd.length > 0) {
                            const val = fd[0].value;
                            const ivl = Number(val); /* change string into number */
                            const inv = varr[ivl] || undefined;

                            /* if index not found inside "varr" */
                            if (inv === undefined) throw new Error(`Can't find data at index "${ivl}" for "%${ivl}"`);

                            /* collect */
                            coll[`%${val}`] = inv;
                        }
                    });
                }
            }
        }

        /* replace indexed percentage, if provided and build json from path */
        if (hasPerc) {
            /* replace data */
            const robj = tlv.data;
            let stob = JSON.stringify(robj);
            const cok = Object.keys(coll);
            for (let u = 0; u < cok.length; u++) {
                const cky = cok[u], cvl = coll[cky];
                stob = stob.replaceAll(cky, cvl);
            }
            const pob = JSON.parse(stob);

            /* build json from path */
            let fobj = {};
            for (let ky in pob) {
                if (ky.includes('%')) throw new Error(`Invalid "%" found inside "${ky}"`);
                const cval = pob[ky], jsonf = buildJsonFromPathFunc({ path: ky, value: cval });
                mergeObjFunc({ target: fobj, data: jsonf });
            }

            /* Update "data" and "dataClone" */
            data = fobj; dataClone = fobj;
        }
        /* build json from path */
        else {
            const tldat = tlv.data;
            let nobj = {};
            for (let ky in tldat) {
                const cval = tldat[ky];
                const jsonf = buildJsonFromPathFunc({ path: ky, value: cval });
                mergeObjFunc({ target: nobj, data: jsonf });
            }

            /* Update "data" and "dataClone" */
            data = nobj; dataClone = nobj;
        }

        /* update store */
        const up = updateFeedFunc({ target: store_DATA, data: dataClone });
        if (up.status !== 'success') throw new Error(up.log);
        mergeObjFunc({ target: store_DATA, data: up.data }); /* apply store update */

        /* extract "new field", "updated field" and "deleted field" */
        const ndk = Object.keys(dataClone);
        for (let h = 0; h < ndk.length; h++) {
            const ck = ndk[h], cd = dataClone[ck], isMutation = isMutationFunc({ obj: cd });
            const state = !hasPropertyFunc(storeClone, ck) ? 'new' : (typeof cd !== 'undefined') ? 'updated' : 'deleted';
            field[state][ck] = (state === 'deleted') ? storeClone[ck] : isMutation ? store_DATA[ck] : cd;
        }

        /* Trigger store update */
        delayFunc().then(() => {
            triggerStoreWatcherFunc({ type: 'set', data: field.new });
            triggerStoreWatcherFunc({ type: 'update', data: field.updated });
            triggerStoreWatcherFunc({ type: 'delete', data: field.deleted });
        });

        /* clear any undefined data */
        delayFunc().then(() => { removeUndefinedValuesFunc({ obj: store_DATA, clone: false }) });

        /* Try to commit store to server(s) - TODO :: Put ms to 0.5 once all ws servers are ready */
        // delayFunc({ ms: 100 }).then(async () => { await ws_commitClientStoreFunc({ data: store_DATA }) });

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Session */

/** Register user session data as "key: value" pair */
const registerSessionDataFunc = (x: { data: JSON_BASIC_TYPE, varr?: (number | string)[] }): FUNCTION_BASIC_RETURN_TYPE => {
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    try {
        /* check data type */
        const dtype = getObjectTypeFunc({ object: x.data });
        if (dtype !== 'json') throw new Error(`The session method only receive a json object as argumnt`);

        /* Check if list is empty */
        if (Object.keys(x.data).length === 0) throw new Error(`Empty json object`);

        /* - */
        let data = cloneObjFunc({ obj: x.data }), dataClone = cloneObjFunc({ obj: x.data });
        const varr = x.varr || undefined;
        const sessionClone = cloneObjFunc({ obj: public_session_DATA });
        const field: { new: any, updated: any, deleted: any } = { new: {}, updated: {}, deleted: {} };
        const dky: string[] = Object.keys(data);

        /* check "id" field */
        let updateSessionId = dky.includes('id');
        if (updateSessionId) {
            const csid = sessionClone['id']; /* current session id */
            const gsid = data['id']; /* given session id */
            if (typeof gsid !== 'string' || gsid === '') throw new Error(`Invalid session id "${gsid}"`);
            /* - */
            if (gsid !== csid) res.log = `You've changed session id to "${gsid}"`; /* log that session id have been changed */
            else {
                updateSessionId = false;
                delete data['id']; /* remove session id from list to avoid an unecessary update */
            }
        }



        /* check other fields */
        const tlv = topLevelJsonFunc({ data: data }), dk = Object.keys(tlv.data);
        let coll: any = {};
        let hasPerc = false;
        for (let h = 0; h < dk.length; h++) {
            const ck: string = dk[h], cd = data[ck], invalid = isConditionFunc({ obj: cd });

            /* if condition found */
            if (invalid) throw new Error(`You can't store a "condition"`);

            /* detect and replace inline variables */
            if (varr !== undefined && Array.isArray(varr)) {
                const hasp = ck.includes('%');
                if (hasp) {
                    hasPerc = true;
                    const nbr = extractNumberIndexFunc({ value: ck });
                    const rg = new RegExp('%', 'g'), idx = ck.matchAll(rg);
                    idx.forEach((e: any) => {
                        const tindex = e.index, fd = nbr.filter((e) => e.index === (tindex + 1));
                        if (fd.length > 0) {
                            const val = fd[0].value;
                            const ivl = Number(val); /* change string into number */
                            const inv = varr[ivl] || undefined;

                            /* if index not found inside "varr" */
                            if (inv === undefined) throw new Error(`Can't find data at index "${ivl}" for "%${ivl}"`);

                            /* collect */
                            coll[`%${val}`] = inv;
                        }
                    });
                }
            }
        }

        /* replace indexed percentage, if provided */
        if (hasPerc) {
            /* replace data */
            const robj = tlv.data;
            let stob = JSON.stringify(robj);
            const cok = Object.keys(coll);
            for (let u = 0; u < cok.length; u++) {
                const cky = cok[u], cvl = coll[cky];
                stob = stob.replaceAll(cky, cvl);
            }
            const pob = JSON.parse(stob);

            /* build json from path */
            let fobj = {};
            for (let ky in pob) {
                if (ky.includes('%')) throw new Error(`Invalid "%" found inside "${ky}"`);
                const cval = pob[ky], jsonf = buildJsonFromPathFunc({ path: ky, value: cval });
                mergeObjFunc({ target: fobj, data: jsonf });
            }

            /* Update "data" and "dataClone" */
            data = fobj; dataClone = fobj;
        }
        /* build json from path */
        else {
            const tldat = tlv.data;
            let nobj = {};
            for (let ky in tldat) {
                const cval = tldat[ky];
                const jsonf = buildJsonFromPathFunc({ path: ky, value: cval });
                mergeObjFunc({ target: nobj, data: jsonf });
            }

            /* Update "data" and "dataClone" */
            data = nobj; dataClone = nobj;
        }



        /* update session */
        const up = updateFeedFunc({ target: public_session_DATA, data: dataClone });
        if (up.status !== 'success') throw new Error(up.log);
        mergeObjFunc({ target: public_session_DATA, data: up.data }); /* apply session update */

        /* set "oldSessionId" and update private session id */
        if (updateSessionId) {
            private_session_DATA['oldSessionId'] = sessionClone['id'];
            private_session_DATA['id'] = public_session_DATA['id'];
        }

        /* extract "new field", "updated field" and "deleted field" */
        for (let h = 0; h < dk.length; h++) {
            const ck = dk[h], cd = data[ck], isMutation = isMutationFunc({ obj: cd });
            const state = !hasPropertyFunc(sessionClone, ck) ? 'new' : (typeof cd !== 'undefined') ? 'updated' : 'deleted';
            field[state][ck] = (state === 'deleted') ? sessionClone[ck] : isMutation ? public_session_DATA[ck] : cd;
        }

        /* clear any undefined data */
        delayFunc().then(() => { removeUndefinedValuesFunc({ obj: public_session_DATA, clone: false }) });

        /* Try to commit user session to server(s) */
        delayFunc({ ms: 100 }).then(async () => { await ws_commitClientSessionFunc({ data: public_session_DATA }) });

    } catch (e: any) { res.status = 'error'; res.log = e.message };
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
*/

/* Return */

/** Return data sync */
const returnDataFunc = (x: { data: RETURN_ARG_TYPE, from: 'feed' | 'store' | 'session', sid?: string }): FUNCTION_BASIC_RETURN_TYPE => {
    const data = x.data, from = x.from, sid = x.sid || undefined;
    let res: FUNCTION_BASIC_RETURN_TYPE = { status: 'success', log: '', data: undefined };
    let final: any = undefined;
    try {
        const obj: any = {};
        switch (from) {
            /* For feed */
            case 'feed': {
                if (typeof sid !== 'string' || !hasPropertyFunc(feed_DATA, sid)) { res.status = 'error'; throw new Error(`Feed "${sid}" not found`); } /* check if feed exists */
                if (hasPropertyFunc(phantom_feed_id_DATA, sid)) { res.status = 'error'; throw new Error(`The feed "${sid}" is a phantom feed`); } /* check if feed is a phantom feed */

                /* Remove deletable fields */
                deleteFieldFunc({ fid: sid });

                /* clone feed */
                const feedClone: any = cloneObjFunc({ obj: feed_DATA[sid] });

                /* Fetch data */
                if (data === '*') final = feedClone;
                /* For string */
                else if (typeof data === 'string' && data !== '*') {
                    const isPath = data.includes('.');
                    if (!isPath) obj[data] = feedClone[data];
                    else {
                        const rev = resolvePathFunc({ path: data, sourceObj: feedClone, asJson: true });
                        if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                    }
                    final = obj;
                }
                /* For array */
                else if (Array.isArray(data)) {
                    for (let b = 0; b < data.length; b++) {
                        const ky = data[b], isPath = ky.includes('.');
                        if (!isPath) obj[ky] = feedClone[ky];
                        else {
                            const rev = resolvePathFunc({ path: ky, sourceObj: feedClone, asJson: true });
                            if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                        }
                    }
                    final = obj;
                }
            } break;

            /* For store */
            case 'store': {
                let fn: any = undefined;
                /* For all */
                if (data === '*') fn = store_DATA;
                /* For string */
                else if (typeof data === 'string' && data !== '*') {
                    const isPath = data.includes('.');
                    if (!isPath) obj[data] = store_DATA[data];
                    else {
                        const rev = resolvePathFunc({ path: data, sourceObj: store_DATA, asJson: true });
                        if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                    }
                    fn = obj;
                }
                /* For array */
                else if (Array.isArray(data)) {
                    for (let b = 0; b < data.length; b++) {
                        const ky = data[b], isPath = ky.includes('.');
                        if (!isPath) obj[ky] = store_DATA[ky];
                        else {
                            const rev = resolvePathFunc({ path: ky, sourceObj: store_DATA, asJson: true });
                            if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                        }
                    };
                    fn = obj
                }
                final = (fn !== undefined) ? cloneObjFunc({ obj: fn }) : fn;
            } break;

            /* For session */
            case 'session': {
                let fn: any = undefined;
                /* For all */
                if (data === '*') fn = public_session_DATA;
                /* For string */
                else if (typeof data === 'string' && data !== '*') {
                    const isPath = data.includes('.');
                    if (!isPath) obj[data] = public_session_DATA[data];
                    else {
                        const rev = resolvePathFunc({ path: data, sourceObj: public_session_DATA, asJson: true });
                        if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                    }
                    fn = obj;
                }
                /* For array */
                else if (Array.isArray(data)) {
                    for (let b = 0; b < data.length; b++) {
                        const ky = data[b], isPath = ky.includes('.');
                        if (!isPath) obj[ky] = public_session_DATA[ky];
                        else {
                            const rev = resolvePathFunc({ path: ky, sourceObj: public_session_DATA, asJson: true });
                            if (rev.status === 'success') mergeObjFunc({ target: obj, data: rev.data });
                        }
                    };
                    fn = obj
                }
                final = (fn !== undefined) ? cloneObjFunc({ obj: fn }) : fn;
            } break;

            /* - */
            default: { };
        };
        res.data = final;

    } catch (e: any) { res.log = e.message };

    /* return */
    return res;
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* --------------------------------------------- DB --------------------------------------------- */

const frockinDB: DB_TYPE = {
    init(x?: INIT_ARG_TYPE): MAIN_TYPE {
        /* init forest */
        const init = initForestFunc(x || undefined);
        let badInit = init.badInit, initLog = init.initLog;

        /* current chain */
        const currentChain: CHAIN_TYPE = [];

        /* mainChain */
        const mainChain = {
            /* chain method */
            _chain(x: any): void { const ccl = chainTransactionFunc(x); currentChain.push(ccl) },


            /* bulkOps */
            bulk(): void {
                // return { status: 'success', data: tree_DATA, log: '' };
            },


            /* store */
            store(x: JSON_BASIC_TYPE, y?: (string | number)[]): FUNCTION_BASIC_RETURN_TYPE {
                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                return storeDataFunc({ data: x, varr: y || [] });
            },


            /* store */
            session(x: JSON_BASIC_TYPE, y?: (string | number)[]): FUNCTION_BASIC_RETURN_TYPE {
                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                return registerSessionDataFunc({ data: x, varr: y || [] });
            },


            /* return data synchroniously */
            return(x: RETURN_ARG_TYPE): RETURN_RETURN_TYPE {
                const returnArg = x;
                return {
                    fromFeed(x: string): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return returnDataFunc({ data: returnArg, from: 'feed', sid: x })
                    },
                    fromStore(): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return returnDataFunc({ data: returnArg, from: 'store' });
                    },
                    fromSession(): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return returnDataFunc({ data: returnArg, from: 'session' });
                    }
                };
            },


            /* retun some functions */
            method(): METHOD_RETURN_TYPE {
                return {
                    generateId(): string {
                        return generateIdFunc();
                    },
                    hasProperty(x: any, y: string): boolean {
                        try { return hasPropertyFunc(x, y) } catch (e: any) { return false }
                    },
                    cloneObject(x: JSON_BASIC_TYPE | any[]): JSON_BASIC_TYPE | any[] {
                        try { return cloneObjFunc({ obj: x }) }
                        catch (e: any) { return (Array.isArray(x)) ? [] : {} }
                    },
                    mergeJson(x: { target: JSON_BASIC_TYPE, source: JSON_BASIC_TYPE }): JSON_BASIC_TYPE {
                        const target = cloneObjFunc({ obj: x.target }), source = cloneObjFunc({ obj: x.source });
                        const mg = mergeObjFunc({ target: target, data: source });
                        return mg;
                    },
                    // deleteJsonField(x: { target: JSON_BASIC_TYPE, path: string | (string | number)[] }): FUNCTION_BASIC_RETURN_TYPE {
                    //     const target = cloneObjFunc({ obj: x.target }), path = x.path;
                    //     const res = deleteJsonFieldFunc({ target: target, path: path });
                    //     return res;
                    // },
                    getTypeOf(x: any): string {
                        const tp = typeof x;
                        let rtyp: any = '';
                        if (tp !== 'object') rtyp = tp;
                        else rtyp = getObjectTypeFunc({ object: x });
                        return rtyp;
                    },
                    isAlphanumeric(x: string): boolean {
                        try { return /^[a-zA-Z0-9]+$/.test(x) } catch (e: any) { return false }
                    },
                    async createHash(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                        const hash = await createHashFunc(x);
                        return hash;
                    }
                };
            },


            /* select or create a tree */
            onTree(x: string, options?: { transactionId?: string }): ONTREE_RETURN_TYPE {
                mainChain._chain({ func: 'onTree', data: { x: x, options: options } });
                return { set: mainChain.set, get: mainChain.get, update: mainChain.update, updateAll: mainChain.updateAll, delete: mainChain.delete };
            },


            /* set feed */
            set(x: JSON_BASIC_TYPE | JSON_BASIC_TYPE[]): SET_RETURN_TYPE {
                mainChain._chain({ func: 'set', data: { x: x } });
                const chain = {
                    onBranch(x: string): SET_RETURN_TYPE_FOR_ONBRANCH {
                        mainChain._chain({ func: 'onBranch', data: { x: x } });
                        return { join: mainChain.join, end: mainChain.end };
                    }
                };
                return chain;
            },


            /* update feed */
            update(x: UPDATE_ARG_TYPE): UPDATE_RETURN_TYPE {
                mainChain._chain({ func: 'update', data: { x: x } });
                const chain = {
                    where(x: JSON_BASIC_TYPE): UPDATE_RETURN_TYPE_FOR_WHERE {
                        mainChain._chain({ func: 'where', data: { x: x } });
                        return { join: mainChain.join, end: mainChain.end };
                    },
                    join: mainChain.join, end: mainChain.end
                };
                return chain;
            },


            /* update all feed on a branch */
            updateAll(x: UPDATE_ALL_ARG_TYPE): UPDATE_ALL_RETURN_TYPE {
                mainChain._chain({ func: 'updateAll', data: { x: x } });
                const chain = {
                    onBranch(x: string): UPDATE_ALL_RETURN_TYPE_FOR_ONBRANCH {
                        mainChain._chain({ func: 'onBranch', data: { x: x } });
                        return {
                            orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end,
                            where: (x: JSON_BASIC_TYPE): UPDATE_ALL_RETURN_TYPE_FOR_WHERE => {
                                mainChain._chain({ func: 'where', data: { x: x } });
                                return { orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end };
                            }
                        };
                    }
                };
                return chain;
            },


            /* get feed */
            get(x: GET_ARG_TYPE): GET_RETURN_TYPE {
                mainChain._chain({ func: 'get', data: { x: x } });
                const chain = {
                    fromBranch(x: string): GET_RETURN_TYPE_FOR_ONBRANCH {
                        mainChain._chain({ func: 'fromBranch', data: { x: x } });
                        return {
                            orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end,
                            where(x: JSON_BASIC_TYPE): GET_RETURN_TYPE_FOR_WHERE {
                                mainChain._chain({ func: 'where', data: { x: x } });
                                return { orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end };
                            }
                        };
                    }
                };
                return chain;
            },


            /* delete feed */
            delete<T extends DELETE_ARG_X_TYPE>(x: T, y?: DELETE_ARG_Y_TYPE): DELETE_RETURN_TYPE<T> {
                mainChain._chain({ func: 'delete', data: { x: x, y: y } });
                /* field chain */
                const field_chain = {
                    fromBranch(x: string): DELETE_FIELD_RETURN_TYPE_FOR_FROMBRANCH {
                        mainChain._chain({ func: 'fromBranch', data: { x: x } });
                        return {
                            where(x: JSON_BASIC_TYPE): DELETE_FIELD_RETURN_TYPE_FOR_WHERE {
                                mainChain._chain({ func: 'where', data: { x: x } });
                                return { orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end };
                            },
                            orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end
                        };
                    }
                };
                /* feed chain */
                const feed_chain = {
                    fromBranch(x: string): DELETE_FEED_RETURN_TYPE_FOR_FROMBRANCH {
                        mainChain._chain({ func: 'fromBranch', data: { x: x } });
                        return {
                            where(x: JSON_BASIC_TYPE): DELETE_FEED_RETURN_TYPE_FOR_WHERE {
                                mainChain._chain({ func: 'where', data: { x: x } });
                                return { orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end };
                            },
                            orderBy: mainChain.orderBy, limit: mainChain.limit, join: mainChain.join, end: mainChain.end
                        };
                    }
                };
                /* branch chain */
                const branch_chain = { join: mainChain.join, end: mainChain.end };

                /* - */
                switch (x) {
                    case 'field': return field_chain as DELETE_RETURN_TYPE<T>;
                    case 'feed': return feed_chain as DELETE_RETURN_TYPE<T>;
                    case 'branch': return branch_chain as DELETE_RETURN_TYPE<T>;
                    default: return {} as DELETE_RETURN_TYPE<T>;
                };
            },


            /* orderBy */
            orderBy(x: ORDERBY_ARG_X_TYPE, y?: ORDERBY_ARG_Y_TYPE): ORDERBY_RETURN_TYPE {
                mainChain._chain({ func: 'orderBy', data: { x: x, y: y || 'ASC' } });
                return { limit: mainChain.limit, join: mainChain.join, end: mainChain.end };
            },


            /* limit */
            limit(x: LIMIT_ARG_TYPE): LIMIT_RETURN_TYPE {
                mainChain._chain({ func: 'limit', data: { x: x } });
                return { join: mainChain.join, end: mainChain.end };
            },


            /* join */
            join(x: string): JOIN_RETURN_TYPE {
                mainChain._chain({ func: 'join', data: { x: x } });
                return { set: mainChain.set, get: mainChain.get, update: mainChain.update, updateAll: mainChain.updateAll, delete: mainChain.delete };
            },


            /** Run transaction asynchroniously */
            async end(): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                /* if bad init */
                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: undefined };

                /* chain "end" and clone chain */
                mainChain._chain({ func: 'end', data: undefined });
                const chainClone: any = cloneObjFunc({ obj: currentChain, useLoop: true });
                currentChain.length = 0; /* clear currentChain arr */

                /* if error found */
                if (hasPropertyFunc(chainClone, 'log')) return { status: 'error', log: `[Critical error] :: Please make sure that your feeds doesn't contain "Functions", "DOM Nodes", "Class Instances" or "Circular References".\n[Additional log] :: ${chainClone.log}`, data: undefined };

                /* Process queries */
                const finalClone: CHAIN_TYPE = chainClone;
                const res = await processQueriesFunc({ chain: finalClone });
                return res;
            },


            /* mutation */
            mutation(): MUTATION_RETURN_TYPE {
                const mutation_chain: MUTATION_RETURN_TYPE = {
                    /* number mutation */
                    number(x: MUTATION_ARG_TYPE_FOR_NUMBER | MUTATION_ARG_TYPE_FOR_NUMBER[]): MUTATION_RETURN_TYPE_FOR_ANY {
                        const mutationTab: MUTATION_ARG_TYPE_FOR_NUMBER[] = Array.isArray(x) ? x : [x];
                        return { mutation: mutationTab, _$$type: 'number', _$$isMutation: true };
                    },

                    /* string mutation */
                    string(x: MUTATION_ARG_TYPE_FOR_STRING | MUTATION_ARG_TYPE_FOR_STRING[]): MUTATION_RETURN_TYPE_FOR_ANY {
                        const mutationTab: MUTATION_ARG_TYPE_FOR_STRING[] = Array.isArray(x) ? x : [x];
                        return { mutation: mutationTab, _$$type: 'string', _$$isMutation: true };
                    },

                    /* boolean mutation */
                    boolean(x: MUTATION_ARG_TYPE_FOR_BOOLEAN | MUTATION_ARG_TYPE_FOR_BOOLEAN[]): MUTATION_RETURN_TYPE_FOR_ANY {
                        const mutationTab: MUTATION_ARG_TYPE_FOR_BOOLEAN[] = Array.isArray(x) ? x : [x];
                        return { mutation: mutationTab, _$$type: 'boolean', _$$isMutation: true };
                    },

                    /* object (json | array) mutation */
                    object(x: MUTATION_ARG_TYPE_FOR_OBJECT | MUTATION_ARG_TYPE_FOR_OBJECT[]): MUTATION_RETURN_TYPE_FOR_OBJECT {
                        const mutationTab: MUTATION_ARG_TYPE_FOR_OBJECT[] = Array.isArray(x) ? x : [x];
                        return { mutation: mutationTab, _$$type: 'object', _$$isMutation: true };
                    }
                    // object<T extends MUTATION_ACTION_TYPE_FOR_OBJECT>(x: MUTATION_ARG_TYPE_FOR_OBJECT<T> | MUTATION_ARG_TYPE_FOR_OBJECT<T>[]): MUTATION_RETURN_TYPE_FOR_OBJECT<T> {
                    //     const mutationTab: MUTATION_ARG_TYPE_FOR_OBJECT<T>[] = Array.isArray(x) ? x : [x];
                    //     return { mutation: mutationTab, _$$type: 'object', _$$isMutation: true };
                    // },
                };
                return mutation_chain;
            },


            /* condition */
            condition(): CONDITION_RETURN_TYPE {
                const condition_chain: CONDITION_RETURN_TYPE = {
                    /* number condition */
                    number(x: CONDITION_ARG_TYPE_FOR_NUMBER | CONDITION_ARG_TYPE_FOR_NUMBER[], y?: 'OR' | 'AND'): CONDITION_RETURN_TYPE_FOR_ANY {
                        const conditionTab: CONDITION_ARG_TYPE_FOR_NUMBER[] = Array.isArray(x) ? x : [x];
                        const link = y || 'OR';
                        return { condition: conditionTab, link: link, _$$type: 'number', _$$isCondition: true };
                    },

                    /* string condition */
                    string(x: CONDITION_ARG_TYPE_FOR_STRING | CONDITION_ARG_TYPE_FOR_STRING[], y?: 'OR' | 'AND'): CONDITION_RETURN_TYPE_FOR_ANY {
                        const conditionTab: CONDITION_ARG_TYPE_FOR_STRING[] = Array.isArray(x) ? x : [x];
                        const link = y || 'OR';
                        return { condition: conditionTab, link: link, _$$type: 'string', _$$isCondition: true };
                    },

                    /* boolean condition */
                    boolean(x: CONDITION_ARG_TYPE_FOR_BOOLEAN | CONDITION_ARG_TYPE_FOR_BOOLEAN[], y?: 'OR' | 'AND'): CONDITION_RETURN_TYPE_FOR_ANY {
                        const conditionTab: CONDITION_ARG_TYPE_FOR_BOOLEAN[] = Array.isArray(x) ? x : [x];
                        const link = y || 'OR';
                        return { condition: conditionTab, link: link, _$$type: 'boolean', _$$isCondition: true };
                    },

                    /* object (json | array) condition */
                    object(x: CONDITION_ARG_TYPE_FOR_OBJECT | CONDITION_ARG_TYPE_FOR_OBJECT[], y?: 'OR' | 'AND'): CONDITION_RETURN_TYPE_FOR_ANY {
                        const conditionTab: CONDITION_ARG_TYPE_FOR_OBJECT[] = Array.isArray(x) ? x : [x];
                        const link = y || 'OR';
                        return { condition: conditionTab, link: link, _$$type: 'object', _$$isCondition: true };
                    },

                    /* date condition */
                    date(x: CONDITION_ARG_TYPE_FOR_DATE | CONDITION_ARG_TYPE_FOR_DATE[], y?: 'OR' | 'AND'): CONDITION_RETURN_TYPE_FOR_ANY {
                        const conditionTab: CONDITION_ARG_TYPE_FOR_DATE[] = Array.isArray(x) ? x : [x];
                        const link = y || 'OR';
                        return { condition: conditionTab, link: link, _$$type: 'date', _$$isCondition: true };
                    }
                };
                return condition_chain;
            },


            /* watch feed */
            watch(x?: string): WATCH_RETURN_TYPE {
                const wid = x || generateIdFunc({ length: 10 });
                return {
                    feed(x: WATCH_ARG_TYPE): WATCH_FEED_RETURN_TYPE {
                        const wg = x;
                        return {
                            on(x: WATCH_FEED_ON_ARG_TYPE): void { setupFeedWatchersFunc({ target: wg, event: x, wid: wid }) }
                        }
                    },
                    branch(x: WATCH_ARG_TYPE): WATCH_BRANCH_RETURN_TYPE {
                        const wg = x;
                        return {
                            fromTree(x: string) {
                                const wtree = x;
                                return {
                                    on(x: WATCH_BRANCH_ON_ARG_TYPE): void { setupBranchWatchersFunc({ target: wg, tree: wtree, event: x, wid: wid }) }
                                }
                            }
                        }
                    },
                    store(): WATCH_STORE_RETURN_TYPE {
                        return {
                            on(x: WATCH_STORE_ON_ARG_TYPE): void { setupStoreWatchersFunc({ event: x, wid: wid }) }
                        }
                    },
                }
            },


            /* Use watcher */
            useWatcher(x: USE_WATCHER_ARG_TYPE): USE_WATCHER_RETURN_TYPE {
                const wid = x;
                return {
                    set<T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return useWatcherFunc({ wid: wid, type: 'set', target: args[0], data: args[1], tree: args[2] });
                    },
                    add<T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return useWatcherFunc({ wid: wid, type: 'add', target: args[0], data: args[1], tree: args[2] });
                    },
                    delete<T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_OTHER_ARG_TYPE<T>): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return useWatcherFunc({ wid: wid, type: 'delete', target: args[0], data: args[1], tree: args[2] });
                    },
                    clear<T extends USE_WATCHER_TARGET_TYPE>(...args: USE_WATCHER_CLEAR_ARG_TYPE<T>): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return useWatcherFunc({ wid: wid, type: 'clear', target: args[0], data: '', tree: args[1] });
                    }
                }
            },


            /* trigger */
            trigger(x?: TRIGGER_ARG_X_TYPE, y?: TRIGGER_ARG_Y_TYPE): TRIGGER_RETURN_TYPE {
                const tasync = x, xorder = y || 'sequential';
                const tchain: any[] = []; let tobj: TRIGGER_RUN_FUNC_TYPE = { name: '', alias: '', args: [] };
                const func0 = {
                    create(x: TRIGGER_CREATE_ARG_TYPE): FUNCTION_BASIC_RETURN_TYPE {
                        if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                        return createTriggerFunc(x);
                    },
                    run(x: string, y?: string): TRIGGER_RUN_RETURN_TYPE {
                        const fname = x, alias = y || '';

                        /* - */
                        if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                        else { tobj.name = fname; tobj.alias = alias } /* set "name" and "alias" */

                        /* sync */
                        const func1 = {
                            withArgs(...a: any): TRIGGER_WITH_ARG_TYPE {
                                tobj.args = a || undefined; /* set args */
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                return { run: func0.run, fromId: func1.fromId, fromFamily: func1.fromFamily };
                            },
                            fromId(x: string): any {
                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                const src = x;
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                return runTriggerFunc({ type: 'id', source: src, func: tchain });
                            },
                            fromFamily(x: string): any {
                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                const src = x;
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                return runTriggerFunc({ type: 'family', source: src, func: tchain });
                            }
                        };

                        /* async */
                        const func2 = {
                            withArgs(...a: any): TRIGGER_WITH_ARG_ASYNC_TYPE {
                                tobj.args = a || []; /* set args */
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                return { run: func0.run, fromId: func2.fromId, fromFamily: func2.fromFamily };
                            },
                            async fromId(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                const src = x;
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                const run = await runTriggerAsyncFunc({ type: 'id', source: src, func: tchain, xorder: xorder });
                                return run;
                            },
                            async fromFamily(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                const src = x;
                                if (tobj.name !== '') { const cln = cloneObjFunc({ obj: tobj }); tchain.push(cln); tobj = { name: '', alias: '', args: [] } } /* commit "tobj" if function's name is set */
                                const run = await runTriggerAsyncFunc({ type: 'family', source: src, func: tchain, xorder: xorder });
                                return run;
                            }
                        };

                        /* - */
                        return (tasync === 'async') ? func2 : func1;
                    }
                };
                return func0;
            },


            /* extract */
            extract<T extends EXTRACT_ARG_X_TYPE>(...args: EXTRACT_ALL_ARG_TYPE<T>): FUNCTION_BASIC_RETURN_TYPE {
                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                return extractDataFunc(...args);
            },


            /* ws */
            ws(): WS_RETURN_TYPE {
                const func0 = {
                    /* Get clients and servers */
                    get() {
                        return {
                            async clients(x?: 'count') {
                                await delayFunc({ ms: 300 });
                                const keys = Object.keys(ws_client_DATA);
                                return (x === 'count') ? keys.length : keys;
                            },
                            async servers(x?: 'count') {
                                await delayFunc({ ms: 300 });
                                const keys = Object.keys(ws_server_DATA);
                                return (x === 'count') ? keys.length : keys;
                            }
                        };
                    },


                    /* For server */
                    useServer(x: string) {
                        const collector: WS_REQ_COLLECTOR_TYPE = { targetId: '', targetType: 'server', execOrder: 'sequential', method: [], type: 'id', source: '' };
                        let mcoll: WS_TRIGGER_H_RUN_FUNC_TYPE = { name: '', alias: '', args: [] };
                        let mtab: WS_TRIGGER_H_RUN_FUNC_TYPE[] = [];

                        /* set target id */
                        collector.targetId = x;

                        /* - */
                        const func1 = {
                            trigger(x?: TASK_EXECUTION_TYPE) {
                                collector.execOrder = x || 'sequential'; /* Set execution order */

                                const func2 = {
                                    run(x: string, y?: string): WS_TRIGGER_H_RUN_RETURN_TYPE {
                                        const fn = x, alias = y || '';

                                        /* - */
                                        if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                        else { mcoll.name = fn; mcoll.alias = alias } /* set "name" & "alias" */

                                        /* - */
                                        const func3 = {
                                            useCallback(x: Function, y?: string): WS_TRIGGER_H_USE_CALLBACK_RETURN_TYPE {
                                                collector.callback = x;
                                                collector.callbackId = y;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            withArgs(...a: any[]): WS_TRIGGER_H_WITH_ARG_RETURN_TYPE {
                                                mcoll.args = a || []; /* set "args" */
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { run: func2.run, useCallback: func3.useCallback, fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            async fromId(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'id'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            },
                                            async fromFamily(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'family'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            }
                                        };
                                        return func3;
                                    }
                                };
                                return func2;
                            }
                        };
                        return func1;
                    },


                    /* For client */
                    useClient(x: string) {
                        const collector: WS_REQ_COLLECTOR_TYPE = { targetId: '', targetType: 'client', execOrder: 'sequential', method: [], type: 'id', source: '' };
                        let mcoll: WS_TRIGGER_H_RUN_FUNC_TYPE = { name: '', alias: '', args: [] };
                        let mtab: WS_TRIGGER_H_RUN_FUNC_TYPE[] = [];

                        /* set target id */
                        collector.targetId = x;

                        /* - */
                        const func1 = {
                            trigger(x?: TASK_EXECUTION_TYPE) {
                                collector.execOrder = x || 'sequential'; /* Set execution order */

                                const func2 = {
                                    run(x: string, y?: string): WS_TRIGGER_H_RUN_RETURN_TYPE {
                                        const fn = x, alias = y || '';

                                        /* - */
                                        if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                        else { mcoll.name = fn; mcoll.alias = alias } /* set "name" & "alias" */

                                        /* - */
                                        const func3 = {
                                            useCallback(x: Function, y?: string): WS_TRIGGER_H_USE_CALLBACK_RETURN_TYPE {
                                                collector.callback = x;
                                                collector.callbackId = y;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            withArgs(...a: any[]): WS_TRIGGER_H_WITH_ARG_RETURN_TYPE {
                                                mcoll.args = a || []; /* set "args" */
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { run: func2.run, useCallback: func3.useCallback, fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            async fromId(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'id'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            },
                                            async fromFamily(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'family'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            }
                                        };
                                        return func3;
                                    }
                                };
                                return func2;
                            }
                        };
                        return func1;
                    },


                    /* Broadcast */
                    broadcast(x: 'to_clients' | 'to_servers') {
                        const collector: WS_REQ_COLLECTOR_TYPE = { targetId: '', targetType: (x === 'to_clients') ? 'client' : 'server', execOrder: 'sequential', method: [], type: 'id', source: '' };
                        let mcoll: WS_TRIGGER_H_RUN_FUNC_TYPE = { name: '', alias: '', args: [] };
                        let mtab: WS_TRIGGER_H_RUN_FUNC_TYPE[] = [];

                        /* set target id */
                        collector.targetId = '*';

                        /* - */
                        const func1 = {
                            trigger(x?: TASK_EXECUTION_TYPE) {
                                collector.execOrder = x || 'sequential'; /* Set execution order */

                                const func2 = {
                                    run(x: string, y?: string): WS_TRIGGER_H_BROADCAST_RUN_RETURN_TYPE {
                                        const fn = x, alias = y || '';

                                        /* - */
                                        if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                        else { mcoll.name = fn; mcoll.alias = alias } /* set "name" & "alias" */

                                        /* - */
                                        const func3 = {
                                            withArgs(...a: any[]): WS_TRIGGER_H_WITH_ARG_SESSION_TYPE {
                                                mcoll.args = a || []; /* set "args" */
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { whereSession: func3.whereSession, run: func2.run, fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            whereSession(x: JSON_BASIC_TYPE): WS_TRIGGER_WHERE_SESSION_RETURN_TYPE {
                                                collector.targetFilter = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { fromId: func3.fromId, fromFamily: func3.fromFamily };
                                            },
                                            async fromId(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'id'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            },
                                            async fromFamily(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'family'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await ws_sendtriggerMethodFunc(collector);
                                                return run;
                                            }
                                        };
                                        return func3;
                                    }
                                };
                                return func2;
                            }
                        };
                        return func1;
                    }
                };
                return func0;
            },


            /* fs */
            fs(): FS_RETURN_TYPE {
                const func = {
                    /* Create */
                    create() {
                        return {
                            async folder(x: FS_X_FOLDER_ARG_TYPE | FS_X_FOLDER_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_createFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: FS_X_FILE_ARG_TYPE | FS_X_FILE_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_createFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Update */
                    write() {
                        return {
                            async file(x: FS_X_FILE_ARG_TYPE | FS_X_FILE_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_writeFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Read */
                    read() {
                        return {
                            async folder(x: FS_READ_FOLDER_ARG_TYPE | FS_READ_FOLDER_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_readFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: FS_READ_FILE_ARG_TYPE | FS_READ_FILE_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_readFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Delete */
                    delete() {
                        return {
                            async folder(x: string | string[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_deleteFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: string | string[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_deleteFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Rename */
                    rename() {
                        return {
                            async folder(x: FS_RENAME_X_ARG_TYPE | FS_RENAME_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_renameFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: FS_RENAME_X_ARG_TYPE | FS_RENAME_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_renameFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Move */
                    move() {
                        return {
                            async folder(x: FS_MOVE_X_ARG_TYPE | FS_MOVE_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_moveFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: FS_MOVE_X_ARG_TYPE | FS_MOVE_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_moveFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Copy */
                    copy() {
                        return {
                            async folder(x: FS_COPY_X_ARG_TYPE | FS_COPY_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_copyFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: FS_COPY_X_ARG_TYPE | FS_COPY_X_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_copyFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    },

                    /* Clear */
                    clear() {
                        return {
                            async folder(x: FS_CLEAR_FOLDER_ARG_TYPE | FS_CLEAR_FOLDER_ARG_TYPE[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_clearFunc({ type: 'folder', data: x });
                                return final;
                            },
                            async file(x: string | string[]): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                const final = await fs_clearFunc({ type: 'file', data: x });
                                return final;
                            }
                        }
                    }
                };
                return func;
            },


            /* http */
            http(): HTTP_RETURN_TYPE {
                const collector: HTTP_REQ_COLLECTOR_TYPE = { serverId: '', execOrder: 'sequential', method: [], type: 'id', source: '' };
                let mcoll: HTTP_TRIGGER_H_RUN_FUNC_TYPE = { name: '', alias: '', args: [] };
                let mtab: HTTP_TRIGGER_H_RUN_FUNC_TYPE[] = [];

                const func = {
                    useServer(x: string) {
                        collector.serverId = x; /* set server id */
                        const func0 = {
                            trigger(x?: TASK_EXECUTION_TYPE) {
                                collector.execOrder = x || 'sequential'; /* set execution mode */

                                const func1 = {
                                    run(x: string, y?: string): HTTP_TRIGGER_H_RUN_RETURN_TYPE {
                                        const fn = x, alias = y || '';

                                        /* - */
                                        if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                        else { mcoll.name = fn; mcoll.alias = alias } /* set "name" & "alias" */

                                        /* - */
                                        const func2 = {
                                            withArgs(...a: any[]): HTTP_TRIGGER_H_WITH_ARG_TYPE {
                                                mcoll.args = a || []; /* set "args" */
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                return { run: func1.run, fromId: func2.fromId, fromFamily: func2.fromFamily };
                                            },
                                            async fromId(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'id'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await sendHTTPrequestFunc(collector);
                                                return run;
                                            },
                                            async fromFamily(x: string): Promise<FUNCTION_BASIC_RETURN_TYPE> {
                                                if (badInit) return { status: 'error', log: `[Initialization failed] :: ${initLog}`, data: errCode.initialization_failed }; /* if bad init */
                                                collector.type = 'family'; collector.source = x;
                                                if (mcoll.name !== '') { const cln = cloneObjFunc({ obj: mcoll }); mtab.push(cln); mcoll = { name: '', alias: '', args: [] } } /* commit "mcoll" if name is set */
                                                collector.method = mtab; /* set "method" */
                                                const run = await sendHTTPrequestFunc(collector);
                                                return run;
                                            }
                                        };
                                        return func2;
                                    }
                                };
                                return func1;
                            },
                            // async download(): Promise<any> { },
                            // upload(): Promise<any> { }
                        };
                        return func0;
                    }
                };
                return func;
            },

            /* query */
            query(): void {
                // const func0 = {
                //     get() {},
                //     broadcast() {},
                //     useServer 
                // };
                // return func0;
            }
        };

        /* "mainChain" return */
        return mainChain;
    }
};

/* EXPORT DEFAULT "forestDB" */
const forestDB: DB_TYPE = frockinDB;
export default forestDB;