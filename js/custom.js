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

// Tab functionality has been removed in favor of new project card layout
// Other existing functionalities preserved below

// Initialize WOW.js for animations
if (typeof WOW !== 'undefined') {
    new WOW().init();
}

// Smooth scroll with offset for fixed navbar
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just # or empty
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset (navbar height + some padding)
                const navbarHeight = 70; // Approximate navbar height
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
