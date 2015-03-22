This plugin uses JavaScript and a text input interface to generate a random seed that can then be used to produce a sequence of pseudo random numbers that are strong enough for secure applications.

The method is to use a keyboard and generated text. The client is tasked to type the text while the browser (via JavaScript) records the delay between key presses. These delays are then 'processed to extract a random seed to be used as the input to a pseudo random number generator.

The example application included uses jQuery. The component itself does not depend on jQuery.