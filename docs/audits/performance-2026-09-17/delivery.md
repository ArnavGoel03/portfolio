# Live delivery observations

One public GET per URL, September 17, 2026 (IST). Bytes are actual curl response-body transfer bytes with compression negotiated; request/response headers are excluded. JS/CSS totals cover distinct same-origin script tags, modulepreloads and stylesheets referenced in the HTML. They exclude inline code (already in HTML), dynamic imports, transitive ES-module imports, third-party scripts, images, fonts, video, API calls and browser prefetches. These are partial delivery observations, never a complete page weight or Lighthouse score. Image probes fetch src, not the browser-selected srcset candidate.

| Surface | HTTP | HTML/artifact bytes | Encoding | Referenced JS bytes | CSS bytes |
|---|---:|---:|---|---:|---:|
| [Portfolio Projects](https://arnavgoel.dev/projects) | 200 | 42,125 | gzip | 394,102 | 16,316 |
| [studio](https://quiver.arnavgoel.dev) | 200 | 16,794 | gzip | 272,738 | 13,785 |
| [Relay](https://quiver.arnavgoel.dev/relay) | 200 | 11,111 | gzip | 248,202 | 13,785 |
| [Tend](https://quiver.arnavgoel.dev/tend) | 200 | 10,980 | gzip | 248,202 | 13,785 |
| [buzz](https://buzzcampus.vercel.app) | 200 | 12,297 | gzip | 259,840 | 21,359 |
| [glass-table-games](https://glasstablegames.com) | 200 | 89,660 | identity | 185,211 | 6,050 |
| [Circuit](https://circuit.glasstablegames.com) | 200 | 95,476 | identity | 277,237 | 14,686 |
| [Deal](https://deal.glasstablegames.com) | 200 | 287,609 | identity | 291,438 | 22,210 |
| [Charade](https://charade.glasstablegames.com) | 200 | 95,117 | identity | 256,906 | 15,020 |
| [Lattice](https://lattice.glasstablegames.com) | 200 | 106,387 | identity | 264,985 | 15,151 |
| [Fair play, explained](https://glasstablegames.com/fair-play) | 200 | 59,906 | identity | 177,241 | 6,050 |
| [soma](https://soma.arnavgoel.dev) | 200 | 20,948 | gzip | 187,727 | 8,653 |
| [meshport](https://meshport.vercel.app) | 200 | 6,434 | gzip | 94,441 | 7,458 |
| [links](https://goel-links.vercel.app) | 200 | 10,743 | gzip | 0 | 0 |
| [Portfolio](https://arnavgoel.dev/) | 200 | 33,601 | gzip | 383,354 | 16,316 |
| [The review record](https://yashgoel.vercel.app) | 200 | 113,483 | gzip | 218,882 | 27,684 |
| [Upkeep](https://yashgoel-handyman.vercel.app) | 200 | 90,017 | gzip | 193,004 | 16,619 |
| [Fitout](https://yashgoel-interiors.vercel.app) | 200 | 21,034 | gzip | 187,849 | 21,032 |
| [Larder](https://yashgoel-larder.vercel.app) | 200 | 19,373 | gzip | 317,711 | 19,637 |
| [pitcrew](https://pitcrew-five.vercel.app) | 200 | 20,323 | gzip | 197,692 | 6,476 |
| [meridian](https://region-earth.vercel.app) | 200 | 1,797 | gzip | 8,900 | 3,874 |
| [qbranch](https://q-armoury.vercel.app) | 200 | 8,353 | gzip | 4,795 | 5,586 |
| [cutroom](https://cutroom-one.vercel.app) | 200 | 15,176 | gzip | 193,554 | 9,558 |
| [library-walk](https://library-walk.vercel.app) | 200 | 170,881 | gzip | 255,093 | 0 |
| [syn100-micromobility](https://syn100-micromobility.vercel.app) | 200 | 47,395 | gzip | 14,679 | 26,589 |
| [pidilite-fevicreate](https://pidilite-school-checkin.vercel.app) | 200 | 6,481 | gzip | 180,460 | 8,402 |
| [Fevicryl Art On Sale](https://fevicryl-art-catalog.vercel.app) | 200 | 58,529 | gzip | 205,380 | 9,027 |
| [serenity](https://serenity-pcos.vercel.app) | 200 | 5,834 | gzip | 320,885 | 19,727 |
| [gondilal-saraf](https://gondilalsaraf.com) | 200 | 47,148 | gzip | 491,345 | 21,285 |
| [redbull-youtube-analytics](https://arnavgoel.dev/artifacts/redbull-youtube-executive-summary.pdf) | 200 | 51,411 | identity | 0 | 0 |
| [power-grid-analysis](https://arnavgoel03.github.io/Power-grid-analysis/) | 200 | 16,060 | gzip | 268,512 | 9,099 |
