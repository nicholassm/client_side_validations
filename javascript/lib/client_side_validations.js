jQuery.validator.addMethod("numericality", function(value, element) { 
  return this.optional(element) || /^(\d+(\.|,)\d+|\d+)$/.test(value);
}, jQuery.validator.format("Is not a number."));

jQuery.validator.addMethod("format", function(value, element, params) { 
  var pattern = new RegExp(params, "i");
  return this.optional(element) || pattern.test(value);
}, jQuery.validator.format("Invalid format."));

jQuery.validator.addMethod("acceptance", function(value, element, params) { 
  return element.checked; 
}, jQuery.validator.format("Was not accepted."));

jQuery.validator.addMethod("inclusion", function(value, element, params) { 
  if (this.optional(element)) {
    return true;
  } else {
    
    for (var i=0, len=params.length; i<len; ++i ) {
      if (value == String(params[i])) {
        return true;
      }
    }
  }
  return false;
}, jQuery.validator.format("Not included in list."));

jQuery.validator.addMethod("exclusion", function(value, element, params) { 
  if (this.optional(element)) {
    return true;
  } else {
    for (var i=0, len=params.length; i<len; ++i ) {
      if (value == String(params[i])) {
        return false;
      }
    }
  }
  return true;
}, jQuery.validator.format("Is reserved."));

jQuery.validator.addMethod("islength", function(value, element, length) { 
  return this.optional(element) || value.length == length;
}, jQuery.validator.format("Is the wrong length."));

$.extend($.fn, {
  clientSideValidations: function() {
    for (var i = 0; i < this.size(); i++) {
      var form                        = $(this[i]);
      var object                      = form.attr('data-csv');
      var validate_options            = eval(object + "_validate_options");
      validate_options.options.ignore = ':hidden';
      form.validate(validate_options);
    }
  }
});

$(function() {
  $('form[data-csv]').clientSideValidations();
});