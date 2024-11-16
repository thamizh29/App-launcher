// Include Material Symbols CSS for the icon
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=apps';
document.head.appendChild(link);

// Function to create and render the widget
function createAppLauncherWidget({ apps, position }) {
  // Remove existing widget if present
  const existingWidget = document.getElementById('app-launcher-widget');
  if (existingWidget) existingWidget.remove();

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'app-launcher-widget';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.backgroundColor = '#ffffff';
  widgetContainer.style.padding = '20px';
  widgetContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  widgetContainer.style.display = 'none'; // Initially hidden
  widgetContainer.style.zIndex = '1000';

  // Apply user-defined position
  Object.entries(position).forEach(([key, value]) => {
    widgetContainer.style[key] = value;
  });

  // Create a grid layout for the apps
  widgetContainer.style.display = 'grid';
  widgetContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
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
  toggleButton.id = 'toggle-app-launcher';
  toggleButton.style.position = 'fixed';
  toggleButton.style.top = '10px';
  toggleButton.style.right = '10px';
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
    widgetContainer.style.display = widgetContainer.style.display === 'none' ? 'grid' : 'none';
  });

  document.body.appendChild(toggleButton);

  // Close widget when clicking outside
  document.addEventListener('click', (event) => {
    if (!widgetContainer.contains(event.target) && !toggleButton.contains(event.target)) {
      widgetContainer.style.display = 'none';
    }
  });
}

// Example: Call the widget dynamically
function initializeWidgetForContext() {
  const currentApps = [
    { name: 'NextCloud', url: 'https://example.com/nextcloud', icon: 'public/images/nextcloud.png' },
    { name: 'Sogo', url: 'https://example.com/sogo', icon: 'public/images/sogo.png' },
  ];

  const widgetPosition = { bottom: '50px', right: '20px' };

  createAppLauncherWidget({ apps: currentApps, position: widgetPosition });
}

// Call the function to create the widget dynamically in your application
initializeWidgetForContext();

