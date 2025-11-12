const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
//      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the vehicle details view HTML
* ************************************ */
Util.buildInventoryDetails = async function(data){
  let details
  if(data.length > 0){
    details = '<div class="row">'
      details += '<div class="image-section">'
      details += '<img src="' + data[0].inv_image 
      +'" alt="Image of '+ data[0].inv_make + ' ' + data[0].inv_model 
      +' on CSE Motors" />'
      details += '</div>'      
      details += '<div class="price-section">'
      details += '<h2>' + data[0].inv_make + ' ' + data[0].inv_model + ' Details: </h2>'
      details +=  '<p id="des"><span>Description: </span>'+ data[0].inv_description + '</p>' 
      details += '<p id="price">'
      details += '<span>Price: $' 
      + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</span>'
      details += '</p>'
      details += '<p><span>Make: </span>'
       + data[0].inv_make +'</p>' 
       details += '<p><span>Model: </span>'
      + data[0].inv_model + '</p>' 
      details += '<p><span>Color: </span>'
      + data[0].inv_color + '</p>' 
      details += '<p><span>Year: </span>'
      + data[0].inv_year + '</p>'
      details += '<p><span>Milage: </span>'
      + new Intl.NumberFormat('en-US').format(data[0].inv_miles) + '</p>'          
    details += '</div>' 
    details += '</div>'          
    
  } else { 
    details += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return details
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util