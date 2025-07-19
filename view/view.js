class View {
  constructor() {
    this.menu = document.getElementById("nav-menu");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.toggleBtn = document.getElementById("toggle-menu");
    this.img_menu = document.getElementById("img_menu");
    this.card_unbox = document.getElementById("card_unbox");
    //hero section

    this.hero = document.getElementById("hero");
    this.toggleBtn?.addEventListener("click", () => {
      const isHidden = this.mobileMenu.classList.toggle("hidden");
      if (isHidden) {
        this.img_menu.src = "./icon/menu_black.svg";
      } else {
        this.img_menu.src = "./icon/menu_close.svg";
      }
    });
  }

  renderMenu(items) {
    items.forEach((item) => {
      // Desktop version
      const desktopLi = this.createMenuItem(item, false);
      this.menu.appendChild(desktopLi);

      // Mobile version
      const mobileLi = this.createMenuItem(item, true);
      this.mobileMenu.appendChild(mobileLi);
    });
  }

  createMenuItem(item, isMobile) {
    const li = document.createElement("li");
    li.className = "relative";

    if (item.dropdown) {
      const button = document.createElement("button");
      button.className = isMobile
        ? "text-black w-full text-left font-medium py-2 flex cursor-pointer   items-center justify-between"
        : "text-black font-medium flex  cursor-pointer items-center gap-1";

      // Create the icon span
      const icon = document.createElement("img");
      icon.src = "./icon/up_white.svg";
      icon.alt = "dropdown arrow";
      icon.className =
        "ml-1 w-4 h-4 transition-transform cursor-pointer  duration-300";
      // Add text and icon
      button.innerHTML = `${item.name} `;
      button.appendChild(icon);

      // Create dropdown menu
      const dropdown = document.createElement("ul");
      dropdown.className = isMobile
        ? "pl-4 space-y-1 text-sm hidden cursor-pointer "
        : "absolute hidden bg-white text-sm shadow-lg mt-2 cursor-pointer  rounded w-48 z-20";

      item.dropdown.forEach((subItem) => {
        const subLi = document.createElement("li");
        const a = document.createElement("a");
        a.href = subItem.href;
        a.textContent = subItem.name;
        a.className = isMobile
          ? "block text-black py-3 cursor-pointer text-[20] z-50 hover:px-4"
          : "block px-4 py-2 hover:bg-gray-100 cursor-pointer ";
        subLi.appendChild(a);
        dropdown.appendChild(subLi);
      });

      button.addEventListener("click", () => {
        const isHidden = dropdown.classList.toggle("hidden");

        if (isHidden) {
          icon.src = "./icon/up_white.svg";
        } else {
          icon.src = "./icon/down.svg";
        }
      });

      li.appendChild(button);
      li.appendChild(dropdown);
    } else {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.name;
      a.className = "text-black font-medium cursor-pointer ";
      li.appendChild(a);
    }

    return li;
  }

  unbox(item) {
    item.forEach((item) => {
      this.card_unbox.innerHTML += `<div class="rounded-2xl mx-2  overflow-hidden transition mt-4 bg-white">
      <img
          src="${item.img}"
          alt="${item.head}"
          class="w-full h-48 object-contain p-4 bg-gray-50" />
        <div class="px-4 pb-4">
          <h3 class="text-lg font-semibold text-gray-800 mt-2">${item.head}</h3>
          <p class="text-sm text-gray-600">${item.discription}</p>
          <button
            class="mt-4 bg-[#092635] cursor-pointer  text-white px-4 py-2 rounded-lg transition">
          ${item.pricing}
          </button>
        </div>
         </div>`;
    });
  }
}

const app = new View();
export { app };
