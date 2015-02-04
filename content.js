// Send a message containing the selected text and page url back to the event (background) page
chrome.runtime.sendMessage({
	'action': 'submit the form',
	'url': window.location.href,
	'selectedText': window.getSelection().toString()
});