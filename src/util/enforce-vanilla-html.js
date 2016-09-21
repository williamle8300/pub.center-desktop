var SanitizeHtml = require('sanitize-html')

module.exports = function (markup) {
	
	var sanitized = SanitizeHtml(markup, {
	  allowedTags: SanitizeHtml.defaults.allowedTags.concat([ 'img' ])
	})
	var stylized = sanitized.replace(/<img\s/gi, '<img style="float: right; clear: both; margin: 0 0 0 1em; width: 33.33%" ')
	
	return stylized
}