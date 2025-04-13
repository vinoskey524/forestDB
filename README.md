# forestDB

An uncomplicated real-time database with encrypted HTTP and WebSocket server-client communication, fast caching, state management, a cross-runtime file system manager,
and more, working seamlessly on both frontend and backend.

## Table of contents

- [Installation](#installation)
- [What's forestDB](#whats-forestdb)
- [Why forestDB](#whats-forestdb)
- [API Documentation](#api-documentation)
  - [Initialization](#initialization)
  - [Transactions](#transactions)
    - ["set" operations](#set-operations)
    - ["get" operations](#get-operations)
    - ["update" operations](#update-operations)
    - ["updateAll" operations](#updateAll-operations)
    - ["delete" operations](#delete-operations)
    - ["join" for MTC](#join)
  - [Facts about transactions](#facts-about-transactions)
  - [Conditions](#conditions)
    - [Simple filtering](#simple-filtering)
    - [Deep filtering](#deep-filtering)
  - [Facts about conditions](#facts-about-conditions)
  - [Mutations](#mutations)
  - [Facts about mutations](#facts-about-mutations)
  - [Return](#Return)
  - [Store](#store)
  - [Session](#Session)
  - [Watchers](#watchers)
  - [Facts about watchers](#facts-about-watchers)
  - [Triggers](#triggers)
  - [Facts about triggers](#facts-about-triggers)
  - [Plugins](#plugins)
    - [WebSocket for real-time communications](#websocket-for-real-time-communications)
    - [HTTP with triggers](#http-with-triggers)
      - [Server Proxy](#server-proxy)
    - [File system](#file-system)
    - [Crypto](#crypto)
    - [Versioning](#versioning)
  - [Methods](#methods)
- [Restrictions](#restrictions)
- [Sorry React native](#sorry-react-native)
- [What next](#what-next)
- [Support forestDB](#support-forestdb)
- [Author](#author)
- [Next coming package](#next-coming-package)
- [Contact Me](#contact-me)
- [GitHub repo](#github-repo)
- [License](#license)

## Installation

```sh
# Yarn
$ yarn add forestdb

# npm
$ npm install forestdb
```

## What's forestDB

ForestDB is a 100% pure TypeScript library that allows you to perform the following tasks:

1. **`Transactions`**

You can perform reliable and high-performance transactions through operations like _'set'_, _'update'_, _'updateAll'_, _'get'_, and _'delete'_, with a powerful **Condition** method to manage your 
data in a flexible way. The data, referred to as `feeds`, are organized into branches, which are further organized into trees. These trees are contained within a forest, representing
your application.

In its current version, `forestDB` is an in-memory NoSQL database (for now, at least).

2. **`Encrypted HTTP and WebSocket Server-Client`**

You can connect one or multiple forestDB clients (React, Vue, Angular, Svelte, etc.) to one or more forestDB servers (Deno, Node, and Bun) via HTTP and WebSocket connections. 
Servers can also connect to each other, even across different runtimes, with each capable of acting as a client, server, or both simultaneously.

All HTTP and WebSocket connections are end-to-end encrypted using a two-layer encryption method. The first layer employs **AES-GCM**, while the second applies an algorithm that **shuffles** 
the encrypted data, adding an extra layer of security and making it harder to break.

The main purpose of this functionality is to **securely trigger functions directly** from both sides without requiring the user to set up POST or GET requests.
With WebSockets, you can automatically attach a callback to receive a response.

3. **`Store`**

The **Store** is a fast caching method that allows you to store simple key-value pairs and perform powerful mutations on them. It’s especially useful for keeping small pieces of data readily
accessible for quick retrieval.

4. **`Session`**

The **Session** works just like the **Store**, but its main purpose is to store session data, such as user IDs, to identify or filter users during WebSocket messaging and broadcasting.
Servers and clients also use sessions to authenticate themselves and perform operations. Each client commits its session to the server in real-time.

5. **`Watchers`**

ForestDB allows you to watch events such as _'creation'_, _'update'_, and _'deletion'_ on feeds, branches, the Store, and the Session. Any created, updated, or deleted fields are 
automatically returned in the watch event and can be used to update components or perform any other operations.

On the frontend, such as in React, watchers do not trigger re-renders; they simply broadcast changes.

6. **`Triggers`**

Triggers allow you to efficiently **centralize all functions** in your app and execute them directly via the trigger ID. You can create multiple triggers and even group them by family for 
triggers containing similar functions. This way, you can run the same functions across different triggers simply by specifying their family and the function name, instead of calling
each trigger separately.

For a use case example, imagine you have two components, A and B, in React. You can create a trigger for all functions inside component A and another for component B. 
Then, you can remotely execute functions within A or B from anywhere in your application simply by calling the trigger through its ID or family and specifying the function name to run. You can even execute
functions in parallel when needed.

It’s the same logic used between Clients and Servers over HTTP and WebSocket. It makes the Server and the Client feel like two components of the same app.

Triggers support both synchronous and asynchronous functions.

7. **`Cross-runtime file system APIs`**

ForestDB provides the same API for file system operations across runtimes like _Deno_, _Node_, _Bun_, and _React Native_, without any performance sacrifice. It leverages the native 
file system APIs for each runtime (the same logic is used for HTTP and WebSocket to create servers and clients).

8. **`Methods`**

Some utility functions are also provided for tasks like hashing and object manipulation, with many more to be available in the futur releases.

These are the major functionalities available for now, and each includes many sub-functionalities that we will explore in the [Documentation section](#api-documentation). More are still in development and
will be available soon.

## Why forestDB

ForestDB is the result of 8 years of experience and frustration with existing dataflow and state management tools. If you’ve used something like Redux, you know how inefficient it can be,
causing unnecessary re-renders and poor performance, especially in large web and mobile (React Native) projects.

Not only that, the syntax of most state managers is weird, messy, and hard to maintain after months of inactivity, whether you're using React, Vue, Angular, Svelte, or any other framework.

For many years, I searched for a solution or package to solve this problem, without success. Then I started building a full call center app for a client with three different interfaces.
It was a huge project, and the dataflow and state management became so overwhelming that I lost it in frustration and decided to build my own **uncomplicated** dataflow and state manager from scratch.
That’s how `forestDB` was born.

Not only does it simplify dataflow and state management through `transactions`, `stores`, `watchers`, and `triggers` on both the server and client sides, but it also enables seamless, reliable, and
secure communication between them.

This is just the beginning. In its full version, it will be a complete database capable of storing data on disk and more.

Now, let's dive into the heart of the beast.

## API Documentation

### **Initialization**

Before using forestDB, you need to initialize it. Here's how:

```ts
import forestDB from 'forestdb';

// Initialization of forestDB
const forest = forestDB.init({
  mainKey: 'id',
  dateFormat: ['YYYY_MM_DD', 'MM_DD_YYYY']
});
```

- **`mainKey`** (`string`): The name of the key used as a unique identifier for each feed. This key must be present in every feed used within a transaction, and its value should always be
alphanumeric and unique within the entire forest. No two feeds should share the same identifier, even if they belong to different trees or branches.

In this example, we use the key `"id"`, and its value can look like this: `"01JNRRRN9XRHZAA93APGPKHMQ7"`.

- **`dateFormat`** (`string[]`): Specify the date format you want to support in your application. Three formats are available: `"YYYY_MM_DD"` (the universal and most commonly used format), `"MM_DD_YYYY"` (American format), and `"DD_MM_YYYY"` (European format).

To avoid ambiguity, never use `"MM_DD_YYYY"` and `"DD_MM_YYYY"` together, as it can create confusion for dates like `"01/01/2025"`. Always use `"YYYY_MM_DD"` along with one of the other two formats.

### **Transactions**

Transactions are useful for storing and managing data like posts, messages, accounts, and similar items.

In this example, we'll perform transactions using the following list of employees.

```ts
const employees_DATA = [
  {
    "id": "EMP001",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "age": 20
    },
    "job": {
      "title": "Junior Software Engineer",
      "technologies": ["TypeScript", "React", "Node.js"],
      "hireDate": "2022-04-15",
    },
    "salary": 75_000,
    "status": "active",
  },
  {
    "id": "EMP002",
    "personalInfo": {
      "firstName": "Emma",
      "lastName": "Smith",
      "email": "emma.smith@example.com",
      "age": 23
    },
    "job": {
      "title": "Mid-Level Software Engineer",
      "technologies": ["TypeScript", "Angular", "AWS"],
      "hireDate": "2019-06-30",
    },
    "salary": 110_000,
    "status": "inactive",
  },
  {
    "id": "EMP003",
    "personalInfo": {
      "firstName": "James",
      "lastName": "Taylor",
      "email": "james.taylor@example.com",
      "age": 25
    },
    "job": {
      "title": "Senior Software Engineer",
      "technologies": ["TypeScript", "Node.js", "Kubernetes"],
      "hireDate": "2015-08-12",
    },
    "salary": 145_000,
    "status": "active",
  }
];
```

1. ### **`Set` operations**

```ts
// Set data
const set_data = await forest.onTree('employees').set(employees_DATA).onBranch('dev_accounts').end();
```

> ⚠️ Note: This documentation uses top-level `await`. Ensure your runtime environment is properly configured to support it.

- **`await forest`**: The **forest** instance we have initialized. All transactions are asynchronous.

- **`onTree`** (`string`): Select the tree on which you want to perform the transaction. If it doesn't exist, it will be automatically created.

- **`set`** (`json | json[]`): Accepts a JSON object or an array of JSON objects.

- **`onBranch`** (`string`): Select the branch on which you want to store the feeds. If it doesn't exist, it will be automatically created.

- **`end`**:  Indicates the end of the transaction chain.

Once finished, a transaction will return a JSON object containing fields like:

- **`status`** (`string`): Will be `success` if everything goes well or `error` if something goes wrong.

- **`log`** (`string`): Contains details about errors and other informative messages.

- **`data`** (`any`): Any data returned by the transaction. If nothing is returned, it may contain an empty array `[]` if a `get` transaction didn’t retrieve anything, or `undefined` in other cases.

Other examples:

```ts
const set_man = await forest.onTree('species').set({ id: 'human_john', name: 'John', age: 32 }).onBranch('humans').end();

const set_woman = await forest.onTree('species').set({ id: 'human_melanie', name: 'Melanie', age: 25 }).onBranch('humans').end();

const set_dog = await forest.onTree('species').set({ id: 'dog_rex', name: 'Rex', color: 'Black & White', age: 1 }).onBranch('dogs').end();

const set_fish = await forest.onTree('species').set({ id: 'fish_nemo', name: 'Nemo', color: 'Orange & White' }).onBranch('fishs').end();
```

As you can see, the APIs are clean, simple, and intuitive.

> ⚠️ Note: It's **ONLY** during "set" operations that "trees" and "branches" that don't exist are automatically created. For any other operation, if the "tree" or "branch" 
> specified doesn't already exist, the operation will simply fail. **Please, keep that in mind!**
>
> Also, make it a habit to check the transaction's **status** and **log** to understand what's happening in your application.

2. ### **`get` operations**

```ts
const get_data = await forest.onTree('employees').get('*').fromBranch('dev_accounts').end();
```

- **`get`** (`x`): `x` can be `'*'` to retrieve all fields from a feed, or the names of the specific fields you want to retrieve.

The query above will return everything from the branch **"dev_accounts"**.

Remember, a transaction will always return a JSON object containing its `status` (whether it succeeded or not), the `log` (error messages when it fails),
and the `data` (any retrieved data from the database). To access the data or feeds returned by our request, we will do it like this:

```ts
// Get the data returned by the request:
const feeds = get_data.data;
```

It's not finished, cause if you do `console.log(feeds)`, you will see that the real data is contained inside another object with the key `"0"`.

So, the full code to access the data directly is:

```ts
// Extract the feeds directly from the response.
const feeds = get_data.data['0'];
```

Now, if you run console.log(feeds) again, you’ll see an array containing your feeds.

You’ll understand why you need to add `['0']` when we reach the `join` section.

Great, but there’s more we can do. What if we only want to retrieve the data for **James** ("EMP003") ? We can easily chain a where function to the transaction to filter the feeds, like this:

```ts
// Get "James" data using its ID "EMP003"
const get_james_data = await forest.onTree('employees').get('*').fromBranch('dev_accounts').where({ id: 'EMP003' }).end();
```

- **`where`** (`json`): Accepts only one JSON object.

We can also **order** the feeds and set a **limit** on the number of feeds we want to retrieve.

For example, let's retrieve all employees and order them by salary at the same time.

```ts
// This will return all employees ordered by salary from the "smallest" to the "largest"
const get_ordered_data_ASC_1 = await forest.onTree('employees').get('*').fromBranch('dev_accounts').orderBy('salary').end();
// Same effect
const get_ordered_data_ASC_2 = await forest.onTree('employees').get('*').fromBranch('dev_accounts').orderBy('salary', 'ASC').end();

// This will return all employees ordered by salary from the "largest" to the "smallest"
const get_ordered_data_DESC = await forest.onTree('employees').get('*').fromBranch('dev_accounts').orderBy('salary', 'DESC').end();
```

- **`orderBy`** (`x, y?`): `x` is the name of the field by which you want to order the feeds, and `y` (`ASC` | `DESC`) determines the order.
If you don’t specify a value for `y` (it's optional), its default value will be `ASC`.

You can order by fields of type `number`, `boolean` and `string`, and also use **dot notation** to reach nested fields.

```ts
// This will return all employees ordered by "age" from the "oldest" to the "youngest"
const get_ordered_data_DESC = await forest.onTree('employees').get('*').fromBranch('dev_accounts').orderBy('personalInfo.age', 'DESC').end();
```

To retrieve only the two highest-paid employees, use `limit`:

```ts
// This will return the two highest-paid employees.
const get_two_feeds = await forest.onTree('employees').get('*').fromBranch('dev_accounts').orderBy('salary', 'DESC').limit(2).end();
```

- **`limit`** (`number`): Limit the number of feeds to retrieve.

3. ### **`update` operations**

```ts
const update_data = await forest.onTree('employees').update({ id: 'EMP001', status: 'inactive' }).end();
```

- **`update`** (`json | json[]`): Accepts a JSON object or an array of JSON objects.

In the example above, only the `status` field will be updated. The `id` field will never be updated because it has been defined as the `mainKey`. Instead, its value will be used to identify
the feed on which to apply the update.

Note that no branch is specified because when a feed is created for the first time, an index is automatically created between its ID (mainKey) and the branch it belongs to.
So, when you specify the feed ID, `forest` already knows its branch.

This is especially useful when you want to update many feeds belonging to different branches at the same time. You can collect them inside an array and pass it to the `update` function.

**Be careful** ! If you pass a JSON object without specifying the `mainKey` (in our case, `id`), the update will fail. So, never do this:

```ts
// No "id" is specified, so the update will fail
const bad_update = await forest.onTree('employees').update({ status: 'inactive' }).end();
```

Here, we will update two feeds belonging to different branches:

```ts
// We have incremented Melanie and Rex's ages by 1
const multi_updates = await forest.onTree('species').update([{ id: 'human_melanie', age: 26 }, { id: 'dog_rex', age: 2 }]).end();
```

Of course, you can update many fields at the same time, **but never omit the `mainKey`**.

4. ### **`updateAll` operations**

### **Update everything** 

```ts
const update_all_data = await forest.onTree('employees').updateAll({ status: 'inactive' }).onBranch('dev_accounts').end();
```

- **`updateAll`** (`json`): Accepts only one JSON object.

Unlike `update`, `updateAll` doesn't require you to specify the `mainKey`, but you must always specify the branch. It will then update the given fields for all feeds on that branch.

In the example above, every employee's status will be updated to **inative**.

**Be careful** ! If you specify the `mainKey` inside `updateAll`, the transaction will fail. So, never do this:

```ts
// This update will fail because you're trying to update the "mainKey" of all feeds
const very_bad_update_1 = await forest.onTree('employees').updateAll({ id: 'EMP001', status: 'inactive' }).onBranch('dev_accounts').end();
```

Even if the provided `id` doesn't exist, the transaction will still fail, as shown in this example:

```ts
// This update will fail because you're trying to update the "mainKey" of all feeds
const very_bad_update_2 = await forest.onTree('employees').updateAll({ id: 'bla_bla_bla', status: 'inactive' }).onBranch('dev_accounts').end();
```

Simply note that you can update all fields except the `mainKey`.

### **Conditional updates** 

```ts
// Set "salary" to 200_000 where "status: active". If you didn't modify Emma ("EMP002")'s status, she won't receive that update because her status is "inactive"
const update_many_data = await forest.onTree('employees').updateAll({ salary: 200_000 }).onBranch('dev_accounts').where({ status: 'active' }).end();
```

- **`where`** (`json`): Accepts only one JSON object.

When you need more control, simply chain a `where` function to your transaction to filter the feeds you want to update, instead of updating everything.

For example, in the case above, only the salary of employees with` status: active` will be updated.

It is possible to create a very complex and flexible **where condition** and **update mutation**. We’ll dive deeper into this in the [`Conditions`](#conditions) and [`Mutations`](#mutations) sections.
Just follow me !

You can also use `orderBy` and `limit` with **updateAll** to optimize your transaction and make it run faster.

5. ### **`delete` operations**

### Delete **fields**

- **`Case 1`: To delete all fields, do it like this:**

```ts
// Delete all "fields" from all "feeds" on the "dev_accounts" branch. This has the same effect as "delete_all_fields_2" with "*" specified.
const delete_all_fields_1 = await forest.onTree('employees').delete('field', '*').fromBranch('dev_accounts').end();

// Delete all "fields" from all "feeds" on the "dev_accounts" branch. This has the same effect as "delete_all_fields_1" without "*" specified.
const delete_all_fields_2 = await forest.onTree('employees').delete('field').fromBranch('dev_accounts').end();
```

- **`delete`** (`x, y?`): For `x` you should set `field` and for `y` you will specify the `names` of the fields you want to delete or `'*'` if you want to delete all fields.
If you didn't set any value to `y` (it's optional), its defalut value will be `'*'`.

- **`Case 2`: To delete only one field, do it like this:**

```ts
// The "status" field will be deleted from all "feeds" on the "dev_accounts" branch.
const delete_one_field = await forest.onTree('employees').delete('field', 'status').fromBranch('dev_accounts').end();
```

- **`Case 3`: To delete many fields, do it like this:**

```ts
// The "salary" and "status" fields will be deleted from all "feeds" on the "dev_accounts" branch.
const delete_many_fields = await forest.onTree('employees').delete('field', ['salary', 'status']).fromBranch('dev_accounts').end();
```

You can add a `where` function for each case to filter the feeds on which you want to apply the transaction.

```ts
// The "salary" and "status" fields will be deleted only from all "feeds" with status: active on the "dev_accounts" branch.
const delete_fields_with_filter = await forest.onTree('employees').delete('field', ['salary', 'status']).fromBranch('dev_accounts').where({ status: 'active' }).end();
```

You can delete any field you want except the `mainKey`. If you use `'*'` the `mainKey` will be deleted, but only because the `feed`  itself will be deleted.

> **⚠️ Note: If you delete all fields from a feed, the feed itself will be deleted automatically. If you try to delete a field that doesn't exist, it will be ignored.**

### Delete **feeds**

- **`Case 1`: To delete all feeds from a branch, do it like this:**

```ts
// Delete all "feeds" from the "dev_accounts" branch. This has the same effect as "delete_all_feeds_2" with "*" specified.
const delete_all_feeds_1 = await forest.onTree('employees').delete('feed', '*').fromBranch('dev_accounts').end();

// Delete all "feeds" from the "dev_accounts" branch. This has the same effect as "delete_all_feeds_1" without "*" specified.
const delete_all_feeds_2 = await forest.onTree('employees').delete('feed').fromBranch('dev_accounts').end();
```

- **`delete`** (`x, y?`): For `x` you should set `feed` and for `y` you will specify the `IDs` of the feeds you want to delete or `'*'` if you want to delete all feeds.
If you didn't set any value for `y` (it's optional), its default value will be `'*'`.

- **`Case 2`: To delete only one feed from a branch, do it like this:**

```ts
// The feed with ID "EMP001" will be deleted from the "dev_accounts" branch.
const delete_one_feed = await forest.onTree('employees').delete('feed', 'EMP001').fromBranch('dev_accounts').end();
```

- **`Case 3`: To delete many feeds from a branch, do it like this:**

```ts
// The feeds "EMP002" and "EMP003" will be deleted from branch "dev_accounts".
const delete_many_feeds = await forest.onTree('employees').delete('feed', ['EMP002', 'EMP003']).fromBranch('dev_accounts').end();
```

You can add a `where`  function to filter the feeds you want to delete when no `ID` is specified (for example, in `case 1`).

```ts
// The feeds with "status: active" will be deleted from the "dev_accounts" branch.
const delete_feeds_with_filter = await forest.onTree('employees').delete('feed').fromBranch('dev_accounts').where({ status: 'active' }).end();
```

> **⚠️ Note: If you delete all feeds from a branch, the branch will not be deleted automatically. If you try to delete a feed that doesn't exist, it will be ignored.**

### Delete **branches**

- **`Case 1`: To delete all branches from a tree, do it like this:**

```ts
// Delete all "branches" from the "employees" tree. This has the same effect as "delete_all_branches_2" with "*" specified.
const delete_all_branches_1 = await forest.onTree('employees').delete('branch', '*').end();

// "Delete all branches from the 'employees' tree. This has the same effect as 'delete_all_branches_1', but without specifying '*'.
const delete_all_branches_2 = await forest.onTree('employees').delete('branch').end();
```

- **`delete`** (`x, y?`): Set `x` to branch, and for `y`, specify the names of the branches to delete, or use `'*'` to delete all branches.
If you didn't set any value to `y` (it's optional), its defalut value will be `'*'`.

- **`Case 2`: To delete only one branch from a tree, do it like this:**

```ts
// The "dev_accounts" branch will be deleted from the "species" tree.
const delete_one_branch = await forest.onTree('employees').delete('branch', 'dev_accounts').end();
```

- **`Case 3`: To delete many branches from a branch, do it like this:**

```ts
// The branches "dogs" and "fishs" will be deleted from the "species" tree.
const delete_many_branches = await forest.onTree('species').delete('branch', ['dogs', 'fishs']).end();
```

> **⚠️ Note: If you delete all branches from a tree, the tree itself will not be deleted. Trying to delete a branch that doesn't exist will be ignored.**

When you delete a field, feed, or branch, it is not removed immediately for safety reasons. Instead, it is placed in `phantom` mode if being processed within a transaction at the time of deletion.

A phantom is something that exists but cannot be seen or interacted with. The deleted fields, feeds, or branches will remain in existence until all transactions involving them are fully completed, 
regardless of whether they succeed or fail.

Anything in phantom mode cannot be fetched or processed. It is locked and will be removed once all related transactions are finished.

Any operation on a phantom field, feed, or branch will fail immediately (with a log explaining the reason) or will be silently ignored (with no log).

6. ### **`join`** for MTC

A `Join` allows you to chain two or more transactions together and run them at once.

```ts
const join_transactions = await forest.onTree('employees').set(employees_DATA).onBranch('dev_accounts').join('t1')
  .updateAll({ salary: 200_000 }).onBranch('dev_accounts').where({ status: 'active' }).join('t2')
  .get(['id', 'salary', 'status']).fromBranch('dev_accounts').where({ status: 'active' }).end();
```

This is called a `Multi Transactions Chain` (MTC). There is no limit to how many transactions you can chain together.

However, an `MTC` can only be used on **one tree at a time**, so every transaction within an MTC must concern the same tree.

- **`join`** (`string`): It takes a string as an argument, which serves as the `ID` for the next transaction.

For example, `t1` is the ID of the **"updateAll transaction"** and `t2` is the ID of the **"get transaction"**. Two transactions within an MTC cannot share the same ID.
If you try to do this, all transactions will fail immediately.

What about the ID of the first transaction, the **"set transaction"** ? The first transaction in an MTC has `"0"` as its default ID, and it cannot be changed.

Now you can understand why we use the following syntax to access our feeds:

```ts
// Extract the feeds directly from the response.
const feeds = get_data.data['0']; /* Do you remember ? */
```

To retrieve our feeds this time, we'll do like this:

```ts
// Extract the feeds directly from the response.
const feeds = join_transactions.data['t2']; /* "t2" is the ID of the current transaction in this context */
```

A `transaction ID` (or `Join ID`) serves two main purposes. First, it helps identify the faulty transaction when the MTC fails. Second, as you know, it allows you to
extract the data returned by a get transaction.

If one transaction fails, the entire chain fails. For the MTC to succeed, all transactions in the chain must succeed. Only when all transactions succeed are the
changes committed and saved to the database. It's **ATOMIC**.

### Facts about transactions

- No changes are applied to the database until a single transaction or an MTC fully succeeds.

- Once a transaction starts, it cannot be canceled externally.

- Any JSON data sent to a transaction is **deeply cloned** before being processed to break all references.

- Any data output by a transaction is a **deeply cloned** version of the original data to break all references.

- Transactions only support **fields** of type `number`, `string`, `boolean`, `null`, `json` and `array`.

- If you specify a path that doesn't exist for a feed, the feed will be ignored.

- Every transaction is asynchronous.

> ⚠️ Note:  In JavaScript, "null", "json", and "array" are treated as objects. However, I prefer to detail everything for better understanding. So, if you're new to JS, don't be confused.
> As of the time of writing this document, there are no explicit types like "null", "json", or "array" in JS. In the Method section of this documentation, you'll find a function provided
> by `forestDB` to detect the exact type of a variable.

### **Conditions**

Now, it's going to get interesting.

In this section, you'll discover how flexible and powerful `forestDB` is when it comes to filtering JSON data.

1. ### **`Simple filtering`**

```ts
const simple_where_condition = await forest.onTree(employees).get('*').fromBranch('dev_accounts').where({ id: 'EMP001', salary: 75_000 }).end();
```

Above is the basic and limited type of filter or condition we've been using in the `where` function from the beginning.

However, we can expect more, as a feed can contain many deeply nested fields. This is why **Deep Filtering** was created.

2. ### **`Deep filtering`**

For this section, we'll use the following JSON data:

```ts
const users_Data = [
  /* user "01" */
  { 
    "id": "01_JNRS1WCD1MK6FRZG87ZA7Y6Q",  
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 25,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zip": "10001",
      "country": "USA"
    },
    "preferences": {
      "newsletter": true,
      "theme": "dark",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      }
    },
    "company": {
      "name": "forestDB Cloud",
      "position": "Software Engineer",
      "salary": 200_000,
      "department": {
        "name": "Development",
        "floor": 3
      }
    },
    "paymentInfo": {
      "cardType": "Visa",
      "last4": 1234,
      "billing": {
        "address": "456 Another St",
        "city": "Los Angeles"
      }
    },
    "settings": {
      "language": "en",
      "timezone": "UTC-5"
    },
    "tags": ["developer", "javascript", "aws", "docker", "nginx", "remote"],
    "orderHistory": [
      { "orderId": "ORD123", "amount": 99.99, "date": "2024-03-07" },
      { "orderId": "ORD124", "amount": 49.99, "date": "2024-03-06" }
    ],
    "devices": [
      { "type": "laptop", "os": "Windows 11" },
      { "type": "phone", "os": "iOS" }
    ],
    "createdAt": "2024-03-07T12:00:00Z",
    "updatedAt": "2024-03-08T10:30:00Z",
    "status": "active",
    "roles": ["admin", "user"],
    "metadata": {
      "signupSource": "web",
      "referralCode": "XYZ123"
    }
  },

  /* user "02" */
  {
    "id":"02_JNRS1WBEBDB66DXXRJAYGHMA","name":"Temple Hechlin","email":"thechlin0@cdc.gov","age":26,"address":{"street":"642 Packers Park","city":"Bangbayang","country":"Indonesia"},
    "preferences":{"newsletter":true,"theme":"Orange","notifications":{"email":false,"sms":true,"push":false}},"company":{"name":"forestDB Cloud","position":"Software Test Engineer II",
    "salary": 120_000,"department":{"name":"Research and Development","floor":82}},"paymentInfo":{"cardType":"jcb","last4":2401,"billing":{"address":"193 Butterfield Trail","city":"Pelaya"}},
    "settings":{"language":"Kurdish","timezone":"Asia/Jakarta"},"tags":["javascript","remote"],"orderHistory":{"orderId":"ORD124","amount":150.29,"date":"3/6/2024"},
    "devices":{"type":"laptop","os":"Windows 11"},"createdAt":"2024-02-07T00:00:00Z","updatedAt":"2024-02-17T20:00:00Z","status":"inactive","roles":["admin","user"],
    "metadata":{"signupSource":"web"}
  },
  
  /* user "03" */
  {
    "id":"03_JNRS1WBR30TZGEG943RVPF4A","name":"Montgomery Feechum","email":"mfeechum1@digg.com","age":24,"address":{"street":"3787 Lindbergh Lane","city":"Shijing","country":"China"},
    "preferences":{"newsletter":false,"theme":"Khaki","notifications":{"email":true,"sms":false,"push":false}},"company":{"name":"forestDB Cloud","position":"GIS Technical Architect",
    "salary": 145_000,"department":{"name":"Marketing","floor":62}},"paymentInfo":{"cardType":"diners-club-carte-blanche","last4":1662,"billing":{"address":"85 Blaine Place","city":"Tiling"}},
    "settings":{"language":"Latvian","timezone":"Asia/Chongqing"},"tags":["remote","developer","javascript"],"orderHistory":{"orderId":"ORD123","amount":598.55,"date":"3/6/2024"},
    "devices":{"type":"laptop","os":"Windows 11"},"createdAt":"2024-03-06T00:00:00Z","updatedAt":"2024-03-12T09:52:00Z","status":"active","roles":["admin","user"],
    "metadata":{"signupSource":"web","referralCode": "XYZ456"}
  },

  /* user "04" */
  {
    "id":"04_JNRS1WEYZJRPHNZ0CNBN4QEH","name":"Cindie M. Castells","email":"ccastellsl@wisc.edu","age":99,"address":{"street":"26069 Graceland Road","city":"Kassándreia","country":"Greece"},
    "preferences":{"newsletter":true,"theme":"Teal","notifications":{"email":true,"sms":true,"push":false}},"company":{"name":"forestDB Cloud","position":"Technical Writer",
    "salary": 78_000,"department":{"name":"Training","floor":18}},"paymentInfo":{"cardType":"instapayment","last4":3197,"billing":{"address":"576 Thompson Plaza","city":"Heling"}},
    "settings":{"language":"Tamil","timezone":"Europe/Athens"},"tags":["remote","javascript","developer"],"orderHistory":{"orderId":"ORD124","amount":417.12,"date":"3/6/2024"},
    "devices":{"type":"laptop","os":"Windows 11"},"createdAt":"2024-02-08T00:00:00Z","updatedAt":"2024-02-24T03:20:04Z","status":"inactive","roles":["user","admin"],
    "metadata":{"signupSource":"web"}
  }
];

// Set users
const set_users = await forest.onTree('users').set(users_Data).onBranch('dev').end();
```

* ### Deep filtering on `Number`

- ### `===` operator

```ts
// Extract users that have a salary `equal` to "200_000"
const filter = await forest.onTree('users').get(['id', 'name', 'email', 'company', 'createdAt', 'updatedAt', 'tags', 'paymentInfo', 'metadata']).fromBranch('dev')
.where({
  company: forest.condition().number({ operator: '===', value: 200_000, path: 'company.salary' })
})
.end();
```

Let's analyse this line `company: forest.condition().number({ operator: '===', value: 200_000, path: 'company.salary' })`;

- **`company`**: This is the `starting point` of our condition, the primary field we want to filter.

- **`.condition()`**: The function that tells `forest` that we want to use a condition.

- **`.number(x, y?)`**: The function that tells `forest` that we want to filter a field of type `number`. It can receive two arguments.

The first argument `x` is a JSON object or an array of JSON objects, containing the following parameters

- **`operator`**: Indicates which kind of operation should be done.

- **`value`**: The value that will be used as the reference for the filter.

- **`path?`**: Specifies the `endpoint`, the only and final field on which you want to apply the filter. It's optional, because when
the `starting point` is also the `endpoint`, you don't need to set a path. For example, in a schema where salary is a first-level key. 
Use the path only to point to a **nested field**.

The second argument `y` is a string that can be either `AND` or `OR` (default). It's usefull when you're dealing with an array of different conditions. You can choose whether at least one
of them should match (`OR`), or if absolutely all of them should match (`AND`).

- Example for `OR`

```ts
// Extract users that have a salary `equal` to "200_000" `or` that work at "floor 3"

/* rest of the code... */
  company: forest.condition().number([
    { operator: '===', value: 200_000, path: 'company.salary' }, 
    { operator: '===', value: 3, path: 'company.department.floor' }
  ])
/* rest of the code... */

// Same thing here

/* rest of the code... */
  company: forest.condition().number([
    { operator: '===', value: 200_000, path: 'company.salary' }, 
    { operator: '===', value: 3, path: 'company.department.floor' },
    'OR' // We explicitly specify 'OR'
  ])
/* rest of the code... */
```

- Example for `AND`

```ts
// Extract users that have a salary equal to "200_000" `and` that work at "floor 3"

/* rest of the code... */
  company: forest.condition().number([
    { operator: '===', value: 200_000, path: 'company.salary' }, 
    { operator: '===', value: 3, path: 'company.department.floor' }
    'AND' // All conditions should match
  ])
/* rest of the code... */
```

When using a `number` condition, note that the value should always be a **number**. 

You'll see later how to apply multiple conditions on fields of different types. Just follow me !

If you specify an invalid path, the transaction won't fail. Instead, it will simply act as if no feed matches the filter. For an `updateAll` operation, nothing will be updated;
for a `get` operation, it will return an empty array; and for a `delete` operation, nothing will be deleted.

- ### `!==` operator

```ts
// Extract users that have a salary `different` from "200_000""
/* rest of the code... */
  company: forest.condition().number({ operator: '!==', value: 200_000, path: 'company.salary' })
/* rest of the code... */
```

- ### `>` operator

```ts
// Extract users that have a salary `superior` to "200_000""
/* rest of the code... */
  company: forest.condition().number({ operator: '>', value: 200_000, path: 'company.salary' })
/* rest of the code... */
```

- ### `>=` operator

```ts
// Extract users that have a salary `superior or equal` to "200_000""
/* rest of the code... */
  company: forest.condition().number({ operator: '>=', value: 200_000, path: 'company.salary' })
/* rest of the code... */
```

- ### `<` operator

```ts
// Extract users that have a salary `inferior` to "200_000""
/* rest of the code... */
  company: forest.condition().number({ operator: '<', value: 200_000, path: 'company.salary' })
/* rest of the code... */
```

- ### `<=` operator

```ts
// Extract users that have a salary `inferior or equal` to "200_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '<=', value: 200_000, path: 'company.salary' })
/* rest of the code... */
```

- ### `%` operator

```ts
// This example isn't really suitable for "modulo," but just know that you can use it.
// Extract users that have a salary `divisible` by "200"
/* rest of the code... */
  company: forest.condition().number({ operator: '%', value: 200, path: 'company.salary' })
/* rest of the code... */
```

- ### `<>` operator

```ts
// Extract users that have a salary in the range of "100_000" to "200_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '<>', value: [100_000, 200_000], path: 'company.salary' })
/* rest of the code... */

// Extract users that have a salary in the range of "100_000" to "200_000" `or` in the range of "40_000" to "80_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '<>', value: [[100_000, 200_000], [40_000, 80_000]], path: 'company.salary' })
/* rest of the code... */
```

The operator `<>` only accepts one array of two numbers or one array containing multiple sub-arrays of two numbers.

In the second case, the filter succeeds if at least one of the conditions matches. If you add more than two numbers, the transaction will fail.

- ### `!<>` operator

```ts
// Extract users that "don't" have a salary in the range of "100_000" to "200_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!<>', value: [100_000, 200_000], path: 'company.salary' })
/* rest of the code... */

// Extract users that "don't" have a salary in the range of "100_000" to "200_000" `or` in the range of "40_000" to "80_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!<>', value: [[100_000, 200_000], [40_000, 80_000]], path: 'company.salary' })
/* rest of the code... */
```

The operator `!<>` is simply the opposite of `<>`.

- ### `<*>` operator

```ts
// Extract users that have a salary in the range of "100_000" to "200_000" `and` in the range of "80_000" to "120_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '<*>', value: [[100_000, 200_000], [80_000, 120_000]], path: 'company.salary' })
/* rest of the code... */
```

The operator `<*>` is useful when you have multiple ranges and want the filtered value to be included in all of them.

- ### `!<*>` operator

```ts
// Extract users that "don't" have a salary in the range of "100_000" to "200_000" `and` in the range of "80_000" to "120_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!<*>', value: [[100_000, 200_000], [80_000, 120_000]], path: 'company.salary' })
/* rest of the code... */
```

Here, the filtered value should not be included in any of the ranges.

- ### `><` operator

```ts
// Extract users that have a salary `INCLUDED BETWEEN` "120_000" and "200_000" (From "120_001" to "199_999")
/* rest of the code... */
  company: forest.condition().number({ operator: '><', value: [120_000, 200_000], path: 'company.salary' })
/* rest of the code... */

// Extract users that have a salary `INCLUDED BETWEEN` "100_000" and "200_000" `or` `INCLUDED BETWEEN` "40_000" and "80_000" (From "40_001" to "79_999")
/* rest of the code... */
  company: forest.condition().number({ operator: '><', value: [[100_000, 200_000], [40_000, 80_000]], path: 'company.salary' })
/* rest of the code... */
```

When using `>` and `<`, the edge values are excluded from the range.

- ### `!><` operator

```ts
// Extract users that "don't" have a salary `INCLUDED BETWEEN` "120_000" and "200_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!><', value: [120_000, 200_000], path: 'company.salary' })
/* rest of the code... */

// Extract users that "don't" have a salary `INCLUDED BETWEEN` "100_000" and "200_000" `or` `INCLUDED BETWEEN` "40_000" and "80_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!><', value: [[100_000, 200_000], [40_000, 80_000]], path: 'company.salary' })
/* rest of the code... */
```

- ### `>*<` operator

```ts
// Extract users that have a salary `INCLUDED BETWEEN` "100_000" to "200_000" `and` `INCLUDED BETWEEN` "80_000" to "120_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '>*<', value: [[100_000, 200_000], [80_000, 120_000]], path: 'company.salary' })
/* rest of the code... */
```

- ### `!>*<` operator

```ts
// Extract users that "don't" have a salary in the range of "100_000" to "200_000" `and` in the range of "80_000" to "120_000"
/* rest of the code... */
  company: forest.condition().number({ operator: '!>*<', value: [[100_000, 200_000], [80_000, 120_000]], path: 'company.salary' })
/* rest of the code... */
```

- ### `<?>` operator

```ts
// Extract users that have a salary that match at least one these values
/* rest of the code... */
  company: forest.condition().number({ operator: '<?>', value: [75_000, 100_000, 200_000, 80_000, 120_000], path: 'company.salary' })
/* rest of the code... */
```

- ### `!<?>` operator

```ts
// Extract users that have a salary that "doesn't" match any these values
/* rest of the code... */
  company: forest.condition().number({ operator: '!<?>', value: [75_000, 100_000, 200_000, 80_000, 120_000], path: 'company.salary' })
/* rest of the code... */
```

- ### `custom` operator

If the standard operators don't suit your needs, no problem ! With `forest`, you can even write your own `custom condition`. This is one of the features that makes `forest` so powerful and flexible.

```ts
// Extract users that have the "half" of their salary "superior to 50_000"
/* rest of the code... */
  company: forest.condition().number({
    operator: 'custom', 
    path: 'company.salary',
    customCondition: (x: { value: number }) => {
      const user_salary = x.value;
      const half_salary = user_salary / 2;
      return half_salary > 50_000 ? true : false;
    }
  })
/* rest of the code... */
```

- **`customCondition`** (`Function`): It receives a `synchronous function` used to perform a custom operation on the targeted field's value. 
The function should always return a boolean (`true` if the feed matches the condition and `false` if the feed doesn't match).

The custom function receives an object containing a **copy** of the value of the targeted field. Even if the value is modified inside the function,
the original value will remain unaffected.

You can do anything inside the function, and even use external variables. It's just a function !

```ts
// External variables
const divide_by = 2;
const minimum = 50_000;

// You can write the function externally to reuse it multiple times or simply to keep your code cleaner.
const myCustomConditionFunc = (x: { value: number }) => {
  const user_salary = x.value;
  const half_salary = user_salary / divide_by;
  return half_salary > minimum ? true : false;
};

// Extract users that have the "half" of their salary "superior to 50_000"
/* rest of the code... */
  company: forest.condition().number({
    operator: 'custom', 
    path: 'company.salary',
    customCondition: myCustomConditionFunc
  })
/* rest of the code... */
```

If your custom function doesn't return a boolean, the transaction will fail.

Be careful ! If you apply a custom condition to a non-existent field, "value" will be **undefined**. It's recommended to check the type of "value" before processing it,
especially when it can be undefined.

> ⚠️ Note: You don't need to specify a "value" when using "customCondition" (it will be ignored).

```ts
/* rest of the code... */

const myCustomConditionFunc = (x: { value: number }) => {
  // Always check the type of "value" first if it can be "undefined" to avoid errors that might stop the transaction.
  if (typeof x.value !== 'number') return false;  // The transaction will detect that the feed doesn't match the condition and will proceed with the other feeds.

  // rest of your code 
  const user_salary = x.value;
  const half_salary = user_salary / divide_by;
  return half_salary > minimum ? true : false;
};

/* rest of the code... */
```

- ### `permutation` option

```ts
// External variable
const divide_by = 2;

// Extract users that have the "half" of their salary "superior to 50_000" - But this time by using a "permutation"
/* rest of the code... */
  company: forest.condition().number({
    operator: '>', 
    value: 50_000,
    path: 'company.salary',
    permutation: (x: { value: number }) => {
      const user_salary = x.value;
      const half_salary = user_salary / divide_by;
      return half_salary;
    }
  })
/* rest of the code... */
```

- **`permutation`** (`Function`): Receives a `synchronous function` that modifies a copy of the target field's value. The function should return
a value of the same type as the original field value.

A permutation is a powerful method that allows you to mutate a **copy** of the field's value for the condition, without affecting the original value.

Any changes to the **copy** won't affect the original value.

You can perform any computation as long as the "permutation" returns a value with a valid type (the same type as the original value). Otherwise, the transaction will fail immediately.

For a "date" field, the permutation will be accepted as long as it returns the date as a string or number.

- ### Deep filtering on `String`

- ### `===` operator

```ts
// Extract users that use "dark theme"
/* rest of the code... */
  preferences: forest.condition().string({ operator: '===', value: 'dark', path: 'preferences.theme' })
  /* OR */
  preferences: forest.condition().string({ operator: '===', value: 'dark', path: 'theme' }) // The path here is different from the first code, but it will have the same effect.
/* rest of the code... */
```

In the second condition, we can use only "theme" (`second key`) because it directly follows "preferences" (`first key`) in the path.

So, you can start a path with the `second key`, though it may sometimes be less clear in terms of readability.

Now, look at the following condition:

```ts
// Extract users that lives in "New york"
/* rest of the code... */
  address: forest.condition().string({ operator: '===', value: 'New york', path: 'address.city' })
/* rest of the code... */
```

On the "dev" branch, the user "01" lives in "New York," but this condition will never find him and will return an empty list.

The reason is simple ! It's because of the **case**. In our condition, we wrote "New york" with a **lowercase** `y` for "york," while it’s **uppercase** in the feed.
Forest is case-sensitive by default.

To fix this, you can either uppercase the `y` or use the `case_sensitive` option in the condition to avoid any issues.

```ts
// Extract users that lives in "New york"
/* rest of the code... */
  address: forest.condition().string({ operator: '===', value: 'New york', path: 'address.city', case_sensitive: false }) // We have disabled case-sensitivity
/* rest of the code... */
```

Now, data from user "01" will be returned. Note that when you disable "case-sensitivity", it will also remove all accents from both sides during comparison,
but the original field value won’t be affected.

Spaces are also removed during comparison, whether `case_sensitive` is disabled or not.

If you're tired of writing `forest.condition()` every time, you can store it in a variable and reuse it like this:

```ts
// Just use "cond" now
const cond = forest.condition();

// Extract users that lives in "New york"
/* rest of the code... */
  preferences: cond.string({ operator: '===', value: 'dark', path: 'preferences.theme' })
  address: cond.string({ operator: '===', value: 'New york', path: 'address.city', case_sensitive: false })
/* rest of the code... */
```

Don't set any type for "cond" (it's not necessary), as doing so will disable auto-suggestion.

- ### `!==` operator

```ts
// Extract users that `doesn't` use "dark theme"
/* rest of the code... */
  preferences: forest.condition().string({ operator: '!==', value: 'dark', path: 'preferences.theme' })
/* rest of the code... */
```

- ### `L==` operator

```ts
// Extract users with an "ID" whose length is `equal` to 27.
/* rest of the code... */
  id: forest.condition().string({ operator: 'L==', value: 27 })
/* rest of the code... */
```

This operator compares only the `char length`. It takes a `number` or a `string` as its value.

If you provide a "string" as the value, it will compare the length of the field's value with the length of your provided value.

- ### `L>` operator

```ts
// Extract users with an "ID" whose length is `superior` to 27.
/* rest of the code... */
  id: forest.condition().string({ operator: 'L>', value: 27 })
/* rest of the code... */
```

- ### `L>=` operator

```ts
// Extract users with an "ID" whose length is `superior` or `equal` to 27.
/* rest of the code... */
  id: forest.condition().string({ operator: 'L>=', value: 27 })
/* rest of the code... */
```

- ### `L<` operator

```ts
// Extract users with an "ID" whose length is `inferior` to 27.
/* rest of the code... */
  id: forest.condition().string({ operator: 'L<', value: 27 })
/* rest of the code... */
```

- ### `L<=` operator

```ts
// Extract users with an "ID" whose length is `inferior` or `equal` to 27.
/* rest of the code... */
  id: forest.condition().string({ operator: 'L<=', value: 27 })
/* rest of the code... */
```

- ### `wL==` operator

```ts
// Extract users that have `2` names.
/* rest of the code... */
  name: forest.condition().string({ operator: 'wL==', value: 2 })
/* rest of the code... */
```

`wL==` works exactly like `L==`, but it compares the `word count` instead of the "char length." Note that the `w` is lowercase.

- ### `wL>` operator

```ts
// Extract users that have more than `2` names.
/* rest of the code... */
  name: forest.condition().string({ operator: 'wL>', value: 2 })
/* rest of the code... */
```

- ### `wL>=` operator

```ts
// Extract users that have at least `2` names.
/* rest of the code... */
  name: forest.condition().string({ operator: 'wL>=', value: 2 })
/* rest of the code... */
```

- ### `wL<` operator

```ts
// Extract users that have less than `2` names.
/* rest of the code... */
  name: forest.condition().string({ operator: 'wL<', value: 2 })
/* rest of the code... */
```

- ### `wL<=` operator

```ts
// Extract users that have `2` names max.
/* rest of the code... */
  name: forest.condition().string({ operator: 'wL<=', value: 2 })
/* rest of the code... */
```

- ### `<>` operator

```ts
// Extract users with the word "soft" in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '<>', value: 'soft', path: 'company.position', case_sensitive: false })
/* rest of the code... */

//  Extract users with at least one of the words in "value" contained in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '<>', value: ['soft', 'engineer', 'tech'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

The operator `<>` checks if the field's value **contains** a particular word. It accepts a string or an array of strings as its value.

If you provide an array of strings, at least one of them must be contained in the field's value to match the condition.

- ### `!<>` operator

```ts
// Extract users that don't have the word "soft" in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '!<>', value: 'soft', path: 'company.position', case_sensitive: false })
/* rest of the code... */

// Extract users that don't have at least one of the words in "value" contained in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '!<>', value: ['soft', 'engineer'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

- ### `<*>` operator

```ts
// Extract users that have all of the words in "value" contained in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '<*>', value: ['soft', 'engineer'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

- ### `!<*>` operator

```ts
// Extract users that have none of the words in "value" contained in their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '!<*>', value: ['soft', 'engineer'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

- ### `<?>` operator

```ts
// Extract users that have at least one of the words in "value" equal to their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '<?>', value: ['software engineer', 'tech'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

The operator `<?>` is used to check if the field's value is **equal (===)**  to one the string inside "value".

- ### `!<?>` operator

```ts
// Extract users that have at least one of the words in "value" not equal to their position title.
/* rest of the code... */
  company: forest.condition().string({ operator: '!<?>', value: ['soft', 'engineer'], path: 'company.position', case_sensitive: false })
/* rest of the code... */
```

It's the contrary of `<?>`.

- ### `custom` operator

```ts
// Extract users with an "ID" whose length is `equal` to 27.
/* rest of the code... */
  id: forest.condition().string({
    operator: 'custom', 
    customCondition: (x: { value: string }) => {
      const user_id = x.value;
      const id_length = user_id.length;
      return id_length === 27 ? true : false;
    }
  })
/* rest of the code... */
```

You can use a `custom condition` with the `case_sensitive` option here.

If `case_sensitive` is set to false, the "value" will be returned in lowercase with accents removed.

- ### `permutation` option

```ts
// 1. With "permutation", add "ENGINEER" to positions that don't contain it.
// 2. Extract users that have "engineer" in their position. So, all users.
/* rest of the code... */
  company: forest.condition().string({
    operator: '<>', 
    value: 'engineer',
    path: 'company.position',
    case_sensitive: false,
    permutation: (x: { value: string }) => {
      let user_position = x.value; // "x.value" will be lowercase because of "case_sensitive" set to false - Be very carefull about thoses details
      if (!user_position.includes('engenieer')) user_position = user_position + ' ENGINEER';
      return user_position;
    }
  })
/* rest of the code... */
```

The transaction above will return all users because of what we did inside the "permutation," but note that the "original" user's position has not been modified at all.

Also, even though we added "ENGINEER" in capital letters, it will be lowercased because the returned value of the "permutation" will be lowercase due to `case_sensitive` being set to false.
  
- ### Deep filtering on `Date`

When it comes to date management, `forest` provides the best precision possible. Its default date schema looks like this: **`YYYY-MM-DDTHH:mm:ss.sss++HH:+mm`**.

- **`YYYY`**: The year.

- **`MM`**: The month.

- **`DD`**: The date.

- **`HH`**: The hour.

- **`mm`**: The minutes.

- **`ss`**: The seconds.

- **`sss`**: The milliseconds.

- **`+HH`**: The UTC hour.

- **`+mm`**: The UTC minutes.

Now, let's see how it works in practice.

- ### `===` operator

```ts
// Extract users created on '2024/03/07'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '===', value: '2024/03/07' })
/* rest of the code... */
```

When working with dates in `forest`, it's important to remember that specifying a date directly (e.g. `createdAt: '2024/02/07'`) will treat the date as a simple string, 
and passing a timestamp this way will treat it as a simple number. To properly manipulate dates, always use the `date` condition.

The condition you see above might seem simple, but there’s more happening under the hood. For example, user "01" has a `createdAt` field with a value of `2024-03-07T12:00:00Z`.
The date in the condition is only `2024/03/07`, which lacks the time component.

If you use `new Date('2024/03/07').toISOString()`, you will get `2024-03-06T23:00:00.000Z`, which is different from the user’s date. However, if you use `new Date('2024-03-07').toISOString()`,
you get `2024-03-07T00:00:00.000Z`, which matches the date but has a time of `00:00:00`.

If you convert these dates to timestamps, you’ll see differences in their numeric values, which would cause the condition to fail.

To address this, `forest` builds a schema for each date and uses it for precise comparisons. In this case, the user’s date (`2024-03-07T12:00:00Z`) has the schema `YYYY-MM-DDTHH:mm:ss`,
while the condition’s date (`2024/03/07`) has the schema `YYYY-MM-DD`. The schema for the user date will be scaled down to match the condition date, excluding unnecessary time data,
ensuring an accurate comparison.

If you modify the condition to include a time (`2024/03/07 11:00`), the schema of both the user date and condition date will be scaled accordingly. However, the condition will
fail if the times are different.

You can also use different date formats, like `03/07/2024` (**MM/DD/YYYY**) or `07/03/2024` (**DD/MM/YYYY**). However, avoid using both formats in the same app to prevent
confusion between the month and day.

- ### `!==` operator

```ts
// Extract users `not` created on '2024/03/07'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '!==', value: '2024/03/07' })
/* rest of the code... */
```

- ### `>` operator

```ts
// Extract users created `after` '2024/03/07 09:00'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '>', value: '2024/03/07 09:00' })
/* rest of the code... */
```

- ### `>=` operator

```ts
// Extract users created on '2024/03/07' or `after`
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '>=', value: '2024/03/07' })
/* rest of the code... */
```

- ### `<` operator

```ts
// Extract users created `before` '2024/03/07 15:05:20'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '<', value: '2024/03/07 15:05:20' })
/* rest of the code... */
```

- ### `<=` operator

```ts
// Extract users created on '2024/03/07 15:09:00.524' or `before`
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '<=', value: '2024/03/07 15:09:00.524' }) // Here we precise the milliseconds
/* rest of the code... */
```

- ### `<>` operator

```ts
// Extract users created `from` '2024/02/07' `to` '2024/03/07'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '<>', value: ['2024/02/07', '2024/03/07'] })
/* rest of the code... */

// Extract users created `from` '2024/01/07' `to` '2024/03/07' or `from` '2024/02/04' to '2024/03/02'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '<>', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

The operator `<>` works with ranges of two dates. The value can be either an array of two dates or an array containing many sub-arrays of two dates.
Even if you put the dates in the wrong order, `forest` will automatically correct the ranges in ascending order.

At least one range should match the condition.

You can use timestamp directly, but only if both values are timestamps. Otherwise, accuracy may be lost, as timestamp in ISO format includes the full schema.

- ### `!<>` operator

```ts
// Extract users `not` created `from` '2024/01/07' `to` '2024/03/07' or `from` '2024/02/04' to '2024/03/02'
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '!<>', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

At least one range should not match the condition.

- ### `<*>` operator

```ts
// Extract users updated `from` '2024/01/07' `to` '2024/03/07' and `from` '2024/02/04' to '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '<*>', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

The operator `<*>` works like `<>`, except that every range should match the condition.

- ### `!<*>` operator

```ts
// Extract users `not` updated `from` '2024/01/07' `to` '2024/03/07' and `from` '2024/02/04' to '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '!<*>', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

Here, no range should match the condition.

- ### `><` operator

```ts
// Extract users updated `between` '2024/02/07' `and` '2024/03/07'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '><', value: ['2024/02/07', '2024/03/07'] })
/* rest of the code... */

// Extract users updated `between` '2024/01/07' `and` '2024/03/07' or `between` '2024/02/04' and '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '><', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

Ranges at the edge are excluded.

- ### `!><` operator

```ts
// Extract users `not` updated `between` '2024/01/07' `and` '2024/03/07' or `between` '2024/02/04' and '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '!><', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

- ### `>*<` operator

```ts
// Extract users updated `between` '2024/01/07' `and` '2024/03/07' and `between` '2024/02/04' and '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '>*<', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

- ### `!>*<` operator

```ts
// Extract users `not` updated `between` '2024/01/07' `and` '2024/03/07' and `between` '2024/02/04' and '2024/03/02'
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '!>*<', value: [['2024/01/07', '2024/03/07'], ['2024/02/04', '2024/03/02']] })
/* rest of the code... */
```

- ### `<?>` operator

```ts
// Extract users whose "createdAt" is equal to at least one of the entries inside "value"
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '<?>', value: ['2024/01/07', '2024/03/07'] })
/* rest of the code... */
```

- ### `!<?>` operator

```ts
// Extract users whose "createdAt" is not equal to none of the entries inside "value"
/* rest of the code... */
  updatedAt: forest.condition().date({ operator: '!<?>', value: ['2024/01/07', '2024/03/07'] })
/* rest of the code... */
```

- ### `=Q1` operator

```ts
// Extract users created in the "first quarter" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=Q1', year: 2024 })
/* rest of the code... */
```

- ### `=Q2` operator

```ts
// Extract users created in the "second quarter" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=Q2', year: 2024 })
/* rest of the code... */
```

- ### `=Q3` operator

```ts
// Extract users created in the "third quarter" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=Q3', year: 2024 })
/* rest of the code... */
```

- ### `=Q4` operator

```ts
// Extract users created in the "fourth quarter" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=Q4', year: 2024 })
/* rest of the code... */
```

- ### `=S1` operator

```ts
// Extract users created in the "first semester" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=S1', year: 2024 })
/* rest of the code... */
```
- ### `=S2` operator

```ts
// Extract users created in the "second semester" of 2024
/* rest of the code... */
  createdAt: forest.condition().date({ operator: '=S2', year: 2024 })
/* rest of the code... */
```

- ### `custom` operator

Like seen above, you can also use a custom condition.

- ### `permutation` option

As seen above, you can also use a 'permutation,' and it should return a valid date as a string or number.

- ### Deep filtering on `Boolean`

```ts
// Extract users that `can` receive notifications by email
/* rest of the code... */
  preferences: forest.condition().boolean({ operator: '===', value: true, path: 'preferences.notifications.email' })
/* rest of the code... */

// Extract users that `cannot` receive notifications by email
/* rest of the code... */
  preferences: forest.condition().boolean({ operator: '!==', value: true, path: 'preferences.notifications.email' })
/* rest of the code... */
```

- ### Deep filtering on `Object`

Here's the corrected version:

With an `object` condition, you can do everything seen above, and you can also perform condition filtering on fields of type `array` and `json`.

- ### **For array**

- ### `[?]` operator

```ts
// Extract users that have "aws" inside their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[?]', value: 'aws' })
/* rest of the code... */

// Extract users that have "aws" or "remote" inside their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[?]', value: ['aws', "remote"] })
/* rest of the code... */
```

The operator `[?]` allows you to check if the condition's value is contained inside a field of type array. It accepts a value of any type supported by `forest`.

If you pass an array to "value," its content will be checked, not the array itself.

When you pass an object, it will be stringified before the check. Since the array can contain string data, you can use `case_sensitive`.

```ts
// Extract users that have "aws" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[?]', value: 'AWS', case_sensitive: false })
/* rest of the code... */

// Extract users that have "aws" or "remote" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[?]', value: ['AWS', "REMOTE"], case_sensitive: false })
/* rest of the code... */
```

- ### `![?]` operator

```ts
// Extract users that `doesn't` have "aws" or "remote" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '![?]', value: 'aws' })
/* rest of the code... */
```

At least one value should not match.

- ### `[*]` operator

```ts
// Extract users that have `everything` inside "value" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[*]', value: ['aws', "REMOTE"], case_sensitive: false })
/* rest of the code... */
```

Every content of the value should be contained inside the field's value.

It only works with an array of data.

- ### `![*]` operator

```ts
// Extract users that don't have `anything` inside "value" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '![*]', value: ['aws', "remote"] })
/* rest of the code... */
```

- ### `[=]` operator

```ts
// Extract users that have `everything` inside "value" in their tags
/* rest of the code... */
  tags: forest.condition().object({ operator: '[=]', value: ["reMOte", "JavaScript", "DEVELOPER"], case_sensitive: false })
/* rest of the code... */
```

Forest doesn't apply unnecessary stringification everywhere. First, it checks if the condition value contains objects.

If it doesn't contain any objects, nothing is stringified on either side. However, if it contains even one object, that object will be stringified.
On the field's value side, not only will existing objects be stringified, but also every string, to avoid the issue where a stringified object matches a pure object.

This ensures a clean and precise comparison.

- ### **For json**

- ### `{k}` operator

```ts
// Extract users that have the key `cardType` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{k}', value: 'cardType' })
/* rest of the code... */

// Extract users that have the key `cardType` or `billing` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{k}', value: ['cardType', 'BILLING'], case_sensitive: false })
/* rest of the code... */
```

- ### `!{k}` operator

```ts
// Extract users that `doesn't` have the key `cardType` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{k}', value: 'cardType' })
/* rest of the code... */

// Extract users that `doesn't` have the key `cardType` or `billing` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{k}', value: ['cardType', 'BILLING'], case_sensitive: false })
/* rest of the code... */
```

- ### `{k*}` operator

```ts
// Extract users that have the keys `cardType` and `billing` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{k*}', value: ['cardType', 'BILLING'], case_sensitive: false })
/* rest of the code... */
```

- ### `!{k*}` operator

```ts
// Extract users that `doesn't` have the keys `cardType` and `billing` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{k*}', value: ['cardType', 'BILLING'], case_sensitive: false })
/* rest of the code... */
```

- ### `{v}` operator

```ts
// Extract users that have the value `Visa` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{v}', value: 'Visa' })
/* rest of the code... */

// Extract users that have the value `Visa` or `1234` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{v}', value: ['Visa', 1234], case_sensitive: false })
/* rest of the code... */
```

- ### `!{v}` operator

```ts
// Extract users that `doesn't` have the value `Visa` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{v}', value: 'Visa' })
/* rest of the code... */

// Extract users that `doesn't` have the value `Visa` or `1234` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{v}', value: ['Visa', 1234], case_sensitive: false })
/* rest of the code... */
```

- ### `{v*}` operator

```ts
// Extract users that have the values `instapayment` and `Heling` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '{v*}', value: ['instapayment', 'Heling'], case_sensitive: false })
/* rest of the code... */
```

- ### `!{v*}` operator

```ts
// Extract users that `doesn't` have the values `instaPayment` and `VISA` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object({ operator: '!{v*}', value: ['instaPayment', 'VISA'], case_sensitive: false })
/* rest of the code... */
```

- ### `{=}` operator

```ts
// Extract users that have "metadata" `equal` to `{ "signupSource": "web", "referralCode": "XYZ123" }` 'OR' `{ "signupSource": "web", "referralCode": "XYZ456" }`
/* rest of the code... */
  metadata: forest.condition().object(
    [
      { operator: '{=}', value: { "signupSource": "web", "referralCode": "XYZ123" }, case_sensitive: false }
      { operator: '{=}', value: { "signupSource": "web", "referralCode": "XYZ456" }, case_sensitive: false }
    ],
    'OR' // `OR` or `AND`
  )
/* rest of the code... */
```

This operator allows you to compare two JSON objects.

You can use an array of different conditions on a single field and choose between `OR` (default) or `AND` to define how Forest should resolve them.

The real power of the "object" condition lies in its ability to filter different fields of different types simultaneously. This makes it a powerful tool for 
complex conditions and multi-field filtering.

Example:

```ts
// Extract users that `don't` have the values `instaPayment` and `VISA` inside "paymentInfo"
/* rest of the code... */
  paymentInfo: forest.condition().object([
    { operator: '===', value: 'Visa', path: 'paymentInfo.cardType', case_sensitive: false }, // filtering a "string"
    { operator: '<>', value: [2153, 1662], path: 'paymentInfo.last4' }, // filtering a "number"
    { operator: '{v}', value: 'Los Angeles', path: 'paymentInfo.billing', case_sensitive: false }, // filtering a "json" object's values 
  ])
/* rest of the code... */
```

### Facts about conditions

- You can use predefined `operators` and `paths` to perform practical operations on deeply nested fields..

- You can use conditions on data types such as `number`, `string`, `boolean`, `date`, and `object` (including `array` and `json`).

- You can apply multiple conditions to a single field and set `OR` (default) or `AND` to choose how `forest` should resolve them.

- You can use the `object` condition to perform various other conditions and even filter multiple fields of different types simultaneously.

- You can use `permutation` and `customCondition` to perform complex operations on the data when needed. These methods allow you to
modify or filter the data dynamically based on your specific requirements.

- A `permutation` never modifies the original data; it only works with a copy. This allows you to perform operations, transformations, or 
filtering on the data without altering the original source, ensuring data integrity while still being able to make changes as needed for specific use cases.

- A `customCondition` should always return a `boolean`: `true` for a "match" and `false` for "no match." This ensures that the condition behaves predictably
and can be used effectively in filtering or querying operations within the system.

Finally, when specifying a path, we can also reach data inside an array by using the data index.

```ts
// Extract users that have `developer` as first tag
/* rest of the code... */
  tags: forest.condition().object({ operator: '===', value: 'developer', path: 'tags.0', case_sensitive: false })
  // or
  tags: forest.condition().string({ operator: '===', value: 'developer', path: 'tags.0', case_sensitive: false })
  // It also works for others types of condition.
/* rest of the code... */
```

When `forest` find a number inside a path, it'll automatically detect if it's an **index** or a **key**, based upon the type of the field. 

### **Mutations**

This is another key concept of `forestDB` that makes it very powerful for data management.

`Mutation` allows you to modify your data without limits. It provides easy-to-use APIs to manipulate data of type `number`, `string`, `boolean`, and `object`.

- ### **Mutation on `Number`**

- ### `Set` action

```ts
// user ID
const user_01 = '01_JNRS1WCD1MK6FRZG87ZA7Y6Q';

// Add a new field to user "01" feed
const set_new_field = await forest.onTree('users')
  .update({
    id: user_01,   // Remember that for `update` transaction we always need to specify the feed's ID and don't need to specify any branch
    newField: 123  // Our new field
    // or
    newField: forest.mutation().number({ action: 'set', value: 123 }) // If the feed exists it will be overwrited, else it'll be updated
  })
  .join('get')
  .get(['id', 'name', 'age', 'email', 'company', 'address', 'preferences', 'orderHistory', 'tags']).fromBranch('dev').where({ id: user_01 })
  .end();
```

To see the result of the `get` transaction you can do `console.log(set_new_field.data['get'])`.

You can build a new field with a nested field directly like this:

```ts
// Increment the age by "2"
/* rest of the code... */
  .update({
    id: user_01,
    newField: forest.mutation().number([
      { action: 'set', value: 0, path: 'new_nested_path_0.value' },
      { action: 'set', value: 1, path: 'new_nested_path_1.value' },
      { action: 'set', value: 2, path: 'new_nested_path_2.value' }
    ])
  })
/* rest of the code... */
```

Even if those paths don't exist, it'll automatically create them. So you'll get something like this:

```sh
# log

{
  # other_fields...
  newField: {
    new_nested_path_0: { value: 0 },
    new_nested_path_1: { value: 1 },
    new_nested_path_2: { value: 2 }
  }
}
```

But keep in mind that it only works like that when you use a `set` action. For others, if the field doesn't already exist, the mutation will beautifully fail.

- ### `increment` action

```ts
// Increment the age by "2"
/* rest of the code... */
  .update({
    id: user_01,
    age: forest.mutation().number({ action: 'increment', value: 2 })
  })
/* rest of the code... */
```

- **`.mutation()`**: The function that tells `forest` we want to use a mutation.

- **`.number(x)`**: The function that tells `forest` we want to mutate a field of type `number`. It can receive one object or an array of objects,
with each object containing the following properties:

  - **`action`**: Indicates the type of operation to be performed.
    
  - **`value`**: The value used to modify the field.

  - **`path?`**: Specifies the `endpoint`, the final field on which you want to apply the mutation.  It's optional, because if the `starting point` is also the `endpoint`,
  you don't need to set a path.

  - **`keepPositive`**: If specified, it will set a negative number to 0, ensuring the field value remains positive.

  - **`customMutation`**: Allows you to execute your own function to modify a field. It only acceptst `synchronous` functions.

Now add "age" to `get` and log to see its new value.

- ### `decrement` action

```ts
// Decrement the age "2"
/* rest of the code... */
  .update({
    id: user_01,
    age: forest.mutation().number({ action: 'decrement', value: 2 })
  })
/* rest of the code... */
```

- ### `multiply` action

```ts
// Multiply the age "2"
/* rest of the code... */
  .update({
    id: user_01,
    age: forest.mutation().number({ action: 'multiply', value: 2 })
  })
/* rest of the code... */
```

- ### `devide` action

```ts
// Divide the age "2"
/* rest of the code... */
  .update({
    id: user_01,
    age: forest.mutation().number({ action: 'divide', value: 2 })
  })
/* rest of the code... */
```

- ### `increaseBy` action

```ts
// Increase the salary by "5%"
/* rest of the code... */
  .update({
    id: user_01,
    company: forest.mutation().number({ action: 'increaseBy', value: 5, path: 'company.salary' })
  })
/* rest of the code... */

// Increase the salary by "5%" and then by "2%"
/* rest of the code... */
  .update({
    id: user_01,
    company: forest.mutation().number([
      { action: 'increaseBy', value: 5, path: 'company.salary' },
      { action: 'increaseBy', value: 2, path: 'company.salary' } // Here it's the result of the first increase that will be process
    ])
  })
/* rest of the code... */
```

- ### `decreaseBy` action

```ts
// Decrease the salary by "5%"
/* rest of the code... */
  .update({
    id: user_01,
    company: forest.mutation().number({ action: 'decreaseBy', value: 5, path: 'company.salary' })
  })
/* rest of the code... */
```

- ### `custom` action

```ts
// Divide the salary by "2"
/* rest of the code... */
  .update({
    id: user_01,
    company: forest.mutation().number({ 
      action: 'custom',
      path: 'company.salary',
      customMutation: (x: { value: number }) => {
        const current_salary = x.value;
        const new_salary = current_salary / 2; // user "01" won't be really happy
        return new_salary;
      }
    })
  })
/* rest of the code... */
```

- ### **Mutation on `String`**

- ### `Set` action

```ts
// Set a new field of type "string"
/* rest of the code... */
  .update({
    id: user_01,
    newStringField: 'new_value'
  })
/* rest of the code... */
```

- ### `concat_before` action

```ts
// Add `Mr ` "before" the name
/* rest of the code... */
  .update({
    id: user_01,
    name: forest.mutation().string({ action: 'concat_before', value: 'Mr ', }) // Note the space after "Mr"
  })
/* rest of the code... */
```

- ### `concat_after` action

```ts
// Add `City` "after" the city name
/* rest of the code... */
  .update({
    id: user_01,
    address: forest.mutation().string({ action: 'concat_after', value: ' City', path: 'address.city' }) // Note the space before "City"
  })
/* rest of the code... */
```

- ### `lower` action

```ts
// LowerCase the city name
/* rest of the code... */
  .update({
    id: user_01,
    address: forest.mutation().string({ action: 'lower', path: 'address.city' }) // No need to specify a "value"
  })
/* rest of the code... */
```

- ### `upper` action

```ts
// UpperCase the email
/* rest of the code... */
  .update({
    id: user_01,
    email: forest.mutation().string({ action: 'upper'}) // No need to specify a "value"
  })
/* rest of the code... */
```

- ### `custom` action

```ts
// Replace '@example' by '@forestdb'
/* rest of the code... */
  .update({
    id: user_01,
    email: forest.mutation().string({ 
      action: 'custom',
      customMutation: (x: { value: string }) => {
        const current_email = x.value;
        const new_email = current_email.replace('@example', '@forestdb');
        return new_email;
      }
    })
  })
/* rest of the code... */
```

- ### **Mutation on `Boolean`**

- ### `Set` action

Same logic.

- ### `invert_boolean` action

```ts
// UpperCase the email
/* rest of the code... */
  .update({
    id: user_01,
    preferences: forest.mutation().boolean({ action: 'invert_boolean', path: 'preferences.newsletter' }) // No need to specify a "value" - It apply only to the field's value
  })
/* rest of the code... */
```

- ### `custom` action

Same logic, except it should return a `boolean`.

- ### **Mutation on `Object`**

`Object` mutation supports all other mutation types. So, it's useful when you need to manipulate many fields of different types at once.

- ### `Set` action

Same logic.

- ### `assign` action

```ts
// Add "hire" field to `company`
/* rest of the code... */
  .update({
    id: user_01,
    company: forest.mutation().object({ action: 'assign', value: { hire: '2024-03-07T12:00:00Z'} })
  })
/* rest of the code... */
```

This action works on `json` fields only. It allows you to merge two JSON objects.

The mutation's value should be a JSON object.

- ### `push` action

```ts
// Push new order into `orderHistory`
/* rest of the code... */
  .update({
    id: user_01,
    orderHistory: forest.mutation().object({ action: 'push', value: { "orderId": "ORD777", "amount": 199, "date": "2024-03-18" } })
  })
/* rest of the code... */
```

- ### `push_content` action

```ts
// Push the content of "value" into `tags`
/* rest of the code... */
  .update({
    id: user_01,
    tags: forest.mutation().object({ action: 'push_content', value: ['kubernetes', 'caddy', 'prometheus']})
  })
/* rest of the code... */
```

Here, if you use `push`, it's the array itself that will be pushed, not its contents.

- ### `custom` action

Same logic. It should always return a value of the same type as the field's value for safety; otherwise, the mutation will fail.

If you need to update a field with a value of another type, just use a `set` mutation to overwrite the current value.

### Facts about Mutations

- Mutations are powerful and apply only if the transaction succeeds.

- Mutations are type-safe unless you choose to overwrite a value with a `set` mutation.

- There's absolutely no limit to what you can do, as you can use a `customMutation` to perform any computation you want.

- You can only `call` mutations on top-level keys.

### **Return**

It's a very useful function that allows you to retrieve a `feed`, data from the `Store`, and the `Session` quickly and synchronously.

```ts
// Get user "01" data synchronously

// First you need the feed ID, which in our case is also the user ID
const feedID = '01_JNRS1WCD1MK6FRZG87ZA7Y6Q';

// Get all fields
const full_data = forest.return('*').fromFeed(feedID);

// Get "id", "name", "email", "position" and "salary"
const some_data = forest.return(['id', 'name', 'email', 'company.position', 'company.salary']).fromFeed(feedID);
```

Instead of making an async "get" request, we can simply use the `return` function to retrieve data just-in-time.

It's incredibly useful when you need to retrieve user data the fastest way possible when your component is mounting, instead of making an async `get` request inside
a `useEffect` (in **React**, for example).

You will never need to specify any **tree** or **branch**, `forest` will handle everything automatically for you thanks to an efficient indexing.

As always, it will return a JSON object containing the `status`, `log`, and `data`.

The data returned is a deep copy of the original. So, any modification made upon it will never affect the original data inside `forest`.

If you try to retrieve a **field** that doesn't exist, its value will be **"undefined"**, and if the feed itself doesn't exist, the `data` will be **"undefined"**,
the `status` will be **"error"**, and the `log` will tell you what's wrong.

### **Store**

The `Store` is a very fast key-value pair storage that allows you to store, mutate, and retrieve data synchronously.

Its main role is to let you manage states and unstructured data easily and access them from anywhere in your app quickly.

It also provides powerful and useful functionalities that help you handle data with remarkable ease.

- ### Add or set data

```ts
// set some data
const store = forest.store({
  'current_user_id': 'xyz',
  'current_page_id': 'some_id',
  'some_component_id': {
    'state_0': 0,
    'state_1': true,
    'state_2': 'anything_you_want'
  },
  'current_user_settings': { /* some settings info... */ },
  // and more...
});

// return data from "Store"
const store_data = forest.return('*').fromStore();
```

You can even use paths to set or build a JSON object directly into the **Store**, like this:

```ts
// set some user data
const store = forest.store({
  'user.id': 'AEhcko245jgl4RDkmm09f',
  'user.age': 24,
  'user.name': 'Paul Doe',
  'user.preference.color': 'Blue',
  'user.preference.pets': ['Dogs', 'Cats'],
  'user.job.position': 'Software Engeneer',
  'user.job.salary': 200_000,
  'user.job.tags': ['react', 'forestDB', 'tailwind'],
  'user.computer': 'Macbook Pro M4 MAx'
});

// return data from the "Store" - Log to see the result
const store_data = forest.return('user').fromStore();
```

It's not finished. Let's say you're in a situation where some keys you need for your JSON object are stored in variables and you can't predict them.

No problem! You can use **string interpolation** to inject variables.

```ts
// Unpredictible keys
let mainKey = 'unpredictibles';
let key_1 = 'key_1';
let key_2 = 'key_2';
let key_3 = 'key_3';

// set data
const store = forest.store({
  '%0': {
    '%1': 'some_value_1',
    '%2': 'some_value_2',
    '%3': 'some_value_3'
  }
}, [mainKey, key_1, key_2, key_3]); // Set the variables in the dependencies array, in the correct order.

// return data from "Store"
const store_data = forest.return(mainKey).fromStore();
```

Now, as you can imagine, `%0` will be replaced by the value at index `0`, `%1` by the value at index `1`, and `%2` by the value at index `2`.

If you log the result, you should see:

```sh
# log 
unpredictible: {
  key_1: "some_value_1",
  key_2: "some_value_2",
  key_3: "some_value_3"
}
```

- ### Update data

You can update data inside the **Store** by overwriting it or by using **Mutations**.

```ts
// Set user name and age
const set_user = forest.store({
  'user.name': 'Paul',
  'user.age': 24
});


// Update user name by `overwrite`
const update_name = forest.store({
  'user.name': 'Paul M. Johnson'
});


// Update user age with a `mutation`
const update_age = forest.store({
  'user': forest.mutation().number({ action: 'increment', value: 1, path: 'user.age' }) // Now age will be "25"
   
  // Be careful and don't do this.
  'user.age': forest.mutation().number({ action: 'increment', value: 1, path: 'user.age' })
  // Here, we're calling a mutation directly on "age," which is a nested key, and it won't work.  
  // You can only "call" a mutation on a "top-level" key, as we did initially.
});


// return user data 
const user_data = forest.return('user').fromStore();
```

- ### Delete data

```ts
// Delete user age
const del_age = forest.store({
  'user.age': undefined
});
```

To delete a field from the **Store**, just set it to `undefined`.

When you set a field to `undefined`, the change is applied **immediately**, but the actual deletion is **delayed**, meaning the function will finish executing before the
undefined fields are deleted **0.5ms** later.

The reason it works this way is that in the Store, a **delete** operation is not an urgent task. Whether a field exists with `undefined` as its value or doesn't exist at all,
you'll always get `undefined` when trying to access it.

By doing so, you'll always maintain great performance when performing large operations on the Store, as `set` and `update` operations are prioritized.

So, what happens if the value of the field changes from `undefined` to another value just before the deletion function starts executing ?

It's simple, the field won't be deleted anymore because it's no longer `undefined`. **So, you'll never lose your data.**

### **Session**

The **Session** is the twin of the **Store**. They work exactly the same way but serve different purposes.

The only goal of the Session is to store data that will be used to `filter` clients and servers during WebSocket messaging or broadcasting.

By default, it always contains an auto-generated `id` property that can be changed but never deleted. You can view it by returning the content of your Session:

```ts
// Return all data from the Session
const sid = forest.return('*').fromSession();
console.log(sid);
```

If you log the result, you'll see your current session ID. However, it's not recommended to leave it as is, because it will change every time you restart `forest`.

The best setup is to change it to the current user ID, for example, on the frontend after the user logs in, and to a permanent ID on the backend.

Here's how to do it:

```ts
// On frontend you can change the seesion ID just when user login
const update_sid_front = forest.session({ id: 'your_current_user_id' });

// On backend you can change the session ID just after the initialization function
const update_sid_back = forest.session({ id: 'my_permanent_server_id' });
```

The session ID should always be a **non-empty string**. Any other value will be immediately rejected. Never assign the same Session ID to multiple clients or servers
connected together to avoid collisions and undesirable effects.

Additionally, please keep the **Session** light, containing only the data you'll use to filter clients and servers.

### **Watchers**

This is one of my favorite functionalities in `forest`. Believe me, you'll never struggle to keep your components up-to-date again. Never!

The `Watchers` are designed for one mission only: to notify you about changes anywhere, at any time, with no overhead and zero re-rendering.

They act like a delivery person who gently places the package you ordered under your door and rings the bell to notify you, while some state
managers act like delivery people who, once at your door, break it down and throw the package onto the floor inside your room (unwanted re-rendering).

There are three types of watchers:

1. ### **Feed watchers**

```ts
// Watch a feed
forest.watch('the_watcher_id').feed('the_feed_id').on({
  // Notify you when the feed is created for the first time or recreated after being deleted.
  set(x: { id: string, data: any }) => { },

  // Notify you everytime the feed is updated 
  update(x: { id: string, data: any }) => { },

  // Notify you when the feed is deleted
  delete(x: { id: string, data: any }) => { }
});
```

- **`watch()`** (`x`): This is the function that tells `forest` that we want to watch for something inside the DB. It receives one argument of type `string`,
which serves as the ID for the watcher and allows you to perform actions with the watcher. If you don't set any ID, one will be automatically generated.

- **`feed()`** (`string | string[]`): This indicates that we want to watch for some events on specific feeds. As an argument, it receives a string or an array of strings,
which are the IDs of the feeds we want to watch.

- **`on()`** (`set?, update?, delete?`): Allows you to specify the events you want to watch for. Each event is optional, and you can choose the ones you need.
They give you access to two pieces of data:
  
  - **`id`**: This is the ID or `mainKey` of the feed. It helps you identify from which feed you're receiving the notification, and it's especially useful
  when you're watching many feeds.

  - **`data`**: The feed's data.

You can set up the watcher for a feed that doesn't even exist yet, and once it's created, the watcher will automatically link to it.
It will never throw an error or crash because the feed doesn't exist or has been deleted.

Let's see how to implement this in a **React** component, for example:

```tsx
import React, { useState, useRef, useEffect } from 'react';
import forest from 'path_to_your_init_file';

/** Component to render users posts */
const PostWidget = (props: { postID: string }) => {
  /* -------------------------------- Constants ------------------------------ */
  
  const refresher = useRef(false);
  const [refresh, setRefresh] = useState(refresher);

  const isMounted = useRef(false);
  const mountCount = useRef(0);

  const postID = props.postID;
  /** 
   * Retrieve post Data
   * Remenber that it'll return "undefined" if the post doesn't exists, so it may be good to check that "postdata" isn't undefined before rendering
   */
  const postData = useRef(forest.return('*').fromFeed(postID));
  

  /* -------------------------------- Methods ------------------------------ */
  
  /** Refresh component */
  const refreshFunc = () => { refresher.current = !refresher.current; setRefresh(refresher.current) };
  
  /** Unmount */
  const unmountFunc = () => {
    /* Prevent from first auto-unmounting caused by "strictMode" */
    mountCount.current += 1; if (mountCount.current === 1) return;

    /* unmount logic */

    /* Clear the post watcher by using its ID */
    forest.useWatcher(postID).clear();
  };

  /** On update */
  const onUpdateFunc = (x: { data: any }) => { 
    const data = x.data;

    /* update the post data */
    postData.current = data;

    /* Refresh the component */
    refreshFunc();
  };

  /** On delete */
  const onDeleteFunc = (x: { data: any }) => { 
    const data = x.data;
    /* Do something.... */
  };


  /* -------------------------------- Effects ------------------------------ */

  /** On mount */
  useEffect(() => {
    if (!isMounted.current) {
      /* Prevent the logic inside the `useEffect` from running twice in 'Dev' mode when the component mounts. */
      isMounted.current = true;

      /* onmount logic */

      /** 
       * Watch the current post 
       * Here we're only watching for "update" and "delete" events
       */
      forest.watch(postID).feed(postID).on({
        /* Notify you everytime the post is updated */
        update(x: { id: string, data: any }) => {
          const id = x.id, data = x.data;

          /** 
            * In the current logic, the "onUpdateFunc" will be executes every time the current post is updated in "forest".
            * Of course, you can add conditions to control when the "onUpdateFunc" will fire or not.
            * Once "forest" notifies you, you become the master of what happens next.
            */
          onUpdateFunc({ data: data });
        },

        /* Notify you when the post is deleted */
        delete(x: { id: string, data: any }) => {
          const id = x.id, data = x.data;
          
          /* Execute "onDeleteFunc" when the post is deleted */
          onDeleteFunc({ data: data });
        }
      });
    }

    /* cleanup function */
    return () => unmountFunc();
  }, []);


  /* return */

  const component = <>{/* your component views... */}</>;
  return(component);
};

export default PostWidget;
```

What you see above is the base structure of all my components, but what you need to care about is how we use **watchers**.

First, when the component mounts, we set up our watcher to listen for **update** and **delete** events. You can see that we use `postID`
as the ID for the watcher, but it doesn't really matter if it's the current post ID (or feed ID). What matters is that the watcher ID is a `unique` and `permanent` string.

If you use an ID that changes, the risk is that the watcher events will be created for each ID. So, when you update or delete the current post,
both `onUpdateFunc` and `onDeleteFunc` will fire more than once. In my component, this behavior will never happen because I've prevented my `useEffect` from running more than once.

It's not mandatory to put your watchers inside a `useEffect`, but in a React context, it's a good practice. Even if you put your watchers outside of a `useEffect`,
as long as you give them a `permanent` or `immutable` ID, they will never be created more than once, even if the component re-renders `10_000_000_000` times per second.
So, just keep in mind that you should **always give a unique and immutable ID to your watcher**.

If you give the same ID to many watchers, the last one will overwrite the previous ones.
So, **when rendering a feed, I recommend you simply set its ID as your watcher ID because it's unique and immutable**.

Second, when the component unmounts, we use `useWatcher` to clear the watcher. We'll talk about this function later.

You can watch many feeds with a single watcher by providing an array of feed IDs. 

2. ### **Branch watchers**

```ts 
// Watch a branch
forest.watch('the_watcher_id').branch('the_branch_id').fromTree('the_name_of_tree_the_branch_belongs_to').on({
  // Notify you when a feed is newly added to the branch
  set: (x: { name: string, data: string[] }) => { },

  // Notify you when a feed is deleted from the branch
  delete: (x: { name: string, data: string[] }) => { },

  // Notify you when the branch is created the first time or recreated after being deleted
  self_create: (x: { name: string, data: string[] }) => { },

  // Notify you when the branch is deleted
  self_delete: (x: { name: string, data: string[] }) => { }
});
```

The principle is the same, and you can also watch many branches with a single watcher.

Since different trees can have branches with the same name, you must specify the tree for clarity. Even if the branch and the tree do not exist,
the watcher will be created but will remain inactive until both the branch and the tree are created.

Finally, `x.name` is the name of the branch, and `x.data` is an array of feed IDs.

3. ### **Store watchers**

```ts 
// Watch the "Store"
forest.watch('the_watcher_id').store().on({
  // Notify you when a field is newly added to the Store
  set: (x: { data: any }) => { },

  // Notify you when a field is deleted from the Store
  update: (x: { data: any }) => { },

  // Notify you when a field is deleted from the Store
  delete: (x: { data: any }) => { }
});
```

For the **Store**, no need for any `id` or `name`; it'll only send `new`, `updated` and `deleted` fields.

4. ### **useWatcher**

A watcher ID is not only useful to avoid event duplication, but it's also useful when you need to manipulate a watcher. To do that, we use the `useWatcher` function.

It allows you to perform four operations: `set`, `add`, `delete`, and `clear`.

- ### **Set operation**

```ts
// Set feeds 
const set_feeds = forest.useWatcher('watcher_01').set('feed', 'the_feed_ID');
// or
const set_feeds = forest.useWatcher('watcher_01').set('feed', ['feed_01', 'feed_02', 'feed_03']);


// Set branches - For branches you must always specify the tree name as the third argument
const set_branches = forest.useWatcher('watcher_02').set('branch', 'the_branch_name', 'tree_name');
// or
const set_branches = forest.useWatcher('watcher_02').set('branch', ['branch_01', 'branch_02', 'branch_03'], 'tree_name');
```

When you use `set`, existing data are overwritten by new ones. 

It will return a JSON object containing, as you already know, the `status`, `log`, and `data`.

- ### **Add operation**

```ts
// Add feeds 
const add_feeds = forest.useWatcher('watcher_01').add('feed', 'the_feed_ID');
// or
const add_feeds = forest.useWatcher('watcher_01').add('feed', ['feed_01', 'feed_02', 'feed_03']);


// Add branches - For branches you must always specify the tree name as the third argument
const add_branches = forest.useWatcher('watcher_02').add('branch', 'the_branch_name', 'tree_name');
// or
const add_branches = forest.useWatcher('watcher_02').add('branch', ['branch_01', 'branch_02', 'branch_03'], 'tree_name');
```

Add new targets to watch. The existing ones won't be overwritten.

- ### **Delete operation**

```ts
// Delete feeds 
const delete_feeds = forest.useWatcher('watcher_01').delete('feed', 'the_feed_ID');
// or
const delete_feeds = forest.useWatcher('watcher_01').delete('feed', ['feed_01', 'feed_02', 'feed_03']);


// Delete branches - For branches you must always specify the tree name as the third argument
const delete_branches = forest.useWatcher('watcher_02').delete('branch', 'the_branch_name', 'tree_name');
// or
const delete_branches = forest.useWatcher('watcher_02').delete('branch', ['branch_01', 'branch_02', 'branch_03'], 'tree_name');
```

Events won't fire anymore for feeds and branches deleted from the watcher.

- ### **Clear operation**

```ts
// Clear the watcher - No event will fire anymore until you "set" and "add" new targets.
const clear_watcher = forest.useWatcher('watcher_01').clear();
```

### Facts about watchers 

- Watchers allow you to perform actions when a change occurs on a `feed`, `branch`, or inside the `Store`.

- Always set a `unique` and `immutable` ID for your watcher to, first, avoid event duplication and, second, to be able to manipulate your watcher with `useWatcher`.

- Watchers never trigger any re-renders; they simply notify and broadcast changes.

- Watchers work both on the frontend and backend.

- There is no limit to how many feeds or branches you can watch with a single watcher.

### **Triggers**

Slowly, we're reaching the end, but the best is still to come. Here, we'll talk about `triggers`, an amazing feature of `forest`. **If you use it once, you cannot unuse it !**

Triggers allow you to execute any function from anywhere in your application, whether it's synchronous or asynchronous, and whether it returns something or nothing. It's as simple as that.

First, you have to create the trigger:

```ts
// Function 01
const function_01 = () => { return 'Hi ! Am function "01" and am synchronous' };


// Function 02
const function_02 = () => { 
  throw new Error('Internal crash test !!!');
  return 'Hi ! Am function "02" and am also synchronous';
};


// Function 03
const function_03 = async () => { return 'Hi ! Am function "03" and am asynchronous' };


// Function 04
const function_04 = async (x?: number) => { 
  const timeout = x || 5000;
  await new Promise(resolve => setTimeout(resolve, timeout));
  return `Hi ! Am function "04", an asynchronous function that takes "${timeout}ms" to resolve`;
};


// Function 05
const function_05 = async (x?: number) => { 
  const timeout = x || 5000;
  await new Promise(resolve => setTimeout(resolve, timeout));
  return `Hi ! Am function "05", an asynchronous function that takes "${timeout}ms" to resolve`;
};


// Function 06
const greetMeFunc = (x: { name: string }) => { return `Hi ${x.name}.` };


// Create trigger
const tg = forest.trigger().create({
  id: 'myTrigger',
  methods: {
    function_01: function_01,
    function_02: function_02,
    function_03: function_03,
    function_04: function_04,
    function_05: function_05,
    greetMeFunc: greetMeFunc
  }
});
```

Now, here's how to execute functions with a trigger:

```ts 
const res = forest.trigger()
  .run('function_01').withArgs() // Here we call "function_01"
  .run('function_02').withArgs() // Here we call "function_02"
  .fromId('myTrigger'); // Here we tell "forest" which trigger to select

console.log(res.data);
```

You should have something like this:

```sh 
# log
myTrigger: {
  function_01: 'Hi ! Am function "01" and am synchronous',
  function_02: '["function_02" crashed] :: Internal crash test !!!'
}
```

As you can see with function '02', even if your function crashes internally, the trigger will handle it gracefully.

Now we'll run 'function_03', which is asynchronous.

```ts 
const res = await forest.trigger('async')
  .run('function_03').withArgs()
  .fromId('myTrigger');

console.log(res.data);
```

```sh
# log
myTrigger: { 
  function_03: 'Hi ! Am function "03" and am asynchronous' 
} 
```

If you call both synchronous and asynchronous functions together in the same trigger, you have to run all of them as async. In the next release,
I'll make it possible for `forest` to automatically detect each function's type and run synchronous ones synchronously and asynchronous ones asynchronously.

```ts 
const res = await forest.trigger('async')
  .run('function_01').withArgs() 
  .run('function_02').withArgs() 
  .run('function_03').withArgs()
  .fromId('myTrigger');

console.log(res.data);
```

```sh
# log
myTrigger: {
  function_01: 'Hi ! Am function "01" and am synchronous',
  function_02: '["function_02" crashed] :: yoshi',
  function_03: 'Hi ! Am function "03" and am asynchronous'
}
```

Functions '04' and '05' are particular because not only do they receive an argument, but by default, they can take up to '5000ms' to resolve.

If you are running more than one asynchronous function that can take longer to resolve, you can run them in `parallel` to save time. By default, functions are run sequentially.

To demonstrate how useful this can be, we'll run '04' and '05' sequentially (the default) the first time and in parallel the second time.

**A. Run functions in `sequence`**

```ts 
console.time('a');

const res = await forest.trigger('async')
  .run('function_04').withArgs(3000) // we give "3s" as timeout
  .run('function_05').withArgs(3000) // same here
  .fromId('myTrigger');

console.timeEnd('a');
console.log(res.data);
```

```sh
# duration log 
duration :: 6005

# data log
myTrigger: {
  function_04: 'Hi ! Am function "04", an asynchronous function that takes "3000ms" to resolve',
  function_05: 'Hi ! Am function "05", an asynchronous function that takes "3000ms" to resolve'
}
```

**B. Run functions in `parallel`**

```ts 
console.time('a');

const res = await forest.trigger('async', 'parallel') // Here we specify "parallel"
  .run('function_04').withArgs(3000) 
  .run('function_05').withArgs(3000)
  .fromId('myTrigger');

console.timeEnd('a');
console.log(res.data);
```

```sh
# duration log 
duration :: 3003 # Now it takes 3000ms 

# data log
myTrigger: {
  function_04: 'Hi ! Am function "04", an asynchronous function that takes "3000ms" to resolve',
  function_05: 'Hi ! Am function "05", an asynchronous function that takes "3000ms" to resolve'
}
```

As you can see, using `parallel` can help you save significant time.

But don't misunderstand how it works. It is efficient only when you're running `longer (in time) asynchronous functions`, not `many asynchronous functions`. Please, keep that in mind !

Now, I'll show you another cool thing with triggers: `alias`.

Let's say that we want to run function '06' (`greetMeFunc`), but we have many people to greet, so we'll run it many times.

```ts 
const res = forest.trigger()
  .run('greetMeFunc').withArgs({ name: 'Messi' }) 
  .run('greetMeFunc').withArgs({ name: 'Ronaldo' })
  .fromId('myTrigger');

console.log(res.data);
```

```sh
# log
myTrigger: { 
  greetMeFunc: "Hi Messi."
}
```

**Where's Ronaldo ?** 

The `greetMeFunc` for **Ronaldo** won't execute because **Messi** is the bes... Uh, excuse me, it won't execute because the function name serves as an ID inside the trigger.
When an ID already exists, any other function with the same ID won't be executed. This happens to prevent the results of functions from being overwritten.

To overcome this issue, we'll simply add an `alias` to our functions. Triggers prioritize `alias` over the function's name.

```ts 
const res = forest.trigger() 
  .run('greetMeFunc', 'goat').withArgs({ name: 'Messi' }) // Here we add "goat" as alias
  .run('greetMeFunc', 'cr7').withArgs({ name: 'Ronaldo' }) // Here we add "cr7" as alias
  .fromId('myTrigger');

console.log(res.data);
```

And now:

```sh
# log
myTrigger: { 
  goat: "Hi Messi.", 
  cr7: "Hi Ronaldo." # Ziuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
}
```

> ⚠️ Note: Don't be too serious in life, or else you can't have fun and GREAT RESPECT for both LEGENDS.

There's one last thing: you can add many triggers with similar functions to the same family and run these functions on all of them.

```ts 
// Create trigger 1
const hello_1_Func = () => { return 'Hello world, from trigger #1' };
const tg1 = forest.trigger().create({
  id: 'trigger_1',
  family: 'hello', // We add trigger 1 to the family 'hello'
  methods: {
    helloFunc: hello_1_Func,
  }
});

// Create trigger 2
const hello_2_Func = () => { return 'Hello world, from trigger #2' };
const tg2 = forest.trigger().create({
  id: 'trigger_2',
  family: 'hello', // We add trigger 2 also to the family 'hello'
  methods: {
    helloFunc: hello_2_Func,
  }
});

const res = forest.trigger()
  .run('helloFunc').withArgs() 
  .fromFamily('hello'); // Here we run "helloFunc" by using the triggers family

console.log(res.data);
```

```sh 
# log 
{
  trigger_1: { 
    helloFunc: "Hello world, from trigger #1" 
  },
  trigger_2: {
    helloFunc: "Hello world, from trigger #2" 
  }
}
```

### Facts about triggers

- Triggers allow you to execute both sync and async functions from anywhere in your application.

- Triggers save you from importing global or frequently used functions everywhere in your codebase. Just create a trigger to hold them.

- Triggers allow you to literally remote control your components from anywhere effortlessly.

- Triggers allow you to run long async functions in parallel.

- Triggers handle function's internal errors automatically.

- Triggers can be grouped into families and run at once.

For those who use Redux or any other complicated state manager with weird syntaxes, please stop killing your apps and just `#useForest`. It'll help you save time and **money**.

### **Plugins**

Thank you for staying with me until this part. Surely, you won't be disappointed!

The `Plugins` are an essential part of `forest` that allow it to extend its capabilities significantly.

But first, we need to reorganize or complete our `init` function in order to use plugins.

```ts 
// In your init.ts (for example)
const forest = forestDB.init({
  mainKey: 'id',
  dateFormat: ['YYYY_MM_DD', 'MM_DD_YYYY'],
  // Now we'll add the plugins
  plugins: {
    runtime: 'Deno'
  }
});

export default forest;
```

The first thing to do when you want to use **plugins** is to specify your runtime. Actually, `forest` provides the following runtimes: `Deno`, `Node`, `Bun`, `React_native`,
and `Browser` (React, Vue, Angular...).

Unfortunately, the `React_native` runtime doesn't support plugins yet. I'll provide details in the [**Sorry React Native**](#sorry-react-native) section. But don't worry, 
it'll be available in the next version of `forest`.

Now that the runtime is specified, we can see how to configure and use each plugin. Let's go !

1. ### **WebSocket for real-time communications**

Modern applications cannot bypass real-time communications. It's a must if you want to have reactive software. And because of that, `forest` provides awesome APIs to help you make your clients and servers exchange data in real-time the **easiest** way possible.

Keep in mind that the main goal of `forest` is to help you build awesome modern apps faster and more easily.

First, we'll start by adding the WebSocket plugin to `forest`.

- ### For `Deno` runtime

```ts
/* rest of the code... */
plugins: {
  runtime: 'Deno',
  ws: {
    as_server: {
      websocket: Deno, // Set "Deno" instance as ws API (standard)
      port: 5010 // Set the port on which you want to serve (customizable) - Make sure that the port is not already in-use
    },
    as_client: {
      websocket: WebSocket, // Use the web-based WebSocket API. Be careful about the syntax ! The "W" and the "S" are uppercase (standard)
      // Here we'll specify the WebSocket servers we want to connect to (customizable)
      servers: [
        { id: 'node', host: 'ws://localhost:5020' }, // we'll connect to the "node" ws server
        { id: 'bun', host: 'ws://localhost:5030' } // we'll connect to the "bun" ws server
      ]
    }
  }
}
/* rest of the code... */
```

As you can see, we can configure `Deno` both as a **WebSocket** client and server. There's no limit to the number of servers you can connect to in client mode.

The IDs like `deno`, `node`, and `node` are not the real IDs of the servers; instead, they're **aliases** that help you identify each server. The real ID is the server's session ID (Remember).

- ### For `Node` runtime

First install the `ws` package if not installed.

```sh 
$ yarn add ws

$ yarn add -D @types/ws
```

Caution ! Forest only supports `ESM`, so make sure you have `"type": "module"` in your **package.json**, and that the minimum target in your **tsconfig.json** is set to `ES2022` or `ESNext`.

```ts
// Import ws
import * as ws from 'ws';

/* rest of the code... */
plugins: {
  runtime: 'Node',
  ws: {
    as_server: {
      websocket: ws.WebSocketServer, // Use the "WebSocketServer" API from the "ws" package (standard) - Be careful about the syntax ! The "W" and the "S" are uppercase
      port: 5020 // Set the port on which you want to serve (customizable) - Make sure that the port is not already in-use
    },
    as_client: {
      websocket: ws.WebSocket, // Use the "WebSocket" API from the "ws" package (standard) - Be careful about the syntax ! The "W" and the "S" are uppercase
      // Here we'll specify the ws servers we want to connect to (customizable)
      servers: [
        { id: 'deno', host: 'ws://localhost:5010' }, // we'll connect to the "deno" ws server
        { id: 'bun', host: 'ws://localhost:5030' } // we'll connect to the "bun" ws server
      ]
    }
  }
}
/* rest of the code... */
```

> ⚠️ Note: If you run into any issues, please refer to the [Versioning](#versioning) section to ensure you're using the compatible version of "ws".

- ### For `Bun` runtime

```ts
/* rest of the code... */
plugins: {
  runtime: 'Bun',
  ws: {
    as_server: {
      websocket: Bun, // Set "Bun" instance as ws API (standard)
      port: 5030 // Set the port on which you want to serve (customizable) - Make sure that the port is not already in-use
    },
    as_client: {
      websocket: WebSocket, // Use the web-based "WebSocket" API. Be careful about the syntax ! The "W" and the "S" are uppercase (standard)
      // Here we'll specify the ws servers we want to connect to (customizable)
      servers: [
        { id: 'deno', host: 'ws://localhost:5010' }, // we'll connect to the "deno" ws server
        { id: 'node', host: 'ws://localhost:5020' } // we'll connect to the "node" ws server
      ]
    }
  }
}
/* rest of the code... */
```

- ### For `Browser` runtime

```ts
/* rest of the code... */
plugins: {
  runtime: 'Browser',
  ws: {
    as_client: {
      websocket: WebSocket, // Use the web-based "WebSocket" API. Be careful about the syntax ! The "W" and the "S" are uppercase (standard)
      // Here we'll specify the ws servers we want to connect to (customizable)
      servers: [
        { id: 'deno', host: 'ws://localhost:5010' }, // we'll connect to the "deno" ws server
        { id: 'node', host: 'ws://localhost:5020' }, // we'll connect to the "node" ws server
        { id: 'bun', host: 'ws://localhost:5030' } // we'll connect to the "bun" ws server
      ]
    }
  }
}
/* rest of the code... */
```

You can't start a ws server inside a browser, so we can only configure as client.

**Don't forget to restart your servers after every modification if it's automatically handled.**

- ### For `React_native` runtime

**Not available yet ! Please, wait for the next coming version.**

Now, all our runtimes are well configured and connected to each other.

Basically, WebSocket just allows you to send messages from a source to a destination. To use more advanced functionality like broadcasting,
you need to set it up yourself or use other tools to set up a pub/sub logic, create topics, etc.

In `forest`, the logic is very simple. We'll use the WebSocket connection to trigger functions between clients and servers and attach a callback
to receive the responses of those functions. If we want to target a particular type of server or client, we'll simply filter them through their
**Session** to partition relevant ones from those to ignore.

Choose the frontend framework and backend runtime of your choice to create triggers. Here, I'll use **React** and **Deno**.

- #### `triggers.tsx` on **React**

```ts
// Don't forget to import "forest" if you've initialized it in another file
// Or you can create the triggers in the same file as we're just making some tests

forest.trigger().create({
  id: 'react_triggers',
  methods: {
    react_1: () => { return `Hi, am the react's function #1` },
    react_2: () => { return `Hi, am the react's function #2` }
  }
});
```

- #### `triggers.ts` on **Deno**

```ts
import forest from 'init.ts';

forest.trigger().create({
  id: 'deno_triggers',
  methods: {
    deno_1: () => { return `Hi, am the deno's function #1` },
    deno_2: () => { return `Hi, am the deno's function #2` }
  }
});
```

Now we'll run triggers on both sides.

- #### Tigger Deno's functions from React

```ts
const tg = await forest.ws().useServer('deno').trigger()
  .run('deno_1').withArgs()
  .run('deno_2').withArgs()
  .useCallback((x: { id: string, response: any }) => {
    console.log('id ::', x.id);              // The callback ID - Auto-generated by default 
    console.log('response ::', x.response);  // Data returned by the functions you've trigged on "Deno"
  })
  .fromId('deno_triggers');

console.log('tg ::', tg);
```

```sh
# logs

# tg ::
{ status: 'success', log: '', data: undefined }

# id ::
Yu93E4ap

# response ::
deno_triggers: {
  deno_1: "Hi, am the deno's function #1",
  deno_2: "Hi, am the deno's function #2"
}
```

You can give an ID to your callback, in case you externalize your callback function and reuse it for different requests, like below:

```ts
// My external callback
const externalCallbackFunc = (x: { id: string, response: any }) => {
  const id = x.id, resp = x.response;

  switch(id){
    case 'xyz': { /* Do something... */ } break;
    
    case '123': { /* Do something... */ } break;

    default: {  };
  };

  console.log('id ::', id);
  console.log('response ::', resp);
};

// Trigger 1
const tg1 = await forest.ws().useServer('deno').trigger()
  .run('deno_1').withArgs()
  .useCallback(externalCallbackFunc, 'xyz') // Here we specify a custom ID "xyz"
  .fromId('deno_triggers');

// Trigger 2
const tg2 = await forest.ws().useServer('deno').trigger()
  .run('deno_2').withArgs()
  .useCallback(externalCallbackFunc, '123') // Here we specify a custom ID "123"
  .fromId('deno_triggers');
```

```sh 
# logs for tg1

# id ::
xyz

# response ::
deno_triggers: {
  deno_1: "Hi, am the deno's function #1"
}


# logs for tg2

# id ::
123

# response ::
deno_triggers: {
  deno_2: "Hi, am the deno's function #2"
}
```

- #### Tigger React's functions from Deno

To trigger a client's functions from a server, you first need to know the client `Session ID`. That's why it's recommended to always change the 
session ID to something you can easily access, like the user's ID.

So, we'll change the session ID on the React side first:

```ts
// The new session ID of React will automatically be committed to "Deno"
const change_sid = forest.session({ id: 'react_session_id' });
```

Now we can use that ID to trigger a function on React from Deno.

```ts 
const tg = await forest.ws().useClient('react_session_id').trigger()
  .run('react_1').withArgs()
  .run('react_2').withArgs()
  .useCallback((x: { id: string, response: any }) => {
    console.log('response ::', x.response);  
  })
  .fromId('react_triggers');
```

```sh
# log

# response ::
react_triggers: {
  react_1: "Hi, am the react's function #1",
  react_2: "Hi, am the react's function #2"
}
```

The first time you run these requests, it may take a little time, but it's not a performance issue at all. It works like that to allow all connections to establish;
otherwise, the first requests will fail.

The way we've accessed the client ID here is just an example to help you understand how it works. In a real use case, you may not be able to predict every client's ID.

### Broadcasting

```ts
// Broadcast to "clients"
const clients = await forest.ws().broadcast('to_clients').trigger()
  .run('react_1').withArgs()
  .whereSession({
    id: 'react_session_id'
  })
  .fromId('react_riggers');


// Broadcast to "servers" 
const servers = await forest.ws().broadcast('to_servers').trigger()
  .run('deno_1').withArgs()
  .whereSession({
    id: 'deno' // This will fail because 'deno' is not the real Session ID. To make it work, you'll need to change the session ID to 'deno' as we did for React.
  })
  .fromId('deno_triggers');
```

- **`.broadcast()`** (`x`): This function allows you to make a broadcast and it receives one argument of type string that can be either `to_clients`
when you want to broadcast to clients or `to_servers` when you want to broadcast to servers. **Only servers can broadcast to clients**.

- **`.whereSession()`** (`json`): It receives a JSON object containing the data by which clients or servers will be filtered before the broadcast.

The example above is very limited because I simply wanted to show you how it works. You can filter by any key present inside your users' sessions.
So, scale users' sessions to suit your needs. You can even use **`Conditions`** to perform flexible or complex filtering.

Finally, know that you can use `parallel` here as well to run functions that take a long time to resolve together, saving time. Additionally, we can encrypt 
our WebSocket communications (we'll see that in the [crypto](#crypto) section).

### Get "clients" and "servers"

```ts 
// Get all connected clients' session IDs on the server side - Caution ! It can be heavy to run if you have a very large number of users connected
// It will return an array containing every client session ID
const get_clients = await forest.ws().get().clients();
// 
// Or just count them
const get_clients_count = await forest.ws().get().clients('count'); // Will return the number of connected clients



// Get all connected servers' session IDs on both client and server side
// It will return an array containing every server alias or ID (if you use the alias as session ID on the server)
const get_servers = await forest.ws().get().servers();
// 
// Or just count them
const get_servers_count = await forest.ws().get().servers('count'); // Will return the number of connected servers
```

2. ### **HTTP with triggers**

Using Triggers with WebSocket is useful when you need to broadcast or when the trigger's response is not urgent and
can be delayed. But when you're in a situation where you need the response of the trigger before continuing, then use triggers over HTTP.

Now we'll set up the HTTP plugin for each runtime.

- ### For `Deno` runtime 

```ts
import axios from 'https://deno.land/x/axios/mod.ts';

/* rest of the code... */
plugins: {
  runtime: 'Deno',
  http: {
    as_server: {
      deno: { api: Deno, response: Response },
      port: 6010 
    },
    as_client: {
      axios: axios,
      servers: [
        { id: 'node', url: 'http://localhost:6020' },
        { id: 'bun', url: 'http://localhost:6030' }
      ]
    }
  }
}
/* rest of the code... */
```

- ### For `Node` runtime 

For Node we'll install some other dependencies.

```sh 
$ yarn add axios express cors body-parser formidable compression helmet
```

```ts
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

/* rest of the code... */
plugins: {
  runtime: 'Node',
  http: {
    as_server: {
      node: { 
        express: express,
        cors: cors,
        bodyParser: bodyParser,
        formidable: formidable, 
        compression: compression, // optional 
        helmet: helmet // optional 
      },
      port: 6020 
    },
    as_client: {
      axios: axios,
      servers: [
        { id: 'deno', url: 'http://localhost:6010' },
        { id: 'bun', url: 'http://localhost:6030' }
      ]
    }
  }
}
/* rest of the code... */
```

- ### For `Bun` runtime 

```sh 
$ yarn add axios
```

```ts
import axios from 'axios';

/* rest of the code... */
plugins: {
  runtime: 'Bun',
  http: {
    as_server: {
      bun: { api: Bun, response: Response },
      port: 6030 
    },
    as_client: {
      axios: axios,
      servers: [
        { id: 'deno', url: 'http://localhost:6010' },
        { id: 'node', url: 'http://localhost:6020' }
      ]
    }
  }
}
/* rest of the code... */
```

- ### For `Browser` runtime 

```sh 
$ yarn add axios
```

```ts
import axios from 'axios';

/* rest of the code... */
plugins: {
  runtime: 'Browser',
  http: {
    as_client: {
      axios: axios,
      servers: [
        { id: 'deno', url: 'http://localhost:6010' },
        { id: 'node', url: 'http://localhost:6020' },
        { id: 'bun', url: 'http://localhost:6030' }
      ]
    }
  }
}
/* rest of the code... */
```

- ### For `React_native` runtime 

**Not available yet ! Please, wait for the next coming version.**

> ⚠️ Note: If you run into any issues, please refer to the [Versioning](#versioning) section to ensure you're using the compatible version of each plugin.

- ### Full config options available

```ts
http: {
  as_server: {
    // [Required] :: Choose only the one that matches your "runtime"
    deno: { api: Deno, response: Response },
    node: { express: express, cors: cors, bodyParser: bodyParser, formidable: formidable, compression: compression, helmet: helmet },
    bun: { api: Bun, response: Response },
    //
    port: 8080, // [Required] :: Set the port
    endpoint: 'forest', // [Optional] :: Set an endpoint - The default is "forest" 
    host: '0.0.0.0', // [Optional] :: Set your hostname - The default is "0.0.0.0"
    requestSizeLimit: 256, // [Optional] :: Set the request's size limit in MB - THe default is "256MB"
    staticFiles: // [Optional] :: Use it only if you want to serve static files
    {
      path: 'path_to_your_static_files_dir', // [Required if "staticFiles" is specified] :: Specify the path to your static files
      routeName: 'static', // [Optional] :: Set the name of the route on which to serve static files - The default is "static"
    },
    timeout: 30_000 // [Optional] :: Set the max timeout for your request in ms - The default is "30_000ms" (30s)
  },
  as_client: {
    axios: axios,
    servers: { 
      id: 'your_server_id', // [Required] :: The ID of your server
      url: 'http://localhost:8080', // [Required] :: The URL of your server
      endpoint: 'endpoint_of_your_servers', // [Required if you set your own endpoint] :: The endpoint of your server
    }
  }
}
```

With HTTP, you can only run triggers in one direction: from clients to servers.

```ts 
// Trigger functions on Deno 
const tg = await forest.http().useServer('deno').trigger()
  .run('deno_1').withArgs()
  .run('deno_2').withArgs()
  .fromId('deno_triggers');

console.log(tg);
```

```sh
# log
deno_triggers: {
  deno_1: "Hi, am the deno's function #1",
  deno_2: "Hi, am the deno's function #2"
}
```

We can encrypt HTTP connections also.

### Server Proxy

If you're using a proxy like **nginx**, **caddy**, or any others, please don't forget to configure a route for the `endpoint` you're using. By default, it's `forest`.

3. ### **File System**

Forest provides great APIs to interact with the file system of every supported runtime. These APIs rely on the native APIs of each runtime, so you don't need
to worry about performance. The greatest advantage is that the same codebase will work everywhere without the need to update anything. So, learn once and write everywhere !

Let me show you how to add the `fs` plugin for each runtime.

- ### For `Deno` runtime 

```ts
/* rest of the code... */
plugins: {
  runtime: 'Deno',
  fs: { api: Deno }
}
/* rest of the code... */
```

- ### For `Node` runtime 

```ts
// For node you need to import and use "fs/promises" - You don't need to install it
import fs from 'node:fs/promises';

/* rest of the code... */
plugins: {
  runtime: 'Node',
  fs: { fs: fs }
}
/* rest of the code... */
```

Please, ensure that you're importing fs from fs/promises and not just fs.

- ### For `Bun` runtime 

```ts
// For "Bun" also we'll use "fs/promises"
import fs from 'node:fs/promises';

/* rest of the code... */
plugins: {
  runtime: 'Bun',
  fs: { api: Bun, fs: fs }
}
/* rest of the code... */
```

- ### For `Browser` runtime 

At the moment, as I’m writing this documentation, we can't access the file system directly from a Browser as we could with server runtimes.

- ### For `React_native` runtime 

**Not available yet ! Please, wait for the next coming version.**

Now that the `fs` plugin is ready, you can start interacting with the file system.

All the files and folders used below are just examples and may not exist. So, create your own files and folders for a clear test.

- ### **`Create`** operation

```ts
// Create folder
// Without files
const fs0 = await forest.fs().create().folder({ path: './test' }); // Use an array to create multiple folders
// With files
const fs1 = await forest.fs().create().folder({ path: './test', files: { name: 'file.txt', content: 'Hello world !' } }); // Use an array to create multiple files inside the folder


// Create file
const fs2 = await forest.fs().create().file({ path: './test/test.js', content: 'console.log("Hello world !");' }); // Use an array to create multiple files
```

- ### **`Write`** operation

```ts
// Append text to the current file or create if it doesn't exists
const fs0 = await forest.fs().write().file({ path: './forest/test.js', content: '\nconsole.log("Hello mom !")' });


// overwrite the file if it exists
const fs1 = await forest.fs().write().file({ path: './forest/test.js', content: '\nconsole.log("Hello mom !")', overwrite: true });
```

- ### **`Read`** operation

```ts
// Read the content of a folder
// "id" => Helps to identify and extract the result of each folder
// "target" => Specifies what you want to read. Can be "files", "folders", or "all" (default).
const fs0 = await forest.fs().read().folder([
  { id: 'forest', path: './forest', target: 'all' },
  { id: 'other', path: './other', target: 'files' }
]);


// Read files
// "id" => Helps to identify and extract the result of each file
const fs1 = await forest.fs().read().file([
  { id: 'test', path: './forest/test.js' },
  { id: 'other', path: './forest/other.js' }
]);
```

- ### **`Delete`** operation

```ts
// Delete folders
const fs0 = await forest.fs().delete().folder(['./folder_0', './folder_1']);


// Delete files
const fs1 = await forest.fs().delete().file(['./file_0.txt', './file_1.txt']);
```

- ### **`Rename`** operation

```ts
// Rename folder
const fs0 = await forest.fs().rename().folder({ path: './forest', newName: './forestDB' }); // Use an array for multiple folders


// Rename file
const fs1 = await forest.fs().rename().file({ path: './forestDB/test.js', newName: 'index.ts' }); // Use an array for multiple files
```

- ### **`Move`** operation

```ts
// Move folder
const fs0 = await forest.fs().move().folder({ from: './root', to: './forestDB/root' }); // Use an array for multiple folders


// Move file
const fs1 = await forest.fs().move().file({ from: './file_0.txt', to: './forestDB/file_0.txt' }); // Use an array for multiple files
```

- ### **`Copy`** operation

```ts
// Copy folder
const fs0 = await forest.fs().copy().folder({ from: './forest/folder_0', to: './forest/root/folder_0' }); // Use an array for multiple folders


// Copy file
const fs1 = await forest.fs().copy().file({ from: './forestDB/index.ts', to: './src/index.ts' });  // Use an array for multiple files
```

- ### **`Clear`** operation

```ts
// Clear folder
const fs0 = await forest.fs().clear().folder({ path: './forest/root', target: 'all' });


// Clear file
const fs1 = await forest.fs().clear().file('./file.txt');
```

4. ### **Crypto**

Forest uses this plugin to encrypt your `WebSocket` and `HTTP` communications.

Here's how to configure crypto.

- ### For `Deno`, `Bun` and `Browser` 

```ts
/* rest of the code... */
plugins: {
  runtime: 'Deno', // "Deno" | "Bun" | "Browser"
  crypto: {
    enable: true, // [Required] :: Enable or disable crypto
    secretKey: 'you_secret_key', // [Optional but Recommended] :: Your encryption key of "32" length - Should be alphanumeric.
  }
}
/* rest of the code... */
```

Because communications are **end-to-end encrypted**, you must always enable/disable crypto on both the client and server sides. If only one of them has crypto enabled,
the communication will fail.

- ### For `Node`

```ts
// First you need to import crypto - You don't need to install it
import * as crypto from 'crypto';

/* rest of the code... */
plugins: {
  runtime: 'Node',
  crypto: { 
    crypto: crypto, // [Required for Node] :: The web-based crypto API
    enable: true, // [Required] :: Enable or disable crypto
    secretKey: 'you_secret_key', // [Optional but recommended] :: Your encryption key of "32" length - Should be alphanumeric.
  }
}
/* rest of the code... */
```

Configure crypto in a Browser and server runtime, make them communicate via triggers, and then go into the network tab in **dev tools** to see the payloads being encrypted.

Disable crypto on both sides and retry the process. This time, you should see that the data is no longer encrypted.

### **Versioning**

Here are the official versions used for each plugin:

- **`axios`**: ^1.8.3

- **`express`**: ^4.21.2

- **`cors`**: ^2.8.5

- **`body-parser`**: ^1.20.3

- **`compression`**: ^1.8.0

- **`helmet`**: ^8.0.0

- **`formidable`**: ^3.5.2

- **`crypto`**: ^1.0.1

- **`ws`**: ^8.18.1

You can use newer versions, but if you run into any issues, revert to these versions. It's also important to note that these versions may change in future releases of forest.

### **Methods**

Here are some methods that forest provides.

- ### `generateId()`: (`string`) 

    A function that allows you to generate a random string.

- ### `hasProperty(x, y)`: (`boolean`) 

    A function that allows you to check if a JSON object contains the key you're searching for. It takes two arguments:

    - **`x`**: The JSON object.

    - **`y`**: The key.

    It only checks the first-level keys.

- ### `cloneObject(x)`: (`ARRAY | JSON`) 

    A function that allows you to deeply clone an array or a JSON object. It takes only one argument:

    - **`x`**: The object.

- ### `mergeJson(x: { target: JSON, source: JSON })`: (`JSON`) 
    
    A function that allows you to merge two JSON objects perfectly.

    - **`target`**: The first object.

    - **`source`**: The object to merge into the target.

    The two original JSON objects are not modified.

- ### `getTypeOf(x)`: (`string`)

    A function that allows you to get the type of a variable. If the variable is an object, it will return `null`, `array` or `json` depending on the data.

    - **`x`**: The variable.

- ### `isAlphanumeric(x)`: (`boolean`)
    
    A function that allows you to check if a string is alphanumeric.

    - **`x`**: The string.

- ### `createHash(x)`: (`{ status: 'success' | 'error', log: string, data: string | undefined }`)

    An **asynchronous** function that uses the 'SHA-256' algorithm to hash a string (e.g., a user password).

    - **`x`**: The string to hash.

## Restrictions

- **`Tree name length`**: Maximum 100 characters  

- **`Branch name length`**: Maximum 100 characters  

- **`JSON key length`**: Maximum 200 characters  

- **`JSON fields count`**: Maximum 1,000 fields  

- **`Single feed size`**: Maximum of 1MB

- **`Single field size`**: Maximum of 1MB

- **`Array length`**: Maximum of 1,000 entries

Imagine that you're building an app where users can follow each other, and for each user, you store their followers' IDs inside an array.
Let me tell you that this is a very bad design because a very popular user can have up to 10 million followers.

Only a bad developer would try to store 10 million entries inside an array. Even if you attempt this, the size of the field containing that array will exceed 1MB,
and Forest won't allow you to do that.

The best design would be to create a branch called **"followers"** where you store followers' data, and inside their feed, add the following user's ID.

A better design would be to **`partition`** the followers' branch for each user by creating a personalized branch for each user. For example, for a user with ID `"abc"`,
you can create a personalized branch called `followers_for_abc`. For another user with ID `"xyz"`, you would create a personalized branch called `followers_for_xyz`.
By doing this, you're effectively partitioning the followers for each user, which will significantly improve the performance of your transactions.

It’s recommended to always use the user's ID as the suffix when creating a personalized branch because it is immutable.

- **`Object depth`**: Maximum 35 levels

## Sorry React Native

You can use every feature of forest in React Native except for the plugins, and this is for two reasons:

- ### 1. Time 

Actually, it's hard for me to allocate as much time as I should to maintain forest correctly and fix any potential bugs in a reasonable time. I have to pay bills, eat, dress, blah blah blah...
To cover those needs, I've been working on other things.

- ###  2. Hardware limitation

I'm using an Intel-based MacBook Pro with 8GB of RAM, and it's running slower than the slowest snail in the world. The source code of forestDB has no less than `17,143 LOC`, and to do all my tests,
I need at least two instances of VSCode, Chrome opened with hundreds of tabs, Postman, the iOS Simulator, Android Studio, etc. As you can imagine, it’s simply impossible to do all of that
with my current machine.

I'm planning to get a new M-based MacBook with a good configuration to run all the necessary tests for React Native, so you can have something stable and ready to use. But don't worry,
once I get this machine, the plugin part for React Native will be done in less than 24 hours.

So, stay tuned for the next release; it’ll be awesome !

## What next

- ### In the next coming release (minor)

    - **`Plugins`**: Make the plugin part for React Native. **(Very important)**

    - **`getCount`**: Add a **"getCount"** transaction.

    - **`Uploads and Downloads`**: Uploads and downloads will be automatically handled by forest through the HTTP plugin. In the browser, for example, you'll simply need to pass the 
    `id` or `class` of your `input` component, and Forest will do the rest for you. You’re not ready for how simple and easy it’ll be !

    - **`Add more methods`**: Additional useful methods will be added.

    - **`Bugs fix and global improvement`**: The potential bugs that appear will be fixed, and anything that needs improvement will be improved.

- ### In the future

    - **`Official web site`**: Forest deserves its own website with better documentation.

    - **`Improve server side capabilities`**: Add more functionalities and security to forest on the server side as a web server.

    - **`Data storage on disk`**: Make forest a full database capable of storing data on disk. I am planning to code the I/O operations and any CPU-heavy tasks in `Rust` 
    in order to achieve the best performance possible. **JavaScript is already used on the client and server sides, and now it's time to make it work as a database too, unifying the entire stack.**

    - **`forestAdmin`**: A monitoring tool, like **pgAdmin** for example, to administer forestDB.

    - **`forest Cluster`**: Interconnect multiple forest servers to make them work together and provide high availability.

    - **`Custom plugins`**: A simple way to allow developers to add third-party packages of their choice as plugins, making the plugin list larger and more feature-rich.

As forest evolves, many other things will be added.

- ### Ultimate goal

    - **forestDB Cloud**: A cloud-based solution for forest where users can easily deploy their applications and access all the necessary functionalities that a cloud service can provide.

## Support forestDB

As you can see, `forestDB` is not just a package; it's a serious project that can forever change your experience in web and mobile development, both on the frontend and backend.

It's my first package ever and certainly not the last. Without your support, I won't be able to allocate enough time to maintain forest properly and make it evolve. This is just
the beginning of something great, and the best is yet to come.

So, if you appreciate what I’m doing, consider sponsoring or supporting my work and the future of this project, and help prevent it from sinking into the ocean of unmaintained or dead packages.

I have more to give to open-source, and you can also support me through the hashtag `#useForest` on social media.

- [![Ko-Fi](https://img.shields.io/badge/Ko--Fi-%23F16061?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/vinoskey524)

- **PayPal**: `odoutankevin524@gmail.com`

## Author

My name is **Hamet Kévin E. ODOUTAN** (@vinoskey524). I’ve been doing software development since 8 years now. I do web, desktop, and mobile development, and now I’m very excited
to contribute to open-source with forestDB.

I’m not the kind of developer who types “How to build a cool web app” into Google and picks the first response, or the kind who makes a dumb copy-paste from ChatGPT. No !
I like to understand things and know what I’m really doing. For me, a real developer should be able to explain every single line of his code.

Don’t ask me which school or university I attended, because I taught myself software engineering using PDFs from **openclassrooms.com**, which was called **siteduzero** when I started.
A sad truth is that you can’t learn coding just by watching videos; you need books !

I’m really passionate about building software, and **I sincerely believe that being a developer is not just a job, but a lifestyle** !

## Next coming package

- **FeedList**: An uncomplicated and powerful feed list with infinite rendering, dynamic lazy loading and many advanced functionalities.
I know that many developers struggle with this, especially on the mobile side, such as with React Native. I’ve already solved this problem for several years now, and it’s time to share my solution with the community.

## Contact Me

If you have any project, questions, issues, or feedback, feel free to reach out ! I'd love to hear from you.

- **Email**: [vinoskey524@gmail.com](mailto:vinoskey524@gmail.com)

- **X**: [@forestdb_](https://x.com/forestdb_) (Notice the underscore at the end)

- **X**: [@vinoskey524_](https://x.com/vinoskey524_) (Notice the underscore at the end)

I speak both French and English.

## GitHub repo

The source code of forest is not yet available on the GitHub repository because I need to remove all encryption-related parts before publishing, for security reasons and to protect users.

This work takes time, so be patient until it becomes available on GitHub.

## License

MIT License

Copyright (c) [2025] [Hamet Kévin E. ODOUTAN]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.