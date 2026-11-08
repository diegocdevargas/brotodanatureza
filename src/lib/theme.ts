// Theme storage key and the pre-paint script inlined in <head> by the root layout (a server component,
// so it must not live in a 'use client' module). Dark is the default; `.dark` on <html> is the single source of truth.
export const THEME_KEY = 'broto-theme'

export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}")==="light"?"light":"dark";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add("dark")}`
