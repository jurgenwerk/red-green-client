module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'red-green',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
