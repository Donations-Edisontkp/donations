(function() {
  'use strict';
  
  // Find all script tags with our embed configuration
  var scripts = document.querySelectorAll('script[data-campaign-slug][data-widget]');
  
  scripts.forEach(function(script) {
    var campaignSlug = script.getAttribute('data-campaign-slug');
    var widget = script.getAttribute('data-widget');
    var baseUrl = script.src.replace('/embed.js', '');
    
    if (!campaignSlug || !widget) {
      console.error('Smart Donations: Missing data-campaign-slug or data-widget attribute');
      return;
    }
    
    // Map widget types to their corresponding embed URLs
    var widgetPaths = {
      'form': '/embed/' + campaignSlug + '/form',
      'progress': '/embed/' + campaignSlug + '/progress',
      'donors': '/embed/' + campaignSlug + '/donors'
    };
    
    var widgetPath = widgetPaths[widget];
    if (!widgetPath) {
      console.error('Smart Donations: Invalid widget type. Use "form", "progress", or "donors"');
      return;
    }
    
    // Widget sizing defaults
    var widgetSizes = {
      'form': { width: '100%', height: '600px' },
      'progress': { width: '100%', height: '150px' },
      'donors': { width: '100%', height: '400px' }
    };
    
    var size = widgetSizes[widget];
    
    // Create container
    var container = document.createElement('div');
    container.className = 'smart-donations-widget';
    container.style.cssText = 'width: ' + size.width + '; max-width: 500px;';
    
    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = baseUrl + widgetPath;
    iframe.style.cssText = 'width: 100%; height: ' + size.height + '; border: none; overflow: hidden;';
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('title', 'Smart Donations Widget');
    
    container.appendChild(iframe);
    
    // Insert the container after the script tag
    script.parentNode.insertBefore(container, script.nextSibling);
  });
})();
