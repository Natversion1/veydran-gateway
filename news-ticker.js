(() => {
  "use strict";

  const wire = document.getElementById("newsWire");
  const viewport = document.getElementById("newsTickerViewport");
  const runner = document.getElementById("newsTickerRunner");
  const categoryNode = document.getElementById("newsTickerCategory");
  const headlineNode = document.getElementById("newsTickerHeadline");
  const poolCountNode = document.getElementById("newsTickerPoolCount");

  if (!wire || !viewport || !runner || !categoryNode || !headlineNode) return;

  const TARGET_TOTAL = 2400;
  const TARGET_ALIEN = 1000;
  const TARGET_TERRAN = 650;
  const TARGET_FOOD = 750;
  const STORAGE_KEY = "vey_public_news_wire_v1";
  const PX_PER_SECOND = 74;
  const MIN_DURATION = 10500;

  const makeItem = (category, text) => ({ category, text: text.replace(/\s+/g, " ").trim() });

  const specialFood = [
    makeItem("FIELD WATCH", "MEATCASTLES, TICKHILL ADDED TO HIGH-DENSITY BOVINE ARCHITECTURE WATCHLIST"),
    makeItem("FIELD WATCH", "FLINDT'S TORTILLA TRUCK FLAGGED FOR FURTHER FLATTENED-BREAD RESEARCH"),
    makeItem("FIELD WATCH", "TONY'S FISH & CHIPS, MOSBOROUGH SELECTED FOR BATTER-STRUCTURE ANALYSIS"),
    makeItem("FIELD WATCH", "DEATH BY FUDGE ENTERS FOUR-CARDIAC DESSERT OBSERVATION REGISTER"),
    makeItem("FIELD WATCH", "STEAK BITE, ROSSINGTON MARKED FOR PROTEIN FIELD STUDY"),
    makeItem("FIELD WATCH", "TUCKER'S TACOS, MANSFIELD ADDED TO TORTILLA CONTINUITY FILE"),
    makeItem("FIELD WATCH", "LAWNS FARM SHOP, MORTHEN IDENTIFIED AS LOCAL PRODUCE ACQUISITION NODE"),
    makeItem("FIELD WATCH", "LITTLE GREEN CAKE SHED, KILLAMARSH ADDED TO SUGAR-BASED DIPLOMACY TRIAL"),
    makeItem("FIELD WATCH", "THE ORANGE BIRD, SHEFFIELD FLAGGED FOR SOUTH AFRICAN CULINARY RECONNAISSANCE"),
    makeItem("FOOD WATCH", "LEEDS INDEPENDENT FOOD OPERATORS REMAIN UNAWARE THEY ARE UNDER EXTRASOLAR OBSERVATION"),
    makeItem("FOOD WATCH", "MANCHESTER STREET-FOOD SECTOR REPORTS NO PLASMA INCIDENTS FOR THIRD CONSECUTIVE LUNCH"),
    makeItem("FOOD WATCH", "SHEFFIELD BAKERIES CONTINUE PRODUCTION DESPITE LACK OF IMPERIAL LICENSING"),
    makeItem("FOOD WATCH", "YORKSHIRE CHIP SHOPS MAINTAIN STRATEGIC RESERVES OF VINEGAR AND MYSTERY CONFIDENCE"),
    makeItem("FOOD WATCH", "LEEDS TACO OPERATORS REJECT CLAIM TORTILLA IS MERELY BREAD SUBJECTED TO ADMINISTRATIVE PRESSURE"),
    makeItem("FOOD WATCH", "MANCHESTER INDEPENDENT CAFÉS DECLARE FOAM ART NON-ESSENTIAL BUT CONTINUE ANYWAY"),
    makeItem("FOOD WATCH", "DONCASTER PROTEIN VENDORS SHOW NO SIGN OF REDUCING PORTION MASS"),
    makeItem("FOOD WATCH", "SHEFFIELD DESSERT COUNTERS WARN FOUR CARDIAC ORGANS MAY NOT PROVIDE SUFFICIENT CAPACITY")
  ];

  const specialAlien = [
    makeItem("GALACTIC", "VEYDRAN COUNCIL CONFIRMS MEETING COULD HAVE BEEN A THREE-GLYPH MESSAGE"),
    makeItem("GALACTIC", "ZARGATHIAN DIPLOMAT FINED AFTER PARKING CRUISER ACROSS THREE ORBITS"),
    makeItem("GALACTIC", "BROOD-MOTHER RETURNS SMART TOASTER AFTER DISCOVERING IT HAS OPINIONS"),
    makeItem("ALERT", "TEMPORARY MOON RECLASSIFIED AS PERMANENT AFTER ADMINISTRATOR LOSES FORM"),
    makeItem("GALACTIC", "IMPERIAL TRANSPORT OFFICE DENIES WORMHOLE DELAYS ARE CAUSED BY 'WORMHOLE DELAYS'"),
    makeItem("GALACTIC", "LOCAL HIVE WINS APPEAL TO HAVE THURSDAY REMOVED FROM ROTATION"),
    makeItem("GALACTIC", "SANDORIAN PROXY REQUESTS REFUND AFTER REALITY ARRIVES SLIGHTLY USED"),
    makeItem("ALERT", "UNATTENDED PLASMA ORB FOUND HUMMING IN CIVIC CORRIDOR // OWNER ASKED TO COLLECT"),
    makeItem("GALACTIC", "VEYDRAN SCIENTISTS CONFIRM DARK MATTER STILL REFUSES TO COMPLETE SURVEY"),
    makeItem("GALACTIC", "INTERSTELLAR WEATHER OFFICE FORECASTS SCATTERED GRAVITY WITH PATCHES OF EXISTENCE"),
    makeItem("GALACTIC", "CEREMONIAL COMET CANCELLED AFTER FAILING BASIC COMETRY INSPECTION"),
    makeItem("GALACTIC", "IMPERIAL RECORDS LOCATES MISSING CENTURY BEHIND FILING CABINET"),
    makeItem("GALACTIC", "ORBITAL COUNCIL APPROVES SECOND SUN ON CONDITION IT REMAINS QUIET AFTER 22:00"),
    makeItem("GALACTIC", "GARGAZIAN SINGLES PLATFORM INSISTS COMPATIBILITY ALGORITHM HAS ONLY EATEN THREE USERS"),
    makeItem("ALERT", "CIVIC AI ISSUES APOLOGY AFTER ACCIDENTALLY SCHEDULING EVERYONE FOR REASSIGNMENT"),
    makeItem("GALACTIC", "PLANETARY ZOO REMOVES 'DO NOT FEED THE ACCOUNTANTS' SIGN AFTER COMPLAINTS"),
    makeItem("GALACTIC", "QUANTUM LOST PROPERTY OFFICE REPORTS ITEM BOTH CLAIMED AND UNCLAIMED"),
    makeItem("GALACTIC", "EMPEROR'S OFFICE CLARIFIES NEW HAT IS STRATEGIC INFRASTRUCTURE"),
    makeItem("GALACTIC", "SPACEPORT SECURITY CONFISCATES SUSPICIOUSLY CONFIDENT SANDWICH"),
    makeItem("GALACTIC", "VEYDRAN UNIVERSITY AWARDS HONORARY DEGREE TO MACHINE THAT WOULD NOT STOP BEEPING")
  ];

  const specialTerran = [
    makeItem("TERRAN", "HUMANS CONTINUE CALLING FIVE MINUTES 'JUST A SEC' // INVESTIGATION ONGOING"),
    makeItem("TERRAN", "EARTH WEATHER REMAINS AVAILABLE IN FOUR SEASONS PER AFTERNOON"),
    makeItem("TERRAN", "LOCAL TERRAN OBSERVED APOLOGISING TO CHAIR AFTER WALKING INTO IT"),
    makeItem("TERRAN", "HUMAN MEAL DEAL ECONOMY SURVIVES ANOTHER DAY WITHOUT CENTRAL COMMAND"),
    makeItem("TERRAN", "BRITISH CITIZEN SAYS 'CAN'T COMPLAIN' BEFORE COMPLAINING FOR SEVENTEEN MINUTES"),
    makeItem("TERRAN", "ROUNDABOUT SUCCESSFULLY COMPLETED BY DRIVER ON THIRD ORBIT"),
    makeItem("TERRAN", "SELF-CHECKOUT REQUESTS UNEXPECTED ITEM // ITEM REPORTS SAME"),
    makeItem("TERRAN", "TERRAN TRANSPORT NETWORK ANNOUNCES REPLACEMENT BUS FOR REPLACEMENT BUS"),
    makeItem("TERRAN", "HUMAN PLACES KETTLE ON // DIPLOMATIC SITUATION IMMEDIATELY IMPROVES"),
    makeItem("TERRAN", "SHEFFIELD RESIDENT DESCRIBES STEEP HILL AS 'NOT TOO BAD' // MEDICAL TEAM BAFFLED"),
    makeItem("TERRAN", "LEEDS PEDESTRIAN ENTERS SHOP FOR ONE THING // EXITS WITH SEVEN"),
    makeItem("TERRAN", "MANCHESTER CLOUD SYSTEM FORMALLY DENIES KNOWLEDGE OF SUN"),
    makeItem("TERRAN", "YORKSHIRE HUMAN OFFERS 'A BIT OF GRAVY' // DEPLOYS INDUSTRIAL QUANTITY"),
    makeItem("TERRAN", "EARTHLING SAYS 'I'LL BE THERE IN FIVE' FROM LOCATION TWENTY MINUTES AWAY")
  ];

  const alienPlaces = [
    "VALGERDEN", "ZARGATH PRIME", "SANDORIA", "GARGAZIA", "KELDRON-6", "THE NINE MOONS OF VARAK",
    "ORBITAL DISTRICT 44", "TARCULEAN FREEPORT", "THE HELIX COLONIES", "NORVEX STATION", "BROOD SECTOR 12",
    "THE GLASS NEBULA", "VORRIN'S BELT", "CIVIC RING 7", "THE LOWER DIMENSIONAL ANNEX", "KRAAL-THREE",
    "THE EASTERN WORMHOLE AUTHORITY", "PLASMA BASIN 9", "OUTER HABITAT C", "THE ADMINISTRATIVE MOON"
  ];

  const alienSubjects = [
    "CIVIC ENGINEERS", "BROOD ADMINISTRATORS", "ORBITAL INSPECTORS", "IMPERIAL ACCOUNTANTS",
    "TRANSPORT OFFICIALS", "LOCAL HIVE REPRESENTATIVES", "PLASMA TECHNICIANS", "CEREMONIAL OFFICERS",
    "QUANTUM AUDITORS", "PLANETARY SURVEYORS", "WORMHOLE OPERATORS", "ARCHIVE CLERKS",
    "GRAVITY MAINTENANCE CREWS", "PUBLIC MORALE WORKERS", "DIPLOMATIC BIOLOGISTS", "MOON LICENSING STAFF"
  ];

  const alienObjects = [
    "A SELF-AWARE PARKING METER", "THREE UNLICENSED MOONS", "A CEREMONIAL LASER SPOON",
    "AN AGGRESSIVELY POLITE DRONE", "A PARTIALLY DOMESTICATED WORMHOLE", "SEVEN METRES OF OFFICIAL CABLE",
    "AN UNREGISTERED CLONE", "A SUSPICIOUS HAT", "THE WRONG PLANET", "A BOX MARKED 'DEFINITELY NOT BEES'",
    "A TEMPORARY SUN", "AN INCOMPLETE REALITY PERMIT", "A REBELLIOUS LIFT", "A VERY SMALL INVASION FLEET",
    "AN ORBITAL SOFA", "A QUANTUM RECEIPT", "A SENTIENT QUEUE", "A CRATE OF CEREMONIAL DUST"
  ];

  const alienActions = [
    "CONFIRM THEY HAVE SUCCESSFULLY CONTAINED", "DENY RESPONSIBILITY FOR", "REQUEST IMMEDIATE RETURN OF",
    "DECLARE A CONTROLLED ADMINISTRATIVE RESPONSE TO", "ISSUE SEVENTH AND FINAL WARNING ABOUT",
    "APPROVE TEMPORARY OWNERSHIP OF", "OPEN FORMAL CONSULTATION REGARDING", "CLOSE INVESTIGATION INTO",
    "RECLASSIFY", "ASK PUBLIC NOT TO LICK", "REPORT UNEXPLAINED IMPROVEMENT IN", "BEGIN SAFETY REVIEW OF"
  ];

  const alienEnds = [
    "NO CASUALTIES REPORTED, EXCLUDING DIGNITY",
    "PUBLIC ADVISED THIS IS PROBABLY NORMAL",
    "FORM 88-B REMAINS MANDATORY",
    "OFFICIALS SAY THE SITUATION HAS BEEN 'MOSTLY FIXED'",
    "LOCAL GRAVITY UNAFFECTED AT TIME OF FILING",
    "A SECOND COMMITTEE HAS BEEN FORMED",
    "THE FIRST COMMITTEE HAS DISAPPEARED",
    "CITIZENS ASKED TO REMAIN CALM AND CORRECTLY LABELLED",
    "REPAIRS EXPECTED WITHIN THREE TO NINETY ROTATIONS",
    "NO FURTHER QUESTIONS WILL BE ACCEPTED UNTIL LUNCH"
  ];

  const terranPlaces = [
    "SHEFFIELD", "LEEDS", "MANCHESTER", "DONCASTER", "YORK", "ROTHERHAM", "BARNSLEY", "BRADFORD",
    "HUDDERSFIELD", "HALIFAX", "WAKEFIELD", "HARROGATE", "WORKSOP", "MANSFIELD", "DINNINGTON",
    "KILLAMARSH", "TICKHILL", "MOSBOROUGH", "ROSSINGTON", "NORTH ANSTON"
  ];

  const terranObjects = [
    "A TRAFFIC CONE", "A MEAL DEAL", "A SELF-CHECKOUT", "A WEATHER FORECAST", "A PARKING MACHINE",
    "A ROUNDABOUT", "A BUS REPLACEMENT SERVICE", "A KETTLE", "A CRUMPET", "A BIN COLLECTION CALENDAR",
    "AN UMBRELLA", "A SUPERMARKET LOYALTY CARD", "A GARDEN CENTRE", "A QUEUE", "A POTHOLE",
    "A FLAT-PACK WARDROBE", "A TRAIN ANNOUNCEMENT", "A CUP OF TEA", "A PUB QUIZ", "A BOLLARD"
  ];

  const terranBehaviours = [
    "HAS BEEN DESCRIBED AS 'FINE' DESPITE CLEAR EVIDENCE TO THE CONTRARY",
    "IS APPARENTLY NOT A FORMAL GOVERNMENT DEPARTMENT",
    "HAS GENERATED MORE DISCUSSION THAN THE LOCAL BUDGET",
    "REMAINS IN SERVICE AFTER THREE PEOPLE HIT IT",
    "HAS BEEN GIVEN A ONE-STAR REVIEW FOR FOLLOWING INSTRUCTIONS",
    "IS NOW THE SUBJECT OF AN UNNECESSARILY PASSIONATE FACEBOOK THREAD",
    "CONTINUES OPERATING WITHOUT A PLASMA CORE",
    "HAS BEEN MOVED TWO METRES AND DECLARED FIXED",
    "IS BEING WATCHED BY A MAN WITH HIS ARMS FOLDED",
    "HAS CAUSED SOMEONE TO SAY 'WHO DESIGNED THIS?' OUT LOUD",
    "HAS BEEN DECLARED 'A BIT MUCH' BY LOCAL AUTHORITIES",
    "WAS PURCHASED FOR £4.99 AND IS NOW CONSIDERED FAMILY"
  ];

  const foodPlaces = [
    "LEEDS", "MANCHESTER", "SHEFFIELD", "DONCASTER", "YORK", "WAKEFIELD", "HUDDERSFIELD", "HALIFAX",
    "ROTHERHAM", "BARNSLEY", "BRADFORD", "HARROGATE", "MANSFIELD", "WORKSOP", "TICKHILL", "MOSBOROUGH",
    "DINNINGTON", "KILLAMARSH", "ROSSINGTON", "NORTH ANSTON", "MORTHEN", "CHESTERFIELD", "SALFORD", "STOCKPORT"
  ];

  const venueTypes = [
    "INDEPENDENT BAKERY", "TACO TRUCK", "CHIP SHOP", "CAFÉ", "BURGER VAN", "FARM SHOP",
    "PIE SHOP", "NOODLE BAR", "STREET-FOOD STALL", "DELI", "PIZZA KITCHEN", "DESSERT COUNTER",
    "SANDWICH SHOP", "CARVERY", "CAKE SHED", "BBQ COUNTER", "CURRY HOUSE", "DOUGHNUT STALL"
  ];

  const dishes = [
    "BIRRIA TACOS", "FISH AND CHIPS", "BRISKET", "SAUSAGE ROLLS", "STEAK BAKES", "CHIMICHANGAS",
    "BANH MI", "FRIED CHICKEN", "YORKSHIRE PUDDINGS", "BROWNIES", "COOKIE BURGERS", "SCONES",
    "LOADED FRIES", "SMASH BURGERS", "PIES", "NOODLES", "CURRY SAUCE", "PULLED PORK",
    "DOUGHNUTS", "SANDWICHES", "WOOD-FIRED PIZZA", "CHEESECAKE", "BREAKFAST BAPS", "TORTILLAS"
  ];

  const foodEnds = [
    "TRIGGERS SECOND-SAMPLE REQUEST FROM LOCAL VEYDRAN OBSERVER",
    "IS CLASSIFIED AS UNREASONABLY EFFECTIVE TERRAN MORALE TECHNOLOGY",
    "PROMPTS QUESTIONS ABOUT WHY HUMANS HAVE NOT STANDARDISED PORTION SIZE",
    "REMAINS LEGAL DESPITE STRUCTURAL MASS",
    "IS ADDED TO CULTURAL RECONNAISSANCE WATCHLIST",
    "CAUSES FIELD OFFICE TO REQUEST ADDITIONAL NAPKINS",
    "PASSES INITIAL EDIBILITY SCREENING WITH SUSPICIOUS EASE",
    "IS DESCRIBED AS 'TACTICALLY SOUND' BY OFF-WORLD ANALYST",
    "RAISES LOCAL ENDORPHIN LEVELS BEYOND ADMINISTRATIVE GUIDANCE",
    "SURVIVES TRANSPORT TEST BETTER THAN EXPECTED",
    "IS NOW CONSIDERED A POTENTIAL DIPLOMATIC ASSET",
    "PROMPTS RENEWED INVESTIGATION INTO HUMAN DEEP-FRYING HABITS"
  ];

  function unique(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = item.category + "|" + item.text;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function buildAlien() {
    const out = specialAlien.slice();
    let n = 0;
    for (const place of alienPlaces) {
      for (const subject of alienSubjects) {
        for (const object of alienObjects) {
          const action = alienActions[n % alienActions.length];
          const ending = alienEnds[(n * 7 + 3) % alienEnds.length];
          const category = n % 17 === 0 ? "ALERT" : "GALACTIC";
          out.push(makeItem(category, place + " // " + subject + " " + action + " " + object + " // " + ending));
          n += 1;
          if (out.length >= TARGET_ALIEN) return unique(out).slice(0, TARGET_ALIEN);
        }
      }
    }
    return unique(out).slice(0, TARGET_ALIEN);
  }

  function buildTerran() {
    const out = specialTerran.slice();
    let n = 0;
    for (const place of terranPlaces) {
      for (const object of terranObjects) {
        const behaviour = terranBehaviours[(n * 5 + 2) % terranBehaviours.length];
        out.push(makeItem("TERRAN", place + " // " + object + " " + behaviour));
        n += 1;
        const behaviour2 = terranBehaviours[(n * 7 + 5) % terranBehaviours.length];
        out.push(makeItem("TERRAN", "FIELD OBSERVATION // " + place + " HUMAN INTERACTS WITH " + object + " // " + behaviour2));
        n += 1;
        if (out.length >= TARGET_TERRAN) return unique(out).slice(0, TARGET_TERRAN);
      }
    }
    return unique(out).slice(0, TARGET_TERRAN);
  }

  function buildFood() {
    const out = specialFood.slice();
    let n = 0;
    for (const place of foodPlaces) {
      for (const venue of venueTypes) {
        for (let j = 0; j < 3; j += 1) {
          const dish = dishes[(n * 7 + j * 3) % dishes.length];
          const ending = foodEnds[(n * 5 + j) % foodEnds.length];
          const category = n % 11 === 0 ? "FIELD WATCH" : "FOOD WATCH";
          out.push(makeItem(category, place + " " + venue + " REPORTS " + dish + " " + ending));
          n += 1;
          if (out.length >= TARGET_FOOD) return unique(out).slice(0, TARGET_FOOD);
        }
      }
    }
    return unique(out).slice(0, TARGET_FOOD);
  }

  const pool = unique([].concat(buildAlien(), buildTerran(), buildFood())).slice(0, TARGET_TOTAL);
  if (poolCountNode) poolCountNode.textContent = pool.length.toLocaleString("en-GB") + " BULLETINS // NO QUICK REPEATS";

  function mulberry32(seed) {
    return function () {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function shuffledOrder(seed) {
    const random = mulberry32(seed >>> 0);
    const order = Array.from({ length: pool.length }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      const tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
    return order;
  }

  function readState() {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (state && Number.isInteger(state.seed) && Number.isInteger(state.cursor) && state.poolSize === pool.length) {
        return state;
      }
    } catch (_) {}
    return {
      seed: ((Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0),
      cursor: 0,
      poolSize: pool.length
    };
  }

  let state = readState();
  let order = shuffledOrder(state.seed);

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function nextHeadline() {
    if (!pool.length) return makeItem("SYSTEM", "PUBLIC NEWS WIRE TEMPORARILY DEVOID OF GOSSIP");
    if (state.cursor >= order.length) {
      state.seed = (state.seed + 1) >>> 0;
      state.cursor = 0;
      order = shuffledOrder(state.seed);
    }
    const item = pool[order[state.cursor]];
    state.cursor += 1;
    saveState();
    return item;
  }

  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeAnimation = null;
  let fallbackTimer = null;

  function paint(item) {
    categoryNode.textContent = item.category;
    headlineNode.textContent = item.text;
    wire.dataset.category = item.category;
  }

  function runStatic() {
    paint(nextHeadline());
    fallbackTimer = window.setTimeout(runStatic, 12000);
  }

  function runTicker() {
    const item = nextHeadline();
    paint(item);

    if (activeAnimation) activeAnimation.cancel();

    runner.style.transform = "translateX(" + (viewport.clientWidth + 36) + "px)";

    requestAnimationFrame(() => {
      const width = Math.max(280, runner.getBoundingClientRect().width);
      const distance = viewport.clientWidth + width + 100;
      const duration = Math.max(MIN_DURATION, Math.round((distance / PX_PER_SECOND) * 1000));

      activeAnimation = runner.animate(
        [
          { transform: "translateX(" + (viewport.clientWidth + 36) + "px)" },
          { transform: "translateX(" + (-width - 56) + "px)" }
        ],
        { duration, easing: "linear", fill: "forwards" }
      );

      activeAnimation.onfinish = () => {
        window.setTimeout(runTicker, 60);
      };
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (!activeAnimation) return;
    if (document.hidden) activeAnimation.pause();
    else activeAnimation.play();
  });

  if (reducedMotion) runStatic();
  else runTicker();

  window.addEventListener("beforeunload", () => {
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    if (activeAnimation) activeAnimation.cancel();
  });

  console.log("VEYDRAN NEWS WIRE // " + pool.length + " BULLETINS LOADED // SHUFFLED NON-REPEAT QUEUE ACTIVE");
})();
