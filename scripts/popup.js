var data = null;
var links = null;
var color = "red";
var profileId = null;

popupOpen();
function popupOpen() {
	
	chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
		let tab = tabs[0];
		
		if(tab.url.indexOf('shsb1full') != -1) {
			console.log('Loading shsb1full');
			data = shsb1full_categories;
			links = shsb1full_links;
		} else if(tab.url.indexOf('eursb9dev') != -1) {
			console.log('Loading eursb9dev');
			data = eursb9dev_categories;
			links = eursb9dev_links;
			color = "blue"; //ONLY FOR DEV ENV
		} else if(tab.url.indexOf('eursb6pc') != -1) {
			console.log('Loading eursb6pc');
			data = eursb6pc_categories;
			links = eursb6pc_links;
		} else if(tab.url.indexOf('eursb14dev') != -1) {
			console.log('Loading eursb14dev');
			data = eursb14dev_categories;
			links = eursb14dev_links;
		} else if(tab.url.indexOf('eursb16dev') != -1) {
			console.log('Loading eursb16dev');
			data = eursb16dev_categories;
			links = eursb16dev_links;
			
		} else if(tab.url.indexOf('eursb15dp') != -1) {
			console.log('Loading eursb9dev');
			data = eursb9dev_categories;
			links = eursb9dev_links;
			color ="blue"; //ONLYFOR DEV ENV
		} else {
			console.log('Loading eursb9dev');
			data = eursb9dev_categories;
			links = eursb9dev_links;
		}
		
		loadHTML();
	});
}

function loadHTML() {
	let html = new_full_template(data, color)
	document.getElementById("content").innerHTML = html;
	loadEvents();
}



function setTextProfileSelected(id, name) {
	profileId = id;
	document.getElementById("profileSelected").innerHTML = "Profile selected: " + (id == null ? "None" : name + " (" + id + ")");
}


function handle_the_click(e, right_click) {
	let link_id = e.id;
	
	let l = links[link_id];
	let template = templates.get(l.template);
	
	if(l.c_param.length > 0 && l.c_param[0] === '::action') {
		let values = l.l_param[0].split('@');
		chrome.storage.local.set({ivk_profile_id: values[0], ivk_profile_name: values[1]}, function() {
			setTextProfileSelected(values[0], values[1]);
		});
	} else {
		triggerTheLink(l, template, right_click);
	}
}

var handle_right_click = function(e) {
	
	e.preventDefault();
	handle_the_click(this, true);
}
var handle_left_click = function(e) {
	
	e.preventDefault();
	handle_the_click(this, false);
}

function loadEvents() {
	//Not needed when loading different env (eursb9dev, eursb6pc, etc. because it will be loaded anyway
	//window.addEventListener('DOMContentLoaded', () => {
		
		var all_links = document.querySelectorAll(".triggertheclick");
		console.log('Links total : ' + all_links.length);
		for (var i = 0; i < all_links.length; i++) {
			all_links[i].addEventListener('click', handle_left_click, false);
			all_links[i].addEventListener('contextmenu', handle_right_click, false);
		}
		
		document.getElementById('searchbar').addEventListener('input', searchBar, false);
		document.getElementById('searchbar').focus();
		
		
		chrome.storage.local.get(['ivk_profile_id', 'ivk_profile_name'], function(result) {
			setTextProfileSelected(result.ivk_profile_id, result.ivk_profile_name);
		});
	//});
}



function triggerTheLink(link_def, template, newTab) {
	console.log('Link definition:');
	console.log(link_def);
	console.log('Link template:' + template);
	console.log(template);
	
	chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
		var tab = tabs[0];
		
		var splitted_url = tab.url.split('/');
		
		var base_url = splitted_url[2];
		//console.log('Base URL :' + base_url);
		
		var isLightning = (base_url.indexOf(".force.com") != -1);
		
	
		
		//default param is classic param, because if same we read classic parameter only
		let param = link_def.c_param[0];
		let tpl = template.c;
		if(isLightning) {
			if(template.l != null) {
				tpl = template.l;
			}
			if(link_def.l_param.length > 0) {
				param = link_def.l_param[0];
			}
		}
		
		let newUrl = tpl.replace('::1', param).replace('::profile', profileId);
		console.log(newUrl);
		
		var fullURL = (newUrl.startsWith('http') ? newUrl : 'https://' + base_url + newUrl);
		if(newTab) {
			chrome.tabs.create({ url: fullURL });
		} else {
			chrome.tabs.update(tab.id, { url:fullURL });
		}
    });
}



function searchBar() {
	var texte = document.getElementById('searchbar').value.toLowerCase();
	
	/* LOGIC
	- By default : totalLinkOpen = totalLink for always show = true
	- By default : totalLinkOpen = 0 for always show = false
	
	We never touch always show = true, but for the rest
	to be hidden? hide the link & -1 on totalLinkOpen
	to show? show the link & +1 on totalLinkOpen
	
	*/
	//console.log('Text:' + texte);
	if(texte.length >= 2) {
		console.log('Texte : '+ texte);
		
		var all_links = document.querySelectorAll(".link");
		for (var i = 0; i < all_links.length; i++) {
			
			var closestTR = all_links[i].closest('tr');
			var closestCard = closestTR.closest('div.card');
			
			let categ_index = closestCard.dataset.index;
			
			var theContent = all_links[i].textContent.toLowerCase();
			//console.log(theContent);
			if(theContent.indexOf(texte) != -1) {
				if(closestTR.classList.contains('alwaysshow') == false) {
					if(closestTR.classList.contains('hideme') == true) {
						closestTR.classList.remove('hideme');
						data[categ_index].totalLinkOpen ++;
						console.log(data[categ_index].totalLinkOpen + ' <= ' + data[categ_index].totalLink);
					}
				}
				
			} else {
				if(closestTR.classList.contains('alwaysshow') == false) {
					if(closestTR.classList.contains('hideme') == false) {
						closestTR.classList.add('hideme');
						data[categ_index].totalLinkOpen --;
						
						console.log(data[categ_index].totalLinkOpen + ' <= ' + data[categ_index].totalLink);
					}
				}
			}
			
		}
	} else {
		var all_links = document.querySelectorAll(".link");
		for (var i = 0; i < all_links.length; i++) {
			var closestTR = all_links[i].closest('tr');
			var closestCard = closestTR.closest('div.card');
			
			let categ_index = closestCard.dataset.index;
			if(closestTR.classList.contains('alwaysshow') == false) {
				if(closestTR.classList.contains('hideme') == false) {
					closestTR.classList.add('hideme');
					data[categ_index].totalLinkOpen --;
				}
				
			}
		}
	}
	
	for(var i=0; i<data.length; i++) {
		let c = data[i];
		
		if(c.always_show == false) {
			 if(c.totalLinkOpen == 0) {
				document.getElementById("categ-" + i).classList.add('hideme');
			} else {
				document.getElementById("categ-" + i).classList.remove('hideme');
			}
		}
		
	}
}


