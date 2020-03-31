window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locTimezone = document.querySelector(".loc-timezone");
  let tempSection = document.querySelector(".temperature");
  const tempSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Setting DOM elements from api
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          tempDegree.textContent = celsius;
          tempDescription.textContent = summary;
          locTimezone.textContent = data.timezone;
          //Formula for celsius
          let fahrenheit = Math.floor(temperature);

          //Set icon
          setIcons(icon, document.querySelector(".icon"));
          //Change temperature to Celsius/Fahrenheit
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "C") {
              tempSpan.textContent = "F";
              tempDegree.textContent = fahrenheit;
            } else {
              tempSpan.textContent = "C";
              tempDegree.textContent = celsius;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
