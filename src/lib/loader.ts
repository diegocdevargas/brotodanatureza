// Loader "seen this session" key and the pre-paint script inlined in <head> by the root layout. It lives outside
// the 'use client' Loader module on purpose: a server component can't read exports of a client module.
export const LOADER_KEY = 'brota-loader-seen'

export const LOADER_SCRIPT = `try{var k="${LOADER_KEY}",v=sessionStorage.getItem(k),o=sessionStorage.getItem("broto-loader-seen");if(v===null&&o!==null){sessionStorage.setItem(k,o);sessionStorage.removeItem("broto-loader-seen");v=o}if(v)document.documentElement.classList.add("loader-seen")}catch(e){}`
