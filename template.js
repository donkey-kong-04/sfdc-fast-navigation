function tpl_object_line(index, type, label, hasSharing) {
	let str_hassharing = (hasSharing === true ? '<button data-type="s">Sharing</button>': '');
	return `
	<tr class="hideme">
		<td data-index="${index}" data-type="${type}">
			<span class="link">${label}</span>
			<span style="float:right">
				<button>Data</button>
				<button data-type="c">Config</button>
				${str_hassharing}
			</span>
		</td>
	</tr>
	`;
}
function tpl_link_line_template(label, icateg, ilink, alwaysshow) {
	let str_alwayshow = (alwaysshow === true ? '' : 'hideme');
	return `
	<tr class="${str_alwayshow}">
		<td>
			<span class="link redirect" data-icateg="${icateg}" data-ilink="${ilink}">${label}</span>
		</td>
	</tr>
	`;
}


function tpl_link_line(label, icateg, ilink) {
	return tpl_link_line_template(label, icateg, ilink, false);
}

function tpl_card_open(label) {
	return `
	<div class="card col-6">
		<div class="card-header">${label}</div>
			<div class="card-body">
				<table>
				`;
}

function tpl_card_close() {
	return `
				</table>
			</div>
		</div>
	</div>
	`;
}