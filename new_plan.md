--- Implementation Plan ---
Here's a step-by-step plan to continue your portfolio development, addressing your specific requests:

### **Implementation Plan**

This plan focuses on modifying your `css/style.css`, `index.html`, and `js/smoothscroll.js` files based on your query and provided code.  

---

**Step 1: Update Project Card Header Gradient to Match Existing Color Scheme**

Your existing color scheme (from `css/style.css`) prominently features `#FFD321` (a bright yellow) and `#f1d16e` (a gold/yellow). The current card header gradient (`#667eea` to `#764ba2`) is a blue-purple. To match the existing scheme, we'll use a gradient based on your yellows.

*   **File:** `css/style.css`
*   **Action:** Locate the `.card-header` rule and change its `background` property.        

```css
/* In css/style.css */

.card-header {
    /* BEFORE: background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
    /* NEW: Using your existing yellow/gold colors */
    background: linear-gradient(135deg, #FFD321 0%, #f1d16e 100%); /* Bright yellow to gold */
    color: #404040; /* Changed text color for better contrast on yellow background */       
    padding: 20px;
    text-align: center;
}

/* Optional: Adjust footer link colors if they now clash with the yellow header */
.card-footer a {
    background: #404040; /* Use a dark color for contrast on light footer */
    color: white;
    /* ... existing properties ... */
}

.card-footer a:hover {
    background: #007bff; /* Retain original hover blue for differentiation or pick another accent */
    /* ... existing properties ... */
}
```
**Explanation:** We're replacing the blue-purple gradient with one that blends your `FFD321` (active nav link color) with `f1d16e` (about section icon color), which are clearly part of your existing scheme. The `color` of the `h4` in `.card-header` is also changed to `#404040` for better readability against the yellow gradient. Consider adjusting the `card-footer a` colors as well for overall consistency, as suggested.

---

**Step 2: Add Inset Visuals (Thumbnails/Screenshots) to Project Cards**

This requires adding an image placeholder in your HTML and defining styles for it in CSS.   

*   **File:** `index.html`
*   **Action:** Inside each `.project-card`, after the `card-header` but before `card-body`, add an `<img>` tag. You will need to create and replace these `src` attributes with actual screenshots of your applications.

    ```html
    <!-- In index.html, for each .project-card -->

    <div class="project-card wow fadeInUp" data-wow-delay="0.2s">
        <div class="card-header">
            <h4>DissertAI - Academic AI Writing Assistant</h4>
        </div>
        <!-- NEW: Project Visual Placeholder -->
        <div class="project-visual">
            <img src="images/dissertai_thumbnail.jpg" alt="Screenshot of DissertAI application">
        </div>
        <div class="card-body">
            <p>Modular web app leveraging OpenAI and Supabase to assist with academic writing. Features semantic citation search, grammar feedback, abstract generator, and logical flow mapping.</p>
            <p><strong>Tech Stack:</strong> React, Zustand, Supabase Edge Functions, OpenAI API</p>
        </div>
        <div class="card-footer">
            <a href="https://github.com/Tanner-Eischen/DissertAI" target="_blank" rel="noopener" aria-label="View DissertAI source code"> 
                <i class="fa fa-github"></i> View Code
            </a>
        </div>
    </div>
    <!-- Repeat for Leafwise, Publishing Strategist, Master's Thesis -->
    ```
    **Note:** Replace `images/dissertai_thumbnail.jpg` with the actual path to your project's screenshot/visual. Ensure you have `images/leafwise_thumbnail.jpg`, `images/publishing_strategist_thumbnail.jpg`, and `images/thesis_thumbnail.jpg` (or appropriate names) for the other projects.

