// Include Material Symbols CSS for the icon
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=apps';
document.head.appendChild(link);

// Define the apps to be displayed
const apps = [
  { name: 'NextCloud', url: 'https://auth.sagasoft.io/application/saml/nextcloud/sso/binding/init/', icon: 'https://thamizh29.github.io/App-launcher/images/nextcloud.png' },
  { name: 'HelpDesk', url: 'https://frappe.sagasoft.io', icon: 'https://thamizh29.github.io/App-launcher/images/helpdesk-icon.png' },
  { name: 'Insight', url: 'https://frappe.sagasoft.io', icon: 'https://thamizh29.github.io/App-launcher/images/insights28df13.png' },
  { name: 'Frappe', url: 'https://auth.sagasoft.io//application/o/authorize/?redirect_uri=https%3A%2F%2Ffrappe.sagasoft.io%2Fapi%2Fmethod%2Ffrappe.integrations.oauth2_logins.custom%2Fauthentik&state=eyJzaXRlIjogImh0dHA6Ly9mcmFwcGUuc2FnYXNvZnQuaW8iLCAidG9rZW4iOiAiNTAxMjhiYmVhYmQ3Mzc0YjkzYWRhOTkyNzUwZmExOTYyODJlMGU5NzlkNjY3MmZiOTU3ZTcyZTYiLCAicmVkaXJlY3RfdG8iOiBudWxsfQ%3D%3D&response_type=code&scope=email+profile+openid+role_profile_name&client_id=hvroMBHNscuhjmgStAaNHmlwVyAqtXS02Nmf0YGk', icon: 'https://thamizh29.github.io/App-launcher/images/frappe.png' },
  { name: 'Sogo', url: 'https://mx1.sagasoft.io/?iam_sso=1', icon: 'https://thamizh29.github.io/App-launcher/images/sogo.png' },
  { name: 'Wiki', url: 'https://frappe.sagasoft.io', icon: 'https://thamizh29.github.io/App-launcher/images/wikib37899.png' },
  { name: 'LMS', url: 'https://frappe.sagasoft.io', icon: 'https://thamizh29.github.io/App-launcher/images/lms.png' },
  { name: 'HR', url: 'https://frappe.sagasoft.io', icon: 'https://thamizh29.github.io/App-launcher/images/hrda199d.png' },
];

// Function to create and render the widget
function createAppLauncherWidget() {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'app-launcher-widget';
  widgetContainer.style.position = 'absolute';  // Changed to 'absolute'
  widgetContainer.style.width = '400px'
  widgetContainer.style.backgroundColor = '#ffffff';
  widgetContainer.style.padding = '40px';
  widgetContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  widgetContainer.style.display = 'none'; // Initially hidden
  widgetContainer.style.zIndex = '1000';

  // Responsive grid layout for icons
  function adjustWidgetLayout() {
    if (window.innerWidth <= 600) { // Mobile view
      widgetContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      widgetContainer.style.gridGap = '10px';
    } else { // Desktop view
      widgetContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
      widgetContainer.style.gridGap = '10px';
    }
  }

  window.addEventListener('resize', adjustWidgetLayout); // Adjust layout on resize

  // Add each app to the widget
  apps.forEach(app => {
    const appDiv = document.createElement('div');
    appDiv.style.cursor = 'pointer';
    appDiv.style.display = 'flex';
    appDiv.style.flexDirection = 'column';
    appDiv.style.alignItems = 'center';
    appDiv.style.fontSize = '12px';
    appDiv.style.textAlign = 'center';

    // App icon
    const appIcon = document.createElement('img');
    appIcon.src = app.icon;
    appIcon.alt = app.name;
    appIcon.style.width = '40px';
    appIcon.style.height = '40px';
    appIcon.style.borderRadius = '4px';

    // App name
    const appName = document.createElement('p');
    appName.textContent = app.name;
    appName.style.margin = '5px 0 0';

    // Append icon and name to the app div
    appDiv.appendChild(appIcon);
    appDiv.appendChild(appName);

    // Add click event to redirect to the app's URL
    appDiv.addEventListener('click', () => {
      window.open(app.url, '_blank');
    });

    widgetContainer.appendChild(appDiv);
  });

  document.body.appendChild(widgetContainer);

  // Toggle button for app launcher
  const toggleButton = document.createElement('button');
  toggleButton.style.padding = '10px';
  toggleButton.style.background = 'none';
  toggleButton.style.border = 'none';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.zIndex = '10000';

  const appIcon = document.createElement('span');
  appIcon.className = 'material-symbols-outlined';
  appIcon.textContent = 'apps';
  appIcon.style.fontSize = '38px';
  toggleButton.appendChild(appIcon);

  // Toggle widget display on button click
  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    
    // Get the position of the toggle button
    const rect = toggleButton.getBoundingClientRect();
    
    // Set the widget position relative to the toggle button
    widgetContainer.style.top = `${rect.bottom + window.scrollY + 10}px`;  // Add some space below the button
    widgetContainer.style.left = `${rect.left + window.scrollX}px`;  // Align widget to the left of the button
    
    // Toggle visibility
    if (widgetContainer.style.display === 'none') {
      widgetContainer.style.display = 'grid';
      adjustWidgetLayout(); // Apply layout when showing
    } else {
      widgetContainer.style.display = 'none';
    }
  });

  document.body.appendChild(toggleButton);

  // Close widget when clicking outside
  document.addEventListener('click', (event) => {
    if (!widgetContainer.contains(event.target) && !toggleButton.contains(event.target)) {
      widgetContainer.style.display = 'none';
    }
  });
}

// Call the function to create the widget structure
createAppLauncherWidget();
