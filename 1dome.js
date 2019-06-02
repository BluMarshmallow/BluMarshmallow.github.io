// ---------- CONFIGURATION ----------

// div.innerHTML : {a.innerHTML : a.href}
var sites = {
			"Reddit": {
				"/r/"				: "https://reddit.com",
				"/r/de"				: "https://reddit.com/r/de",				
				"/r/steam"			: "https://reddit.com/r/steam",
				"/r/furry_irl"			: "https://reddit.com/r/furry_irl",
				"/r/windows10"			: "https://reddit.com/r/windows10",
				"/r/hackintosh"			: "https://reddit.com/r/hackintosh",

			},
			"Social": {
				"Twitter"			: "https://twitter.com/",
				"WhatsApp"			: "https://web.whatsapp.com/",
				"Tweetdeck"			: "https://tweetdeck.twitter.com/",
				"Twitter Light"			: "https://mobile.twitter.com",
				
			},
			"Media": {
				"Twitch"			: "https://www.twitch.tv/",
				"Spotify"			: "https://open.spotify.com/browse/featured",
				"Netflix"			: "https://netflix.com/",
				"YouTube"			: "https://www.youtube.com/",
				"Alienware"			: "https://www.alienwarearena.com/",

			},
			"Shopping": { // To find the game ID check the url in the store page or the community page
				"Ebay"				: "https://www.ebay.de/",
				"PayPal"			: "https://paypal.com/",
				"Amazon"			: "https://smile.amazon.de/",
				"Sparkasse"			: "https://www.blsk.de/de/home.html",
				"Humble bundle"			: "https://www.humblebundle.com/",
				
			},
			"Personal": {
				"GMail"				: "https://mail.google.com/mail/u/0/",
				"G-drive"			: "https://www.google.com/drive/",
				"G-Docs"			: "https://docs.google.com/spreadsheets/u/0/",
				"Trashmail"			: "https://www.byom.de/",

				
			},
			"Other": {
				"GitHub"			: "https://github.com/",
				"Tradebot"			: "https://steamcommunity.com/id/TrashDump",
				""				: " ",
				""				: " "
			}
		};

var search = "http://www.ecosia.com/search?q=";                // The search engine
var query  = "q";
// var search = "https://www.reddit.com/r/s";		// The search engine
// var query  = "s";							// The query variable name for the search engine

var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";

// ---------- BUILD PAGE ----------
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	match = new RegExp(regex ? regex : ".", "i");
	gmatches = false; // kinda ugly, rethink
	for (i = 0; i < Object.keys(sites).length; i++) {
		matches = false;
		sn = Object.keys(sites)[i];
		section = document.createElement("div");
		section.id = sn;
		section.innerHTML = sn;
		section.className = "section";
		inner = document.createElement("div");
		for (l = 0; l < Object.keys(sites[sn]).length; l++) {
			ln = Object.keys(sites[sn])[l];
			if (match.test(ln)) {
				link = document.createElement("a");
				link.href = sites[sn][ln];
				link.innerHTML = ln;
				if (!pivotbuffer++ && regex != "") {
					link.className = "selected";
					document.getElementById("action").action = sites[sn][ln];
					document.getElementById("action").children[0].removeAttribute("name");
				}
				inner.appendChild(link);
				matches = true;
				gmatches = true;
				totallinks++;
			}
		}
		section.appendChild(inner);
		matches ? p.appendChild(section) : false;
	}
	if (!gmatches || regex == "") {
		document.getElementById("action").action = search;
		document.getElementById("action").children[0].name = query;
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight+"px";
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 38:
			pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
			matchLinks();
			break;
		case 40:
			pivotmatch = pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
			matchLinks();
			break;
		default:
			break;
	}
}

document.getElementById("action").children[0].onkeypress = function(e) {
	if (e.key == "ArrowDown" || e.key == "ArrowUp") {
		return false;
	}
}

function displayClock() {
	now = new Date();
	clock = (now.getHours() < 10 ? "0"+now.getHours() : now.getHours())+":"
			+(now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes())+":"
			+(now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds());
	document.getElementById("clock").innerHTML = clock;
}

window.onload = matchLinks();
displayClock();
setInterval(displayClock, 1000);