*   **File:** `css/style.css`
*   **Action:** Add new CSS rules to style these project visuals to appear "inset."

    ```css
    /* In css/style.css, add these new rules */

    .project-visual {
        width: 100%; /* Ensure it fills the card width */
        height: 200px; /* Fixed height for consistency, adjust as needed */
        overflow: hidden; /* Hide overflow if image is larger than container */
        background-color: #f0f0f0; /* Placeholder background */
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e9ecef; /* Separator from body */
    }

    .project-visual img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Cover the area, cropping if necessary */
        display: block; /* Remove extra space below image */
        border-radius: 8px; /* Inherit from card, or add specific inset look */
        /* To create an 'inset window' effect, you could add: */
        /* padding: 10px; */
        /* background-color: #fff; */
        /* box-shadow: inset 0 0 10px rgba(0,0,0,0.1); */
        /* border-radius: 5px; */
    }

    /* Optional: Add a subtle border or shadow to the image itself for an "inset" feel */   
    .project-visual img {
        border-radius: 4px; /* Slightly rounded corners for the image */
        box-shadow: inset 0 0 8px rgba(0,0,0,0.2); /* Inset shadow */
        transform: scale(0.98); /* Slightly shrink to give inset appearance */
        transition: transform 0.3s ease;      
    }

    .project-card:hover .project-visual img { 
        transform: scale(1); /* Expand slightly on card hover */
    }

    /* Mobile Responsiveness for project visuals */
    @media (max-width: 768px) {
        .project-visual {
            height: 180px; /* Adjust height for smaller screens */
        }
    }

    @media (max-width: 400px) {
        .project-visual {
            height: 150px; /* Further adjust height for very small screens */
        }
    }
    ```

---

**Step 3: Improve Smoothscroll Alignment with Fixed Navigation Bar**

Your navigation bar is fixed, which can cause section headers to be hidden behind it when smooth scrolling. We can adjust the `smoothscroll.js` configuration to account for this offset.

*   **File:** `js/smoothscroll.js`
*   **Action:** Locate the initialization of `$.localScroll` at the bottom of the file and add an `offset` property.

    ```javascript
    // In js/smoothscroll.js
    // Initialize all .smoothScroll links     
    jQuery(function($) {
      // BEFORE: $.localScroll({ filter: ".smoothScroll" });
      // NEW: Add offset to account for fixed header (approx 100px height)
      $.localScroll({
        filter: ".smoothScroll",
        offset: { top: -100 } // Adjust this value if your navbar height changes
      });
    });
    ```
    **Explanation:** By setting `offset: { top: -100 }`, the smooth scroll will stop 100 pixels *before* the actual target element's top, effectively placing the target element's top edge just below your fixed 100px navigation bar. If your navbar's final height is different, adjust `-100` accordingly.

---

**Step 4: Add a Downloadable Resume Link**    

You mentioned needing a link to a downloadable resume PDF. Adding it to the footer alongside your social links is a good, accessible place.

*   **File:** `index.html`
*   **Action:** In the `<section id="contact">` (which also acts as your footer), add a new `<a>` tag for your resume.

    ```html
    <!-- In index.html, inside <section id="contact"> -->

    <section id="contact">
        <h2>Contact</h2>
        <h4>+1(763)-412-9719</h4>
        <h4>tannereichen@gmail.com</h4>       
        <div style="margin-top: 20px;">       
            <a href="https://www.linkedin.com/in/tanner-eischen" target="_blank" rel="noopener" aria-label="LinkedIn Profile">
              <i class="fa fa-linkedin-square" style="font-size:36px; color:#0077b5;"></i>  
            </a>
            <a href="https://github.com/tanner-eischen" target="_blank" rel="noopener" aria-label="GitHub Profile" style="margin-left: 15px;">
                <i class="fa fa-github-square" style="font-size:36px; color:#333;"></i>     
            </a>
            <!-- NEW: Resume Link -->
            <a href="path/to/your/resume.pdf" download="Tanner_Eischen_Resume.pdf" style="margin-left: 15px;" rel="noopener" aria-label="Download Resume PDF">
                <i class="fa fa-file-pdf-o" style="font-size:36px; color: #dc3545;"></i> <!-- Using a red color for PDF icon -->
            </a>
        </div>
    </section>
    ```
    **Explanation:**
    *   `href="path/to/your/resume.pdf"`: **Crucially, replace `path/to/your/resume.pdf` with the actual path to your resume file.** Make sure the PDF is in your repository.
    *   `download="Tanner_Eischen_Resume.pdf"`: This attribute suggests a default filename for the downloaded file.
    *   `rel="noopener"`: Good practice for security when using `target="_blank"`.
    *   `aria-label`: Improves accessibility by providing a descriptive label for screen readers.
    *   `fa fa-file-pdf-o`: Uses a Font Awesome icon for a PDF file.

---

By following these steps, you'll address the specific points in your query and enhance your portfolio's aesthetics and usability. Remember to replace placeholder image paths and your resume path with actual files.
--- End Plan ---