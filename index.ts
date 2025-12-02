import Elysia from "elysia";
import path from "path";

type Options = {
	assets?: string,
	prefix?: string,
	indexHTML?: boolean
};

export const dynamicPlugin = async ({ assets = "public", prefix = "/public", indexHTML = true }: Options = {}): Promise<Elysia> => {
	const app = new Elysia({ name: "dynamic", seed: prefix });
	const glob = new Bun.Glob("**/*.{js,jsx,ts,tsx}");
	if (!assets.startsWith("./") && !assets.startsWith("/")) assets = "./" + assets;
	for await (const file of glob.scan(assets)) {
		const f = (await import(path.resolve(assets, file))).default;
		if (!(f instanceof Elysia)) continue;
		const p = path.posix.join("/", prefix, file);
		app.use(new Elysia({ prefix: p }).use(f));
		if (!indexHTML) continue;
		const r = path.posix.parse(p);
		if (r.name !== "index") continue;
		app.use(new Elysia({ prefix: r.dir }).use(f));
	}
	return app;
};

export default dynamicPlugin;
