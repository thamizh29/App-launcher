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
function createAppLauncherWidget(targetId) {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.error(`Element with ID "${targetId}" not found.`);
    return;
  }

  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'app-launcher-widget';
  widgetContainer.style.position = 'absolute';
  widgetContainer.style.width = '300px';
  widgetContainer.style.backgroundColor = '#ffffff';
  widgetContainer.style.padding = '20px';
  widgetContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  widgetContainer.style.borderRadius = '8px';
  widgetContainer.style.display = 'none'; // Initially hidden
  widgetContainer.style.zIndex = '1000';

  widgetContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
  widgetContainer.style.display = 'grid';
  widgetContainer.style.gridGap = '10px';

  // Add each app to the widget
  apps.forEach(app => {
    const appDiv = document.createElement('div');
    appDiv.style.cursor = 'pointer';
    appDiv.style.display = 'flex';
    appDiv.style.flexDirection = 'column';
    appDiv.style.alignItems = 'center';
    appDiv.style.fontSize = '12px';
    appDiv.style.textAlign = 'center';

    const appIcon = document.createElement('img');
    appIcon.src = app.icon;
    appIcon.alt = app.name;
    appIcon.style.width = '40px';
    appIcon.style.height = '40px';
    appIcon.style.borderRadius = '4px';

    const appName = document.createElement('p');
    appName.textContent = app.name;
    appName.style.margin = '5px 0 0';

    appDiv.appendChild(appIcon);
    appDiv.appendChild(appName);

    appDiv.addEventListener('click', () => {
      window.open(app.url, '_blank');
    });

    widgetContainer.appendChild(appDiv);
  });

  targetElement.appendChild(widgetContainer);

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

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();

   toggleButton.addEventListener('click', (event) => {
  event.stopPropagation();

  const rect = toggleButton.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  // Decide whether to show the widget on the right or left side of the button
  if (rect.left > screenWidth / 2) {
    // Button is on the right side of the screen, show widget on the left
    widgetContainer.style.left = `${rect.left + window.scrollX - widgetContainer.offsetWidth - 10}px`;
  } else {
    // Button is on the left side of the screen, show widget on the right
    widgetContainer.style.left = `${rect.right + window.scrollX + 10}px`;
  }

  // Position widget vertically below the button
  widgetContainer.style.top = `${rect.bottom + window.scrollY + 10}px`;

  // Toggle the widget's visibility
  widgetContainer.style.display = widgetContainer.style.display === 'none' ? 'grid' : 'none';
});

  targetElement.appendChild(toggleButton);

  document.addEventListener('click', (event) => {
    if (!widgetContainer.contains(event.target) && !toggleButton.contains(event.target)) {
      widgetContainer.style.display = 'none';
    }
  });
}

// Call the function with a specific ID
createAppLauncherWidget('my-widget-container');

