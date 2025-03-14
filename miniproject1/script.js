document.querySelectorAll('.card input[type="text"]').forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            alert(`Searching for: ${this.value}`);
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const flowers = [
        {
            name: "Rose",
            color: "Red",
            symbolism: "Love, passion, and romance",
            img1: "images/rose1.jpg",
            img2: "images/rose2.jpg"
        },
        {
            name: "Lily",
            color: "White",
            symbolism: "Purity and innocence",
            img1: "images/lilly1.jpg",
            img2: "images/lilly2.jpg"
        },
        {
            name: "Tulip",
            color: "Yellow",
            symbolism: "Cheerful thoughts and sunshine",
            img1: "images/tulip1.jpg",
            img2: "images/tulip2.jpg"
        },
        {
            name: "Daisy",
            color: "White and yellow",
            symbolism: "Innocence and purity",
            img1: "images/daisy1.jpg",
            img2: "images/daisy2.jpg"
        },
        {
            name: "Sunflower",
            color: "Yellow",
            symbolism: "Adoration and loyalty",
            img1: "images/sunflower1.jpg",
            img2: "images/sunflower2.jpg"
        },
        {
            name: "Orchid",
            color: "Purple",
            symbolism: "Beauty, strength, and luxury",
            img1: "images/orchid1.jpg",
            img2: "images/orchid2.jpg"
        },
        {
            name: "Iris",
            color: "Blue",
            symbolism: "Faith, hope, and wisdom",
            img1: "images/iris1.jpg",
            img2: "images/iris2.jpg"
        },
        {
            name: "Peony",
            color: "Pink",
            symbolism: "Happiness and prosperity",
            img1: "images/peony1.jpg",
            img2: "images/peony2.jpg"
        },
        {
            name: "Cherry Blossom",
            color: "Pink",
            symbolism: "The fleeting nature of life",
            img1: "images/cherryblossom1.jpg",
            img2: "images/cherryblossom2.jpg"
        },
        {
            name: "Violet",
            color: "Purple",
            symbolism: "Modesty and faithfulness",
            img1: "images/violet1.jpg",
            img2: "images/violet2.jpg"
        }
    ];

    const cardContainer = document.getElementById('card-list');
    const cardTemplate = document.getElementById('card-template').content;

    flowers.forEach((flower, index) => {
        const cardClone = cardTemplate.cloneNode(true);

        const carouselId = `carousel-${index}`;
        const carousel = cardClone.querySelector('.carousel');
        carousel.id = carouselId;
        cardClone.querySelector('.carousel-control-prev').setAttribute('data-bs-target', `#${carouselId}`);
        cardClone.querySelector('.carousel-control-next').setAttribute('data-bs-target', `#${carouselId}`);

        cardClone.querySelector('.card-title').textContent = flower.name;
        cardClone.querySelector('.card-text').textContent = `Color: ${flower.color}, Symbolism: ${flower.symbolism}`;

        const imgElements = cardClone.querySelectorAll('.card-img-top');
        imgElements[0].src = flower.img1;
        imgElements[0].alt = `${flower.name} Image 1`;
        imgElements[1].src = flower.img2;
        imgElements[1].alt = `${flower.name} Image 2`;

        cardContainer.appendChild(cardClone);
    });
    document.querySelectorAll('.card input[type="text"]').forEach(input=> {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                alert(`Searching for: ${this.value}`);
            }

    })
});
  // Adding the "Order Now" button functionality
  const orderButton = document.createElement('div');
  orderButton.className = 'word-button';
  orderButton.textContent = 'Order Now';
  document.body.appendChild(orderButton);

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  document.body.appendChild(messageDiv);

  orderButton.addEventListener('click', () => {
      messageDiv.textContent = 'Order now';

      const confirmButton = document.createElement('div');
      confirmButton.className = 'word-button';
      confirmButton.textContent = 'Confirm';

      confirmButton.addEventListener('click', () => {
          messageDiv.textContent = 'Your order has been received. Thank you for ordering! We will be in touch soon.';
      });

      messageDiv.appendChild(confirmButton);
  });
});


