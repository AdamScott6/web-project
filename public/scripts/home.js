document.addEventListener('DOMContentLoaded', function() {
    const parent = document.querySelector(".page");

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const value = data[i];
                const section = document.createElement('section');
                section.classList.add("post", "hidden");

                const header = document.createElement('div');
                header.classList.add("header");

                const img = document.createElement("img");
                img.src = "images/default.jpg";
                header.appendChild(img);

                const h2 = document.createElement("h2");
                h2.textContent = value.title;
                header.appendChild(h2);

                section.appendChild(header);

                const content = document.createElement("div");
                content.classList.add("content");

                const p = document.createElement("p");
                p.textContent = value.body;
                content.appendChild(p);

                section.appendChild(content);

                if (parent) {
                    parent.appendChild(section);
                } else {
                    console.log("Parent element not found.");
                };
            }
        })
        .catch(error => console.log(error));


});

document.addEventListener('DOMContentLoaded', function() {
// This code was adapted from "app.js" by Beyond Fireship (2023-04-05)
// let page = $("div.page").children();
const observer = new IntersectionObserver((entries => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else{
            entry.target.classList.remove('show');
        }
    });
}));

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));
});