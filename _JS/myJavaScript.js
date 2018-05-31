//alert("test if i have a syntax error");

//this program is only used on the how it works page
//assigning variables to make the other part nicer to read
var basic = 'The simplest of networks consists of one input layer, a hidden layer, and an output layer. Each layer consists of a number of neurons, which have a number from 0 to 1. Axons connect the nodes so they can interact. Training a network is essential for it to recognize patters in data. Training data consists of an expected output and sometimes input, and the network uses randomness to try to get the output from the input. Loss is the measure of the difference between the output and the expected output.';
var cnn = 'A convolutional neural network is a type of feedforward neural network that applies a convolution to an input, which is an image. A convolution can be thought of as a filter of any size that is applied to each pixel to see how much it fits the filter. A generative adversarial network is a type of convolutional network that can be used to create images similar to the training data. A program for this is HyperGAN, by 255BITS.';
var rnn = 'Feedforward neural networks consider every input as independent, which prevents the network from using context. A recurrent neural network solves this by having feedback loops. A long short term memory network is a type of recurrent network that can both use recent patterns and more broad patterns for the output. LSTMs have successfully been used in translation of languages and speech recognition. Andrej Karpathy made an outstanding blog post on this topic that is in the sources.';
var nen = 'A neuroevolutional network is similar to a feedforward network, but is entirely based on random chance for changes. In order to determine good evolutions from bad evolutions, there needs to be a feedback system, where better traits get better scores. In MarI/O, a program created by Sethbling, the feedback system is how far in the level Mario travels, recorded as fitness. The better traits are bred while the worse traits are eliminated, slowly moving closer to the objective. These kinds of networks have parts of stagnation, and other parts of massive increase of fitness.';

//this function is called when the button is pressed
function choosetype() {
	"use strict";
	var i = document.getElementById("networklist"); //finds the dropdown menu
	//each if statement checks for what item in the list is selected and changes the content with the respective information.
	if (i.selectedIndex === 0) {
		document.getElementById('ANNtype').innerHTML = "The Basics Of Neural Networks";
		document.getElementById('ANNinfo').innerHTML = basic;
		document.getElementById('ANNimage').innerHTML = '<img src="http://cs.bcp.org/cozort/ecs/cozfall17/hackel_bryce/_images/simplenetwork.jpg">';
	}
	if (i.selectedIndex === 1) {
		document.getElementById('ANNtype').innerHTML = "Convolutional Neural Networks";
		document.getElementById('ANNinfo').innerHTML = cnn;
		document.getElementById('ANNimage').innerHTML = '<img src="http://cs.bcp.org/cozort/ecs/cozfall17/hackel_bryce/_images/cnn.jpeg">';
	}
	if (i.selectedIndex === 2) {
		document.getElementById('ANNtype').innerHTML = "Recurrent Neural Networks";
		document.getElementById('ANNinfo').innerHTML = rnn;
		document.getElementById('ANNimage').innerHTML = '<img src="http://cs.bcp.org/cozort/ecs/cozfall17/hackel_bryce/_images/rnnunrolled.png">';
	}
	if (i.selectedIndex === 3) {
		document.getElementById('ANNtype').innerHTML = "Neuroevolutional Network";
		document.getElementById('ANNinfo').innerHTML = nen;
		document.getElementById('ANNimage').innerHTML = '<img src="http://cs.bcp.org/cozort/ecs/cozfall17/hackel_bryce/_images/marLo.jpg">';
	}
}