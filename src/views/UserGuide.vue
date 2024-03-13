<template>
    <div class="user-guide">
      <h1>User Guide</h1>
      <p>Welcome to the User Guide page. Here, you'll find instructions and helpful information on how to use our application.</p>
      
      <h2>Getting Started</h2>
      <p>To begin using our application, follow these steps:</p>
      <ol>
        <li>Sign up for an account if you haven't already done so.</li>
        <li>Log in to your account using your credentials.</li>
        <li>Explore the features and functionalities of the application.</li>
      </ol>
  
      <h2>Features Overview</h2>
      <p>Our application offers the following key features:</p>
      <ul>
        <li><strong>Data Visualization:</strong> Visualize complex data sets through interactive charts and graphs.</li>
        <li><strong>Data Filtering:</strong> Filter data based on various criteria to narrow down your search.</li>
        <li><strong>Data Export:</strong> Export data to various formats for further analysis and reporting.</li>
        <li><strong>User Management:</strong> Manage user accounts and permissions to control access to the application.</li>
      </ul>
  
      <h2>FAQs</h2>
      <p>Below are some frequently asked questions:</p>
      <dl>
        <dt>How do I reset my password?</dt>
        <dd>To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.</dd>
        <dt>Can I customize the dashboard?</dt>
        <dd>Yes, you can customize the dashboard by adding, removing, or rearranging widgets according to your preferences.</dd>
      </dl>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserGuide'
  }
  </script>
  
  <style scoped>
  .user-guide {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1, h2 {
    margin-top: 20px;
  }
  </style>
  
