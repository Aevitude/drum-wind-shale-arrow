import { o as __toESM } from "../_runtime.mjs";
import { R as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronDown, i as ChevronLeft, n as ChevronUp, r as ChevronRight } from "../_libs/lucide-react.mjs";
import { o as Route$2 } from "./router-CVYpm2KR.mjs";
import { r as signOut, t as authClient } from "./client-OD9441Gx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CePZNtOA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Sign out"
			})
		]
	});
}
/**
* ============================================================
* 豆包只改这一个文件，而且只改下面两行。
* 不要改任何其他文件。改错了游戏也不会崩，只会回到夜园。
* ============================================================
*
* STYLE 只能填这 10 个英文 id 之一：
*   night-jade     夜园玉蛇
*   clay-candy     软糖黏土
*   obsidian-gold  黑金珠宝
*   cyber-neon     赛博霓虹
*   ink-wash       水墨山水
*   sea-salt       海边盐风
*   sakura-wa      樱花和风
*   magma          熔岩黑曜
*   aurora-snow    雪原极光
*   dunhuang       敦煌壁画
*
* SEED 写成玩家名、今天日期、或任意一串数字。
* 同一个 STYLE + 不同 SEED = 同一家人，但颜色/文案/装饰会差一点。
*/
var STYLE = "night-jade";
var SEED = "moon-01";
var CATALOG = {
	"night-jade": {
		id: "night-jade",
		label: "夜园玉蛇",
		english: "Night Garden",
		tone: "dark",
		snake: "jade",
		food: "peach",
		decor: "lanterns",
		bgImage: "/skins/night-jade.jpg",
		palette: {
			bg: "#071412",
			surface: "#0e221c",
			board: "#12261f",
			grid: "#1a332b",
			snake: "#3f8f72",
			snakeHi: "#c5e8c4",
			snakeLo: "#1d4a3a",
			head: "#d4b56a",
			food: "#e35a48",
			foodHi: "#f6c08a",
			text: "#e8f0e4",
			muted: "#7d968c",
			accent: "#d4b56a",
			glow: "#8fd4a4"
		},
		feel: {
			roundness: .86,
			glow: .55,
			metal: .25,
			cellGap: .12
		},
		titles: [
			"夜园",
			"庭露",
			"月下"
		],
		subtitles: [
			"月下慢行",
			"露冷风轻",
			"灯影一寸"
		],
		foods: [
			"仙桃",
			"荔枝",
			"青梅"
		],
		deaths: [
			"露水干了",
			"月色散了",
			"庭院醒了"
		],
		starts: [
			"轻点开始",
			"步入庭中",
			"随月而行"
		]
	},
	"clay-candy": {
		id: "clay-candy",
		label: "软糖黏土",
		english: "Soft Clay",
		tone: "light",
		snake: "clay",
		food: "berry",
		decor: "sprinkles",
		bgImage: "/skins/clay-candy.jpg",
		palette: {
			bg: "#f3e4d4",
			surface: "#f7ebe0",
			board: "#f0d8c8",
			grid: "#e4c8b4",
			snake: "#7ec8a3",
			snakeHi: "#e8f6ee",
			snakeLo: "#4e9a78",
			head: "#f2a0b0",
			food: "#e85d6a",
			foodHi: "#ffc4b0",
			text: "#3a2a28",
			muted: "#8a7068",
			accent: "#d4786a",
			glow: "#ffd2c0"
		},
		feel: {
			roundness: .96,
			glow: .18,
			metal: .05,
			cellGap: .16
		},
		titles: [
			"软糖",
			"黏土",
			"甜铺"
		],
		subtitles: [
			"慢慢咬一口",
			"刚出炉",
			"糖霜未干"
		],
		foods: [
			"草莓",
			"樱桃",
			"蜜柑"
		],
		deaths: [
			"糖霜化了",
			"烤箱叮了一声",
			"肚子圆了"
		],
		starts: [
			"开始揉面",
			"咬一口",
			"开动"
		]
	},
	"obsidian-gold": {
		id: "obsidian-gold",
		label: "黑金珠宝",
		english: "Obsidian",
		tone: "dark",
		snake: "gold",
		food: "gem",
		decor: "dust",
		bgImage: "/skins/obsidian-gold.jpg",
		palette: {
			bg: "#070708",
			surface: "#111114",
			board: "#0c0c0e",
			grid: "#1a1a1e",
			snake: "#c4a056",
			snakeHi: "#f3e3b8",
			snakeLo: "#6a4e22",
			head: "#eee6d2",
			food: "#c13a3a",
			foodHi: "#f0a0a0",
			text: "#f0ead8",
			muted: "#8a8070",
			accent: "#c4a056",
			glow: "#e8c878"
		},
		feel: {
			roundness: .42,
			glow: .4,
			metal: .92,
			cellGap: .1
		},
		titles: [
			"黑金",
			"夜藏",
			"金鳞"
		],
		subtitles: [
			"只此一件",
			"灯下鉴宝",
			"静室"
		],
		foods: [
			"红宝",
			"祖母绿",
			"蓝宝石"
		],
		deaths: [
			"匣子合上了",
			"灯熄了一寸",
			"鉴定结束"
		],
		starts: [
			"开匣",
			"请鉴",
			"入室"
		]
	},
	"cyber-neon": {
		id: "cyber-neon",
		label: "赛博霓虹",
		english: "Neon Grid",
		tone: "dark",
		snake: "neon",
		food: "cube",
		decor: "scan",
		bgImage: "/skins/cyber-neon.jpg",
		palette: {
			bg: "#05060f",
			surface: "#0a1020",
			board: "#070b16",
			grid: "#122038",
			snake: "#3de0e8",
			snakeHi: "#c8ffff",
			snakeLo: "#167888",
			head: "#7af0ff",
			food: "#ff2f8e",
			foodHi: "#ffb0d8",
			text: "#e8f4ff",
			muted: "#6a88a8",
			accent: "#3de0e8",
			glow: "#3de0e8"
		},
		feel: {
			roundness: .28,
			glow: .95,
			metal: .55,
			cellGap: .08
		},
		titles: [
			"霓虹",
			"夜航",
			"电光"
		],
		subtitles: [
			"雨后的街",
			"信号未断",
			"午夜频段"
		],
		foods: [
			"脉冲",
			"磁芯",
			"信标"
		],
		deaths: [
			"信号中断",
			"频段静了",
			"雨停了"
		],
		starts: [
			"接入",
			"上路",
			"点亮"
		]
	},
	"ink-wash": {
		id: "ink-wash",
		label: "水墨山水",
		english: "Ink Wash",
		tone: "light",
		snake: "ink",
		food: "seal",
		decor: "ink",
		bgImage: "/skins/ink-wash.jpg",
		palette: {
			bg: "#e6e1d4",
			surface: "#efe9da",
			board: "#e2dccb",
			grid: "#d2cbb8",
			snake: "#2a2a2a",
			snakeHi: "#6a6a6a",
			snakeLo: "#111111",
			head: "#1a1a1a",
			food: "#b42318",
			foodHi: "#e07060",
			text: "#1c1c1c",
			muted: "#7a7366",
			accent: "#b42318",
			glow: "#b42318"
		},
		feel: {
			roundness: .7,
			glow: .08,
			metal: 0,
			cellGap: .14
		},
		titles: [
			"水墨",
			"远山",
			"一墨"
		],
		subtitles: [
			"留白之处",
			"淡墨千山",
			"纸未干"
		],
		foods: [
			"朱印",
			"朱砂",
			"落款"
		],
		deaths: [
			"墨干了",
			"卷起了",
			"山隐了"
		],
		starts: [
			"落笔",
			"开卷",
			"走笔"
		]
	},
	"sea-salt": {
		id: "sea-salt",
		label: "海边盐风",
		english: "Sea Salt",
		tone: "dark",
		snake: "glass",
		food: "shell",
		decor: "foam",
		bgImage: "/skins/sea-salt.jpg",
		palette: {
			bg: "#0c2430",
			surface: "#123040",
			board: "#153848",
			grid: "#1c4a58",
			snake: "#5ec4c0",
			snakeHi: "#d8f4f0",
			snakeLo: "#2a6e72",
			head: "#f0e6d0",
			food: "#e8906a",
			foodHi: "#ffd0b0",
			text: "#e8f2f0",
			muted: "#7aa0a4",
			accent: "#7ec8c4",
			glow: "#8ee0d8"
		},
		feel: {
			roundness: .88,
			glow: .45,
			metal: .35,
			cellGap: .13
		},
		titles: [
			"盐风",
			"潮隙",
			"海玻璃"
		],
		subtitles: [
			"退潮之后",
			"风里有盐",
			"光落在壳上"
		],
		foods: [
			"海螺",
			"珊瑚",
			"盐晶"
		],
		deaths: [
			"潮回来了",
			"风停了一息",
			"壳空了"
		],
		starts: [
			"赤足",
			"随潮",
			"下滩"
		]
	},
	"sakura-wa": {
		id: "sakura-wa",
		label: "樱花和风",
		english: "Sakura",
		tone: "dark",
		snake: "lacquer",
		food: "blossom",
		decor: "petals",
		bgImage: "/skins/sakura-wa.jpg",
		palette: {
			bg: "#2a1820",
			surface: "#3a222c",
			board: "#321c26",
			grid: "#4a2c38",
			snake: "#d4788c",
			snakeHi: "#f8dce4",
			snakeLo: "#8a3e52",
			head: "#f0c8a0",
			food: "#f2b7c4",
			foodHi: "#ffe8ee",
			text: "#f8ece8",
			muted: "#b8989c",
			accent: "#e8b4a0",
			glow: "#f0c0cc"
		},
		feel: {
			roundness: .8,
			glow: .35,
			metal: .3,
			cellGap: .12
		},
		titles: [
			"樱夜",
			"花见",
			"薄红"
		],
		subtitles: [
			"花比夜更短",
			"风过一树",
			"灯下花影"
		],
		foods: [
			"花瓣",
			"团子",
			"梅酒"
		],
		deaths: [
			"花落了",
			"夜深了",
			"风停了"
		],
		starts: [
			"入席",
			"看花",
			"举杯"
		]
	},
	magma: {
		id: "magma",
		label: "熔岩黑曜",
		english: "Magma",
		tone: "dark",
		snake: "magma",
		food: "ember",
		decor: "embers",
		bgImage: "/skins/magma.jpg",
		palette: {
			bg: "#100808",
			surface: "#1c1010",
			board: "#160c0c",
			grid: "#2a1612",
			snake: "#e07030",
			snakeHi: "#ffd090",
			snakeLo: "#7a2810",
			head: "#ffcc66",
			food: "#ff5a20",
			foodHi: "#ffc080",
			text: "#f8ece0",
			muted: "#a08070",
			accent: "#e07030",
			glow: "#ff8030"
		},
		feel: {
			roundness: .5,
			glow: .85,
			metal: .4,
			cellGap: .1
		},
		titles: [
			"熔核",
			"黑曜",
			"烬"
		],
		subtitles: [
			"石心里的火",
			"尚未冷却",
			"岩缝一线"
		],
		foods: [
			"熔珠",
			"余烬",
			"火种"
		],
		deaths: [
			"火灭了一寸",
			"岩壳合上",
			"热散了"
		],
		starts: [
			"点燃",
			"入岩",
			"靠近"
		]
	},
	"aurora-snow": {
		id: "aurora-snow",
		label: "雪原极光",
		english: "Aurora",
		tone: "dark",
		snake: "ice",
		food: "crystal",
		decor: "snow",
		bgImage: "/skins/aurora-snow.jpg",
		palette: {
			bg: "#0a1220",
			surface: "#121c2c",
			board: "#0e1826",
			grid: "#1a283c",
			snake: "#7ee0c8",
			snakeHi: "#e8fff6",
			snakeLo: "#3a8878",
			head: "#c8b8ff",
			food: "#a8e0ff",
			foodHi: "#ffffff",
			text: "#eef4ff",
			muted: "#88a0b8",
			accent: "#9ae0d0",
			glow: "#b8fff0"
		},
		feel: {
			roundness: .74,
			glow: .7,
			metal: .55,
			cellGap: .12
		},
		titles: [
			"极光",
			"雪原",
			"霜"
		],
		subtitles: [
			"天在呼吸",
			"雪还未醒",
			"北境无声"
		],
		foods: [
			"冰晶",
			"霜花",
			"极光尘"
		],
		deaths: [
			"光淡了",
			"雪停了",
			"夜更深了"
		],
		starts: [
			"踏雪",
			"仰望",
			"出发"
		]
	},
	dunhuang: {
		id: "dunhuang",
		label: "敦煌壁画",
		english: "Dunhuang",
		tone: "dark",
		snake: "mineral",
		food: "lotus",
		decor: "pigment",
		bgImage: "/skins/dunhuang.jpg",
		palette: {
			bg: "#2a1c10",
			surface: "#3a2818",
			board: "#322010",
			grid: "#4a3220",
			snake: "#c45c38",
			snakeHi: "#f0d0a0",
			snakeLo: "#7a3018",
			head: "#e8c878",
			food: "#d4a050",
			foodHi: "#ffe8b0",
			text: "#f4e8d0",
			muted: "#a08868",
			accent: "#d4a050",
			glow: "#e8c070"
		},
		feel: {
			roundness: .58,
			glow: .3,
			metal: .2,
			cellGap: .11
		},
		titles: [
			"敦煌",
			"飞天",
			"石窟"
		],
		subtitles: [
			"壁上未干",
			"千年一色",
			"灯入窟中"
		],
		foods: [
			"莲花",
			"金箔",
			"朱砂"
		],
		deaths: [
			"灯尽了",
			"色淡了",
			"窟门合了"
		],
		starts: [
			"入窟",
			"点灯",
			"观壁"
		]
	}
};
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function hexToRgb(hex) {
	const h = hex.replace("#", "").trim();
	const n = Number.parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
	if (Number.isNaN(n)) return [
		128,
		128,
		128
	];
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function rgbToHex(r, g, b) {
	const to = (v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");
	return `#${to(r)}${to(g)}${to(b)}`;
}
function hexToHsl(hex) {
	const [r0, g0, b0] = hexToRgb(hex);
	const r = r0 / 255;
	const g = g0 / 255;
	const b = b0 / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return [
		0,
		0,
		l
	];
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	return [
		h / 6 * 360,
		s,
		l
	];
}
function hslToHex(h, s, l) {
	const hn = (h % 360 + 360) % 360;
	const a = s * Math.min(l, 1 - l);
	const f = (n) => {
		const k = (n + hn / 30) % 12;
		return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	};
	return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}
function shiftHex(hex, dh, ds = 0, dl = 0) {
	const [h, s, l] = hexToHsl(hex);
	return hslToHex(h + dh, clamp(s + ds, 0, 1), clamp(l + dl, .04, .96));
}
function withAlpha(hex, a) {
	const [r, g, b] = hexToRgb(hex);
	return `rgba(${r},${g},${b},${clamp(a, 0, 1)})`;
}
function mixHex(a, b, t) {
	const [ar, ag, ab] = hexToRgb(a);
	const [br, bg, bb] = hexToRgb(b);
	const k = clamp(t, 0, 1);
	return rgbToHex(ar + (br - ar) * k, ag + (bg - ag) * k, ab + (bb - ab) * k);
}
function hashSeed(seed) {
	let h = 2166136261;
	const s = String(seed ?? "");
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var STYLE_IDS = [
	"night-jade",
	"clay-candy",
	"obsidian-gold",
	"cyber-neon",
	"ink-wash",
	"sea-salt",
	"sakura-wa",
	"magma",
	"aurora-snow",
	"dunhuang"
];
var ALIASES = {
	夜园玉蛇: "night-jade",
	夜园: "night-jade",
	软糖黏土: "clay-candy",
	软糖: "clay-candy",
	黑金珠宝: "obsidian-gold",
	黑金: "obsidian-gold",
	赛博霓虹: "cyber-neon",
	霓虹: "cyber-neon",
	水墨山水: "ink-wash",
	水墨: "ink-wash",
	海边盐风: "sea-salt",
	海边: "sea-salt",
	樱花和风: "sakura-wa",
	樱花: "sakura-wa",
	熔岩黑曜: "magma",
	熔岩: "magma",
	雪原极光: "aurora-snow",
	极光: "aurora-snow",
	敦煌壁画: "dunhuang",
	敦煌: "dunhuang"
};
function parseStyleId(raw) {
	const s = String(raw ?? "").trim().toLowerCase().replace(/[_\s]+/g, "-");
	if (STYLE_IDS.includes(s)) return s;
	return ALIASES[String(raw ?? "").trim()] ?? ALIASES[s] ?? "night-jade";
}
function resolveSkin(styleRaw, seedRaw) {
	const id = parseStyleId(styleRaw);
	const family = CATALOG[id] ?? CATALOG["night-jade"];
	const seed = String(seedRaw ?? "0").trim() || "0";
	const h = hashSeed(`${id}:${seed}`);
	const food = h % 3;
	const copy = (h >>> 3) % 3;
	const deco = (h >>> 6) % 3;
	const hue = ((h >>> 9) % 21 - 10) * .9;
	const glowMul = .82 + (h >>> 15) % 40 / 100;
	const sat = (h >>> 20) % 9 / 100 - .04;
	const lit = (h >>> 24) % 9 / 140 - .03;
	const shift = (hex, extra = 0) => shiftHex(hex, hue + extra, sat, lit);
	return {
		id: family.id,
		seed,
		label: family.label,
		english: family.english,
		tone: family.tone,
		snake: family.snake,
		food: family.food,
		decor: family.decor,
		bgImage: family.bgImage,
		palette: {
			bg: shift(family.palette.bg, 0),
			surface: shift(family.palette.surface, 0),
			board: shift(family.palette.board, 0),
			grid: shift(family.palette.grid, 0),
			snake: shift(family.palette.snake, hue * .15),
			snakeHi: shift(family.palette.snakeHi, hue * .1),
			snakeLo: shift(family.palette.snakeLo, 0),
			head: shift(family.palette.head, hue * .2),
			food: shift(family.palette.food, (h >>> 12) % 13 - 6),
			foodHi: shift(family.palette.foodHi, 0),
			text: family.palette.text,
			muted: shift(family.palette.muted, 0),
			accent: shift(family.palette.accent, hue * .1),
			glow: shift(family.palette.glow, 0)
		},
		feel: {
			roundness: family.feel.roundness,
			glow: Math.max(.05, Math.min(1.15, family.feel.glow * glowMul)),
			metal: family.feel.metal,
			cellGap: family.feel.cellGap + deco * .01
		},
		copy: {
			title: family.titles[copy],
			subtitle: family.subtitles[copy],
			food: family.foods[food],
			die: family.deaths[copy],
			start: family.starts[copy]
		},
		variant: {
			food,
			copy,
			deco
		}
	};
}
function skinFromChoice() {
	return resolveSkin(STYLE, SEED);
}
function skinFromSearch(search) {
	if (!search) return skinFromChoice();
	try {
		const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
		const style = q.get("style");
		const seed = q.get("seed");
		if (!style && !seed) return skinFromChoice();
		return resolveSkin(style ?? "night-jade", seed ?? "moon-01");
	} catch {
		return skinFromChoice();
	}
}
var SilkAudio = class {
	ctx = null;
	master = null;
	unlock() {
		const ctx = this.ensure();
		if (ctx.state === "suspended") ctx.resume();
	}
	eat(skin) {
		this.blip(skin, 520, .07, "triangle");
		this.blip(skin, 780, .05, "sine", .03);
	}
	die(skin) {
		this.blip(skin, 220, .22, "sine");
		this.blip(skin, 140, .28, "triangle", .04);
	}
	start(skin) {
		this.blip(skin, 360, .08, "sine");
		this.blip(skin, 540, .1, "triangle", .06);
	}
	turn() {
		this.blip(null, 240, .03, "sine");
	}
	blip(skin, freq, dur, type, delay = 0) {
		const ctx = this.ensure();
		if (ctx.state === "suspended") return;
		const t0 = ctx.currentTime + delay;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = type;
		const hueBias = skin ? (skin.variant.copy - 1) * 18 : 0;
		osc.frequency.setValueAtTime(freq + hueBias, t0);
		osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq * .72), t0 + dur);
		g.gain.setValueAtTime(1e-4, t0);
		g.gain.exponentialRampToValueAtTime(.045, t0 + .012);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
		osc.connect(g);
		g.connect(this.master);
		osc.start(t0);
		osc.stop(t0 + dur + .02);
	}
	ensure() {
		if (!this.ctx) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			this.ctx = new Ctx();
			this.master = this.ctx.createGain();
			this.master.gain.value = .9;
			this.master.connect(this.ctx.destination);
		}
		return this.ctx;
	}
};
var OPPOSITE = {
	up: "down",
	down: "up",
	left: "right",
	right: "left"
};
var STEP = {
	up: {
		x: 0,
		y: -1
	},
	down: {
		x: 0,
		y: 1
	},
	left: {
		x: -1,
		y: 0
	},
	right: {
		x: 1,
		y: 0
	}
};
var SnakeGame = class {
	cols = 13;
	rows = 17;
	snake = [];
	prev = [];
	dir = "right";
	queued = [];
	food = {
		x: 8,
		y: 8
	};
	score = 0;
	alive = true;
	tickMs = 148;
	reset() {
		const cx = Math.floor(this.cols / 2);
		const cy = Math.floor(this.rows / 2);
		this.snake = [
			{
				x: cx,
				y: cy
			},
			{
				x: cx - 1,
				y: cy
			},
			{
				x: cx - 2,
				y: cy
			}
		];
		this.prev = this.snake.map((c) => ({ ...c }));
		this.dir = "right";
		this.queued = [];
		this.score = 0;
		this.alive = true;
		this.tickMs = 148;
		this.placeFood();
	}
	queue(dir) {
		if (!this.alive) return;
		const last = this.queued[this.queued.length - 1] ?? this.dir;
		if (dir === last || dir === OPPOSITE[last]) return;
		if (this.queued.length >= 2) this.queued.shift();
		this.queued.push(dir);
	}
	step() {
		if (!this.alive) return {
			ate: false,
			died: true,
			score: this.score
		};
		this.prev = this.snake.map((c) => ({ ...c }));
		if (this.queued.length) this.dir = this.queued.shift();
		const head = this.snake[0];
		const d = STEP[this.dir];
		const next = {
			x: head.x + d.x,
			y: head.y + d.y
		};
		if (next.x < 0 || next.y < 0 || next.x >= this.cols || next.y >= this.rows) {
			this.alive = false;
			return {
				ate: false,
				died: true,
				score: this.score
			};
		}
		const willEat = next.x === this.food.x && next.y === this.food.y;
		if ((willEat ? this.snake : this.snake.slice(0, -1)).some((c) => c.x === next.x && c.y === next.y)) {
			this.alive = false;
			return {
				ate: false,
				died: true,
				score: this.score
			};
		}
		this.snake = [next, ...this.snake];
		if (willEat) {
			this.score += 1;
			this.tickMs = Math.max(92, 148 - this.score * 1.6);
			this.placeFood();
			return {
				ate: true,
				died: false,
				score: this.score,
				eaten: next
			};
		}
		this.snake.pop();
		return {
			ate: false,
			died: false,
			score: this.score
		};
	}
	interpolated(t) {
		const k = t * t * (3 - 2 * t);
		const n = Math.max(this.snake.length, this.prev.length);
		const out = [];
		for (let i = 0; i < n; i++) {
			const a = this.prev[Math.min(i, this.prev.length - 1)] ?? this.snake[0];
			const b = this.snake[Math.min(i, this.snake.length - 1)] ?? a;
			out.push({
				x: a.x + (b.x - a.x) * k,
				y: a.y + (b.y - a.y) * k
			});
		}
		return out;
	}
	placeFood() {
		const taken = new Set(this.snake.map((c) => `${c.x},${c.y}`));
		const free = [];
		for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) if (!taken.has(`${x},${y}`)) free.push({
			x,
			y
		});
		this.food = free[Math.floor(Math.random() * free.length)] ?? {
			x: 0,
			y: 0
		};
	}
};
var images = /* @__PURE__ */ new Map();
function loadBg(src) {
	if (images.has(src)) return;
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.onload = () => images.set(src, img);
	img.onerror = () => images.set(src, "bad");
	img.src = src;
	images.set(src, img);
}
function paintFrame(opts) {
	const { ctx, w, h, skin, body, food, cols, rows, time, pulse, particles, trauma, phase } = opts;
	const shake = trauma * trauma;
	const rng = mulberry32(hashSeed(skin.seed) ^ 2654435769);
	const ox = (rng() - .5) * 10 * shake;
	const oy = (rng() - .5) * 10 * shake;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, w, h);
	drawAtmosphere(ctx, w, h, skin, time);
	ctx.save();
	ctx.translate(ox, oy);
	const board = layoutBoard(w, h, cols, rows);
	drawBoard(ctx, board, cols, rows, skin, time);
	drawDecor(ctx, board, skin, time, rng);
	if (phase !== "title") {
		drawFood(ctx, board, food, skin, time, pulse);
		drawSnake(ctx, board, body, skin, time);
	}
	drawParticles(ctx, board, particles);
	ctx.restore();
	drawVignette(ctx, w, h, skin);
}
function layoutBoard(w, h, cols, rows) {
	const padX = Math.max(18, w * .07);
	const padTop = Math.max(88, h * .14);
	const padBot = Math.max(92, h * .16);
	const availW = w - padX * 2;
	const availH = h - padTop - padBot;
	const cell = Math.min(availW / cols, availH / rows);
	const bw = cell * cols;
	const bh = cell * rows;
	return {
		x: (w - bw) / 2,
		y: padTop + (availH - bh) / 2,
		w: bw,
		h: bh,
		cell
	};
}
function drawAtmosphere(ctx, w, h, skin, time) {
	const img = images.get(skin.bgImage);
	if (img && img !== "bad" && img.complete && img.naturalWidth) {
		const ir = img.naturalWidth / img.naturalHeight;
		const cr = w / h;
		let dw = w;
		let dh = h;
		if (ir > cr) {
			dh = h;
			dw = h * ir;
		} else {
			dw = w;
			dh = w / ir;
		}
		ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
		ctx.fillStyle = withAlpha(skin.palette.bg, skin.tone === "light" ? .28 : .42);
		ctx.fillRect(0, 0, w, h);
	} else {
		const g = ctx.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0, mixHex(skin.palette.bg, skin.palette.accent, .08));
		g.addColorStop(1, skin.palette.bg);
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
	}
	if (skin.decor === "lanterns") drawMoon(ctx, w, h, skin, time);
	if (skin.decor === "scan") drawScan(ctx, w, h, skin, time);
	if (skin.decor === "snow" || skin.decor === "petals" || skin.decor === "embers" || skin.decor === "foam") drawDrift(ctx, w, h, skin, time);
}
function drawMoon(ctx, w, h, skin, time) {
	const x = w * .78;
	const y = h * .16;
	const r = Math.min(w, h) * .11;
	const g = ctx.createRadialGradient(x, y, r * .2, x, y, r * 2.4);
	g.addColorStop(0, withAlpha(skin.palette.text, .28));
	g.addColorStop(1, withAlpha(skin.palette.text, 0));
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = withAlpha("#f4f1e6", .88);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = withAlpha(skin.palette.bg, .08 + Math.sin(time * .2) * .02);
	ctx.beginPath();
	ctx.arc(x - r * .18, y - r * .08, r * .92, 0, Math.PI * 2);
	ctx.fill();
}
function drawScan(ctx, w, h, skin, time) {
	ctx.fillStyle = withAlpha(skin.palette.glow, .04);
	const y = time * 48 % (h + 80) - 40;
	ctx.fillRect(0, y, w, 18);
}
function drawDrift(ctx, w, h, skin, time) {
	const n = 22;
	for (let i = 0; i < n; i++) {
		const s = (i * 97 + hashSeed(skin.seed)) % 1e3;
		const x = (s * 12.7 + time * (12 + i % 5 * 6)) % (w + 40) - 20;
		const y = (s * 8.3 + time * (10 + i % 7 * 4)) % (h + 40) - 20;
		const r = 1.2 + i % 4;
		if (skin.decor === "petals") {
			ctx.fillStyle = withAlpha(skin.palette.foodHi, .45);
			ctx.beginPath();
			ctx.ellipse(x, y, r * 1.6, r * .7, time + i, 0, Math.PI * 2);
			ctx.fill();
		} else if (skin.decor === "embers") {
			ctx.fillStyle = withAlpha(skin.palette.food, .55);
			ctx.beginPath();
			ctx.arc(x, h - y, r, 0, Math.PI * 2);
			ctx.fill();
		} else {
			ctx.fillStyle = withAlpha(skin.palette.text, skin.decor === "foam" ? .22 : .35);
			ctx.beginPath();
			ctx.arc(x, y, r * .8, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}
function drawBoard(ctx, b, cols, rows, skin, time) {
	const r = Math.min(28, b.cell * .9);
	ctx.save();
	roundRect(ctx, b.x - 10, b.y - 10, b.w + 20, b.h + 20, r + 10);
	ctx.fillStyle = withAlpha(skin.palette.surface, skin.tone === "light" ? .55 : .62);
	ctx.fill();
	ctx.strokeStyle = withAlpha(skin.palette.accent, .22);
	ctx.lineWidth = 1;
	ctx.stroke();
	roundRect(ctx, b.x, b.y, b.w, b.h, r);
	ctx.clip();
	ctx.fillStyle = withAlpha(skin.palette.board, .72);
	ctx.fillRect(b.x, b.y, b.w, b.h);
	const gap = skin.feel.cellGap;
	for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
		const px = b.x + x * b.cell;
		const py = b.y + y * b.cell;
		const inset = b.cell * gap;
		const cr = b.cell * (.18 + skin.feel.roundness * .16);
		ctx.fillStyle = (x + y) % 2 === 0 ? withAlpha(skin.palette.grid, skin.tone === "light" ? .28 : .22) : withAlpha(skin.palette.grid, skin.tone === "light" ? .12 : .1);
		roundRect(ctx, px + inset, py + inset, b.cell - inset * 2, b.cell - inset * 2, cr);
		ctx.fill();
	}
	if (skin.feel.glow > .4) {
		const g = ctx.createRadialGradient(b.x + b.w / 2, b.y + b.h / 2, b.w * .1, b.x + b.w / 2, b.y + b.h / 2, b.w * .72);
		g.addColorStop(0, withAlpha(skin.palette.glow, .05 + Math.sin(time * .8) * .015));
		g.addColorStop(1, withAlpha(skin.palette.glow, 0));
		ctx.fillStyle = g;
		ctx.fillRect(b.x, b.y, b.w, b.h);
	}
	ctx.restore();
}
function drawDecor(ctx, b, skin, time, rng) {
	if (skin.decor === "lanterns") for (let i = 0; i < 3 + skin.variant.deco; i++) {
		const x = b.x + b.w * (.12 + i * .28);
		const y = b.y - 18;
		const flick = .55 + Math.sin(time * 2.1 + i) * .12;
		ctx.fillStyle = withAlpha(skin.palette.accent, .18 * flick);
		ctx.beginPath();
		ctx.arc(x, y, 16, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = withAlpha(skin.palette.accent, .7);
		ctx.beginPath();
		ctx.ellipse(x, y, 4.5, 6, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	if (skin.decor === "dust") for (let i = 0; i < 14; i++) {
		const x = b.x + rng() * b.w;
		const y = b.y + rng() * b.h;
		ctx.fillStyle = withAlpha(skin.palette.accent, .08 + rng() * .08);
		ctx.fillRect(x, y, 1.2, 1.2);
	}
}
function drawFood(ctx, b, food, skin, time, pulse) {
	const cx = b.x + (food.x + .5) * b.cell;
	const cy = b.y + (food.y + .5) * b.cell;
	const s = b.cell * (.28 + pulse * .05);
	const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, s * 3.2);
	g.addColorStop(0, withAlpha(skin.palette.food, .45 * skin.feel.glow + .15));
	g.addColorStop(1, withAlpha(skin.palette.food, 0));
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.arc(cx, cy, s * 3.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate(Math.sin(time * 1.4) * .08);
	if (skin.food === "cube") {
		ctx.fillStyle = skin.palette.food;
		ctx.shadowColor = skin.palette.food;
		ctx.shadowBlur = 16;
		const q = s * 1.15;
		ctx.fillRect(-q, -q, q * 2, q * 2);
	} else if (skin.food === "gem") {
		ctx.fillStyle = skin.palette.food;
		ctx.beginPath();
		ctx.moveTo(0, -s * 1.3);
		ctx.lineTo(s, 0);
		ctx.lineTo(0, s * 1.3);
		ctx.lineTo(-s, 0);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = withAlpha(skin.palette.foodHi, .7);
		ctx.beginPath();
		ctx.moveTo(0, -s * .6);
		ctx.lineTo(s * .35, 0);
		ctx.lineTo(0, s * .2);
		ctx.closePath();
		ctx.fill();
	} else if (skin.food === "seal") {
		ctx.fillStyle = skin.palette.food;
		ctx.beginPath();
		ctx.arc(0, 0, s * 1.05, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = withAlpha(skin.palette.foodHi, .7);
		ctx.lineWidth = 1.4;
		ctx.strokeRect(-s * .35, -s * .35, s * .7, s * .7);
	} else if (skin.food === "blossom" || skin.food === "lotus") {
		ctx.fillStyle = skin.palette.food;
		for (let i = 0; i < 5; i++) {
			ctx.rotate(Math.PI * 2 / 5);
			ctx.beginPath();
			ctx.ellipse(0, -s * .7, s * .38, s * .7, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.fillStyle = skin.palette.foodHi;
		ctx.beginPath();
		ctx.arc(0, 0, s * .28, 0, Math.PI * 2);
		ctx.fill();
	} else {
		ctx.fillStyle = skin.palette.food;
		ctx.beginPath();
		ctx.arc(0, 0, s * 1.05, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = withAlpha(skin.palette.foodHi, .85);
		ctx.beginPath();
		ctx.arc(-s * .28, -s * .28, s * .32, 0, Math.PI * 2);
		ctx.fill();
		if (skin.food === "peach" || skin.food === "berry") {
			ctx.strokeStyle = mixHex(skin.palette.snakeLo, "#3a6a3a", .5);
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(0, -s * .9);
			ctx.quadraticCurveTo(s * .4, -s * 1.4, s * .15, -s * 1.7);
			ctx.stroke();
		}
	}
	ctx.restore();
}
function drawSnake(ctx, b, body, skin, time) {
	if (!body.length) return;
	const pts = body.map((c) => ({
		x: b.x + (c.x + .5) * b.cell,
		y: b.y + (c.y + .5) * b.cell
	}));
	if (skin.feel.glow > .35) {
		ctx.save();
		ctx.strokeStyle = withAlpha(skin.palette.glow, .22 * skin.feel.glow);
		ctx.lineWidth = b.cell * (.72 + skin.feel.glow * .15);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.shadowColor = skin.palette.glow;
		ctx.shadowBlur = 18 * skin.feel.glow;
		strokePath(ctx, pts);
		ctx.restore();
	}
	const n = pts.length;
	for (let i = n - 1; i >= 0; i--) {
		const p = pts[i];
		const t = n === 1 ? 1 : 1 - i / (n - 1);
		const taper = .55 + t * .45;
		const rad = b.cell * (.36 + skin.feel.roundness * .08) * taper;
		const col = mixHex(skin.palette.snakeLo, mixHex(skin.palette.snake, skin.palette.snakeHi, t * .65), t);
		const g = ctx.createRadialGradient(p.x - rad * .28, p.y - rad * .32, rad * .1, p.x, p.y, rad);
		g.addColorStop(0, mixHex(col, skin.palette.snakeHi, .55 + skin.feel.metal * .25));
		g.addColorStop(.55, col);
		g.addColorStop(1, mixHex(col, skin.palette.snakeLo, .55));
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
		ctx.fill();
		if (skin.feel.metal > .4 && i % 2 === 0) {
			ctx.strokeStyle = withAlpha(skin.palette.snakeHi, .25);
			ctx.lineWidth = 1;
			ctx.stroke();
		}
	}
	const head = pts[0];
	const neck = pts[1] ?? {
		x: head.x - 8,
		y: head.y
	};
	const ang = Math.atan2(head.y - neck.y, head.x - neck.x);
	const hr = b.cell * (.4 + skin.feel.roundness * .06);
	ctx.save();
	ctx.translate(head.x, head.y);
	ctx.rotate(ang);
	const hg = ctx.createRadialGradient(-hr * .2, -hr * .25, 2, 0, 0, hr);
	hg.addColorStop(0, skin.palette.snakeHi);
	hg.addColorStop(.55, mixHex(skin.palette.head, skin.palette.snake, .35));
	hg.addColorStop(1, skin.palette.snakeLo);
	ctx.fillStyle = hg;
	ctx.beginPath();
	ctx.ellipse(hr * .08, 0, hr * 1.05, hr * .92, 0, 0, Math.PI * 2);
	ctx.fill();
	if (skin.snake === "jade" || skin.snake === "gold" || skin.snake === "mineral") {
		ctx.fillStyle = skin.palette.head;
		ctx.beginPath();
		ctx.moveTo(hr * .15, -hr * .95);
		ctx.lineTo(hr * .05, -hr * 1.45);
		ctx.lineTo(-hr * .12, -hr * .85);
		ctx.closePath();
		ctx.fill();
	}
	const blink = (Math.sin(time * .7) + 1) * .5 > .96 ? .15 : 1;
	ctx.fillStyle = skin.tone === "light" ? "#1a1614" : "#0b0c10";
	ctx.beginPath();
	ctx.ellipse(hr * .38, -hr * .28, hr * .13, hr * .16 * blink, 0, 0, Math.PI * 2);
	ctx.ellipse(hr * .38, hr * .28, hr * .13, hr * .16 * blink, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = withAlpha("#ffffff", .85);
	ctx.beginPath();
	ctx.arc(hr * .44, -hr * .32, hr * .045, 0, Math.PI * 2);
	ctx.arc(hr * .44, hr * .24, hr * .045, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function strokePath(ctx, pts) {
	if (pts.length < 2) return;
	ctx.beginPath();
	ctx.moveTo(pts[0].x, pts[0].y);
	for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
	ctx.stroke();
}
function drawParticles(ctx, b, parts) {
	for (const p of parts) {
		const a = p.life / p.max;
		ctx.fillStyle = withAlpha(p.color, a * (p.kind === "burst" ? .9 : .45));
		ctx.beginPath();
		ctx.arc(b.x + p.x, b.y + p.y, p.r * (.6 + a), 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawVignette(ctx, w, h, skin) {
	const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .25, w / 2, h / 2, Math.max(w, h) * .72);
	g.addColorStop(0, withAlpha(skin.palette.bg, 0));
	g.addColorStop(1, withAlpha(skin.palette.bg, skin.tone === "light" ? .18 : .46));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function spawnBurst(parts, cell, boardCell, color, n = 14) {
	for (let i = 0; i < n; i++) {
		const a = Math.PI * 2 * i / n + Math.random() * .4;
		const sp = 40 + Math.random() * 80;
		parts.push({
			x: (cell.x + .5) * boardCell,
			y: (cell.y + .5) * boardCell,
			vx: Math.cos(a) * sp,
			vy: Math.sin(a) * sp,
			life: .45 + Math.random() * .25,
			max: .7,
			r: 1.6 + Math.random() * 2.2,
			color,
			kind: "burst"
		});
	}
}
var KEY_DIR = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	KeyW: "up",
	KeyS: "down",
	KeyA: "left",
	KeyD: "right"
};
function bestKey(skin) {
	return `silk-snake:${skin.id}`;
}
function SnakeApp({ search }) {
	const skin = skinFromSearch(search);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SilkTable, { skin });
}
function SilkTable({ skin }) {
	const canvasRef = (0, import_react.useRef)(null);
	const gameRef = (0, import_react.useRef)(new SnakeGame());
	const audioRef = (0, import_react.useRef)(new SilkAudio());
	const partsRef = (0, import_react.useRef)([]);
	const phaseRef = (0, import_react.useRef)("title");
	const accRef = (0, import_react.useRef)(0);
	const lastRef = (0, import_react.useRef)(0);
	const traumaRef = (0, import_react.useRef)(0);
	const pulseRef = (0, import_react.useRef)(0);
	const bestRef = (0, import_react.useRef)(0);
	const swipeRef = (0, import_react.useRef)(null);
	const [phase, setPhase] = (0, import_react.useState)("title");
	const [score, setScore] = (0, import_react.useState)(0);
	const [best, setBest] = (0, import_react.useState)(0);
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		phaseRef.current = phase;
	}, [phase]);
	(0, import_react.useEffect)(() => {
		loadBg(skin.bgImage);
		const stored = Number(localStorage.getItem(bestKey(skin)) ?? 0);
		const n = Number.isFinite(stored) ? stored : 0;
		setBest(n);
		bestRef.current = n;
		const root = document.documentElement;
		const p = skin.palette;
		root.style.setProperty("--skin-bg", p.bg);
		root.style.setProperty("--skin-surface", p.surface);
		root.style.setProperty("--skin-fg", p.text);
		root.style.setProperty("--skin-muted", p.muted);
		root.style.setProperty("--skin-accent", p.accent);
		root.style.setProperty("--skin-food", p.food);
		root.style.setProperty("--skin-glow", p.glow);
		root.dataset.tone = skin.tone;
		document.title = `${skin.copy.title} · ${skin.label}`;
	}, [skin]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const game = gameRef.current;
		game.reset();
		let raf = 0;
		let running = true;
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			canvas.width = Math.max(1, Math.floor(w * dpr));
			canvas.height = Math.max(1, Math.floor(h * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		const loop = (now) => {
			if (!running) return;
			const dt = Math.min(.05, (now - (lastRef.current || now)) / 1e3);
			lastRef.current = now;
			const t = now / 1e3;
			if (phaseRef.current === "play" && game.alive) {
				accRef.current += dt * 1e3;
				while (accRef.current >= game.tickMs) {
					accRef.current -= game.tickMs;
					const res = game.step();
					setScore(res.score);
					if (res.ate) {
						pulseRef.current = 1;
						traumaRef.current = Math.min(1, traumaRef.current + .22);
						const bite = res.eaten ?? game.food;
						const cell = Math.min(canvas.clientWidth / 13, canvas.clientHeight / 17);
						spawnBurst(partsRef.current, bite, cell, skin.palette.foodHi);
						audioRef.current.eat(skin);
						if (res.score > bestRef.current) {
							bestRef.current = res.score;
							setBest(res.score);
							localStorage.setItem(bestKey(skin), String(res.score));
						}
					}
					if (res.died) {
						traumaRef.current = .7;
						audioRef.current.die(skin);
						setPhase("dead");
					}
				}
			}
			traumaRef.current = Math.max(0, traumaRef.current - dt * 1.8);
			pulseRef.current = Math.max(0, pulseRef.current - dt * 2.4);
			const parts = partsRef.current;
			for (let i = parts.length - 1; i >= 0; i--) {
				const p = parts[i];
				p.life -= dt;
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				p.vx *= .92;
				p.vy *= .92;
				if (p.life <= 0) parts.splice(i, 1);
			}
			const alpha = phaseRef.current === "play" && game.alive ? Math.min(1, accRef.current / game.tickMs) : 1;
			const body = phaseRef.current === "play" ? game.interpolated(alpha) : game.snake;
			paintFrame({
				ctx,
				w: canvas.clientWidth,
				h: canvas.clientHeight,
				skin,
				body,
				food: game.food,
				cols: game.cols,
				rows: game.rows,
				time: t,
				pulse: pulseRef.current,
				particles: parts,
				trauma: traumaRef.current,
				phase: phaseRef.current
			});
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [skin]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code === "Space" || e.code === "Enter") {
				if (phaseRef.current !== "play") {
					e.preventDefault();
					begin();
				}
				return;
			}
			const dir = KEY_DIR[e.code];
			if (!dir) return;
			e.preventDefault();
			if (phaseRef.current !== "play") begin();
			gameRef.current.queue(dir);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const begin = () => {
		audioRef.current.unlock();
		audioRef.current.start(skin);
		gameRef.current.reset();
		accRef.current = 0;
		setScore(0);
		setPhase("play");
	};
	const steer = (dir) => {
		if (phase !== "play") begin();
		gameRef.current.queue(dir);
	};
	const onPointerDown = (e) => {
		swipeRef.current = {
			x: e.clientX,
			y: e.clientY
		};
	};
	const onPointerUp = (e) => {
		const start = swipeRef.current;
		swipeRef.current = null;
		if (!start) return;
		const dx = e.clientX - start.x;
		const dy = e.clientY - start.y;
		if (Math.hypot(dx, dy) < 24) {
			if (phase !== "play") begin();
			return;
		}
		if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? "right" : "left");
		else steer(dy > 0 ? "down" : "up");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "silk-root",
		"data-tone": skin.tone,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "silk-bg",
				style: { backgroundImage: `url(${skin.bgImage})` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "silk-wash" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "silk-canvas",
				onPointerDown,
				onPointerUp,
				onPointerCancel: () => {
					swipeRef.current = null;
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "silk-hud",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "silk-stat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "silk-k",
							children: "分数"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "silk-v",
							children: score
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "silk-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "silk-en",
							children: skin.english
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "silk-food",
							children: skin.copy.food
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "silk-stat silk-stat-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "silk-k",
							children: "最好"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "silk-v",
							children: best
						})]
					})
				]
			}),
			phase !== "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "silk-veil",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "silk-eyebrow",
						children: skin.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "silk-title",
						children: phase === "dead" ? skin.copy.die : skin.copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "silk-sub",
						children: phase === "dead" ? `这一夜走了 ${score} 步` : skin.copy.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "silk-cta",
						onClick: begin,
						children: phase === "dead" ? "再走一次" : skin.copy.start
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "silk-hint",
						children: "方向键或滑动"
					})
				]
			}),
			phase === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "silk-pad",
				"aria-label": "方向",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "silk-dir",
					"aria-label": "上",
					onClick: () => steer("up"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
						size: 20,
						strokeWidth: 1.5
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "silk-pad-mid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "silk-dir",
							"aria-label": "左",
							onClick: () => steer("left"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								size: 20,
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "silk-dir",
							"aria-label": "下",
							onClick: () => steer("down"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								size: 20,
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "silk-dir",
							"aria-label": "右",
							onClick: () => steer("right"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 20,
								strokeWidth: 1.5
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "silk-auth",
				children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "silk-auth-slot" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "silk-login",
					href: "/login",
					children: "登录"
				}) })
			})
		]
	});
}
function Home() {
	const { style, seed } = Route$2.useSearch();
	const q = new URLSearchParams();
	if (style) q.set("style", style);
	if (seed) q.set("seed", seed);
	const search = q.toString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnakeApp, { search: search ? `?${search}` : "" });
}
//#endregion
export { Home as component };
