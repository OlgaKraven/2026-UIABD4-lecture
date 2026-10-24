import { createContext as e, createElement as t, forwardRef as n, useContext as r, useEffect as i, useId as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var f = Object.create, p = Object.defineProperty, m = Object.getOwnPropertyDescriptor, h = Object.getOwnPropertyNames, g = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty, v = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), y = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = h(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !_.call(e, s) && s !== n && p(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = m(t, s)) || r.enumerable
	});
	return e;
}, b = (e, t, n) => (n = e == null ? {} : f(g(e)), y(t || !e || !e.__esModule || !_.call(e, "default") ? p(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), x = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), S = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), C = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), w = (e) => {
	let t = C(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, T = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, ee = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, te = e({}), ne = () => r(te), re = n(({ color: e, size: n, strokeWidth: r, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = ne() ?? {}, h = i ?? f ? Number(r ?? d) * 24 / Number(n ?? u) : r ?? d;
	return t("svg", {
		ref: l,
		...T,
		width: n ?? u ?? T.width,
		height: n ?? u ?? T.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: x("lucide", m, a),
		...!o && !ee(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, n]) => t(e, n)), ...Array.isArray(o) ? o : [o]]);
}), E = (e, r) => {
	let i = n(({ className: n, ...i }, a) => t(re, {
		ref: a,
		iconNode: r,
		className: x(`lucide-${S(w(e))}`, `lucide-${e}`, n),
		...i
	}));
	return i.displayName = w(e), i;
}, ie = E("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), ae = E("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), oe = E("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), se = E("maximize", [
	["path", {
		d: "M8 3H5a2 2 0 0 0-2 2v3",
		key: "1dcmit"
	}],
	["path", {
		d: "M21 8V5a2 2 0 0 0-2-2h-3",
		key: "1e4gt3"
	}],
	["path", {
		d: "M3 16v3a2 2 0 0 0 2 2h3",
		key: "wsl5sc"
	}],
	["path", {
		d: "M16 21h3a2 2 0 0 0 2-2v-3",
		key: "18trek"
	}]
]), ce = E("monitor-play", [
	["path", {
		d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
		key: "vbtd3f"
	}],
	["path", {
		d: "M12 17v4",
		key: "1riwvh"
	}],
	["path", {
		d: "M8 21h8",
		key: "1ev6f3"
	}],
	["rect", {
		x: "2",
		y: "3",
		width: "20",
		height: "14",
		rx: "2",
		key: "x3v2xh"
	}]
]), le = E("mouse-pointer-2", [["path", {
	d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
	key: "edeuup"
}]]), ue = E("pause", [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "kaeet6"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "1wsw3u"
}]]), de = E("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), D = E("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), fe = "0.1.0", pe = () => ({
	script: "",
	preparation: "",
	notebook: "",
	questions: "",
	answer: "",
	estimatedSeconds: 120
});
function O(e) {
	try {
		let t = new URL(e);
		return ["http:", "https:"].includes(t.protocol) ? t.href : "";
	} catch {
		return "";
	}
}
function k(e, t) {
	return O(e) || `${t}${e.replace(/^\//, "")}`;
}
function A(e, t) {
	return O(e) ? O(e) : !e.trim() || e.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(e) || /[\\\u0000-\u001f]/.test(e) ? "" : k(e, t);
}
function me(e) {
	let t = e;
	if (!t || t.schemaVersion !== 1 || !t.id || !t.contentVersion || !t.code || !t.discipline || !Array.isArray(t.semesters) || !Array.isArray(t.lectures) || !t.lectures.length) throw Error("Некорректная конфигурация курса");
	let n = /* @__PURE__ */ new Set(), r = [
		"title",
		"theory",
		"notebook",
		"process",
		"comparison",
		"example",
		"warning",
		"test",
		"summary",
		"literature",
		"materials",
		"section",
		"questions",
		"agenda"
	], i = (e) => {
		if (!Array.isArray(e) || e.some((e) => !e || typeof e.citation != "string" || !e.citation.trim() || e.url && !O(e.url))) throw Error("Некорректная библиография");
	};
	t.literature && (i(t.literature.primary), i(t.literature.additional));
	for (let e of t.lectures) {
		if (!e.id || n.has(e.id) || !t.semesters.includes(e.semester) || !Array.isArray(e.slides) || !e.slides.length) throw Error("Некорректная лекция");
		n.add(e.id);
		for (let t of e.slides) {
			if (!t.id || n.has(t.id) || !t.title || !r.includes(t.kind)) throw Error("Некорректный слайд");
			if (n.add(t.id), t.task && ![
				"single",
				"multiple",
				"short",
				"matching"
			].includes(t.task.type)) throw Error("Неизвестный тип задания");
			if (t.references && i(t.references), t.supplement && (typeof t.supplement.label != "string" || !t.supplement.label.trim() || typeof t.supplement.href != "string" || !A(t.supplement.href, "/"))) throw Error("Некорректная ссылка дополнения");
			if (t.readingGroup && !["primary", "additional"].includes(t.readingGroup)) throw Error("Неизвестная группа литературы");
		}
	}
	let a = (e) => {
		if (e && typeof e == "object") for (let [t, n] of Object.entries(e)) {
			if ([
				"keys",
				"answer",
				"correctAnswer",
				"correctIndexes",
				"script",
				"preparation",
				"notes"
			].includes(t)) throw Error("Приватные данные в публичном курсе");
			a(n);
		}
	};
	a(t);
}
//#endregion
//#region src/engine/storage.ts
function j(e, t) {
	try {
		return JSON.parse(localStorage.getItem(e) || "null") ?? t;
	} catch {
		return t;
	}
}
function M(e, t) {
	try {
		return localStorage.setItem(e, JSON.stringify(t)), !0;
	} catch {
		return !1;
	}
}
function he(e, t) {
	let n = URL.createObjectURL(new Blob([JSON.stringify(t, null, 2)], { type: "application/json" })), r = document.createElement("a");
	r.href = n, r.download = e, r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
}
//#endregion
//#region src/engine/Modal.tsx
function N({ title: e, onClose: t, children: n }) {
	let r = s(null);
	return i(() => {
		let e = document.activeElement;
		return r.current?.showModal(), () => {
			e?.focus();
		};
	}, []), /* @__PURE__ */ d("dialog", {
		ref: r,
		className: "template-dialog",
		"aria-label": e,
		onCancel: (e) => {
			e.preventDefault(), t();
		},
		children: [/* @__PURE__ */ d("div", {
			className: "dialog-heading",
			children: [/* @__PURE__ */ u("h2", { children: e }), /* @__PURE__ */ u("button", {
				className: "icon-button",
				"aria-label": "Закрыть окно",
				onClick: t,
				children: /* @__PURE__ */ u(D, { size: 20 })
			})]
		}), n]
	});
}
//#endregion
//#region ../course/node_modules/qrcode/lib/can-promise.js
var ge = /* @__PURE__ */ v(((e, t) => {
	t.exports = function() {
		return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
	};
})), P = /* @__PURE__ */ v(((e) => {
	var t, n = [
		0,
		26,
		44,
		70,
		100,
		134,
		172,
		196,
		242,
		292,
		346,
		404,
		466,
		532,
		581,
		655,
		733,
		815,
		901,
		991,
		1085,
		1156,
		1258,
		1364,
		1474,
		1588,
		1706,
		1828,
		1921,
		2051,
		2185,
		2323,
		2465,
		2611,
		2761,
		2876,
		3034,
		3196,
		3362,
		3532,
		3706
	];
	e.getSymbolSize = function(e) {
		if (!e) throw Error("\"version\" cannot be null or undefined");
		if (e < 1 || e > 40) throw Error("\"version\" should be in range from 1 to 40");
		return e * 4 + 17;
	}, e.getSymbolTotalCodewords = function(e) {
		return n[e];
	}, e.getBCHDigit = function(e) {
		let t = 0;
		for (; e !== 0;) t++, e >>>= 1;
		return t;
	}, e.setToSJISFunction = function(e) {
		if (typeof e != "function") throw Error("\"toSJISFunc\" is not a valid function.");
		t = e;
	}, e.isKanjiModeEnabled = function() {
		return t !== void 0;
	}, e.toSJIS = function(e) {
		return t(e);
	};
})), F = /* @__PURE__ */ v(((e) => {
	e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
	function t(t) {
		if (typeof t != "string") throw Error("Param is not a string");
		switch (t.toLowerCase()) {
			case "l":
			case "low": return e.L;
			case "m":
			case "medium": return e.M;
			case "q":
			case "quartile": return e.Q;
			case "h":
			case "high": return e.H;
			default: throw Error("Unknown EC Level: " + t);
		}
	}
	e.isValid = function(e) {
		return e && e.bit !== void 0 && e.bit >= 0 && e.bit < 4;
	}, e.from = function(n, r) {
		if (e.isValid(n)) return n;
		try {
			return t(n);
		} catch {
			return r;
		}
	};
})), _e = /* @__PURE__ */ v(((e, t) => {
	function n() {
		this.buffer = [], this.length = 0;
	}
	n.prototype = {
		get: function(e) {
			let t = Math.floor(e / 8);
			return (this.buffer[t] >>> 7 - e % 8 & 1) == 1;
		},
		put: function(e, t) {
			for (let n = 0; n < t; n++) this.putBit((e >>> t - n - 1 & 1) == 1);
		},
		getLengthInBits: function() {
			return this.length;
		},
		putBit: function(e) {
			let t = Math.floor(this.length / 8);
			this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
		}
	}, t.exports = n;
})), ve = /* @__PURE__ */ v(((e, t) => {
	function n(e) {
		if (!e || e < 1) throw Error("BitMatrix size must be defined and greater than 0");
		this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
	}
	n.prototype.set = function(e, t, n, r) {
		let i = e * this.size + t;
		this.data[i] = n, r && (this.reservedBit[i] = !0);
	}, n.prototype.get = function(e, t) {
		return this.data[e * this.size + t];
	}, n.prototype.xor = function(e, t, n) {
		this.data[e * this.size + t] ^= n;
	}, n.prototype.isReserved = function(e, t) {
		return this.reservedBit[e * this.size + t];
	}, t.exports = n;
})), ye = /* @__PURE__ */ v(((e) => {
	var t = P().getSymbolSize;
	e.getRowColCoords = function(e) {
		if (e === 1) return [];
		let n = Math.floor(e / 7) + 2, r = t(e), i = r === 145 ? 26 : Math.ceil((r - 13) / (2 * n - 2)) * 2, a = [r - 7];
		for (let e = 1; e < n - 1; e++) a[e] = a[e - 1] - i;
		return a.push(6), a.reverse();
	}, e.getPositions = function(t) {
		let n = [], r = e.getRowColCoords(t), i = r.length;
		for (let e = 0; e < i; e++) for (let t = 0; t < i; t++) e === 0 && t === 0 || e === 0 && t === i - 1 || e === i - 1 && t === 0 || n.push([r[e], r[t]]);
		return n;
	};
})), be = /* @__PURE__ */ v(((e) => {
	var t = P().getSymbolSize, n = 7;
	e.getPositions = function(e) {
		let r = t(e);
		return [
			[0, 0],
			[r - n, 0],
			[0, r - n]
		];
	};
})), xe = /* @__PURE__ */ v(((e) => {
	e.Patterns = {
		PATTERN000: 0,
		PATTERN001: 1,
		PATTERN010: 2,
		PATTERN011: 3,
		PATTERN100: 4,
		PATTERN101: 5,
		PATTERN110: 6,
		PATTERN111: 7
	};
	var t = {
		N1: 3,
		N2: 3,
		N3: 40,
		N4: 10
	};
	e.isValid = function(e) {
		return e != null && e !== "" && !isNaN(e) && e >= 0 && e <= 7;
	}, e.from = function(t) {
		return e.isValid(t) ? parseInt(t, 10) : void 0;
	}, e.getPenaltyN1 = function(e) {
		let n = e.size, r = 0, i = 0, a = 0, o = null, s = null;
		for (let c = 0; c < n; c++) {
			i = a = 0, o = s = null;
			for (let l = 0; l < n; l++) {
				let n = e.get(c, l);
				n === o ? i++ : (i >= 5 && (r += t.N1 + (i - 5)), o = n, i = 1), n = e.get(l, c), n === s ? a++ : (a >= 5 && (r += t.N1 + (a - 5)), s = n, a = 1);
			}
			i >= 5 && (r += t.N1 + (i - 5)), a >= 5 && (r += t.N1 + (a - 5));
		}
		return r;
	}, e.getPenaltyN2 = function(e) {
		let n = e.size, r = 0;
		for (let t = 0; t < n - 1; t++) for (let i = 0; i < n - 1; i++) {
			let n = e.get(t, i) + e.get(t, i + 1) + e.get(t + 1, i) + e.get(t + 1, i + 1);
			(n === 4 || n === 0) && r++;
		}
		return r * t.N2;
	}, e.getPenaltyN3 = function(e) {
		let n = e.size, r = 0, i = 0, a = 0;
		for (let t = 0; t < n; t++) {
			i = a = 0;
			for (let o = 0; o < n; o++) i = i << 1 & 2047 | e.get(t, o), o >= 10 && (i === 1488 || i === 93) && r++, a = a << 1 & 2047 | e.get(o, t), o >= 10 && (a === 1488 || a === 93) && r++;
		}
		return r * t.N3;
	}, e.getPenaltyN4 = function(e) {
		let n = 0, r = e.data.length;
		for (let t = 0; t < r; t++) n += e.data[t];
		return Math.abs(Math.ceil(n * 100 / r / 5) - 10) * t.N4;
	};
	function n(t, n, r) {
		switch (t) {
			case e.Patterns.PATTERN000: return (n + r) % 2 == 0;
			case e.Patterns.PATTERN001: return n % 2 == 0;
			case e.Patterns.PATTERN010: return r % 3 == 0;
			case e.Patterns.PATTERN011: return (n + r) % 3 == 0;
			case e.Patterns.PATTERN100: return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 == 0;
			case e.Patterns.PATTERN101: return n * r % 2 + n * r % 3 == 0;
			case e.Patterns.PATTERN110: return (n * r % 2 + n * r % 3) % 2 == 0;
			case e.Patterns.PATTERN111: return (n * r % 3 + (n + r) % 2) % 2 == 0;
			default: throw Error("bad maskPattern:" + t);
		}
	}
	e.applyMask = function(e, t) {
		let r = t.size;
		for (let i = 0; i < r; i++) for (let a = 0; a < r; a++) t.isReserved(a, i) || t.xor(a, i, n(e, a, i));
	}, e.getBestMask = function(t, n) {
		let r = Object.keys(e.Patterns).length, i = 0, a = Infinity;
		for (let o = 0; o < r; o++) {
			n(o), e.applyMask(o, t);
			let r = e.getPenaltyN1(t) + e.getPenaltyN2(t) + e.getPenaltyN3(t) + e.getPenaltyN4(t);
			e.applyMask(o, t), r < a && (a = r, i = o);
		}
		return i;
	};
})), I = /* @__PURE__ */ v(((e) => {
	var t = F(), n = [
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		1,
		2,
		2,
		4,
		1,
		2,
		4,
		4,
		2,
		4,
		4,
		4,
		2,
		4,
		6,
		5,
		2,
		4,
		6,
		6,
		2,
		5,
		8,
		8,
		4,
		5,
		8,
		8,
		4,
		5,
		8,
		11,
		4,
		8,
		10,
		11,
		4,
		9,
		12,
		16,
		4,
		9,
		16,
		16,
		6,
		10,
		12,
		18,
		6,
		10,
		17,
		16,
		6,
		11,
		16,
		19,
		6,
		13,
		18,
		21,
		7,
		14,
		21,
		25,
		8,
		16,
		20,
		25,
		8,
		17,
		23,
		25,
		9,
		17,
		23,
		34,
		9,
		18,
		25,
		30,
		10,
		20,
		27,
		32,
		12,
		21,
		29,
		35,
		12,
		23,
		34,
		37,
		12,
		25,
		34,
		40,
		13,
		26,
		35,
		42,
		14,
		28,
		38,
		45,
		15,
		29,
		40,
		48,
		16,
		31,
		43,
		51,
		17,
		33,
		45,
		54,
		18,
		35,
		48,
		57,
		19,
		37,
		51,
		60,
		19,
		38,
		53,
		63,
		20,
		40,
		56,
		66,
		21,
		43,
		59,
		70,
		22,
		45,
		62,
		74,
		24,
		47,
		65,
		77,
		25,
		49,
		68,
		81
	], r = [
		7,
		10,
		13,
		17,
		10,
		16,
		22,
		28,
		15,
		26,
		36,
		44,
		20,
		36,
		52,
		64,
		26,
		48,
		72,
		88,
		36,
		64,
		96,
		112,
		40,
		72,
		108,
		130,
		48,
		88,
		132,
		156,
		60,
		110,
		160,
		192,
		72,
		130,
		192,
		224,
		80,
		150,
		224,
		264,
		96,
		176,
		260,
		308,
		104,
		198,
		288,
		352,
		120,
		216,
		320,
		384,
		132,
		240,
		360,
		432,
		144,
		280,
		408,
		480,
		168,
		308,
		448,
		532,
		180,
		338,
		504,
		588,
		196,
		364,
		546,
		650,
		224,
		416,
		600,
		700,
		224,
		442,
		644,
		750,
		252,
		476,
		690,
		816,
		270,
		504,
		750,
		900,
		300,
		560,
		810,
		960,
		312,
		588,
		870,
		1050,
		336,
		644,
		952,
		1110,
		360,
		700,
		1020,
		1200,
		390,
		728,
		1050,
		1260,
		420,
		784,
		1140,
		1350,
		450,
		812,
		1200,
		1440,
		480,
		868,
		1290,
		1530,
		510,
		924,
		1350,
		1620,
		540,
		980,
		1440,
		1710,
		570,
		1036,
		1530,
		1800,
		570,
		1064,
		1590,
		1890,
		600,
		1120,
		1680,
		1980,
		630,
		1204,
		1770,
		2100,
		660,
		1260,
		1860,
		2220,
		720,
		1316,
		1950,
		2310,
		750,
		1372,
		2040,
		2430
	];
	e.getBlocksCount = function(e, r) {
		switch (r) {
			case t.L: return n[(e - 1) * 4 + 0];
			case t.M: return n[(e - 1) * 4 + 1];
			case t.Q: return n[(e - 1) * 4 + 2];
			case t.H: return n[(e - 1) * 4 + 3];
			default: return;
		}
	}, e.getTotalCodewordsCount = function(e, n) {
		switch (n) {
			case t.L: return r[(e - 1) * 4 + 0];
			case t.M: return r[(e - 1) * 4 + 1];
			case t.Q: return r[(e - 1) * 4 + 2];
			case t.H: return r[(e - 1) * 4 + 3];
			default: return;
		}
	};
})), Se = /* @__PURE__ */ v(((e) => {
	var t = /* @__PURE__ */ new Uint8Array(512), n = /* @__PURE__ */ new Uint8Array(256);
	(function() {
		let e = 1;
		for (let r = 0; r < 255; r++) t[r] = e, n[e] = r, e <<= 1, e & 256 && (e ^= 285);
		for (let e = 255; e < 512; e++) t[e] = t[e - 255];
	})(), e.log = function(e) {
		if (e < 1) throw Error("log(" + e + ")");
		return n[e];
	}, e.exp = function(e) {
		return t[e];
	}, e.mul = function(e, r) {
		return e === 0 || r === 0 ? 0 : t[n[e] + n[r]];
	};
})), Ce = /* @__PURE__ */ v(((e) => {
	var t = Se();
	e.mul = function(e, n) {
		let r = new Uint8Array(e.length + n.length - 1);
		for (let i = 0; i < e.length; i++) for (let a = 0; a < n.length; a++) r[i + a] ^= t.mul(e[i], n[a]);
		return r;
	}, e.mod = function(e, n) {
		let r = new Uint8Array(e);
		for (; r.length - n.length >= 0;) {
			let e = r[0];
			for (let i = 0; i < n.length; i++) r[i] ^= t.mul(n[i], e);
			let i = 0;
			for (; i < r.length && r[i] === 0;) i++;
			r = r.slice(i);
		}
		return r;
	}, e.generateECPolynomial = function(n) {
		let r = new Uint8Array([1]);
		for (let i = 0; i < n; i++) r = e.mul(r, new Uint8Array([1, t.exp(i)]));
		return r;
	};
})), we = /* @__PURE__ */ v(((e, t) => {
	var n = Ce();
	function r(e) {
		this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
	}
	r.prototype.initialize = function(e) {
		this.degree = e, this.genPoly = n.generateECPolynomial(this.degree);
	}, r.prototype.encode = function(e) {
		if (!this.genPoly) throw Error("Encoder not initialized");
		let t = new Uint8Array(e.length + this.degree);
		t.set(e);
		let r = n.mod(t, this.genPoly), i = this.degree - r.length;
		if (i > 0) {
			let e = new Uint8Array(this.degree);
			return e.set(r, i), e;
		}
		return r;
	}, t.exports = r;
})), L = /* @__PURE__ */ v(((e) => {
	e.isValid = function(e) {
		return !isNaN(e) && e >= 1 && e <= 40;
	};
})), R = /* @__PURE__ */ v(((e) => {
	var t = "[0-9]+", n = "[A-Z $%*+\\-./:]+", r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
	r = r.replace(/u/g, "\\u");
	var i = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + ")(?:.|[\r\n]))+";
	e.KANJI = new RegExp(r, "g"), e.BYTE_KANJI = /* @__PURE__ */ RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), e.BYTE = new RegExp(i, "g"), e.NUMERIC = new RegExp(t, "g"), e.ALPHANUMERIC = new RegExp(n, "g");
	var a = RegExp("^" + r + "$"), o = /* @__PURE__ */ RegExp("^[0-9]+$"), s = /* @__PURE__ */ RegExp("^[A-Z0-9 $%*+\\-./:]+$");
	e.testKanji = function(e) {
		return a.test(e);
	}, e.testNumeric = function(e) {
		return o.test(e);
	}, e.testAlphanumeric = function(e) {
		return s.test(e);
	};
})), z = /* @__PURE__ */ v(((e) => {
	var t = L(), n = R();
	e.NUMERIC = {
		id: "Numeric",
		bit: 1,
		ccBits: [
			10,
			12,
			14
		]
	}, e.ALPHANUMERIC = {
		id: "Alphanumeric",
		bit: 2,
		ccBits: [
			9,
			11,
			13
		]
	}, e.BYTE = {
		id: "Byte",
		bit: 4,
		ccBits: [
			8,
			16,
			16
		]
	}, e.KANJI = {
		id: "Kanji",
		bit: 8,
		ccBits: [
			8,
			10,
			12
		]
	}, e.MIXED = { bit: -1 }, e.getCharCountIndicator = function(e, n) {
		if (!e.ccBits) throw Error("Invalid mode: " + e);
		if (!t.isValid(n)) throw Error("Invalid version: " + n);
		return n >= 1 && n < 10 ? e.ccBits[0] : n < 27 ? e.ccBits[1] : e.ccBits[2];
	}, e.getBestModeForData = function(t) {
		return n.testNumeric(t) ? e.NUMERIC : n.testAlphanumeric(t) ? e.ALPHANUMERIC : n.testKanji(t) ? e.KANJI : e.BYTE;
	}, e.toString = function(e) {
		if (e && e.id) return e.id;
		throw Error("Invalid mode");
	}, e.isValid = function(e) {
		return e && e.bit && e.ccBits;
	};
	function r(t) {
		if (typeof t != "string") throw Error("Param is not a string");
		switch (t.toLowerCase()) {
			case "numeric": return e.NUMERIC;
			case "alphanumeric": return e.ALPHANUMERIC;
			case "kanji": return e.KANJI;
			case "byte": return e.BYTE;
			default: throw Error("Unknown mode: " + t);
		}
	}
	e.from = function(t, n) {
		if (e.isValid(t)) return t;
		try {
			return r(t);
		} catch {
			return n;
		}
	};
})), Te = /* @__PURE__ */ v(((e) => {
	var t = P(), n = I(), r = F(), i = z(), a = L(), o = 7973, s = t.getBCHDigit(o);
	function c(t, n, r) {
		for (let i = 1; i <= 40; i++) if (n <= e.getCapacity(i, r, t)) return i;
	}
	function l(e, t) {
		return i.getCharCountIndicator(e, t) + 4;
	}
	function u(e, t) {
		let n = 0;
		return e.forEach(function(e) {
			let r = l(e.mode, t);
			n += r + e.getBitsLength();
		}), n;
	}
	function d(t, n) {
		for (let r = 1; r <= 40; r++) if (u(t, r) <= e.getCapacity(r, n, i.MIXED)) return r;
	}
	e.from = function(e, t) {
		return a.isValid(e) ? parseInt(e, 10) : t;
	}, e.getCapacity = function(e, r, o) {
		if (!a.isValid(e)) throw Error("Invalid QR Code version");
		o === void 0 && (o = i.BYTE);
		let s = (t.getSymbolTotalCodewords(e) - n.getTotalCodewordsCount(e, r)) * 8;
		if (o === i.MIXED) return s;
		let c = s - l(o, e);
		switch (o) {
			case i.NUMERIC: return Math.floor(c / 10 * 3);
			case i.ALPHANUMERIC: return Math.floor(c / 11 * 2);
			case i.KANJI: return Math.floor(c / 13);
			case i.BYTE:
			default: return Math.floor(c / 8);
		}
	}, e.getBestVersionForData = function(e, t) {
		let n, i = r.from(t, r.M);
		if (Array.isArray(e)) {
			if (e.length > 1) return d(e, i);
			if (e.length === 0) return 1;
			n = e[0];
		} else n = e;
		return c(n.mode, n.getLength(), i);
	}, e.getEncodedBits = function(e) {
		if (!a.isValid(e) || e < 7) throw Error("Invalid QR Code version");
		let n = e << 12;
		for (; t.getBCHDigit(n) - s >= 0;) n ^= o << t.getBCHDigit(n) - s;
		return e << 12 | n;
	};
})), Ee = /* @__PURE__ */ v(((e) => {
	var t = P(), n = 1335, r = 21522, i = t.getBCHDigit(n);
	e.getEncodedBits = function(e, a) {
		let o = e.bit << 3 | a, s = o << 10;
		for (; t.getBCHDigit(s) - i >= 0;) s ^= n << t.getBCHDigit(s) - i;
		return (o << 10 | s) ^ r;
	};
})), De = /* @__PURE__ */ v(((e, t) => {
	var n = z();
	function r(e) {
		this.mode = n.NUMERIC, this.data = e.toString();
	}
	r.getBitsLength = function(e) {
		return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
	}, r.prototype.getLength = function() {
		return this.data.length;
	}, r.prototype.getBitsLength = function() {
		return r.getBitsLength(this.data.length);
	}, r.prototype.write = function(e) {
		let t, n, r;
		for (t = 0; t + 3 <= this.data.length; t += 3) n = this.data.substr(t, 3), r = parseInt(n, 10), e.put(r, 10);
		let i = this.data.length - t;
		i > 0 && (n = this.data.substr(t), r = parseInt(n, 10), e.put(r, i * 3 + 1));
	}, t.exports = r;
})), Oe = /* @__PURE__ */ v(((e, t) => {
	var n = z(), r = /* @__PURE__ */ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
	function i(e) {
		this.mode = n.ALPHANUMERIC, this.data = e;
	}
	i.getBitsLength = function(e) {
		return 11 * Math.floor(e / 2) + e % 2 * 6;
	}, i.prototype.getLength = function() {
		return this.data.length;
	}, i.prototype.getBitsLength = function() {
		return i.getBitsLength(this.data.length);
	}, i.prototype.write = function(e) {
		let t;
		for (t = 0; t + 2 <= this.data.length; t += 2) {
			let n = r.indexOf(this.data[t]) * 45;
			n += r.indexOf(this.data[t + 1]), e.put(n, 11);
		}
		this.data.length % 2 && e.put(r.indexOf(this.data[t]), 6);
	}, t.exports = i;
})), ke = /* @__PURE__ */ v(((e, t) => {
	var n = z();
	function r(e) {
		this.mode = n.BYTE, this.data = typeof e == "string" ? new TextEncoder().encode(e) : new Uint8Array(e);
	}
	r.getBitsLength = function(e) {
		return e * 8;
	}, r.prototype.getLength = function() {
		return this.data.length;
	}, r.prototype.getBitsLength = function() {
		return r.getBitsLength(this.data.length);
	}, r.prototype.write = function(e) {
		for (let t = 0, n = this.data.length; t < n; t++) e.put(this.data[t], 8);
	}, t.exports = r;
})), Ae = /* @__PURE__ */ v(((e, t) => {
	var n = z(), r = P();
	function i(e) {
		this.mode = n.KANJI, this.data = e;
	}
	i.getBitsLength = function(e) {
		return e * 13;
	}, i.prototype.getLength = function() {
		return this.data.length;
	}, i.prototype.getBitsLength = function() {
		return i.getBitsLength(this.data.length);
	}, i.prototype.write = function(e) {
		let t;
		for (t = 0; t < this.data.length; t++) {
			let n = r.toSJIS(this.data[t]);
			if (n >= 33088 && n <= 40956) n -= 33088;
			else if (n >= 57408 && n <= 60351) n -= 49472;
			else throw Error("Invalid SJIS character: " + this.data[t] + "\nMake sure your charset is UTF-8");
			n = (n >>> 8 & 255) * 192 + (n & 255), e.put(n, 13);
		}
	}, t.exports = i;
})), je = /* @__PURE__ */ v(((e, t) => {
	var n = {
		single_source_shortest_paths: function(e, t, r) {
			var i = {}, a = {};
			a[t] = 0;
			var o = n.PriorityQueue.make();
			o.push(t, 0);
			for (var s, c, l, u, d, f, p, m, h; !o.empty();) for (l in s = o.pop(), c = s.value, u = s.cost, d = e[c] || {}, d) d.hasOwnProperty(l) && (f = d[l], p = u + f, m = a[l], h = a[l] === void 0, (h || m > p) && (a[l] = p, o.push(l, p), i[l] = c));
			if (r !== void 0 && a[r] === void 0) {
				var g = [
					"Could not find a path from ",
					t,
					" to ",
					r,
					"."
				].join("");
				throw Error(g);
			}
			return i;
		},
		extract_shortest_path_from_predecessor_list: function(e, t) {
			for (var n = [], r = t; r;) n.push(r), e[r], r = e[r];
			return n.reverse(), n;
		},
		find_path: function(e, t, r) {
			var i = n.single_source_shortest_paths(e, t, r);
			return n.extract_shortest_path_from_predecessor_list(i, r);
		},
		PriorityQueue: {
			make: function(e) {
				var t = n.PriorityQueue, r = {}, i;
				for (i in e ||= {}, t) t.hasOwnProperty(i) && (r[i] = t[i]);
				return r.queue = [], r.sorter = e.sorter || t.default_sorter, r;
			},
			default_sorter: function(e, t) {
				return e.cost - t.cost;
			},
			push: function(e, t) {
				var n = {
					value: e,
					cost: t
				};
				this.queue.push(n), this.queue.sort(this.sorter);
			},
			pop: function() {
				return this.queue.shift();
			},
			empty: function() {
				return this.queue.length === 0;
			}
		}
	};
	t !== void 0 && (t.exports = n);
})), Me = /* @__PURE__ */ v(((e) => {
	var t = z(), n = De(), r = Oe(), i = ke(), a = Ae(), o = R(), s = P(), c = je();
	function l(e) {
		return unescape(encodeURIComponent(e)).length;
	}
	function u(e, t, n) {
		let r = [], i;
		for (; (i = e.exec(n)) !== null;) r.push({
			data: i[0],
			index: i.index,
			mode: t,
			length: i[0].length
		});
		return r;
	}
	function d(e) {
		let n = u(o.NUMERIC, t.NUMERIC, e), r = u(o.ALPHANUMERIC, t.ALPHANUMERIC, e), i, a;
		return s.isKanjiModeEnabled() ? (i = u(o.BYTE, t.BYTE, e), a = u(o.KANJI, t.KANJI, e)) : (i = u(o.BYTE_KANJI, t.BYTE, e), a = []), n.concat(r, i, a).sort(function(e, t) {
			return e.index - t.index;
		}).map(function(e) {
			return {
				data: e.data,
				mode: e.mode,
				length: e.length
			};
		});
	}
	function f(e, o) {
		switch (o) {
			case t.NUMERIC: return n.getBitsLength(e);
			case t.ALPHANUMERIC: return r.getBitsLength(e);
			case t.KANJI: return a.getBitsLength(e);
			case t.BYTE: return i.getBitsLength(e);
		}
	}
	function p(e) {
		return e.reduce(function(e, t) {
			let n = e.length - 1 >= 0 ? e[e.length - 1] : null;
			return n && n.mode === t.mode ? (e[e.length - 1].data += t.data, e) : (e.push(t), e);
		}, []);
	}
	function m(e) {
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			switch (i.mode) {
				case t.NUMERIC:
					n.push([
						i,
						{
							data: i.data,
							mode: t.ALPHANUMERIC,
							length: i.length
						},
						{
							data: i.data,
							mode: t.BYTE,
							length: i.length
						}
					]);
					break;
				case t.ALPHANUMERIC:
					n.push([i, {
						data: i.data,
						mode: t.BYTE,
						length: i.length
					}]);
					break;
				case t.KANJI:
					n.push([i, {
						data: i.data,
						mode: t.BYTE,
						length: l(i.data)
					}]);
					break;
				case t.BYTE: n.push([{
					data: i.data,
					mode: t.BYTE,
					length: l(i.data)
				}]);
			}
		}
		return n;
	}
	function h(e, n) {
		let r = {}, i = { start: {} }, a = ["start"];
		for (let o = 0; o < e.length; o++) {
			let s = e[o], c = [];
			for (let e = 0; e < s.length; e++) {
				let l = s[e], u = "" + o + e;
				c.push(u), r[u] = {
					node: l,
					lastCount: 0
				}, i[u] = {};
				for (let e = 0; e < a.length; e++) {
					let o = a[e];
					r[o] && r[o].node.mode === l.mode ? (i[o][u] = f(r[o].lastCount + l.length, l.mode) - f(r[o].lastCount, l.mode), r[o].lastCount += l.length) : (r[o] && (r[o].lastCount = l.length), i[o][u] = f(l.length, l.mode) + 4 + t.getCharCountIndicator(l.mode, n));
				}
			}
			a = c;
		}
		for (let e = 0; e < a.length; e++) i[a[e]].end = 0;
		return {
			map: i,
			table: r
		};
	}
	function g(e, o) {
		let c, l = t.getBestModeForData(e);
		if (c = t.from(o, l), c !== t.BYTE && c.bit < l.bit) throw Error("\"" + e + "\" cannot be encoded with mode " + t.toString(c) + ".\n Suggested mode is: " + t.toString(l));
		switch (c === t.KANJI && !s.isKanjiModeEnabled() && (c = t.BYTE), c) {
			case t.NUMERIC: return new n(e);
			case t.ALPHANUMERIC: return new r(e);
			case t.KANJI: return new a(e);
			case t.BYTE: return new i(e);
		}
	}
	e.fromArray = function(e) {
		return e.reduce(function(e, t) {
			return typeof t == "string" ? e.push(g(t, null)) : t.data && e.push(g(t.data, t.mode)), e;
		}, []);
	}, e.fromString = function(t, n) {
		let r = h(m(d(t, s.isKanjiModeEnabled())), n), i = c.find_path(r.map, "start", "end"), a = [];
		for (let e = 1; e < i.length - 1; e++) a.push(r.table[i[e]].node);
		return e.fromArray(p(a));
	}, e.rawSplit = function(t) {
		return e.fromArray(d(t, s.isKanjiModeEnabled()));
	};
})), Ne = /* @__PURE__ */ v(((e) => {
	var t = P(), n = F(), r = _e(), i = ve(), a = ye(), o = be(), s = xe(), c = I(), l = we(), u = Te(), d = Ee(), f = z(), p = Me();
	function m(e, t) {
		let n = e.size, r = o.getPositions(t);
		for (let t = 0; t < r.length; t++) {
			let i = r[t][0], a = r[t][1];
			for (let t = -1; t <= 7; t++) if (!(i + t <= -1 || n <= i + t)) for (let r = -1; r <= 7; r++) a + r <= -1 || n <= a + r || (t >= 0 && t <= 6 && (r === 0 || r === 6) || r >= 0 && r <= 6 && (t === 0 || t === 6) || t >= 2 && t <= 4 && r >= 2 && r <= 4 ? e.set(i + t, a + r, !0, !0) : e.set(i + t, a + r, !1, !0));
		}
	}
	function h(e) {
		let t = e.size;
		for (let n = 8; n < t - 8; n++) {
			let t = n % 2 == 0;
			e.set(n, 6, t, !0), e.set(6, n, t, !0);
		}
	}
	function g(e, t) {
		let n = a.getPositions(t);
		for (let t = 0; t < n.length; t++) {
			let r = n[t][0], i = n[t][1];
			for (let t = -2; t <= 2; t++) for (let n = -2; n <= 2; n++) t === -2 || t === 2 || n === -2 || n === 2 || t === 0 && n === 0 ? e.set(r + t, i + n, !0, !0) : e.set(r + t, i + n, !1, !0);
		}
	}
	function _(e, t) {
		let n = e.size, r = u.getEncodedBits(t), i, a, o;
		for (let t = 0; t < 18; t++) i = Math.floor(t / 3), a = t % 3 + n - 8 - 3, o = (r >> t & 1) == 1, e.set(i, a, o, !0), e.set(a, i, o, !0);
	}
	function v(e, t, n) {
		let r = e.size, i = d.getEncodedBits(t, n), a, o;
		for (a = 0; a < 15; a++) o = (i >> a & 1) == 1, a < 6 ? e.set(a, 8, o, !0) : a < 8 ? e.set(a + 1, 8, o, !0) : e.set(r - 15 + a, 8, o, !0), a < 8 ? e.set(8, r - a - 1, o, !0) : a < 9 ? e.set(8, 15 - a - 1 + 1, o, !0) : e.set(8, 15 - a - 1, o, !0);
		e.set(r - 8, 8, 1, !0);
	}
	function y(e, t) {
		let n = e.size, r = -1, i = n - 1, a = 7, o = 0;
		for (let s = n - 1; s > 0; s -= 2) for (s === 6 && s--;;) {
			for (let n = 0; n < 2; n++) if (!e.isReserved(i, s - n)) {
				let r = !1;
				o < t.length && (r = (t[o] >>> a & 1) == 1), e.set(i, s - n, r), a--, a === -1 && (o++, a = 7);
			}
			if (i += r, i < 0 || n <= i) {
				i -= r, r = -r;
				break;
			}
		}
	}
	function b(e, n, i) {
		let a = new r();
		i.forEach(function(t) {
			a.put(t.mode.bit, 4), a.put(t.getLength(), f.getCharCountIndicator(t.mode, e)), t.write(a);
		});
		let o = (t.getSymbolTotalCodewords(e) - c.getTotalCodewordsCount(e, n)) * 8;
		for (a.getLengthInBits() + 4 <= o && a.put(0, 4); a.getLengthInBits() % 8 != 0;) a.putBit(0);
		let s = (o - a.getLengthInBits()) / 8;
		for (let e = 0; e < s; e++) a.put(e % 2 ? 17 : 236, 8);
		return x(a, e, n);
	}
	function x(e, n, r) {
		let i = t.getSymbolTotalCodewords(n), a = i - c.getTotalCodewordsCount(n, r), o = c.getBlocksCount(n, r), s = o - i % o, u = Math.floor(i / o), d = Math.floor(a / o), f = d + 1, p = u - d, m = new l(p), h = 0, g = Array(o), _ = Array(o), v = 0, y = new Uint8Array(e.buffer);
		for (let e = 0; e < o; e++) {
			let t = e < s ? d : f;
			g[e] = y.slice(h, h + t), _[e] = m.encode(g[e]), h += t, v = Math.max(v, t);
		}
		let b = new Uint8Array(i), x = 0, S, C;
		for (S = 0; S < v; S++) for (C = 0; C < o; C++) S < g[C].length && (b[x++] = g[C][S]);
		for (S = 0; S < p; S++) for (C = 0; C < o; C++) b[x++] = _[C][S];
		return b;
	}
	function S(e, n, r, a) {
		let o;
		if (Array.isArray(e)) o = p.fromArray(e);
		else if (typeof e == "string") {
			let t = n;
			if (!t) {
				let n = p.rawSplit(e);
				t = u.getBestVersionForData(n, r);
			}
			o = p.fromString(e, t || 40);
		} else throw Error("Invalid data");
		let c = u.getBestVersionForData(o, r);
		if (!c) throw Error("The amount of data is too big to be stored in a QR Code");
		if (!n) n = c;
		else if (n < c) throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + c + ".\n");
		let l = b(n, r, o), d = new i(t.getSymbolSize(n));
		return m(d, n), h(d), g(d, n), v(d, r, 0), n >= 7 && _(d, n), y(d, l), isNaN(a) && (a = s.getBestMask(d, v.bind(null, d, r))), s.applyMask(a, d), v(d, r, a), {
			modules: d,
			version: n,
			errorCorrectionLevel: r,
			maskPattern: a,
			segments: o
		};
	}
	e.create = function(e, r) {
		if (e === void 0 || e === "") throw Error("No input text");
		let i = n.M, a, o;
		return r !== void 0 && (i = n.from(r.errorCorrectionLevel, n.M), a = u.from(r.version), o = s.from(r.maskPattern), r.toSJISFunc && t.setToSJISFunction(r.toSJISFunc)), S(e, a, i, o);
	};
})), B = /* @__PURE__ */ v(((e) => {
	function t(e) {
		if (typeof e == "number" && (e = e.toString()), typeof e != "string") throw Error("Color should be defined as hex string");
		let t = e.slice().replace("#", "").split("");
		if (t.length < 3 || t.length === 5 || t.length > 8) throw Error("Invalid hex color: " + e);
		(t.length === 3 || t.length === 4) && (t = Array.prototype.concat.apply([], t.map(function(e) {
			return [e, e];
		}))), t.length === 6 && t.push("F", "F");
		let n = parseInt(t.join(""), 16);
		return {
			r: n >> 24 & 255,
			g: n >> 16 & 255,
			b: n >> 8 & 255,
			a: n & 255,
			hex: "#" + t.slice(0, 6).join("")
		};
	}
	e.getOptions = function(e) {
		e ||= {}, e.color || (e.color = {});
		let n = e.margin === void 0 || e.margin === null || e.margin < 0 ? 4 : e.margin, r = e.width && e.width >= 21 ? e.width : void 0, i = e.scale || 4;
		return {
			width: r,
			scale: r ? 4 : i,
			margin: n,
			color: {
				dark: t(e.color.dark || "#000000ff"),
				light: t(e.color.light || "#ffffffff")
			},
			type: e.type,
			rendererOpts: e.rendererOpts || {}
		};
	}, e.getScale = function(e, t) {
		return t.width && t.width >= e + t.margin * 2 ? t.width / (e + t.margin * 2) : t.scale;
	}, e.getImageWidth = function(t, n) {
		let r = e.getScale(t, n);
		return Math.floor((t + n.margin * 2) * r);
	}, e.qrToImageData = function(t, n, r) {
		let i = n.modules.size, a = n.modules.data, o = e.getScale(i, r), s = Math.floor((i + r.margin * 2) * o), c = r.margin * o, l = [r.color.light, r.color.dark];
		for (let e = 0; e < s; e++) for (let n = 0; n < s; n++) {
			let u = (e * s + n) * 4, d = r.color.light;
			if (e >= c && n >= c && e < s - c && n < s - c) {
				let t = Math.floor((e - c) / o), r = Math.floor((n - c) / o);
				d = l[+!!a[t * i + r]];
			}
			t[u++] = d.r, t[u++] = d.g, t[u++] = d.b, t[u] = d.a;
		}
	};
})), Pe = /* @__PURE__ */ v(((e) => {
	var t = B();
	function n(e, t, n) {
		e.clearRect(0, 0, t.width, t.height), t.style ||= {}, t.height = n, t.width = n, t.style.height = n + "px", t.style.width = n + "px";
	}
	function r() {
		try {
			return document.createElement("canvas");
		} catch {
			throw Error("You need to specify a canvas element");
		}
	}
	e.render = function(e, i, a) {
		let o = a, s = i;
		o === void 0 && (!i || !i.getContext) && (o = i, i = void 0), i || (s = r()), o = t.getOptions(o);
		let c = t.getImageWidth(e.modules.size, o), l = s.getContext("2d"), u = l.createImageData(c, c);
		return t.qrToImageData(u.data, e, o), n(l, s, c), l.putImageData(u, 0, 0), s;
	}, e.renderToDataURL = function(t, n, r) {
		let i = r;
		i === void 0 && (!n || !n.getContext) && (i = n, n = void 0), i ||= {};
		let a = e.render(t, n, i), o = i.type || "image/png", s = i.rendererOpts || {};
		return a.toDataURL(o, s.quality);
	};
})), Fe = /* @__PURE__ */ v(((e) => {
	var t = B();
	function n(e, t) {
		let n = e.a / 255, r = t + "=\"" + e.hex + "\"";
		return n < 1 ? r + " " + t + "-opacity=\"" + n.toFixed(2).slice(1) + "\"" : r;
	}
	function r(e, t, n) {
		let r = e + t;
		return n !== void 0 && (r += " " + n), r;
	}
	function i(e, t, n) {
		let i = "", a = 0, o = !1, s = 0;
		for (let c = 0; c < e.length; c++) {
			let l = Math.floor(c % t), u = Math.floor(c / t);
			!l && !o && (o = !0), e[c] ? (s++, c > 0 && l > 0 && e[c - 1] || (i += o ? r("M", l + n, .5 + u + n) : r("m", a, 0), a = 0, o = !1), l + 1 < t && e[c + 1] || (i += r("h", s), s = 0)) : a++;
		}
		return i;
	}
	e.render = function(e, r, a) {
		let o = t.getOptions(r), s = e.modules.size, c = e.modules.data, l = s + o.margin * 2, u = o.color.light.a ? "<path " + n(o.color.light, "fill") + " d=\"M0 0h" + l + "v" + l + "H0z\"/>" : "", d = "<path " + n(o.color.dark, "stroke") + " d=\"" + i(c, s, o.margin) + "\"/>", f = "viewBox=\"0 0 " + l + " " + l + "\"", p = "<svg xmlns=\"http://www.w3.org/2000/svg\" " + (o.width ? "width=\"" + o.width + "\" height=\"" + o.width + "\" " : "") + f + " shape-rendering=\"crispEdges\">" + u + d + "</svg>\n";
		return typeof a == "function" && a(null, p), p;
	};
})), Ie = /* @__PURE__ */ b((/* @__PURE__ */ v(((e) => {
	var t = ge(), n = Ne(), r = Pe(), i = Fe();
	function a(e, r, i, a, o) {
		let s = [].slice.call(arguments, 1), c = s.length, l = typeof s[c - 1] == "function";
		if (!l && !t()) throw Error("Callback required as last argument");
		if (l) {
			if (c < 2) throw Error("Too few arguments provided");
			c === 2 ? (o = i, i = r, r = a = void 0) : c === 3 && (r.getContext && o === void 0 ? (o = a, a = void 0) : (o = a, a = i, i = r, r = void 0));
		} else {
			if (c < 1) throw Error("Too few arguments provided");
			return c === 1 ? (i = r, r = a = void 0) : c === 2 && !r.getContext && (a = i, i = r, r = void 0), new Promise(function(t, o) {
				try {
					t(e(n.create(i, a), r, a));
				} catch (e) {
					o(e);
				}
			});
		}
		try {
			let t = n.create(i, a);
			o(null, e(t, r, a));
		} catch (e) {
			o(e);
		}
	}
	e.create = n.create, e.toCanvas = a.bind(null, r.render), e.toDataURL = a.bind(null, r.renderToDataURL), e.toString = a.bind(null, function(e, t, n) {
		return i.render(e, n);
	});
})))(), 1);
function Le({ url: e }) {
	let t = o(() => Ie.create(e, { errorCorrectionLevel: "M" }).modules, [e]), n = t.size, r = Array.from({ length: n * n }, (e, r) => t.data[r] ? `M${r % n + 4} ${Math.floor(r / n) + 4}h1v1h-1z` : "").join("");
	return /* @__PURE__ */ d("svg", {
		className: "resource-qr",
		viewBox: `0 0 ${n + 8} ${n + 8}`,
		role: "img",
		"aria-label": "QR-код ссылки",
		shapeRendering: "crispEdges",
		children: [/* @__PURE__ */ u("rect", {
			width: n + 8,
			height: n + 8,
			fill: "white"
		}), /* @__PURE__ */ u("path", {
			d: r,
			fill: "black"
		})]
	});
}
function Re({ course: e, slide: t, base: n }) {
	if (t.kind === "materials") {
		let t = O(j(`lecture:${n}:${e.id}:materials`, e.materialsUrl));
		return t ? /* @__PURE__ */ d("div", {
			className: "materials-resource",
			children: [/* @__PURE__ */ u(Le, { url: t }), /* @__PURE__ */ d("div", { children: [
				/* @__PURE__ */ u("strong", { children: "Ссылка на материалы" }),
				/* @__PURE__ */ d("a", {
					href: t,
					target: "_blank",
					rel: "noreferrer",
					children: [t, " ↗"]
				}),
				/* @__PURE__ */ u("p", { children: "Отсканируйте QR-код или откройте ссылку." })
			] })]
		}) : /* @__PURE__ */ u("p", {
			className: "resource-empty",
			children: "Ссылка на материалы пока не указана. Добавьте её через «Прикрепить материалы» на главной странице."
		});
	}
	let r = t.references ?? e.literature?.[t.readingGroup || "primary"] ?? [];
	return r.length ? /* @__PURE__ */ u("div", {
		className: "reading-list",
		children: r.map((e, t) => {
			let n = e.url && O(e.url);
			return /* @__PURE__ */ d("div", {
				className: "reading-entry",
				children: [n && /* @__PURE__ */ u(Le, { url: n }), /* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("p", { children: e.citation }), n && /* @__PURE__ */ u("a", {
					href: n,
					target: "_blank",
					rel: "noreferrer",
					children: "Открыть источник ↗"
				})] })]
			}, t);
		})
	}) : /* @__PURE__ */ u("p", {
		className: "resource-empty",
		children: "Список литературы для этой дисциплины пока не заполнен."
	});
}
//#endregion
//#region src/engine/ExtendedInfographic.tsx
var V = [
	"#DE040D",
	"#4561C8",
	"#1C8D00",
	"#66758A",
	"#9A7079",
	"#4561C8"
], H = 1.3;
function ze(e, t) {
	let n = Math.max(4, Math.floor(t)), r = [], i = "";
	for (let t of e.trim().split(/\s+/)) {
		let e = Array.from(t), a = Array.from({ length: Math.max(1, Math.ceil(e.length / n)) }, (t, r) => e.slice(r * n, (r + 1) * n).join(""));
		for (let e of a) {
			let t = i ? `${i} ${e}` : e;
			Array.from(t).length > n && i ? (r.push(i), i = e) : i = t;
		}
	}
	return i && r.push(i), r.length ? r : [""];
}
function U(e, t, n) {
	return ze(e, t / (n * .58));
}
function W(e, t, n) {
	return U(e, t, n).length * n * H;
}
function G({ s: e, x: t, y: n, max: r = 22, size: i = 22, bold: a = !1, fill: o = "#1c1c1c", width: s, kind: c }) {
	let l = s === void 0 ? ze(e, r) : U(e, s, i);
	return /* @__PURE__ */ u("text", {
		className: `svg-label svg-label--${c || (a ? "title" : "body")}`,
		x: t,
		y: n,
		textAnchor: "middle",
		fill: o,
		fontSize: i,
		fontWeight: a ? 750 : 450,
		children: l.map((e, n) => /* @__PURE__ */ u("tspan", {
			x: t,
			dy: n ? `${H}em` : 0,
			children: e
		}, n))
	});
}
function K({ x: e, y: t, w: n = 280, h: r = 80, title: i, body: a, color: o = "#4561C8", titleSize: s = 22, bodySize: c = 20, adaptive: l = !1 }) {
	let f = W(i, n - 36, s), p = 36 + f + (a ? 14 + W(a, n - 36, c) : 0);
	return /* @__PURE__ */ d("g", { children: [
		/* @__PURE__ */ u("rect", {
			x: e,
			y: t,
			width: n,
			height: l ? Math.max(r, p) : r,
			rx: "12",
			fill: "#f5f5f7",
			stroke: o,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ u(G, {
			s: i,
			x: e + n / 2,
			y: l ? t + 18 + s : t + 34,
			size: s,
			width: l ? n - 36 : void 0,
			max: Math.round(n / 13),
			kind: "title",
			bold: !0
		}),
		a && /* @__PURE__ */ u(G, {
			s: a,
			x: e + n / 2,
			y: l ? t + 18 + f + 14 + c : t + 73,
			size: c,
			width: l ? n - 36 : void 0,
			max: Math.round(n / 12),
			kind: "body"
		})
	] });
}
function Be(e) {
	let t = Math.max(136, ...e.items.map((e, t) => 36 + W(`${t + 1}. ${e.title}`, 264, 27) + 14 + W(e.text, 264, 24))), n = 20 + t + 84, r = e.items.length === 3 ? [
		{
			x: 210,
			y: 20 + t / 2
		},
		{
			x: 830,
			y: 20 + t / 2
		},
		{
			x: 520,
			y: n + t / 2
		}
	] : e.items.length <= 4 ? [
		{
			x: 250,
			y: 20 + t / 2
		},
		{
			x: 790,
			y: 20 + t / 2
		},
		{
			x: 790,
			y: n + t / 2
		},
		{
			x: 250,
			y: n + t / 2
		}
	].slice(0, e.items.length) : e.items.map((t, n) => ({
		x: 520 + 350 * Math.cos(-Math.PI / 2 + n * 2 * Math.PI / e.items.length),
		y: 250 + 170 * Math.sin(-Math.PI / 2 + n * 2 * Math.PI / e.items.length)
	})), i = e.items.length <= 2 ? 20 + t + 58 : 20 + t + 42 + 8;
	return {
		width: 300,
		height: t,
		positions: r,
		H: Math.max(Math.max(...r.map((e) => e.y + t / 2)) + 24, i + 24),
		labelY: i
	};
}
function Ve(e) {
	let t = 1e3 / e.columns.length, n = Math.max(60, ...e.columns.map((e) => W(e, t - 28, 26) + 28)), r = e.rows.map((e) => Math.max(62, ...e.map((e) => W(e, t - 28, 24) + 28)));
	return {
		columnWidth: t,
		headerSize: 26,
		bodySize: 24,
		pad: 14,
		headerHeight: n,
		rowHeights: r,
		H: 10 + n + r.reduce((e, t) => e + t, 0) + 24
	};
}
function He(e) {
	return e.type === "cycle" ? Be(e).H : e.type === "comparison" || e.type === "matrix" ? Ve(e).H : 400;
}
function Ue({ visual: e, marker: t, base: n }) {
	let r = `url(#${t})`;
	if (e.type === "cycle") {
		let t = Be(e);
		return /* @__PURE__ */ d(l, { children: [
			e.items.length > 1 && t.positions.map((n, i) => {
				let a = t.positions[(i + 1) % t.positions.length], o = a.x - n.x, s = a.y - n.y, c = 1 / Math.max(Math.abs(o) / (t.width / 2 + 9), Math.abs(s) / (t.height / 2 + 9)), l = n.y + (i === 0 ? -22 : 22), d = e.items.length === 2 ? `M${n.x + Math.sign(o) * (t.width / 2 + 8)} ${l} H${a.x - Math.sign(o) * (t.width / 2 + 12)}` : `M${n.x + o * c} ${n.y + s * c} L${a.x - o * c} ${a.y - s * c}`;
				return /* @__PURE__ */ u("path", {
					d,
					stroke: V[i % V.length],
					strokeWidth: "4",
					fill: "none",
					markerEnd: r
				}, `edge-${i}`);
			}),
			e.items.map((e, n) => {
				let r = t.positions[n];
				return /* @__PURE__ */ u(K, {
					x: r.x - t.width / 2,
					y: r.y - t.height / 2,
					w: t.width,
					h: t.height,
					title: `${n + 1}. ${e.title}`,
					body: e.text,
					color: V[n % V.length],
					titleSize: 27,
					bodySize: 24,
					adaptive: !0
				}, n);
			}),
			/* @__PURE__ */ u(G, {
				s: "Повторять цикл",
				x: 520,
				y: t.labelY,
				width: 260,
				size: 24,
				kind: "edge",
				bold: !0
			})
		] });
	}
	if (e.type === "comparison" || e.type === "matrix") {
		let t = Ve(e), n = 10 + t.headerHeight, r = e.rows.map((e, r) => {
			let i = {
				row: e,
				y: n,
				h: t.rowHeights[r]
			};
			return n += i.h, i;
		});
		return /* @__PURE__ */ d(l, { children: [e.columns.map((e, n) => /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u("rect", {
			x: 20 + n * t.columnWidth,
			y: "10",
			width: t.columnWidth,
			height: t.headerHeight,
			fill: "#1c1c1c"
		}), /* @__PURE__ */ u(G, {
			s: e,
			x: 20 + (n + .5) * t.columnWidth,
			y: 10 + t.pad + t.headerSize,
			width: t.columnWidth - t.pad * 2,
			size: t.headerSize,
			fill: "white",
			kind: "title",
			bold: !0
		})] }, `header-${n}`)), r.map(({ row: e, y: n, h: r }, i) => e.map((e, a) => /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u("rect", {
			x: 20 + a * t.columnWidth,
			y: n,
			width: t.columnWidth,
			height: r,
			fill: i % 2 ? "#f1f2f5" : "#fff",
			stroke: "#d4d5da"
		}), /* @__PURE__ */ u(G, {
			s: e,
			x: 20 + (a + .5) * t.columnWidth,
			y: n + t.pad + t.bodySize,
			width: t.columnWidth - t.pad * 2,
			size: t.bodySize,
			bold: a === 0,
			kind: "body"
		})] }, `${i}-${a}`)))] });
	}
	if (e.type === "decision") return /* @__PURE__ */ d(l, { children: [
		/* @__PURE__ */ u(K, {
			x: 365,
			y: 5,
			w: 310,
			h: 60,
			title: e.start
		}),
		/* @__PURE__ */ u("path", {
			d: "M520 65 V96",
			stroke: "#66758A",
			strokeWidth: "3",
			markerEnd: r
		}),
		/* @__PURE__ */ u("path", {
			d: "M520 100 L730 200 L520 300 L310 200 Z",
			fill: "#fff1f1",
			stroke: "#DE040D",
			strokeWidth: "3"
		}),
		/* @__PURE__ */ u(G, {
			s: e.question,
			x: 520,
			y: 190,
			max: 23,
			bold: !0
		}),
		/* @__PURE__ */ u("path", {
			d: "M730 200 H795",
			stroke: "#1C8D00",
			strokeWidth: "3",
			markerEnd: r
		}),
		/* @__PURE__ */ u(G, {
			s: "Да",
			x: 762,
			y: 182,
			size: 23,
			bold: !0
		}),
		/* @__PURE__ */ u(K, {
			x: 805,
			y: 148,
			w: 215,
			h: 115,
			title: e.yes,
			color: "#1C8D00"
		}),
		/* @__PURE__ */ u("path", {
			d: "M310 200 H245",
			stroke: "#DE040D",
			strokeWidth: "3",
			markerEnd: r
		}),
		/* @__PURE__ */ u(G, {
			s: "Нет",
			x: 275,
			y: 182,
			size: 23,
			bold: !0
		}),
		/* @__PURE__ */ u(K, {
			x: 20,
			y: 148,
			w: 215,
			h: 115,
			title: e.no,
			color: "#DE040D"
		})
	] });
	if (e.type === "beforeAfter") return /* @__PURE__ */ d(l, { children: [[e.before, e.after].map((e, t) => /* @__PURE__ */ d("g", { children: [
		/* @__PURE__ */ u("rect", {
			x: 20 + t * 530,
			y: "12",
			width: "485",
			height: "312",
			rx: "14",
			fill: t ? "#f5fff2" : "#f4f4f6",
			stroke: t ? "#1c8d00" : "#9699a3",
			strokeWidth: "2"
		}),
		/* @__PURE__ */ u(G, {
			s: e.title,
			x: 262 + t * 530,
			y: 48,
			bold: !0,
			size: 26
		}),
		e.fields.map((e, n) => /* @__PURE__ */ d("g", { children: [
			/* @__PURE__ */ u("text", {
				className: "svg-label svg-label--title",
				x: 43 + t * 530,
				y: 95 + n * 75,
				fontSize: "21",
				fontWeight: "650",
				fill: "#333",
				children: e.label
			}),
			/* @__PURE__ */ u("rect", {
				x: 43 + t * 530,
				y: 105 + n * 75,
				width: "438",
				height: "38",
				rx: "6",
				fill: "#fff",
				stroke: t ? "#1c8d00" : "#b9bbc2"
			}),
			/* @__PURE__ */ u("text", {
				className: "svg-label svg-label--body",
				x: 56 + t * 530,
				y: 130 + n * 75,
				fontSize: "19",
				fill: "#62626d",
				children: e.value
			})
		] }, n))
	] }, t)), /* @__PURE__ */ u(G, {
		s: e.changes.join(" · "),
		x: 520,
		y: 365,
		max: 90,
		size: 21,
		bold: !0
	})] });
	if (e.type === "conceptMap") {
		let t = [
			{
				x: 150,
				y: 65
			},
			{
				x: 520,
				y: 40
			},
			{
				x: 890,
				y: 65
			},
			{
				x: 150,
				y: 300
			},
			{
				x: 520,
				y: 340
			},
			{
				x: 890,
				y: 300
			}
		];
		return /* @__PURE__ */ d(l, { children: [
			e.items.map((e, n) => {
				let r = t[n];
				return /* @__PURE__ */ d("g", { children: [
					/* @__PURE__ */ u("path", {
						d: `M520 192 L${r.x} ${r.y}`,
						stroke: V[n],
						strokeWidth: "2"
					}),
					/* @__PURE__ */ u(G, {
						s: e.relation,
						x: (r.x + 520) / 2,
						y: (r.y + 192) / 2 + (n >= 3 ? 18 : -8),
						max: 16,
						size: 18,
						kind: "edge"
					}),
					/* @__PURE__ */ u("rect", {
						x: r.x - 130,
						y: r.y - 33,
						width: "260",
						height: "76",
						rx: "10",
						fill: "#fff",
						stroke: V[n],
						strokeWidth: "2"
					}),
					/* @__PURE__ */ u(G, {
						s: e.title,
						x: r.x,
						y: r.y - 4,
						bold: !0,
						size: 22
					}),
					/* @__PURE__ */ u(G, {
						s: e.example,
						x: r.x,
						y: r.y + 25,
						size: 19
					})
				] }, n);
			}),
			/* @__PURE__ */ u("rect", {
				x: "370",
				y: "153",
				width: "300",
				height: "78",
				rx: "14",
				fill: "#1c1c1c"
			}),
			/* @__PURE__ */ u(G, {
				s: e.center,
				x: 520,
				y: 200,
				bold: !0,
				fill: "white",
				size: 29
			})
		] });
	}
	return e.type === "states" ? /* @__PURE__ */ d(l, { children: [
		e.states.map((t, n) => /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u(K, {
			x: 15 + n * 209,
			y: 64,
			w: 166,
			h: 80,
			title: t,
			color: V[n]
		}), n < e.states.length - 1 && /* @__PURE__ */ u("path", {
			d: `M${15 + n * 209 + 166} 104 H${15 + (n + 1) * 209 - 8}`,
			stroke: "#66758a",
			strokeWidth: "3",
			markerEnd: r
		})] }, t)),
		e.cancelFrom.map((e) => /* @__PURE__ */ u("path", {
			d: `M${98 + e * 209} 144 V220 H520 V277`,
			stroke: "#DE040D",
			strokeWidth: "2",
			fill: "none",
			markerEnd: r
		}, e)),
		/* @__PURE__ */ u(G, {
			s: "Отмена разрешена только из отмеченных состояний",
			x: 520,
			y: 250,
			size: 20,
			max: 60
		}),
		/* @__PURE__ */ u(K, {
			x: 380,
			y: 285,
			w: 280,
			h: 65,
			title: "Отменён",
			color: "#DE040D"
		})
	] }) : e.type === "cause" ? /* @__PURE__ */ u(l, { children: [
		{
			title: "Причина",
			body: e.cause
		},
		{
			title: "Следствие",
			body: e.effect
		},
		{
			title: "Решение",
			body: e.solution
		}
	].map((e, t) => /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u(K, {
		x: 20 + t * 350,
		y: 75,
		w: 300,
		h: 205,
		title: e.title,
		body: e.body,
		color: V[t]
	}), t < 2 && /* @__PURE__ */ u("path", {
		d: `M${320 + t * 350} 178 H${360 + t * 350}`,
		stroke: "#66758a",
		strokeWidth: "3",
		markerEnd: r
	})] }, t)) }) : e.type === "callouts" ? /* @__PURE__ */ d(l, { children: [
		/* @__PURE__ */ u("rect", {
			x: "20",
			y: "8",
			width: "635",
			height: "370",
			rx: "12",
			fill: "#f4f4f6",
			stroke: "#d4d5da"
		}),
		/* @__PURE__ */ u("image", {
			href: k(e.image, n),
			x: "28",
			y: "16",
			width: "620",
			height: "355",
			preserveAspectRatio: "xMidYMid meet",
			"aria-label": e.alt
		}),
		e.items.map((e, t) => /* @__PURE__ */ d("g", { children: [
			/* @__PURE__ */ u("circle", {
				cx: 28 + e.x / 100 * 620,
				cy: 16 + e.y / 100 * 355,
				r: "18",
				fill: "#DE040D",
				stroke: "white",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ u("text", {
				className: "svg-label svg-label--axis",
				x: 28 + e.x / 100 * 620,
				y: 22 + e.y / 100 * 355,
				fontSize: "20",
				textAnchor: "middle",
				fill: "white",
				fontWeight: "800",
				children: t + 1
			}),
			/* @__PURE__ */ u("circle", {
				cx: "700",
				cy: 49 + t * 87,
				r: "17",
				fill: "#DE040D"
			}),
			/* @__PURE__ */ u("text", {
				className: "svg-label svg-label--axis",
				x: "700",
				y: 56 + t * 87,
				textAnchor: "middle",
				fontSize: "20",
				fill: "white",
				fontWeight: "750",
				children: t + 1
			}),
			/* @__PURE__ */ u("text", {
				className: "svg-label svg-label--title",
				x: "731",
				y: 48 + t * 87,
				fontSize: "22",
				fill: "#1c1c1c",
				fontWeight: "750",
				children: e.title
			}),
			/* @__PURE__ */ u(G, {
				s: e.text,
				x: 865,
				y: 77 + t * 87,
				max: 24,
				size: 19
			})
		] }, t))
	] }) : e.type === "codeParts" ? /* @__PURE__ */ u(l, { children: e.parts.map((e, t) => /* @__PURE__ */ d("g", { children: [
		/* @__PURE__ */ u("rect", {
			x: "18",
			y: 14 + t * 90,
			width: "568",
			height: "78",
			rx: "8",
			fill: "#202024"
		}),
		/* @__PURE__ */ u("rect", {
			x: "18",
			y: 14 + t * 90,
			width: "5",
			height: "78",
			fill: V[t]
		}),
		/* @__PURE__ */ u("text", {
			className: "svg-label svg-label--body",
			x: "36",
			y: 62 + t * 90,
			fontFamily: "Consolas,monospace",
			fontSize: "23",
			fill: "white",
			children: e.code
		}),
		/* @__PURE__ */ u("path", {
			d: `M600 ${54 + t * 90} H644`,
			stroke: V[t],
			strokeWidth: "3",
			markerEnd: r
		}),
		/* @__PURE__ */ u("text", {
			className: "svg-label svg-label--title",
			x: "668",
			y: 45 + t * 90,
			fontSize: "23",
			fontWeight: "750",
			fill: "#1c1c1c",
			children: e.label
		}),
		/* @__PURE__ */ u("text", {
			className: "svg-label svg-label--body",
			x: "668",
			y: 77 + t * 90,
			fontSize: "20",
			fill: "#505058",
			children: e.explanation
		})
	] }, t)) }) : null;
}
//#endregion
//#region src/engine/Infographic.tsx
var q = [
	"#DE040D",
	"#4561C8",
	"#1C8D00",
	"#66758A",
	"#9A7079"
], J = new Intl.NumberFormat("ru-RU", {
	maximumFractionDigits: 4,
	useGrouping: !1
});
function Y({ text: e, x: t, y: n, size: r = 24, width: i = 300, bold: a = !1, fill: o = "#1c1c1c", kind: s = "body", anchor: c = "middle" }) {
	return /* @__PURE__ */ u("text", {
		className: `svg-label svg-label--${s}`,
		x: t,
		y: n,
		textAnchor: c,
		fontSize: r,
		fill: o,
		fontWeight: a ? 750 : 450,
		children: U(e, i, r).map((e, n) => /* @__PURE__ */ u("tspan", {
			x: t,
			dy: n ? `${H}em` : 0,
			children: e
		}, n))
	});
}
function X({ visual: e, base: t = "/" }) {
	let n = a().replace(/:/g, ""), r = He(e), i = null;
	if (e.type === "process" || e.type === "timeline") {
		let t = (1e3 - 36 * (e.items.length - 1)) / e.items.length, a = e.type === "timeline" ? 95 : 72, o = e.items.map((e) => ({
			title: W(e.title, t - 44, 27),
			body: W(e.text, t - 44, 24)
		})), s = Math.max(174, ...o.map((e) => 44 + e.title + 16 + e.body));
		r = a + s + 24, i = /* @__PURE__ */ d(l, { children: [e.type === "timeline" && /* @__PURE__ */ u("line", {
			x1: "50",
			y1: "58",
			x2: "990",
			y2: "58",
			stroke: "#d4d5da",
			strokeWidth: "5"
		}), e.items.map((r, i) => {
			let c = 20 + i * (t + 36), l = e.type === "timeline" ? 58 : 34;
			return /* @__PURE__ */ d("g", { children: [
				e.type === "process" && i < e.items.length - 1 && /* @__PURE__ */ u("path", {
					d: `M ${c + t + 5} ${a + s / 2} h 21`,
					fill: "none",
					stroke: "#66758a",
					strokeWidth: "3",
					markerEnd: `url(#${n})`
				}),
				/* @__PURE__ */ u("rect", {
					x: c,
					y: a,
					width: t,
					height: s,
					rx: "13",
					fill: "#f5f5f7",
					stroke: "#d4d5da"
				}),
				/* @__PURE__ */ u("rect", {
					x: c,
					y: a,
					width: t,
					height: "5",
					rx: "2",
					fill: q[i % q.length]
				}),
				/* @__PURE__ */ u("circle", {
					cx: c + t / 2,
					cy: l,
					r: "25",
					fill: q[i % q.length]
				}),
				/* @__PURE__ */ u("text", {
					className: "svg-label svg-label--axis",
					x: c + t / 2,
					y: l + 8,
					textAnchor: "middle",
					fontSize: "24",
					fontWeight: "800",
					fill: "white",
					children: i + 1
				}),
				/* @__PURE__ */ u(Y, {
					text: r.title,
					x: c + t / 2,
					y: a + 22 + 27,
					size: 27,
					width: t - 44,
					kind: "title",
					bold: !0
				}),
				/* @__PURE__ */ u(Y, {
					text: r.text,
					x: c + t / 2,
					y: a + 22 + o[i].title + 16 + 24,
					size: 24,
					width: t - 44
				})
			] }, i);
		})] });
	} else if (e.type === "tree") {
		let t = 960 / e.branches.length, a = Math.max(64, W(e.root, 400, 28) + 24), o = 8 + a, s = o + 30, c = s + 42, f = Math.max(64, ...e.branches.map((e) => W(e.title, t - 60, 27) + 28)), p = e.branches.map((e) => {
			let n = c + f + 20;
			return {
				items: e.items.map((e) => {
					let r = Math.max(58, W(e, t - 92, 24) + 26), i = {
						text: e,
						y: n,
						h: r
					};
					return n += r + 14, i;
				}),
				bottom: n - 14
			};
		});
		r = Math.max(c + f, ...p.map((e) => e.bottom)) + 24, i = /* @__PURE__ */ d(l, { children: [
			/* @__PURE__ */ u("rect", {
				x: 300,
				y: "8",
				width: 440,
				height: a,
				rx: "12",
				fill: "#1c1c1c"
			}),
			/* @__PURE__ */ u(Y, {
				text: e.root,
				x: 520,
				y: 48,
				size: 28,
				width: 400,
				fill: "white",
				kind: "title",
				bold: !0
			}),
			/* @__PURE__ */ u("path", {
				d: `M520 ${o} V${s}`,
				stroke: "#66758a",
				strokeWidth: "3"
			}),
			e.branches.map((e, r) => {
				let i = 40 + r * t, a = i + t / 2;
				return /* @__PURE__ */ d("g", { children: [
					/* @__PURE__ */ u("path", {
						d: `M520 ${s} H${a} V${c - 10}`,
						fill: "none",
						stroke: q[r % q.length],
						strokeWidth: "3",
						markerEnd: `url(#${n})`
					}),
					/* @__PURE__ */ u("rect", {
						x: i + 12,
						y: c,
						width: t - 24,
						height: f,
						rx: "10",
						fill: "#f4f4f6",
						stroke: q[r % q.length],
						strokeWidth: "2"
					}),
					/* @__PURE__ */ u(Y, {
						text: e.title,
						x: a,
						y: c + 14 + 27,
						size: 27,
						width: t - 60,
						kind: "title",
						bold: !0
					}),
					p[r].items.map((e, o) => /* @__PURE__ */ d("g", { children: [
						/* @__PURE__ */ u("path", {
							d: `M${i + 25} ${c + f} V${e.y + e.h / 2} H${i + 37}`,
							fill: "none",
							stroke: q[r % q.length],
							strokeWidth: "2",
							markerEnd: `url(#${n})`
						}),
						/* @__PURE__ */ u("rect", {
							x: i + 45,
							y: e.y,
							width: t - 60,
							height: e.h,
							rx: "8",
							fill: "#fff",
							stroke: "#d4d5da"
						}),
						/* @__PURE__ */ u(Y, {
							text: e.text,
							x: a + 15,
							y: e.y + 13 + 24,
							size: 24,
							width: t - 92
						})
					] }, o))
				] }, r);
			})
		] });
	} else if (e.type === "network") {
		let t = (1e3 - 62 * (e.nodes.length - 1)) / e.nodes.length, a = Math.min(290, t + 62 - 16), o = Math.max(30, ...e.edges.map((e) => W(e.label, a, 23))) + 44, s = e.nodes.map((e) => ({
			title: W(e.title, t - 44, 27),
			body: W(e.text, t - 44, 24)
		})), c = Math.max(164, ...s.map((e) => 44 + e.title + 16 + e.body)), f = e.nodes.map((e, n) => ({
			x: 20 + n * (t + 62),
			y: o,
			w: t
		}));
		r = o + c + 24, i = /* @__PURE__ */ d(l, { children: [e.edges.map((t, r) => {
			let i = f[e.nodes.findIndex((e) => e.id === t.from)], s = f[e.nodes.findIndex((e) => e.id === t.to)];
			if (!i || !s) return null;
			let l = s.x > i.x, p = l ? i.x + i.w : i.x, m = l ? s.x - 10 : s.x + s.w + 10;
			return /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u("path", {
				d: `M${p} ${o + c / 2} H${m}`,
				stroke: "#66758a",
				strokeWidth: "3",
				fill: "none",
				markerEnd: `url(#${n})`
			}), /* @__PURE__ */ u(Y, {
				text: t.label,
				x: (p + m) / 2,
				y: 35,
				size: 23,
				width: a,
				kind: "edge"
			})] }, r);
		}), e.nodes.map((e, n) => {
			let r = f[n];
			return /* @__PURE__ */ d("g", { children: [
				/* @__PURE__ */ u("rect", {
					x: r.x,
					y: r.y,
					width: r.w,
					height: c,
					rx: "12",
					fill: "#fff",
					stroke: q[n % q.length],
					strokeWidth: "3"
				}),
				/* @__PURE__ */ u(Y, {
					text: e.title,
					x: r.x + r.w / 2,
					y: o + 22 + 27,
					size: 27,
					width: t - 44,
					kind: "title",
					bold: !0
				}),
				/* @__PURE__ */ u(Y, {
					text: e.text,
					x: r.x + r.w / 2,
					y: o + 22 + s[n].title + 16 + 24,
					size: 24,
					width: t - 44
				})
			] }, e.id);
		})] });
	} else if (e.type === "bars") {
		let t = e.threshold === void 0 ? 30 : 58, n = e.items.map((e) => Math.max(76, W(e.label, 220, 26) + 20)), a = t, o = e.items.map((e, t) => {
			let r = {
				item: e,
				y: a,
				h: n[t]
			};
			return a += r.h, r;
		}), s = a + 8;
		r = s + (e.unit ? 84 : 62), i = /* @__PURE__ */ d(l, { children: [
			[
				0,
				.25,
				.5,
				.75,
				1
			].map((n) => /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u("line", {
				x1: 260 + 670 * n,
				y1: t - 8,
				x2: 260 + 670 * n,
				y2: s,
				stroke: "#e0e1e5",
				strokeDasharray: "4 4"
			}), /* @__PURE__ */ u("text", {
				className: "svg-label svg-label--axis",
				x: 260 + 670 * n,
				y: s + 32,
				textAnchor: "middle",
				fontSize: "24",
				fill: "#555",
				children: J.format(e.max * n)
			})] }, n)),
			o.map(({ item: t, y: n, h: r }, i) => {
				let a = Math.max(0, t.value / e.max * 670), o = W(t.label, 220, 26), s = a > 595;
				return /* @__PURE__ */ d("g", { children: [
					/* @__PURE__ */ u(Y, {
						text: t.label,
						x: 240,
						y: n + (r - o) / 2 + 26,
						width: 220,
						size: 26,
						kind: "title",
						anchor: "end"
					}),
					/* @__PURE__ */ u("rect", {
						x: 260,
						y: n + (r - 46) / 2,
						width: a,
						height: "46",
						rx: "6",
						fill: q[i % q.length]
					}),
					/* @__PURE__ */ u("text", {
						className: "svg-label svg-label--value",
						x: 260 + a + (s ? -12 : 12),
						y: n + r / 2 + 9,
						textAnchor: s ? "end" : "start",
						fontSize: "28",
						fill: s ? "white" : "#1c1c1c",
						fontWeight: "800",
						children: J.format(t.value)
					})
				] }, t.label);
			}),
			e.threshold !== void 0 && /* @__PURE__ */ d("g", { children: [/* @__PURE__ */ u("line", {
				x1: 260 + e.threshold / e.max * 670,
				y1: t - 8,
				x2: 260 + e.threshold / e.max * 670,
				y2: s,
				stroke: "#1c1c1c",
				strokeWidth: "2",
				strokeDasharray: "7 5"
			}), /* @__PURE__ */ d("text", {
				className: "svg-label svg-label--axis",
				x: Math.min(760, 260 + e.threshold / e.max * 670 + 10),
				y: "26",
				fontSize: "23",
				fill: "#1c1c1c",
				children: [
					"Критерий: ",
					J.format(e.threshold),
					" ",
					e.unit
				]
			})] }),
			e.unit && /* @__PURE__ */ u("text", {
				className: "svg-label svg-label--axis",
				x: "1016",
				y: r - 10,
				textAnchor: "end",
				fontSize: "23",
				fill: "#555",
				children: e.unit
			})
		] });
	}
	return /* @__PURE__ */ d("figure", {
		className: `infographic infographic-${e.type}`,
		tabIndex: 0,
		"aria-label": `Схема: ${e.caption}`,
		children: [/* @__PURE__ */ d("svg", {
			className: "infographic-svg",
			role: "img",
			"aria-label": e.caption,
			viewBox: `0 0 1040 ${r}`,
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u("marker", {
				id: n,
				markerWidth: "8",
				markerHeight: "8",
				refX: "7",
				refY: "4",
				orient: "auto",
				children: /* @__PURE__ */ u("path", {
					d: "M0 0 L8 4 L0 8",
					fill: "#66758a"
				})
			}) }), i || /* @__PURE__ */ u(Ue, {
				visual: e,
				marker: n,
				base: t
			})]
		}), /* @__PURE__ */ u("figcaption", { children: e.caption })]
	});
}
//#endregion
//#region src/engine/scoring.ts
var We = (e) => e.trim().replace(/\s+/g, " ").toLocaleLowerCase("ru-RU");
function Ge(e, t, n) {
	if (t.type !== e.type) throw Error("Тип ключа не соответствует заданию");
	if (typeof n == "string" ? !n.trim() : Array.isArray(n) ? !n.length : !Object.values(n).some((e) => e.trim())) return {
		status: "unanswered",
		score: 0,
		explanation: "Сначала введите ответ.",
		solution: ""
	};
	let r = 0, i = "";
	if (e.type === "single" || e.type === "multiple") {
		let a = Array.isArray(n) ? new Set(n) : /* @__PURE__ */ new Set([String(n)]), o = new Set(t.correct || []);
		r = o.size > 0 && o.size === a.size && [...a].every((e) => o.has(e)) ? 1 : 0, i = e.options?.filter((e) => o.has(e.id)).map((e) => e.text).join("; ") || "";
	} else if (e.type === "short") {
		let e = We(String(n));
		if (r = +!!t.accepted?.some((t) => We(t) === e), t.numeric) {
			let n = Number(e.replace(",", "."));
			r = e !== "" && Number.isFinite(n) && Math.abs(n - t.numeric.value) <= t.numeric.tolerance ? 1 : 0;
		}
		i = t.numeric ? String(t.numeric.value) : (t.accepted || []).join(" / ");
	} else {
		let a = typeof n == "object" && !Array.isArray(n) ? n : {}, o = e.items || [];
		r = o.reduce((e, n) => e + (t.pairs?.[n.id] && a[n.id] === t.pairs[n.id] ? 1 : 0), 0) / o.length, i = o.map((n) => `${n.text} → ${e.options?.find((e) => e.id === t.pairs?.[n.id])?.text || "—"}`).join("\n");
	}
	return {
		status: r === 1 ? "correct" : "incorrect",
		score: r,
		explanation: t.explanation,
		solution: i
	};
}
//#endregion
//#region src/engine/Assessment.tsx
var Z = e(null), Q = (e) => ({
	draft: e.type === "matching" ? {} : e.type === "short" ? "" : [],
	seed: crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0],
	attempts: 0
});
function Ke({ course: e, base: t, children: n, snapshot: r, readonly: i = !1 }) {
	let a = `lecture:${t}:${e.id}:${e.contentVersion}:attempts`, [o, l] = c(() => j(a, {})), [d, f] = c({}), [p, m] = c(""), [h, g] = c(""), _ = s(null), v = (e, t) => l((n) => {
		let r = {
			...n,
			[e]: t
		};
		return M(a, r) || g("Не удалось сохранить попытку на устройстве."), r;
	}), y = async () => {
		if (!e.assessment) throw Error("Банк самопроверки не подключён");
		return _.current ||= fetch(k(e.assessment.url, t),{cache:"no-cache"}).then((e) => {
			if (!e.ok) throw Error("Не удалось загрузить банк ответов");
			return e.json();
		}).then((t) => {
			if (t.courseId !== e.id || t.contentVersion !== e.contentVersion || !t.keys) throw Error("Версия ключей не соответствует лекции");
			return f(t.keys), t.keys;
		}).catch((e) => {
			throw _.current = null, e;
		}), _.current;
	};
	return /* @__PURE__ */ u(Z.Provider, {
		value: {
			attempts: i ? r || {} : o,
			readonly: i,
			reveal: (e, t) => {
				let n = o[e.id];
				n?.result && v(e.id, {
					...n,
					reveal: t
				});
			},
			change: (e, t) => {
				g(""), v(e.id, {
					...o[e.id] || Q(e),
					draft: t
				});
			},
			submit: async (e) => {
				let t = o[e.id] || Q(e), n = t.draft;
				if (typeof n == "string" && !n.trim() || Array.isArray(n) && !n.length || typeof n == "object" && !Array.isArray(n) && !Object.values(n).some(Boolean)) {
					g("Сначала введите ответ. Пустое поле не считается попыткой.");
					return;
				}
				g(""), m(e.id);
				try {
					let r = await y();
					if (!r[e.id]) throw Error("Не найден ключ задания");
					let i = Ge(e, r[e.id], n);
					v(e.id, {
						...t,
						submitted: structuredClone(n),
						result: i,
						attempts: t.attempts + 1
					});
				} catch (e) {
					g(String(e));
				} finally {
					m("");
				}
			},
			retry: (e) => {
				g("");
				let t = o[e.id] || Q(e);
				v(e.id, {
					...Q(e),
					attempts: t.attempts
				});
			},
			busy: p,
			error: h,
			keys: d,
			reset: () => {
				l({}), M(a, {}), g("");
			}
		},
		children: n
	});
}
function qe({ task: e }) {
	let t = r(Z), n = t.attempts[e.id], i = e.options || [], a = !!n?.result, o = !!n?.reveal, s = a || t.readonly, c = (r) => {
		if (e.type === "single") t.change(e, [r]);
		else {
			let i = Array.isArray(n?.draft) ? n.draft : [];
			t.change(e, i.includes(r) ? i.filter((e) => e !== r) : [...i, r]);
		}
	};
	return /* @__PURE__ */ d("section", {
		className: "interactive-task",
		children: [
			/* @__PURE__ */ u("p", {
				className: "task-prompt",
				children: e.prompt
			}),
			(e.type === "single" || e.type === "multiple") && /* @__PURE__ */ u("div", {
				className: "choice-grid",
				tabIndex: 0,
				role: "group",
				"aria-label": "Варианты ответа",
				children: i.map((t, r) => /* @__PURE__ */ d("label", { children: [
					/* @__PURE__ */ u("input", {
						type: e.type === "single" ? "radio" : "checkbox",
						name: e.id,
						checked: Array.isArray(n?.draft) && n.draft.includes(t.id),
						disabled: s,
						onChange: () => c(t.id)
					}),
					/* @__PURE__ */ u("b", { children: String.fromCharCode(1040 + r) }),
					/* @__PURE__ */ u("span", { children: t.text })
				] }, t.id))
			}),
			e.type === "short" && /* @__PURE__ */ d("label", {
				className: "short-field",
				children: ["Ваш ответ", /* @__PURE__ */ u("input", {
					"aria-label": "Краткий ответ",
					value: typeof n?.draft == "string" ? n.draft : "",
					disabled: s,
					autoComplete: "off",
					onChange: (n) => t.change(e, n.target.value),
					onKeyDown: (n) => {
						n.key === "Enter" && (n.preventDefault(), t.submit(e));
					}
				})]
			}),
			e.type === "matching" && /* @__PURE__ */ u("div", {
				className: "matching-fields",
				tabIndex: 0,
				role: "group",
				"aria-label": "Пары для сопоставления",
				children: e.items?.map((r) => /* @__PURE__ */ d("label", { children: [/* @__PURE__ */ u("span", { children: r.text }), /* @__PURE__ */ d("select", {
					"aria-label": `Соответствие: ${r.text}`,
					disabled: s,
					value: n?.draft && typeof n.draft == "object" && !Array.isArray(n.draft) && n.draft[r.id] || "",
					onChange: (i) => t.change(e, {
						...typeof n?.draft == "object" && !Array.isArray(n.draft) ? n.draft : {},
						[r.id]: i.target.value
					}),
					children: [/* @__PURE__ */ u("option", {
						value: "",
						children: "Выберите соответствие"
					}), i.map((e) => /* @__PURE__ */ u("option", {
						value: e.id,
						children: e.text
					}, e.id))]
				})] }, r.id))
			}),
			/* @__PURE__ */ d("div", {
				className: "task-actions",
				children: [t.readonly ? /* @__PURE__ */ u(l, { children: a && /* @__PURE__ */ d("span", {
					className: `task-status ${n.result.status}`,
					children: [
						n.result.status === "correct" ? "Правильно" : "Есть ошибка",
						" · ",
						n.result.score.toLocaleString("ru-RU"),
						" / 1"
					]
				}) }) : a ? /* @__PURE__ */ d(l, { children: [
					/* @__PURE__ */ d("span", {
						className: `task-status ${n.result.status}`,
						role: "status",
						children: [
							n.result.status === "correct" ? "Правильно" : "Есть ошибка",
							" · ",
							n.result.score.toLocaleString("ru-RU"),
							" / 1"
						]
					}),
					/* @__PURE__ */ u("button", {
						className: "button ghost",
						onClick: () => t.reveal(e, !0),
						children: "Разбор ответа"
					}),
					/* @__PURE__ */ u("button", {
						className: "button ghost",
						onClick: () => t.retry(e),
						children: "Ещё попытка"
					})
				] }) : /* @__PURE__ */ u("button", {
					className: "button primary",
					disabled: t.busy === e.id,
					onClick: () => void t.submit(e),
					children: t.busy === e.id ? "Проверяем…" : "Проверить"
				}), t.error && /* @__PURE__ */ u("span", {
					role: "alert",
					className: "task-error",
					children: t.error
				})]
			}),
			o && n?.result && t.readonly && /* @__PURE__ */ d("aside", {
				className: "audience-answer",
				children: [
					/* @__PURE__ */ u("strong", { children: "Разбор ответа" }),
					/* @__PURE__ */ u("p", { children: n.result.solution }),
					/* @__PURE__ */ u("p", { children: n.result.explanation })
				]
			}),
			o && n?.result && !t.readonly && /* @__PURE__ */ d(N, {
				title: "Разбор ответа",
				onClose: () => t.reveal(e, !1),
				children: [
					/* @__PURE__ */ u("p", { children: n.result.explanation }),
					/* @__PURE__ */ u("h3", { children: "Правильный ответ" }),
					/* @__PURE__ */ u("p", {
						className: "preserve-lines",
						children: n.result.solution
					}),
					t.keys[e.id]?.optionExplanations && /* @__PURE__ */ u("ul", { children: Object.entries(t.keys[e.id].optionExplanations).map(([t, n]) => /* @__PURE__ */ d("li", { children: [
						/* @__PURE__ */ d("strong", { children: [e.options?.find((e) => e.id === t)?.text, ":"] }),
						" ",
						n
					] }, t)) })
				]
			})
		]
	});
}
function Je({ lecture: e, onGo: t }) {
	let n = r(Z), [i, a] = c(!1), o = e.slides.map((e, t) => ({
		task: e.task,
		index: t
	})).filter((e) => e.task), s = o.filter((e) => n.attempts[e.task.id]?.result?.status === "correct").length, f = o.filter((e) => n.attempts[e.task.id]?.result?.status === "incorrect").length, p = o.reduce((e, t) => e + (n.attempts[t.task.id]?.result?.score || 0), 0);
	return /* @__PURE__ */ d(l, { children: [
		/* @__PURE__ */ d("div", {
			className: "result-summary",
			children: [
				/* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("b", { children: s }), /* @__PURE__ */ u("span", { children: "Правильно" })] }),
				/* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("b", { children: f }), /* @__PURE__ */ u("span", { children: "С ошибкой" })] }),
				/* @__PURE__ */ d("div", { children: [/* @__PURE__ */ u("b", { children: o.length - s - f }), /* @__PURE__ */ u("span", { children: "Без проверки" })] })
			]
		}),
		/* @__PURE__ */ d("p", { children: [/* @__PURE__ */ d("strong", { children: [
			"Баллы: ",
			p.toLocaleString("ru-RU"),
			" из ",
			o.length,
			"."
		] }), " Четыре задания одного вопроса — максимум 4 балла. Каждая пара соответствия — 0,25 балла."] }),
		/* @__PURE__ */ u("ol", {
			className: "result-list",
			children: o.map(({ task: e, index: r }) => {
				let i = n.attempts[e.id];
				return /* @__PURE__ */ d("li", { children: [
					/* @__PURE__ */ u("button", {
						className: "text-button",
						onClick: () => t(r),
						children: e.prompt
					}),
					/* @__PURE__ */ u("p", {
						className: i?.result?.status || "",
						children: i?.result ? i.result.status === "correct" ? "Правильно" : "Есть ошибка" : "Ответ ещё не проверен"
					}),
					i?.result && /* @__PURE__ */ d("details", { children: [
						/* @__PURE__ */ u("summary", { children: "Ответ и объяснение" }),
						/* @__PURE__ */ d("p", { children: [
							/* @__PURE__ */ u("strong", { children: "Ваш ответ:" }),
							" ",
							Ye(e, i.submitted)
						] }),
						/* @__PURE__ */ u("p", { children: /* @__PURE__ */ u("strong", { children: "Правильный ответ:" }) }),
						/* @__PURE__ */ u("p", {
							className: "preserve-lines",
							children: i.result.solution
						}),
						/* @__PURE__ */ u("p", { children: i.result.explanation })
					] })
				] }, e.id);
			})
		}),
		i ? /* @__PURE__ */ d("div", {
			className: "dialog-actions",
			children: [
				/* @__PURE__ */ u("span", { children: "Сбросить все попытки курса на этом устройстве?" }),
				/* @__PURE__ */ u("button", {
					className: "button primary",
					onClick: () => {
						n.reset(), a(!1);
					},
					children: "Сбросить"
				}),
				/* @__PURE__ */ u("button", {
					className: "button ghost",
					onClick: () => a(!1),
					children: "Отмена"
				})
			]
		}) : /* @__PURE__ */ u("button", {
			className: "button ghost",
			onClick: () => a(!0),
			children: "Начать самопроверку заново"
		})
	] });
}
function Ye(e, t) {
	return typeof t == "string" ? t : Array.isArray(t) ? t.map((t) => e.options?.find((e) => e.id === t)?.text || t).join("; ") : Object.entries(t).map(([t, n]) => `${e.items?.find((e) => e.id === t)?.text}: ${e.options?.find((e) => e.id === n)?.text || "—"}`).join("; ");
}
function Xe({ task: e, onChange: t }) {
	let n = r(Z), a = e ? n.attempts[e.id] : void 0;
	return i(() => {
		t(e && a ? { [e.id]: a } : {});
	}, [
		e?.id,
		a,
		t
	]), null;
}
//#endregion
//#region src/engine/VisualRenderer.tsx
var $ = e(void 0);
function Ze({ render: e, children: t }) {
	return /* @__PURE__ */ u($.Provider, {
		value: e,
		children: t
	});
}
//#endregion
//#region src/engine/SlideView.tsx
function Qe({ course: e, lecture: t, slide: n, profile: i, base: a, number: o, interactive: s = !1 }) {
	let c = r($)?.({
		slide: n,
		base: a,
		interactive: s
	}), l = c === void 0 ? n.visual ? /* @__PURE__ */ u(X, {
		visual: n.visual,
		base: a
	}) : n.steps ? /* @__PURE__ */ u(X, { visual: {
		type: "process",
		items: n.steps,
		caption: "Порядок чтения: слева направо, от первого шага к последнему."
	} }) : void 0 : c, f = n.rows || l != null && l !== !1;
	return /* @__PURE__ */ d("article", {
		className: `slide-frame kind-${n.kind} ${f ? "has-visual" : ""}`,
		"data-slide-id": n.id,
		children: [
			/* @__PURE__ */ u("img", {
				className: "side-ornament",
				src: k(e.ornament, a),
				alt: ""
			}),
			/* @__PURE__ */ d("header", {
				className: "slide-header",
				children: [/* @__PURE__ */ d("div", {
					className: "slide-brand",
					children: [/* @__PURE__ */ u("img", {
						src: k(e.logo, a),
						alt: "Логотип"
					}), /* @__PURE__ */ d("span", { children: [
						e.code,
						" · ",
						t.semester,
						"-й семестр"
					] })]
				}), /* @__PURE__ */ d("div", {
					className: "slide-header-actions",
					children: [n.supplement && d(/mode=(diagram|case)/.test(n.supplement.href)?"button":"a", {
 className:"button secondary slide-supplement",
 ...(/mode=(diagram|case)/.test(n.supplement.href)?{type:"button","aria-haspopup":"dialog",onClick:event=>{const url=new URL(A(n.supplement.href,a),location.href);document.dispatchEvent(new CustomEvent("lecture-tool",{detail:{kind:url.searchParams.get("mode"),id:url.searchParams.get("case")||url.searchParams.get("slide"),opener:event.currentTarget}}));}}:{href:A(n.supplement.href,a),target:"_blank",rel:"noopener"}),
 children:[n.supplement.label,/mode=(diagram|case)/.test(n.supplement.href)?"":" ↗"]
 }), /* @__PURE__ */ u("span", {
						className: "slide-number",
						children: String(o).padStart(2, "0")
					})]
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "slide-content",
				children: [
					/* @__PURE__ */ d("div", {
						className: "slide-copy",
						children: [
							/* @__PURE__ */ u("p", {
								className: "slide-kicker",
								children: n.kicker
							}),
							/* @__PURE__ */ u("h2", { children: n.title }),
							(n.kind === "literature" || n.kind === "materials") && /* @__PURE__ */ u(Re, {
								course: e,
								slide: n,
								base: a
							}),
							n.kind === "agenda" && /* @__PURE__ */ u("ol", {
								className: "topic-agenda",
								children: t.slides.filter((e) => e.kind === "section").map((e, t) => /* @__PURE__ */ d("li", { children: [/* @__PURE__ */ u("span", { children: String(t + 1).padStart(2, "0") }), /* @__PURE__ */ u("strong", { children: e.title })] }, e.id))
							}),
							n.body && /* @__PURE__ */ u("p", {
								className: "slide-body-copy",
								children: n.body
							}),
							n.bullets && /* @__PURE__ */ u("ul", { children: n.bullets.map((e) => /* @__PURE__ */ u("li", { children: e }, e)) }),
							l,
							n.rows && /* @__PURE__ */ u("div", {
								className: "table-scroll",
								tabIndex: 0,
								role: "region",
								"aria-label": `Таблица: ${n.title}`,
								children: /* @__PURE__ */ d("table", {
									className: "comparison-table",
									children: [/* @__PURE__ */ u("thead", { children: /* @__PURE__ */ u("tr", { children: n.columns?.map((e) => /* @__PURE__ */ u("th", { children: e }, e)) }) }), /* @__PURE__ */ u("tbody", { children: n.rows.map((e, t) => /* @__PURE__ */ u("tr", { children: e.map((e, t) => /* @__PURE__ */ u("td", { children: e }, t)) }, t)) })]
								})
							}),
							n.notebook && /* @__PURE__ */ d("aside", {
								className: "write-note",
								children: [/* @__PURE__ */ u("span", { children: "Запишите" }), /* @__PURE__ */ u("strong", { children: n.notebook })]
							}),
							n.task && s && /* @__PURE__ */ u(qe, { task: n.task }),
							n.task && !s && /* @__PURE__ */ d("div", {
								className: "public-task",
								children: [/* @__PURE__ */ u("p", { children: n.task.prompt }), n.task.type === "matching" ? /* @__PURE__ */ d("div", {
									className: "matching-public",
									children: [/* @__PURE__ */ u("ol", { children: n.task.items?.map((e) => /* @__PURE__ */ u("li", { children: e.text }, e.id)) }), /* @__PURE__ */ u("ol", {
										type: "A",
										children: n.task.options?.map((e) => /* @__PURE__ */ u("li", { children: e.text }, e.id))
									})]
								}) : n.task.options ? /* @__PURE__ */ u("ol", {
									className: "public-options",
									children: n.task.options.map((e, t) => /* @__PURE__ */ d("li", { children: [/* @__PURE__ */ u("b", { children: String.fromCharCode(1040 + t) }), /* @__PURE__ */ u("span", { children: e.text })] }, e.id))
								}) : /* @__PURE__ */ u("div", {
									className: "answer-line",
									children: "Краткий ответ: __________________________________"
								})]
							}),
							n.kind === "title" && /* @__PURE__ */ d("div", {
								className: "title-profile",
								children: [
									/* @__PURE__ */ u("strong", { children: i.fullName || "Преподаватель" }),
									/* @__PURE__ */ u("span", { children: i.position }),
									/* @__PURE__ */ u("span", { children: i.department })
								]
							})
						]
					}),
					n.kind === "section" && /* @__PURE__ */ u("img", {
						className: "topic-arrow",
						src: k(e.topicArrow || "brand/topic-arrow.webp", a),
						alt: ""
					}),
					n.kind === "title" && /* @__PURE__ */ u("img", {
						className: "title-mascot",
						src: k(e.mascot, a),
						alt: e.mascotAlt
					})
				]
			}),
			/* @__PURE__ */ d("footer", {
				className: "slide-footer",
				children: [/* @__PURE__ */ u("span", { children: n.source || t.question }), /* @__PURE__ */ u("span", { children: e.demo ? "Демонстрация шаблона" : e.discipline })]
			})
		]
	});
}
//#endregion
export { ae as C, oe as S, E as T, de as _, Xe as a, ce as b, he as c, fe as d, k as f, D as g, me as h, Je as i, j as l, O as m, Ze as n, X as o, pe as p, Ke as r, N as s, Qe as t, M as u, ue as v, ie as w, se as x, le as y };
