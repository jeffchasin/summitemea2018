'use strict';

module.exports = {
  rules: [
    {
      name: 'Example Rule',
      events: [
        {
          // This is a simple event type provided by the sandbox which triggers the rule
          // as soon as the DTM library is loaded. This event type is provided as a 
          // convenience in case your extension does not have event types of its own.
          modulePath: 'sandbox/pageTop.js',
          settings: {}
        }
      ],
      // conditions: [
      //   {
      //     modulePath: 'example-extension/src/lib/conditions/operatingSystem.js',
      //     settings: {}
      //   }
      // ],
      actions: [
        {
          modulePath: 'hotjar/src/lib/actions/loadHotjarCode.js',
          settings: {
          }
        }
      ]
    }
  ],
  dataElements: {
    // Set up data elements that you would like to test. The top-level object keys are the data
    // element names. For each data element:
    //  - modulePath is the name of your extension (as defined in your extension.json) plus the
    //    path to the library module file.
    //  - settings is an object containing user input saved from your extension view.

    // productId: {
    //   // This is a simple data element type provided by the sandbox which retrieves a value
    //   // from local storage. This data element type is provided as a convenience in case
    //   // your extension does not have any data element types of its own.
    //   modulePath: 'sandbox/localStorage.js',
    //   settings: {
    //     // The local storage item name.
    //     name: 'productId'
    //   }
    // }
  },
  extensions: {
    // Set up an extension configuration you would like to test. The top-level object key is the
    // name of your extension (as defined in your extension.json).
    'hotjar-html': {
      displayName: 'Hotjar',
      settings: {
        hjid: '12345'
      }
    }
  },
  property: {
    name: 'Sandbox property',
    settings: {
      domains: [
        'adobe.com',
        'example.com'
      ],
      linkDelay: 100,
      euCookieName: 'sat_track',
      undefinedVarsReturnEmpty: false
    }
  },
  buildInfo: {
    turbineVersion: "25.1.0",
    turbineBuildDate: "2018-04-12T18:10:34Z",
    buildDate: "2018-03-30T16:27:10Z",
    environment: "development"
  }
};
