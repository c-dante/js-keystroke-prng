/* Text generation functions for js-keystroke-prng
 * 
 * Author: Chris Federici (cfederic@stevens.edu)
 * 
 * Contents:
 * loadStrToChain(string, new branch chars:string = ".?!"):Void
 * 				Processes string into a markov chain. Strips line breaks.
 *				Ignores all special characters.
 *				new branch chars = characters to see as a new chain. Usuially end of a sentence.
 */

var TEXT_SOURCE = "enter the source text to generate here. Words will be treated as a chain.";
var chain = new Array();
var lastGenStr;

//Parse some text into a chain
function loadStrToChain(string, terminalChars)
{
	var i, data, start, end;
	str = string.toLowerCase();
	data = String(str).split(" ");
	if ( typeof chain['Total_Word_Values'] === "undefined" )
	{
		chain['Total_Word_Values'] = 0;
	}
	
	//str = str.replace(/\W/g, '');
	
	for ( i = 1; i < data.length; i++ )
	{
		start = trim( data[i - 1] );
		end = trim( data[i] );
		if ( typeof chain[start] === "undefined" )
		{
			chain[start] = new Array();
			chain['Total_Word_Values']++;
		}
		
		if ( typeof chain[start]['Total_Word_Values'] === "undefined" )
		{
			chain[start]['Total_Word_Values'] = 0;
		}
		
		if ( typeof chain[start][end] === "undefined" )
		{
			chain[start][end] = 0;
		}
		chain[start]['Total_Word_Values']++;
		chain[start][end]++;
	}
}

//Get a random word.
function getNewWord()
{
	var rnd, value;
	if (typeof chain !== "undefined" && chain['Total_Word_Values'] > 0){
		rnd = Math.floor(Math.random() * chain['Total_Word_Values']);
		value = 0;
		for (var i in chain){
			if (i === 'Total_Word_Values') continue;
			if (value >= rnd) return i;
			value++;
		}
	}
	return -1;
}

//Get the next word from the current.
function getNextWord( seed )
{
	var rnd, value;
	if (typeof chain !== "undefined" && typeof chain[seed] !== "undefined" && chain[seed]['Total_Word_Values'] > 0){
		rnd = Math.floor(Math.random() * chain[seed]['Total_Word_Values']);
		value = 0;
		for (var i in chain[seed]){
			if (i === 'Total_Word_Values') continue;
			if (value >= rnd) return i;
			value += chain[seed][i];
		}
	}
	//Can't find the next word, return -1
	return -1;
}

//Get a body of text.
//seed:string = starting word, use getNewWord to start a chain.
//words:int = number of words to generate
function generateText(seed, words)
{
	var str = seed + " ";
	for (var i = 0, working = seed; i < words; i++){
		working = getNextWord(working);
		if (working === -1){
			working = getNewWord();
		}
		str += working + " ";
	}
	lastGenStr = str;
	return str;
}

loadStrToChain(TEXT_SOURCE);