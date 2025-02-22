(() => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createDucks() {
    return [...Array(15)].map(() => {
      return {
        x: random(0, window.innerWidth),
        y: window.innerHeight,
        speedX: random(-50, 50),
        speedY: random(5, 10),
      };
    });
  }

  function setupDuckElement(duck) {
    const duckElem = document.createElement("div");
    duckElem.className = "duck";
    duckElem.style.left = `${duck.x}px`;
    duckElem.style.top = `${duck.y}px`;
    document.body.appendChild(duckElem);

    // random duck sizes
    duckElem.style.width = random(50, 120) + 'px';
    duckElem.style.height = "120px";

    return {
      duck,
      duckElem
    };
  }

  function getDuckBackgroundImage(duck, duckElem) {
    const direction = duck.speedX > 0 ? "right" : "left";
    return duckElem.style.backgroundImage.indexOf("1") !== -1 ?
      `url(./${direction}-2.png)` :
      `url(./${direction}-1.png)`;
  }

  function moveDuck(duckElem, duck) {
    const {
      left,
      top
    } = duckElem.getBoundingClientRect();

    const outOfBoundX = duck.x < 0 || duck.x > window.innerWidth;
    const outOfBoundY = duck.y < 0 || duck.y > window.innerHeight;

    if (outOfBoundX) {
      duck.speedX *= -1;
    }

    if (outOfBoundY) {
      duck.speedY *= -1;
    }

    duck.x = left + duck.speedX;
    duck.y = top - duck.speedY;
    duckElem.style.left = `${duck.x}px`;
    duckElem.style.top = `${duck.y}px`;

    duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem);
  }

  function Addscore() {

    const score = document.querySelector("#score-counter").innerHTML;
    const scoreHTML = document.querySelector("#score-counter");
    let count = Number(score);
    scoreHTML.innerHTML = count + 100;


  }

  function playshootsound() {
    var audio = document.getElementById("Shootaudio");
    audio.play();
  }

  function shootDuck(event) {

    const duckElem = event.currentTarget;
    duckElem.style.transition = "top 2s";
    duckElem.style.top = `${window.innerHeight}px`;

    clearInterval(duckElem.interval);
    setTimeout(() => {


      document.body.removeChild(duckElem);

      const duck = document.querySelector(".duck");



      if (!duck) {
        const winningElem = document.querySelector(".winning");
        winningElem.style.opacity = 1;


        // const winningElem = document.querySelector(".winning");
        // const nextlevelElem = document.querySelector(".nextlevel");
        // const nextlevelElemvisible = document.querySelector(".nextlevel");
        // winningElem.style.opacity = 1,
        // nextlevelElem.style.opacity = 1;
        // nextlevelElemvisible.style.visibility = "visible";


      }
    }, 2000);
  }



  function run() {
    const ducks = createDucks();
    const duckElems = ducks.map(setupDuckElement);

    duckElems.forEach(({
      duck,
      duckElem
    }) => {
      duckElem.interval = setInterval(() => moveDuck(duckElem, duck), 50);
           // duckElem.addEventListener("click", shootDuck);
      // duckElem.addEventListener("click", Addscore);
      // duckElem.addEventListener("click", playshootsound);
      duckElem.addEventListener("click", onDuckClicked);



    });

  }

  function onDuckClicked(event) {
    const duckElem = event.currentTarget;

    if (duckElem.getAttribute("clicked") == "true") {
      console.log("Ignoring second click");
      return;
    }

    duckElem.setAttribute("clicked", "true");

    shootDuck(event);
    Addscore(event);
    playshootsound(event);


  }

  run();

})();