var SanitizeHtml = require('sanitize-html')

module.exports = function (markup) {
	
	var sanitized = SanitizeHtml(markup, {
	  allowedTags: SanitizeHtml.defaults.allowedTags.concat([ 'img' ])
	})
	var stylized = sanitized.replace(/<img\s/gi, '<img style="position: relative; top: 0; max-width: 33.3333%" ')
	
	return stylized
}