"use client";
import Valgomat from "@/components/valgomat";
import ContentCard from "@/components/content-card";
import { useState } from "react";
import Result from "@/components/result";
import Footer from "@/components/footer";

const parties = [
  { name: "Rødt", symbol: "R" },
  { name: "Sosialistisk Venstreparti", symbol: "SV" },
  { name: "Arbeiderpartiet", symbol: "AP" },
  { name: "Senterpartiet", symbol: "SP" },
  { name: "Miljøpartiet De Grønne", symbol: "MDG" },
  { name: "Kristelig Folkeparti", symbol: "KRF" },
  { name: "Venstre", symbol: "V" },
  { name: "Høyre", symbol: "H" },
  { name: "Fremskrittspartiet", symbol: "FRP" },
];

const partyStyles: Record<string, { bg: string; text: string }> = {
  R: { bg: "bg-[#ff2436]", text: "text-white" },
  SV: { bg: "bg-[#ff2a7f]", text: "text-white" },
  AP: { bg: "bg-[#fd4b5a]", text: "text-white" },
  SP: { bg: "bg-[#2eaf6f]", text: "text-white" },
  MDG: { bg: "bg-[#39ca08]", text: "text-white" },
  FRP: { bg: "bg-[#4a08ff]", text: "text-white" },
  H: { bg: "bg-[#006eff]", text: "text-white" },
  V: { bg: "bg-[#045c6c]", text: "text-white" },
  KRF: { bg: "bg-[#f1c526]", text: "text-black" },
};

const partyLinks: Record<string, string> = {
  R: "https://www.roedt.no/politikken",
  SV: "https://www.sv.no/politikken/",
  AP: "https://www.arbeiderpartiet.no/politikken/",
  SP: "https://www.senterpartiet.no/politikk",
  MDG: "https://mdg.no/politikk",
  FRP: "https://www.frp.no/var-politikk",
  H: "https://hoyre.no/politikk/var-politikk/",
  V: "https://www.venstre.no/politikk/venstres-politikk/",
  KRF: "https://krf.no/politikk/",
};

const subjects = [
  "Eksamen og vurdering",
  "Fraværsgrensa",
  "Yrkesfag",
  "Økonomi",
  "Undervisningsinnhold og faglig tilpasning",
  "Skolemiljø",
  "Russetiden",
  "Undervisningsformer",
  "Skolepolitikk",
  "Verdier og mangfold",
];

const assertions: [string, string][] = [
  ["Dagens eksamensordning fungerer ", subjects[0]],
  ["Skriftlig eksamen bør være før 17.mai ", subjects[0]],
  ["Den nye fraværsgrensa er urettferdig ", subjects[1]],
  ["Konsekvensen for lite oppmøte bør være stryk ", subjects[1]],
  ["Det burde være lovfestet læreplasser", subjects[2]],
  ["Bedrifter burde tjene på å ha lærlinger", subjects[2]],
  ["Dagens utstyrsstipend gir nok penger", subjects[3]],
  ["Ungdomsskolen er for teoretisk  ", subjects[4]],
  ["Det burde være mer valgfag på ungdomsskolen", subjects[4]],
  ["Karakteren i orden og adferd burde fjernes", subjects[5]],
  ["Det bør være et mobilforbud på skolen", subjects[5]],
  ["Russetid burde være etter eksamen ", subjects[6]],
  ["Det burde ikke være tiltatt med russegenser på skolen ", subjects[6]],
  ["Lærerne skal ha mer makt i klasserommet ", subjects[5]],
  ["Nivåinndeling over lang tid er positivt", subjects[4]],
  ["Nynorsk burde være et valgfag", subjects[4]],
  ["Skolen burde være leksefri", subjects[7]],
  ["Det bør bli mindre testing og karakterer i skolen enn i dag ", subjects[0]],
  ["Det bør bli flere privatskoler", subjects[8]],
  [
    "Det bør aksepteres at skoler legges ned grunnet lavt elevtall",
    subjects[8],
  ],
  ["Skjermbruk burde reduseres i undervisning", subjects[7]],
  ["Skolen skal få lov til å markere pride", subjects[9]],
  ["Det er bra å inkludere KI inn i undervisningen", subjects[7]],
];

