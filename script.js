"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // element toggle function
  const elementToggleFunc = (elem) => elem.classList.toggle("active");

  // sidebar
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    // FIX: sync aria-expanded with actual state
    this.setAttribute(
      "aria-expanded",
      sidebar.classList.contains("active") ? "true" : "false",
    );
  });

  // custom select / filter dropdown
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  select.addEventListener("click", function () {
    elementToggleFunc(this);
    this.setAttribute(
      "aria-expanded",
      this.classList.contains("active") ? "true" : "false",
    );
  });

  const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
      const show =
        selectedValue === "all" || selectedValue === item.dataset.category;
      item.classList.toggle("active", show);
    });
  };

  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      select.setAttribute("aria-expanded", "false");
      filterFunc(selectedValue);
    });
  });

  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // page navigation
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, i) => {
    link.addEventListener("click", function () {
      const target = this.innerHTML.toLowerCase();

      pages.forEach((page, j) => {
        const isMatch = target === page.dataset.page;
        page.classList.toggle("active", isMatch);

        if (navigationLinks[j]) {
          navigationLinks[j].classList.toggle("active", isMatch);
          // FIX: aria-current="page" for screen readers — class alone isn't enough
          navigationLinks[j].setAttribute(
            "aria-current",
            isMatch ? "page" : "false",
          );
        }
      });

      window.scrollTo(0, 0);
    });
  });

  // Set aria-current on initial active link (About is active on load)
  navigationLinks[0]?.setAttribute("aria-current", "page");
});
