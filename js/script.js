/* ============================================================
   MOBILE NAVIGATION TOGGLE
   ============================================================ */
(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('primary-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
      siteNav.classList.toggle('is-open');
    });

    // Close menu when a navigation link is clicked
    var navLinks = siteNav.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        siteNav.classList.remove('is-open');
      });
    }

    // Close menu when Escape key is pressed
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        siteNav.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }
})();

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');

  var nameError = document.getElementById('name-error');
  var emailError = document.getElementById('email-error');
  var messageError = document.getElementById('message-error');

  /**
   * Validate a single field.
   * Returns true if valid, false otherwise.
   */
  function validateField(input, errorElement, errorMessage) {
    var value = input.value.trim();

    if (value === '') {
      input.classList.add('input-error');
      errorElement.textContent = errorMessage + ' is required.';
      return false;
    }

    input.classList.remove('input-error');
    errorElement.textContent = '';
    return true;
  }

  /**
   * Validate email format using a simple regular expression.
   */
  function validateEmail() {
    var value = emailInput.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Email is required.';
      return false;
    }

    if (!emailPattern.test(value)) {
      emailInput.classList.add('input-error');
      emailError.textContent = 'Please enter a valid email address.';
      return false;
    }

    emailInput.classList.remove('input-error');
    emailError.textContent = '';
    return true;
  }

  // Remove error styling when the user starts typing
  nameInput.addEventListener('input', function () {
    nameInput.classList.remove('input-error');
    nameError.textContent = '';
  });

  emailInput.addEventListener('input', function () {
    emailInput.classList.remove('input-error');
    emailError.textContent = '';
  });

  messageInput.addEventListener('input', function () {
    messageInput.classList.remove('input-error');
    messageError.textContent = '';
  });

  // Validate on submit
  form.addEventListener('submit', function (e) {
    var isNameValid = validateField(nameInput, nameError, 'Name');
    var isEmailValid = validateEmail();
    var isMessageValid = validateField(messageInput, messageError, 'Message');

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      e.preventDefault();
      // Focus the first invalid field
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isMessageValid) messageInput.focus();
    }
  });

  // Real-time email validation on blur
  emailInput.addEventListener('blur', function () {
    if (emailInput.value.trim() !== '') {
      validateEmail();
    }
  });
})();