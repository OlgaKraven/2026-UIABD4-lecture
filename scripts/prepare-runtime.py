"""Prepare the pinned runtime with the course toolbar and presenter layout."""
from pathlib import Path
import tarfile,json
root=Path('engine-extension/runtime')
archive=Path('vendor/olgakraven-lecture-engine-0.1.1-okfks.10-visuals.2.tgz')
with tarfile.open(archive) as tar:
    for entry in tar.getmembers():
        if entry.isfile() and (entry.name.startswith('package/lib/') or entry.name in ['package/package.json','package/LICENSE']):
            dest=root/entry.name.removeprefix('package/')
            dest.parent.mkdir(parents=True,exist_ok=True)
            dest.write_bytes(tar.extractfile(entry).read())
p=root/'lib/lecture-engine.js';s=p.read_text(encoding='utf-8')
start=s.index('children: [',s.index('className: "toolbar-actions"'))
end=s.index('\n\t\t\t\t\t\t\t\t]',start)+len('\n\t\t\t\t\t\t\t\t]')
s=s[:start]+'''children: [
 Q("Открыть содержание",b(ce,{size:19}),()=>{I("");P("toc")}),
 Q("Указка",b(re,{size:19}),()=>{be(!B);H(null)},B),
 Q("Полноэкранный режим",b(xe?le:ne,{size:19}),we),
 x("details",{className:"course-more",onKeyDown:e=>{if(e.key==="Escape")e.currentTarget.open=false},children:[b("summary",{"aria-label":"Ещё",children:"•••"}),x("div",{className:"course-more-panel",onClick:e=>{if(e.target.closest("button,a"))e.currentTarget.closest("details").open=false},children:[
  $,Q("Настройка перед занятием",b(w,{size:19}),()=>P("settings")),
  Q("Результаты самопроверки",b(ae,{size:19}),()=>P("results")),
  Q("Скачать лекцию",b(t,{size:19}),()=>P("download"))
 ]})]}),
 x("button",{className:"button primary",onClick:Te,children:[b(i,{size:19}),"Режим показа"]})
 ]'''+s[end:]
# Arrows continue to navigate after a navigation button retains focus.
s=s.replace('input,textarea,select,button,a,[contenteditable]', 'input,textarea,select,a,[contenteditable],.visual-controls,.course-more')
s=s.replace('e.slides.filter((e) => !e.task && e.kind !== "test").map(', 'e.slides.map(')
s=s.replace('if (N || t.closest(', 'if ((e.key === " " && t.closest("button")) || N || t.closest(')
needle='document.documentElement.dataset.theme = O, h(`${T}:theme`, O);'
assert needle in s
s=s.replace(needle,needle+'''\n }, [O,T]), v(()=>{const sync=()=>ge(l(`${T}:theme`,"light"));window.addEventListener("storage",sync);window.addEventListener("course-theme",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("course-theme",sync)};''',1)
s=s.replace('y(() => l(`${T}:animation`, !0))','y(false)')
s=s.replace('let t = l(`${T}:${n.contentVersion}:${e.id}:progress`, e.slides[0].id);','let t = l(`${T}:${n.contentVersion}:${e.id}:progress`, e.slides[0].id);t=n.slideAliases?.[t]||t;')
p.write_text(s,encoding='utf-8')
p=root/'lib/Teaching-CZWN6_7h.js';s=p.read_text(encoding='utf-8')
needle='function ce({ course: n, lecture: u, base: h, profile: S, session: C, initialSlide: ie, onExit: oe, teacherNotes: se, resolveTeacherNotes: ce }) {'
assert needle in s
s=s.replace(needle,needle+'\n const [outline,setOutline]=y(false);',1)
s=s.replace('className: "presenter-shell"','className: `presenter-shell ${outline?"outline-open":""}`',1)
start=s.index('children: [',s.index('className: "presenter-header"'))
end=s.index('\n\t\t\t\t]',start)+len('\n\t\t\t\t]')
s=s[:start]+'''children: [
 b("a",{className:"button secondary",href:h,children:"← Каталог"}),
 x("div",{className:"presenter-heading",children:[b("small",{children:n.code+" · "+u.semester+" семестр"}),b("strong",{children:u.title})]}),
 b("button",{className:"icon-button","aria-label":"Содержание","aria-expanded":outline,onClick:()=>setOutline(!outline),children:b("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,children:b("path",{d:"M4 6h16M4 12h16M4 18h16"})})}),
 b("button",{className:"icon-button","aria-label":"Указка","aria-pressed":N,onClick:()=>{pe(!N);F(null)},children:b(g,{size:19})}),
 b("button",{className:"icon-button","aria-label":"Во весь экран",onClick:()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen(),children:b("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,children:b("path",{d:"M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"})})}),
 x("details",{className:"course-more",children:[b("summary",{"aria-label":"Ещё",children:"•••"}),b("div",{className:"course-more-panel",onClick:e=>{if(e.target.closest("button,a"))e.currentTarget.closest("details").open=false},children:b("button",{className:"button secondary",onClick:()=>{const theme=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem(`lecture:${h}:${n.id}:theme`,JSON.stringify(theme));window.dispatchEvent(new Event("course-theme"));},children:"Сменить тему"})})]}),
 b("button",{className:"button primary",onClick:Ne,children:"Завершить показ"})
 ]'''+s[end:]
s=s.replace('input,textarea,select,button,a,[contenteditable]', 'input,textarea,select,a,[contenteditable],.visual-controls,.course-more')
s=s.replace('e.target.closest("input,', '(e.key === " " && e.target.closest("button")) || e.target.closest("input,')
# The teaching content stays private while changing the visible layout.
s=s.replace('className: "presenter-outline",','className: "presenter-outline", onKeyDown:e=>{if(e.key==="Escape")setOutline(false)},',1)
s=s.replace('onClick: () => A(e.id),','onClick: () => {A(e.id);setOutline(false)},',1)
start=s.index('\t\t\t\t\t\t\t/* @__PURE__ */ x("label", {\n\t\t\t\t\t\t\t\tclassName: "note-font"')
end=s.index('\t\t\t\t\t\t\tU ?',start)
s=s[:start]+s[end:]
s=s.replace('animations: !0','animations: !1')
p.write_text(s,encoding='utf-8')
p=root/'lib/SlideView-ejiylWgb.js';s=p.read_text(encoding='utf-8');s=s.replace('fetch(k(e.assessment.url, t))','fetch(k(e.assessment.url, t),{cache:"no-cache"})');p.write_text(s,encoding='utf-8')
p=root/'lib/model.d.ts';s=p.read_text(encoding='utf-8').replace('export type Course = {','export type Course = {\n    slideAliases?: Record<string,string>;');p.write_text(s,encoding='utf-8')
p=root/'package.json';d=json.loads(p.read_text(encoding='utf-8'));d['version']='0.1.1-uiabd4.1';p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Runtime prepared:',root)
