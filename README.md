<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>My Portfolio</title>
	<link rel="stylesheet" href="../css/style.css">

	<style>
#banner {
  display: flex;
  background-image: url('../img/coding.gif');
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-top: 0px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden; /* Add overflow property to create the rounded corner effect */
}
#banner h1,
#banner p {
  border-radius: 20px; /* Add border-radius to round the corners of the h1 and p elements */
  background-color: rgba(255,255,255,0.95); /* Add a semi-transparent background color to see the rounded corners */
  padding: 20px;
  color: black;
}

	</style>
</head>
<body>
	<header>
		<nav>
			<h1></h1>
			<ul>
				<li><a href="#" class="active">Home</a></li>
				<li><a href="about.html">About</a></li>
				<li><a href="projects.html">Projects</a></li>
				<li><a href="contact.html">Contact</a></li>
        <li><a href="certificates.html">Certificates</a></li>
			</ul>
		</nav>
	</header>

	<section id="banner">
    <h1>Hey! I'm Nick Holmes, and I'm a <span id="typing-text"></span></h1>
    <p>Explore my work and hopefully I can provide value!</p>
  </section>

<script>
	const typingText = document.getElementById('typing-text');
	const words = ["Full Stack Developer", "Freelancer", "Youtuber", "Hybrid Database Engineer", "Software Developer"];
  const colors = ["red", "blue", "green", "orange", "purple"];
	let wordIndex = 0;
	let charIndex = 0;

	function type() {
		if (charIndex < words[wordIndex].length) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      typingText.style.color = randomColor;
			typingText.textContent += words[wordIndex].charAt(charIndex);
			charIndex++;
			setTimeout(type, 50);
		} else {
			setTimeout(erase, 1250);
		}
	}

	function erase() {
		if (charIndex > 0) {
			typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
			charIndex--;
			setTimeout(erase, 50);
		} else {
			wordIndex++;
			if (wordIndex >= words.length) {
				wordIndex = 0;
			}
			setTimeout(type, 1000);
		}
	}

	document.addEventListener("DOMContentLoaded", function() {
		setTimeout(type, 1000);
	});
</script>

	<section id="services">
		<h2>My Services</h2>
		<ul>
			<li>
				<i class="fa fa-code"></i>
				<h3>Web Development</h3>
				<p>I can design and develop responsive websites that are optimized for performance and user experience.</p>
			</li>
			<li>
				<i class="fa fa-paint-brush"></i>
				<h3>Graphic Design</h3>
				<p>I can create beautiful and effective designs for logos, branding, marketing materials, and more.</p>
			</li>
			<li>
				<i class="fa fa-rocket"></i>
				<h3>Python Development/Machine Learning</h3>
				<p>I can write clean, efficient code that meets industry criteria.</p>
			</li>
		</ul>
	</section>

	<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
	<script src="../js/script.js"></script>
</body>
</html>
