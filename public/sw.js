if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return t[e]||(a=new Promise((async a=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=a}else importScripts(e),a()}))),a.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},a=(a,t)=>{Promise.all(a.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(a)};self.define=(a,i,s)=>{t[a]||(t[a]=Promise.resolve().then((()=>{let t={};const c={uri:location.origin+a.slice(1)};return Promise.all(i.map((a=>{switch(a){case"exports":return t;case"module":return c;default:return e(a)}}))).then((e=>{const a=s(...e);return t.default||(t.default=a),t}))})))}}define("./sw.js",["./workbox-56079563"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/TB6a-j555xp7Qko3_tClx/_buildManifest.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/TB6a-j555xp7Qko3_tClx/_ssgManifest.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/1739-1db5074fd91319883dd0.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/1f855128-d4f07f991c17b871c9fd.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/2186-89a42178b1071f9e64ae.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/2302-a98ac0f1bed6058321cd.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/2655-351e283b7f41efafa9d6.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/3317-0c0bf435579087f46ff9.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/3492-e1e8cf639084a3d5ceb6.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/3614-5cb58f1403df6e2fd979.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/4597-fdff40d42b62830a1e98.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/4859-0e9b67e3c4fcd8453a06.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/4912-313f90483f19af350415.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/5269-b1ffc3a89318163c5ca4.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/5288-e7b3ef4d3ba0c24d0891.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/5386-636d8847458d0b8a29f9.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/633-842dc56ae2f041fb6f6a.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/643-26f289b03a93174e6998.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/750-91d6b6a57e341bc57a98.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/75fc9c18-163fe736d25236810217.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/7862-a3941614a842c446f1bd.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/8075-a7ce0d7bb619d43540d9.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/8363-7346b039ed3ac53bc6ee.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/8481-551a184df341489e7955.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/902-2a1933db2b0e5b207350.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/9149-24b87b45fbfaba5c9d48.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/9633-281e4e6730f980ccc9d8.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/b5f2ed29-bd42b18a6d50b0156499.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/framework-0579e2122d6c72eb0b50.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/main-4bcb9378b0b6ba375da5.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/_app-5e17a462ee440a219ef0.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/_error-c59cc049c61a28f495a8.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/about-603dbe9366a3e68b49d7.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/archive-67ee1f03e95a2e7d9ab2.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/atom.xml-fcb0f6cf8de538f40899.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/categories-6087df31060a95fde32b.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/categories/%5BcategoryName%5D-457b1e9e89668582ac5d.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/donation-0d822d7203c93f1c2256.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/forgot-54734338403bf7c7adab.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/friends-d0bd39eb7d7cdea8107c.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/index-3e0f73a925f79dca58b6.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/login-a5bbe0c2a12d7825304b.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/posts/%5Bpid%5D-550d214630ebeb00c5c7.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/search-01bef1a861b11c094ab0.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/settings/profile-f98381e8bd1cd48ee9fe.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/signup-ef3622747e222ec8b8e7.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/tags-6ce62ef45829eb7ed231.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/tags/%5BtagName%5D-305992d2d87187880475.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/users-ff857824c44d08a57780.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/pages/users/%5Buid%5D-c013f28b9f0baf6ea307.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/polyfills-ec4e5916daa21dfc2df4.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/chunks/webpack-7a67ef058fe4c94d62f4.js",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/124f398fc98eddeae20c.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/171d4f96bb9928e71c76.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/1c2a661667a39870cbcd.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/1d324e7e1e50453a417c.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/46ffd6d14cbc2058e1c5.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/88bb39005b9a5a8cec52.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/8de4a5fa120e8e5f00a3.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/9c6f7e36b23c149e5422.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/9ed974f222df71b92c4d.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/b787f8eb44654e9e986f.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/cfcd157008066c1477d6.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/d6dca4410a3c78f062ff.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/d88a9691adfef7d6dd96.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/dc4de72fad5f20a49959.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/css/df489dea229a0dd4bee2.css",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_AMS-Regular.1436d720bab5540f6042b9dd39f05ee4.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_AMS-Regular.25df3eee39c479c5dbd82a5a27f5c862.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_AMS-Regular.cf3cce94764c737eac33ed35700a6859.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.13c778b4e516e728a883a2f9c1606872.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.48247fb2230012c6f18ccef4c60208bf.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.a918d0d4efa82bcd404428e97b933b25.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.3f5d46fccdabd999330b96fa3754271e.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.4ec4acf1f29004681007c4222285d23e.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.bdf9b837cc72d077e02944e9fcda47e9.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.6e777b1c03b095c759b5885c236f120c.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.dd0877ebec8f48a099708063de2a3af3.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.df40f734ebd7396509f1bded021d8c6b.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.325384968866dbe03ec934c6a000fb1e.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.ce898e4cf9b1d7e7c8ea6e48249d9795.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.d9979391edeea4fc2712a0bee8f1328c.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Bold.8d75a1e6ecd58a4eb9940ede7279c3a2.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Bold.f39f77257d3598b25c4d6de65ca976fa.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Bold.fa009f3b39d732e29b43629e08731367.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.6496af04088456784f0bdeb1b206a834.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.b7ed9854ec19978153f4c43b1e33e555.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.cd9f7de501f4712d8395f408f87d2589.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Italic.477273ae2349c76afee0bda356c3e25f.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Italic.8e740c89602084adfd96dc754e66f654.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Italic.d0f5089f412907de2fd3804f6dec9161.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Regular.1f59b6fa39fdefdd8d5d3c0e6d1a1068.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Regular.94c5cef0897080e2abc2c4016240df28.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Main-Regular.b6fd45af6cc2dd38df466371b3d2ebc5.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.0bbce4d2239847d51ef618510405f213.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.58d4a875a5aab4cfeef8ef3cfe67fef9.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.d3d8666a4632abee40f4414585d92110.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-Italic.4fe95573161da2448789360783f39816.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-Italic.95efd25798405abac123add1b4eeca2d.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Math-Italic.a8101f5976ce6c54168148b48bd5ff52.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.02293ffdf75b14c169db631a51110638.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.219aa2d692ab036bee6adfdebaf2d52b.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.e20da50e1dda67ed7e88c09276a270cc.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.652da4643001144184456ef7faf2015b.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.ab042de625e5f6cb75185a6a53556fc1.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.cd98aad09d106ffeef20b9bb36573f4d.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.39626825863f8ae552747a74f1614406.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.927a3bab5c885b4747e4455e5d944c8a.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.a7167350e99b92f405ae8801435494c3.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Script-Regular.330012c54cab64b6abfd8e861dbe36e7.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Script-Regular.914df03ff7507e9205a4ecd7e0cfea0d.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Script-Regular.ba6b006acc2d150f6bc4c28091c70357.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size1-Regular.4ee32d5b4bd0a456f02cdd89f0a1cfd0.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size1-Regular.6ca578961bf9f8cf4cd915db7048a245.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size1-Regular.c03114ec648cbd34e5226cd53e410ac2.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size2-Regular.1037f625f0d4e4b828b178837918f9ed.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size2-Regular.9ebe93f9fe71c49b7ceda9c93c510155.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size2-Regular.a136fd4c0c02449d27e20d6017d36078.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size3-Regular.5cce6e91e556438f05bc2903c0c0e568.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size3-Regular.a562474e7cb5eaa89d50a4db1e1025db.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size3-Regular.b6c1d32bceb9a905cbb280807caf3215.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size4-Regular.97bb202f822b59c00fa4ed25ce6cb14b.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size4-Regular.9e74796262fa0108b4d0f064d92d4306.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Size4-Regular.cf8982ba6667cc82989a020c8e8749c7.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.bbc3c89c9e69cab89642ddf1150018c2.woff",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.e613fbb875f1961b19acbde0799e684d.woff2",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.ea67dc3c167e3d749122eddf7661d3eb.ttf",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/_next/static/media/cursor.a6b06a2db56d8c6acee4fecdfd9ed0cf.ico",revision:"TB6a-j555xp7Qko3_tClx"},{url:"/cursor.ico",revision:"74bea72fd9e9d93fc39d6a112d93593b"},{url:"/favicon-bak.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/favicon.ico",revision:"00fa7683da7ab779028e2e6dd260edda"},{url:"/icons/icon-128x128.png",revision:"42dc0cb63a62c70769c54f8b5164e1c5"},{url:"/icons/icon-144x144.png",revision:"30bd1b18d2cdd0f100708c4e8febe948"},{url:"/icons/icon-152x152.png",revision:"2140646fbd69b1b09ba390260c116960"},{url:"/icons/icon-16x16.png",revision:"f0ce791ed4e9f5e5728e85d9aeaaeb39"},{url:"/icons/icon-192x192.png",revision:"96ddd2fd0e61be02315fd328b5c67580"},{url:"/icons/icon-32x32.png",revision:"ef521c59a9845e2457e40c71af44d65d"},{url:"/icons/icon-384x384.png",revision:"013ea861c47dab497d0fb064c231a96a"},{url:"/icons/icon-512x512.png",revision:"98e2c57b7888cffafb2133e1cfcc2faa"},{url:"/icons/icon-52x52.png",revision:"d8858d030d6eafc874e58ed902db9ee9"},{url:"/icons/icon-72x72.png",revision:"22373c0f8ff076686ffaa3c3a96078cd"},{url:"/icons/icon-96x96.png",revision:"0634d069d254aacfb6083992aff3b7da"},{url:"/manifest.json",revision:"6fef05fa269e14b43cc31fd02b962159"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:t,state:i})=>"opaqueredirect"===(null==a?void 0:a.type)?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
