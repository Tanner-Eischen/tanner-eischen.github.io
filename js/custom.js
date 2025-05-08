$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // HIDE MOBILE MENU AFTER CLICKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
  });

  // NIVO LIGHTBOX
  $('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale',
  });

});

const skillsData = {
  python: [
    "Built data pipelines for seismic and KDP market analysis",
    "Developed machine learning models for classification tasks"
  ],
  arcgis: [
    "Mapped geological features for field studies",
    "Analyzed spatial datasets for environmental assessment"
  ],
  matlab: [
    "Processed seismic signals for geophysical research",
    "Visualized waveforms and performed signal analysis"
  ],
  html: [
    "Built responsive layouts for portfolio projects",
    "Used semantic HTML for accessibility and SEO"
  ],
  css: [
    "Styled components with Flexbox and Grid",
    "Created animations and transitions"
  ],
  sql: [
    "Queried large databases for geospatial datasets",
    "Designed normalized schema for project tracking"
  ],
  react: [
    "Built interactive UIs for internal tools",
    "Managed component state with hooks"
  ],
  flask: [
    "Created REST APIs for ML model inference",
    "Integrated Flask backends with front-end UIs"
  ],
  nodeexpress: [
    "Built RESTful APIs for full-stack apps",
    "Handled authentication and routing"
  ]
};

$(document).ready(function () {
  $('.skill').hover(function () {
    const key = $(this).data('skill');
    const detailsBox = $('#skill-details-box');
    const list = $('#skill-details-list');

    list.empty();
    $('#skill-details-box').show().html('<ul><li>Debug Test</li></ul>');
    
    if (skillsData[key]) {
      skillsData[key].forEach(item => {
        list.append(`<li>${item}</li>`);
      });
      detailsBox.removeClass('hidden');
    }
  }, 
  
  function () {
    $('#skill-details-box').addClass('hidden');
  });
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// ✅ New function for second-level tab logic
function openInnerTab(evt, tabName) {
  const container = evt.currentTarget.closest('.scrollwindow');
  const tabcontent = container.querySelectorAll('.tabcontent');
  const tablinks = container.querySelectorAll('.tablinks');

  tabcontent.forEach(el => el.style.display = "none");
  tablinks.forEach(el => el.classList.remove("active"));

  const activeTab = container.querySelector(`#${tabName}`);
  if (activeTab) activeTab.style.display = "block";

  evt.currentTarget.classList.add("active");
}

// ✅ Open default tabs on page load
document.addEventListener("DOMContentLoaded", function () {
  // Open the first top-level tab in #Projects
  const defaultTopTab = document.querySelector("#Projects .tab button.tablinks");
  if (defaultTopTab) {
    defaultTopTab.click();
  }

  // Open the first inner tab in each scrollwindow
  document.querySelectorAll("#Projects .scrollwindow").forEach(container => {
    const firstInnerButton = container.querySelector(".tab button.tablinks");
    if (firstInnerButton) {
      firstInnerButton.click();
    }
  });
});
