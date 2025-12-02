# elysia-dynamic

Elysia plugin. Only works with Bun.

Supports a subset of options from Elysia static plugin. (`assets`, `prefix`, `indexHTML`)

## Install
```sh
bun add github:soshimee/elysia-dynamic
```

## Example
```ts
// index.ts
import Elysia from "elysia";
import dynamicPlugin from "elysia-dynamic";
import staticPlugin from "@elysiajs/static";

new Elysia()
	.use(dynamicPlugin({ prefix: "/" }))
	.use(staticPlugin({ prefix: "/" }))
	.listen(3000);
```

```ts
// public/index.ts
import Elysia from "elysia";

export default new Elysia()
	.get("/", () => "Hello World!");
```

Visiting `http://localhost:3000` (or `http://localhost:3000/index.ts`) outputs `Hello World!`.
