/**
 * loadCSSCors
 * Create a <style> DOM element whith contents fetched from the provided remote stylesheet uri
 *
 * @param {string} stylesheet_uri
 * @return {Promise} promise resolving to a <style> DOM element
 */
export default function loadCSSCors (stylesheet_uri) {
  return new Promise((resolve, reject) => {
    var _xhr = window.XMLHttpRequest
    var has_cred = false
    try {has_cred = _xhr && ('withCredentials' in (new _xhr()));} catch(e) {}
    if (!has_cred) {
      reject('CORS not supported')
    }
    var xhr = new _xhr()
    xhr.open('GET', stylesheet_uri)
    xhr.onload = function () {
      xhr.onload = xhr.onerror = null
      if (xhr.status < 200 || xhr.status >= 300) {
        reject('style failed to load: ' + stylesheet_uri)
      } else {
        var style_tag = document.createElement('style')
        var styleContent = makeLocalStyleFromRemote(xhr.responseText, stylesheet_uri)
        style_tag.appendChild(document.createTextNode(styleContent))
        // console.log(JSON.stringify(xhr.responseText))
        document.head.appendChild(style_tag)
        resolve(style_tag)
      }
    }
    xhr.onerror = function () {
      xhr.onload = xhr.onerror = null
      reject('XHR CORS CSS fail:' + stylesheet_uri)
    }
    xhr.send()
  })
}

/**
 * makeLocalStyle
 *
 * Convert remote css content to a local version with adjusted hrefs
 *
 * @param {String} remoteStyle
 * @param {String} uri the remote uri of the original CSS content
 * @return {String}
 */
function makeLocalStyleFromRemote (remoteStyle, uri) {
  var domain = uri.slice(0, uri.lastIndexOf('/'))
  return remoteStyle.replace(/url\(('?"?)([^'")]*)'?"?\)/g,
    (match, delim, url) => {
      // only rewrite relative links
      if (url.indexOf('http') === 0) {
        return match
      }
      return `url(${delim}${domain}/${url}${delim})`
    }
  )
}
