function new_full_template(categs) {
	let html = '';
	for(var i=0; i<categs.length; i++) {
		var c = categs[i];
		let always_show = (c.always_show === true ? "alwaysshow" : "hideme");
		html += `
			<div class="card col-6 ${always_show}" id="categ-${i}" data-index="${i}">
				<div class="card-header">${c.name}</div>
					<div class="card-body">
						<table>
						`;
		for(var j=0; j<c.links.length; j++) {
			var l = c.links[j];
			html += `
							<tr class="${always_show}">
								<td>
									<span class="link triggertheclick" id="${l.link}">${l.name}</span>`;
										
			if(l.actions.length > 0) {
				html += '<span style="float:right">';
				for(var k=0; k<l.actions.length; k++) {
					var a = l.actions[k];
					html += `<button id="${a.link}" class="triggertheclick">${a.name}</button>`;	
				}		
				html += '</span>';
			}
			html += `				
								</td>
							</tr>`;
		}			
						
		html += `
						</table>
					</div>
				</div>
			</div>
			`;
	}
	return html;
}
