/* PRNG for js-keystroke-prng
 * 
 * Author: Chris Federici (cfederic@stevens.edu)
 * 
 * Built according to RFC 3086 (located in /docs)
 *
 * Usage: Call initRNG, supplying an input string with enouh entropy.
 * 		  Now call getBytes( number of bytes to get ),
 *		  which returns a hex-bit string.
 */


/* local vars */
var V = "0x";
var K = "0x";
var hash_length = 160;
var message;
var shaObj;

function initRNG( entropy )
{
	//Set K to be all 0, and V to be all 1.
	for (var i = 0; i < hash_length; i++)
	{
		K += "0";
		V += "1";
	}
	
	//K = HMAC ( K, V | 0x00 | input_entropy )
	//Using Sha1 as the has algo. This should change?
	message = V + '0x00' + entropy;
	K = CryptoJS.HmacSHA1(message, K);
	
	//V = HMAC ( K, V )
	V = CryptoJS.HmacSHA1(K, V);
	
	//K = HMAC ( K, V | 0x01 | input_entropy )
	message = V.toString(CryptoJS.enc.Hex) + "01" + entropy;
	K = CryptoJS.HmacSHA1(K, message);
	
	//V = HMAC ( K, V )
	V = CryptoJS.HmacSHA1(K, V);
}

function getBytes( num )
{
	var out = "";
	
	while (out.length * 4 < num)
	{
		V = CryptoJS.HmacSHA1(K, V);
		out += V.toString(CryptoJS.enc.Hex);
	}
	
	//K = HMAC ( K, V | 0x00 )
	message = V.toString(CryptoJS.enc.Hex) + "00";
	K = CryptoJS.HmacSHA1(K, message);
	
	//V = HMAC ( K, V )
	V = CryptoJS.HmacSHA1(K, V);
	
	return "0x" + out;
}