const forAndAgainst = [
  `Dagens eksamensordning i Norge innebærer at elever tilfeldig trekkes ut til eksamen i utvalgte fag, både skriftlig og muntlig, på slutten av ungdomsskolen og videregående. Eksamenskarakterene settes av eksterne sensorer og teller likt med standpunktkarakterene. Eksamensordningen skal teste elevenes individuelle kompetanse uten hjelpemidler utover det som er tillatt.
De som er positive til dagens eksamensordning mener at den er rettferdig fordi alle elever får samme kriterier på tvers av land og skoler, noe som de mener fører til rettferdig sammenligning. De mener at fordi eksamen er anonym via eksterne sensorer så vil det redusere mulighetene for favoritisering 
De som er negative til dagens eksamensordning mener at den prioriterer kunnskapsproduksjon framfor dybdelæring. De mener at dagens eksamen måler hvor godt man husker og gjengir informasjon i stedet for å teste kritisk tenkning, kreativitet eller problemløsning.
Elevorganisasjonen mener at dagens sluttvurdering er uforutsigbar, og hindrer elever i å lære for å lære. 
`,
  `Elevorganisasjonen er skeptiske til eksamen før 17 mai, vi frykter at det kan gå utover undervisningen, men vi mener at eksamensperioden skal være over før russetiden.
`,
  `De som mener dette mener at  fraværsgrensen er urettferdig, fordi den ikke tar hensyn til elever som har gyldige grunner til fravær, som sykdom eller psykiske utfordringer. Den rammer ofte de mest sårbare elevene, skaper unødvendig stress, og fokuserer mer på oppmøte enn faktisk læring.
De som ikke mener dette mener at  Fraværsgrensa er viktig fordi den motiverer elever til å møte opp på skolen, gir læreren et bedre grunnlag for vurdering, og forbereder elevene på arbeidslivet hvor det kreves stabilt oppmøte. I tillegg finnes det allerede unntak for gyldig fravær.
Elevorganisasjonen er kritisk til den nye fraværsgrensen i vgs. Vi mener den vil ramme elever som allerede sliter i skolen og den gjør det vanskeligere å være kronisk syk eller engasjert.
`,
  `Noen mener at konsekvensen for lite oppmøte bør være stryk, fordi oppmøte viser at eleven tar ansvar og deltar aktivt i læringen. Skolen skal også forberede elevene på arbeidslivet, hvor det forventes at man møter opp. Uten oppmøte får læreren heller ikke vurdert hva eleven faktisk kan, og derfor blir stryk en naturlig konsekvens. I tillegg kan en slik regel bidra til et bedre læringsmiljø, fordi det motiverer flere til å møte opp og delta i undervisningen.
Andre mener at det ikke bør automatisk føre til stryk om man har for lite oppmøte, fordi mange elever har gode grunner til fraværet, som sykdom eller psykisk helse, og det blir urettferdig å straffe dem for det. Læring handler heller ikke bare om å være fysisk til stede, og elever kan tilegne seg kunnskap på andre måter. En slik regel kan også skape unødvendig stress for mange elever. I stedet for stryk finnes det bedre løsninger, som tettere oppfølging eller andre krav for å sikre at eleven får vist hva de kan.
Elevorganisasjonen er veldig i mot en stryksanksjon, vi mener at målet med skolen skal være at færrest mulig stryker. Vi ønsker heller bedre oppfølging og et system som hjelper de som havner utenfor 
`,
  `De som er positive til dette mener at det burde være lovfestet læreplasser, fordi alle som tar yrkesfag fortjener å få fullføre utdanningen og ta fagbrev. En garanti for læreplass vil også gjøre yrkesfag mer attraktivt og sikre bedre rekruttering til viktige yrker i fremtiden. I tillegg vil det bidra til mer rettferdighet, slik at ikke tilfeldigheter eller kontakter avgjør om man får læreplass. Samfunnet trenger flere fagarbeidere, og en lovfestet rett kan sikre at flere fullfører og bidrar i arbeidslivet.
De som er negative til dette mener det ikke bør lovfestes læreplasser, fordi det ikke finnes nok relevante læreplasser i alle bransjer, og det kan føre til at elever får dårlige eller irrelevante plasser. Bedrifter må også ha frihet til å velge lærlinger som passer, og en tvungen ordning kan gå utover kvaliteten. I tillegg kan det bli kostbart og krevende for kommuner og staten å skaffe kunstige plasser bare for å oppfylle en lov. Det finnes allerede alternativer som VG3 i skole, som heller kan styrkes.
Elevorganisasjonen mener at alle burde ha fullføringsrett som betyr at alle lærlinger skal få lærlingplass. svaret på dette er ved å lovfeste læreplasser 
`,
  `De som er for dette mener at bedrifter burde tjene på å ha lærlinger, fordi det vil gjøre det mer attraktivt for flere bedrifter å ta inn lærlinger, noe som igjen sikrer flere læreplasser for elevene. Når bedrifter får noe igjen økonomisk, vil de ha større motivasjon til å satse på god opplæring og følge opp lærlingene sine. I tillegg bidrar lærlinger med arbeidskraft, og det er rimelig at bedriftene får kompensasjon for å bruke tid og ressurser på opplæring. På sikt vil dette styrke både næringslivet og fagutdanningen i Norge.
De som er negative til dette mener at det ikke bør være et mål at bedrifter skal tjene direkte på å ha lærlinger, fordi hovedpoenget med ordningen er å gi opplæring, ikke å skaffe billig arbeidskraft. Hvis økonomisk gevinst blir det viktigste, kan det gå utover kvaliteten på opplæringen og gjøre lærlinger mer sårbare. Bedriftene får allerede støtteordninger i dag, og det viktigste bør være at de ønsker å bidra til utdanning og sikre framtidige fagarbeidere, ikke bare tenke på økonomisk gevinst. 
Elevorganisasjonen mener at det burde være lønnsomt for en bedrift på lærlinger. Det fører til flere bedrifter som vil ha lærlinger og i mange tilfeller bedre arbeidsmiljø. 
`,
  `Mange mener at dagens utstyrsstipend gir nok penger fordi det dekker det viktigste av det elevene trenger til skolearbeidet, og det er ment som et bidrag, ikke en full dekning av alt utstyr. Mange skoler tilbyr også utlån av bøker, PC og annet nødvendig utstyr, noe som gjør at behovet for et høyere stipend er mindre. I tillegg får elever med lav inntekt og særskilte behov ofte andre støtteordninger, slik at dagens ordning fungerer for de fleste.
Andre mener at dagens utstyrsstipend gir ikke nok penger fordi utstyr til skole, spesielt på yrkesfag, kan koste langt mer enn det stipendet dekker. Elever må ofte betale for dyrt verktøy, PC-er eller klær selv, noe som skaper store forskjeller mellom dem som har råd og dem som ikke har det. Når utstyr er nødvendig for å gjennomføre opplæringen, burde stipendordningen sørge for at alle har råd til det, uavhengig av bakgrunn.
Elevorganisasjonen mener at hvis den norske skolen skal si at vi har et gratisprinsipp, så er vi nødt til at ingen elever skal måtte bruke penger for få den utdanningen de har rett på. I dag oppnår ikke utstyrstipendet det målet.
`,
  `De som mener dette mener at ungdomsskolen er for teoretisk fordi den legger for stor vekt på skriftlige fag, prøver og teoribasert læring, mens praktiske ferdigheter og variert undervisning ofte blir nedprioritert. Mange elever lærer bedre gjennom praktisk arbeid, og en mer variert skolehverdag kunne gjort flere elever mer motiverte. Dagens teoretiske fokus passer ikke for alle, og kan føre til at mange mister mestringsfølelse og trivsel i skolen.  
de som ikke mener dette mener at ungdomsskolen er ikke for teoretisk fordi det viktigste målet er å gi elevene et solid faglig grunnlag før videregående, der teori er nødvendig for videre studier og arbeidsliv. Praktiske fag finnes allerede i form av valgfag, kroppsøving og kunst og håndverk. I tillegg må skolen sørge for at alle elever får de samme grunnleggende kunnskapene i fag som matte, norsk og engelsk, og dette krever en viss teoretisk undervisning.
Elevorganisasjonen mener at elever på ungdomsskolen får mindre og mindre motivasjon, og fraværet øker. Vi tror svaret på dette problemet er gjennom en mer praktisk og variert skole. Vi kan få inn flere valgfag, påvirke vurderingspraksis og styrke de praktiske estetiske fagene. 
`,
  `De som mener dette mener at det burde være mer valgfag på ungdomsskolen fordi det gir elevene mulighet til å utforske egne interesser, oppleve mer mestring og bli mer motiverte for skolehverdagen. Flere valgfag kan også gjøre skolen mer praktisk og variert, slik at den passer bedre for ulike typer elever. Dette kan bidra til økt trivsel og gi ungdommer en bedre forståelse av hva de vil videre i utdanning og yrkesliv.
De som ikke mener dette mener at det bør ikke nødvendigvis være mer valgfag på ungdomsskolen fordi skolens hovedoppgave er å gi alle et godt faglig grunnlag i de viktigste fagene, som norsk, matte og engelsk. For mange valgfag kan ta tid og ressurser vekk fra dette. I tillegg finnes det allerede noen valgfag i dag, og videregående skole gir større muligheter for spesialisering og fordypning i interesser senere.
Elevorganisasjonen mener at elever på ungdomsskolen får mindre og mindre motivasjon, og fraværet øker. Vi tror svaret på dette problemet er gjennom mer praktisk og variert. Vi kan få inn flere valgfag, påvirke vurderingspraksis og styrke de praktiske estetiske fagene. 
`,
  `Noen mener at karakteren i orden og adferd burde fjernes fordi den ofte oppleves som subjektiv og lite relevant for elevenes faglige utvikling. Slike karakterer kan skape unødvendig stress, spesielt for elever som sliter sosialt eller har utfordringer med psykisk helse. Det finnes allerede andre måter skolen kan følge opp dårlig oppførsel på, uten at det skal påvirke vitnemålet. Skolen bør fokusere på læring, ikke straffe elever for oppførsel med karakterer.
Andre mener at karakteren i orden og adferd bør beholdes fordi den lærer elevene viktige holdninger til ansvar, respekt og samarbeid som er nyttige videre i livet. Den gir også skolen et tydelig verktøy for å signalisere når elever har brutt regler eller ikke oppfyller forventningene. I tillegg kan det være rettferdig at oppførsel påvirker vitnemålet på lik linje med faglige prestasjoner, siden det viser hvordan man fungerer i et fellesskap.
Elevorganisasjonen mener at karakter i orden og adferd ikke er et godt tiltak for et bedre skolemiljø, og karakterene bør derfor utfases. 
`,
  `De som mener dette mener at det bør være et mobilforbud på skolen fordi mobiler stjeler oppmerksomheten fra undervisningen og gjør det vanskeligere for elever å konsentrere seg. Uten mobil i skolehverdagen blir det lettere å fokusere på læring, og det kan bidra til bedre trivsel og mer sosialt samvær i friminuttene. Et forbud kan også redusere mobbing, nettbruk og press knyttet til sosiale medier i skoletiden.
De som ikke mener dette mener at det bør ikke innføres et generelt mobilforbud på skolen fordi mobilen også kan brukes som et nyttig verktøy i undervisningen, for eksempel til oppgaver, informasjonssøk og læringsapper. Elever må lære å håndtere teknologi på en ansvarlig måte, og et totalforbud gir ikke denne muligheten. I tillegg kan det være praktisk at elevene har tilgang til mobil i pauser eller ved behov for å kontakte foreldre.
Elevorganisasjonen mener at det er viktig at elever får være med å bestemme for mobilbruk lokalt og at et forbud kan føre til større usikkerhet og marginalisering for enkelte elever. Vi mener at mobilforbud ikke løser utfordringene med digitalisering 
`,
  `Mange mener at russetiden burde være etter eksamen fordi det gir elevene mulighet til å fokusere fullt på skole og eksamensforberedelser uten å bli forstyrret av festing og distraksjoner. Det skaper et tydeligere skille mellom skole og feiring, noe som kan bidra til bedre resultater og mindre stress for elevene. Når eksamen er over først, kan man feire med god samvittighet uten å bekymre seg for karakterer eller vurderinger.
Andre mener at russetiden ikke trenger å flyttes til etter eksamen fordi den er en viktig tradisjon som markerer slutten på 13 års skolegang, og mange opplever det som en viktig del av fellesskapet. De fleste klarer å kombinere russetid og skole så lenge de prioriterer riktig, og det finnes allerede regler som hindrer at russeaktiviteter forstyrrer undervisningen for mye. Å flytte russetiden kan også føre til at feiringen mister noe av sin mening og tradisjonelle plassering i skoleåret.
Elevorganisasjonen mener at eksamensperioden skal være over før russetiden 
`,
  `De som mener dette mener at det burde ikke være tillatt med russegenser på skolen fordi det kan skape utenforskap blant elever som ikke er russ, eller som ikke ønsker å delta i russefeiringen. Russeklær kan også bidra til å forsterke forskjeller mellom elever og føre til et dårligere skolemiljø, særlig hvis det kobles til festkultur, drikkepress og uheldig oppførsel. Skolen bør være et sted for fellesskap, læring og inkludering, ikke for å markere hvem som er en del av russetiden.
De som ikke mener dette mener at det bør være tillatt med russegenser på skolen fordi det er en viktig tradisjon for mange, og handler om tilhørighet, feiring og samhold etter mange års skolegang. Et forbud vil kunne oppleves som unødvendig strengt og gå utover elevers frihet til å uttrykke seg. Det er mulig å ha russeklær på en respektfull måte uten at det går utover miljøet eller undervisningen, og det er viktigere å jobbe med holdninger enn å forby klær.
Elevorganisasjonen mener at å forby bruk av russeklær i skoletiden er et dårlig virkemiddel for en mer inkluderende russetid 
`,
  `Noen mener at lærerne skal ha mer makt i klasserommet fordi det gir dem bedre mulighet til å skape ro, trygghet og struktur, noe som er avgjørende for elevenes læring. Med tydeligere autoritet kan lærerne lettere håndtere uro og forstyrrelser, og sikre at undervisningstiden brukes effektivt. Dette kan bidra til et bedre læringsmiljø for alle, der elevene vet hva som forventes og hvilke regler som gjelder.
Andre mener at lærerne ikke bør få mer makt i klasserommet fordi det kan føre til mindre medbestemmelse og svekke relasjonen mellom elever og lærere. Et godt læringsmiljø bygges på tillit, samarbeid og dialog, ikke bare autoritet. Økt makt til lærerne kan også føre til mer bruk av sanksjoner fremfor å finne gode løsninger sammen med elevene, og kan gjøre at enkelte elever opplever mindre trygghet og medvirkning i skolehverdagen
Elevorganisasjonen mener at lærere allerede har naturlig mye makt i klasserommet, og at et sterkt fokus på å gi dem enda mer makt kan føre til maktmisbruk.
`,
  `De som mener dette mener at nivåinndeling over lang tid er positivt fordi det gir elevene undervisning som er bedre tilpasset deres ferdigheter og tempo. Elever som trenger ekstra utfordringer, får det, mens de som trenger mer tid, får undervisning på sitt nivå. Dette kan øke motivasjonen, bidra til bedre læringsutbytte og hindre at noen faller fra fordi undervisningen går for fort eller for sakte. På den måten får alle større utbytte av skolegangen.
De som ikke mener dette mener at nivåinndeling over lang tid kan være negativt fordi det lett skaper A- og B-lag i skolen, som kan forsterke forskjeller mellom elever og svekke fellesskapet. Elever utvikler seg i ulikt tempo, og tidlig nivåinndeling kan låse dem til et nivå de egentlig kunne vokst ut av. Det kan også påvirke elevenes selvbilde negativt, særlig for dem som hele tiden havner på de laveste nivåene. Skolen bør heller legge til rette for tilpasset undervisning i et felles læringsmiljø.
Elevorganisasjonen mener at nivåinndeling over lang tid kan føre til stigmatisering og svekke felleskapsfølelsen i skolen 
`,
  `Noen mener at nynorsk burde være et valgfag fordi mange elever opplever det som unødvendig å lære to nesten like språk, og de har liten nytte av det i hverdagen. Et valgfag ville gjort det mer motiverende for dem som faktisk er interessert, i stedet for å tvinge alle til å bruke tid på det. I en tid hvor engelsk er langt viktigere for de fleste, bør elevene heller få velge fag som oppleves mer relevant for deres utdanning og framtid.
Andre mener at nynorsk bør ikke være et valgfag fordi det er en viktig del av norsk kultur, identitet og språkfellesskap. Det sikrer at begge målformer lever videre, og gir respekt for det språklige mangfoldet i landet. Å lære nynorsk handler også om å forstå andre mennesker og deler av Norge bedre. Å gjøre det valgfritt kan føre til at færre lærer det, noe som på sikt kan true nynorsk som skriftspråk.
Elevorganisasjonen mener at sidemål kan være et valgfag på videregående 
`,
  `Noen mener at skolen burde være leksefri fordi lekser kan skape unødvendig stress og press på elever, og forsterke forskjeller mellom dem som får hjelp hjemme og dem som ikke gjør det. En leksefri skole gir alle like muligheter til å lære på skolen, og sørger for at fritiden kan brukes til hvile, venner og fritidsaktiviteter. Forskning viser også at lekser ikke nødvendigvis fører til bedre læring, og at elevene heller trenger god undervisning i skoletiden.
Andre mener at skolen bør ikke være leksefri fordi lekser gir viktig mulighet til å øve, repetere og fordype seg i det man har lært. Lekser lærer også elevene å ta ansvar, jobbe selvstendig og disponere tiden sin, noe som forbereder dem på videre utdanning og arbeidsliv. I tillegg kan lekser bidra til bedre samarbeid mellom hjem og skole, og gi foreldre innblikk i hva barna jobber med.
Elevorganisasjonen mener bruken av lekser må fases ut fordi egne lekser kan skape utenforskap, konflikter og forstyrre fellesskapet. I stedet bør det legges til rette for at elever lærer det de skal på skolen. 
`,
  `Noen mener at det bør bli mindre testing og karakterer i skolen fordi det kan skape unødvendig stress, press og prestasjonsangst blant elever. Når fokuset ligger for mye på prøver og karakterer, kan det gå utover motivasjonen og lysten til å lære. Mindre testing gir rom for mer variert undervisning, kreativitet og læring i praksis, og elevene kan utvikle ferdigheter uten å være redde for å gjøre feil.
Andre mener at det bør ikke være mindre testing og karakterer i skolen fordi det gir både elever, lærere og foreldre en tydelig tilbakemelding på hvordan elevene ligger an faglig. Testing og vurdering gir også motivasjon til å jobbe jevnt og målrettet, og forbereder elevene på videre utdanning der vurderinger er en naturlig del. Uten vurderinger kan det bli vanskeligere å sikre at alle faktisk tilegner seg nødvendig kunnskap og ferdigheter.
Elevorganisasjonen mener at det er for mye testing og karakterer i skolen i dag, vi mener at det skal være et fokus på læring, ikke rangering av elever. 
`,
  `Mange mener at det bør bli flere privatskoler fordi det gir familier og elever større valgfrihet til å velge en skole som passer deres behov, interesser eller verdier bedre enn den offentlige skolen. Flere privatskoler kan også føre til økt konkurranse, som kan motivere både offentlige og private skoler til å heve kvaliteten. For noen elever kan spesialiserte privatskoler gi et bedre tilbud, for eksempel innen idrett, kunst eller alternative pedagogiske retninger.
Andre mener at det bør ikke bli flere privatskoler fordi det kan føre til større forskjeller mellom elever og svekke fellesskolen, der alle skal ha like muligheter uansett bakgrunn. Privatskoler trekker ofte ressurser og engasjement bort fra den offentlige skolen, og kan føre til et mer delt samfunn der noen får bedre tilbud enn andre. I stedet bør vi satse på å gjøre den offentlige skolen best mulig for alle, fremfor å åpne for mer privatisering.
Elevorganisasjonen mener at privatskoler kan føre til økt segregering og forskjeller i skolesystemet. Vi ønsker å sikre en god fellesskole. 
`,
  `Mange mener at det bør aksepteres at skoler legges ned grunnet lavt elevtall fordi det kan være unødvendig dyrt å opprettholde små skoler med få elever. Ressursene kan heller brukes på å styrke tilbudet ved større skoler med flere fag, bedre utstyr og mer variert undervisning. Nedleggelse kan også gi elevene et større sosialt miljø, flere venner og flere muligheter både faglig og sosialt.
Andre mener at det ikke bør aksepteres at skoler legges ned kun på grunn av lavt elevtall, fordi nærskolen er viktig for barn og lokalsamfunn. Lange skoleveier kan gå utover elevenes trivsel, læring og fritid, og skolen har ofte en viktig rolle i å opprettholde levende bygder. Små skoler kan gi et trygt og tett læringsmiljø, og kvaliteten på undervisningen handler ikke bare om størrelse, men også om trygghet og tilhørighet.
Elevorganisasjonen mener at alle elever, uansett hvor de bor, skal ha lik rett til god utdanning. Når små skoler i distriktene legges ned kan dette føre til lange reiseveier, som igjen kan gå utover elevenes trivsel, læring og fritid. Elevorganisasjonen aksepterer ikke at skoler legges ned på grunn av lavt elevtall. Vi mener at slike beslutninger må vurderes nøye, med utgangspunkt i elevenes beste, og ikke bare økonomiske hensyn.
`,
  `Mange mener at når elever bruker skjermer mindre, får de mer direkte interaksjon med medelever og lærere. Dette kan styrke sosiale ferdigheter og samarbeid som er viktig for både faglig og personlig utvikling.
Andre mener at teknologi er en stor del av arbeidslivet i dag. Ved å bruke skjermer og digitale verktøy i undervisningen, forbedres elevene bedre på de ferdighetene de vil møte i fremtidens arbeidsmarked. 
Elevorganisasjonen mener at skjermbruk skal være et supplement til tradisjonelle læringsmetoder, ikke erstatte dem. Vi fremmer ideen om at digitale verktøy kan være nyttige for lærling, men at det ikke bør være en overordnet strategi i klasserommet. Elevene skal ikke være bundet til skjermen hele skolegangen.
`,
  `Mange mener at pridemarkering signaliserer at alle elever er velkomne uansett seksuell orientering eller kjønnsidentitet. Det skaper et tryggere miljø, spesielt for LHBTQ elever. Dette øker også åpenhet og samtale rundt mangfold og likeverd bidrar til økt toleranse samt forståelse blant elever.
Andre mener at noen ser pride som en politisk bevegelse, og mener at skolen skal være politisk nøytral. Mange frykter også at pride markeringen kan oppfattes som indoktrinering heller enn informasjon og refleksjon. Mange foreldre mener også at markering av Pride bryter med deres religiøse eller moralske overbevisning. 
Elevorganisasjonen mener at alle elever, uansett kjønn, seksualitet eller identitet, skal føle seg trygge og inkludert på skolen. Å markere Pride er en måte å vise støtte til skeive elever og si tydelig i fra at diskriminering og mobbing ikke aksepteres. Elevorganisasjonen ser ikke Pride som partipolitisk, men som en markering for likestilling og menneskerettigheter - verdier skolen allerede er forpliktet til å fremme gjennom opplæringsloven og læreplanen.
`,
  `Noen mener at KI kan tilpasse oppgaver og forklaringer etter elevenes nivå og behov, slik at alle får lære i sitt eget tempo. Med KI- verktøy kan elever få umiddelbare tilbakemeldinger, noe som hjelper dem å lære raskere og forstå egne feil. Elever kan bruke KI som hjelp til lekser eller å forstå vanskelige temaer uten å være avhengig av læreren.
Andre mener at elever kan bruke KI til å skrive oppgaver og gjøre prøven uten å lære stoffet selv, noe som svekker læringsutbyttet. Hvis elevene bare stoler på svarene fra KI uten å tenke selv, kan det hindre utviklingen av egne refleksjoner og vurderingsevne.
Elevorganisasjonen mener KI kan bidra til at undervisningen i større grad tilpasses den enkelte elevs nivå og behov, slik at flere kan lære på sin egen måte. Elevorganisasjonen er også opptatt at ikke bare noen elever eller skoler skal få tilgang til gode KI- verktøy. Det må være lik tilgang for alle. 
`,
];

