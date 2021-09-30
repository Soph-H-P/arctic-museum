const exhibitionsContainer = document.querySelector(".exhibitions__container");
const exhibitionsUrl = `https://soph-web-dev.eu/arctic-museum/wp-json/wp/v2/posts?_embed&categories=5&per_page=20&order=asc`;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postSearchTerm = params.get("search");
const searchUrl = `https://soph-web-dev.eu/arctic-museum/wp-json/wp/v2/posts?_embed&categories=5&per_page=20&search="${postSearchTerm}&order=asc`;
const heading = document.querySelector(".page-title");
const pageDescription = document.querySelector(".page-description");

const fetchExhibitions = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

const renderHtml = async (exhibitionsArray) => {
  const exhibitions = await exhibitionsArray;

  exhibitions.forEach((exhibition) => {
    const subject = exhibition._embedded["wp:term"][1][0].name;
    const title = exhibition.title.rendered.toLowerCase();
    const className = exhibition.slug;
    const imgSrc = exhibition._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    const imgAlt = exhibition._embedded["wp:featuredmedia"][0].alt_text;
    const description = exhibition.content.rendered;

    const exhibitionHtml = `
      <section class="exhibitions__section ${className}__section" id="${className}">
          <h2>${title}</h2>
          <div class="subject__label">
            <p>${subject}</p>
            <i class="${subject}__icon icon"></i>
          </div>
          <div class="exhibition-img__wrapper">
            <img
              src="${imgSrc}"
              alt="${imgAlt}"
            />
          </div>
          <div class="exhibition-text__div">
          ${description}
          </div>
        </section>
      `;

    exhibitionsContainer.innerHTML += exhibitionHtml;

    if (title === "cosmology") {
      exhibitionsContainer.innerHTML += `
        <div class="planet__decoration__div">
        <div class="sun"></div>
        <div class="mercury"></div>
        <div class="venus"></div>
        <div class="earth"></div>
        <div class="mars"></div>
        <div class="jupiter"></div>
        <div class="saturn"></div>
        <div class="uranus"></div>
        <div class="neptune"></div>
      </div>
        `;
    }
  });
  const loader = document.querySelector(".loading");
  loader.remove();
  //View photos
  const images = document.querySelectorAll(".exhibition-img__wrapper");
  images.forEach((image) => {
    image.addEventListener("click", (e) => {
      const element = e.target.tagName;
      if (image.classList.contains("full_screen_view") && element !== "IMG") {
        image.classList.remove("full_screen_view");
        document.querySelector(".close_modal_button").remove();
      } else {
        image.classList.add("full_screen_view");
        image.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        e.target.style.cursor = `default`;

        if (!document.querySelector(".close_modal_button")) {
          image.innerHTML += `<button class="close_modal_button" aria-label="close full image view"></button>`;
        }
      }
    });
    image.addEventListener("mouseover", (e) => {
      const element = e.target.tagName;
      image.classList.contains("full_screen_view") && element !== "IMG"
        ? (image.style.cursor = `pointer`)
        : image.classList.contains("full_screen_view") && element === "IMG"
        ? (e.target.style.cursor = `default`)
        : !image.classList.contains("full_screen_view") && element === "IMG"
        ? (e.target.style.cursor = `pointer`)
        : (e.target.style.cursor = `default`);
    });
  });
};

if (postSearchTerm) {
  heading.innerHTML = `Search Results for "${postSearchTerm}"`;
  pageDescription.remove();
  renderHtml(fetchExhibitions(searchUrl));
} else {
  renderHtml(fetchExhibitions(exhibitionsUrl));
}
