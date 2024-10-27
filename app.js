const arrayImages = [
  `imgs/1.png`,
  `imgs/2.png`,
  `imgs/3.png`,
  `imgs/4.png`,
  `imgs/5.png`,
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
