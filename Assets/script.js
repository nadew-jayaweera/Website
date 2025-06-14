window.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            alert("Thanks for your message!");
            form.reset();
          } else {
            alert("Oops! There was a problem.");
          }
        })
        .catch((error) => {
          alert("Oops! There was a problem.");
        });
    });
  });

