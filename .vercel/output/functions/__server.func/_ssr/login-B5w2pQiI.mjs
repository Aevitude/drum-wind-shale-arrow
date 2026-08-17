import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GROK_PROVIDERS } from "./router-CVYpm2KR.mjs";
import { n as signIn } from "./client-OD9441Gx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B5w2pQiI.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg px-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.32em] text-muted",
					children: "SILK SNAKE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-[0.18em]",
					children: "登录"
				}),
				GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => signIn(p.providerId, { callbackURL: "/" }),
					className: "w-full min-h-11 rounded-full border border-border px-4 py-2 text-sm tracking-[0.16em] hover:bg-surface",
					children: [
						"使用 ",
						p.label,
						" 继续"
					]
				}, p.providerId)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: {
						style: void 0,
						seed: void 0
					},
					className: "block text-center text-sm tracking-[0.16em] text-muted",
					children: "返回庭院"
				})
			]
		})
	});
}
//#endregion
export { Login as component };
