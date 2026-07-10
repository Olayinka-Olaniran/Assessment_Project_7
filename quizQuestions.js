 const QuizQuestions = {
	html: [
		{
			id: 1,
			question: "What does HTML stand for?",
			options: {
					a: "Hyper Text Markup Language",
					b: "High Text Markup Language",
					c: "Home Tool Markup Language",
					d: "Hyperlink and Text Markup Language"
				},
            correctMsg: "Correct ✓: Hyper Text Markup Language is the standard markup language for documents designed to be displayed in a web browser.",
            incorrectMsg: "Incorrect X: 'Home' or 'Hyperlink' don't quite fit. HTML stands for Hyper Text Markup Language."
		},
		{
			id: 2,
			question: "Who is making the Web standards?",
			options: {
				a: "Mozilla",
				b: "The World Wide Web Consortium (W3C)",
				c: "Google",
				d: "Microsoft"
			},
			correctMsg: "Correct ✓: The W3C oversees international community web standards.",
			incorrectMsg: "Incorrect X: Mozilla, Google, and Microsoft build browsers, but they do not maintain the official web standards."
		},
		{
			id: 3,
			question: "Choose the correct HTML element for the largest heading:",
			options: {
				a: "<h6>",
				b: "<heading>",
				c: "<h1>",
				d: "<head>"
			},
			correctMsg: "Correct ✓: <h1> defines the most important and visually largest heading level.",
			incorrectMsg: "Incorrect X: Remember that heading tags go down in structural scale from h1 down to h6."
		},
		{
			id: 4,
			question: "What is the correct HTML element for inserting a line break?",
			options: {
				a: "<br>",
				b: "<lb>",
				c: "<break>",
				d: "<hr>"
			},
			correctMsg: "Correct ✓: <br> is an empty tag used to produce a single line break break.",
			incorrectMsg: "Incorrect X: <break> is not valid HTML, and <hr> creates a horizontal line divider rule instead."
		},
		{
			id: 5,
			question: "What is the correct HTML for creating a hyperlink?",
			options: {
				a: "<a>http://google.com</a>",
				b: "<a href=\"http://google.com\">Google</a>",
				c: "<a url=\"http://google.com\">Google</a>",
				d: "<href>http://google.com</href>"
			},
			correctMsg: "Correct ✓: The href attribute specifies the anchor link's destination address.",
			incorrectMsg: "Incorrect X: Anchor tags must explicitly use the 'href' attribute to direct traffic."
		},
		{
			id: 6,
			question: "Which character is used to indicate an end tag?",
			options: {
				a: "<",
				b: "*",
				c: "^",
				d: "/"
			},
			correctMsg: "Correct ✓: The forward slash right after the opening bracket closing tags.",
			incorrectMsg: "Incorrect X: An end tag must always lead its body contents with a forward slash symbol."
		},
		{
			id: 7,
			question: "How can you make a numbered list?",
			options: {
				a: "<ul>",
				b: "<list>",
				c: "<ol>",
				d: "<dl>"
			},
			correctMsg: "Correct ✓: <ol> stands for Ordered List, which natively numbers its structural components.",
			incorrectMsg: "Incorrect X: Unordered lists <ul> generate standard bullet points instead of numbers."
		},
		{
			id: 8,
			question: "How can you make a bulleted list?",
			options: {
				a: "<ol>",
				b: "<ul>",
				c: "<list>",
				d: "<bl>"
			},
			correctMsg: "Correct ✓: <ul> stands for Unordered List, which generates bullet items.",
			incorrectMsg: "Incorrect X: Numbers are created using <ol>. There is no <bl> element tag in HTML specs."
		},
		{
			id: 9,
			question: "What is the correct HTML for inserting an image?",
			options: {
				a: "<img src=\"image.gif\" alt=\"MyImage\">",
				b: "<image src=\"image.gif\" alt=\"MyImage\">",
				c: "<img href=\"image.gif\" alt=\"MyImage\">",
				d: "<img url=\"image.gif\">"
			},
			correctMsg: "Correct ✓: The <img> tag relies on the 'src' parameter to correctly point to asset links.",
			incorrectMsg: "Incorrect X: HTML images utilize abbreviated <img> elements referencing asset links with 'src'."
		},
		{
			id: 10,
			question: "Which HTML element defines navigation links?",
			options: {
				a: "<navigate>",
				b: "<nav>",
				c: "<navbar>",
				d: "<links>"
			},
			correctMsg: "Correct ✓: <nav> is a semantic HTML element designated specifically for website navigation blocks.",
			incorrectMsg: "Incorrect X: The full terms 'navigate' and 'navbar' are developer slang terms, not valid elements."
		}
	],
    htmlAnswers: ["a", "b", "c", "a", "b", "d", "c", "b", "a", "b"],

	css: [
		{
				id: 1,
				question: "What does CSS stand for?",
				options: {
					a: "Creative Style Sheets",
					b: "Computer Style Sheets",
					c: "Cascading Style Sheets",
					d: "Colorful Style Sheets"
				},
				correctMsg: "Correct ✓: Cascading Style Sheets defines how layout assets appear in structured documents.",
				incorrectMsg: "Incorrect X: Creative or Computer don't apply here. CSS stands for Cascading Style Sheets."
			},
			{
				id: 2,
				question: "What is the correct HTML for referring to an external style sheet?",
				options: {
					a: "<stylesheet>mystyle.css</stylesheet>",
					b: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
					c: "<style src=\"mystyle.css\">",
					d: "<style href=\"mystyle.css\">"
				},
				correctMsg: "Correct ✓: External references use a self-closing <link> element targeting reference documents.",
				incorrectMsg: "Incorrect X: External target configurations belong inside modern <link> elements, not scoped <style> markers."
			},
			{
				id: 3,
				question: "Where in an HTML document is the correct place to refer to an external style sheet?",
				options: {
					a: "In the <body> section",
					b: "At the end of the document",
					c: "In the <head> section",
					d: "Inside the <html> element root"
				},
				correctMsg: "Correct ✓: The head contains metadata, style directives, and asset relations for rendering pipelines.",
				incorrectMsg: "Incorrect X: Putting styles elsewhere delays paint operations. Keep them inside the <head> elements."
			},
			{
				id: 4,
				question: "Which HTML tag is used to define an internal style sheet?",
				options: {
					a: "<script>",
					b: "<style>",
					c: "<css>",
					d: "<design>"
				},
				correctMsg: "Correct ✓: Emitting structural updates inside direct documents requires declaring raw <style> blocks.",
				incorrectMsg: "Incorrect X: Scripts manage script files, while explicit styles require <style> element containers."
			},
			{
				id: 5,
				question: "Which HTML attribute is used to define inline styles?",
				options: {
					a: "styles",
					b: "class",
					c: "font",
					d: "style"
				},
				correctMsg: "Correct ✓: Adding inline definitions to an element directly is done via the singular style attribute.",
				incorrectMsg: "Incorrect X: The plural 'styles' attribute is invalid; targeting localized updates uses the 'style' attribute."
			},
			{
				id: 6,
				question: "Which CSS property is used to change the background color?",
				options: {
					a: "color",
					b: "background-color",
					c: "bgcolor",
					d: "surface-color"
				},
				correctMsg: "Correct ✓: Modifications on element container fills are handled by the background-color parameter.",
				incorrectMsg: "Incorrect X: The color rule is scoped to content typography text values, not element backdrops."
			},
			{
				id: 7,
				question: "How do you add a background color for all <h1> elements?",
				options: {
					a: "h1 {background-color:#FFFFFF;}",
					b: "h1.all {background-color:#FFFFFF;}",
					c: "all.h1 {background-color:#FFFFFF;}",
					d: "h1 {bg:#FFFFFF;}"
				},
				correctMsg: "Correct ✓: Directly declaring rule blocks targeting raw elements applies styles to all matches globally.",
				incorrectMsg: "Incorrect X: Class modifications like '.all' are required only when targeting custom developer elements."
			},
			{
				id: 8,
				question: "Which CSS property is used to change the text color of an element?",
				options: {
					a: "text-color",
					b: "fg-color",
					c: "font-color",
					d: "color"
				},
				correctMsg: "Correct ✓: Text-based fill assignments use the foundational CSS property 'color'.",
				incorrectMsg: "Incorrect X: Properties like 'font-color' or 'text-color' do not exist in official CSS specs."
			},
			{
				id: 9,
				question: "Which CSS property controls the text size?",
				options: {
					a: "font-style",
					b: "text-size",
					c: "font-size",
					d: "text-style"
				},
				correctMsg: "Correct ✓: Controlling typographic rendering size parameters is designated to font-size updates.",
				incorrectMsg: "Incorrect X: Layout elements rely explicitly on the font-size keyword rule to alter typography sizing scales."
			},
			{
				id: 10,
				question: "How do you display hyperlinks without an underline?",
				options: {
					a: "a {text-decoration:none;}",
					b: "a {underline:none;}",
					c: "a {text-decoration:no-underline;}",
					d: "a {text-style:none;}"
				},
				correctMsg: "Correct ✓: Underline properties belong to text decorations, which are turned off with a value of 'none'.",
				incorrectMsg: "Incorrect X: Modifying defaults requires setting text-decoration to none, not custom parameters."
			}
	],

    cssAnswers: ["c", "b", "c", "b", "d", "b", "a", "d", "c", "a"],

	javascript: [
		{
			id: 1,
			question: "Inside which HTML element do we put the JavaScript?",
			options: {
				a: "<scripting>",
				b: "<javascript>",
				c: "<script>",
				d: "<js>"
			},
			correctMsg: "Correct ✓: Scripting code targets and execution tasks fall natively within standard <script> elements.",
			incorrectMsg: "Incorrect X: Words like 'javascript' or 'js' are file types, but the element name is <script>."
		},
		{
			id: 2,
			question: "How do you write 'Hello World' in an alert box?",
			options: {
				a: "msgBox('Hello World');",
				b: "alertBox('Hello World');",
				c: "msg('Hello World');",
				d: "alert('Hello World');"
			},
			correctMsg: "Correct ✓: The window object exposes an explicit global runtime function named alert().",
			incorrectMsg: "Incorrect X: System commands like 'msgBox' belong to VB, not modern native web platform environments."
		},
		{
			id: 3,
			question: "How do you create a function in JavaScript?",
			options: {
				a: "function myFunction()",
				b: "function:myFunction()",
				c: "function = myFunction()",
				d: "def myFunction()"
			},
			correctMsg: "Correct ✓: Standard functions are initialized with the function keyword followed by brackets.",
			incorrectMsg: "Incorrect X: 'def' belongs to Python pipelines, and adding assignment symbols will throw errors."
		},
		{
			id: 4,
			question: "How do you call a function named 'myFunction'?",
			options: {
				a: "call myFunction()",
				b: "myFunction()",
				c: "call function myFunction()",
				d: "execute myFunction()"
			},
			correctMsg: "Correct ✓: Invoking defined scope actions simply requires writing the label followed by parentheses.",
			incorrectMsg: "Incorrect X: Prefix commands like 'call' are not required to execute standard JavaScript functions."
		},
		{
			id: 5,
			question: "How to write an IF statement in JavaScript?",
			options: {
				a: "if i = 5 then",
				b: "if i == 5 then",
				c: "if (i == 5)",
				d: "if i = 5"
			},
			correctMsg: "Correct ✓: Conditional checking routes evaluate data wrapped within standard parameter blocks.",
			incorrectMsg: "Incorrect X: Conditional control statements in JavaScript require enclosing the evaluation target within parentheses."
		},
		{
			id: 6,
			question: "How does a WHILE loop start?",
			options: {
				a: "while (i <= 10)",
				b: "while i = 1 to 10",
				c: "while (i <= 10; i++)",
				d: "while i <= 10"
			},
			correctMsg: "Correct ✓: While-loop conditions require wrapping their true/false evaluation target within parentheses.",
			incorrectMsg: "Incorrect X: Do not combine for-loop items inside while declarations. Enclose condition targets in parenthesis."
		},
		{
			id: 7,
			question: "How can you add a comment in a JavaScript?",
			options: {
				a: "'This is a comment",
				b: "//This is a comment",
				c: "<!--This is a comment-->",
				d: "#This is a comment"
			},
			correctMsg: "Correct ✓: Double forward slashes specify inline comment overrides for standard compilation scopes.",
			incorrectMsg: "Incorrect X: HTML uses angle brackets, Python uses hash marks, but JavaScript uses forward slashes."
		},
		{
			id: 8,
			question: "What is the correct way to write a JavaScript array?",
			options: {
				a: "var colors = 'red', 'green', 'blue'",
				b: "var colors = (1:'red', 2:'green', 3:'blue')",
				c: "var colors = ['red', 'green', 'blue']",
				d: "var colors = 1 = ('red'), 2 = ('green')"
			},
			correctMsg: "Correct ✓: Sequential collection items are encapsulated using standard square bracket syntax.",
			incorrectMsg: "Incorrect X: Parentheses specify arguments or execution routes, whereas arrays require square bracket bounds."
		},
		{
			id: 9,
			question: "How do you round the number 7.25, to the nearest integer?",
			options: {
				a: "Math.round(7.25)",
				b: "round(7.25)",
				c: "Math.rnd(7.25)",
				d: "rnd(7.25)"
			},
			correctMsg: "Correct ✓: Rounding values utilizes the global Math engine API namespace method Math.round().",
			incorrectMsg: "Incorrect X: Methods must be accessed directly through the global Math object namespace."
		},
		{
			id: 10,
			question: "Which event occurs when the user clicks on an HTML element?",
			options: {
				a: "onmouseover",
				b: "onchange",
				c: "onclick",
				d: "onmouseclick"
			},
			correctMsg: "Correct ✓: The 'onclick' event attribute captures pointing device activation interactions on DOM nodes.",
			incorrectMsg: "Incorrect X: Do not confuse standard interaction events with custom mouse variations like 'onmouseclick'."
		}
	],

    javascriptAnswers: ["c", "d", "a", "b", "c", "a", "b", "c", "a", "c"],
}

export { QuizQuestions };