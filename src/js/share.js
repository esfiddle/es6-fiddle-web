import $ from "./helpers";

const share = {
  shareFiddle(id) {
    const src = `${document.location.protocol}//${
      document.location.host
    }/embed/${id}/`;
    const iframe = `<iframe width="100%" height="300" frameborder="0" allowfullscreen src="${src}"></iframe>`;
    const shareEl = $.getElement(".share");
    const twitter = $.getElementFrom(shareEl, ".tweet");
    const embed = $.getElementFrom(shareEl, ".share-embed");
    const link = $.getElementFrom(shareEl, ".share-link");

    $.addStyleTo(shareEl, "display", "inline-block");
    link.value = document.location.href;
    embed.value = iframe;
    link.onclick = link.select;
    embed.onclick = embed.select;
    twitter.href = `http://twitter.com/home?status=ES6%20fiddle:%20${
      document.location.href
    }`;
  }
};

module.exports = share;
