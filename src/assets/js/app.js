document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.example-tab-link');
  const tabActiveClass = 'example-tab-link--active';
  hideAllContainers();

  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();

      // Get all tabs and remove the active class
      tabs.forEach(tab => {
        tab.classList.remove(tabActiveClass);
      });

      hideAllContainers();

      // Show the clicked tab's content
      const contentId = this.getAttribute('href');
      document.querySelector(contentId).style.display = 'block';

      // Add the active class to the clicked tab
      tab.classList.add(tabActiveClass);
    });
  });

  function hideAllContainers() {
    document.querySelectorAll('.example-tabs-container').forEach(container => {
      container.style.display = 'none';
    });
  }
});