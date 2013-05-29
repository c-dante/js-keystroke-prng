/* Utility functions for js-keystroke-prng
 * 
 * Author: Chris Federici (cfederic@stevens.edu)
 * 
 * Contents:
 *
 * trim(string):String
 *				standard string trim. Source (http://blog.stevenlevithan.com/archives/faster-trim-javascript)
 */
 
/* Source: (http://blog.stevenlevithan.com/archives/faster-trim-javascript) */
function trim(str)
{
	var	str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}