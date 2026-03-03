var form = document.getElementById("weather-form");
var locationInput = document.getElementById("location");
var infoField = document.getElementById("info");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  var location = locationInput.value.trim();
  if (location === "") {
    return;
  }

  infoField.textContent = "Loading weather...";

  try {
    var url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      encodeURIComponent(location) +
      "?unitGroup=us&key=ECFDJT4GUU98K55BGSDABCZ35&contentType=json";

    var response = await fetch(url);
    if (!response.ok) {
      infoField.textContent = "Could not find weather for that place.";
      return;
    }

    var data = await response.json();
    var temp = data.currentConditions.temp;
    var difference = Math.abs(temp - 67);

    if (difference > 40) {
      difference = 40;
    }

    var percent = difference / 40;
    var hue = Math.round((1 - percent) * 120);
    document.documentElement.style.setProperty("--bg", "hsl(" + hue + " 58% 45%)");

    infoField.innerHTML =
      "<strong>" +
      data.resolvedAddress +
      "</strong><br>Current temperature: <strong>" +
      temp.toFixed(1) +
      "°F</strong><br>Difference from ideal temp: <strong>" +
      difference.toFixed(1) +
      "°F</strong>";
  } catch (error) {
    infoField.textContent = "Something went wrong. Try again.";
  }
});