const opinions = [
  [-2, -2, 2, -2, 2, 1, -2, 2, 2, 2, 1, 1, -2, 1, -2, 1, 2, 2, -2, -2, 1, 2, 1], //R
  [
    -2, -1, 1, -1, 2, 1, -2, 2, 2, 2, 1, 1, -2, -1, -2, -2, 2, -2, -2, -1, 1, 2,
    1,
  ], //SV
  [-1, 2, -2, 1, 1, 1, 1, 1, 2, -2, 2, 2, 1, 2, -1, 1, -1, -1, -2, 1, 1, 2, -1], //AP
  [
    -1, 2, 1, -1, 1, 2, -2, 2, 2, -1, 1, 2, -1, 2, -2, -2, -1, 2, -1, -2, 1, 2,
    1,
  ], //SP
  [
    -1, -1, -2, -1, 2, 1, -1, 2, 2, 2, 1, -1, -1, 1, -1, -1, 1, 2, -1, -2, 2, 1,
    1,
  ], //MDG
  [1, 1, 1, 1, 2, -1, 1, 1, 1, -2, 2, 2, -1, 1, -1, -1, -1, 1, 2, -1, 2, -2, 1], //KRF
  [
    -1, -2, 1, -2, -1, -2, -1, 1, 1, 1, 1, -1, -2, 1, 1, -2, -1, -1, 1, -1, -2,
    2, 2,
  ], //V
  [
    -1, -1, -1, 2, -1, 1, -1, 2, -2, -2, 1, 2, -2, 2, 1, -2, -2, -1, 2, 2, 1, 2,
    1,
  ], //H
  [
    1, -2, -2, 1, -2, 2, -2, 2, 2, -2, 2, 2, -2, 2, 2, 2, -2, -2, 2, -2, 2, 1,
    -1,
  ], //FRP
];

