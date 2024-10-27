const arrayImages = [
  "https://cdn.discordapp.com/attachments/1197144829679910943/1300206500605722746/1.png?ex=671fff2a&is=671eadaa&hm=f7b04737858fb1c576a972dc5300b7bd9b9578482f90813da794b9fce5dc8578&",
  "https://cdn.discordapp.com/attachments/1197144829679910943/1300206500995661834/2.png?ex=671fff2a&is=671eadaa&hm=25a16ed4df9917135220c7f3f78a0a24d0bcdd239975668295acd8c2845db3c9&",
  "https://cdn.discordapp.com/attachments/1197144829679910943/1300206501369217024/3.png?ex=671fff2a&is=671eadaa&hm=d5e8c8134bb9e1657f72db24e7616815bb67f6b39c3ac792161e356f941a58f6&",
  "https://cdn.discordapp.com/attachments/1197144829679910943/1300206501818011769/4.png?ex=671fff2a&is=671eadaa&hm=98d9aaa67d7bfc08a2f973621e3db8bba83ee017f1d09a94a390dc7977ba8c82&",
  "https://cdn.discordapp.com/attachments/1197144829679910943/1300206502119735357/5.png?ex=671fff2a&is=671eadaa&hm=ed48fde27dcf72b853fc0d1725cc69b85f270f5260d0b8d9d67a736beb5f3a60&"
];

const sliderContainer = document.getElementById("slider-container");
const prevBtn = document.getElementById("pre");
const nextBtn = document.getElementById("next");
const parentNumber = document.getElementsByClassName("numbers")[0];
const numberButton = document.querySelectorAll(".number_button");

let i = 0;

// Create a single img element for the slider
const img = document.createElement("img");
img.src = arrayImages[i];
img.className = "img-slider active"; // Initially set as active for first image
sliderContainer.appendChild(img);

// Create slide number text
const slideText = document.createElement("p");
slideText.textContent = `Slide #${i + 1} of ${arrayImages.length}`;
sliderContainer.appendChild(slideText);

function updateImage(index) {
  img.classList.remove("active"); // Remove active for fade-out

  // Delay setting new src until fade-out completes
  setTimeout(() => {
    img.src = arrayImages[index];
    img.classList.add("active"); // Add active back for fade-in
    slideText.textContent = `Slide #${index + 1} of ${arrayImages.length}`;
  }, 500); // Timing matches CSS transition duration
}

// Initial button setup
prevBtn.setAttribute("disabled", "disabled");

// Next button functionality
nextBtn.addEventListener("click", () => {
  prevBtn.removeAttribute("disabled");
  i++;
  updateImage(i);

  if (i + 1 === arrayImages.length) {
    nextBtn.setAttribute("disabled", "disabled");
  }
  updateActiveButton();
});

// Previous button functionality
prevBtn.addEventListener("click", () => {
  nextBtn.removeAttribute("disabled");
  i--;
  updateImage(i);

  if (i === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  }
  updateActiveButton();
});

// Update active button for navigation dots
function updateActiveButton() {
  parentNumber.getElementsByClassName("active-num")[0]?.classList.remove("active-num");
  parentNumber.getElementsByTagName("button")[i].classList.add("active-num");
}

// Loop through each number button to add click functionality
numberButton.forEach((item, index) => {
  item.addEventListener("click", () => {
    parentNumber.getElementsByClassName("active-num")[0]?.classList.remove("active-num");
    item.classList.add("active-num");

    // Update image based on dot navigation
    updateImage(index);

    // Update buttons for previous and next
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === arrayImages.length - 1;

    i = index; // Set current index for slider position
  });
});

// Automatic switching every 3 seconds with fade effect
const switchEveryThreeSeconds = setInterval(() => {
  i = (i + 1) % arrayImages.length;
  updateImage(i);
  updateActiveButton();

  if (i === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
  }

  if (i === arrayImages.length - 1) {
    nextBtn.setAttribute("disabled", "disabled");
  } else {
    nextBtn.removeAttribute("disabled");
  }
}, 3000);

// Stop auto-switching on hover
sliderContainer.addEventListener("mouseover", () => {
  clearInterval(switchEveryThreeSeconds);
});

// Swipe Functionality for Touch Screens
{
  let startX = 0;
let endX = 0;
sliderContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = endX - startX;
  const swipeThreshold = 50; 

  if (swipeDistance > swipeThreshold) {
    // Swipe right
    prevBtn.click();
  } else if (swipeDistance < -swipeThreshold) {
    // Swipe left
    nextBtn.click();
  }
}}

// Select the small images container
const smallImagesContainer = document.getElementById("small_images");

// Dynamically add thumbnail images from arrayImages
arrayImages.forEach((imageSrc, index) => {
  const thumbnail = document.createElement("img");
  thumbnail.src = imageSrc;
  thumbnail.classList.add("image_smaller");

  // Add click event to update the main slider image on thumbnail click
  thumbnail.addEventListener("click", () => {
    updateImage(index);
    i = index;
    updateActiveButton(); 

    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === arrayImages.length - 1;

    smallImagesContainer.querySelector(".active-thumbnail")?.classList.remove("active-thumbnail");
    thumbnail.classList.add("active-thumbnail");
  });

  smallImagesContainer.appendChild(thumbnail);
});
