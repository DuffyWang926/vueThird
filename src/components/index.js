
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function validateFileName(str) {
  return /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
}

const requireComponent = require.context('.', true, /\.vue$/)

export default {
  install(app) {
    requireComponent.keys().forEach(filePath => {
      const componentConfig = requireComponent(filePath)
      const fileName = validateFileName(filePath)
      console.log(componentConfig.default.name);
      const componentName = fileName.toLowerCase() === 'index' ?
        capitalizeFirstLetter(componentConfig.default.name) :
        fileName
      app.component(componentName, componentConfig.default || componentConfig)
    })
  }
}