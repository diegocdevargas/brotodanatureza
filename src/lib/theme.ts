// Theme storage key and the pre-paint script inlined in <head> by the root layout (a server component,
// so it must not live in a 'use client' module). Dark is the default; `.dark` on <html> is the single source of truth.
export const THEME_KEY = 'brota-theme'

export const THEME_SCRIPT = `try{var k="${THEME_KEY}",v=localStorage.getItem(k),o=localStorage.getItem("broto-theme");if(v===null&&o!==null){localStorage.setItem(k,o);localStorage.removeItem("broto-theme");v=o}var t=v==="light"?"light":"dark";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add("dark")}`
