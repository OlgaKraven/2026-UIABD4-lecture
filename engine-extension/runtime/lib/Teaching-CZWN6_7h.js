import { C as e, S as t, T as n, _ as r, a as i, b as a, c as o, g as s, l as c, p as l, r as u, t as d, u as f, v as p, w as m, x as h, y as g } from "./SlideView-ejiylWgb.js";
import { useCallback as ee, useEffect as _, useRef as v, useState as y } from "react";
import { jsx as b, jsxs as x } from "react/jsx-runtime";
var te = n("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]), ne = n("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), S = [
	40,
	40,
	20
];
function re(e) {
	let [t, n] = y(() => {
		let t = c(e, S);
		return Array.isArray(t) && t.length === 3 && t.every(Number.isFinite) && t[0] >= 20 && t[1] >= 24 && t[2] >= 14 && Math.abs(t.reduce((e, t) => e + t, 0) - 100) < .1 ? t : S;
	}), r = v(null), i = v(null);
	_(() => {
		f(e, t);
	}, [e, t]);
	let a = (e, r, i = t) => {
		let a = [
			20,
			24,
			14
		], o = Math.max(a[e] - i[e], Math.min(i[e + 1] - a[e + 1], r)), s = [...i];
		s[e] += o, s[e + 1] -= o, n(s);
	};
	return {
		grid: r,
		separator: (e) => /* @__PURE__ */ b("div", {
			className: `panel-divider divider-${e}`,
			role: "separator",
			"aria-orientation": "vertical",
			"aria-label": e === 0 ? "Ширина слайда и заметок" : "Ширина заметок и содержания",
			"aria-valuemin": [20, 24][e],
			"aria-valuemax": t[e] + t[e + 1] - [24, 14][e],
			"aria-valuenow": Math.round(t[e]),
			tabIndex: 0,
			title: "Перетащите границу или используйте стрелки влево и вправо",
			onPointerDown: (n) => {
				r.current && (n.preventDefault(), n.currentTarget.setPointerCapture(n.pointerId), i.current = {
					index: e,
					x: n.clientX,
					start: [...t],
					width: (r.current.getBoundingClientRect().width - (window.innerWidth <= 1100 ? 12 : 24)) * 100 / (window.innerWidth <= 1100 ? t[0] + t[1] : 100)
				});
			},
			onPointerMove: (t) => {
				let n = i.current;
				n && n.index === e && a(e, (t.clientX - n.x) / n.width * 100, n.start);
			},
			onPointerUp: (e) => {
				i.current = null, e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId);
			},
			onPointerCancel: () => {
				i.current = null;
			},
			onLostPointerCapture: () => {
				i.current = null;
			},
			onKeyDown: (t) => {
				(t.key === "ArrowLeft" || t.key === "ArrowRight") && (t.preventDefault(), t.stopPropagation(), a(e, t.key === "ArrowRight" ? 2 : -2));
			}
		}),
		reset: () => n([...S]),
		style: {
			"--preview-width": `${t[0]}fr`,
			"--notes-width": `${t[1]}fr`,
			"--outline-width": `${t[2]}fr`
		}
	};
}
//#endregion
//#region src/engine/session.ts
function C(e, t) {
	if (!e || typeof e != "object") return !1;
	let n = e;
	if (n.protocol !== 1 || n.session !== t.session || n.lecture !== t.lecture || n.course !== t.course || n.version !== t.version || ![
		"HELLO",
		"STATE",
		"ACK",
		"END"
	].includes(n.type)) return !1;
	if (n.type === "STATE") {
		let e = n.state;
		if (!e || typeof e.slideId != "string" || typeof e.black != "boolean" || typeof e.animations != "boolean" || !Number.isFinite(e.replay) || !Number.isFinite(e.epoch) || !Number.isFinite(e.sequence) || !e.profile || ![
			"fullName",
			"position",
			"department"
		].every((t) => typeof e.profile[t] == "string") || Object.keys(e).some((e) => ![
			"slideId",
			"black",
			"animations",
			"replay",
			"profile",
			"epoch",
			"sequence",
			"assessment",
			"pointer"
		].includes(e)) || e.pointer && (!Number.isFinite(e.pointer.x) || !Number.isFinite(e.pointer.y) || e.pointer.x < 0 || e.pointer.x > 1 || e.pointer.y < 0 || e.pointer.y > 1 || Object.keys(e.pointer).some((e) => !["x", "y"].includes(e)))) return !1;
		if (e.assessment) {
			if (typeof e.assessment != "object" || Object.keys(e.assessment).length > 1) return !1;
			for (let t of Object.values(e.assessment)) {
				if (!t || Object.keys(t).some((e) => ![
					"draft",
					"submitted",
					"result",
					"seed",
					"attempts",
					"reveal"
				].includes(e))) return !1;
				let e = (e) => typeof e == "string" || (Array.isArray(e) ? e.every((e) => typeof e == "string") : typeof e == "object" && !!e && Object.values(e).every((e) => typeof e == "string"));
				if (!e(t.draft) || t.submitted !== void 0 && !e(t.submitted) || t.result && (![
					"correct",
					"incorrect",
					"unanswered"
				].includes(t.result.status) || !Number.isFinite(t.result.score) || typeof t.result.solution != "string" || typeof t.result.explanation != "string" || Object.keys(t.result).some((e) => ![
					"status",
					"score",
					"solution",
					"explanation"
				].includes(e)))) return !1;
			}
		}
		if (Object.keys(e.profile).some((e) => ![
			"fullName",
			"position",
			"department"
		].includes(e))) return !1;
	}
	return !0;
}
function ie(e, t) {
	return !t || e.epoch > t.epoch || e.epoch === t.epoch && e.sequence > t.sequence;
}
function ae(e, t) {
	let n = `lecture:${e.base}:${e.course}:${e.lecture}:${e.session}`, r = null, i = null;
	try {
		i = new BroadcastChannel(n);
	} catch {}
	let a = (n) => {
		C(n, e) && t(n);
	};
	i && (i.onmessage = (e) => a(e.data));
	let o = (t) => {
		if (!(t.origin !== location.origin || !C(t.data, e))) {
			if (t.source !== r && t.source !== window.opener) {
				if (!r && t.data.type === "HELLO" && t.source && "closed" in t.source) r = t.source;
				else return;
			}
			a(t.data);
		}
	};
	return window.addEventListener("message", o), {
		setPeer: (e) => {
			r = e;
		},
		send: (t) => {
			let n = {
				protocol: 1,
				session: e.session,
				course: e.course,
				lecture: e.lecture,
				version: e.version,
				...t
			};
			i?.postMessage(n), r && !r.closed && r.postMessage(n, location.origin), window.opener && !window.opener.closed && window.opener.postMessage(n, location.origin);
		},
		close: () => {
			i?.close(), window.removeEventListener("message", o);
		}
	};
}
//#endregion
//#region src/engine/Teaching.tsx
function oe(e) {
	return e.mode === "audience" ? /* @__PURE__ */ b(se, { ...e }) : /* @__PURE__ */ b(u, {
		course: e.course,
		base: e.base,
		children: /* @__PURE__ */ b(ce, { ...e })
	});
}
function se({ course: e, lecture: t, base: n, session: r, profile: i }) {
	let [a, o] = y(null), s = v(null), [c, l] = y(!1), [f, p] = y(""), m = async () => {
		try {
			if (!document.fullscreenEnabled || !document.documentElement.requestFullscreen) throw Error("unsupported");
			await document.documentElement.requestFullscreen(), p("");
		} catch {
			p("Браузер не разрешил полноэкранный показ. Откройте занятие в обычной вкладке Chrome или Edge и нажмите «На весь экран» в окне аудитории. В отдельном браузере также можно нажать F11.");
		}
	};
	_(() => {
		let e = () => l(!!document.fullscreenElement);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []), _(() => {
		let i = ae({
			course: e.id,
			lecture: t.id,
			version: e.contentVersion,
			base: n,
			session: r
		}, (e) => {
			e.type === "STATE" && e.state && t.slides.some((t) => t.id === e.state.slideId) && (ie(e.state, s.current) && (s.current = e.state, o(e.state)), i.send({
				type: "ACK",
				epoch: e.state.epoch,
				sequence: e.state.sequence
			})), e.type === "END" && o((e) => e && {
				...e,
				black: !0
			});
		});
		i.send({ type: "HELLO" });
		let a = setInterval(() => i.send({ type: "HELLO" }), 2e3);
		return () => {
			clearInterval(a), i.close();
		};
	}, [
		e.id,
		e.contentVersion,
		t,
		n,
		r
	]);
	let g = a ? t.slides.findIndex((e) => e.id === a.slideId) : -1;
	return /* @__PURE__ */ x("main", {
		className: `audience-shell ${a?.animations ? "motion-on" : ""}`,
		children: [
			a && g >= 0 && !a.black ? /* @__PURE__ */ x("div", {
				className: "audience-slide",
				children: [/* @__PURE__ */ b(u, {
					course: e,
					base: n,
					readonly: !0,
					snapshot: a.assessment,
					children: /* @__PURE__ */ b(d, {
						course: e,
						lecture: t,
						slide: t.slides[g],
						profile: a.profile || i,
						base: n,
						number: g + 1,
						interactive: !0
					})
				}), a.pointer && /* @__PURE__ */ b("span", {
					className: "laser-pointer",
					style: {
						left: `${a.pointer.x * 100}%`,
						top: `${a.pointer.y * 100}%`
					}
				})]
			}, `${a.slideId}:${a.replay}`) : /* @__PURE__ */ b("div", { className: "black-screen" }),
			!c && /* @__PURE__ */ x("button", {
				className: "audience-fullscreen button secondary",
				onClick: m,
				children: [/* @__PURE__ */ b(h, { size: 18 }), "На весь экран"]
			}),
			f && !c && /* @__PURE__ */ x("div", {
				className: "audience-fullscreen-error",
				role: "alert",
				children: [f, /* @__PURE__ */ b("button", {
					className: "button secondary",
					onClick: () => p(""),
					children: "Закрыть"
				})]
			})
		]
	});
}
function ce({ course: n, lecture: u, base: h, profile: S, session: C, initialSlide: ie, onExit: oe, teacherNotes: se, resolveTeacherNotes: ce }) {
 const [outline,setOutline]=y(false);
	let w = `lecture:${h}:${n.id}:private:${n.contentVersion}`, T = re(`lecture:${h}:${n.id}:panel-layout`), E = `lecture-session:${C}`, [D, le] = y(() => ce?.() || se || c(w, {})), [O, ue] = y(() => c(E, {
		slideId: ie,
		black: !1
	})), [k, A] = y(O.slideId), [j, de] = y(O.black), [M, fe] = y(0), [N, pe] = y(!1), [P, F] = y(null), [I, me] = y({}), he = ee((e) => me(e), []), [L, R] = y("Ожидание окна аудитории"), [z, ge] = y(!1), [B, V] = y(""), [H, _e] = y(19), [U, ve] = y(!1), [ye, be] = y(""), [W, xe] = y("script"), [G, Se] = y(() => c(`${E}:timer`, {
		start: Date.now(),
		elapsed: 0,
		paused: !1
	})), [Ce, we] = y(Date.now()), K = v(null), q = v({
		slideId: O.slideId,
		black: j,
		animations: !1,
		replay: M,
		profile: S,
		epoch: Date.now(),
		sequence: 1
	}), Te = v(0), J = v(window.lectureAudience || null), Ee = v(null), Y = Math.max(0, u.slides.findIndex((e) => e.id === O.slideId)), X = u.slides.find((e) => e.id === k) || u.slides[Y], Z = D[X.id] || l(), Q = (e) => {
		ue({
			slideId: e,
			black: j
		}), A(e);
	}, $ = (e) => Q(u.slides[Math.max(0, Math.min(u.slides.length - 1, Y + e))].id);
	_(() => {
		let e = () => {}, t = !1;
		return navigator.locks ? navigator.locks.request(`lecture-presenter:${h}:${C}`, { ifAvailable: !0 }, async (n) => {
			if (!n) {
				V("Для этого сеанса уже открыта панель преподавателя. Вернитесь в неё или начните новое занятие.");
				return;
			}
			t || (ge(!0), await new Promise((t) => {
				e = t;
			}));
		}).catch(() => V("Не удалось закрепить управление сеансом. Перезапустите занятие.")) : V("Браузер не поддерживает защиту от двух ведущих. Откройте занятие в современном браузере."), () => {
			t = !0, e();
		};
	}, [h, C]), _(() => {
		if (!z) return;
		let e = ae({
			course: n.id,
			lecture: u.id,
			version: n.contentVersion,
			base: h,
			session: C
		}, (t) => {
			t.type === "HELLO" && e.send({
				type: "STATE",
				state: q.current
			}), t.type === "ACK" && t.epoch === q.current.epoch && t.sequence === q.current.sequence && (Te.current = Date.now(), R("Синхронизировано"));
		});
		K.current = e, e.setPeer(J.current), e.send({
			type: "STATE",
			state: q.current
		});
		let t = setInterval(() => {
			J.current?.closed ? R("Окно аудитории закрыто") : Date.now() - Te.current > 6e3 && R("Ожидание окна аудитории"), e.send({
				type: "STATE",
				state: q.current
			});
		}, 1800);
		return () => {
			clearInterval(t), e.close(), K.current = null;
		};
	}, [
		z,
		n.id,
		n.contentVersion,
		u.id,
		h,
		C
	]), _(() => {
		q.current = {
			...q.current,
			slideId: O.slideId,
			black: j,
			replay: M,
			profile: S,
			assessment: I,
			pointer: N ? P : null,
			sequence: q.current.sequence + 1
		}, f(E, {
			slideId: O.slideId,
			black: j
		}), R("Синхронизация…"), K.current?.send({
			type: "STATE",
			state: q.current
		});
	}, [
		O.slideId,
		j,
		M,
		S,
		E,
		I,
		P,
		N
	]), _(() => {
		let e = setInterval(() => we(Date.now()), 1e3);
		return () => clearInterval(e);
	}, []), _(() => {
		f(`${E}:timer`, G);
	}, [G, E]), _(() => {
		let e = (e) => {
			(e.key === " " && e.target.closest("button")) || e.target.closest("input,textarea,select,a,[contenteditable],.visual-controls,.course-more,.table-scroll,.infographic,.choice-grid,.matching-fields,.short-field,.code-block,.template-dialog,.lv-dialog,.lv,[role=\"region\"]") || ([
				"ArrowRight",
				"PageDown",
				" "
			].includes(e.key) && (e.preventDefault(), $(1)), ["ArrowLeft", "PageUp"].includes(e.key) && (e.preventDefault(), $(-1)), e.key === "Home" && Q(u.slides[0].id), e.key === "End" && Q(u.slides.at(-1).id));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		Y,
		u,
		j
	]);
	let De = (e) => {
		let t = {
			...D,
			[X.id]: {
				...Z,
				...e
			}
		};
		le(t), f(w, t) || V("Не удалось сохранить заметки в браузере. Скачайте файл заметок.");
	}, Oe = G.elapsed + (G.paused ? 0 : Ce - G.start), ke = () => Se((e) => e.paused ? {
		...e,
		start: Date.now(),
		paused: !1
	} : {
		start: Date.now(),
		elapsed: e.elapsed + Date.now() - e.start,
		paused: !0
	}), Ae = () => {
		let e = new URL(location.href);
		e.search = new URLSearchParams({
			mode: "audience",
			lecture: u.id,
			session: C
		}).toString(), J.current = window.open(e, `audience-${C}`), K.current?.setPeer(J.current), J.current || V("Браузер заблокировал окно. Разрешите всплывающие окна и нажмите «Открыть аудиторию» снова.");
	}, je = async () => {
		let e = new URL(location.href);
		e.search = new URLSearchParams({
			mode: "audience",
			lecture: u.id,
			session: C
		}).toString();
		try {
			await navigator.clipboard.writeText(e.href), V("Ссылка аудитории скопирована. Откройте её в новой обычной вкладке этого же браузера.");
		} catch {
			V(`Ссылка аудитории: ${e.href}`);
		}
	}, Me = async (e) => {
		try {
			let t = JSON.parse(await e.text());
			if (t.schemaVersion !== 1 || t.courseId !== n.id || t.contentVersion !== n.contentVersion || !t.notes || typeof t.notes != "object") throw Error("Файл относится к другому курсу или версии");
			let r = new Set(n.lectures.flatMap((e) => e.slides.map((e) => e.id)));
			for (let [e, n] of Object.entries(t.notes)) if (!r.has(e) || !n || ![
				"script",
				"preparation",
				"notebook",
				"questions",
				"answer"
			].every((e) => typeof n[e] == "string") || !Number.isFinite(n.estimatedSeconds) || n.estimatedSeconds < 0) throw Error("Некорректные заметки");
			let i = {
				...D,
				...t.notes
			};
			if (!f(w, i)) throw Error("Не удалось сохранить заметки");
			le(i), V("Заметки загружены и сохранены в этом браузере.");
		} catch (e) {
			V(String(e));
		}
	}, Ne = () => {
		K.current?.send({ type: "END" }), J.current?.close(), oe(O.slideId);
	}, Pe = {
		script: "Сценарий",
		preparation: "Подготовка",
		notebook: "Запись",
		questions: "Вопросы",
		answer: "Ответы"
	};
	return /* @__PURE__ */ x("main", {
		className: `presenter-shell ${outline?"outline-open":""}`,
		children: [
			/* @__PURE__ */ b(i, {
				task: u.slides[Y].task,
				onChange: he
			}),
			/* @__PURE__ */ x("header", {
				className: "presenter-header",
				children: [
 b("a",{className:"button secondary",href:h,children:"← Каталог"}),
 x("div",{className:"presenter-heading",children:[b("small",{children:n.code+" · "+u.semester+" семестр"}),b("strong",{children:u.title})]}),
 b("button",{className:"icon-button","aria-label":"Содержание","aria-expanded":outline,onClick:()=>setOutline(!outline),children:b("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,children:b("path",{d:"M4 6h16M4 12h16M4 18h16"})})}),
 b("button",{className:"icon-button","aria-label":"Указка","aria-pressed":N,onClick:()=>{pe(!N);F(null)},children:b(g,{size:19})}),
 b("button",{className:"icon-button","aria-label":"Во весь экран",onClick:()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen(),children:b("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,children:b("path",{d:"M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"})})}),
 x("details",{className:"course-more",children:[b("summary",{"aria-label":"Ещё",children:"•••"}),b("div",{className:"course-more-panel",onClick:e=>{if(e.target.closest("button,a"))e.currentTarget.closest("details").open=false},children:b("button",{className:"button secondary",onClick:()=>{const theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem(`lecture:${h}:${n.id}:theme`,JSON.stringify(theme));window.dispatchEvent(new Event("course-theme"));},children:"Сменить тему"})})]}),
 b("button",{className:"button primary",onClick:Ne,children:"Завершить показ"})
 ]
			}),
			B && /* @__PURE__ */ x("div", {
				className: "notice",
				role: "status",
				children: [B, /* @__PURE__ */ b("button", {
					className: "text-button",
					onClick: () => V(""),
					children: "Закрыть"
				})]
			}),
			/* @__PURE__ */ x("div", {
				className: "presenter-layout-help",
				children: [/* @__PURE__ */ b("span", { children: "Перетащите границы между панелями, чтобы изменить ширину. Аудиторию можно вынести из вкладки на второй монитор." }), /* @__PURE__ */ b("button", {
					className: "text-button",
					onClick: T.reset,
					children: "Сбросить размеры"
				})]
			}),
			/* @__PURE__ */ x("div", {
				className: "presenter-grid",
				ref: T.grid,
				style: T.style,
				children: [
					/* @__PURE__ */ x("section", {
						className: "presenter-preview",
						children: [
							/* @__PURE__ */ x("div", {
								className: "preview-label",
								children: [/* @__PURE__ */ b("strong", { children: "Сейчас у аудитории" }), /* @__PURE__ */ x("span", { children: [
									Y + 1,
									" / ",
									u.slides.length,
									j ? " · чёрный экран" : ""
								] })]
							}),
							/* @__PURE__ */ x("div", {
								className: `mini-stage ${j ? "preview-black" : ""}`,
								onPointerMove: (e) => {
									if (N) {
										let t = e.currentTarget.getBoundingClientRect();
										F({
											x: Math.max(0, Math.min(1, (e.clientX - t.left) / t.width)),
											y: Math.max(0, Math.min(1, (e.clientY - t.top) / t.height))
										});
									}
								},
								onPointerLeave: () => F(null),
								children: [/* @__PURE__ */ b(d, {
									course: n,
									lecture: u,
									slide: u.slides[Y],
									profile: S,
									base: h,
									number: Y + 1,
									interactive: z
								}), N && P && /* @__PURE__ */ b("span", {
									className: "laser-pointer",
									style: {
										left: `${P.x * 100}%`,
										top: `${P.y * 100}%`
									}
								})]
							}),
							/* @__PURE__ */ x("div", {
								className: "presenter-controls",
								children: [
									/* @__PURE__ */ x("button", {
										className: "button secondary",
										disabled: !z || Y === 0,
										onClick: () => $(-1),
										children: [/* @__PURE__ */ b(m, { size: 17 }), "Назад"]
									}),
									/* @__PURE__ */ x("button", {
										className: "button primary",
										disabled: !z || Y === u.slides.length - 1,
										onClick: () => $(1),
										children: ["Вперёд", /* @__PURE__ */ b(e, { size: 17 })]
									}),
									/* @__PURE__ */ x("button", {
										className: "button secondary",
										"aria-pressed": j,
										disabled: !z,
										onClick: () => de(!j),
										children: [/* @__PURE__ */ b(ne, { size: 16 }), j ? "Вернуть слайд" : "Чёрный экран"]
									})
								]
							}),
							/* @__PURE__ */ x("div", {
								className: "preview-label",
								children: [/* @__PURE__ */ b("strong", { children: "Далее" }), /* @__PURE__ */ b("span", { children: u.slides[Y + 1]?.title || "Последний слайд" })]
							}),
							u.slides[Y + 1] && /* @__PURE__ */ b("div", {
								className: "mini-stage next-stage",
								children: /* @__PURE__ */ b(d, {
									course: n,
									lecture: u,
									slide: u.slides[Y + 1],
									profile: S,
									base: h,
									number: Y + 2
								})
							}),
							/* @__PURE__ */ x("div", {
								className: "session-tools",
								children: [
									/* @__PURE__ */ x("button", {
										className: "button ghost",
										"aria-pressed": N,
										onClick: () => {
											pe(!N), F(null);
										},
										children: [/* @__PURE__ */ b(g, { size: 17 }), "Указка"]
									}),
									/* @__PURE__ */ x("button", {
										className: "button ghost",
										disabled: !z,
										onClick: Ae,
										children: [/* @__PURE__ */ b(a, { size: 17 }), "Открыть аудиторию"]
									}),
									/* @__PURE__ */ b("button", {
										className: "button ghost",
										disabled: !z,
										onClick: () => fe(M + 1),
										children: "Повтор анимации"
									}),
									/* @__PURE__ */ b("button", {
										className: "button ghost",
										onClick: je,
										children: "Скопировать ссылку аудитории"
									})
								]
							}),
							/* @__PURE__ */ x("div", {
								className: "timer",
								children: [
									/* @__PURE__ */ x("strong", { children: [
										String(Math.floor(Oe / 6e4)).padStart(2, "0"),
										":",
										String(Math.floor(Oe / 1e3) % 60).padStart(2, "0")
									] }),
									/* @__PURE__ */ b("button", {
										className: "icon-button",
										"aria-label": G.paused ? "Продолжить таймер" : "Приостановить таймер",
										onClick: ke,
										children: G.paused ? /* @__PURE__ */ b(r, { size: 18 }) : /* @__PURE__ */ b(p, { size: 18 })
									}),
									/* @__PURE__ */ x("span", { children: [
										"Ориентир для выбранного слайда: ",
										Math.round(Z.estimatedSeconds / 60 * 10) / 10,
										" мин"
									] })
								]
							})
						]
					}),
					T.separator(0),
					/* @__PURE__ */ x("section", {
						className: "presenter-notes",
						children: [
							/* @__PURE__ */ x("div", {
								className: "notes-heading",
								children: [/* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("p", {
									className: "eyebrow",
									children: k === O.slideId ? "Текущий слайд" : "Подготовительный просмотр"
								}), /* @__PURE__ */ b("h2", { children: X.title })] }), /* @__PURE__ */ b("button", {
									className: "button ghost",
									onClick: () => ve(!U),
									children: U ? "Читать" : "Редактировать"
								})]
							}),
							k !== O.slideId && /* @__PURE__ */ b("button", {
								className: "button primary",
								disabled: !z,
								onClick: () => Q(k),
								children: "Показать аудитории"
							}),
							/* @__PURE__ */ b("div", {
								className: "note-tabs",
								role: "tablist",
								"aria-label": "Разделы заметок",
								children: Object.entries(Pe).map(([e, t]) => /* @__PURE__ */ b("button", {
									role: "tab",
									"aria-selected": W === e,
									className: W === e ? "active" : "",
									onClick: () => xe(e),
									children: t
								}, e))
							}),
							U ? /* @__PURE__ */ b("textarea", {
								className: "note-editor",
								"aria-label": `Редактировать: ${Pe[W]}`,
								style: { fontSize: H },
								value: Z[W],
								onChange: (e) => De({ [W]: e.target.value }),
								placeholder: "Добавьте текст для этого слайда"
							}) : /* @__PURE__ */ b("div", {
								className: "note-reader",
								role: "tabpanel",
								style: { fontSize: H },
								children: Z[W] || /* @__PURE__ */ x("div", {
									className: "notes-empty",
									children: [/* @__PURE__ */ b("h3", { children: "Заметки ещё не добавлены" }), /* @__PURE__ */ b("p", { children: "Загрузите файл сценария или нажмите «Редактировать». Текст сохраняется на этом устройстве и не передаётся в окно аудитории." })]
								})
							}),
							/* @__PURE__ */ x("div", {
								className: "notes-files",
								children: [
									/* @__PURE__ */ b("input", {
										ref: Ee,
										type: "file",
										accept: ".json,application/json",
										hidden: !0,
										onChange: (e) => {
											let t = e.target.files?.[0];
											t && Me(t), e.target.value = "";
										}
									}),
									/* @__PURE__ */ x("button", {
										className: "button ghost",
										onClick: () => Ee.current?.click(),
										children: [/* @__PURE__ */ b(te, { size: 17 }), "Загрузить заметки"]
									}),
									/* @__PURE__ */ x("button", {
										className: "button ghost",
										onClick: () => o(`${n.id}-teacher-notes.json`, {
											schemaVersion: 1,
											courseId: n.id,
											contentVersion: n.contentVersion,
											notes: D
										}),
										children: [/* @__PURE__ */ b(t, { size: 17 }), "Сохранить заметки"]
									})
								]
							}),
							/* @__PURE__ */ x("label", {
								className: "notes-duration",
								children: ["Расчётное время, секунд", /* @__PURE__ */ b("input", {
									type: "number",
									min: "0",
									value: Z.estimatedSeconds,
									onChange: (e) => De({ estimatedSeconds: Math.max(0, Number(e.target.value)) })
								})]
							})
						]
					}),
					T.separator(1),
					/* @__PURE__ */ x("aside", {
						className: "presenter-outline", onKeyDown:e=>{if(e.key==="Escape")setOutline(false)},
						children: [/* @__PURE__ */ b("label", {
							className: "search-field",
							children: /* @__PURE__ */ b("input", {
								placeholder: "Найти слайд",
								"aria-label": "Найти слайд",
								value: ye,
								onChange: (e) => be(e.target.value)
							})
						}), /* @__PURE__ */ b("ol", {
							className: "toc-list",
							children: u.slides.map((e, t) => ({
								s: e,
								i: t
							})).filter(({ s: e }) => e.title.toLowerCase().includes(ye.toLowerCase())).map(({ s: e, i: t }) => /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x("button", {
								"aria-current": e.id === k ? "step" : void 0,
								onClick: () => {A(e.id);setOutline(false)},
								children: [/* @__PURE__ */ b("b", { children: String(t + 1).padStart(2, "0") }), e.title]
							}) }, e.id))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { oe as default };