export default function Home() {
  const [userAnswers, setUserAnswers] = useState<(number | undefined)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <main className="bg-[#ffefec] pt-10 max-w-screen h-full min-h-screen">
        <div className="w-full flex justify-center mt-8 mb-12">
          <div className="flex flex-col items-center">
            <a href="https://elev.no">
              <img
                src="/eo-nasjonalt.svg"
                alt="Globe"
                className="w-[250px] h-auto"
              />
            </a>
          </div>
        </div>

        {!submitted ? (
          <Valgomat
            parties={parties}
            partyStyles={partyStyles}
            assertions={assertions}
            forAndAgainst={forAndAgainst}
            opinions={opinions}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            onSubmit={() => setSubmitted(true)}
          />
        ) : (
          <Result
            parties={parties}
            partyStyles={partyStyles}
            partyLinks={partyLinks}
            assertions={assertions}
            forAndAgainst={forAndAgainst}
            opinions={opinions}
            userAnswers={userAnswers}
          />
        )}

        <div className="w-full flex justify-center mt-10">
          <ContentCard className="mb-[100]">
            <h1 className="font-semibold text-xl text-black">
              Om valgomaten vår
            </h1>
            <p className="font-regular text-black mt-5">
              Dette er en valgomat utviklet av Elevorganisasjonen som er laget
              for å hjelpe deg å finne ut hvilke partier som passer best med
              dine meninger om utdanningspolitikk. Du vil bli presentert for
              påstander, og du kan velge hvor enig eller uenig du er med dem.
              Basert på dine svar vil valgomaten vise hvilke partier du er mest
              enig med.
            </p>
            <p className="font-regular text-black mt-5">
              Ikke alle partiene har svart oss med hvor enig / uenig de er i
              ulike påstander. Da har vi prøvd å finne ut hvor enige de er med å
              se i partiprogrammene, hva de legger ut og hvilken politikk de
              praktiserer.
            </p>
            <p className="font-regular text-black mt-5">
              Godt valg!
            </p>
          </ContentCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
