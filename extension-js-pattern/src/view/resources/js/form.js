var Form = {
  create: function(fields, root) {
    root.innerHTML = this.buildForm(fields);
    this.setupExtensionBridge(fields);
    this.wireDataElementButtons(fields);
  },

  buildForm: function(fields) {
    return '<div class="pure-form pure-form-aligned">' +
      '<fieldset>' +
        this.buildFields(fields) +
      '</fieldset>' +
    '</div>';
  },

  buildFields: function(fields) {
    var fieldsContent = '';

    Object.keys(fields).forEach(function(fieldName) {
      fieldsContent += this.buildField(fieldName, fields[fieldName])
    }, this);

    return fieldsContent;
  },

  buildField: function(fieldName, fieldData) {
    return '<div class="pure-control-group">' +
      '<label for="' + fieldName + '">' + fieldData.title + '</label>' +
      '<input id="' + fieldName + '" type="text">' +
      '<button class="data-element-button pure-button"><i class="fa fa-database"></i></button>' +
      this.buildFieldMessage(fieldData) +
    '</div>';
  },

  buildFieldMessage: function(fieldData) {
    var msg = '';

    if (fieldData.type === 'array') {
      msg += 'Comma separated values are accepted.';
    }

    if (!fieldData.required) {
      msg += ' (optional)';
    }

    return '<span class="pure-form-message-inline">' + msg + '</span>';
  },

  setupExtensionBridge: function(fields) {
    var fieldNames = Object.keys(fields);

    window.extensionBridge.register({
      init: function(info) {
        fieldNames.forEach(function(fieldName) {
          var fieldValue = (info.settings && info.settings[fieldName]) || '';
          if (Array.isArray(fieldValue)) {
            fieldValue = fieldValue.join(',');
          }
          document.getElementById(fieldName).value = fieldValue;
        }, this);
      },

      getSettings: function() {
        var settings = {};

        fieldNames.forEach(function(fieldName) {
          settings[fieldName] = document.getElementById(fieldName).value || '';
          if (fields[fieldName].type === 'array') {
            settings[fieldName] = settings[fieldName].split(',').map(function(s) {
              return s.trim();
            });
          }
        }, this);

        Object.keys(settings).forEach(function(key) {
          return (settings[key] == '' || settings[key] == null) && delete settings[key];
        });

        return settings;
      },

      validate: function() {
        var result = true;

        fieldNames.forEach(function(fieldName) {
          if (fields[fieldName].required) {
            var fieldInput = document.getElementById(fieldName);
            if (!fieldInput.value) {
              fieldInput.parentNode.classList.add('error');
              result = false;
            } else {
              fieldInput.parentNode.classList.remove('error');
            }
          }
        }, this);

        return result;
      }
    });
  },

  wireDataElementButtons: function() {
    document.querySelectorAll('.data-element-button').forEach(function (b) {
      b.addEventListener('click', this.openDataElementSelector(b.previousSibling));
    }, this);
  },

  openDataElementSelector: function(field) {
    return function() {
      window.extensionBridge.openDataElementSelector(function(dataElement) {
        field.value += dataElement;
      });
    }
  }
};
