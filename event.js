// callback function
function onItemClick(info, tab){
	// Inject the content script into the current page
	chrome.tabs.executeScript(null, { file: 'content.js' });
}

// Perform the callback when a message is received from the content script
chrome.runtime.onMessage.addListener(function(message){
	if (message.action == 'submit the form'){
		//message should contain the selected text and url - ensure that this is the correct message
		var url = "data:text/html;charset=utf8,";
		
		function append(key, value){
			var input = document.createElement('textarea');
			input.setAttribute('name', key);
			input.textContent = value;
			form.appendChild(input);
		}
		
		var form = document.createElement('form');
		form.method = 'POST';
		//form.action = 'http://www.cliptext.co/clipr.php';
		form.action = 'http://localhost/cliptext/clipr.php';
		form.style.visibility = "hidden";
		append('url', message.url);
		append('text', message.selectedText);
		url = url + encodeURIComponent(form.outerHTML);
		url = url + encodeURIComponent('<script>document.forms[0].submit();</script>');
		chrome.tabs.create({url: url, active: true});
	}
});

var context = "selection";
var title = "Share with Cliptext!";
var id = chrome.contextMenus.create({"title": title, "contexts": [context], "onclick": onItemClick});