
var html = '';

var quick = data.quick;
	
html += tpl_card_open(quick.n);

for(var j=0; j<quick.ls.length; j++) {
	var lk = quick.ls[j];
	html += tpl_link_line_template(lk.n, null, j, true);
}
html += tpl_card_close();
//Objects
html += tpl_card_open('Objects');
for(var i=0; i<data.objects.length; i++) {
	html +=  tpl_object_line(i, 'o', data.objects[i].l, true);
}
html += tpl_card_close();

//Custom settings
html += tpl_card_open('Custom Settings');
for(var i=0; i<data.customSettings.length; i++) {
	html += tpl_object_line(i, 'cs', data.customSettings[i].l, false);
}
html += tpl_card_close();

//Custom metadata
html += tpl_card_open('Custom Metadata');
for(var i=0; i<data.customMetadata.length; i++) {
	html += tpl_object_line(i, 'cm', data.customMetadata[i].l, false);
}
html += tpl_card_close();

//Other links
for(var i=0; i<data.categories.length; i++) {
	var categ = data.categories[i];
	
	html += tpl_card_open(categ.n);
	
	for(var j=0; j<categ.ls.length; j++) {
		var lk = categ.ls[j];
		html += tpl_link_line(lk.n, i, j);
	}
	html += tpl_card_close();
	
}

console.log(html);



document.getElementById("content").innerHTML = html;



function loadEvents() {
	var objects_links = document.querySelectorAll("button");
	for (var i = 0; i < objects_links.length; i++) {
		objects_links[i].addEventListener('click', handle_object_click, false);
		objects_links[i].addEventListener('contextmenu', handle_object_right_click, false);
	}
	var links = document.querySelectorAll(".redirect");
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener('click', handle_click, false);
		links[i].addEventListener('contextmenu', handle_right_click, false);
	}
	document.getElementById('searchbar').addEventListener('input', searchBar, false);
	document.getElementById('searchbar').focus();
}
var handle_right_click = function(e) {
	e.preventDefault();
	handle(this, true);
}
var handle_click = function(e) {
	e.preventDefault();
	handle(this, false);
}
var handle_object_right_click = function(e) {
	e.preventDefault();
	handle_object(this, true);
}
var handle_object_click = function(e) {
	e.preventDefault();
	handle_object(this, false);
}

function handle_object(e, newTab) {
	let link_type = e.getAttribute("data-type");
	let object_type = e.closest('td').getAttribute('data-type');
	let object_index = e.closest('td').getAttribute('data-index');
	
	
	let o = null;
	if(object_type == 'o') {
		o = data.objects[object_index];
	} else if(object_type == 'cs') {
		o = data.customSettings[object_index];
	} else if(object_type == 'cm') {
		o = data.customMetadata[object_index];
	}
	
	console.log(o);
	let theClassicLink = '';
	let theLightningLink = '';
	
	//SHARING LINK
	if(link_type == "s") {
		//Anyway only Custom object has sharing
		theClassicLink += '/p/own/OrgSharingDetail?setupid=SecuritySharing&st=' + o.i;
	} 
	//CONFIG LINK
	else if(link_type == "c") { // c for config
		//CUSTOM SETTING
		if(object_type == 'cs') {
			theLightningLink = '/one/one.app#/alohaRedirect/' + o.i + '?setupid=CustomSettings';
			theClassicLink = '/setup/ui/viewCustomSettings.apexp?setupid=CustomSettings&id=' + o.i;
		} 
		//CUSTOM METADATA
		else if(object_type == 'cm') {
			theClassicLink = '/' + o.i + '?setupid=CustomMetadata';
			theLightningLink = '/lightning/setup/CustomMetadata/page?address=%2F' + o.i + '&setupid=CustomMetadata';
		}
		//CUSTOM OBJECT
		else {
			theLightningLink = '/lightning/setup/ObjectManager/' + o.i + '/view';
			theClassicLink = '/' + o.i + '?setupid=CustomObjects';
		}
	} 
	//DATA LINK
	else { 
		if(object_type == 'cm') {
			theClassicLink = '/' + o.p + '?setupid=CustomMetadata';
			theLightningLink = '/one/one.app#/alohaRedirect/' + o.p + '?setupid=CustomMetadata';//&isdtp=p1';
		} else if(object_type == 'cs') {//custom settings...
			theLightningLink = '/one/one.app#/alohaRedirect/setup/ui/listCustomSettingsData.apexp?id=' + o.p; //+ '&isdtp=p1'
			theClassicLink = '/setup/ui/listCustomSettingsData.apexp?id=' + o.p;
		} else {
			theLightningLink = '/lightning/o/' + o.n + '/home';
			theClassicLink = '/' + o.p + '/o';
		}
		
	}
	
	triggerTheLink(theClassicLink, theLightningLink, newTab);
}

function triggerTheLink(classicLink, lightningLink, newTab) {
	chrome.tabs.getSelected(null, function(tab) {
		var splitted_url = tab.url.split('/');
		
		var base_url = splitted_url[2];
		console.log('Base URL :' + base_url);
		
		var isLightning = (base_url.indexOf(".force.com") != -1);
		
		var newUrl = lightningLink;
		if(!isLightning) {
			newUrl = classicLink;
		}
		
		if(newUrl === '') {
			newUrl = classicLink + lightningLink;
		}
		
		console.log(newUrl);
		
		var fullURL = (newUrl.startsWith('http') ? newUrl : 'https://' + base_url + newUrl);
		if(newTab) {
			chrome.tabs.create({ url: fullURL });
		} else {
			chrome.tabs.update(tab.id, { url:fullURL });
		}
    });
}
function handle(e, newTab) {
	
	var icateg = e.getAttribute("data-icateg");
	let categ = null;
	
	console.log('categ & index');
	console.log(icateg);
	if(icateg == 'null') {
		categ = data.quick;
	} else {
		categ = data.categories[icateg];
	}
	console.log(categ);
	var ilink = e.getAttribute("data-ilink");
	
	console.log(ilink);
	
	let l = categ.ls[ilink];
	console.log(l);
	classic_url = categ.c.replace('::1', (l.c == null || l.c == ''? l.l : l.c));
	lightning_url = categ.l.replace('::1', (l.l == null || l.l == '' ? l.c : l.l));
	
	triggerTheLink(classic_url, lightning_url, newTab);
	
}
function searchBar() {
	var texte = document.getElementById('searchbar').value.toLowerCase();
	
	console.log('Text:' + texte);
	if(texte.length >= 3) {
		var links = document.querySelectorAll(".link");
		for (var i = 0; i < links.length; i++) {
			var theContent = links[i].textContent.toLowerCase();
			
			if(theContent.indexOf(texte) != -1) {
				links[i].closest('tr').classList.remove('hideme');
			} else {
				if(links[i].classList.contains('alwaysshow') == false) {
					
					links[i].closest('tr').classList.add('hideme');
				}
			}
		}
	} else {
		var links = document.querySelectorAll(".link");
		for (var i = 0; i < links.length; i++) {
			if(links[i].classList.contains('alwaysshow') == false) {
				links[i].closest('tr').classList.add('hideme');
			}
		}
	}
}


loadEvents();