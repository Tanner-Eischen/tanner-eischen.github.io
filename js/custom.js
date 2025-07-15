$(function(){

  // ------- WOW ANIMATED ------ //
  // Temporarily disabled to test hover functionality
  /*
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();
  */

  // HIDE MOBILE MENU AFTER CLICKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
  });

  // NIVO LIGHTBOX - Commented out as library not included and elements don't exist
  /*
  $('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale',
  });
  */

});

const skillsData = {
  python: [
    "Built data pipelines for seismic and KDP market analysis",
    "Developed machine learning models for classification tasks"
  ],
  js: [
    "Built interactive web applications and dynamic UIs",
    "Implemented client-side logic and DOM manipulation"
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
  nodejs: [
    "Built RESTful APIs for full-stack apps",
    "Handled authentication and routing"
  ]
};

const educationTitles = {
  utexas: "University of Texas at Austin",
  ecu: "East Carolina University",
  gustavus: "Gustavus Adolphus College"
};

const educationData = {
  utexas: [
    "PhD (ABD) in Geophysics - Advanced coursework completed",
    "Specialized in seismic data analysis and computational geophysics",
    "Research focus on crustal structure and earthquake mechanics",
    "Teaching assistant for undergraduate geology courses"
  ],
  ecu: [
    "Master of Science in Geological Sciences",
    "Thesis: Geometry and Construction of Upper Crustal Igneous Intrusions",
    "Published research on magma chamber development",
    "GIS and spatial analysis expertise developed"
  ],
  gustavus: [
    "Bachelor of Arts in Geology",
    "Strong foundation in earth sciences and field methods",
    "Undergraduate research in structural geology",
    "Dean's List academic achievement"
  ]
};

const experienceTitles = {
  hackthegap: "Hack the Gap Fellow",
  outlier: "AI Trainer - Outlier",
  tutoring: "Physics & Math Tutor",
  aecom: "Environmental Consultant - AECOM",
  seismologist: "Research Seismologist",
  utig: "Research Assistant - UTIG"
};

const experienceData = {
  hackthegap: [
    "Developed full-stack web applications using modern frameworks",
    "Collaborated on AI-powered solutions for social impact",
    "Implemented responsive designs and user interfaces",
    "Participated in agile development processes"
  ],
  outlier: [
    "Trained and fine-tuned large language models",
    "Evaluated AI model performance and accuracy",
    "Created training datasets for machine learning applications",
    "Specialized in STEM and technical content generation"
  ],
  tutoring: [
    "Taught physics and mathematics to students of all levels",
    "Developed personalized learning strategies",
    "Improved student performance through targeted instruction",
    "Experience with both in-person and online teaching platforms"
  ],
  aecom: [
    "Conducted geological site assessments and environmental studies",
    "Prepared technical reports and regulatory documentation",
    "Managed field data collection and laboratory analysis",
    "Collaborated with multidisciplinary engineering teams"
  ],
  seismologist: [
    "Analyzed seismic data for earthquake research",
    "Operated and maintained seismographic equipment",
    "Contributed to regional seismic monitoring networks",
    "Published findings in peer-reviewed journals"
  ],
  utig: [
    "Conducted geophysical research at leading institute",
    "Processed and interpreted marine seismic data",
    "Assisted with field data collection expeditions",
    "Contributed to understanding of oceanic crustal structure"
  ]
};

// Basic jQuery test
console.log('Custom.js loaded');

$(document).ready(function() {
    console.log('Document ready fired');
    console.log('jQuery version:', $.fn.jquery);
    
    // Test if jQuery is working
    if (typeof $ !== 'undefined') {
        console.log('jQuery is available');
        console.log('Number of .skill elements:', $('.skill').length);
        
        // Skills hover functionality with proper data integration
        $('.skill').hover(
            function() {
                var skillKey = $(this).data('skill');
                var skillInfo = skillsData[skillKey];
                
                if (skillInfo && skillInfo.length > 0) {
                    var skillHtml = '<h3>' + skillKey.toUpperCase() + '</h3><ul>';
                    skillInfo.forEach(function(detail) {
                        skillHtml += '<li>' + detail + '</li>';
                    });
                    skillHtml += '</ul>';
                    
                    $('#skill-details-box').html(skillHtml).show();
                } else {
                    $('#skill-details-box').html('<h3>No details available</h3>').show();
                }
            },
            function() {
                $('#skill-details-box').hide();
            }
        );
        
        // Education hover functionality
         $('.education-item').hover(
             function() {
                 var educationKey = $(this).data('education');
                 var educationInfo = educationData[educationKey];
                 var educationTitle = educationTitles[educationKey] || educationKey.toUpperCase();
                 
                 if (educationInfo) {
                     var educationHtml = '<h3>' + educationTitle + '</h3><ul>';
                     educationInfo.forEach(function(detail) {
                         educationHtml += '<li>' + detail + '</li>';
                     });
                     educationHtml += '</ul>';
                     $('#education-details-box').html(educationHtml).show();
                 }
             },
             function() {
                 $('#education-details-box').hide();
             }
         );

        // Experience hover functionality
         $('.experience-item').hover(
             function() {
                 var experienceKey = $(this).data('experience');
                 var experienceInfo = experienceData[experienceKey];
                 var experienceTitle = experienceTitles[experienceKey] || experienceKey.toUpperCase();
                 
                 if (experienceInfo) {
                     var experienceHtml = '<h3>' + experienceTitle + '</h3><ul>';
                     experienceInfo.forEach(function(detail) {
                         experienceHtml += '<li>' + detail + '</li>';
                     });
                     experienceHtml += '</ul>';
                     $('#experience-details-box').html(experienceHtml).show();
                 }
             },
             function() {
                 $('#experience-details-box').hide();
             }
         );
        
        // WOW.js initialization should be here
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }

    } else {
        console.error('jQuery not available');
    }
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
