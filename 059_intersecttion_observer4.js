
const collider = document.querySelector(".loading");
const container = document.querySelector(".container");
const footer= document.querySelector("footer");

const MAX_IMAGES = 10;  //You can freely change the maximum number of images to load here
let control= 0;

const getImage = () => {
  fetch("https://picsum.photos/600")
    .then(response => response.blob())
    .then(result => {
      control++;
      const image= document.createElement("img");
      const num= document.createElement("div");
      num.textContent= control;
      image.src= URL.createObjectURL(result); //Injecting the URL to the src attribute
      container.appendChild(num);
      container.appendChild(image);
    });
};

const observer = new IntersectionObserver((entry, observer) => {
  intersection= entry[0].isIntersecting;
  if (intersection) getImage();
  if (control === MAX_IMAGES) {
    observer.unobserve(entry[0].target);
    collider.parentNode.removeChild(collider);
    footer.textContent= "You have reached the maximum number of images required"
  }
});

observer.observe(collider);