// Loader "seen this session" key and the pre-paint script inlined in <head> by the root layout. It lives outside
// the 'use client' Loader module on purpose: a server component can't read exports of a client module.
export const LOADER_KEY = 'broto-loader-seen'

export const LOADER_SCRIPT = `try{if(sessionStorage.getItem("${LOADER_KEY}"))document.documentElement.classList.add("loader-seen")}catch(e){}`
