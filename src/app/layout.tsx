import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/providers/Preloader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

/*
 * Dev-only device diagnostics. Plain ES5 inline script, so it still runs on a
 * phone whose browser can't parse/load the app bundles. Reports failed script
 * loads, JS errors and "React never started" to /api/client-log (printed in the
 * `next dev` terminal) and in a red strip at the bottom of the phone screen.
 */
const DEVICE_DIAGNOSTICS = `(function(){
  var seen={};
  function show(m){var d=document.getElementById('__device_dbg');if(!d){d=document.createElement('div');d.id='__device_dbg';d.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:2147483647;max-height:45vh;overflow:auto;background:#b00020;color:#fff;font:11px/1.4 monospace;padding:6px 8px;white-space:pre-wrap;word-break:break-all';(document.body||document.documentElement).appendChild(d);}d.textContent+=m+'\\n';}
  function send(m,quiet){if(seen[m])return;seen[m]=1;try{var x=new XMLHttpRequest();x.open('POST','/api/client-log',true);x.setRequestHeader('Content-Type','text/plain');x.send(m+'  |  UA: '+navigator.userAgent+'  |  URL: '+location.href);}catch(e){}if(!quiet)show(m);}
  window.addEventListener('error',function(e){var t=e.target;if(t&&t!==window&&(t.tagName==='SCRIPT'||t.tagName==='LINK')){send('LOAD FAILED: '+(t.src||t.href));}else if(e.message){send('JS ERROR: '+e.message+' @ '+(e.filename||'?')+':'+(e.lineno||'?'));}},true);
  window.addEventListener('unhandledrejection',function(e){var r=e.reason;send('PROMISE REJECTED: '+(r&&(r.stack||r.message)||r));});
  setTimeout(function(){var el=document.querySelector('main');var ok=false;if(el){for(var k in el){if(k.indexOf('__react')===0){ok=true;break;}}}
    if(ok){send('OK: React started on this device',true);}else{send('REACT DID NOT START within 12s (app JavaScript never ran on this device)');}},12000);
})();`;

export const metadata: Metadata = {
  title: "eatX by Ygen — Smarter restaurants. Stronger business.",
  description: "The all-in-one operating system for modern restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "development" && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: DEVICE_DIAGNOSTICS }} />
        </head>
      )}
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Preloader>{children}</Preloader>
      </body>
    </html>
  );
}

