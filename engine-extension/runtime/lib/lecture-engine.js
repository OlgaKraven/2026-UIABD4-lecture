import { C as e, S as t, T as n, _ as r, b as i, d as a, f as o, h as s, i as c, l, m as u, n as d, o as f, r as ee, s as p, t as m, u as h, v as te, w as g, x as ne, y as re } from "./SlideView-ejiylWgb.js";
import { Suspense as ie, lazy as _, useEffect as v, useState as y } from "react";
import { jsx as b, jsxs as x } from "react/jsx-runtime";
var S = n("book-open", [["path", {
	d: "M12 5v16",
	key: "1f6ucr"
}], ["path", {
	d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
	key: "1fyvmf"
}]]), ae = n("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]), oe = n("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), se = n("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]), ce = n("list", [
	["path", {
		d: "M3 5h.01",
		key: "18ugdj"
	}],
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M3 19h.01",
		key: "noohij"
	}],
	["path", {
		d: "M8 5h13",
		key: "1pao27"
	}],
	["path", {
		d: "M8 12h13",
		key: "1za7za"
	}],
	["path", {
		d: "M8 19h13",
		key: "m83p4d"
	}]
]), le = n("minimize", [
	["path", {
		d: "M8 3v3a2 2 0 0 1-2 2H3",
		key: "hohbtr"
	}],
	["path", {
		d: "M21 8h-3a2 2 0 0 1-2-2V3",
		key: "5jw1f3"
	}],
	["path", {
		d: "M3 16h3a2 2 0 0 1 2 2v3",
		key: "198tvr"
	}],
	["path", {
		d: "M16 21v-3a2 2 0 0 1 2-2h3",
		key: "ph8mxp"
	}]
]), ue = n("moon", [["path", {
	d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	key: "kfwtm"
}]]), de = n("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), C = n("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), fe = n("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]), w = n("user-round", [["circle", {
	cx: "12",
	cy: "8",
	r: "5",
	key: "1hypcn"
}], ["path", {
	d: "M20 21a8 8 0 0 0-16 0",
	key: "rfgkzh"
}]]), pe = _(() => import("./Teaching-CZWN6_7h.js")), me = {
	fullName: "",
	position: "",
	department: ""
};
function T({ course: n, base: s = "/", teacherNotes: d, resolveTeacherNotes: f, renderCatalog: _ }) {
	let T = `lecture:${s}:${n.id}`, [E, D] = y(() => new URLSearchParams(location.search)), [O, ge] = y(() => l(`${T}:theme`, "light")), [k, A] = y(() => l(`${T}:profile`, me)), [j, M] = y(() => l(`${T}:materials`, n.materialsUrl)), [N, P] = y(""), [F, I] = y(""), [L, _e] = y("all"), [R, ve] = y(false), [z, ye] = y(0), [B, be] = y(!1), [V, H] = y(null), [xe, Se] = y(!1), [U, W] = y(""), G = E.get("mode") || "viewer", K = n.lectures.find((e) => e.id === E.get("lecture")), q = K ? Math.max(0, K.slides.findIndex((e) => e.id === E.get("slide"))) : 0, J = K?.slides[q], Y = (e) => {
		let t = new URL(location.href);
		t.search = new URLSearchParams(e).toString(), history.pushState({}, "", t), D(new URLSearchParams(t.search)), window.scrollTo(0, 0);
	}, X = (e) => {
		if (!K) return;
		let t = K.slides[Math.max(0, Math.min(K.slides.length - 1, e))];
		h(`${T}:${n.contentVersion}:${K.id}:progress`, t.id);
		let r = new URL(location.href);
		r.searchParams.set("slide", t.id), history.replaceState({}, "", r), D(new URLSearchParams(r.search));
	}, Ce = (e) => {
		let t = l(`${T}:${n.contentVersion}:${e.id}:progress`, e.slides[0].id);t=n.slideAliases?.[t]||t;
		Y({
			lecture: e.id,
			slide: e.slides.some((e) => e.id === t) ? t : e.slides[0].id
		});
	}, Z = (e) => {
		let t = new URL(location.href);
		t.search = new URLSearchParams({
			mode: "print",
			scope: e,
			auto: "1"
		}).toString(), window.open(t, "_blank", "noopener");
	}, we = async () => {
		try {
			document.fullscreenElement ? await document.exitFullscreen() : await document.documentElement.requestFullscreen();
		} catch {
			W("Полноэкранный режим недоступен. Используйте полноэкранный режим браузера.");
		}
	};
	v(() => {
		let e = () => D(new URLSearchParams(location.search)), t = () => Se(!!document.fullscreenElement);
		return window.addEventListener("popstate", e), document.addEventListener("fullscreenchange", t), () => {
			window.removeEventListener("popstate", e), document.removeEventListener("fullscreenchange", t);
		};
	}, []), v(() => {
		document.documentElement.dataset.theme = O, h(`${T}:theme`, O);
 }, [O,T]), v(()=>{const sync=()=>ge(l(`${T}:theme`,"light"));window.addEventListener("storage",sync);window.addEventListener("course-theme",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("course-theme",sync)};
	}, [O, T]), v(() => {
		new FontFace("Raleway", `url(${o(n.font, s)})`, { weight: "100 900" }).load().then((e) => document.fonts.add(e)).catch(() => {});
	}, [n.font, s]), v(() => {
		h(`${T}:animation`, R);
	}, [R, T]), v(() => {
		if (G !== "viewer" || !K) return;
		let e = (e) => {
			let t = e.target;
			if ((e.key === " " && t.closest("button")) || N || t.closest("input,textarea,select,a,[contenteditable],.visual-controls,.course-more,.table-scroll,.infographic,.choice-grid,.matching-fields,.short-field,.code-block,.template-dialog,.lv-dialog,.lv,[role=\"region\"]")) return;
			let n = [
				"ArrowRight",
				"PageDown",
				" "
			].includes(e.key), r = ["ArrowLeft", "PageUp"].includes(e.key);
			(n || r || ["Home", "End"].includes(e.key)) && (e.preventDefault(), X(e.key === "Home" ? 0 : e.key === "End" ? K.slides.length - 1 : q + (n ? 1 : -1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		G,
		K,
		q,
		N
	]), v(() => {
		G === "print" && E.get("auto") === "1" && Promise.all([document.fonts.ready, ...Array.from(document.images).map((e) => e.decode().catch(() => {}))]).then(() => {
			setTimeout(() => window.print(), 150);
		});
	}, [G, E]);
	let Te = () => {
		if (!K) return;
		let e = crypto.randomUUID(), t = new URL(location.href);
		t.search = new URLSearchParams({
			mode: "audience",
			lecture: K.id,
			session: e
		}).toString();
		let n = window.open(t, `audience-${e}`);
		window.lectureAudience = n, Y({
			mode: "presenter",
			lecture: K.id,
			slide: J.id,
			session: e
		});
	}, Q = (e, t, n, r) => /* @__PURE__ */ b("button", {
		className: "icon-button",
		title: e,
		"aria-label": e,
		"aria-pressed": r,
		onClick: n,
		children: t
	}), $ = Q(O === "light" ? "Включить тёмную тему" : "Включить светлую тему", b(O === "light" ? ue : fe, { size: 19 }), () => ge(O === "light" ? "dark" : "light"));
	if ((G === "presenter" || G === "audience") && K) return /* @__PURE__ */ b(ie, {
		fallback: /* @__PURE__ */ b("p", { children: "Открываем занятие…" }),
		children: /* @__PURE__ */ b(pe, {
			teacherNotes: G === "presenter" ? d : void 0,
			resolveTeacherNotes: G === "presenter" ? f : void 0,
			course: n,
			lecture: K,
			base: s,
			profile: k,
			mode: G,
			session: E.get("session") || "",
			initialSlide: J.id,
			onExit: (e) => {
				let t = K.slides.some((t) => t.id === e) ? e : J.id;
				h(`${T}:${n.contentVersion}:${K.id}:progress`, t), Y({
					lecture: K.id,
					slide: t
				});
			}
		})
	});
	if (G === "print") {
		let e = E.get("scope"), t = n.lectures.filter((t) => e === "all" || e === t.id || e === `semester-${t.semester}`);
		return /* @__PURE__ */ x("main", {
			className: "print-document",
			children: [/* @__PURE__ */ x("div", {
				className: "print-hint",
				children: [/* @__PURE__ */ x("strong", { children: [
					"PDF · ",
					t.length,
					" лекций"
				] }), /* @__PURE__ */ b("button", {
					className: "button primary",
					onClick: () => window.print(),
					children: "Сохранить PDF"
				})]
			}), t.flatMap((e) => e.slides.map((t, r) => /* @__PURE__ */ b("section", {
				className: "print-page",
				children: /* @__PURE__ */ b(m, {
					course: n,
					lecture: e,
					slide: t,
					number: r + 1,
					base: s,
					profile: k
				})
			}, t.id)))]
		});
	}
	return /* @__PURE__ */ x(ee, {
		course: n,
		base: s,
		children: [
			K ? /* @__PURE__ */ x("main", {
				className: `deck-shell ${R ? "motion-on" : ""}`,
				children: [
					/* @__PURE__ */ x("header", {
						className: "deck-toolbar",
						children: [
							/* @__PURE__ */ x("button", {
								className: "button ghost",
								onClick: () => Y({}),
								children: [/* @__PURE__ */ b(g, { size: 18 }), "Каталог"]
							}),
							/* @__PURE__ */ x("div", {
								className: "deck-topic",
								children: [/* @__PURE__ */ b("strong", { children: K.title }), /* @__PURE__ */ x("span", { children: [K.semester, " семестр"] })]
							}),
							/* @__PURE__ */ x("div", {
								className: "toolbar-actions",
								children: [
 Q("Открыть содержание",b(ce,{size:19}),()=>{I("");P("toc")}),
 Q("Указка",b(re,{size:19}),()=>{be(!B);H(null)},B),
 Q("Полноэкранный режим",b(xe?le:ne,{size:19}),we),
 x("details",{className:"course-more",onKeyDown:e=>{if(e.key==="Escape")e.currentTarget.open=false},children:[b("summary",{"aria-label":"Ещё",children:"•••"}),x("div",{className:"course-more-panel",onClick:e=>{if(e.target.closest("button,a"))e.currentTarget.closest("details").open=false},children:[
  $,Q("Настройка перед занятием",b(w,{size:19}),()=>P("settings")),
  Q("Результаты самопроверки",b(ae,{size:19}),()=>P("results")),
  Q("Скачать лекцию",b(t,{size:19}),()=>P("download"))
 ]})]}),
 x("button",{className:"button primary",onClick:Te,children:[b(i,{size:19}),"Режим показа"]})
 ]
							})
						]
					}),
					/* @__PURE__ */ b("div", {
						className: "progress-track",
						role: "progressbar",
						"aria-label": "Прогресс лекции",
						"aria-valuemin": 0,
						"aria-valuemax": K.slides.length,
						"aria-valuenow": q + 1,
						children: /* @__PURE__ */ b("span", { style: { width: `${(q + 1) / K.slides.length * 100}%` } })
					}),
					/* @__PURE__ */ b("section", {
						className: "player-stage",
						children: /* @__PURE__ */ x("div", {
							className: "active-slide",
							onPointerMove: (e) => {
								if (B) {
									let t = e.currentTarget.getBoundingClientRect();
									H({
										x: (e.clientX - t.left) / t.width,
										y: (e.clientY - t.top) / t.height
									});
								}
							},
							onPointerLeave: () => H(null),
							children: [/* @__PURE__ */ b(m, {
								course: n,
								lecture: K,
								slide: J,
								profile: k,
								base: s,
								number: q + 1,
								interactive: !0
							}), B && V && /* @__PURE__ */ b("span", {
								className: "laser-pointer",
								style: {
									left: `${V.x * 100}%`,
									top: `${V.y * 100}%`
								}
							})]
						}, `${J.id}:${z}`)
					}),
					/* @__PURE__ */ x("nav", {
						className: "deck-controls",
						"aria-label": "Навигация по слайдам",
						children: [
							/* @__PURE__ */ x("button", {
								className: "button secondary",
								disabled: !q,
								onClick: () => X(q - 1),
								children: [/* @__PURE__ */ b(g, { size: 18 }), "Назад"]
							}),
							/* @__PURE__ */ x("button", {
								className: "slide-counter",
								onClick: () => {
									I(""), P("toc");
								},
								"aria-label": "Счётчик и содержание",
								children: [
									q + 1,
									" / ",
									K.slides.length
								]
							}),
							/* @__PURE__ */ x("button", {
								className: "button primary",
								disabled: q === K.slides.length - 1,
								onClick: () => X(q + 1),
								children: ["Вперёд", /* @__PURE__ */ b(e, { size: 18 })]
							})
						]
					}),
					/* @__PURE__ */ x("span", {
						className: "sr-only",
						"aria-live": "polite",
						children: [
							"Слайд ",
							q + 1,
							": ",
							J.title
						]
					})
				]
			}) : _ ? _({
				course: n,
				base: s,
				profile: k,
				materials: j,
				theme: O,
				onThemeChange: ge,
				storagePrefix: T,
				invalidLecture: E.has("lecture"),
				onOpenLecture: Ce,
				onPrint: Z,
				onProfileChange: (e) => {
					A(e), h(`${T}:profile`, e);
				},
				onMaterialsChange: (e) => {
					M(e), h(`${T}:materials`, e);
				}
			}) : /* @__PURE__ */ x("main", {
				className: "catalog",
				children: [
					/* @__PURE__ */ x("header", {
						className: "catalog-header",
						children: [/* @__PURE__ */ x("a", {
							className: "brand-lockup",
							href: s,
							children: [/* @__PURE__ */ b("img", {
								src: o(n.logo, s),
								alt: "Логотип компании"
							}), /* @__PURE__ */ x("span", { children: [/* @__PURE__ */ b("strong", { children: n.code }), /* @__PURE__ */ b("small", { children: n.discipline })] })]
						}), /* @__PURE__ */ x("nav", { children: [
							/* @__PURE__ */ x("button", {
								className: "button ghost settings-button",
								onClick: () => P("settings"),
								children: [/* @__PURE__ */ b(w, { size: 19 }), /* @__PURE__ */ b("span", { children: "Настройка перед занятием" })]
							}),
							$,
							/* @__PURE__ */ b("a", {
								className: "icon-button",
								href: o("guide.html", s),
								target: "_blank",
								rel: "noopener noreferrer",
								title: "Как пользоваться сайтом",
								"aria-label": "Как пользоваться сайтом",
								children: /* @__PURE__ */ b(oe, { size: 19 })
							})
						] })]
					}),
					E.has("lecture") && /* @__PURE__ */ b("div", {
						className: "notice",
						children: "Лекция не найдена. Выберите тему в каталоге."
					}),
					/* @__PURE__ */ x("section", {
						className: "catalog-hero",
						children: [/* @__PURE__ */ x("div", {
							className: "hero-copy",
							children: [
								/* @__PURE__ */ x("p", {
									className: "eyebrow",
									children: [
										n.semesters.join(" и "),
										" семестры",
										n.year ? ` · ${n.year}` : ""
									]
								}),
								/* @__PURE__ */ x("h1", { children: [
									n.heroTitle,
									" ",
									/* @__PURE__ */ b("span", { children: n.heroAccent })
								] }),
								/* @__PURE__ */ b("p", {
									className: "hero-lead",
									children: n.slogan
								}),
								/* @__PURE__ */ x("div", {
									className: "teacher-summary",
									children: [
										/* @__PURE__ */ b("span", { children: "Преподаватель" }),
										/* @__PURE__ */ b("strong", { children: k.fullName || "Ваше имя на каждой лекции" }),
										/* @__PURE__ */ b("small", { children: k.position || "Заполните данные перед занятием" }),
										k.department && /* @__PURE__ */ b("small", { children: k.department })
									]
								})
							]
						}), /* @__PURE__ */ x("div", {
							className: "hero-mascot",
							children: [/* @__PURE__ */ b("div", { className: "chevron-backdrop" }), /* @__PURE__ */ b("img", {
								src: o(n.mascot, s),
								alt: n.mascotAlt
							})]
						})]
					}),
					/* @__PURE__ */ x("section", {
						className: "catalog-tools",
						"aria-label": "Поиск и фильтры",
						children: [
							/* @__PURE__ */ x("label", {
								className: "search-field",
								children: [/* @__PURE__ */ b(C, { size: 19 }), /* @__PURE__ */ b("input", {
									"aria-label": "Поиск по темам",
									placeholder: "Поиск по темам",
									value: F,
									onChange: (e) => I(e.target.value)
								})]
							}),
							/* @__PURE__ */ b("div", {
								className: "semester-filter",
								children: ["all", ...n.semesters].map((e) => /* @__PURE__ */ b("button", {
									className: L === e ? "active" : "",
									"aria-pressed": L === e,
									onClick: () => _e(e),
									children: e === "all" ? "Все темы" : `${e} семестр`
								}, e))
							}),
							u(j) ? /* @__PURE__ */ x("a", {
								className: "materials-link",
								href: u(j),
								target: "_blank",
								rel: "noopener noreferrer",
								children: [
									/* @__PURE__ */ b(S, { size: 18 }),
									"Материалы",
									/* @__PURE__ */ b(se, { size: 15 })
								]
							}) : /* @__PURE__ */ x("button", {
								className: "materials-link",
								onClick: () => P("settings"),
								children: [/* @__PURE__ */ b(S, { size: 18 }), "Прикрепить материалы"]
							})
						]
					}),
					/* @__PURE__ */ b("section", {
						className: "topic-grid",
						children: n.lectures.filter((e) => (L === "all" || e.semester === L) && `${e.title} ${e.sourceTitle}`.toLowerCase().includes(F.toLowerCase())).map((e) => /* @__PURE__ */ x("article", {
							className: `topic-card period-${n.semesters.indexOf(e.semester) % 2}`,
							children: [
								/* @__PURE__ */ x("div", {
									className: "topic-card-top",
									children: [/* @__PURE__ */ b("span", {
										className: "topic-index",
										children: String(n.lectures.indexOf(e) + 1).padStart(2, "0")
									}), /* @__PURE__ */ x("span", {
										className: "semester-tag",
										children: [e.semester, " семестр"]
									})]
								}),
								/* @__PURE__ */ b("h2", { children: e.title }),
								/* @__PURE__ */ b("p", { children: e.sourceTitle }),
								/* @__PURE__ */ b("div", {
									className: "topic-card-footer",
									children: /* @__PURE__ */ x("div", {
										className: "topic-card-actions",
										children: [/* @__PURE__ */ x("button", {
											className: "button ghost",
											onClick: () => Z(e.id),
											children: [/* @__PURE__ */ b(t, { size: 17 }), "Сохранить PDF"]
										}), /* @__PURE__ */ b("button", {
											className: "button primary",
											onClick: () => Ce(e),
											children: "Открыть"
										})]
									})
								})
							]
						}, e.id))
					}),
					!n.lectures.some((e) => (L === "all" || e.semester === L) && `${e.title} ${e.sourceTitle}`.toLowerCase().includes(F.toLowerCase())) && /* @__PURE__ */ x("section", {
						className: "empty-state",
						children: [/* @__PURE__ */ b("h2", { children: "Темы не найдены" }), /* @__PURE__ */ b("p", { children: "Измените запрос или выберите другой семестр." })]
					}),
					/* @__PURE__ */ x("footer", {
						className: "catalog-footer",
						children: [
							/* @__PURE__ */ b("a", {
								href: o("guide.html", s),
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Как пользоваться сайтом"
							}),
							/* @__PURE__ */ b("span", { children: n.demo ? "Демонстрационный курс · образцы макетов, не полный комплект по РПД" : n.discipline }),
							n.year && /* @__PURE__ */ x("span", { children: ["Учебный год ", n.year] })
						]
					})
				]
			}),
			U && /* @__PURE__ */ b("div", {
				className: "floating-notice",
				role: "status",
				onClick: () => W(""),
				children: U
			}),
			N === "settings" && /* @__PURE__ */ b(he, {
				course: n,
				profile: k,
				materials: j,
				onClose: () => P(""),
				onSave: (e, t) => {
					A(e), M(t), h(`${T}:profile`, e), h(`${T}:materials`, t);
				},
				print: Z
			}),
			N === "toc" && K && /* @__PURE__ */ x(p, {
				title: "Содержание лекции",
				onClose: () => P(""),
				children: [/* @__PURE__ */ x("label", {
					className: "search-field",
					children: [/* @__PURE__ */ b(C, { size: 18 }), /* @__PURE__ */ b("input", {
						autoFocus: !0,
						"aria-label": "Найти слайд",
						placeholder: "Найти слайд",
						value: F,
						onChange: (e) => I(e.target.value)
					})]
				}), /* @__PURE__ */ b("ol", {
					className: "toc-list",
					children: K.slides.map((e, t) => ({
						s: e,
						i: t
					})).filter(({ s: e }) => e.title.toLowerCase().includes(F.toLowerCase())).map(({ s: e, i: t }) => /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x("button", {
						"aria-current": t === q ? "step" : void 0,
						onClick: () => {
							X(t), P("");
						},
						children: [/* @__PURE__ */ b("b", { children: String(t + 1).padStart(2, "0") }), e.title]
					}) }, e.id))
				})]
			}),
			N === "download" && K && /* @__PURE__ */ x(p, {
				title: "Скачать лекцию",
				onClose: () => P(""),
				children: [/* @__PURE__ */ b("p", { children: "Материал текущей лекции без тестовых заданий. Заметки и ответы преподавателя не включаются." }), /* @__PURE__ */ x("button", {
					className: "button primary",
					onClick: () => Z(K.id),
					children: [/* @__PURE__ */ b(t, { size: 18 }), "Сохранить PDF"]
				})]
			}),
			N === "results" && K && /* @__PURE__ */ b(p, {
				title: "Самопроверка",
				onClose: () => P(""),
				children: /* @__PURE__ */ b(c, {
					lecture: K,
					onGo: (e) => {
						X(e), P("");
					}
				})
			}),
			/* @__PURE__ */ x("span", {
				className: "sr-only",
				children: ["Версия шаблона ", a]
			})
		]
	});
}
function he({ course: e, profile: n, materials: r, onSave: i, onClose: a, print: o }) {
	let [s, c] = y(n), [l, d] = y(r), [f, ee] = y(""), m = () => l && !u(l) ? (ee("Укажите полный адрес папки, начинающийся с https:// или http://"), !1) : (i(s, l), !0);
	return /* @__PURE__ */ b(p, {
		title: "Настройка перед занятием",
		onClose: a,
		children: /* @__PURE__ */ x("form", {
			onSubmit: (e) => {
				e.preventDefault(), m() && a();
			},
			className: "settings-form",
			children: [
				/* @__PURE__ */ x("label", { children: ["ФИО преподавателя", /* @__PURE__ */ b("input", {
					autoComplete: "name",
					value: s.fullName,
					onChange: (e) => c({
						...s,
						fullName: e.target.value
					})
				})] }),
				/* @__PURE__ */ x("label", { children: ["Должность", /* @__PURE__ */ b("input", {
					value: s.position,
					onChange: (e) => c({
						...s,
						position: e.target.value
					})
				})] }),
				/* @__PURE__ */ x("label", { children: ["Кафедра или лаборатория", /* @__PURE__ */ b("input", {
					value: s.department,
					onChange: (e) => c({
						...s,
						department: e.target.value
					})
				})] }),
				/* @__PURE__ */ x("label", { children: ["Ссылка на папку с материалами", /* @__PURE__ */ b("input", {
					type: "url",
					placeholder: "https://…",
					value: l,
					onChange: (e) => d(e.target.value)
				})] }),
				/* @__PURE__ */ b("p", {
					className: "field-help",
					children: "Настройки сохраняются в этом браузере. В опубликованном курсе общая ссылка задаётся автором."
				}),
				f && /* @__PURE__ */ b("p", {
					role: "alert",
					children: f
				}),
				/* @__PURE__ */ x("section", {
					className: "profile-downloads",
					children: [/* @__PURE__ */ b("strong", { children: "Сохранить лекции в PDF" }), /* @__PURE__ */ x("div", { children: [e.semesters.map((e) => /* @__PURE__ */ x("button", {
						type: "button",
						className: "button ghost",
						onClick: () => {
							m() && o(`semester-${e}`);
						},
						children: [
							/* @__PURE__ */ b(t, { size: 17 }),
							e,
							" семестр"
						]
					}, e)), /* @__PURE__ */ x("button", {
						type: "button",
						className: "button ghost",
						onClick: () => {
							m() && o("all");
						},
						children: [/* @__PURE__ */ b(t, { size: 17 }), e.year ? `За ${e.year} год` : "Все лекции"]
					})] })]
				}),
				/* @__PURE__ */ b("div", {
					className: "dialog-actions",
					children: /* @__PURE__ */ b("button", {
						className: "button primary",
						type: "submit",
						children: "Сохранить настройки"
					})
				})
			]
		})
	});
}
//#endregion
export { f as Infographic, T as LectureSite, a as TEMPLATE_VERSION, d as VisualRendererProvider, s as validateCourse };
